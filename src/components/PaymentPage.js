import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart, useUser } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import {
  CreditCard,
  DollarSign,
  Percent,
  ShoppingCart,
  ArrowLeft,
  Loader2,
  Shield,
  CheckCircle
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;
const DEMO_MODE = !BACKEND_URL;

// Load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user, loginUser } = useUser();
  const { subtotal, orderItems, userInfo, finalTotal } = location.state || { 
    subtotal: 0, 
    orderItems: [], 
    userInfo: {}, 
    finalTotal: 0 
  };

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script on component mount
  useEffect(() => {
    if (paymentMethod === 'online') {
      loadRazorpayScript().then((success) => {
        if (success) {
          setRazorpayLoaded(true);
        } else {
          toast.error('Failed to load payment gateway. Please try again.');
        }
      });
    }
  }, [paymentMethod]);

  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.10);
      toast.success('Coupon applied: 10% off!');
    } else {
      setDiscount(0);
      toast.error('Invalid coupon code.');
    }
  };

  const finalAmountWithDiscount = (finalTotal || subtotal) - discount;

  const createOrder = async () => {
    if (DEMO_MODE) {
      // Demo mode - return mock order data
      console.log('Demo mode: Creating mock order');
      const mockOrder = {
        id: 'demo_' + Math.random().toString(36).substr(2, 9),
        user_id: user?.id || 'demo_user',
        items: orderItems,
        total_amount: finalAmountWithDiscount,
        shipping_address: userInfo.address,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockOrder;
    }
    
    try {
      // Create or update user
      let currentUser = user;
      if (!currentUser) {
        const userResponse = await axios.post(`${API}/users`, userInfo);
        currentUser = userResponse.data;
        loginUser(currentUser);
      }

      // Prepare order items
      const orderItemsForAPI = orderItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      // Create order
      const orderData = {
        user_id: currentUser.id,
        items: orderItemsForAPI,
        total_amount: finalAmountWithDiscount,
        shipping_address: userInfo.address
      };

      const orderResponse = await axios.post(`${API}/orders`, orderData);
      return orderResponse.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const initiateRazorpayPayment = async (orderData) => {
    try {
      // For client-side integration without backend, we create the order directly
      // Note: In production, you should create orders on your backend for security
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_1LKSOWLc8tV8f1", // Test key - replace with your own
        amount: Math.round(finalAmountWithDiscount * 100), // Amount in paise
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: null, // We'll create this using the orders API in a real implementation
        handler: function(response) {
          // Handle successful payment
          clearCart();
          toast.success('Payment successful! Order confirmed.');
          navigate('/order-confirmation', { 
            state: { 
              orderData: {
                ...orderData,
                paymentId: response.razorpay_payment_id,
                paymentMethod: 'Online Payment (Razorpay)',
                status: 'Paid'
              }
            } 
          });
        },
        prefill: {
          name: userInfo.name || 'Customer',
          email: userInfo.email || 'customer@example.com',
          contact: userInfo.phone || '9999999999'
        },
        notes: {
          address: userInfo.address || ''
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast.info('Payment cancelled');
          }
        }
      };

      // For demo purposes, we'll use a test payment flow
      // In a real implementation, you would create an order first using Razorpay Orders API
      const rzp = new window.Razorpay(options);
      rzp.open();
      
      // Simulate payment success after 3 seconds for demo
      if (DEMO_MODE) {
        setTimeout(() => {
          rzp.onclose = function() {
            clearCart();
            toast.success('Payment successful! Order confirmed.');
            navigate('/order-confirmation', { 
              state: { 
                orderData: {
                  ...orderData,
                  paymentId: 'pay_' + Math.random().toString(36).substr(2, 9),
                  paymentMethod: 'Online Payment (Razorpay)',
                  status: 'Paid'
                }
              } 
            });
          };
          rzp.close();
        }, 3000);
      }
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      toast.error('Failed to initialize payment gateway. Please try again.');
      setLoading(false);
    }
  };

  const handleProceedToPay = async () => {
    try {
      setLoading(true);
      
      // Create the order first
      const createdOrder = await createOrder();
      
      const orderData = {
        orderId: createdOrder.id ? createdOrder.id.slice(-8).toUpperCase() : 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Razorpay)',
        totalAmount: finalAmountWithDiscount,
        status: paymentMethod === 'cod' ? 'Confirmed' : 'Pending Payment',
        estimatedDelivery: '3-5 business days',
        items: orderItems,
        customer: userInfo
      };

      if (paymentMethod === 'cod') {
        // Clear cart and show success
        clearCart();
        toast.success('Order placed successfully with Cash on Delivery!');
        navigate('/order-confirmation', { state: { orderData } });
      } else if (paymentMethod === 'online') {
        if (!razorpayLoaded) {
          toast.error('Payment gateway is still loading. Please try again in a moment.');
          setLoading(false);
          return;
        }
        
        await initiateRazorpayPayment(orderData);
      }
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Checkout
        </Button>

        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Complete Your Payment</h1>
        </div>
        <p className="text-muted-foreground mb-8">Secure payment with multiple options</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <ShoppingCart className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between text-muted-foreground">
                   <span>Subtotal</span>
                   <span>${(finalTotal || subtotal).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-muted-foreground">
                   <span>Discount</span>
                   <span className="text-green-600">-${discount.toFixed(2)}</span>
                 </div>
                 <Separator />
                 <div className="flex justify-between text-xl font-bold text-foreground">
                   <span>Total Amount</span>
                   <span>${finalAmountWithDiscount.toFixed(2)}</span>
                 </div>
              </CardContent>
            </Card>

            {/* Coupon Code */}
            <Card className="shadow-lg border-0 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Percent className="w-5 h-5" />
                  Apply Coupon
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2 pt-6">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-12"
                />
                <Button onClick={applyCoupon} className="h-12 bg-amber-600 hover:bg-amber-700">Apply</Button>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card className="shadow-lg border-0 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Secure Payment</h3>
                  <p className="text-sm text-green-600">Your payment information is encrypted and secure</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Options */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <CreditCard className="w-5 h-5" />
                  Select Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 border rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" className="text-purple-600 border-2 border-gray-300 w-5 h-5" />
                    <Label htmlFor="cod" className="flex items-center gap-2 text-lg font-medium cursor-pointer">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      Cash on Delivery (COD)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4 p-4 border rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                    <RadioGroupItem value="online" id="online" className="text-purple-600 border-2 border-gray-300 w-5 h-5" />
                    <Label htmlFor="online" className="flex items-center gap-2 text-lg font-medium cursor-pointer">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      </div>
                      Online Payment (Razorpay)
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method Info */}
            {paymentMethod === 'online' && (
              <Card className="shadow-lg border-0 rounded-xl bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800 mb-1">Secure Online Payment</h3>
                      <p className="text-sm text-blue-600">
                        You will be redirected to Razorpay's secure payment gateway to complete your transaction.
                        We accept all major credit/debit cards, UPI, and net banking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === 'cod' && (
              <Card className="shadow-lg border-0 rounded-xl bg-amber-50 border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full mt-0.5">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-800 mb-1">Pay When You Receive</h3>
                      <p className="text-sm text-amber-600">
                        Pay with cash, card, or UPI when your order is delivered.
                        A small convenience fee may apply.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Proceed to Pay Button */}
             <Button
               onClick={handleProceedToPay}
               disabled={loading || (paymentMethod === 'online' && !razorpayLoaded)}
               size="lg"
               className="w-full h-14 text-lg gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
             >
               {loading ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                 <CreditCard className="w-5 h-5" />
               )}
               {loading 
                 ? 'Processing...' 
                 : paymentMethod === 'online' && !razorpayLoaded
                   ? 'Loading Payment Gateway...'
                   : `Pay $${finalAmountWithDiscount.toFixed(2)} ${paymentMethod === 'cod' ? 'on Delivery' : 'Now'}`
               }
             </Button>

             {/* Security badges */}
             <div className="flex items-center justify-center gap-6 text-gray-400">
               <div className="text-center">
                 <div className="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                   <Shield className="w-5 h-5" />
                 </div>
                 <p className="text-xs">SSL Secure</p>
               </div>
               <div className="text-center">
                 <div className="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                   <CreditCard className="w-5 h-5" />
                 </div>
                 <p className="text-xs">Encrypted</p>
               </div>
               <div className="text-center">
                 <div className="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                   <CheckCircle className="w-5 h-5" />
                 </div>
                 <p className="text-xs">Verified</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../App';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import { 
  Package, 
  Calendar, 
  MapPin, 
  CreditCard,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  X,
  ShoppingBag,
  ArrowLeft,
  Eye
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;
const DEMO_MODE = !BACKEND_URL;

const OrdersPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      if (DEMO_MODE) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Return mock orders data
        const mockOrders = [
          {
            id: 1,
            order_number: 'ORD-2024-001',
            status: 'delivered',
            total_amount: 299.99,
            created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            items: [
              { id: 1, name: 'Premium Headphones', quantity: 1, price: 299.99 }
            ],
            shipping_address: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zip: '10001'
            }
          },
          {
            id: 2,
            order_number: 'ORD-2024-002',
            status: 'shipped',
            total_amount: 149.99,
            created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            items: [
              { id: 2, name: 'Wireless Mouse', quantity: 1, price: 149.99 }
            ],
            shipping_address: {
              street: '456 Oak Ave',
              city: 'Los Angeles',
              state: 'CA',
              zip: '90210'
            }
          }
        ];
        
        setOrders(mockOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        return;
      }
      
      const response = await axios.get(`${API}/orders/${user.id}`);
      setOrders(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Package className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Sign In Required
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Please sign in to view your order history
            </p>
            <Button 
              onClick={() => navigate('/profile')}
              size="lg"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track your order history and status</p>
          </div>
          
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="ios-card loading">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                        <div className="h-3 bg-muted rounded animate-pulse w-1/4" />
                      </div>
                      <div className="h-6 bg-muted rounded animate-pulse w-20" />
                    </div>
                    <div className="h-16 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track your order history and status</p>
          </div>

          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              No orders yet
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your order history will appear here once you make your first purchase
            </p>
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track your order history and status ({orders.length} orders)
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="ios-card animate-in">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Order #{order.order_number || `ORD-${String(order.id).padStart(8, '0')}`}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(order.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        ₹{order.total_amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={`gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      {selectedOrder === order.id ? 'Hide' : 'View'} Details
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Order Items Summary */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {order.shipping_address.city}...
                    </span>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {selectedOrder === order.id && (
                  <div className="space-y-6 animate-in">
                    <Separator />
                    
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Left Column - Order Items & Summary */}
                      <div className="space-y-6">
                        {/* Order Items */}
                        <Card className="ios-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <ShoppingBag className="w-5 h-5" />
                              Order Items
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                  <Package className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-foreground truncate">{item.product_name}</h5>
                                  <p className="text-sm text-muted-foreground">
                                    Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-foreground">
                                    ₹{(item.quantity * item.price).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Order Summary */}
                        <Card className="ios-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <CreditCard className="w-5 h-5" />
                              Order Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between text-muted-foreground">
                              <span>Subtotal</span>
                              <span>₹{order.total_amount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>Shipping</span>
                              <span>Free</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>Tax</span>
                              <span>₹0.00</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-xl font-bold text-foreground">
                              <span>Total</span>
                              <span>₹{order.total_amount.toFixed(2)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Right Column - Details & Status */}
                      <div className="space-y-6">
                        {/* Payment Information */}
                        <Card className="ios-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <CreditCard className="w-5 h-5" />
                              Payment Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="font-medium">Payment Confirmed</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Method</span>
                              <span>Cash on Delivery</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status</span>
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Shipping Address */}
                        <Card className="ios-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MapPin className="w-5 h-5" />
                              Shipping Address
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {`${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state} - ${order.shipping_address.zip}`}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Order Timeline */}
                        <Card className="ios-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              Order Timeline
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  ['confirmed', 'shipped', 'delivered'].includes(order.status) 
                                    ? 'bg-green-500' 
                                    : 'bg-gray-300'
                                }`}></div>
                                <div>
                                  <p className="font-medium">Order Confirmed</p>
                                  <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  ['shipped', 'delivered'].includes(order.status) 
                                    ? 'bg-green-500' 
                                    : 'bg-gray-300'
                                }`}></div>
                                <div>
                                  <p className={`font-medium ${
                                    ['shipped', 'delivered'].includes(order.status) 
                                      ? 'text-foreground' 
                                      : 'text-muted-foreground'
                                  }`}>Processing</p>
                                  <p className="text-sm text-muted-foreground">Within 24 hours</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  order.status === 'delivered' 
                                    ? 'bg-green-500' 
                                    : 'bg-gray-300'
                                }`}></div>
                                <div>
                                  <p className={`font-medium ${
                                    order.status === 'delivered' 
                                      ? 'text-foreground' 
                                      : 'text-muted-foreground'
                                  }`}>Delivered</p>
                                  <p className="text-sm text-muted-foreground">3-5 business days</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Track Order Button */}
                        <Button
                          onClick={() => navigate('/order-confirmation', { 
                            state: { 
                              orderData: {
                                orderId: order.order_number || `ORD-${String(order.id).padStart(8, '0')}`,
                                paymentMethod: 'Cash on Delivery',
                                totalAmount: order.total_amount,
                                status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
                                estimatedDelivery: '3-5 business days'
                              }
                            }
                          })}
                          className="w-full h-12 gap-2"
                          size="lg"
                        >
                          <Truck className="w-5 h-5" />
                          View Full Order Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
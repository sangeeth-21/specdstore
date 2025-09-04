import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  CheckCircle,
  Package,
  CreditCard,
  DollarSign,
  Truck,
  Eye,
  Home,
  ShoppingBag
} from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};

  // Default order data if not passed
  const defaultOrderData = {
    orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    paymentMethod: 'Cash on Delivery',
    totalAmount: 0,
    status: 'Confirmed',
    estimatedDelivery: '3-5 business days'
  };

  const order = orderData || defaultOrderData;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getPaymentIcon = (method) => {
    if (method.toLowerCase().includes('cod') || method.toLowerCase().includes('cash')) {
      return <DollarSign className="w-5 h-5" />;
    }
    return <CreditCard className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <Card className="ios-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono font-medium">{order.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-semibold text-lg">${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Method</span>
                  <div className="flex items-center gap-2">
                    {getPaymentIcon(order.paymentMethod)}
                    <span>{order.paymentMethod}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order Status</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span>{order.estimatedDelivery}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="ios-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getPaymentIcon(order.paymentMethod)}
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {order.paymentMethod.toLowerCase().includes('cod') || order.paymentMethod.toLowerCase().includes('cash') ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Cash on Delivery Selected</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Please keep the exact amount ready for payment upon delivery.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Payment Successful</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Your payment has been processed successfully.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            <Card className="ios-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Track Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You can track your order status and delivery progress using the button below.
                </p>
                <Button
                  onClick={() => navigate('/orders')}
                  className="w-full h-12 gap-2"
                  size="lg"
                >
                  <Eye className="w-5 h-5" />
                  Track Order
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="ios-card">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/products')}
                  className="w-full h-12 gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Continue Shopping
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full h-12 gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Button>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="ios-card">
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-muted-foreground">Processing</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-muted-foreground">Shipped</p>
                      <p className="text-sm text-muted-foreground">1-2 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-muted-foreground">Delivered</p>
                      <p className="text-sm text-muted-foreground">{order.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
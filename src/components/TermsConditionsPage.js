import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, FileText, Scale, CreditCard, Truck, RotateCcw } from 'lucide-react';

const TermsConditionsPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Account Terms',
      icon: FileText,
      content: [
        'You must be at least 18 years old to create an account and make purchases.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate and complete information when creating your account.',
        'One account per person. Multiple accounts may result in account suspension.',
        'You are responsible for all activities that occur under your account.'
      ]
    },
    {
      title: 'Orders and Payments',
      icon: CreditCard,
      content: [
        'All orders are subject to product availability and acceptance by Specd.',
        'Prices are displayed in USD and may change without notice.',
        'Payment is required at the time of purchase through our secure payment system.',
        'We accept major credit cards, debit cards, and approved payment methods.',
        'Orders may be cancelled or modified before shipping confirmation.'
      ]
    },
    {
      title: 'Shipping and Delivery',
      icon: Truck,
      content: [
        'Shipping costs and delivery times vary by location and shipping method selected.',
        'Free shipping is available on orders over $50 within the continental US.',
        'Delivery times are estimates and may vary due to weather or other circumstances.',
        'Risk of loss and title pass to you upon delivery to the shipping address.',
        'We are not responsible for delays caused by shipping carriers.'
      ]
    },
    {
      title: 'Returns and Refunds',
      icon: RotateCcw,
      content: [
        'Items may be returned within 30 days of purchase in original condition.',
        'Custom or personalized items cannot be returned unless defective.',
        'Return shipping costs are the responsibility of the customer unless item is defective.',
        'Refunds will be processed to the original payment method within 5-7 business days.',
        'Exchanges are subject to product availability.'
      ]
    },
    {
      title: 'Product Information',
      icon: Scale,
      content: [
        'We strive to provide accurate product descriptions, images, and specifications.',
        'Colors may appear different due to monitor settings and photography lighting.',
        'Product availability is subject to change without notice.',
        'We reserve the right to limit quantities purchased per customer.',
        'All products are covered by manufacturer warranties where applicable.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-primary"></div>
              <span className="text-2xl font-bold text-foreground">Specd</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Terms & Conditions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By using Specd, you agree to these terms.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="ios-card">
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Specd! These Terms and Conditions ("Terms") govern your use of our website and services. 
                By accessing or using our website, you agree to be bound by these Terms. If you do not agree with 
                any part of these terms, you may not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
          {sections.map(({ title, icon: Icon, content }, index) => (
            <Card key={index} className="ios-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Prohibited Uses */}
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-xl text-destructive">Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                You may not use our services for any unlawful purpose or in any way that could damage our business. 
                Prohibited activities include but are not limited to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-destructive">Fraudulent Activities</h4>
                  <p className="text-sm text-muted-foreground">
                    Using false information, stolen payment methods, or engaging in any fraudulent behavior.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-destructive">System Abuse</h4>
                  <p className="text-sm text-muted-foreground">
                    Attempting to hack, disrupt, or overload our systems or security measures.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-destructive">Intellectual Property</h4>
                  <p className="text-sm text-muted-foreground">
                    Copying, reproducing, or distributing our content without permission.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-destructive">Resale Restrictions</h4>
                  <p className="text-sm text-muted-foreground">
                    Purchasing products in bulk for unauthorized commercial resale.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-xl">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, Specd shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including without limitation, loss of profits, data, 
                use, goodwill, or other intangible losses resulting from your use of our services.
              </p>
              <div className="p-4 bg-accent/50 rounded-lg border border-accent">
                <p className="text-sm text-accent-foreground">
                  <strong>Important:</strong> Our total liability to you for any claims shall not exceed the amount 
                  you paid to us in the 12 months preceding the claim.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="ios-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Questions About These Terms?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions about these Terms and Conditions, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  Email: legal@specd.com
                </Button>
                <Button variant="outline">
                  Phone: +1 (555) 123-4567
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
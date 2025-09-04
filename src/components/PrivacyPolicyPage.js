import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information such as name, email address, phone number, and shipping address when you create an account or place an order.',
        'Payment information processed securely through our payment partners.',
        'Device and browser information to improve your shopping experience.',
        'Cookies and tracking technologies to personalize content and analyze site usage.'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'Process and fulfill your orders and provide customer service.',
        'Send you order confirmations, shipping updates, and important account information.',
        'Improve our products, services, and website functionality.',
        'Send marketing communications (with your consent) about new products and offers.',
        'Prevent fraud and ensure the security of our platform.'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Shield,
      content: [
        'We do not sell, trade, or rent your personal information to third parties.',
        'We may share information with trusted service providers who help us operate our business.',
        'We may disclose information when required by law or to protect our rights and safety.',
        'In the event of a business transfer, customer information may be transferred to the new owner.'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'We use industry-standard security measures to protect your personal information.',
        'All payment transactions are encrypted using SSL technology.',
        'We regularly review and update our security practices.',
        'Access to your personal information is restricted to authorized personnel only.'
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
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                At Specd, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, share, and protect your information when you use our website 
                and services. By using our services, you agree to the practices described in this policy.
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

          {/* Your Rights */}
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-xl">Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                You have several rights regarding your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Access and Update</h4>
                  <p className="text-sm text-muted-foreground">
                    You can access and update your account information at any time through your profile page.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Data Deletion</h4>
                  <p className="text-sm text-muted-foreground">
                    You can request deletion of your personal information by contacting our support team.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Marketing Opt-out</h4>
                  <p className="text-sm text-muted-foreground">
                    You can unsubscribe from marketing emails at any time using the unsubscribe link.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Cookie Control</h4>
                  <p className="text-sm text-muted-foreground">
                    You can manage cookie preferences through your browser settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="ios-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Questions About This Policy?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  Email: privacy@specd.com
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

export default PrivacyPolicyPage;
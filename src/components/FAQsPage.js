import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Input } from './ui/input';
import { ArrowLeft, Search, HelpCircle, Package, CreditCard, Truck, RotateCcw, Shield, Phone } from 'lucide-react';

const FAQsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Orders & Payment',
      icon: CreditCard,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, PayPal, and Apple Pay. All payments are processed securely through our encrypted payment system.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 1 hour of placing it by contacting our customer service. Once your order has been processed for shipping, changes cannot be made.'
        },
        {
          question: 'Do you offer bulk discounts?',
          answer: 'Yes! We offer volume discounts for orders over 10 units of the same product. Contact our sales team at sales@specd.com for custom bulk pricing.'
        },
        {
          question: 'Why was my payment declined?',
          answer: 'Payment declines can occur due to insufficient funds, expired cards, incorrect billing information, or bank security measures. Please verify your information and contact your bank if the issue persists.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: Truck,
      faqs: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days within the US. Express shipping (1-2 business days) and overnight shipping are also available. International shipping times vary by destination.'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes! We offer free standard shipping on all orders over ₹50 within the continental United States. Free shipping promotions may also be available during special events.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also track your order status by logging into your account and visiting the Orders page.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. Customs duties and taxes may apply for international orders.'
        }
      ]
    },
    {
      title: 'Returns & Exchanges',
      icon: RotateCcw,
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy from the date of delivery. Items must be in original condition with all packaging and accessories. Custom or personalized items cannot be returned unless defective.'
        },
        {
          question: 'How do I return an item?',
          answer: 'To return an item, log into your account, go to Orders, and select "Return Item" next to the product you wish to return. We\'ll provide a prepaid return label for defective items.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method.'
        },
        {
          question: 'Can I exchange an item for a different size or color?',
          answer: 'Yes, exchanges are available subject to product availability. You can initiate an exchange through your account or contact customer service for assistance.'
        }
      ]
    },
    {
      title: 'Products & Compatibility',
      icon: Package,
      faqs: [
        {
          question: 'How do I know if a product is compatible with my device?',
          answer: 'Each product page includes detailed compatibility information. You can also use our device compatibility checker or contact our support team for personalized assistance.'
        },
        {
          question: 'Are your products authentic?',
          answer: 'Yes, all our products are 100% authentic and sourced directly from manufacturers or authorized distributors. We guarantee the authenticity of every item we sell.'
        },
        {
          question: 'Do products come with warranties?',
          answer: 'Most products come with manufacturer warranties ranging from 6 months to 2 years. Warranty information is listed on each product page. We also offer extended warranty options for select items.'
        },
        {
          question: 'Can I get product recommendations?',
          answer: 'Our customer service team is happy to help you find the perfect accessories for your needs. You can also check out our buying guides and customer reviews for guidance.'
        }
      ]
    },
    {
      title: 'Account & Security',
      icon: Shield,
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click on "Sign In" in the top navigation, then select "Create Account." Fill in your information and you\'ll be ready to start shopping with saved preferences and order history.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'On the sign-in page, click "Forgot Password" and enter your email address. We\'ll send you instructions to reset your password securely.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without your consent. Read our Privacy Policy for full details.'
        },
        {
          question: 'How do I update my account information?',
          answer: 'Log into your account and go to the Profile page where you can update your personal information, shipping addresses, and communication preferences at any time.'
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.title, icon: category.icon }))
  );

  const filteredFaqs = searchTerm 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

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
            <h1 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about our products, shipping, returns, and more.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl border-2 focus:border-primary"
            />
          </div>
        </div>

        {/* Search Results */}
        {filteredFaqs && (
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">
              Search Results ({filteredFaqs.length} found)
            </h2>
            {filteredFaqs.length === 0 ? (
              <Card className="ios-card">
                <CardContent className="p-8 text-center">
                  <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try searching with different keywords or browse the categories below.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="multiple" className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <Card key={index} className="ios-card">
                    <AccordionItem value={`search-${index}`} className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <faq.icon className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <div className="font-medium text-foreground">{faq.question}</div>
                            <div className="text-sm text-muted-foreground">{faq.category}</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                ))}
              </Accordion>
            )}
          </div>
        )}

        {/* Categories */}
        {!filteredFaqs && (
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="ios-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
                  </div>
                  
                  <Accordion type="multiple" className="space-y-2">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border border-border rounded-lg"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <Card className="ios-card mt-12">
          <CardContent className="p-8 text-center">
            <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Still Need Help?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our customer support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gap-2">
                <Phone className="w-4 h-4" />
                Call: +1 (555) 123-4567
              </Button>
              <Button variant="outline">
                Email: support@specd.com
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Support Hours: Monday - Friday, 9 AM - 6 PM EST
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQsPage;
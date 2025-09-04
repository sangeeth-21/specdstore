import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Smartphone,
  Shield,
  Truck,
  CreditCard
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Products', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Track Order', href: '/orders' },
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Returns & Exchanges', href: '/returns' },
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Size Guide', href: '/size-guide' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms-conditions' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Cookie Policy', href: '/cookies' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const trustBadges = [
    { icon: Shield, text: 'Secure Payment' },
    { icon: Truck, text: 'Free Shipping' },
    { icon: CreditCard, text: 'Easy Returns' },
    { icon: Smartphone, text: '100% Authentic' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {trustBadges.map(({ icon: Icon, text }, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-accent/30">
              <Icon className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{text}</span>
            </div>
          ))}
        </div>

        <Separator className="mb-12" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <img 
                  src="/specd-logo.png"
                  alt="Specd Store"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground leading-none">Specd</span>
                <span className="text-xs text-muted-foreground -mt-0.5 leading-none self-end">Store</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Your trusted destination for premium mobile accessories. We provide high-quality products 
              that enhance your mobile experience with style and functionality.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@specd.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map(({ title, links }, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-foreground">{title}</h4>
              <ul className="space-y-2">
                {links.map(({ label, href }, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Newsletter Signup */}
        <div className="mb-8">
          <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on new products and exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© {currentYear}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">Specd</span>
            </div>
            <span>All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms-conditions" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/faqs" className="hover:text-primary transition-colors">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
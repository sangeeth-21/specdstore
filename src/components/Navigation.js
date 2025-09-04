import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme, useCart, useUser } from '../App';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { 
  Sun, 
  Moon, 
  ShoppingCart, 
  User, 
  Package, 
  Menu,
  Store,
  Home,
  CreditCard
} from 'lucide-react';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const { user } = useUser();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { path: '/', label: 'Products', icon: Home },
    { path: '/checkout', label: 'Checkout', icon: CreditCard },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/orders', label: 'Orders', icon: Package },
  ];

  const isActivePath = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {navigationItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          onClick={onItemClick}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
            ${mobile ? 'w-full justify-start text-base' : 'text-sm'}
            ${isActivePath(path) 
              ? 'bg-primary text-primary-foreground shadow-lg' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }
          `}
        >
          <Icon className="w-4 h-4" />
          {label}
          {label === 'Checkout' && cartCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {cartCount}
            </Badge>
          )}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 group">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
              <img 
                src="/specd-logo.png"
                alt="Specd Store"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-none">
                Specd
              </span>
              <span className="text-xs text-muted-foreground -mt-0.5 leading-none self-end">
                Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLinks />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Cart Button */}
            <Link to="/checkout">
              <Button variant="ghost" size="sm" className="w-9 h-9 rounded-lg relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs animate-bounce-in"
                    variant="destructive"
                  >
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {/* User Status */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.name.split(' ')[0]}</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/profile">
                  <Button size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Sign In</span>
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 h-9">
                    <Menu className="w-4 h-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <div className="flex flex-col gap-4 mt-8">
                    {/* User Section */}
                    <div className="pb-4 border-b border-border">
                      {user ? (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      ) : (
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                          <Button className="w-full gap-2">
                            <User className="w-4 h-4" />
                            Sign In to Continue
                          </Button>
                        </Link>
                      )}
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-1">
                      <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                    </div>

                    {/* Theme Toggle Mobile */}
                    <Button
                      variant="outline"
                      onClick={toggleTheme}
                      className="w-full gap-2 mt-4"
                    >
                      {theme === 'light' ? (
                        <>
                          <Moon className="w-4 h-4" />
                          Switch to Dark Mode
                        </>
                      ) : (
                        <>
                          <Sun className="w-4 h-4" />
                          Switch to Light Mode
                        </>
                      )}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
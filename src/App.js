import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import CheckoutPage from './components/CheckoutPage';
import ProfilePage from './components/ProfilePage';
import OrdersPage from './components/OrdersPage';
import PaymentPage from './components/PaymentPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import FAQsPage from './components/FAQsPage';
import { Toaster } from './components/ui/sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;
const DEMO_MODE = !BACKEND_URL; // Enable demo mode when no backend URL

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Cart Context
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// User Context
const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

function App() {
  const [theme, setTheme] = useState('light');
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Initialize sample data on app start
  useEffect(() => {
    const initializeData = async () => {
      try {
        await axios.post(`${API}/init-data`);
        console.log('Sample data initialized');
      } catch (error) {
        console.log('Sample data already exists or error:', error.message);
      }
    };
    
    initializeData();
  }, []);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const themeValue = {
    theme,
    toggleTheme,
  };

  const cartValue = {
    cartItems,
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  };

  const userValue = {
    user,
    loginUser,
    logoutUser,
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <CartContext.Provider value={cartValue}>
        <UserContext.Provider value={userValue}>
          <div className={`min-h-screen ${theme}`}>
            <Router>
              <Navigation />
              <main className="bg-background text-foreground transition-colors duration-300">
                <Routes>
                  <Route path="/" element={<ProductsPage />} />
                  <Route path="/products" element={<ProductsPage />} />

                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-conditions" element={<TermsConditionsPage />} />
                  <Route path="/faqs" element={<FAQsPage />} />
                </Routes>
              </main>
              <Footer />
              <Toaster />
            </Router>
          </div>
        </UserContext.Provider>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
import React, { useState } from 'react';
import { useCart } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import { 
  Star, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Package,
  Truck,
  ShieldCheck,
  Heart,
  Share2,
  X
} from 'lucide-react';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }
    
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
    onClose();
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getCategoryIcon = (category) => {
    return <Package className="w-4 h-4" />;
  };

  // Mock additional images for demonstration
  const productImages = [
    product.image_url,
    product.image_url, // In real app, these would be different angles
    product.image_url,
  ];

  const features = [
    'Premium quality materials',
    'Compatible with all devices',
    'Easy installation',
    'Durable and long-lasting',
    '30-day money back guarantee'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide p-4 md:p-6 bg-card rounded-lg">
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Images */}
            <div className="relative bg-muted/30 rounded-l-lg overflow-hidden">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {/* Stock status overlay */}
                {product.stock <= 5 && product.stock > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive">
                      Only {product.stock} left
                    </Badge>
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>

              {/* Image thumbnails */}
              <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {/* Category */}
                <Badge variant="secondary" className="gap-1 w-fit">
                  {getCategoryIcon(product.category)}
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>

                {/* Product Title */}
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-bold text-left leading-tight">
                    {product.name}
                  </DialogTitle>
                </DialogHeader>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                    <span className="text-sm font-medium ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews_count} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Free Shipping
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <Separator />

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Key Features:</h4>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium text-lg">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    size="lg"
                    className="flex-1 gap-2 h-12 text-base"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.stock === 0 ? 'Out of Stock' : `Add ${quantity} to Cart`}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="lg" className="w-12 h-12 p-0">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="lg" className="w-12 h-12 p-0">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Total Price */}
                {quantity > 1 && (
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total:</span>
                      <span className="text-xl font-bold text-primary">
                        ₹{(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center space-y-1">
                  <Truck className="w-6 h-6 text-blue-500 mx-auto" />
                  <span className="text-xs text-muted-foreground">Fast Delivery</span>
                </div>
                <div className="text-center space-y-1">
                  <ShieldCheck className="w-6 h-6 text-green-500 mx-auto" />
                  <span className="text-xs text-muted-foreground">Secure Payment</span>
                </div>
                <div className="text-center space-y-1">
                  <Package className="w-6 h-6 text-orange-500 mx-auto" />
                  <span className="text-xs text-muted-foreground">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
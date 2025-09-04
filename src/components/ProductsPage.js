import React, { useState, useEffect } from 'react';
import { useCart } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ProductDetailModal from './ProductDetailModal';
import { toast } from 'sonner';
import { 
  ShoppingCart, 
  Star, 
  Search, 
  Filter,
  Package,
  Smartphone,
  Battery,
  Headphones,
  Cable,
  Monitor,
  Eye
} from 'lucide-react';



const ProductsPage = () => {
  const sampleProducts = [
    {
      id: '1',
      name: 'Wireless Earbuds',
      description: 'High-quality wireless earbuds with noise cancellation and long battery life.',
      price: 79.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Earbuds',
      rating: 4.5,
      stock: 50,
      category: 'audio',
    },
    {
      id: '2',
      name: 'Fast Charger Adapter',
      description: '20W USB-C power adapter for rapid charging of your devices.',
      price: 24.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Charger',
      rating: 4.0,
      stock: 120,
      category: 'chargers',
    },
    {
      id: '3',
      name: 'Protective Phone Case',
      description: 'Durable and stylish phone case with military-grade drop protection.',
      price: 19.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Phone+Case',
      rating: 4.8,
      stock: 80,
      category: 'cases',
    },
    {
      id: '4',
      name: 'USB-C to Lightning Cable',
      description: 'Braided 6ft cable for fast charging and data transfer.',
      price: 14.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Cable',
      rating: 4.2,
      stock: 200,
      category: 'cables',
    },
    {
      id: '5',
      name: 'Car Mount Holder',
      description: 'Universal car mount for smartphones, strong grip and 360-degree rotation.',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Car+Mount',
      rating: 3.9,
      stock: 60,
      category: 'mounts',
    },
    {
      id: '6',
      name: 'Portable Power Bank',
      description: '10000mAh power bank with dual USB output for on-the-go charging.',
      price: 39.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Power+Bank',
      rating: 4.3,
      stock: 90,
      category: 'chargers',
    },
  ];

  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { addToCart } = useCart();

  const categories = [
    { value: 'all', label: 'All Categories', icon: Package },
    { value: 'cases', label: 'Cases & Protection', icon: Smartphone },
    { value: 'chargers', label: 'Chargers & Power', icon: Battery },
    { value: 'audio', label: 'Audio & Headphones', icon: Headphones },
    { value: 'cables', label: 'Cables & Adapters', icon: Cable },
    { value: 'mounts', label: 'Mounts & Stands', icon: Monitor },
    { value: 'accessories', label: 'Accessories', icon: Package },
  ];



  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy]);



  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
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
    const categoryData = categories.find(cat => cat.value === category);
    if (categoryData) {
      const Icon = categoryData.icon;
      return <Icon className="w-4 h-4" />;
    }
    return <Package className="w-4 h-4" />;
  };



  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Premium Mobile Accessories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest and greatest accessories for your mobile devices
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl border-2 focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 h-12 rounded-xl border-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Select category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ value, label, icon: Icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 h-12 rounded-xl border-2">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Best Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {categories.find(cat => cat.value === selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="ios-card group animate-in">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="gap-1">
                        {getCategoryIcon(product.category)}
                        {categories.find(cat => cat.value === product.category)?.label.split(' ')[0]}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleProductClick(product)}
                        className="w-8 h-8 p-0 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    {product.stock <= 5 && product.stock > 0 && (
                      <div className="absolute bottom-3 left-3">
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
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 
                      className="text-lg font-semibold text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({product.reviews_count})
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex flex-col md:flex-row justify-between items-center gap-2">
                  <Button
                    onClick={() => handleProductClick(product)}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full gap-2 btn-primary"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Product Detail Modal */}
        <ProductDetailModal 
          product={selectedProduct}
          isOpen={isDetailModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
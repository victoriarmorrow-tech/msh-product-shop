import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, Star, Search, Filter, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Heritage Leather Backpack",
    price: 129.00,
    category: "Accessories",
    rating: 4.8,
    image: "https://placehold.co/600x600/f0fdf4/064e3b?text=Leather+Backpack",
    description: "Full-grain leather backpack featuring a dedicated laptop sleeve and water-resistant lining."
  },
  {
    id: 2,
    name: "Premium Cotton Crewneck",
    price: 45.00,
    category: "Apparel",
    rating: 4.5,
    image: "https://placehold.co/600x600/fffbeb/064e3b?text=Cotton+Crewneck",
    description: "Heavyweight organic cotton t-shirt with a relaxed fit and durable stitching."
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    price: 299.00,
    category: "Electronics",
    rating: 4.9,
    image: "https://placehold.co/600x600/ecfccb/064e3b?text=Headphones",
    description: "Industry-leading noise cancellation with 30-hour battery life and premium sound."
  },
  {
    id: 4,
    name: "Ceramic Coffee Pour-Over",
    price: 35.00,
    category: "Home",
    rating: 4.7,
    image: "https://placehold.co/600x600/f0fdf4/064e3b?text=Pour-Over+Set",
    description: "Hand-thrown ceramic dripper designed for the perfect extraction."
  },
  {
    id: 5,
    name: "Analog Chronograph Watch",
    price: 189.00,
    category: "Accessories",
    rating: 4.6,
    image: "https://placehold.co/600x600/fffbeb/064e3b?text=Chronograph",
    description: "Stainless steel case with a genuine leather strap and sapphire crystal glass."
  },
  {
    id: 6,
    name: "Smart Home Speaker",
    price: 99.00,
    category: "Electronics",
    rating: 4.4,
    image: "https://placehold.co/600x600/ecfccb/064e3b?text=Smart+Speaker",
    description: "Voice-controlled speaker with 360-degree sound and smart home integration."
  },
  {
    id: 7,
    name: "Merino Wool Scarf",
    price: 65.00,
    category: "Apparel",
    rating: 4.9,
    image: "https://placehold.co/600x600/f0fdf4/064e3b?text=Wool+Scarf",
    description: "Soft, breathable merino wool scarf perfect for colder climates."
  },
  {
    id: 8,
    name: "Modern Desk Lamp",
    price: 85.00,
    category: "Home",
    rating: 4.3,
    image: "https://placehold.co/600x600/fffbeb/064e3b?text=Desk+Lamp",
    description: "Adjustable LED desk lamp with wireless charging base and touch controls."
  }
];

const CATEGORIES = ["All", "Apparel", "Accessories", "Electronics", "Home"];

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-emerald-900 text-white hover:bg-emerald-800 shadow-md hover:shadow-lg shadow-emerald-900/20",
    secondary: "bg-white text-emerald-900 border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50",
    outline: "bg-transparent text-emerald-900 border border-emerald-900 hover:bg-emerald-900 hover:text-white",
    ghost: "bg-transparent text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
    {children}
  </span>
);

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 mix-blend-multiply opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-lg text-emerald-900 hover:bg-emerald-50 hover:text-emerald-700">
            <ShoppingBag size={18} onClick={() => onAddToCart(product)} />
          </button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">{product.category}</p>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold text-stone-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-stone-900 text-lg mb-2 leading-tight group-hover:text-emerald-800 transition-colors font-serif">
          {product.name}
        </h3>
        
        <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
          <span className="text-xl font-bold text-emerald-900">${product.price.toFixed(2)}</span>
          <Button 
            variant="ghost" 
            className="!px-3 !py-1.5 text-sm !font-semibold text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2 font-serif">
            <ShoppingBag size={20} />
            Your Cart <span className="text-sm font-sans font-normal text-stone-500">({cartItems.length} items)</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/30">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-stone-500">
              <ShoppingBag size={48} className="text-stone-300" />
              <p className="font-medium">Your cart is empty.</p>
              <Button variant="secondary" onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-lg border border-stone-100 shadow-sm">
                <div className="w-20 h-20 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-stone-900 line-clamp-1 font-serif">{item.name}</h4>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-stone-500 mb-2">{item.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-emerald-900">${item.price.toFixed(2)}</span>
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                      <button 
                        className="p-1 hover:bg-white hover:text-emerald-700 text-stone-500 transition-colors"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-medium text-stone-700">{item.quantity}</span>
                      <button 
                        className="p-1 hover:bg-white hover:text-emerald-700 text-stone-500 transition-colors"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-emerald-950 pt-3 border-t border-stone-100 font-serif">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full bg-emerald-900 hover:bg-emerald-950" onClick={onCheckout}>
              Checkout <ArrowRight size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  // Computed
  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Handlers
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Show Notification
    setNotification(`${product.name} added to cart`);
    setTimeout(() => setNotification(null), 3000);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout demo!");
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-emerald-950">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-stone-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-900 text-white p-1.5 rounded-sm">
              <ShoppingBag size={20} />
            </div>
            <span className="text-2xl font-bold tracking-tight font-serif text-emerald-950">LUMOS<span className="text-amber-500">.</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-emerald-800 transition-colors">New Arrivals</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-emerald-800 transition-colors">Collections</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-emerald-800 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-stone-100 rounded-full text-stone-600 transition-colors hover:text-emerald-800">
              <Search size={20} />
            </button>
            <button 
              className="relative p-2 hover:bg-stone-100 rounded-full text-stone-600 transition-colors group hover:text-emerald-800"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-stone-100 rounded-full text-stone-600">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-20">
        <div className="relative bg-emerald-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://placehold.co/1920x800/064e3b/ffffff?text=Botanical+Pattern')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950/90"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-2xl">
              <Badge>New Season 2024</Badge>
              <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] font-serif">
                Timeless <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Design.</span>
              </h1>
              <p className="mt-6 text-lg text-emerald-100/80 max-w-lg leading-relaxed font-light">
                Curated essentials for a life well-lived. Discover our new collection of sustainable goods in our signature verdant hues.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="!bg-amber-500 !text-emerald-950 hover:!bg-amber-400 border-none font-bold">
                  Shop Collection
                </Button>
                <Button variant="outline" className="!text-amber-100 !border-amber-100/30 hover:!bg-emerald-900 hover:!border-amber-100 hover:!text-white">
                  View Lookbook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-emerald-950 font-serif">Latest Arrivals</h2>
            <p className="text-stone-500 mt-1">Hand-picked items for your sanctuary</p>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
             <div className="flex items-center gap-1 p-1 bg-white border border-stone-200 rounded-lg shadow-sm">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      activeCategory === cat 
                        ? 'bg-emerald-900 text-white shadow-md' 
                        : 'text-stone-500 hover:text-emerald-900 hover:bg-stone-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             <button className="p-2.5 bg-white border border-stone-200 rounded-lg text-stone-500 hover:text-emerald-900 hover:border-emerald-200 transition-colors ml-2 shadow-sm">
               <Filter size={18} />
             </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>

        {/* Empty State if filter returns nothing */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center bg-white rounded-xl border border-stone-100 border-dashed">
            <p className="text-lg text-stone-500 font-serif italic">No products found in this category.</p>
            <Button 
              variant="outline" 
              className="mt-6 mx-auto" 
              onClick={() => setActiveCategory("All")}
            >
              View All Products
            </Button>
          </div>
        )}

        {/* Promo Section */}
        <div className="mt-24 bg-emerald-900 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-emerald-900/20">
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center text-white space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-xs">
                    <Star size={14} fill="currentColor" />
                    Lumos Membership
                </div>
                <h3 className="text-4xl font-bold font-serif text-white">Join the Circle.</h3>
                <p className="text-emerald-200 max-w-md text-lg">Unlock exclusive access to limited runs, early sales, and a 15% discount on your first gold-tier order.</p>
                <div className="flex gap-2 max-w-sm w-full pt-2">
                    <input type="email" placeholder="Email address" className="flex-1 px-4 py-3 rounded-lg bg-emerald-800 border border-emerald-700 text-white placeholder:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                    <Button className="!bg-amber-500 !text-emerald-950 hover:!bg-amber-400">Join</Button>
                </div>
            </div>
            <div className="w-full md:w-2/5 min-h-[300px] relative">
               <img 
                 src="https://placehold.co/800x800/064e3b/ecfccb?text=Luxe+Lifestyle" 
                 className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-lighten" 
                 alt="Newsletter" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent md:bg-gradient-to-l"></div>
            </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1 pr-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-900 text-white p-1 rounded-sm">
                  <ShoppingBag size={16} />
                </div>
                <span className="text-lg font-bold font-serif text-emerald-950">LUMOS</span>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed">
                Refined goods for the modern aesthete. Blending functional minimalism with organic textures and timeless color palettes.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-emerald-950 mb-6 font-serif">Shop</h4>
              <ul className="space-y-3 text-sm text-stone-500">
                <li><a href="#" className="hover:text-emerald-700 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Accessories</a></li>
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Home Goods</a></li>
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Archive</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-emerald-950 mb-6 font-serif">Support</h4>
              <ul className="space-y-3 text-sm text-stone-500">
                <li><a href="#" className="hover:text-emerald-700 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Care Guide</a></li>
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-emerald-950 mb-6 font-serif">Legal</h4>
              <ul className="space-y-3 text-sm text-stone-500">
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-sm">© 2024 LUMOS Store Inc. All rights reserved.</p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 hover:bg-emerald-50 hover:text-emerald-800 transition-all cursor-pointer">
                  <span className="text-xs font-bold">In</span>
               </div>
               <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 hover:bg-emerald-50 hover:text-emerald-800 transition-all cursor-pointer">
                  <span className="text-xs font-bold">Tw</span>
               </div>
               <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 hover:bg-emerald-50 hover:text-emerald-800 transition-all cursor-pointer">
                  <span className="text-xs font-bold">Fb</span>
               </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer & Notification */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-emerald-900 text-white px-6 py-4 rounded-lg shadow-xl shadow-emerald-900/20 z-50 animate-bounce-short flex items-center gap-3 border-l-4 border-amber-500">
           <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
           <span className="font-medium tracking-wide">{notification}</span>
        </div>
      )}

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
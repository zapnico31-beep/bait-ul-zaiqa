/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  ChevronRight,
  Instagram,
  Facebook,
  UtensilsCrossed
} from 'lucide-react';

// Menu Data
const MENU_ITEMS = [
  {
    id: 1,
    name: "Ranjha Gosht",
    description: "1 KG Mutton with aromatic rice. Our signature Jhanda Wala special.",
    price: 4200,
    category: "Special",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Murgi Chawal",
    nameUrdu: "دجاج شوايه رز البخاري",
    description: "1 Whole Chicken served with traditional Bukhari rice.",
    price: 2500,
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Beef Mandi",
    nameUrdu: "بيف مندي",
    description: "1 KG tender Beef served with Mandi rice.",
    price: 2400,
    category: "Beef",
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Mutton Mandi (1/2 KG)",
    nameUrdu: "لحم مندي",
    description: "1/2 KG succulent Mutton served with Mandi rice.",
    price: 2400,
    category: "Mutton",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Mutton Mandi (1 KG)",
    nameUrdu: "لحم مندي",
    description: "1 KG succulent Mutton served with Mandi rice.",
    price: 4200,
    category: "Mutton",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Chicken Mandi (1/2)",
    nameUrdu: "دجاج مندي",
    description: "1/2 Chicken served with Mandi rice.",
    price: 1300,
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Chicken Mandi (Full)",
    nameUrdu: "دجاج مندي",
    description: "1 Whole Chicken served with Mandi rice.",
    price: 2400,
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Deal 1 - Combo Meal",
    description: "1/2 KG Chicken Mandi + 1/2 KG Mutton Ranjha Gosht + 1L Next Cola Free.",
    price: 3400,
    category: "Deals",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Deal 2 - Combo Meal",
    description: "1/2 KG Mutton Mandi + Half Chicken Heer + 1L Next Cola Free.",
    price: 3400,
    category: "Deals",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Deal 3 - Combo Meal",
    description: "Half Chicken Heer with Rice + Half Chicken Mandi with Rice + 1L Next Cola Free.",
    price: 2600,
    category: "Deals",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 11,
    name: "Deal 4 - Combo Meal",
    description: "1/2 KG Beef Ranjha Gosht with Rice + Half Beef Mandi with Rice + 1L Next Cola Free.",
    price: 2800,
    category: "Deals",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ["All", "Deals", "Special", "Mutton", "Chicken", "Beef"];

  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, cartItem) => {
    const item = MENU_ITEMS.find(i => i.id === cartItem.id);
    return acc + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const placeOrder = () => {
    const orderItems = cart.map(cartItem => {
      const item = MENU_ITEMS.find(i => i.id === cartItem.id);
      return `${item?.name} x ${cartItem.quantity} (Rs ${((item?.price || 0) * cartItem.quantity)})`;
    }).join('\n');

    const message = `Assalam-o-Alaikum! I'd like to place an order at Bait Ul Zaiqa:\n\n${orderItems}\n\nTotal: Rs ${cartTotal}\n\nDelivery Location: Okara\n(Note: Order placed 3 hours before)`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/923218380286?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-maroon">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-maroon/80 backdrop-blur-md border-b border-gold/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="text-maroon w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider text-gold-gradient">BAIT UL ZAIQA</h1>
              <p className="text-[10px] text-gold/70 tracking-widest uppercase">Taste at your doorstep</p>
            </div>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {["Home", "Menu", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gold/10 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-gold" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-luxury-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2"
            >
              <ShoppingBag className="w-6 h-6 text-gold" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-luxury-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            <button onClick={() => setIsNavOpen(true)}>
              <MenuIcon className="w-6 h-6 text-gold" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[60] bg-luxury-black p-8 flex flex-col"
          >
            <button onClick={() => setIsNavOpen(false)} className="self-end mb-8">
              <X className="w-8 h-8 text-gold" />
            </button>
            <div className="flex flex-col gap-8 items-center text-2xl font-serif">
              {["Home", "Menu", "About", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsNavOpen(false)}
                  className="hover:text-gold transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-maroon/40 via-maroon/60 to-maroon"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 border border-gold/30 rounded-full mb-6 bg-gold/5">
              <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">Exclusively in Okara</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
              <span className="block text-white">بيت الزایقہ</span>
              <span className="text-gold-gradient italic">Royal Taste</span>
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the authentic flavors of Mandi and traditional delights. 
              Delivered fresh and hot, only in Okara.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#menu" 
                className="gold-gradient text-maroon px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform flex items-center gap-2"
              >
                Explore Menu <ChevronRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2 text-gold px-6">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-medium tracking-wider">ORDER 3 HOURS BEFORE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-24 bg-maroon-light/5 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <p className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4 italic">Limited Time</p>
              <h2 className="text-5xl font-serif">Combo Deals</h2>
            </div>
            <button 
              onClick={() => {
                setActiveCategory("Deals");
                const menuEl = document.getElementById('menu');
                menuEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gold border-b border-gold/40 pb-1 text-sm font-bold tracking-widest uppercase hover:text-white hover:border-white transition-all"
            >
              See All Deals
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MENU_ITEMS.filter(item => item.category === "Deals").slice(0, 2).map((deal, idx) => (
              <motion.div 
                key={deal.id}
                whileHover={{ y: -10 }}
                className="relative overflow-hidden rounded-3xl group cursor-pointer"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={deal.image} alt={deal.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="inline-block px-3 py-1 bg-gold text-maroon text-[10px] font-bold rounded-full mb-3 uppercase tracking-wider">Most Popular</div>
                      <h3 className="text-3xl font-serif mb-2">{deal.name}</h3>
                      <p className="text-white/70 text-sm max-w-xs">{deal.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gold uppercase tracking-widest mb-1">Starting From</p>
                      <p className="text-3xl font-bold text-white">Rs {deal.price}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(deal.id);
                        }}
                        className="mt-4 px-6 py-2 bg-white text-maroon rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gold transition-colors"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Icons */}
      <section className="py-12 bg-maroon-light/20 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
              <Phone className="w-5 h-5 text-gold group-hover:text-maroon" />
            </div>
            <div>
              <p className="text-[10px] text-gold/60 uppercase tracking-widest mb-1">Contact Us</p>
              <p className="font-bold">0321 8380286</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
              <Clock className="w-5 h-5 text-gold group-hover:text-maroon" />
            </div>
            <div>
              <p className="text-[10px] text-gold/60 uppercase tracking-widest mb-1">Advance Booking</p>
              <p className="font-bold">3 Hours Required</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
              <MapPin className="w-5 h-5 text-gold group-hover:text-maroon" />
            </div>
            <div>
              <p className="text-[10px] text-gold/60 uppercase tracking-widest mb-1">Serving Area</p>
              <p className="font-bold">Okara City Only</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-maroon relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-gold/20 shadow-2xl shadow-gold/5">
                <img 
                  src="https://images.unsplash.com/photo-1550966842-28c4601460bc?q=80&w=1000&auto=format&fit=crop" 
                  alt="Chef at work" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-gold p-8 rounded-2xl shadow-2xl hidden md:block border border-white/20">
                <p className="text-maroon font-serif text-3xl font-bold italic">Bait Ul Zaiqa</p>
                <p className="text-maroon text-[10px] font-bold tracking-widest uppercase mt-2">Authentic Culinary Heritage</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4 italic">The Heritage</p>
                <h2 className="text-5xl md:text-6xl font-serif leading-tight">Mastering the Art of <span className="text-gold-gradient italic">Mandi</span></h2>
              </div>
              
              <div className="space-y-6 text-white/70 leading-relaxed text-lg">
                <p>
                  At Bait Ul Zaiqa, we believe that food is a celebration of culture and tradition. Our journey started with a single passion: to bring the authentic, slow-cooked flavors of the Arabian desert and the rich heritage of Pakistani cuisine to the heart of Okara.
                </p>
                <p>
                  Every dish is prepared using premium aged basmati rice, hand-selected spices, and the finest cuts of meat. Our signature "Ranjha Gosht" and "Mandi" are not just meals; they are experiences crafted with patience and precision.
                </p>
                <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 border border-gold/10 rounded-2xl bg-gold/5 backdrop-blur-sm group hover:border-gold/30 transition-all">
                    <p className="text-gold font-serif text-2xl mb-1 group-hover:scale-105 transition-transform origin-left">Authentic</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">Traditional Methods Only</p>
                  </div>
                  <div className="p-6 border border-gold/10 rounded-2xl bg-gold/5 backdrop-blur-sm group hover:border-gold/30 transition-all">
                    <p className="text-gold font-serif text-2xl mb-1 group-hover:scale-105 transition-transform origin-left">Premium</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">Selected Fine Ingredients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-maroon relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4 italic">The Collection</p>
            <h2 className="text-5xl md:text-6xl font-serif">Curated Menu</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'gold-gradient text-maroon font-bold shadow-lg shadow-gold/20' 
                    : 'border border-gold/20 text-gold/70 hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-maroon-light/10 rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4 bg-maroon/60 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30">
                      <p className="text-gold font-bold text-sm">Rs {item.price}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-2xl font-serif text-white group-hover:text-gold transition-colors">{item.name}</h3>
                        {item.nameUrdu && <p className="text-gold/60 text-sm mt-1">{item.nameUrdu}</p>}
                      </div>
                    </div>
                    <p className="text-white/60 text-sm mb-8 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="w-full py-3 bg-transparent border border-gold text-gold rounded-full font-bold text-xs tracking-widest uppercase hover:bg-gold hover:text-maroon transition-all duration-300"
                    >
                      Add To Order
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-maroon/90 backdrop-blur-md"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-maroon-light/20 border border-gold/30 rounded-3xl overflow-hidden shadow-2xl shadow-gold/10"
            >
              <div className="p-8 border-b border-gold/10 flex justify-between items-center bg-maroon">
                <h2 className="text-2xl font-serif text-gold">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="w-6 h-6 text-gold" />
                </button>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto bg-maroon/40">
                {cart.length === 0 ? (
                  <p className="text-center text-white/50 py-12 italic">Your order list is empty.</p>
                ) : (
                  <div className="space-y-6">
                    {cart.map(cartItem => {
                      const item = MENU_ITEMS.find(i => i.id === cartItem.id);
                      if (!item) return null;
                      return (
                        <div key={cartItem.id} className="flex justify-between items-center">
                          <div className="flex gap-4 items-center">
                             <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gold/20" />
                             <div>
                               <p className="font-serif text-white">{item.name}</p>
                               <p className="text-gold/60 text-xs mt-1">Rs {item.price}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gold/20 rounded-full px-2 py-1">
                              <button onClick={() => updateQuantity(cartItem.id, -1)} className="p-1 text-gold"><X className="w-3 h-3" /></button>
                              <span className="px-3 text-sm font-bold text-white">{cartItem.quantity}</span>
                              <button onClick={() => updateQuantity(cartItem.id, 1)} className="p-1 text-gold"><Plus className="w-3 h-3" /></button>
                            </div>
                            <button onClick={() => removeFromCart(cartItem.id)} className="text-white/30 hover:text-red-500">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-maroon border-t border-gold/10">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-white/60 font-medium">Grand Total</p>
                    <p className="text-3xl font-serif text-gold">Rs {cartTotal}</p>
                  </div>
                  <button 
                    onClick={placeOrder}
                    className="w-full py-4 gold-gradient text-maroon rounded-full font-bold tracking-[0.2em] uppercase shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                  >
                    Confirm Order via WhatsApp
                  </button>
                  <p className="text-center text-[10px] text-white/40 mt-4 tracking-widest uppercase">
                    Delivery only in Okara • 3 hours notice required
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contact" className="bg-maroon border-t border-gold/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center overflow-hidden">
                   <UtensilsCrossed className="text-maroon w-6 h-6" />
                 </div>
                 <h2 className="text-2xl font-bold tracking-wider text-gold-gradient uppercase">BAIT UL ZAIQA</h2>
              </div>
              <p className="text-white/50 leading-relaxed mb-8 max-w-sm">
                Bringing the authentic Bukhari and Mandi traditions to Okara with a royal touch. 
                Quality and taste that speaks for itself.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center hover:bg-gold transition-colors group cursor-pointer">
                    <Icon className="w-5 h-5 text-gold group-hover:text-luxury-black" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-gold font-bold uppercase tracking-widest text-xs mb-8">Navigation</h3>
              <ul className="space-y-4 text-white/70 text-sm">
                <li><a href="#home" className="hover:text-gold">Home</a></li>
                <li><a href="#menu" className="hover:text-gold">Our Menu</a></li>
                <li><a href="#about" className="hover:text-gold">About Us</a></li>
                <li><a href="#contact" className="hover:text-gold">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gold font-bold uppercase tracking-widest text-xs mb-8">Contact</h3>
              <ul className="space-y-4 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                  <span>Serving exclusively in Okara City</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <span>0321 8380286</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <span>Order 3 hours in advance</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-10 border-t border-gold/5">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
              © 2024 Bait Ul Zaiqa • Designed for Excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

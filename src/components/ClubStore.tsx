import { useState } from 'react';
import { CLUB_SHOP_ITEMS, CLUB_INFO, ShopItem } from '../data/clubData';
import { soundEffects } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import { ShoppingBag, Sparkles, Check, Plus, Minus, X, Trash2 } from 'lucide-react';

export interface CartItem {
  id: string;
  item: ShopItem;
  size: string;
  customName?: string;
  customNumber?: string;
  price: number;
  quantity: number;
}

interface ClubStoreProps {
  cart: CartItem[];
  addToCart: (item: ShopItem, size: string, customName?: string, customNumber?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  presetPlayerName?: string;
  presetPlayerNum?: number;
}

export function ClubStore({
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  isCartOpen,
  setIsCartOpen,
  presetPlayerName,
  presetPlayerNum,
}: ClubStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customName, setCustomName] = useState<string>(presetPlayerName || 'ADELEKE');
  const [customNumber, setCustomNumber] = useState<string>(presetPlayerNum ? String(presetPlayerNum) : '8');
  const [selectedJersey, setSelectedJersey] = useState<'home' | 'away' | 'third'>('home');
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [hasChampionBadge, setHasChampionBadge] = useState<boolean>(true);
  const [customAddedSuccess, setCustomAddedSuccess] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  const filteredItems = CLUB_SHOP_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleAddCustomJersey = () => {
    const baseItem = CLUB_SHOP_ITEMS.find((i) => i.id === `kit-${selectedJersey}`) || CLUB_SHOP_ITEMS[0];
    const finalPrice = baseItem.price + (hasChampionBadge ? 10 : 0);
    
    addToCart(
      { ...baseItem, price: finalPrice },
      selectedSize,
      customName.toUpperCase(),
      customNumber
    );

    soundEffects.playGoalCheer();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });

    setCustomAddedSuccess(true);
    setTimeout(() => setCustomAddedSuccess(false), 2500);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    soundEffects.playGoalCheer();
    confetti({
      particleCount: 100,
      spread: 80,
    });
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <section id="store" className="py-20 bg-neutral-950 text-white border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Official Simolat Megastore</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-heading mt-1 uppercase tracking-tight">
              Wear The Green & White
            </h2>
            <p className="text-sm text-neutral-300 mt-2 max-w-xl">
              Authentic match kits, training wear, and exclusive supporter accessories delivered globally.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black rounded-xl border border-neutral-800">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'kits', label: 'Match Kits' },
              { id: 'training', label: 'Training Pro' },
              { id: 'accessories', label: 'Accessories' },
              { id: 'equipment', label: 'Balls & Gear' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED: Interactive Custom Kit Designer (White, Green, and Black) */}
        <div className="mb-16 bg-gradient-to-br from-black via-neutral-950 to-emerald-950/60 rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Interactive 3D Kit Studio
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-heading mt-2 uppercase">
              Customize Your 2026/27 Official Jersey
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              Personalize with your surname, favorite squad star, gold Premier League badge, and official typography.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Shirt Back Preview (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 h-96 rounded-2xl p-6 flex flex-col items-center justify-between shadow-2xl border-2 border-emerald-400/50 transition-all duration-300 overflow-hidden"
                style={{
                  background: selectedJersey === 'home' 
                    ? 'radial-gradient(circle at 50% 20%, #065f46 0%, #022c22 90%)'
                    : selectedJersey === 'away'
                    ? 'radial-gradient(circle at 50% 20%, #f8fafc 0%, #cbd5e1 90%)'
                    : 'radial-gradient(circle at 50% 20%, #171717 0%, #000000 90%)'
                }}
              >
                {/* Emerald & White Piping Texture line */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-white to-emerald-500" />
                
                {/* Club Crest Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <img src={CLUB_INFO.crestImage} alt="Watermark" referrerPolicy="no-referrer" className="w-64 h-64 object-contain" />
                </div>

                {/* Back Collar Tag */}
                <div className="text-center z-10 pt-2">
                  <span className={`text-[10px] tracking-widest uppercase font-black px-3 py-0.5 rounded-full border ${
                    selectedJersey === 'away'
                      ? 'bg-black text-white border-neutral-800'
                      : 'bg-black/80 text-emerald-400 border-emerald-400/30'
                  }`}>
                    SIMOLAT SPORTING FC
                  </span>
                </div>

                {/* Custom Name & Number */}
                <div className="text-center z-10 space-y-1 my-auto">
                  <div className={`text-3xl sm:text-4xl font-black tracking-widest uppercase font-heading drop-shadow-md ${
                    selectedJersey === 'away' ? 'text-black' : 'text-white'
                  }`}>
                    {customName || 'NAME'}
                  </div>
                  <div className={`text-7xl sm:text-8xl font-black font-heading leading-none ${
                    selectedJersey === 'away' ? 'text-emerald-700' : 'text-emerald-400 drop-shadow-[0_8px_16px_rgba(16,185,129,0.4)]'
                  }`}>
                    {customNumber || '10'}
                  </div>
                </div>

                {/* Shirt Bottom Badges */}
                <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-black/10 text-[10px]">
                  <div className={`flex items-center gap-1 font-bold ${
                    selectedJersey === 'away' ? 'text-neutral-800' : 'text-neutral-300'
                  }`}>
                    <span>★ SIMOLAT FC</span>
                  </div>
                  {hasChampionBadge && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-black text-[9px] uppercase tracking-wider shadow">
                      CHAMPIONS '26
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Customizer Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-5 bg-black/80 p-6 sm:p-8 rounded-2xl border border-neutral-800">
              
              {/* Kit Edition Selection */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  1. Select Edition
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'home', label: 'Home Emerald Green', color: 'bg-emerald-600' },
                    { id: 'away', label: 'Away Pure White', color: 'bg-white' },
                    { id: 'third', label: 'Third Onyx Black', color: 'bg-neutral-900' },
                  ].map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => setSelectedJersey(k.id as 'home' | 'away' | 'third')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedJersey === k.id
                          ? 'border-emerald-400 bg-emerald-500/10 text-white ring-2 ring-emerald-400'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full ${k.color} border border-neutral-700 mx-auto mb-1`} />
                      <div className="text-xs font-bold">{k.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Number Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                    Jersey Name (Back Print)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                    placeholder="E.G. SIMEON"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm font-bold text-white uppercase tracking-wider focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                    Squad Number (1 - 99)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value)}
                    placeholder="10"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Preset squad stars quick pick */}
              <div>
                <span className="text-[11px] text-neutral-400 uppercase font-semibold mr-2">
                  Quick Star Pick:
                </span>
                <div className="inline-flex flex-wrap gap-1.5 mt-1">
                  {[
                    { name: 'MENSAH', num: '14' },
                    { name: 'ADELEKE', num: '8' },
                    { name: 'STERLING', num: '4' },
                    { name: 'VANE', num: '10' },
                    { name: 'AMADI', num: '7' },
                  ].map((star) => (
                    <button
                      key={star.name}
                      type="button"
                      onClick={() => {
                        setCustomName(star.name);
                        setCustomNumber(star.num);
                      }}
                      className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-bold text-neutral-300 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {star.name} #{star.num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size and Badge options */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                    Size
                  </label>
                  <div className="flex items-center gap-1.5">
                    {['S', 'M', 'L', 'XL', '2XL'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`w-9 h-9 rounded-lg font-bold text-xs border cursor-pointer ${
                          selectedSize === s
                            ? 'bg-emerald-500 text-black border-emerald-400 shadow'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="badgeToggle"
                    checked={hasChampionBadge}
                    onChange={(e) => setHasChampionBadge(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="badgeToggle" className="text-xs font-semibold text-neutral-300 cursor-pointer">
                    Gold Champions Sleeve Badge (+€10)
                  </label>
                </div>
              </div>

              {/* Add Custom Jersey Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleAddCustomJersey}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  {customAddedSuccess ? (
                    <>
                      <Check className="w-5 h-5 text-black stroke-[3]" />
                      <span>Customized Shirt Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add Personalized Jersey (€{85 + (hasChampionBadge ? 10 : 0)})</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* General Store Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-black rounded-3xl border-2 border-emerald-500/20 hover:border-emerald-500 transition-all shadow-xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden bg-neutral-900 flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                />
                {item.badge && (
                  <span className="absolute top-4 left-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow">
                    {item.badge}
                  </span>
                )}
                <div className="absolute bottom-4 right-4 bg-black/90 text-emerald-400 font-heading font-black text-xl px-3 py-1 rounded-lg border border-neutral-800 shadow">
                  €{item.price}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item, item.sizes ? item.sizes[1] || 'M' : 'Standard')}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-emerald-500 text-neutral-200 hover:text-black border border-neutral-800 hover:border-emerald-400 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Basket</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Shopping Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-neutral-950 border-l border-emerald-500/30 h-full flex flex-col justify-between shadow-2xl">
            
            {/* Cart Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-black">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-black text-white font-heading uppercase">
                  Your Basket ({cart.reduce((sum, i) => sum + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-neutral-400">
                  <ShoppingBag className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
                  <p className="text-sm">Your basket is currently empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-4 py-2 bg-emerald-500 text-black text-xs font-black rounded-lg uppercase cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="bg-black rounded-xl p-4 border border-neutral-800 flex items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0">
                      <img 
                        src={cartItem.item.image} 
                        alt={cartItem.item.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {cartItem.item.name}
                      </h4>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        <span>Size: {cartItem.size}</span>
                        {cartItem.customName && (
                          <span className="ml-2 font-mono text-emerald-400">
                            [{cartItem.customName} #{cartItem.customNumber}]
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-heading font-black text-emerald-400 mt-1">
                        €{cartItem.price * cartItem.quantity}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-neutral-900 rounded-lg p-1 border border-neutral-800">
                      <button
                        onClick={() => updateQuantity(cartItem.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-neutral-800 text-neutral-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1 font-mono">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItem.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-neutral-800 text-neutral-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-black border-t border-neutral-800 space-y-4">
                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">€{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Official Shipping (Global Express)</span>
                    <span className="font-mono text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                    <span>Total Due</span>
                    <span className="font-heading font-black text-xl text-emerald-400 font-mono">
                      €{cartSubtotal}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutComplete}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-black py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  {checkoutComplete ? (
                    <>
                      <Check className="w-4 h-4 text-black stroke-[3]" />
                      <span>Order Confirmed! Dispatching Kit...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Proceed to Official Checkout</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}

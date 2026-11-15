/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FixturesAndTable } from './components/FixturesAndTable';
import { SquadSection } from './components/SquadSection';
import { TacticalPitch } from './components/TacticalPitch';
import { GallerySection } from './components/GallerySection';
import { ClubStore, CartItem } from './components/ClubStore';
import { ClubHistoryHonors } from './components/ClubHistoryHonors';
import { FanZone } from './components/FanZone';
import { ContactSection } from './components/ContactSection';
import { TicketOfficeModal } from './components/TicketOfficeModal';
import { Footer } from './components/Footer';
import { PerformanceHub } from './components/performance/PerformanceHub';
import { ShopItem, CLUB_SHOP_ITEMS } from './data/clubData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'default-cart-item-1',
      item: CLUB_SHOP_ITEMS[0],
      size: 'L',
      customName: 'MENSAH',
      customNumber: '14',
      price: 85,
      quantity: 1,
    },
  ]);
  const [presetJerseyPlayer, setPresetJerseyPlayer] = useState<{ name: string; num: number } | undefined>(undefined);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: ShopItem, size: string, customName?: string, customNumber?: string) => {
    const newItemId = `${item.id}-${size}-${customName || 'none'}-${Date.now()}`;
    const newItem: CartItem = {
      id: newItemId,
      item,
      size,
      customName,
      customNumber,
      price: item.price,
      quantity: 1,
    };
    setCart((prev) => [...prev, newItem]);
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleCustomizeJerseyFromSquad = (playerName: string, playerNum: number) => {
    setPresetJerseyPlayer({ name: playerName.split(' ').pop() || playerName, num: playerNum });
    setActiveTab('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col selection:bg-emerald-500 selection:text-black">
      
      {/* Official Club Header & Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openTicketModal={() => setIsTicketModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'performance' && (
          <PerformanceHub onBackToPortal={() => handleNavigate('home')} />
        )}

        {activeTab === 'home' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onOpenTickets={() => setIsTicketModalOpen(true)}
            />
            
            {/* Quick Teaser Strip for Performance & Injury Suite (White, Green & Black) */}
            <div className="bg-gradient-to-r from-black via-neutral-950 to-emerald-950/80 border-y border-emerald-500/30 py-6 px-4">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black shadow-lg">
                    ⚡
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white font-heading uppercase">
                      Simolat Pro Performance & Injury Intelligence Hub
                    </h4>
                    <p className="text-xs text-neutral-300">
                      85% Squad Available · Gabbett ACWR Load Balancing · Interactive Anatomical Body Map · RTP Tracking
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleNavigate('performance')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Open Medical & Performance Hub →
                </button>
              </div>
            </div>

            <FixturesAndTable onOpenTickets={() => setIsTicketModalOpen(true)} />
            <TacticalPitch />
            <SquadSection onCustomizeJersey={handleCustomizeJerseyFromSquad} />
            <GallerySection />
            <ClubStore
              cart={cart}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              updateQuantity={handleUpdateQuantity}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              presetPlayerName={presetJerseyPlayer?.name}
              presetPlayerNum={presetJerseyPlayer?.num}
            />
            <ClubHistoryHonors />
            <FanZone />
            <ContactSection />
          </>
        )}

        {activeTab === 'matches' && (
          <div className="pt-6">
            <FixturesAndTable onOpenTickets={() => setIsTicketModalOpen(true)} />
          </div>
        )}

        {activeTab === 'squad' && (
          <div className="pt-6">
            <SquadSection onCustomizeJersey={handleCustomizeJerseyFromSquad} />
          </div>
        )}

        {activeTab === 'tactics' && (
          <div className="pt-6">
            <TacticalPitch />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="pt-4">
            <GallerySection />
          </div>
        )}

        {activeTab === 'store' && (
          <div className="pt-6">
            <ClubStore
              cart={cart}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              updateQuantity={handleUpdateQuantity}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              presetPlayerName={presetJerseyPlayer?.name}
              presetPlayerNum={presetJerseyPlayer?.num}
            />
          </div>
        )}

        {activeTab === 'honors' && (
          <div className="pt-6">
            <ClubHistoryHonors />
          </div>
        )}

        {activeTab === 'fanzone' && (
          <div className="pt-6">
            <FanZone />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-2">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Official Matchday Ticket Office Modal */}
      <TicketOfficeModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      {/* Official Club Footer */}
      <Footer
        onNavigate={handleNavigate}
        openTicketModal={() => setIsTicketModalOpen(true)}
      />

    </div>
  );
}

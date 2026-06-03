'use client';
import { Bell, ArrowUpRight, CalendarDays, ShoppingBag, GraduationCap, Sparkles } from 'lucide-react';

export default function PhoneMockup() {
  return (
    <div className="phone-glow relative mx-auto" style={{ width: 280 }}>
      {/* Floating cards around the phone */}
      <div className="absolute -left-12 top-12 bg-white rounded-2xl shadow-card px-4 py-3 z-20 animate-float-slow hidden lg:block">
        <div className="text-xs font-bold text-green">💚 Akao</div>
        <div className="text-[10px] text-muted mt-0.5">Save & contribute</div>
      </div>
      <div className="absolute -right-10 top-32 bg-white rounded-2xl shadow-card px-4 py-3 z-20 animate-float-slow hidden lg:block" style={{ animationDelay: '1s' }}>
        <div className="text-xs font-bold text-green">🛍 Marketplace</div>
        <div className="text-[10px] text-muted mt-0.5">Buy with confidence</div>
      </div>
      <div className="absolute -left-8 bottom-20 bg-white rounded-2xl shadow-card px-4 py-3 z-20 animate-float-slow hidden lg:block" style={{ animationDelay: '2s' }}>
        <div className="text-xs font-bold text-green">📅 Bookings</div>
        <div className="text-[10px] text-muted mt-0.5">Book services</div>
      </div>

      {/* Phone body */}
      <div className="bg-ink rounded-[40px] p-3 shadow-card border border-white/10 relative z-10">
        <div className="bg-cream rounded-[32px] overflow-hidden" style={{ height: 540 }}>
          {/* Status bar */}
          <div className="px-5 pt-3 pb-1 flex justify-between items-center text-[10px] text-ink/70">
            <span>9:41</span>
            <span>•••</span>
          </div>

          {/* Header */}
          <div className="px-5 pt-2 flex justify-between items-center">
            <div>
              <div className="text-[10px] text-muted">Good morning 👋</div>
              <div className="text-base font-bold text-ink">Fabiola</div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-border">
                <Bell className="w-3.5 h-3.5 text-ink" />
              </div>
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-[10px] font-black text-green">FN</span>
              </div>
            </div>
          </div>

          {/* Akao balance card */}
          <div className="mx-5 mt-3 bg-green rounded-2xl p-4 text-white">
            <div className="text-[10px] text-white/70 uppercase tracking-wider">Akao Contributions</div>
            <div className="text-2xl font-black text-gold mt-1">85,000 <span className="text-xs text-gold/70">XAF</span></div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
              <div className="flex-1">
                <div className="text-sm font-bold text-white">2</div>
                <div className="text-[9px] text-white/60">Active plans</div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">10,000 XAF</div>
                <div className="text-[9px] text-white/60">Next in 2 days</div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="text-[10px] text-muted px-5 pt-4 pb-2 font-bold uppercase tracking-wider">What would you like to do?</div>
          <div className="px-5 grid grid-cols-4 gap-2">
            {[
              { Icon: ArrowUpRight, label: 'Contribute' },
              { Icon: CalendarDays, label: 'Book' },
              { Icon: ShoppingBag, label: 'Market' },
              { Icon: GraduationCap, label: 'Fees' },
            ].map(({ Icon, label }) => (
              <div key={label} className="bg-white rounded-xl border border-border py-2.5 flex flex-col items-center gap-1">
                <div className="w-7 h-7 bg-mint rounded-full flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-green" />
                </div>
                <div className="text-[8px] font-bold text-ink">{label}</div>
              </div>
            ))}
          </div>

          {/* Ticker */}
          <div className="mx-5 mt-4 flex gap-2 overflow-hidden">
            <div className="bg-coral text-[9px] font-bold text-green rounded-full px-2.5 py-1.5 whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 12 salons near you
            </div>
            <div className="bg-mint text-[9px] font-bold text-green rounded-full px-2.5 py-1.5 whitespace-nowrap">
              🔥 34 new products
            </div>
          </div>

          {/* Discover */}
          <div className="text-[10px] text-muted px-5 pt-4 pb-2 font-bold uppercase tracking-wider">Discover near you</div>
          <div className="px-5 grid grid-cols-2 gap-2">
            {[
              { emoji: '💇🏽‍♀️', label: 'Hair & Beauty', sub: '25+ salons' },
              { emoji: '🍰', label: 'Bakeries', sub: 'Fresh & local' },
            ].map(({ emoji, label, sub }) => (
              <div key={label} className="bg-white rounded-xl p-2.5 border border-border flex items-center gap-2">
                <div className="text-xl">{emoji}</div>
                <div>
                  <div className="text-[10px] font-bold text-ink">{label}</div>
                  <div className="text-[8px] text-muted">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

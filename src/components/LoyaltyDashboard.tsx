import React from 'react';
import { UserProfile, MembershipTier } from '../types';
import { Award, Zap, Shield, Crown, HelpCircle, Check, Sparkles } from 'lucide-react';

interface LoyaltyDashboardProps {
  user: UserProfile;
  onToggleSubscription: () => void;
  onAddDemoSpending: (amount: number) => void;
}

export default function LoyaltyDashboard({ user, onToggleSubscription, onAddDemoSpending }: LoyaltyDashboardProps) {
  // Calculate tier limits and benefits
  const getTierDetails = (tier: MembershipTier) => {
    switch (tier) {
      case 'Bronze':
        return {
          limit: 100,
          next: 'Silver',
          multiplier: '1.0x',
          discount: 'None',
          color: 'text-amber-700 bg-amber-50 border-amber-200',
          desc: 'Basic member status. Earn 10 points for every $1 spent.',
          badgeColor: 'bg-amber-100 text-amber-800'
        };
      case 'Silver':
        return {
          limit: 300,
          next: 'Gold',
          multiplier: '1.2x',
          discount: '5% automatic discount',
          color: 'text-neutral-500 bg-neutral-50 border-neutral-200',
          desc: 'Enjoy Silver benefits! Earn points 20% faster and save 5% on all orders.',
          badgeColor: 'bg-slate-100 text-slate-800'
        };
      case 'Gold':
        return {
          limit: 600,
          next: 'Platinum',
          multiplier: '1.5x',
          discount: '10% automatic discount',
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          desc: 'Gold VIP status. Earn points 50% faster and get 10% off every purchase.',
          badgeColor: 'bg-yellow-100 text-yellow-800'
        };
      case 'Platinum':
        return {
          limit: 1000,
          next: 'None',
          multiplier: '2.0x',
          discount: '15% automatic discount',
          color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
          desc: 'The ultimate tier. Double points multiplier, 15% discount, and free shipping forever.',
          badgeColor: 'bg-indigo-100 text-indigo-800'
        };
    }
  };

  const details = getTierDetails(user.tier);
  const nextTierLimit = details.limit;
  const progressPercent = Math.min((user.totalSpending / nextTierLimit) * 100, 100);

  const tierSpendingText = () => {
    if (user.tier === 'Platinum') {
      return 'You are at the peak tier! Thank you for being our top loyal client.';
    }
    return `$${user.totalSpending.toFixed(2)} / $${nextTierLimit.toFixed(2)} spent to unlock ${details.next}`;
  };

  return (
    <div id="loyalty-hub" className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Page Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold font-display tracking-tight text-neutral-900">VIP & Loyalty Hub</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your loyalty rewards, tiered benefits, and premium memberships.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier Status Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">Membership Tier</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${details.badgeColor}`}>
                {user.tier}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8 text-neutral-800" />
              <div>
                <h3 className="text-xl font-bold font-display">{user.tier} Club</h3>
                <p className="text-xs text-neutral-500">{details.multiplier} points multiplier</p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mt-2">{details.desc}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100">
            <div className="flex justify-between text-xs font-medium text-neutral-600 mb-1">
              <span>Spend Progress</span>
              <span>{user.tier === 'Platinum' ? 'Completed' : `${progressPercent.toFixed(0)}%`}</span>
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-neutral-800 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-[11px] font-mono text-neutral-400">{tierSpendingText()}</p>
          </div>
        </div>

        {/* Loyalty Points Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">Loyalty Rewards</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">100 pts = $1.00</span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-bold font-display tracking-tight">{user.loyaltyPoints}</span>
              <span className="text-xs text-neutral-400 font-medium">Points</span>
            </div>
            <h3 className="text-sm font-semibold text-neutral-800">Redeemable Value: ${ (user.loyaltyPoints / 100).toFixed(2) }</h3>
            <p className="text-xs text-neutral-500 mt-2">
              Earned dynamically on every purchase! Redeem points in your checkout cart to claim direct dollar-off discounts.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-bold mb-2">Demonstration Controls</h4>
            <div className="flex gap-2">
              <button
                onClick={() => onAddDemoSpending(50)}
                className="flex-1 py-1 px-2 border border-neutral-200 hover:border-black hover:bg-neutral-50 rounded-lg text-center text-xs font-medium transition-colors cursor-pointer"
              >
                + $50 Spend
              </button>
              <button
                onClick={() => onAddDemoSpending(150)}
                className="flex-1 py-1 px-2 border border-neutral-200 hover:border-black hover:bg-neutral-50 rounded-lg text-center text-xs font-medium transition-colors cursor-pointer"
              >
                + $150 Spend
              </button>
            </div>
          </div>
        </div>

        {/* Premium Club Subscription */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-8 -mt-8" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">Premium Membership</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user.isPremium ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {user.isPremium ? 'ACTIVE VIP' : 'AVAILABLE'}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-7 h-7 text-blue-400 animate-pulse" />
              <div>
                <h3 className="text-lg font-bold font-display text-white">Vanguard VIP Club</h3>
                <p className="text-xs text-blue-400">$9.99 / month</p>
              </div>
            </div>
            <ul className="space-y-2 mt-4 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-400" />
                <span>Early access to new, limited collections</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-400" />
                <span>Free shipping on all order sizes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-400" />
                <span>Platinum tier multipliers for points</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onToggleSubscription}
            className={`w-full py-2.5 rounded-xl text-xs font-bold mt-6 tracking-wide transition-all cursor-pointer ${
              user.isPremium
                ? 'bg-slate-800 text-neutral-300 hover:bg-slate-700'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
            }`}
          >
            {user.isPremium ? 'Cancel Premium VIP' : 'Join Vanguard VIP Club'}
          </button>
        </div>
      </div>

      {/* Tier Breakdown Table */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold font-display mb-4">Loyalty Tier Privileges</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 text-xs font-semibold text-neutral-400">
                <th className="py-3 px-2">Tier Level</th>
                <th className="py-3 px-2">Total Spend Threshold</th>
                <th className="py-3 px-2">Automatic Cash Discount</th>
                <th className="py-3 px-2">Reward Multiplier</th>
                <th className="py-3 px-2">Bonus Privileges</th>
              </tr>
            </thead>
            <tbody className="text-xs text-neutral-600 divide-y divide-neutral-100">
              <tr className={user.tier === 'Bronze' ? 'bg-neutral-50/50 font-medium text-neutral-900' : ''}>
                <td className="py-3.5 px-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-700" />
                  Bronze
                </td>
                <td className="py-3.5 px-2">$0.00 - $100.00</td>
                <td className="py-3.5 px-2">0%</td>
                <td className="py-3.5 px-2">1.0x (10 pts / $1)</td>
                <td className="py-3.5 px-2 text-neutral-400">Standard shopping privileges</td>
              </tr>
              <tr className={user.tier === 'Silver' ? 'bg-neutral-50/50 font-medium text-neutral-900' : ''}>
                <td className="py-3.5 px-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  Silver
                </td>
                <td className="py-3.5 px-2">$100.01 - $300.00</td>
                <td className="py-3.5 px-2">5% Off Storewide</td>
                <td className="py-3.5 px-2">1.2x (12 pts / $1)</td>
                <td className="py-3.5 px-2 text-neutral-600">Priority support access</td>
              </tr>
              <tr className={user.tier === 'Gold' ? 'bg-neutral-50/50 font-medium text-neutral-900' : ''}>
                <td className="py-3.5 px-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  Gold
                </td>
                <td className="py-3.5 px-2">$300.01 - $600.00</td>
                <td className="py-3.5 px-2">10% Off Storewide</td>
                <td className="py-3.5 px-2">1.5x (15 pts / $1)</td>
                <td className="py-3.5 px-2 text-neutral-600">Exclusive styling guides</td>
              </tr>
              <tr className={user.tier === 'Platinum' ? 'bg-neutral-50/50 font-medium text-neutral-900' : ''}>
                <td className="py-3.5 px-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  Platinum
                </td>
                <td className="py-3.5 px-2">$600.01+</td>
                <td className="py-3.5 px-2">15% Off Storewide</td>
                <td className="py-3.5 px-2">2.0x (20 pts / $1)</td>
                <td className="py-3.5 px-2 text-emerald-600 font-semibold">Free shipping forever + Pre-release product claims</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

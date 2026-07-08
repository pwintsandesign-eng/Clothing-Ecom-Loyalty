import React, { useState } from 'react';
import { UserProfile, Order, AuditLog, MembershipTier } from '../types';
import { User, Shield, CreditCard, Clipboard, Compass, CheckCircle2, ChevronDown, Check, Send, AlertTriangle, Key, Settings } from 'lucide-react';

interface UserProfileDashboardProps {
  user: UserProfile;
  orders: Order[];
  auditLogs: AuditLog[];
  onUpdateUser: (user: UserProfile) => void;
  onAddAuditLog: (action: string, details: string) => void;
  onSignOut?: () => void;
}

export default function UserProfileDashboard({
  user,
  orders,
  auditLogs,
  onUpdateUser,
  onAddAuditLog,
  onSignOut
}: UserProfileDashboardProps) {
  // Local state for profile form fields
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [shippingAddress, setShippingAddress] = useState(user.shippingAddress || '');
  const [shippingCity, setShippingCity] = useState(user.shippingCity || '');
  const [shippingZip, setShippingZip] = useState(user.shippingZip || '');
  
  // Notification preference checkboxes
  const [emailPromo, setEmailPromo] = useState(true);
  const [vipAlerts, setVipAlerts] = useState(user.isPremium);

  // Form notifications
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Switcher presets for Role-Based Access Control (RBAC) demos
  const DEMO_PERSONAS = [
    {
      name: 'Alex Carter',
      email: 'alex.carter@modernwear.com',
      totalSpending: 150.00,
      tier: 'Silver' as MembershipTier,
      loyaltyPoints: 180,
      isPremium: false,
      role: 'Customer' as const,
      shippingAddress: '128 Fashion Blvd',
      shippingCity: 'New York',
      shippingZip: '10001',
      label: 'Standard Client (Silver)'
    },
    {
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@blogger.com',
      totalSpending: 450.00,
      tier: 'Gold' as MembershipTier,
      loyaltyPoints: 520,
      isPremium: true,
      role: 'Customer' as const,
      shippingAddress: '84 Willow Lane',
      shippingCity: 'Los Angeles',
      shippingZip: '90024',
      label: 'VIP Ambassador (Gold / Premium)'
    },
    {
      name: 'Marcus Chen',
      email: 'marcus.chen@vanguard.com',
      totalSpending: 850.00,
      tier: 'Platinum' as MembershipTier,
      loyaltyPoints: 1100,
      isPremium: true,
      role: 'Administrator' as const,
      shippingAddress: '400 Enterprise Parkway',
      shippingCity: 'Austin',
      shippingZip: '78701',
      label: 'Store Administrator (Platinum)'
    }
  ];

  const handleApplyPersona = (persona: typeof DEMO_PERSONAS[0]) => {
    onUpdateUser({
      name: persona.name,
      email: persona.email,
      totalSpending: persona.totalSpending,
      tier: persona.tier,
      loyaltyPoints: persona.loyaltyPoints,
      isPremium: persona.isPremium,
      role: persona.role,
      shippingAddress: persona.shippingAddress,
      shippingCity: persona.shippingCity,
      shippingZip: persona.shippingZip
    });

    // Sync input fields
    setName(persona.name);
    setEmail(persona.email);
    setShippingAddress(persona.shippingAddress);
    setShippingCity(persona.shippingCity);
    setShippingZip(persona.shippingZip);
    setVipAlerts(persona.isPremium);

    onAddAuditLog(
      'Role Switch (RBAC)',
      `Switched session to ${persona.role} role. Loaded profile: ${persona.name}.`
    );

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Please enter a valid profile name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setValidationError('');
    onUpdateUser({
      ...user,
      name: name.trim(),
      email: email.trim(),
      shippingAddress: shippingAddress.trim(),
      shippingCity: shippingCity.trim(),
      shippingZip: shippingZip.trim(),
      isPremium: vipAlerts
    });

    onAddAuditLog(
      'Profile Update',
      `Modified contact info & preferences for ${email.trim()}.`
    );

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Filter orders related to this active email address
  const userOrders = orders.filter(o => !o.customerEmail || !user.email || o.customerEmail.toLowerCase() === user.email.toLowerCase()); // fallback to all demo orders if email is empty

  return (
    <div id="user-dashboard-wrapper" className="space-y-8 animate-fade-in">
      
      {/* Upper Welcome Banner */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60 -mr-8 -mt-8" />
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-neutral-900 text-white rounded-lg">
              <User className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">User Dashboard</span>
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-neutral-950">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-neutral-500 max-w-lg">
            Manage your personal profile, check shipping destinations, monitor order timelines, and switch role credentials for demonstration.
          </p>
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-bold text-xs rounded-xl transition-all cursor-pointer border border-red-100 shadow-xs"
            >
              Sign Out from Session
            </button>
          )}
        </div>

        <div className="bg-neutral-50 border border-neutral-100 p-4 rounded-2xl flex gap-6 z-10 w-full md:w-auto text-center md:text-left justify-around md:justify-start">
          <div>
            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Account Role</span>
            <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-neutral-900 text-white">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              {user.role}
            </span>
          </div>
          <div className="border-l border-neutral-200 pl-6">
            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Loyalty Level</span>
            <span className="block mt-1 text-xs font-extrabold text-blue-600">{user.tier} VIP</span>
          </div>
          <div className="border-l border-neutral-200 pl-6">
            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Points Wallet</span>
            <span className="block mt-1 text-xs font-mono font-bold text-neutral-900">{user.loyaltyPoints} Pts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Role Switcher & Profile Settings */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* RBAC Persona Switcher Widget */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <Key className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold tracking-tight text-neutral-950">Role-Based Switcher (RBAC)</h3>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Toggle between built-in user presets below to test how different permissions and benefits (Loyalty tiers, Free Shipping, Admin views) update instantly.
            </p>

            <div className="space-y-2.5">
              {DEMO_PERSONAS.map((p, idx) => {
                const isActive = user.email.toLowerCase() === p.email.toLowerCase();
                return (
                  <button
                    key={idx}
                    onClick={() => handleApplyPersona(p)}
                    className={`w-full text-left p-3 rounded-2xl border text-xs transition-all relative ${
                      isActive
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                        : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50 text-neutral-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold">{p.name}</span>
                      <span className={`text-[9px] font-extrabold tracking-wider uppercase ${isActive ? 'text-blue-400' : 'text-neutral-500'}`}>
                        {p.role}
                      </span>
                    </div>
                    <p className={`text-[10px] ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`}>
                      {p.label}
                    </p>
                    {isActive && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-0.5 rounded-full text-white">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile & Shipping Settings Form */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <Settings className="w-4 h-4 text-neutral-500" />
              <h3 className="text-sm font-bold tracking-tight text-neutral-950">Profile Preferences</h3>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              
              {/* Profile details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl focus:border-black focus:outline-none bg-neutral-50"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl focus:border-black focus:outline-none bg-neutral-50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Shipping Defaults */}
              <div className="space-y-3 border-t border-neutral-100 pt-4">
                <h4 className="font-bold text-neutral-950 uppercase tracking-wider text-[10px]">Shipping Destination Defaults</h4>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Shipping Address</label>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl focus:border-black focus:outline-none bg-neutral-50"
                    placeholder="Street address, unit"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">City</label>
                    <input
                      type="text"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      className="w-full p-2.5 border border-neutral-200 rounded-xl focus:border-black focus:outline-none bg-neutral-50"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Postal ZIP Code</label>
                    <input
                      type="text"
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      className="w-full p-2.5 border border-neutral-200 rounded-xl focus:border-black focus:outline-none bg-neutral-50"
                      placeholder="ZIP Code"
                    />
                  </div>
                </div>
              </div>

              {/* Email Subscription preferences */}
              <div className="space-y-2 border-t border-neutral-100 pt-4">
                <h4 className="font-bold text-neutral-950 uppercase tracking-wider text-[10px]">Preferences</h4>
                <label className="flex items-center gap-2 cursor-pointer py-1 select-none">
                  <input
                    type="checkbox"
                    checked={emailPromo}
                    onChange={(e) => setEmailPromo(e.target.checked)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-[11px] text-neutral-600">Send promotional coupon drops</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer py-1 select-none">
                  <input
                    type="checkbox"
                    checked={vipAlerts}
                    onChange={(e) => setVipAlerts(e.target.checked)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-[11px] text-neutral-600">VIP Premium collections early notice</span>
                </label>
              </div>

              {validationError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl font-medium text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {validationError}
                </div>
              )}

              {saveSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl font-medium text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  Profile details updated successfully!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Save Changes
              </button>

            </form>
          </div>

        </div>

        {/* Right Column: Order History & Loyalty Points Ledger */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order History Timeline Directory */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Clipboard className="w-4 h-4 text-neutral-500" />
                <h3 className="text-sm font-bold tracking-tight text-neutral-950">Your Order History</h3>
              </div>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                {userOrders.length} Order Records
              </span>
            </div>

            {userOrders.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                <Compass className="w-12 h-12 text-neutral-200 mx-auto mb-2" />
                <p className="text-xs">No orders have been recorded under this account email yet.</p>
                <p className="text-[10px] text-neutral-400 mt-1">Try checking out an apparel bundle in the shop catalog!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((ord) => {
                  const isExpanded = expandedOrder === ord.id;
                  
                  // Calculate status based on order status or mock ID pattern
                  const statusSteps = ['Processing (ပြင်ဆင်နေဆဲ)', 'Dispatched (ထွက်ခွာပြီး)', 'In Transit (လမ်းခရီးတွင်)', 'Delivered (ရောက်ရှိပြီး)'];
                  let stepIndex = 3; // Delivered
                  if (ord.status) {
                    if (ord.status === 'Processing') stepIndex = 0;
                    else if (ord.status === 'Dispatched') stepIndex = 1;
                    else if (ord.status === 'In Transit') stepIndex = 2;
                    else if (ord.status === 'Delivered') stepIndex = 3;
                  } else {
                    const orderNum = parseInt(ord.id.replace(/\D/g, '')) || 9500;
                    if (orderNum % 4 === 1) stepIndex = 0;
                    else if (orderNum % 4 === 2) stepIndex = 1;
                    else if (orderNum % 4 === 3) stepIndex = 2;
                  }

                  return (
                    <div key={ord.id} className="border border-neutral-100 rounded-2xl overflow-hidden hover:border-neutral-200 transition-colors">
                      <div
                        onClick={() => setExpandedOrder(isExpanded ? null : ord.id)}
                        className="bg-neutral-50/50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer select-none text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-neutral-900">{ord.id}</span>
                            <span className="text-[10px] text-neutral-400">{ord.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-500 text-[10px]">
                            <span>{ord.items.length} items</span>
                            <span>•</span>
                            <span>Address: {ord.shippingAddress || 'Store Pickup'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between">
                          <div className="text-right">
                            <span className="font-mono font-extrabold text-neutral-900 block">${ord.total.toFixed(2)}</span>
                            <span className="text-[10px] text-emerald-600 font-bold block">{statusSteps[stepIndex]}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* Expanded Section */}
                      {isExpanded && (
                        <div className="p-4 border-t border-neutral-100 bg-white space-y-4 text-xs">
                          {/* Live delivery step progress line */}
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Garment Shipment Timeline</h4>
                            <div className="grid grid-cols-4 gap-2 text-center text-[9px] relative py-2">
                              {/* Horizontal bar */}
                              <div className="absolute top-[18px] left-[12%] right-[12%] h-[2px] bg-neutral-100 z-0">
                                <div
                                  className="h-full bg-blue-600 transition-all duration-500"
                                  style={{ width: `${(stepIndex / 3) * 100}%` }}
                                />
                              </div>

                              {statusSteps.map((step, idx) => {
                                const isDone = idx <= stepIndex;
                                const isCurrent = idx === stepIndex;
                                return (
                                  <div key={idx} className="z-10 flex flex-col items-center">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border transition-all ${
                                      isDone
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-neutral-400 border-neutral-200'
                                    }`}>
                                      {isDone ? '✓' : idx + 1}
                                    </div>
                                    <span className={`mt-1 font-bold ${isCurrent ? 'text-blue-600' : 'text-neutral-400'}`}>
                                      {step.split(' ')[0]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Order Items Table */}
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Purchased Items Details</h4>
                            <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-xl overflow-hidden bg-neutral-50/20">
                              {ord.items.map((it, itemIdx) => (
                                <div key={itemIdx} className="p-3 flex justify-between items-center">
                                  <div className="space-y-0.5">
                                    <span className="font-bold text-neutral-900 block">{it.name}</span>
                                    <div className="flex gap-2 text-[10px] text-neutral-400">
                                      <span>Size: <strong className="text-neutral-600">{it.size}</strong></span>
                                      <span>Fit: <strong className="text-neutral-600">{it.fit}</strong></span>
                                      <span>Color: <strong className="text-neutral-600">{it.color}</strong></span>
                                    </div>
                                  </div>
                                  <div className="text-right font-mono text-[11px]">
                                    <span className="text-neutral-400 block">{it.quantity} x ${it.price.toFixed(2)}</span>
                                    <span className="font-bold text-neutral-900 block">${(it.quantity * it.price).toFixed(2)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Financial Breakdowns */}
                          <div className="flex justify-between items-start pt-3 border-t border-neutral-100 text-[11px]">
                            <div className="space-y-1 text-neutral-400">
                              {ord.discount > 0 && <div>Bundle Discounts:</div>}
                              {ord.pointsRedeemed > 0 && <div>Loyalty Redemptions:</div>}
                              <div>Standard Shipping Rate:</div>
                            </div>
                            <div className="space-y-1 text-right text-neutral-900 font-mono">
                              {ord.discount > 0 && <div className="text-red-500">-${ord.discount.toFixed(2)}</div>}
                              {ord.pointsRedeemed > 0 && <div className="text-red-500">-${(ord.pointsRedeemed / 100).toFixed(2)}</div>}
                              <div>{ord.total > 100 || user.isPremium ? 'FREE SHIPPING' : '$10.00'}</div>
                            </div>
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Loyalty & Audit Activity Ledger */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <Shield className="w-4 h-4 text-neutral-500" />
              <h3 className="text-sm font-bold tracking-tight text-neutral-950">Active Session Activity Logs</h3>
            </div>
            
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Below is a real-time tracking of security log actions, user checkout transactions, and points credit audit trials associated with your current testing session.
            </p>

            <div className="border border-neutral-100 rounded-xl overflow-hidden text-xs max-h-60 overflow-y-auto divide-y divide-neutral-50 bg-neutral-50/20">
              {auditLogs.slice(0, 8).map((log) => (
                <div key={log.id} className="p-3 flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center text-[11px]">
                  <div className="space-y-0.5">
                    <span className="inline-block py-0.5 px-1.5 bg-neutral-100 text-neutral-600 rounded text-[9px] font-bold uppercase tracking-wider mb-1">
                      {log.action}
                    </span>
                    <p className="text-neutral-700 leading-tight">{log.details}</p>
                  </div>
                  <span className="text-[9px] text-neutral-400 font-mono whitespace-nowrap self-end sm:self-center">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

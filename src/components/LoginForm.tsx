import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile, MembershipTier } from '../types';
import {
  User,
  Lock,
  Shield,
  Key,
  ArrowRight,
  Crown,
  Sparkles,
  Eye,
  EyeOff,
  UserPlus,
  Info,
  CheckCircle2,
  AlertTriangle,
  LockKeyhole
} from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  // Navigation: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  // Portal: 'customer' | 'admin'
  const [portalType, setPortalType] = useState<'customer' | 'admin'>('customer');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Customer' | 'Administrator'>('Customer');
  const [showPassword, setShowPassword] = useState(false);

  // Form notifications
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Built-in Demo Personas
  const DEMO_ACCOUNTS = {
    customer: [
      {
        name: 'Alex Carter',
        email: 'alex.carter@modernwear.com',
        password: 'password123',
        totalSpending: 150.00,
        tier: 'Silver' as MembershipTier,
        loyaltyPoints: 180,
        isPremium: false,
        role: 'Customer' as const,
        shippingAddress: '128 Fashion Blvd',
        shippingCity: 'New York',
        shippingZip: '10001',
        description: 'Standard Client (Silver VIP)'
      },
      {
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@blogger.com',
        password: 'password123',
        totalSpending: 450.00,
        tier: 'Gold' as MembershipTier,
        loyaltyPoints: 520,
        isPremium: true,
        role: 'Customer' as const,
        shippingAddress: '84 Willow Lane',
        shippingCity: 'Los Angeles',
        shippingZip: '90024',
        description: 'Premium VIP Partner (Gold VIP)'
      }
    ],
    admin: [
      {
        name: 'Marcus Chen',
        email: 'marcus.chen@vanguard.com',
        password: 'adminsecure',
        totalSpending: 850.00,
        tier: 'Platinum' as MembershipTier,
        loyaltyPoints: 1100,
        isPremium: true,
        role: 'Administrator' as const,
        shippingAddress: '400 Enterprise Parkway',
        shippingCity: 'Austin',
        shippingZip: '78701',
        description: 'Authorized Store Administrator'
      }
    ]
  };

  // Quick fill demo user credentials helper
  const handleQuickFill = (acc: typeof DEMO_ACCOUNTS.customer[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all security fields.');
      return;
    }

    setLoading(true);

    // Simulate network authentication delay
    setTimeout(() => {
      setLoading(false);

      if (authMode === 'login') {
        // Check registered custom users in localStorage first
        const savedUsersRaw = localStorage.getItem('vanguard_registered_users');
        const savedUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
        const customUser = savedUsers.find(
          (u: any) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        );

        if (customUser) {
          // Verify role aligns with the portal selected (optional warning or forced toggle)
          if (portalType === 'admin' && customUser.role !== 'Administrator') {
            setError('Access Denied: This account does not possess Administrator credentials.');
            return;
          }
          if (portalType === 'customer' && customUser.role === 'Administrator') {
            // Log in as customer anyway, but with admin status
          }

          setSuccess(`Authentication successful. Welcoming back ${customUser.name}!`);
          setTimeout(() => {
            onLoginSuccess({
              name: customUser.name,
              email: customUser.email,
              totalSpending: customUser.totalSpending || 0,
              tier: customUser.tier || 'Bronze',
              loyaltyPoints: customUser.loyaltyPoints || 0,
              isPremium: customUser.isPremium || false,
              role: customUser.role,
              shippingAddress: customUser.shippingAddress || '',
              shippingCity: customUser.shippingCity || '',
              shippingZip: customUser.shippingZip || ''
            });
          }, 800);
          return;
        }

        // Check standard preloaded demo accounts
        const matchedDemo = [...DEMO_ACCOUNTS.customer, ...DEMO_ACCOUNTS.admin].find(
          acc => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.password === password
        );

        if (matchedDemo) {
          if (portalType === 'admin' && matchedDemo.role !== 'Administrator') {
            setError('Access Denied: This account does not possess Administrator credentials.');
            return;
          }

          setSuccess(`Secure sign-in authorized. Welcome, ${matchedDemo.name}!`);
          setTimeout(() => {
            onLoginSuccess({
              name: matchedDemo.name,
              email: matchedDemo.email,
              totalSpending: matchedDemo.totalSpending,
              tier: matchedDemo.tier,
              loyaltyPoints: matchedDemo.loyaltyPoints,
              isPremium: matchedDemo.isPremium,
              role: matchedDemo.role,
              shippingAddress: matchedDemo.shippingAddress,
              shippingCity: matchedDemo.shippingCity,
              shippingZip: matchedDemo.shippingZip
            });
          }, 800);
        } else {
          setError('Invalid credentials. Please verify your security details.');
        }
      } else {
        // REGISTRATION MODE
        if (!name.trim()) {
          setError('Please specify an account holder name.');
          return;
        }
        if (!email.includes('@')) {
          setError('Please provide a valid email address.');
          return;
        }
        if (password.length < 6) {
          setError('Security constraint: Passwords must contain at least 6 characters.');
          return;
        }

        // Verify if user already exists
        const savedUsersRaw = localStorage.getItem('vanguard_registered_users');
        const savedUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
        const userExists = [...savedUsers, ...DEMO_ACCOUNTS.customer, ...DEMO_ACCOUNTS.admin].some(
          u => u.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (userExists) {
          setError('This email address has already been registered.');
          return;
        }

        // Create new profile record
        const isSelectedAdmin = role === 'Administrator';
        const newRecord = {
          name: name.trim(),
          email: email.trim(),
          password: password,
          totalSpending: isSelectedAdmin ? 500 : 0,
          tier: isSelectedAdmin ? ('Gold' as MembershipTier) : ('Bronze' as MembershipTier),
          loyaltyPoints: isSelectedAdmin ? 300 : 50, // 50 points registration bonus
          isPremium: false,
          role: role,
          shippingAddress: '',
          shippingCity: '',
          shippingZip: ''
        };

        const updatedUsers = [...savedUsers, newRecord];
        localStorage.setItem('vanguard_registered_users', JSON.stringify(updatedUsers));

        setSuccess(`Account registered successfully! Please sign in.`);
        setAuthMode('login');
        // Pre-fill registered credentials for convenience
        setEmail(newRecord.email);
        setPassword(newRecord.password);
        setPortalType(isSelectedAdmin ? 'admin' : 'customer');
      }
    }, 1200);
  };

  return (
    <div id="auth-portal-fullscreen" className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4 font-sans select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]"
      >
        {/* Left Interactive Promo Screen */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600')" }} />
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

          {/* Top segment */}
          <div className="relative space-y-2 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-purple-300 uppercase tracking-widest border border-white/5">
              <Sparkles className="w-3.5 h-3.5 fill-current text-purple-300" /> Digital Atelier Simulation
            </span>
            <h2 className="text-3xl font-black tracking-widest text-purple-400 font-display mt-4">
              RESTYLE
            </h2>
            <p className="text-xs text-slate-300 font-light leading-relaxed max-w-xs pt-1">
              Premium customized apparel with live textile simulation, fit modeling assistant, and an exclusive VIP member club.
            </p>
          </div>

          {/* Middle segment: features lists */}
          <div className="relative space-y-4 z-10 py-8 lg:py-0">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="p-1 bg-white/10 rounded-lg mt-0.5">
                  <Crown className="w-4 h-4 text-purple-400" />
                </span>
                <div>
                  <span className="block font-bold text-xs text-white">Tiered Loyalty multipliers</span>
                  <span className="block text-[10px] text-slate-400 font-light leading-tight">Bronze to Platinum rewards and point-back checkout discounts.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="p-1 bg-white/10 rounded-lg mt-0.5">
                  <Shield className="w-4 h-4 text-blue-400" />
                </span>
                <div>
                  <span className="block font-bold text-xs text-white">Role-Based Operations</span>
                  <span className="block text-[10px] text-slate-400 font-light leading-tight">Separate Customer dashboards and Admin Inventory controls.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom segment */}
          <div className="relative z-10 border-t border-white/10 pt-6">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Store Location Defaults</span>
            <span className="block text-xs font-mono text-slate-300 mt-1">Okayama, Japan • Austin, TX USA</span>
          </div>
        </div>

        {/* Right Authentication Control Panel */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white relative">
          
          {/* Header Switcher (Sign In vs Register) */}
          <div className="flex justify-between items-center pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <h1 className="text-xl font-bold font-display tracking-tight text-slate-900">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-xs text-slate-400">
                {authMode === 'login' ? 'Select your portal below to authorize access' : 'Join the RESTYLE customized clothing collective'}
              </p>
            </div>

            <button
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setError('');
                setSuccess('');
              }}
              className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1 cursor-pointer bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100"
            >
              {authMode === 'login' ? (
                <>
                  <UserPlus className="w-3.5 h-3.5" /> Register Profile
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5" /> Already registered? Sign In
                </>
              )}
            </button>
          </div>

          {/* Tab Selector for Customer vs Admin (Only in login mode, registration mode lets you choose inside the form) */}
          {authMode === 'login' && (
            <div className="my-6 bg-slate-100 p-1.5 rounded-2xl grid grid-cols-2 gap-1 text-xs font-bold font-display shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setPortalType('customer');
                  setError('');
                }}
                className={`py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  portalType === 'customer'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 text-purple-600" /> Customer Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  setPortalType('admin');
                  setError('');
                }}
                className={`py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  portalType === 'admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Shield className="w-4 h-4 text-blue-400" /> Admin Secure Portal
              </button>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4 py-4 text-xs">
            {error && (
              <div className="p-3.5 bg-red-50 text-red-700 rounded-2xl font-semibold flex items-start gap-2 border border-red-100">
                <AlertTriangle className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl font-semibold flex items-start gap-2 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Registration specific fields */}
            {authMode === 'register' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Carter"
                      className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 bg-slate-50/50"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Desired Account Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('Customer')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        role === 'Customer'
                          ? 'border-purple-600 bg-purple-50/50 text-purple-900 ring-1 ring-purple-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <span className="font-bold text-xs">Customer</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Shop, collect loyalty, utilize vouchers.</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('Administrator')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        role === 'Administrator'
                          ? 'border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <span className="font-bold text-xs">Administrator</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Control pricing, inventory catalogs, store CMS.</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Common fields (Email, Password) */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.carter@modernwear.com"
                    className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 bg-slate-50/50"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {portalType === 'admin' && authMode === 'login' ? 'Security Password Key' : 'Account Password'}
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={portalType === 'admin' && authMode === 'login' ? '••••••••' : '••••••'}
                    className="w-full pl-9 pr-10 py-3 border border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 bg-slate-50/50"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 font-bold rounded-xl text-white transition-all cursor-pointer flex items-center justify-center gap-2 mt-6 ${
                portalType === 'admin' && authMode === 'login'
                  ? 'bg-slate-900 hover:bg-slate-800 active:scale-98 shadow-md'
                  : 'bg-purple-600 hover:bg-purple-700 active:scale-98 shadow-lg shadow-purple-100'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {authMode === 'login' ? 'Authorize Secure Entrance' : 'Complete Registration'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Click Demo Users Block (Convenience for sandbox testing) */}
          {authMode === 'login' && (
            <div className="mt-6 border-t border-slate-100 pt-6 space-y-3">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                Fast-track Developer Credentials (အရွယ်အစားစမ်းသပ်ရန်)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DEMO_ACCOUNTS[portalType].map((acc, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleQuickFill(acc)}
                    className="text-left p-3 rounded-2xl border border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-xs text-slate-800 group-hover:text-purple-600 transition-colors">
                        {acc.name}
                      </span>
                      <span className="text-[8px] font-mono font-bold bg-white px-1.5 py-0.5 border border-slate-100 text-slate-500 rounded">
                        {acc.role === 'Administrator' ? 'ADMIN' : 'USER'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 font-light leading-none">
                      {acc.description}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-100/50 w-full flex justify-between">
                      <span>Pass: <strong className="text-slate-700 font-bold">{acc.password}</strong></span>
                      <span className="text-purple-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Auto-fill &rarr;</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer of Auth form */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-400">
            <span>Enterprise Authorized Protection Active</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-[9px] font-mono"><LockKeyhole className="w-3 h-3 text-emerald-500" /> SHA-256</span>
              <span className="flex items-center gap-1 text-[9px] font-mono"><Shield className="w-3 h-3 text-emerald-500" /> RBAC Enabled</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

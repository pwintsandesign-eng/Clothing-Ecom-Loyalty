import React, { useState } from 'react';
import { Product, AffiliatePartner, ReferredSale } from '../types';
import { Users, Link2, Copy, Check, Download, TrendingUp, DollarSign, Activity, FileText, Send, UserCheck, AlertTriangle, X } from 'lucide-react';

interface AffiliatePortalProps {
  products: Product[];
  partners: AffiliatePartner[];
  sales: ReferredSale[];
  onUpdatePartners: (partners: AffiliatePartner[]) => void;
  onUpdateSales: (sales: ReferredSale[]) => void;
}

export default function AffiliatePortal({ products, partners, sales, onUpdatePartners, onUpdateSales }: AffiliatePortalProps) {
  // Navigation inside the portal
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manager'>('dashboard');

  // Dashboard selections
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(partners[0]?.id || '');
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [copiedLink, setCopiedLink] = useState(false);

  // Affiliate creation form
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerCode, setNewPartnerCode] = useState('');

  // Report Export State
  const [exportedReport, setExportedReport] = useState<string | null>(null);

  // Local notification feedback banner
  const [affiliateNotification, setAffiliateNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setAffiliateNotification({ type, message });
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setAffiliateNotification(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const selectedPartner = partners.find(p => p.id === selectedPartnerId) || partners[0];

  // Calculations for active partner
  const partnerSales = sales.filter(s => s.partnerCode === selectedPartner?.code);
  const conversionRate = selectedPartner && selectedPartner.clicks > 0
    ? ((selectedPartner.salesCount / selectedPartner.clicks) * 100).toFixed(2)
    : '0.00';

  const handleGenerateLink = () => {
    if (!selectedPartner) return;
    const trackingUrl = `${window.location.origin}/?ref=${selectedPartner.code}&prod=${selectedProductId}`;
    navigator.clipboard.writeText(trackingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName || !newPartnerCode) return;

    // Check if code exists
    const codeExists = partners.some(p => p.code.toUpperCase() === newPartnerCode.toUpperCase());
    if (codeExists) {
      showNotification('warning', 'This custom referral code is already taken. Please choose another.');
      return;
    }

    const newPartner: AffiliatePartner = {
      id: `aff-${Date.now()}`,
      name: newPartnerName,
      code: newPartnerCode.toUpperCase().replace(/\s+/g, ''),
      clicks: 0,
      salesCount: 0,
      totalSalesAmount: 0.00,
      commissionEarned: 0.00,
      commissionPaid: 0.00,
      balance: 0.00
    };

    onUpdatePartners([...partners, newPartner]);
    setSelectedPartnerId(newPartner.id);
    setNewPartnerName('');
    setNewPartnerCode('');
    showNotification('success', `Welcome aboard, ${newPartnerName}! Affiliate partner account active.`);
  };

  const handlePayCommission = (partnerCode: string) => {
    const partner = partners.find(p => p.code === partnerCode);
    if (!partner || partner.balance <= 0) {
      showNotification('warning', 'No pending balance to pay.');
      return;
    }

    const amountToPay = partner.balance;

    // Update partner balances
    const updatedPartners = partners.map(p => {
      if (p.code === partnerCode) {
        return {
          ...p,
          commissionPaid: p.commissionPaid + amountToPay,
          balance: 0
        };
      }
      return p;
    });

    // Update referred sales status to Paid
    const updatedSales = sales.map(s => {
      if (s.partnerCode === partnerCode && s.status !== 'Paid') {
        return { ...s, status: 'Paid' as const };
      }
      return s;
    });

    onUpdatePartners(updatedPartners);
    onUpdateSales(updatedSales);
    showNotification('success', `Payment of $${amountToPay.toFixed(2)} issued successfully to ${partner.name}!`);
  };

  const handleExportReport = () => {
    if (!selectedPartner) return;

    // Create a beautiful downloadable string/format
    const headers = 'Order ID,Sale Amount ($),Commission Earned ($),Date,Status\n';
    const rows = partnerSales.map(s => `${s.orderId},${s.amount.toFixed(2)},${s.commission.toFixed(2)},${s.date},${s.status}`).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(headers + rows)}`;

    // Create download trigger
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `Affiliate_Report_${selectedPartner.code}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show visual notice
    setExportedReport(`Successfully exported performance metrics for ${selectedPartner.code}.`);
    setTimeout(() => setExportedReport(null), 3000);
  };

  return (
    <div id="affiliate-system" className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-neutral-900 font-display">Affiliate Portal</h1>
          <p className="text-sm text-neutral-500 mt-1">Generate partner codes, trace referrals, and oversee commission disbursements.</p>
        </div>

        {/* Mini Tab switcher */}
        <div className="bg-neutral-100 p-1.5 rounded-xl flex gap-1 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 md:flex-none py-1.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Affiliator Workspace
          </button>
          <button
            onClick={() => setActiveTab('manager')}
            className={`flex-1 md:flex-none py-1.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'manager' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Partner Admin Hub
          </button>
        </div>
      </div>

      {/* Dynamic feedback notification banner */}
      {affiliateNotification && (
        <div className={`p-4 rounded-2xl border flex justify-between items-center text-xs font-bold transition-all animate-fade-in ${
          affiliateNotification.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs'
            : affiliateNotification.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-800 shadow-xs'
            : 'bg-amber-50 border-amber-200 text-amber-800 shadow-xs'
        }`}>
          <div className="flex items-center gap-2">
            {affiliateNotification.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            )}
            <span>{affiliateNotification.message}</span>
          </div>
          <button
            onClick={() => setAffiliateNotification(null)}
            className="p-1 hover:bg-black/5 rounded-lg text-neutral-400 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {activeTab === 'dashboard' ? (
        <div className="space-y-6">
          {/* Select active partner workspace */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-neutral-500" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Current Workspace</span>
                <select
                  value={selectedPartnerId}
                  onChange={(e) => setSelectedPartnerId(e.target.value)}
                  className="block w-full font-bold font-display text-neutral-900 bg-transparent border-none focus:outline-none focus:ring-0 text-base"
                >
                  {partners.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-xs bg-neutral-100 text-neutral-800 font-mono font-bold py-1.5 px-3 rounded-lg border border-neutral-200">
              Active Referrer Code: {selectedPartner?.code}
            </div>
          </div>

          {/* KPI Analytics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-neutral-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Referral Clicks</span>
                <Activity className="w-4 h-4 text-neutral-400" />
              </div>
              <span className="text-xl font-bold font-display">{selectedPartner?.clicks}</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-neutral-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Conversion Rate</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-xl font-bold font-display">{conversionRate}%</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-neutral-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Commission Earned</span>
                <DollarSign className="w-4 h-4 text-neutral-600" />
              </div>
              <span className="text-xl font-bold font-display text-neutral-950">${selectedPartner?.commissionEarned.toFixed(2)}</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm bg-gradient-to-br from-blue-50/30 to-blue-100/10">
              <div className="flex items-center justify-between text-blue-800 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Unpaid Balance</span>
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xl font-bold font-display text-blue-700">${selectedPartner?.balance.toFixed(2)}</span>
            </div>
          </div>

          {/* Link Generator Tool */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold font-display mb-4 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-neutral-800" /> Dynamic Referral Link Synthesizer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Choose Apparel Product</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full text-xs p-3 border border-neutral-200 rounded-xl bg-white focus:border-black focus:outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (${p.price.toFixed(2)})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateLink}
                  className="w-full h-[42px] flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 animate-pulse" /> Copied Tracked Link!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Generate & Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
            <p className="text-[10px] text-neutral-400 mt-2">
              Share this tracked product link with your audience. When they make any purchase, you instantly receive a <strong className="text-neutral-700">10% sales commission</strong>.
            </p>
          </div>

          {/* Referral Sales Logs */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <h3 className="font-bold font-display text-sm text-neutral-900">Referred Sales Record</h3>
              <button
                onClick={handleExportReport}
                className="flex items-center gap-1.5 py-1 px-3 border border-neutral-200 hover:border-black hover:bg-white rounded-lg text-[11px] font-bold transition-all text-neutral-700 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export performance metrics
              </button>
            </div>

            {exportedReport && (
              <div className="m-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs">
                {exportedReport}
              </div>
            )}

            {partnerSales.length === 0 ? (
              <div className="p-8 text-center text-neutral-400 text-xs">
                No purchases have been traced to this referral code yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/50">
                      <th className="py-3 px-4">Order Ref</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Order Subtotal</th>
                      <th className="py-3 px-4 text-right">Commission Earned (10%)</th>
                      <th className="py-3 px-4 text-center">Disbursement Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-neutral-700 divide-y divide-neutral-100">
                    {partnerSales.map(s => (
                      <tr key={s.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-semibold">{s.orderId}</td>
                        <td className="py-3 px-4 text-neutral-500">{s.date}</td>
                        <td className="py-3 px-4 text-right font-mono font-medium">${s.amount.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right font-mono text-emerald-600 font-bold">${s.commission.toFixed(2)}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-800'
                              : s.status === 'Approved'
                              ? 'bg-indigo-50 text-indigo-800'
                              : 'bg-blue-50 text-blue-800'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Partner Form */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm h-fit">
            <h3 className="text-sm font-bold font-display mb-4 flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Add Partner Contract
            </h3>
            <form onSubmit={handleCreatePartner} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Partner Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica Alba (Influencer)"
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Custom Referral Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JESSICACLUB"
                  value={newPartnerCode}
                  onChange={(e) => setNewPartnerCode(e.target.value)}
                  className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:border-black focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer"
              >
                Register & Bind Partner
              </button>
            </form>
          </div>

          {/* Manage Current Partners Table */}
          <div className="md:col-span-2 bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-neutral-100 bg-neutral-50/50">
              <h3 className="font-bold font-display text-sm text-neutral-900">Partner Accounts Registry</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/50">
                    <th className="py-3 px-4">Partner</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4 text-right">Commission Rate</th>
                    <th className="py-3 px-4 text-right">Balance Due</th>
                    <th className="py-3 px-4 text-center">Clearance Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-neutral-700 divide-y divide-neutral-100">
                  {partners.map(p => (
                    <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-neutral-900">{p.name}</td>
                      <td className="py-3 px-4 font-mono text-neutral-500">{p.code}</td>
                      <td className="py-3 px-4 text-right">10%</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-neutral-900">${p.balance.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handlePayCommission(p.code)}
                          disabled={p.balance <= 0}
                          className={`py-1 px-2.5 rounded text-[10px] font-bold transition-all ${
                            p.balance > 0
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer'
                              : 'bg-neutral-100 text-neutral-300 border border-transparent cursor-not-allowed'
                          }`}
                        >
                          Disburse Funds
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

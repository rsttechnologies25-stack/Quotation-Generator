"use client";

import React, { useState } from 'react';
import QuotationForm from '@/components/QuotationForm';
import QuotationPreview from '@/components/QuotationPreview';
import ExportButtons from '@/components/ExportButtons';
import { QuotationData } from '@/utils/calculations';
import { Sparkles, Layout, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [data, setData] = useState<QuotationData>({
    title: 'Quotation — Website Development & SaaS Plans',
    subtitle: 'Perambur Srinivasa — Review & Feedback Platform (Text-only reviews)',
    date: new Date().toLocaleDateString('en-GB'),
    validity: '30 days',

    oneTimeTitle: 'OPTION 1 — One-time Purchase',
    oneTimeServices: [
      { id: 's1', name: 'Custom-designed review website (mobile-first, responsive)', cost: '₹12,000' },
      { id: 's2', name: 'Branch management module (addresses, hours, directions)', cost: '₹5,000' },
      { id: 's3', name: 'Text-only review & rating system (overall + sub-ratings)', cost: '₹8,000' },
      { id: 's4', name: 'User accounts & authentication (NextAuth or JWT)', cost: '₹5,000' },
      { id: 's5', name: 'Admin dashboard for review moderation', cost: '₹5,000' }
    ],
    oneTimeTotalCost: '₹35,000',
    oneTimeHostingNotes: 'Hosting billed separately at ₹1,500 / year.',

    saasModelTitle: 'OPTION 2 — SaaS Model (Monthly Subscription)',
    saasModelSetupTitle: 'Initial Setup, Installation & Training (One-time)',
    saasModelSetupCost: '₹5,000 (one-time)',
    saasModelSetupDescription: 'This covers platform installation, configuration, onboarding, and training for staff/admin usage. Required only once when subscribing to any SaaS plan.',
    saasModelPlansDescription: 'We host, maintain, and operate the platform for you. Choose the plan that best matches your traffic and performance needs.',
    saasModelPlans: [
      { id: '1', name: 'Starter / Free', monthlyPrice: '₹0 / mo', performance: 'Standard', storage: '500MB', sleeping: 'May sleep on inactivity', bestFor: 'Testing / Low traffic' },
      { id: '2', name: 'Moderate', monthlyPrice: '₹1,500 / mo', performance: 'Balanced', storage: '2GB', sleeping: 'Always Online', bestFor: 'Small/Medium business' },
      { id: '3', name: 'Fast / Scale', monthlyPrice: '₹3,500 / mo', performance: 'High Performance', storage: '10GB', sleeping: 'Always Online', bestFor: 'High traffic / Enterprise' }
    ],

    inclusions: [
      'Free SSL Certificate for secure browsing (HTTPS).',
      'Regular maintenance and performance optimizations.',
      'Mobile-first responsive design (all devices).',
      'Search Engine Optimization (SEO) basics.',
      'Ongoing technical support via email.'
    ],
    additionalBenefits: [
      'Zero server administration — we manage updates and security.',
      'Faster delivery & seamless upgrades: new features deployed centrally.',
      'Automatic scaling as customer traffic grows (higher plans provide more resources).',
      'Lower friction: the restaurant focuses on operations while we handle technology.'
    ],
    footerNotes: `Hosting: billed separately at ₹1,500 / year.\nFor any custom features or additional integrations (multi-language, POS/ordering integrations, analytics dashboards), a separate proposal can be prepared.`
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#800000] p-2 rounded-xl shadow-lg shadow-[#800000]/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">QuoteV2</h1>
              <p className="text-[10px] text-[#800000] font-black uppercase tracking-widest">Premium PDF Matching</p>
            </div>
          </div>
          <ExportButtons data={data} />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:grid-cols-12 lg:px-8 py-8">
        {/* Mobile Tabs */}
        <div className="flex lg:hidden bg-white p-1.5 rounded-2xl border border-slate-200 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'edit' ? 'bg-[#800000] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            <Layout className="w-4 h-4" /> Edit Generator
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-[#800000] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            <Eye className="w-4 h-4" /> Live PDF Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Area */}
          <div className={`lg:col-span-5 ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-28 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Configure Quote</h2>
                <span className="bg-[#fee2e2] text-[#800000] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">Ref: PS4 Layout</span>
              </div>
              <QuotationForm data={data} onChange={setData} />
            </div>
          </div>

          {/* Preview Area */}
          <div className={`lg:col-span-7 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">PDF Simulation</h2>
                <div className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Real-time Render
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100"
              >
                <QuotationPreview data={data} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

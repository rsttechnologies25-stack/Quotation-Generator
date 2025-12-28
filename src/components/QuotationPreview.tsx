"use client";

import React from 'react';
import { QuotationData } from '@/utils/calculations';

interface QuotationPreviewProps {
    data: QuotationData;
}

const QuotationPreview: React.FC<QuotationPreviewProps> = ({ data }) => {
    return (
        <div
            id="quotation-canvas"
            className="bg-white shadow-2xl overflow-hidden w-full max-w-[850px] mx-auto text-slate-800 font-sans"
            style={{ minHeight: '1120px' }}
        >
            {/* Header Bar */}
            <div className="bg-[#800000] p-8 pb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight">{data.title || 'Quotation — Title'}</h1>
                <p className="text-white/80 text-lg mt-1 font-medium">{data.subtitle || 'Project Description'}</p>
            </div>

            <div className="p-10 -mt-6 bg-white rounded-t-[40px] space-y-10">
                {/* Date & Validity */}
                <div className="flex justify-between items-center text-sm font-semibold text-slate-500 px-2">
                    <p>Date: <span className="text-slate-900">{data.date || 'DD/MM/YYYY'}</span></p>
                    <p>Quotation valid for: <span className="text-slate-900">{data.validity || '30 days'}</span></p>
                </div>

                {/* Section 1: One-time (REFACTORED TO TABLE) */}
                <div className="space-y-6">
                    <h2 className="text-[#800000] text-xl font-bold uppercase tracking-wider">{data.oneTimeTitle || 'OPTION 1 — One-time Purchase'}</h2>
                    <div className="bg-[#f8f8f8] p-8 rounded-[32px] space-y-6 border border-slate-100">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Complete Development Features & Pricing</p>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Service Description</th>
                                        <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {data.oneTimeServices.map((service) => (
                                        <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-3 px-6 text-sm font-medium text-slate-700">{service.name || 'Service'}</td>
                                            <td className="py-3 px-6 text-sm font-bold text-slate-900 text-right">{service.cost || '₹0'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pt-4 border-t border-slate-200 flex justify-between items-end px-2">
                            <div>
                                <p className="text-xs text-slate-500 font-medium italic">{data.oneTimeHostingNotes || 'Hosting details...'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-slate-900 leading-none">
                                    Total: <span className="text-[#800000]">{data.oneTimeTotalCost || '₹0'}</span>
                                </p>
                                <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">One-time payment</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: SaaS */}
                <div className="space-y-6">
                    <h2 className="text-[#800000] text-xl font-bold uppercase tracking-wider">{data.saasModelTitle || 'OPTION 2 — SaaS Model (Monthly Subscription)'}</h2>

                    {/* Setup Fee */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 px-2">{data.saasModelSetupTitle || 'Initial Setup, Installation & Training'}</h3>
                        <div className="bg-[#fdf2f2] p-6 rounded-[24px] border border-[#fee2e2]">
                            <p className="text-slate-800 leading-relaxed font-medium">
                                <span className="text-[#800000] font-bold">{data.saasModelSetupCost || '₹0 (one-time)'}</span> — {data.saasModelSetupDescription || 'Setup description...'}
                            </p>
                        </div>
                    </div>

                    {/* Pricing Table */}
                    <div className="space-y-4 pt-4">
                        <p className="text-sm text-slate-500 font-medium px-2 italic">{data.saasModelPlansDescription || 'We host, maintain, and operate the platform for you. Choose the plan that best matches your traffic needs.'}</p>
                        <div className="overflow-hidden rounded-[24px] border border-slate-200 shadow-sm bg-white">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Plan</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Price</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Performance</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Storage</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Sleeping</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Best for</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {data.saasModelPlans.map((plan) => (
                                        <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">{plan.name || 'Plan'}</td>
                                            <td className="py-4 px-6 font-bold text-[#800000]">{plan.monthlyPrice || '₹0'}</td>
                                            <td className="py-4 px-6 text-sm text-slate-600 font-medium">{plan.performance || '-'}</td>
                                            <td className="py-4 px-6 text-sm text-slate-600 font-medium">{plan.storage || '-'}</td>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-bold italic">{plan.sleeping || '-'}</td>
                                            <td className="py-4 px-6 text-sm text-slate-600 font-medium leading-tight">{plan.bestFor || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Global Benefits & Inclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    <div className="space-y-6">
                        <h2 className="text-[#800000] text-xl font-bold uppercase tracking-wider">What's Included?</h2>
                        <div className="bg-[#f8f8f8] p-8 rounded-[32px] space-y-4 border border-slate-100">
                            <ul className="space-y-4">
                                {data.inclusions.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <CheckIcon className="w-5 h-5 text-[#800000] mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-medium leading-relaxed">{item || 'Inclusion item'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-[#800000] text-xl font-bold uppercase tracking-wider">Additional Benefits</h2>
                        <div className="bg-[#f8f8f8] p-8 rounded-[32px] space-y-4 border border-slate-100">
                            <ul className="space-y-4">
                                {data.additionalBenefits.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#800000] mt-2.5 shrink-0" />
                                        <span className="text-slate-700 font-medium leading-relaxed">{item || 'Benefit item'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="pt-10">
                    <div className="bg-[#efefef] p-8 rounded-[32px] border border-slate-200">
                        <p className="text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                            {data.footerNotes || 'Proposal details and notes...'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);

export default QuotationPreview;

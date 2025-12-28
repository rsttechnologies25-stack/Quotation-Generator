"use client";

import React from 'react';
import { Plus, Trash2, Layout, Table as TableIcon, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { QuotationData, SubscriptionPlan, OneTimeService } from '@/utils/calculations';

interface QuotationFormProps {
    data: QuotationData;
    onChange: (newData: QuotationData) => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ data, onChange }) => {
    const handleInputChange = (field: keyof QuotationData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const addListItem = (field: 'inclusions' | 'additionalBenefits') => {
        handleInputChange(field, [...data[field], '']);
    };

    const updateListItem = (field: 'inclusions' | 'additionalBenefits', index: number, value: string) => {
        const newList = [...data[field]];
        newList[index] = value;
        handleInputChange(field, newList);
    };

    const removeListItem = (field: 'inclusions' | 'additionalBenefits', index: number) => {
        handleInputChange(field, data[field].filter((_, i) => i !== index));
    };

    // One Time Services
    const addOneTimeService = () => {
        const newService: OneTimeService = {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            cost: '',
        };
        handleInputChange('oneTimeServices', [...data.oneTimeServices, newService]);
    };

    const updateOneTimeService = (id: string, field: keyof OneTimeService, value: string) => {
        handleInputChange('oneTimeServices', data.oneTimeServices.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const removeOneTimeService = (id: string) => {
        handleInputChange('oneTimeServices', data.oneTimeServices.filter(s => s.id !== id));
    };

    // Plans
    const addPlan = () => {
        const newPlan: SubscriptionPlan = {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            monthlyPrice: '',
            performance: '',
            storage: '',
            sleeping: '',
            bestFor: '',
        };
        handleInputChange('saasModelPlans', [...data.saasModelPlans, newPlan]);
    };

    const updatePlan = (id: string, field: keyof SubscriptionPlan, value: string) => {
        handleInputChange('saasModelPlans', data.saasModelPlans.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const removePlan = (id: string) => {
        handleInputChange('saasModelPlans', data.saasModelPlans.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-10 p-8 bg-white rounded-3xl border border-slate-100 shadow-xl overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
            {/* Basic Info */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-2 border-slate-100">
                    <Info className="w-5 h-5 text-indigo-500" /> General Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quotation Title</label>
                        <input
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={data.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Quotation — Website Development"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subtitle / Project</label>
                        <input
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={data.subtitle}
                            onChange={(e) => handleInputChange('subtitle', e.target.value)}
                            placeholder="e.g., Perambur Srinivasa Review Platform"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</label>
                        <input
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={data.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            placeholder="22/12/2025"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Validity</label>
                        <input
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={data.validity}
                            onChange={(e) => handleInputChange('validity', e.target.value)}
                            placeholder="30 days"
                        />
                    </div>
                </div>
            </section>

            {/* Option 1: One-time (REFACTORED TO TABLE) */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-2 border-slate-100">
                    <Layout className="w-5 h-5 text-rose-500" /> Option 1: One-time Purchase
                </h3>
                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all font-semibold"
                        value={data.oneTimeTitle}
                        onChange={(e) => handleInputChange('oneTimeTitle', e.target.value)}
                        placeholder="Option Title"
                    />

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Services & Pricing</label>
                            <button onClick={addOneTimeService} className="text-xs font-bold text-rose-600 flex items-center gap-1">
                                <Plus className="w-3 h-3" /> Add Service
                            </button>
                        </div>

                        <div className="space-y-3">
                            {data.oneTimeServices.map((service) => (
                                <div key={service.id} className="flex gap-2 group">
                                    <input
                                        className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-rose-500 outline-none text-sm"
                                        value={service.name}
                                        onChange={(e) => updateOneTimeService(service.id, 'name', e.target.value)}
                                        placeholder="Service Name"
                                    />
                                    <input
                                        className="w-32 px-4 py-2 rounded-lg border border-slate-200 focus:border-rose-500 outline-none text-sm font-bold"
                                        value={service.cost}
                                        onChange={(e) => updateOneTimeService(service.id, 'cost', e.target.value)}
                                        placeholder="Cost"
                                    />
                                    <button onClick={() => removeOneTimeService(service.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter ml-1">Grand Total (Option 1)</label>
                            <input
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all font-bold text-rose-600 bg-rose-50"
                                value={data.oneTimeTotalCost}
                                onChange={(e) => handleInputChange('oneTimeTotalCost', e.target.value)}
                                placeholder="Total Cost (e.g. ₹35,000)"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter ml-1">Small Print / Hosting Notes</label>
                            <input
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                                value={data.oneTimeHostingNotes}
                                onChange={(e) => handleInputChange('oneTimeHostingNotes', e.target.value)}
                                placeholder="Hosting Note"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Option 2: SaaS */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-2 border-slate-100">
                    <TableIcon className="w-5 h-5 text-indigo-500" /> Option 2: SaaS Model
                </h3>
                <div className="space-y-6">
                    <input
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                        value={data.saasModelTitle}
                        onChange={(e) => handleInputChange('saasModelTitle', e.target.value)}
                    />

                    <div className="p-4 bg-indigo-50/50 rounded-2xl space-y-3">
                        <p className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">Initial Setup Config</p>
                        <input
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm"
                            value={data.saasModelSetupTitle}
                            onChange={(e) => handleInputChange('saasModelSetupTitle', e.target.value)}
                            placeholder="Setup Title"
                        />
                        <input
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm"
                            value={data.saasModelSetupCost}
                            onChange={(e) => handleInputChange('saasModelSetupCost', e.target.value)}
                            placeholder="Setup Cost"
                        />
                        <textarea
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm min-h-[60px]"
                            value={data.saasModelSetupDescription}
                            onChange={(e) => handleInputChange('saasModelSetupDescription', e.target.value)}
                            placeholder="Setup Description"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subscription Plans</p>
                            <button onClick={addPlan} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                                <Plus className="w-3 h-3" /> Add Plan
                            </button>
                        </div>
                        <div className="space-y-4">
                            {data.saasModelPlans.map((plan) => (
                                <div key={plan.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3 relative group">
                                    <button onClick={() => removePlan(plan.id)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                        <input className="px-3 py-1.5 rounded border text-sm font-bold" placeholder="Plan Name" value={plan.name} onChange={(e) => updatePlan(plan.id, 'name', e.target.value)} />
                                        <input className="px-3 py-1.5 rounded border text-sm font-bold text-indigo-600 bg-indigo-50" placeholder="Price" value={plan.monthlyPrice} onChange={(e) => updatePlan(plan.id, 'monthlyPrice', e.target.value)} />
                                        <input className="px-3 py-1.5 rounded border text-sm" placeholder="Performance" value={plan.performance} onChange={(e) => updatePlan(plan.id, 'performance', e.target.value)} />
                                        <input className="px-3 py-1.5 rounded border text-sm" placeholder="Storage" value={plan.storage} onChange={(e) => updatePlan(plan.id, 'storage', e.target.value)} />
                                        <input className="px-3 py-1.5 rounded border text-sm" placeholder="Sleeping" value={plan.sleeping} onChange={(e) => updatePlan(plan.id, 'sleeping', e.target.value)} />
                                        <input className="px-3 py-1.5 rounded border text-sm" placeholder="Best For" value={plan.bestFor} onChange={(e) => updatePlan(plan.id, 'bestFor', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="space-y-6">
                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-2 border-slate-100">
                        <CheckCircle2 className="w-5 h-5 text-green-500" /> Global Inclusions
                    </h3>
                    <div className="space-y-2">
                        {data.inclusions.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input className="flex-1 px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm" value={item} onChange={(e) => updateListItem('inclusions', idx, e.target.value)} />
                                <button onClick={() => removeListItem('inclusions', idx)} className="text-slate-300 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('inclusions')} className="text-xs font-bold text-green-600">+ Add Inclusion</button>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-2 border-slate-100">
                        <Sparkles className="w-5 h-5 text-amber-500" /> Additional Benefits
                    </h3>
                    <div className="space-y-2">
                        {data.additionalBenefits.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input className="flex-1 px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm" value={item} onChange={(e) => updateListItem('additionalBenefits', idx, e.target.value)} />
                                <button onClick={() => removeListItem('additionalBenefits', idx)} className="text-slate-300 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('additionalBenefits')} className="text-xs font-bold text-amber-600">+ Add Benefit</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Footer Notes</label>
                <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm min-h-[100px]"
                    value={data.footerNotes}
                    onChange={(e) => handleInputChange('footerNotes', e.target.value)}
                    placeholder="Any small notes or closing remarks..."
                />
            </section>
        </div>
    );
};

export default QuotationForm;

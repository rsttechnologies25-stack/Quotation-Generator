"use client";

import React, { useState } from 'react';
import { FileText, Download, Loader2, FileType } from 'lucide-react';
import { exportToPDF, exportToDocx } from '@/utils/export';
import { QuotationData } from '@/utils/calculations';

interface ExportButtonsProps {
    data: QuotationData;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data }) => {
    const [isExportingPDF, setIsExportingPDF] = useState(false);
    const [isExportingDocx, setIsExportingDocx] = useState(false);

    const handlePDFExport = async () => {
        setIsExportingPDF(true);
        try {
            await exportToPDF('quotation-canvas', `Quotation_${data.subtitle.replace(/\s+/g, '_')}`);
        } finally {
            setIsExportingPDF(false);
        }
    };

    const handleDocxExport = async () => {
        setIsExportingDocx(true);
        try {
            await exportToDocx(data, `Quotation_${data.subtitle.replace(/\s+/g, '_')}`);
        } finally {
            setIsExportingDocx(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-4">
            <button
                onClick={handleDocxExport}
                disabled={isExportingDocx}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 border-2 border-[#800000] disabled:border-slate-100 disabled:text-slate-400 text-[#800000] px-6 py-3 rounded-xl font-bold transition-all shadow-sm active:scale-95"
            >
                {isExportingDocx ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileType className="w-5 h-5" />}
                Word Doc
            </button>
            <button
                onClick={handlePDFExport}
                disabled={isExportingPDF}
                className="flex items-center gap-2 bg-[#800000] hover:bg-[#600000] disabled:bg-slate-400 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#800000]/20 active:scale-95"
            >
                {isExportingPDF ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                Export PDF
            </button>
        </div>
    );
};

export default ExportButtons;

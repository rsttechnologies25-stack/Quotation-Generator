import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    AlignmentType,
    ThematicBreak,
} from 'docx';
import { QuotationData } from './calculations';
import { saveAs } from 'file-saver';

const MAROON = "800000";

export const exportToPDF = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const dataUrl = await toPng(element, {
            quality: 1.0,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
        });

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [element.offsetWidth, element.offsetHeight],
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight);
        pdf.save(`${filename}.pdf`);
    } catch (error) {
        console.error("PDF Export failed:", error);
        alert("PDF Export failed. Please try again or use the Word Doc option.");
    }
};

export const exportToDocx = async (data: QuotationData, filename: string) => {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                // Header
                new Paragraph({
                    children: [
                        new TextRun({ text: data.title, bold: true, size: 40, color: MAROON }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: data.subtitle, size: 24, color: "444444" }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 },
                }),

                new Paragraph({ children: [new ThematicBreak()] }),

                // Info Row
                new Paragraph({
                    children: [
                        new TextRun({ text: `Date: ${data.date}    |    Quotation valid for: ${data.validity}`, size: 20, color: "666666", italics: true }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 200, after: 600 },
                }),

                // Option 1: Heading
                new Paragraph({
                    children: [
                        new TextRun({ text: data.oneTimeTitle.toUpperCase(), bold: true, size: 28, color: MAROON }),
                    ],
                    spacing: { after: 300, before: 400 },
                }),

                // Option 1: Table
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            tableHeader: true,
                            children: [
                                new TableCell({
                                    shading: { fill: MAROON },
                                    children: [new Paragraph({ children: [new TextRun({ text: "SERVICE DESCRIPTION", bold: true, size: 18, color: "FFFFFF" })] })],
                                    margins: { top: 100, bottom: 100, left: 100 },
                                }),
                                new TableCell({
                                    shading: { fill: MAROON },
                                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "COST", bold: true, size: 18, color: "FFFFFF" })] })],
                                    margins: { top: 100, bottom: 100, right: 100 },
                                }),
                            ],
                        }),
                        ...data.oneTimeServices.map(service => new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({ children: [new TextRun({ text: service.name, size: 20 })] })],
                                    margins: { top: 100, bottom: 100, left: 100 },
                                }),
                                new TableCell({
                                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: service.cost, bold: true, size: 20 })] })],
                                    margins: { top: 100, bottom: 100, right: 100 },
                                }),
                            ],
                        })),
                    ],
                }),

                new Paragraph({
                    children: [
                        new TextRun({ text: "Total One-time Cost: ", bold: true, size: 28 }),
                        new TextRun({ text: data.oneTimeTotalCost, bold: true, size: 28, color: MAROON }),
                    ],
                    spacing: { before: 200 },
                    alignment: AlignmentType.RIGHT,
                }),
                new Paragraph({
                    children: [new TextRun({ text: data.oneTimeHostingNotes, italics: true, size: 18, color: "666666" })],
                    spacing: { after: 600 },
                    alignment: AlignmentType.RIGHT,
                }),

                // Option 2: Heading
                new Paragraph({
                    children: [
                        new TextRun({ text: data.saasModelTitle.toUpperCase(), bold: true, size: 28, color: MAROON }),
                    ],
                    spacing: { after: 300, before: 400 },
                }),

                new Paragraph({
                    children: [
                        new TextRun({ text: data.saasModelSetupTitle, bold: true, size: 22 }),
                    ],
                    spacing: { after: 150 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: `${data.saasModelSetupCost} — `, bold: true, color: MAROON, size: 20 }),
                        new TextRun({ text: data.saasModelSetupDescription, size: 20 }),
                    ],
                    spacing: { after: 400 },
                }),

                // SaaS Table
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            tableHeader: true,
                            children: [
                                "PLAN", "PRICE", "PERFORMANCE", "STORAGE", "SLEEPING", "BEST FOR"
                            ].map(h => new TableCell({
                                shading: { fill: MAROON },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, color: "FFFFFF", bold: true, size: 18 })] })],
                                margins: { top: 100, bottom: 100 },
                            })),
                        }),
                        ...data.saasModelPlans.map(plan => new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: plan.name, bold: true, size: 18 })] })], margins: { top: 100, bottom: 100, left: 50 } }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: plan.monthlyPrice, color: MAROON, bold: true, size: 18 })] })], margins: { top: 100, bottom: 100 } }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: plan.performance, size: 18 })] })], margins: { top: 100, bottom: 100 } }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: plan.storage, size: 18 })] })], margins: { top: 100, bottom: 100 } }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: plan.sleeping, size: 18, italics: true })] })], margins: { top: 100, bottom: 100 } }),
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: plan.bestFor, size: 18 })] })], margins: { top: 100, bottom: 100, left: 50 } }),
                            ],
                        })),
                    ],
                }),

                new Paragraph({ text: "", spacing: { before: 800 } }),

                // Inclusions & Benefits
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                        insideHorizontal: { style: BorderStyle.NONE },
                        insideVertical: { style: BorderStyle.NONE },
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    children: [
                                        new Paragraph({ children: [new TextRun({ text: "WHAT'S INCLUDED?", bold: true, color: MAROON, size: 24 })], spacing: { after: 200 } }),
                                        ...data.inclusions.map(item => new Paragraph({
                                            children: [new TextRun({ text: "✓ ", color: MAROON, bold: true }), new TextRun({ text: item, size: 20 })],
                                            spacing: { before: 100 },
                                            indent: { left: 400 },
                                        })),
                                    ],
                                }),
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    children: [
                                        new Paragraph({ children: [new TextRun({ text: "ADDITIONAL BENEFITS", bold: true, color: MAROON, size: 24 })], spacing: { after: 200 } }),
                                        ...data.additionalBenefits.map(item => new Paragraph({
                                            children: [new TextRun({ text: "• ", color: MAROON, bold: true }), new TextRun({ text: item, size: 20 })],
                                            spacing: { before: 100 },
                                            indent: { left: 400 },
                                        })),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                new Paragraph({ text: "", spacing: { before: 1200 } }),

                // Footer
                new Paragraph({
                    children: [
                        new TextRun({ text: data.footerNotes, size: 18, color: "666666" }),
                    ],
                    alignment: AlignmentType.LEFT,
                }),
            ],
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${filename}.docx`);
};

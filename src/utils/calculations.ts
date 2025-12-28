export interface SubscriptionPlan {
    id: string;
    name: string;
    monthlyPrice: string;
    performance: string;
    storage: string;
    sleeping: string;
    bestFor: string;
}

export interface OneTimeService {
    id: string;
    name: string;
    cost: string;
}

export interface QuotationData {
    title: string;
    subtitle: string;
    date: string;
    validity: string;

    // Option 1
    oneTimeTitle: string;
    oneTimeServices: OneTimeService[];
    oneTimeTotalCost: string; // Calculated or manual override
    oneTimeHostingNotes: string;

    // Option 2
    saasModelTitle: string;
    saasModelSetupTitle: string;
    saasModelSetupCost: string;
    saasModelSetupDescription: string;
    saasModelPlansDescription: string;
    saasModelPlans: SubscriptionPlan[];

    // Global Inclusions & Benefits
    inclusions: string[];
    additionalBenefits: string[];

    // Footer
    footerNotes: string;
}

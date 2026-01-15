import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, ArrowRight, X, Shield, Lock, Scale, Zap, BookOpen } from "lucide-react";
import { useLocation } from "wouter";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "@/components/ui/sheet";

// --- Types ---
type DeliverablePack = {
    id: string;
    title: string;
    microProof: string;
    cardBullets: string[];
    modalContent: {
        title: string;
        whatsInside: string[];
        idealFor: string[];
        primaryCta: string;
        secondaryCta: string;
    };
};

// --- Data ---
const DELIVERABLE_PACKS: DeliverablePack[] = [
    {
        id: "pdpl-readiness",
        title: "PDPL Readiness Pack",
        microProof: "Mapped to Saudi PDPL obligations with evidence-ready outputs.",
        cardBullets: [
            "Gap assessment",
            "Policy suite",
            "Control mapping",
            "Evidence pack",
        ],
        modalContent: {
            title: "PDPL Readiness Pack — Preview",
            whatsInside: [
                "PDPL gap assessment and priority findings",
                "Policy suite aligned to processing activities",
                "Control mapping and implementation actions",
                "Evidence pack structure for audit defensibility",
            ],
            idealFor: [
                "Organizations preparing for PDPL readiness or remediation",
                "Teams standardizing privacy controls and documentation",
                "Enterprises needing repeatable evidence generation",
            ],
            primaryCta: "Request This Pack",
            secondaryCta: "Speak with an Advisor",
        },
    },
    {
        id: "nca-ecc-readiness",
        title: "NCA ECC Readiness Pack",
        microProof: "Aligned to NCA ECC domains with audit preparation structure.",
        cardBullets: [
            "Domain assessment",
            "Control catalogue",
            "Implementation roadmap",
            "Audit preparation kit",
        ],
        modalContent: {
            title: "NCA ECC Readiness Pack — Preview",
            whatsInside: [
                "ECC domain assessment with prioritized remediation",
                "Control catalogue tailored to your environment",
                "Implementation roadmap with ownership and milestones",
                "Audit preparation kit and evidence expectations",
            ],
            idealFor: [
                "Organizations operating under NCA ECC expectations",
                "Security and compliance teams preparing for audits",
                "Enterprises standardizing cybersecurity governance",
            ],
            primaryCta: "Request This Pack",
            secondaryCta: "Talk to a Security Advisor",
        },
    },
    {
        id: "zatca-compliance",
        title: "ZATCA Compliance Operations Pack",
        microProof: "Designed for ZATCA operations with e-invoicing documentation and controls.",
        cardBullets: [
            "Compliance framework",
            "Process documentation",
            "E-invoicing controls",
            "Operations runbook",
        ],
        modalContent: {
            title: "ZATCA Compliance Operations Pack — Preview",
            whatsInside: [
                "Compliance framework and operating controls",
                "Process documentation for finance and tax workflows",
                "E-invoicing controls, roles, and checks",
                "Operations runbook for ongoing compliance",
            ],
            idealFor: [
                "Finance teams operationalizing ZATCA compliance",
                "Shared services and large-scale invoicing environments",
                "Organizations tightening documentation and controls",
            ],
            primaryCta: "Request This Pack",
            secondaryCta: "Speak with a Tax Advisor",
        },
    },
    {
        id: "corporate-governance",
        title: "Corporate Governance Pack",
        microProof: "Board-ready governance artifacts structured for accountability and reporting.",
        cardBullets: [
            "DoA matrix",
            "Board charters",
            "Committee terms",
            "Reporting framework",
        ],
        modalContent: {
            title: "Corporate Governance Pack — Preview",
            whatsInside: [
                "Delegation of Authority (DoA) structure",
                "Board and committee charters",
                "Committee terms of reference and responsibilities",
                "Reporting framework and governance cadence",
            ],
            idealFor: [
                "Organizations strengthening board and committee governance",
                "Enterprises formalizing decision rights and accountability",
                "Teams standardizing reporting and oversight",
            ],
            primaryCta: "Request This Pack",
            secondaryCta: "Speak with a Governance Advisor",
        },
    },
    {
        id: "erm-foundation",
        title: "ERM Foundation Pack",
        microProof: "Risk foundations built for consistent reporting and executive oversight.",
        cardBullets: [
            "Risk taxonomy",
            "Risk appetite statements",
            "KRI library",
            "Risk register",
        ],
        modalContent: {
            title: "ERM Foundation Pack — Preview",
            whatsInside: [
                "Risk taxonomy aligned to business objectives",
                "Risk appetite statements for executive approval",
                "KRI library with thresholds and monitoring logic",
                "Risk register structure for consistency and reporting",
            ],
            idealFor: [
                "Organizations establishing or rebuilding ERM foundations",
                "Risk teams standardizing taxonomy and reporting",
                "Enterprises needing board-ready risk visibility",
            ],
            primaryCta: "Request This Pack",
            secondaryCta: "Speak with a Risk Advisor",
        },
    },
    {
        id: "internal-audit",
        title: "Internal Audit Enablement Pack",
        microProof: "Audit operations toolkit designed for repeatable, high-quality execution.",
        cardBullets: [
            "Audit charter",
            "Audit methodology",
            "Annual plan",
            "Workpaper templates",
        ],
        modalContent: {
            title: "Internal Audit Enablement Pack — Preview",
            whatsInside: [
                "Audit charter and operating model foundations",
                "Methodology and execution standards",
                "Annual plan structure and prioritization approach",
                "Workpaper templates and evidence discipline",
            ],
            idealFor: [
                "Internal audit teams standardizing execution quality",
                "Organizations building audit readiness and discipline",
                "Enterprises improving repeatability across audits",
            ],
            primaryCta: "Request This Pack",
            secondaryCta: "Speak with an Audit Advisor",
        },
    },
];

// --- Hook for Responsive Side ---
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);
    return matches;
}

export default function DeliverablesSection() {
    const { t } = useTranslation();
    const [activePack, setActivePack] = useState<DeliverablePack | null>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [, setLocation] = useLocation();

    // Build packs from translations
    const DELIVERABLE_PACKS_TRANSLATED: DeliverablePack[] = [
        {
            id: "pdpl-readiness",
            title: t('deliverablesSection.pack1.title'),
            microProof: t('deliverablesSection.pack1.microProof'),
            cardBullets: [t('deliverablesSection.pack1.bullet1'), t('deliverablesSection.pack1.bullet2'), t('deliverablesSection.pack1.bullet3'), t('deliverablesSection.pack1.bullet4')],
            modalContent: {
                title: t('deliverablesSection.pack1.modalTitle'),
                whatsInside: [t('deliverablesSection.pack1.inside1'), t('deliverablesSection.pack1.inside2'), t('deliverablesSection.pack1.inside3'), t('deliverablesSection.pack1.inside4')],
                idealFor: [t('deliverablesSection.pack1.ideal1'), t('deliverablesSection.pack1.ideal2'), t('deliverablesSection.pack1.ideal3')],
                primaryCta: t('deliverablesSection.pack1.primaryCta'),
                secondaryCta: t('deliverablesSection.pack1.secondaryCta'),
            },
        },
        {
            id: "nca-ecc-readiness",
            title: t('deliverablesSection.pack2.title'),
            microProof: t('deliverablesSection.pack2.microProof'),
            cardBullets: [t('deliverablesSection.pack2.bullet1'), t('deliverablesSection.pack2.bullet2'), t('deliverablesSection.pack2.bullet3'), t('deliverablesSection.pack2.bullet4')],
            modalContent: {
                title: t('deliverablesSection.pack2.modalTitle'),
                whatsInside: [t('deliverablesSection.pack2.inside1'), t('deliverablesSection.pack2.inside2'), t('deliverablesSection.pack2.inside3'), t('deliverablesSection.pack2.inside4')],
                idealFor: [t('deliverablesSection.pack2.ideal1'), t('deliverablesSection.pack2.ideal2'), t('deliverablesSection.pack2.ideal3')],
                primaryCta: t('deliverablesSection.pack2.primaryCta'),
                secondaryCta: t('deliverablesSection.pack2.secondaryCta'),
            },
        },
        {
            id: "zatca-compliance",
            title: t('deliverablesSection.pack3.title'),
            microProof: t('deliverablesSection.pack3.microProof'),
            cardBullets: [t('deliverablesSection.pack3.bullet1'), t('deliverablesSection.pack3.bullet2'), t('deliverablesSection.pack3.bullet3'), t('deliverablesSection.pack3.bullet4')],
            modalContent: {
                title: t('deliverablesSection.pack3.modalTitle'),
                whatsInside: [t('deliverablesSection.pack3.inside1'), t('deliverablesSection.pack3.inside2'), t('deliverablesSection.pack3.inside3'), t('deliverablesSection.pack3.inside4')],
                idealFor: [t('deliverablesSection.pack3.ideal1'), t('deliverablesSection.pack3.ideal2'), t('deliverablesSection.pack3.ideal3')],
                primaryCta: t('deliverablesSection.pack3.primaryCta'),
                secondaryCta: t('deliverablesSection.pack3.secondaryCta'),
            },
        },
        {
            id: "corporate-governance",
            title: t('deliverablesSection.pack4.title'),
            microProof: t('deliverablesSection.pack4.microProof'),
            cardBullets: [t('deliverablesSection.pack4.bullet1'), t('deliverablesSection.pack4.bullet2'), t('deliverablesSection.pack4.bullet3'), t('deliverablesSection.pack4.bullet4')],
            modalContent: {
                title: t('deliverablesSection.pack4.modalTitle'),
                whatsInside: [t('deliverablesSection.pack4.inside1'), t('deliverablesSection.pack4.inside2'), t('deliverablesSection.pack4.inside3'), t('deliverablesSection.pack4.inside4')],
                idealFor: [t('deliverablesSection.pack4.ideal1'), t('deliverablesSection.pack4.ideal2'), t('deliverablesSection.pack4.ideal3')],
                primaryCta: t('deliverablesSection.pack4.primaryCta'),
                secondaryCta: t('deliverablesSection.pack4.secondaryCta'),
            },
        },
        {
            id: "erm-foundation",
            title: t('deliverablesSection.pack5.title'),
            microProof: t('deliverablesSection.pack5.microProof'),
            cardBullets: [t('deliverablesSection.pack5.bullet1'), t('deliverablesSection.pack5.bullet2'), t('deliverablesSection.pack5.bullet3'), t('deliverablesSection.pack5.bullet4')],
            modalContent: {
                title: t('deliverablesSection.pack5.modalTitle'),
                whatsInside: [t('deliverablesSection.pack5.inside1'), t('deliverablesSection.pack5.inside2'), t('deliverablesSection.pack5.inside3'), t('deliverablesSection.pack5.inside4')],
                idealFor: [t('deliverablesSection.pack5.ideal1'), t('deliverablesSection.pack5.ideal2'), t('deliverablesSection.pack5.ideal3')],
                primaryCta: t('deliverablesSection.pack5.primaryCta'),
                secondaryCta: t('deliverablesSection.pack5.secondaryCta'),
            },
        },
        {
            id: "internal-audit",
            title: t('deliverablesSection.pack6.title'),
            microProof: t('deliverablesSection.pack6.microProof'),
            cardBullets: [t('deliverablesSection.pack6.bullet1'), t('deliverablesSection.pack6.bullet2'), t('deliverablesSection.pack6.bullet3'), t('deliverablesSection.pack6.bullet4')],
            modalContent: {
                title: t('deliverablesSection.pack6.modalTitle'),
                whatsInside: [t('deliverablesSection.pack6.inside1'), t('deliverablesSection.pack6.inside2'), t('deliverablesSection.pack6.inside3'), t('deliverablesSection.pack6.inside4')],
                idealFor: [t('deliverablesSection.pack6.ideal1'), t('deliverablesSection.pack6.ideal2'), t('deliverablesSection.pack6.ideal3')],
                primaryCta: t('deliverablesSection.pack6.primaryCta'),
                secondaryCta: t('deliverablesSection.pack6.secondaryCta'),
            },
        },
    ];

    const handleCtaClick = () => {
        setLocation("/contact");
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
                    {t('deliverablesSection.title')}
                </h2>
                <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
                    {t('deliverablesSection.subtitle')}
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DELIVERABLE_PACKS_TRANSLATED.map((pack) => (
                        <Card
                            key={pack.id}
                            onClick={() => setActivePack(pack)}
                            className="p-8 border-2 border-gray-100 hover:border-[#C9A227] transition-all hover:shadow-xl hover:-translate-y-1 group bg-white cursor-pointer relative"
                        >
                            {/* Preview Badge */}
                            <div className="absolute top-6 right-6">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C9A227]/10 text-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-white transition-colors">
                                    {t('deliverablesSection.previewBadge')}
                                </span>
                            </div>

                            <div className="mb-6 mt-2">
                                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2 pr-16">{pack.title}</h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide border-l-2 border-[#C9A227] pl-3 py-1">
                                    {pack.microProof}
                                </p>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {pack.cardBullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <CheckCircle2 className="w-4 h-4 text-[#C9A227]/80 shrink-0 mt-0.5" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>

                {/* Global CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <Button
                        size="lg"
                        className="bg-[#C9A227] hover:bg-[#B8921F] text-white px-8 h-14 text-lg font-semibold"
                        onClick={handleCtaClick}
                    >
                        {t('deliverablesSection.primaryCta')}
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-gray-200 hover:bg-gray-50 text-gray-900 px-8 h-14 text-lg"
                        onClick={handleCtaClick}
                    >
                        {t('deliverablesSection.secondaryCta')}
                    </Button>
                </div>
            </div>

            {/* Slide-Over Preview Panel */}
            <Sheet open={!!activePack} onOpenChange={(open) => !open && setActivePack(null)}>
                <SheetContent
                    side={isDesktop ? "right" : "bottom"}
                    className={`
            w-full ${isDesktop ? "sm:max-w-xl" : "h-[90vh] rounded-t-[20px] max-h-[90vh]"} 
            bg-white text-gray-900 overflow-y-auto border-l shadow-2xl
          `}
                >
                    {activePack && (
                        <div className="flex flex-col h-full py-6">
                            <SheetHeader className="mb-8 text-left border-b pb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-[#C9A227]/10 rounded-lg">
                                        <FileText className="w-6 h-6 text-[#C9A227]" />
                                    </div>
                                    <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">{t('deliverablesSection.packPreviewLabel')}</span>
                                </div>
                                <SheetTitle className="text-2xl font-bold text-gray-900 mb-2">{activePack.modalContent.title}</SheetTitle>
                                <SheetDescription className="text-base text-gray-500 text-left">
                                    {activePack.microProof}
                                </SheetDescription>
                            </SheetHeader>

                            <div className="space-y-8 flex-grow">

                                {/* Visual Placeholder */}
                                <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 h-48 flex flex-col items-center justify-center text-center p-6">
                                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                                        <BookOpen className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{t('deliverablesSection.samplePreviewTitle')}</p>
                                    <p className="text-xs text-gray-500 mt-1">{t('deliverablesSection.samplePreviewDesc')}</p>
                                </div>

                                {/* What's Inside */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">{t('deliverablesSection.whatsInside')}</h4>
                                    <ul className="space-y-4">
                                        {activePack.modalContent.whatsInside.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Ideal For */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t('deliverablesSection.idealFor')}</h4>
                                    <ul className="space-y-3">
                                        {activePack.modalContent.idealFor.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                                                <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                                <Button
                                    onClick={handleCtaClick}
                                    className="w-full h-12 bg-[#C9A227] hover:bg-[#B8921F] text-white font-bold text-lg shadow-lg shadow-[#C9A227]/20"
                                >
                                    {activePack.modalContent.primaryCta}
                                </Button>
                                <Button
                                    onClick={handleCtaClick}
                                    variant="ghost"
                                    className="w-full h-12 text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    {activePack.modalContent.secondaryCta}
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </section>
    );
}

import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Brain, ArrowRight, X } from "lucide-react";
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
type AssetData = {
    id: string;
    cardTitle: string;
    cardIcon: any;
    cardBullets: string[];
    panelTitle: string;
    panelSubtitle: string;
    panelHighlights: string[];
    panelListTitle: string;
    panelListItems: string[];
    panelCta: string;
};

// --- Data ---
// --- Data ---
const ASSETS_DATA: AssetData[] = [
    {
        id: "proven-advisory",
        cardTitle: "Proven Advisory Expertise",
        cardIcon: CheckCircle2,
        cardBullets: [
            "30+ years combined from Big Four leaders with deep track records serving PIF portfolio companies, major enterprises, and regulators in Saudi Arabia.",
            "Senior advisory delivery across regulated environments — delivering implementation-ready outputs designed for audit and execution.",
        ],
        panelTitle: "Proven Advisory Expertise",
        panelSubtitle: "Advisory that stands up in regulated environments — with outputs built for execution, not slides.",
        panelHighlights: [
            "Senior-led delivery and governance-first methodology",
            "Audit-defensible evidence packs and documentation sets",
            "Rapid mobilization without compromising rigor",
            "Outputs structured for implementation and internal ownership",
        ],
        panelListTitle: "What you get",
        panelListItems: [
            "Gap Assessment",
            "Control Mapping",
            "Policy Suite",
            "Evidence Pack",
            "Executive Readout",
        ],
        panelCta: "Request a Sovereign Demo",
    },
    {
        id: "sovereign-architecture",
        cardTitle: "Sovereign AI Architecture",
        cardIcon: Lock,
        cardBullets: [
            "Kingdom-first infrastructure: full in-Kingdom data control (KSA Azure Region residency), policy enforcement, unbreakable compliance validation (Agent A12 — never bypassed), and full audit logging.",
            "Edge-ready deployment and readiness for Humain's ALLAM integration — ensuring maximum control for sensitive national-scale projects.",
        ],
        panelTitle: "Sovereign AI Architecture",
        panelSubtitle: "Built to operate inside sovereign constraints — with traceability, control, and security by design.",
        panelHighlights: [
            "Data residency and sovereignty controls aligned to Saudi requirements",
            "Policy enforcement across prompts, workflows, and outputs",
            "Audit logging and traceability for regulator-grade defensibility",
            "Deployable on private infrastructure, with integration-ready patterns",
        ],
        panelListTitle: "Key controls",
        panelListItems: [
            "Access Control",
            "Policy Guardrails",
            "Logging & Traceability",
            "Secure Connectors",
            "Segregated Workspaces",
        ],
        panelCta: "Talk to an Architect",
    },
    {
        id: "aliph-brain",
        cardTitle: "The Aliph Brain",
        cardIcon: Brain,
        cardBullets: [
            "15,000+ hours of codified Saudi advisory IP converted into 15-agent intelligent workflows — delivering repeatable, policy-to-evidence GRC outputs (registers, packs, mappings, suites).",
            "Compounding intelligence: quality and precision improve with every engagement — enabling faster, audit-ready outcomes aligned with Vision 2030's digital sovereignty goals.",
        ],
        panelTitle: "The Aliph Brain",
        panelSubtitle: "A sovereign advisory library that converts expertise into governed, repeatable delivery.",
        panelHighlights: [
            "Agentic workflows for repeatable, audit-ready outputs",
            "Saudi regulatory coverage mapped to delivery packs",
            "Evidence-driven generation (not generic content)",
            "Designed to scale across teams with governance built-in",
        ],
        panelListTitle: "Examples",
        panelListItems: [
            "PDPL Readiness Pack",
            "NCA ECC Controls Mapping",
            "ZATCA Compliance Evidence Pack",
            "Internal Audit Enablement Kit",
        ],
        panelCta: "Request a Sovereign Demo",
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

export default function AssetsSection() {
    const { t } = useTranslation();
    const [activeAsset, setActiveAsset] = useState<AssetData | null>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [, setLocation] = useLocation();

    // Dynamically build asset data from translations
    const ASSETS_DATA_TRANSLATED: AssetData[] = [
        {
            id: "proven-advisory",
            cardTitle: t('assetsSection.asset1.cardTitle'),
            cardIcon: CheckCircle2,
            cardBullets: [
                t('assetsSection.asset1.bullet1'),
                t('assetsSection.asset1.bullet2'),
            ],
            panelTitle: t('assetsSection.asset1.panelTitle'),
            panelSubtitle: t('assetsSection.asset1.panelSubtitle'),
            panelHighlights: [
                t('assetsSection.asset1.highlight1'),
                t('assetsSection.asset1.highlight2'),
                t('assetsSection.asset1.highlight3'),
                t('assetsSection.asset1.highlight4'),
            ],
            panelListTitle: t('assetsSection.asset1.listTitle'),
            panelListItems: [
                t('assetsSection.asset1.item1'),
                t('assetsSection.asset1.item2'),
                t('assetsSection.asset1.item3'),
                t('assetsSection.asset1.item4'),
                t('assetsSection.asset1.item5'),
            ],
            panelCta: t('assetsSection.asset1.cta'),
        },
        {
            id: "sovereign-architecture",
            cardTitle: t('assetsSection.asset2.cardTitle'),
            cardIcon: Lock,
            cardBullets: [
                t('assetsSection.asset2.bullet1'),
                t('assetsSection.asset2.bullet2'),
            ],
            panelTitle: t('assetsSection.asset2.panelTitle'),
            panelSubtitle: t('assetsSection.asset2.panelSubtitle'),
            panelHighlights: [
                t('assetsSection.asset2.highlight1'),
                t('assetsSection.asset2.highlight2'),
                t('assetsSection.asset2.highlight3'),
                t('assetsSection.asset2.highlight4'),
            ],
            panelListTitle: t('assetsSection.asset2.listTitle'),
            panelListItems: [
                t('assetsSection.asset2.item1'),
                t('assetsSection.asset2.item2'),
                t('assetsSection.asset2.item3'),
                t('assetsSection.asset2.item4'),
                t('assetsSection.asset2.item5'),
            ],
            panelCta: t('assetsSection.asset2.cta'),
        },
        {
            id: "aliph-brain",
            cardTitle: t('assetsSection.asset3.cardTitle'),
            cardIcon: Brain,
            cardBullets: [
                t('assetsSection.asset3.bullet1'),
                t('assetsSection.asset3.bullet2'),
            ],
            panelTitle: t('assetsSection.asset3.panelTitle'),
            panelSubtitle: t('assetsSection.asset3.panelSubtitle'),
            panelHighlights: [
                t('assetsSection.asset3.highlight1'),
                t('assetsSection.asset3.highlight2'),
                t('assetsSection.asset3.highlight3'),
                t('assetsSection.asset3.highlight4'),
            ],
            panelListTitle: t('assetsSection.asset3.listTitle'),
            panelListItems: [
                t('assetsSection.asset3.item1'),
                t('assetsSection.asset3.item2'),
                t('assetsSection.asset3.item3'),
                t('assetsSection.asset3.item4'),
            ],
            panelCta: t('assetsSection.asset3.cta'),
        },
    ];

    const handleCtaClick = () => {
        setLocation("/contact");
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    {t('assetsSection.title')} <br className="hidden md:block" />
                    {t('assetsSection.subtitle')}
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {ASSETS_DATA_TRANSLATED.map((asset) => (
                        <Card
                            key={asset.id}
                            onClick={() => setActiveAsset(asset)}
                            className="p-8 border-2 border-gray-200 hover:border-[#C9A227] transition-all hover:shadow-xl hover:-translate-y-2 group bg-gradient-to-br from-white to-gray-50 cursor-pointer flex flex-col h-full"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <asset.cardIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">{asset.cardTitle}</h3>
                            <ul className="space-y-3 text-gray-700 flex-grow">
                                {asset.cardBullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-[#C9A227] mt-1.5 text-[6px] shrink-0">●</span>
                                        <span className="text-sm leading-relaxed">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="inline-flex items-center gap-2 mt-8 text-[#C9A227] group-hover:text-[#B8921F] font-semibold">
                                {t('assetsSection.explore')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Closing Narrative */}
                <div className="text-center max-w-4xl mx-auto">
                    <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
                        {t('assetsSection.closingText')}
                        <br /><br />
                        {t('assetsSection.closingText2')}
                    </p>

                    <Button
                        size="lg"
                        className="bg-[#C9A227] hover:bg-[#B8921F] text-white font-bold text-lg px-8 py-6 h-auto"
                        onClick={() => setLocation("/contact")}
                    >
                        {t('assetsSection.closingCta')} <ArrowRight className="w-5 h-5 ml-2" /> {t('assetsSection.closingCtaSub')}
                    </Button>
                </div>
            </div>

            {/* Slide-Over Panel */}
            <Sheet open={!!activeAsset} onOpenChange={(open) => !open && setActiveAsset(null)}>
                <SheetContent
                    side={isDesktop ? "right" : "bottom"}
                    className={`
            w-full ${isDesktop ? "sm:max-w-xl" : "h-[90vh] rounded-t-[20px]"} 
            bg-[#0B1220] border-l border-white/10 text-white overflow-y-auto
          `}
                >
                    {activeAsset && (
                        <div className="flex flex-col h-full py-6">
                            <SheetHeader className="mb-8 text-left">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-[#C9A227]/20">
                                    <activeAsset.cardIcon className="w-6 h-6 text-black" />
                                </div>
                                <SheetTitle className="text-3xl font-bold text-white mb-2">{activeAsset.panelTitle}</SheetTitle>
                                <SheetDescription className="text-lg text-gray-400 leading-relaxed text-left">
                                    {activeAsset.panelSubtitle}
                                </SheetDescription>
                            </SheetHeader>

                            <div className="space-y-8 flex-grow">
                                {/* Highlights */}
                                <div className="bg-white/[0.03] rounded-xl p-6 border border-white/5">
                                    <h4 className="text-sm font-semibold text-[#C9A227] uppercase tracking-wider mb-4">{t('assetsSection.highlights')}</h4>
                                    <ul className="space-y-4">
                                        {activeAsset.panelHighlights.map((highlight, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                                                <span className="text-sm leading-relaxed">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* List Items (Chips) */}
                                <div>
                                    <h4 className="text-sm font-semibold text-[#C9A227] uppercase tracking-wider mb-4">{activeAsset.panelListTitle}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeAsset.panelListItems.map((item, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium hover:border-[#C9A227]/50 hover:bg-white/10 transition-colors cursor-default">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="pt-8 mt-8 border-t border-white/10 space-y-4">
                                <Button
                                    onClick={handleCtaClick}
                                    className="w-full h-12 bg-[#C9A227] hover:bg-[#B8921F] text-black font-bold text-lg"
                                >
                                    {activeAsset.panelCta}
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </section>
    );
}

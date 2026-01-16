import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Target, Shield, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

type ServeCard = {
    icon: any;
    key: string;
    ctaAction: "deliverables" | "advisor" | "vendor" | "government";
};

const SERVE_CARDS: ServeCard[] = [
    {
        icon: Building2,
        key: "regulated",
        ctaAction: "deliverables",
    },
    {
        icon: TrendingUp,
        key: "scaling",
        ctaAction: "advisor",
    },
    {
        icon: Target,
        key: "giga",
        ctaAction: "vendor",
    },
    {
        icon: Shield,
        key: "government",
        ctaAction: "government",
    },
];

type Props = {
    setScopeModalOpen: (open: boolean) => void;
};

export default function WhoWeServeCards({ setScopeModalOpen }: Props) {
    const { t } = useTranslation();
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [, setLocation] = useLocation();

    const toggleCard = (index: number) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    const handleCtaClick = (action: string) => {
        if (action === "advisor") {
            setScopeModalOpen(true);
        } else {
            setLocation("/contact");
        }
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SERVE_CARDS.map((card, idx) => (
                <Card
                    key={idx}
                    className="border-2 hover:border-[#C9A227] transition-all hover:shadow-lg overflow-hidden"
                >
                    <button
                        onClick={() => toggleCard(idx)}
                        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 rounded-sm"
                        aria-expanded={expandedCard === idx}
                        aria-controls={`serve-card-panel-${idx}`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <card.icon className="w-6 h-6 text-[#C9A227]" />
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedCard === idx ? "rotate-180" : ""
                                    }`}
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-gray-900">{t(`advisory.whoWeServe.cards.${card.key}.title`)}</h3>
                        <p className="text-sm text-gray-600">{t(`advisory.whoWeServe.cards.${card.key}.description`)}</p>
                    </button>

                    {/* Expanded Panel */}
                    <div
                        id={`serve-card-panel-${idx}`}
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedCard === idx ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className="px-6 pb-6 pt-2 bg-gray-50/50 border-t border-gray-100 space-y-3">
                            <p className="text-xs text-gray-600 leading-relaxed">• {t(`advisory.whoWeServe.cards.${card.key}.typicalNeed`)}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">• {t(`advisory.whoWeServe.cards.${card.key}.commonOutputs`)}</p>

                            <Button
                                onClick={() => handleCtaClick(card.ctaAction)}
                                className="w-full bg-[#C9A227] hover:bg-[#B8921F] text-white text-sm h-9 mt-2"
                            >
                                {t(`advisory.whoWeServe.cards.${card.key}.ctaText`)}
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

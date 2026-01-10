import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Building2, Shield, Users, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

// --- Types ---
type ServeSegment = {
    icon: any;
    title: string;
    teaser: string;
    expandedDesc: string;
    expandedBullets: string[];
    ctaLabel: string;
};

type ScaleItem = {
    title: string;
    teaser: string;
    expandedDesc: string;
    expandedBullets: string[];
    ctaLabel: string;
};

// --- Data ---
const SERVE_SEGMENTS: ServeSegment[] = [
    {
        icon: TrendingUp,
        title: "Scaling Organizations",
        teaser: "Saudi organizations formalizing compliance for enterprise and government readiness.",
        expandedDesc: "We empower mid-level and growing organizations in Saudi Arabia to achieve regulatory maturity and operational excellence, aligning with Vision 2030's emphasis on digital transformation and SME empowerment as national economic drivers. Our sovereign AI-enabled workflows provide precise, audit-ready GRC solutions that scale from internal policy development to institutional partnerships.",
        expandedBullets: [
            "Tailored GRC Frameworks: Customized ERM, business continuity, and policy packs compliant with PDPL, CMA, and SAMA — delivered with unbreakable validation.",
            "Fractional Leadership Support: Access fractional CCO/CRO roles powered by the Aliph Brain's compounding intelligence, ensuring strategic alignment without full-time overhead.",
            "Regulatory Readiness for Growth: Support for IPO preparation and listing requirements, with edge-ready deployment for secure data handling.",
            "Vision 2030 Enablement: Accelerate your transition to sovereign digital operations, mitigating risks in an active PDPL enforcement landscape."
        ],
        ctaLabel: "Request Compliance Scan",
    },
    {
        icon: Building2,
        title: "Boardrooms",
        teaser: "CEOs, CROs, and governance leaders requiring board-grade risk and compliance clarity.",
        expandedDesc: "In Saudi boardrooms, where strategic decisions shape national-scale impact, Aliph Solutions delivers precise, sovereign AI-enabled insights that enhance governance oversight and risk management. Drawing from 30+ years of Big Four expertise serving PIF portfolios and regulators, we provide audit-ready deliverables that align with Vision 2030's governance modernization goals.",
        expandedBullets: [
            "Board Charters & Subsidiary Governance: Customized frameworks with Aliph Brain-powered analysis for family businesses and corporate groups.",
            "Enterprise Risk Management (ERM): Comprehensive assessments and crisis management plans, validated through our 15-agent workflows.",
            "Compliance Clarity: Real-time mapping to CMA, SAMA, and NCA requirements, ensuring unbreakable regulatory adherence.",
            "Strategic Advisory: Fractional support for board secretaries and CROs, compounding organizational intelligence over time."
        ],
        ctaLabel: "Schedule Private Demo",
    },
    {
        icon: Shield,
        title: "Government Partners",
        teaser: "Public sector entities requiring sovereign, secure advisory delivery and defensible outputs.",
        expandedDesc: "Aliph Solutions partners with Saudi government entities to advance Vision 2030's digital sovereignty objectives, providing secure, AI-enabled GRC advisory that ensures compliance and operational resilience. Our Kingdom-first infrastructure — with full data residency and unbreakable validation — supports regulators and public institutions in maintaining national standards.",
        expandedBullets: [
            "Regulatory Compliance Mapping: Tailored to PDPL, NCA, and SDAIA guidelines, with audit-ready outputs for internal reviews.",
            "Secure Advisory Delivery: Edge deployment and customer-owned keys for sensitive public sector data, integrating seamlessly with Humain's ALLAM.",
            "Defensible Policy Development: AML/CFT and operational risk frameworks powered by the Aliph Brain's compounding expertise.",
            "Institutional Modernization: Support for digital transformation initiatives, aligning with Vision 2030's $1T+ investment pipeline."
        ],
        ctaLabel: "Explore Partnership",
    },
    {
        icon: Users,
        title: "Giga-Project Vendors",
        teaser: "Suppliers to mega-projects needing rapid compliance readiness and audit-grade documentation.",
        expandedDesc: "For vendors supporting Saudi Arabia's giga-projects (e.g., NEOM, Qiddiya, Diriyah), Aliph Solutions accelerates compliance readiness with sovereign AI-enabled tools that deliver defensible, audit-grade documentation at scale. Aligned with Vision 2030's mega-project ecosystem, our platform ensures seamless integration into national initiatives while mitigating regulatory risks.",
        expandedBullets: [
            "Rapid Risk Assessments: Operational and supply chain risk frameworks compliant with NCA and CMA standards.",
            "Audit-Grade Documentation: Policy packs and mapping suites generated via 15-agent workflows, with unbreakable compliance checks.",
            "Sovereign Data Handling: KSA Azure residency and edge-ready deployment for project-sensitive information.",
            "Scalable Support: Fractional GRC services that compound intelligence, supporting vendors from procurement to execution."
        ],
        ctaLabel: "Request Sovereign Demo",
    },
];

const SCALE_ITEMS: ScaleItem[] = [
    {
        title: "Service-Led Delivery Today",
        teaser: "High-touch advisory engagements accelerated through sovereign, governed AI workflows.",
        expandedDesc: "Aliph Solutions begins with service-led excellence, leveraging our 30+ years of Big Four expertise to deliver immediate value in Saudi regulated environments. Our sovereign AI workflows enhance human judgment, ensuring precise outcomes while maintaining Vision 2030's focus on national capability building.",
        expandedBullets: [
            "Governed AI Acceleration: 15-agent systems handle 80% automation, with experts validating the critical 20% for audit-ready results.",
            "High-Touch Engagements: Customized consultations for CMA/SAMA compliance, powered by unbreakable Agent A12 validation.",
            "Immediate Impact: From board governance to crisis management, delivered with full data sovereignty in the KSA Azure Region.",
            "Vision Alignment: Building Saudi organizational memory through compounding intelligence."
        ],
        ctaLabel: "Schedule Consultation",
    },
    {
        title: "Workflow-Scaled Platform Advantage Tomorrow",
        teaser: "An expanding catalog of proven, governed workflows enables repeatable delivery at scale.",
        expandedDesc: "As Aliph Solutions evolves, our workflow-scaled platform creates a compounding advantage, turning every engagement into improved intelligence for future scalability. Aligned with Vision 2030's digital ecosystem goals, this model enables efficient, sovereign GRC delivery across growing organizations.",
        expandedBullets: [
            "Expanding Workflow Catalog: 12+ agentic processes for regulatory mapping, risk frameworks, and policy development — quality improves from 75% to 95%+ over time.",
            "Repeatable Delivery: Multi-LLM optimization for efficiency, with edge-ready deployment for enterprise control.",
            "Compounding Moat: The Aliph Brain learns from each interaction, creating network effects competitors cannot replicate.",
            "Scalable National Impact: Supporting Vision 2030's SME empowerment and institutional modernization through governed AI."
        ],
        ctaLabel: "Explore Platform",
    },
    {
        title: "Regional Expansion Readiness (GCC)",
        teaser: "A Saudi-proven model positioned to support GCC-wide sovereign GRC modernization.",
        expandedDesc: "Built on Saudi sovereignty foundations, Aliph Solutions is ready for GCC expansion, extending our proven model to support regional regulatory harmonization and digital transformation. With Vision 2030 as our core, we enable cross-border GRC excellence while maintaining Kingdom-first standards.",
        expandedBullets: [
            "GCC Regulatory Alignment: Workflows adaptable to UAE PDPA, Bahrain PDPL, and regional frameworks, with unbreakable compliance validation.",
            "Sovereign Infrastructure: Single-tenant, customer-owned keys extendable to GCC data centers, ensuring local residency.",
            "Regional Scalability: The Aliph Brain's compounding intelligence supports multi-jurisdictional risk assessments and policy packs.",
            "Vision 2030 Export: Positioned to advance Saudi leadership in GCC digital sovereignty initiatives."
        ],
        ctaLabel: "Discuss Partnership",
    },
];

export default function WhoWeServeSection() {
    const [expandedServe, setExpandedServe] = useState<number | null>(null);
    const [expandedScale, setExpandedScale] = useState<number | null>(null);
    const [, setLocation] = useLocation();

    const handleCtaClick = () => {
        setLocation("/contact");
    };

    const toggleServe = (index: number) => {
        setExpandedServe(expandedServe === index ? null : index);
    };

    const toggleScale = (index: number) => {
        setExpandedScale(expandedScale === index ? null : index);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Who we serve */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Who We Serve</h2>
                        <div className="space-y-6">
                            {SERVE_SEGMENTS.map((segment, idx) => (
                                <Card key={idx} className="border-l-4 border-[#C9A227] hover:shadow-lg transition-all overflow-hidden">
                                    <button
                                        onClick={() => toggleServe(idx)}
                                        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 rounded-sm"
                                        aria-expanded={expandedServe === idx}
                                        aria-controls={`serve-panel-${idx}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <segment.icon className="w-6 h-6 text-[#C9A227]" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-bold text-lg mb-1 text-gray-900">{segment.title}</h3>
                                                    <ChevronDown
                                                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedServe === idx ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-600">{segment.teaser}</p>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expanded Panel */}
                                    <div
                                        id={`serve-panel-${idx}`}
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedServe === idx ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="px-6 pb-6 pt-2 bg-gray-50/50 border-t border-gray-100">
                                            <div className="space-y-4">
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {segment.expandedDesc}
                                                </p>

                                                <ul className="space-y-2">
                                                    {segment.expandedBullets.map((bullet, i) => {
                                                        const [boldPart, rest] = bullet.split(":");
                                                        return (
                                                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                                <span className="text-[#C9A227] mt-1.5 text-[6px] shrink-0">●</span>
                                                                <span>
                                                                    {rest ? (
                                                                        <>
                                                                            <span className="font-semibold text-gray-900">{boldPart}:</span>{rest}
                                                                        </>
                                                                    ) : (
                                                                        bullet
                                                                    )}
                                                                </span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>

                                                <div className="pt-2">
                                                    <Button
                                                        onClick={handleCtaClick}
                                                        className="w-full sm:w-auto bg-[#C9A227] hover:bg-[#B8921F] text-white text-sm h-9"
                                                    >
                                                        {segment.ctaLabel}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* How we scale */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">How We Scale</h2>
                        <div className="space-y-8">
                            {SCALE_ITEMS.map((item, idx) => (
                                <div key={idx} className="relative pl-8 border-l-2 border-[#C9A227]">
                                    <div className="absolute -left-2 top-0 w-4 h-4 bg-[#C9A227] rounded-full"></div>

                                    <button
                                        onClick={() => toggleScale(idx)}
                                        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 rounded-sm"
                                        aria-expanded={expandedScale === idx}
                                        aria-controls={`scale-panel-${idx}`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                                                <p className="text-gray-600">{item.teaser}</p>
                                            </div>
                                            <ChevronDown
                                                className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 mt-1 ${expandedScale === idx ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </div>
                                    </button>

                                    {/* Expanded Panel */}
                                    <div
                                        id={`scale-panel-${idx}`}
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedScale === idx ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {item.expandedDesc}
                                            </p>

                                            <ul className="space-y-2">
                                                {item.expandedBullets.map((bullet, i) => {
                                                    const [boldPart, rest] = bullet.split(":");
                                                    return (
                                                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                            <span className="text-[#C9A227] mt-1.5 text-[6px] shrink-0">●</span>
                                                            <span>
                                                                {rest ? (
                                                                    <>
                                                                        <span className="font-semibold text-gray-900">{boldPart}:</span>{rest}
                                                                    </>
                                                                ) : (
                                                                    bullet
                                                                )}
                                                            </span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>

                                            <div className="pt-2">
                                                <Button
                                                    onClick={handleCtaClick}
                                                    variant="outline"
                                                    className="w-full sm:w-auto border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white text-sm h-9"
                                                >
                                                    {item.ctaLabel}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Optional Closing Line */}
                <p className="text-center mt-12 text-sm text-gray-500 font-light">
                    Same sovereign standard — delivered across segments as readiness increases.
                </p>
            </div>
        </section>
    );
}

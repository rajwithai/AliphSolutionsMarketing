import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Handshake, Shield, Cloud, Lock, Wrench, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function CompanyPartners() {
  useSEO({
    title: 'Partners | Aliph Solutions',
    description: 'Aliph collaborates with legal, regulatory, technology, cybersecurity, and delivery partners to support Saudi transformation programs and organizational readiness.',
    keywords: 'Aliph Solutions partners, ecosystem partnerships, Saudi GRC delivery, technology partners, consulting partnerships',
  });

  const partnerTypes = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Legal & Regulatory',
      description: 'Law firms and regulatory consultants providing interpretation and guidance on Saudi compliance frameworks',
      capabilities: [
        'PDPL and data protection law interpretation',
        'NCA guidance and regulatory engagement',
        'ZATCA, MHRSD, and sector-specific compliance',
        'Corporate governance and board advisory'
      ]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Technology & Cloud',
      description: 'Cloud providers and infrastructure partners supporting sovereign-grade deployments',
      capabilities: [
        'Sovereign cloud infrastructure (regional data residency)',
        'Private cloud and hybrid deployment models',
        'Identity, access, and audit logging integration',
        'Compliance-ready platform configurations'
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Cybersecurity',
      description: 'Security firms and penetration testing specialists ensuring audit-ready posture',
      capabilities: [
        'NCA ECC readiness assessments and controls validation',
        'Vulnerability assessment and penetration testing',
        'Security architecture review and validation',
        'Incident response planning and tabletop exercises'
      ]
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Delivery & Integration',
      description: 'Systems integrators and implementation partners building out governed workflows',
      capabilities: [
        'ERP, CRM, and enterprise system integration',
        'Custom workflow and automation development',
        'Change management and organizational readiness',
        'Implementation quality assurance and testing'
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Consulting Firms',
      description: 'Strategic and management consulting partners co-delivering transformation programs',
      capabilities: [
        'Strategy, operating model design, and roadmapping',
        'Digital transformation and change programs',
        'Large-scale governance and risk transformations',
        'Public sector and giga-project delivery support'
      ]
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'Incubators & Accelerators',
      description: 'Startup ecosystem partners helping high-growth companies build compliance from day one',
      capabilities: [
        'Structured GRC and governance for Series A+ companies',
        'PDPL compliance and data protection foundations',
        'AI governance for product companies',
        'Pre-audit readiness and evidence preparation'
      ]
    }
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[65vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Handshake className="w-6 h-6 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">Ecosystem Partnerships</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Partners
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Aliph collaborates with ecosystem partners—legal, technology, cybersecurity, consulting, and delivery teams—to support Saudi transformation programs and organizational readiness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/company/contact'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                Explore Partnership Opportunities
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/advisory'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Explore Advisory
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Partner Types
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            We work with partners across disciplines to deliver complete, audit-ready outcomes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerTypes.map((partner, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group">
                <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 text-[#C9A227] group-hover:bg-[#C9A227]/20 transition-colors">
                  {partner.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{partner.title}</h3>
                <p className="text-gray-600 mb-6">{partner.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Key Capabilities:</p>
                  <ul className="space-y-2">
                    {partner.capabilities.map((capability, capIdx) => (
                      <li key={capIdx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW PARTNERSHIPS WORK */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            How Partnerships Work
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Structured collaboration models for joint delivery and client success
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#C9A227] text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-4">Referral & Co-Engagement</h3>
              <p className="text-gray-600 mb-4">
                Partners refer clients with GRC, AI governance, or compliance needs. Aliph provides scoped delivery and shares outcomes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Clear engagement scopes and timelines</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Transparent communication with end client</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Evidence-ready deliverables</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#C9A227] text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-4">Joint Delivery</h3>
              <p className="text-gray-600 mb-4">
                Aliph and partners co-deliver transformation programs—strategy + implementation + governance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Coordinated workstreams and timelines</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Shared governance and quality assurance</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Combined expertise across domains</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#C9A227] text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-4">Ecosystem Enablement</h3>
              <p className="text-gray-600 mb-4">
                Aliph provides partners with GRC and AI governance training, templates, and co-branded content.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Partner enablement workshops</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Co-branded thought leadership</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Joint market development</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH ALIPH */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Partner with Aliph
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              'Specialized GRC and AI governance expertise',
              'Structured, audit-ready delivery methodology',
              'Sovereign-by-design technology platform',
              'Saudi-first compliance and regulatory knowledge',
              'Implementation-first approach (not just documentation)',
              'Proven engagement models and clear governance'
            ].map((benefit, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] mb-3" />
                <p className="text-gray-700 font-medium">{benefit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TESTIMONIAL PLACEHOLDER */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 bg-gradient-to-br from-white to-gray-50 border-2 border-[#C9A227]/30">
            <p className="text-2xl text-gray-700 italic text-center mb-6">
              "Aliph brings the rigor of consulting with the structure of governed workflows. We co-delivered a GRC transformation for a regulated client—audit-ready outputs, clear timelines, and full traceability throughout."
            </p>
            <p className="text-center text-gray-900 font-semibold">— Strategic Consulting Partner</p>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Explore Partnership Opportunities
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            If you're a consulting, legal, technology, or delivery partner looking to expand GRC and AI governance capabilities, let's discuss collaboration models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/company/contact'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Contact Partnerships Team
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/deliverables'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              View Sample Deliverables
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

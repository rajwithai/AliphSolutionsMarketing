import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Award, CheckCircle2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function CompanyLeadership() {
  useSEO({
    title: 'Leadership | Aliph Solutions',
    description: 'Meet the advisory, technical, and delivery leadership behind Aliph Solutions—combining regulatory expertise, sovereign architecture, and AI governance.',
    keywords: 'Aliph Solutions leadership, Saudi compliance experts, GRC advisory team, sovereign AI architects',
  });

  const leaders = [
    {
      name: 'Advisory Leadership',
      role: 'Head of Advisory',
      credentials: [
        '15+ years regulatory compliance and governance',
        'Led GRC transformations for enterprises and public sector',
        'Deep domain expertise: PDPL, NCA ECC, ZATCA, internal audit'
      ]
    },
    {
      name: 'Technology Leadership',
      role: 'Head of Sovereign Architecture',
      credentials: [
        '12+ years enterprise system design and security',
        'Specialist in data sovereignty, audit logging, policy enforcement',
        'Led sensitive deployments for strict-environment organizations'
      ]
    },
    {
      name: 'AI Governance Leadership',
      role: 'Head of AI Governance & Risk',
      credentials: [
        '10+ years AI risk assessment and governance frameworks',
        'Experience advising boards and executives on AI policy',
        'Expert in responsible AI, third-party risk, and audit readiness'
      ]
    },
    {
      name: 'Delivery Leadership',
      role: 'Head of Client Delivery',
      credentials: [
        '14+ years engagement management and advisory delivery',
        'Built structured workflows for rapid, audit-ready outcomes',
        'Led complex multi-workstream engagements across sectors'
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
              <Users className="w-6 h-6 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">Leadership & Expertise</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Built by advisors, architects, and delivery experts
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Aliph combines deep regulatory advisory expertise, sovereign architecture discipline, and AI governance experience—built for the Saudi environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/company/contact'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                Speak with the Team
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

      {/* LEADERSHIP TEAM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Leadership Team
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Combining consulting rigor, technical depth, and delivery discipline to support organizational readiness.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {leaders.map((leader, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#C9A227]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                    <p className="text-[#C9A227] font-semibold">{leader.role}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {leader.credentials.map((cred, credIdx) => (
                    <li key={credIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{cred}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY BOARD */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
            Advisory Network
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Aliph works with a network of legal, regulatory, and cybersecurity advisors to ensure every deliverable meets Saudi regulatory expectations and international best practice.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { area: 'Legal & Regulatory', desc: 'Saudi compliance law, PDPL interpretation, NCA guidance' },
              { area: 'Cybersecurity & Privacy', desc: 'NCA ECC, data protection, security architecture review' },
              { area: 'Financial & Tax Compliance', desc: 'ZATCA, VAT, transfer pricing, audit coordination' }
            ].map((advisor, idx) => (
              <Card key={idx} className="p-6 text-center border-2 hover:border-[#C9A227] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{advisor.area}</h3>
                <p className="text-sm text-gray-600">{advisor.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATING PRINCIPLES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            How the Team Operates
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              'Implementation-first: We build deliverables that work, not just presentations',
              'Expert-reviewed: Outputs validated by domain specialists before delivery',
              'Governed workflows: Every deliverable follows structured quality gates',
              'Client-embedded: We work alongside your teams, not remotely',
              'Outcome-driven: Timelines, owners, evidence packaging—clarity throughout',
              'Long-term readiness: We prepare organizations for audit, not just compliance theatre'
            ].map((principle, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] mb-3" />
                <p className="text-gray-700">{principle}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Work with a Team That Understands Saudi Realities
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request a readiness call, sample deliverables, or scoped engagement plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/company/contact'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Contact the Team
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/deliverables'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Request Sample Deliverables
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

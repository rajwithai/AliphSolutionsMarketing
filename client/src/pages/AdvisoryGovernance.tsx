import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Scale, ArrowRight, FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function AdvisoryGovernance() {
  useSEO({
    title: 'Governance Advisory | Aliph Solutions',
    description: 'Corporate governance advisory for Saudi organizations—board structure, delegation frameworks, policy architecture, and governance operating models delivered through expert-led, audit-ready processes.',
    keywords: 'governance advisory, corporate governance, board structure, delegation of authority, Saudi governance, policy architecture',
  });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-10 h-10 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">Advisory Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Governance Advisory
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Build governance structures that meet board, regulator, and investor expectations—with clear accountability, delegation frameworks, and policy architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/deliverables'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                Request Sample Deliverables
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/advisory'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Request Scope
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What Governance Advisory Covers
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Board & Committee Governance</h3>
              <p className="text-gray-600">
                Structure, charters, composition, reporting lines, and meeting cadences for boards, audit committees, risk committees, and governance committees.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Delegation of Authority (DoA)</h3>
              <p className="text-gray-600">
                Decision-making frameworks that define who can approve what, with thresholds, escalation paths, and segregation of duties.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Policy Architecture</h3>
              <p className="text-gray-600">
                Enterprise-wide policy structure, hierarchies (framework → policy → procedure → work instruction), ownership, review cycles.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Governance Operating Model</h3>
              <p className="text-gray-600">
                How governance operates day-to-day: three lines of defense, reporting structures, escalation protocols, board reporting packs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Typical Deliverables */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Typical Deliverables
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            What you receive at the end of a governance engagement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              'Board charter & committee charters',
              'Delegation of Authority matrix',
              'Three lines of defense model',
              'Board reporting pack template',
              'Policy framework & hierarchy',
              'Governance calendar & cadence',
              'Role & responsibility (RACI) matrices',
              'Escalation & decision protocols',
              'Governance operating procedures'
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Governance That Scales?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request sample deliverables or a scoped plan for your governance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Request Sample Deliverables
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/advisory'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Back to Advisory Services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

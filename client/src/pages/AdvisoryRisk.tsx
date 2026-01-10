import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function AdvisoryRisk() {
  useSEO({
    title: 'Risk Management Advisory | Aliph Solutions',
    description: 'Enterprise risk management, risk appetite frameworks, and third-party risk governance for Saudi organizations—delivered with structured methodologies and audit-ready outputs.',
    keywords: 'risk management, ERM, risk appetite, vendor risk, third-party risk, Saudi risk advisory',
  });

  return (
    <>
      <section className="relative min-h-[60vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-10 h-10 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">Advisory Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Risk Management Advisory
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Build enterprise risk management foundations, risk appetite frameworks, and third-party risk governance—with structured methodologies and board-ready reporting.
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What Risk Advisory Covers
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">ERM Foundation</h3>
              <p className="text-gray-600">
                Risk taxonomy, universe, identification process, assessment methodology, and integration with strategy and planning cycles.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Risk Appetite & Tolerance</h3>
              <p className="text-gray-600">
                Risk appetite statements, tolerance thresholds, Key Risk Indicators (KRIs), escalation triggers, and monitoring frameworks.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Third-Party & Vendor Risk</h3>
              <p className="text-gray-600">
                Vendor risk assessment, due diligence questionnaires, criticality classification, ongoing monitoring, and contract governance.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Risk Reporting & Governance</h3>
              <p className="text-gray-600">
                Board risk dashboards, heat maps, risk register management, risk committee reporting, and escalation protocols.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Typical Deliverables
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            What you receive at the end of a risk engagement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              'Risk taxonomy & universe',
              'Risk appetite statement',
              'Risk register with scoring',
              'KRI dashboard & thresholds',
              'Risk assessment methodology',
              'Third-party risk assessment templates',
              'Vendor due diligence questionnaires',
              'Board risk reporting pack',
              'Risk governance operating procedures'
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

      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Risk Management That Drives Decisions?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request sample deliverables or a scoped plan for your risk management needs.
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

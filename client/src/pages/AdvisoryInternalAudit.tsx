import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function AdvisoryInternalAudit() {
  useSEO({
    title: 'Internal Audit Advisory | Aliph Solutions',
    description: 'Internal audit function setup, annual audit planning, risk-based methodologies, and co-sourcing for Saudi organizations—delivered with audit charters, plans, and execution support.',
    keywords: 'internal audit, audit advisory, audit planning, co-sourcing, risk-based audit, Saudi audit services',
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
              <Eye className="w-10 h-10 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">Advisory Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Internal Audit Advisory
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Build or scale your internal audit function—from setup to annual planning to co-sourced execution—with risk-based methodologies and governance alignment.
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
            What Internal Audit Advisory Covers
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Audit Function Setup</h3>
              <p className="text-gray-600">
                Audit charter, independence structure, reporting lines, resource planning, and audit committee governance integration.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Annual Audit Planning</h3>
              <p className="text-gray-600">
                Risk-based audit universe, audit plan prioritization, resource allocation, coverage analysis, and committee approval preparation.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Risk-Based Methodology</h3>
              <p className="text-gray-600">
                Audit approach, testing procedures, sampling techniques, risk assessment integration, and quality assurance frameworks.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Co-Sourcing & Managed Audit</h3>
              <p className="text-gray-600">
                Augment internal teams with specialized skills, execute specific audits, or manage full audit delivery under your governance.
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
            What you receive at the end of an internal audit engagement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              'Internal audit charter',
              'Audit universe & risk assessment',
              'Annual audit plan',
              'Audit methodology & procedures',
              'Audit program templates',
              'Audit reports & findings',
              'Issue tracking & follow-up framework',
              'Audit committee reporting packs',
              'Quality assurance & improvement plan'
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
            Ready to Build or Scale Your Audit Function?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request sample deliverables or a scoped plan for your internal audit needs.
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

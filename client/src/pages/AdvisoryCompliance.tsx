import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function AdvisoryCompliance() {
  useSEO({
    title: 'Compliance Advisory | Aliph Solutions',
    description: 'PDPL, NCA ECC, ZATCA compliance readiness and regulatory change management for Saudi organizations—delivered with gap analyses, policy suites, and evidence-ready documentation.',
    keywords: 'compliance advisory, PDPL, NCA ECC, ZATCA, regulatory compliance, Saudi compliance, compliance operating model',
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
              <CheckCircle2 className="w-10 h-10 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">Advisory Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Compliance Advisory
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Navigate PDPL, NCA ECC, ZATCA, and sector-specific regulations—with gap analyses, policy suites, evidence documentation, and compliance operating models.
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
            What Compliance Advisory Covers
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">PDPL Readiness</h3>
              <p className="text-gray-600">
                Gap analysis, privacy policy suite, data mapping, DPO framework, consent management, breach response, and evidence documentation.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">NCA ECC Readiness</h3>
              <p className="text-gray-600">
                Control mapping to ECC framework, evidence requirements, implementation roadmap, audit preparation, and control testing support.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">ZATCA Compliance Operations</h3>
              <p className="text-gray-600">
                E-invoicing readiness, process controls, record-keeping procedures, compliance cadence, and tax governance documentation.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Regulatory Change Management</h3>
              <p className="text-gray-600">
                Monitoring framework, impact assessment process, change implementation protocols, and stakeholder communication plans.
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
            What you receive at the end of a compliance engagement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              'Regulatory gap analysis',
              'Policy & procedure suites',
              'Control mapping & evidence checklists',
              'Implementation roadmap & milestones',
              'Training materials & awareness programs',
              'Compliance monitoring framework',
              'Audit preparation packs',
              'Regulatory change impact assessments',
              'Board compliance reporting'
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
            Ready to Achieve Compliance That Stands Up to Scrutiny?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request sample deliverables or a scoped plan for your compliance needs.
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

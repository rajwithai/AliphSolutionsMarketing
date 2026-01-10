import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, FileText, CheckCircle2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function ManagedGRCSupport() {
  useSEO({
    title: 'GRC Support Center | Managed Services | Aliph Solutions',
    description: 'Continuous GRC operations—compliance calendar, risk monitoring, evidence workflows, and board reporting. Governed execution for PDPL, NCA ECC, and enterprise governance.',
    keywords: 'GRC support center, managed GRC, compliance operations, risk operations, governance support, Saudi GRC',
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
              <span className="text-sm text-[#C9A227]">Managed Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              GRC Support Center
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Continuous governance, risk, and compliance operations—run through SOPs, evidence workflows, and reporting cadence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/managed-services'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                Request Proposal
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
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            What's Included
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Governed execution across compliance, risk, and governance functions
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              'Compliance calendar management & task scheduling',
              'Evidence capture workflows & tracker maintenance',
              'Risk register updates & KRI monitoring',
              'Issue & action tracking with escalation protocols',
              'Board & committee reporting support',
              'Policy lifecycle tracking & review coordination',
              'Audit coordination & evidence readiness',
              'Monthly status reports & dashboards'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Typical Monthly Outputs
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              'Compliance calendar with completion status',
              'Evidence readiness tracker',
              'Risk register & KRI dashboard',
              'Issues & actions log',
              'Board reporting pack',
              'Policy review status report'
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
            Ready to Operate GRC with Governance?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start with a 30-day pilot or request a managed proposal for your GRC operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/managed-services'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Request Proposal
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

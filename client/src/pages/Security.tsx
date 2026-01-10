import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, Lock, Eye, Database, FileCheck, GitBranch, AlertCircle, CheckCircle2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function Security() {
  useSEO({
    title: 'Security Statement | Aliph Solutions',
    description: 'Aliph Solutions security statement—how we approach data handling, access controls, auditability, and secure delivery patterns for Saudi GRC engagements.',
    keywords: 'Aliph security, data handling, access controls, audit logs, secure delivery, NDA, Saudi GRC security',
  });

  const principles = [
    { icon: <Database className="w-6 h-6" />, title: 'Data minimization', desc: 'Collect only what\'s required for scope' },
    { icon: <Lock className="w-6 h-6" />, title: 'Least privilege access', desc: 'Role-based access patterns' },
    { icon: <Shield className="w-6 h-6" />, title: 'Secure by default', desc: 'Delivery workflows built for control' },
    { icon: <Eye className="w-6 h-6" />, title: 'Traceability & versioning', desc: 'Change logs where applicable' },
    { icon: <GitBranch className="w-6 h-6" />, title: 'Environment separation', desc: 'Pattern-based boundaries' },
    { icon: <FileCheck className="w-6 h-6" />, title: 'Continuous improvement', desc: 'Regular reviews and updates' }
  ];

  const deliveryPatterns = [
    {
      title: 'Standard Secure Delivery',
      description: 'Controlled access to deliverables, versioned artifacts, role-based sharing',
      features: ['Secure document delivery', 'Versioning and change logs', 'Access controls']
    },
    {
      title: 'Private Environment Pattern',
      description: 'Engagement structured for stricter data boundaries and enhanced logging',
      features: ['Data boundary controls', 'Enhanced audit logging', 'Custom approval workflows']
    },
    {
      title: 'Edge / On-Prem Pattern',
      description: 'Use-case dependent deployment for highly sensitive or air-gapped environments',
      features: ['On-premise deployment options', 'Custom security posture', 'Full traceability']
    }
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Enterprise-ready</span>
              <span>•</span>
              <span>Sovereign-by-design</span>
              <span>•</span>
              <span>Auditability-first</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-10 h-10 text-[#C9A227]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Security Statement
              </h1>
            </div>

            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              This page summarizes how we approach secure delivery and controlled handling of information during advisory and managed engagements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/technology/security-sovereignty'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="security_speak_to_architect"
              >
                Speak to an Architect
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/technology/security-sovereignty#security-brief'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="security_request_brief"
              >
                Request Security Brief (PDF)
              </Button>
            </div>

            <div className="mt-6">
              <a
                href="/technology/security-sovereignty"
                className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
              >
                View full Security & Sovereignty page →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY PRINCIPLES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Our Security Principles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, idx) => (
              <Card
                key={idx}
                className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-4 text-[#C9A227] group-hover:bg-[#C9A227]/20 transition-colors">
                  {principle.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DATA HANDLING */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            How We Handle Data
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our approach to data handling during advisory and managed engagements
          </p>

          <Card className="max-w-4xl mx-auto p-8 border-2">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">We limit collection to what's required for scope.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">We structure engagements to respect sensitivity and classification.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">We avoid unnecessary replication of client information.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">We can work with redaction/masking patterns when needed.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">Where possible, we package outputs without including raw sensitive data.</span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-gray-50 border-l-4 border-[#C9A227] rounded">
              <p className="text-sm text-gray-700 italic">
                Specific handling details depend on the engagement model and your environment requirements.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/legal/privacy"
                className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
              >
                Privacy Policy
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="/company/contact"
                className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
              >
                Contact Us
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* ACCESS CONTROL & GOVERNANCE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Access Controls & Governance
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Access Patterns</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Role-based access patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Approval workflows (scope-dependent)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Controlled sharing of deliverables</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Optional NDA execution</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-2 bg-gradient-to-br from-[#C9A227]/5 to-white">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-[#C9A227]" />
                <h3 className="text-xl font-bold text-gray-900">NDA</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We can sign NDAs and structure secure distribution for samples and deliverables.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/company/contact'}
              >
                Request NDA
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* AUDITABILITY & EVIDENCE READINESS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Auditability & Evidence Readiness
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Built for audit-ready delivery and clear accountability
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 mb-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Versioned deliverables</p>
                    <p className="text-sm text-gray-600">Change tracking and version control where applicable</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Change logs for key artifacts</p>
                    <p className="text-sm text-gray-600">Documentation of material updates and revisions</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Ownership and accountability mapping</p>
                    <p className="text-sm text-gray-600">Clear assignment of deliverable ownership and review</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Evidence checklists and implementation roadmaps</p>
                    <p className="text-sm text-gray-600">Structured documentation for audit readiness</p>
                  </div>
                </li>
              </ul>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => window.location.href = '/deliverables'}
                className="bg-[#C9A227] hover:bg-[#B8921F]"
              >
                View Sample Deliverables
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY PATTERNS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Delivery Patterns
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Engagements can be structured to support stricter environments where required
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {deliveryPatterns.map((pattern, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pattern.title}</h3>
                <p className="text-gray-600 mb-6">{pattern.description}</p>
                <ul className="space-y-2">
                  {pattern.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Discuss the Right Pattern
            </Button>
          </div>
        </div>
      </section>

      {/* INCIDENT / ISSUE REPORTING */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-[#C9A227]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-[#C9A227]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Security Concerns or Reporting
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            If you believe you've identified a security issue related to an Aliph engagement or artifact, contact us.
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/company/contact'}
            className="bg-[#C9A227] hover:bg-[#B8921F]"
            data-cta="security_contact"
          >
            Contact Security
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you store client data?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We structure engagements to minimize data replication. Where context is required, we limit storage to what's necessary for delivery and can implement data retention and deletion policies aligned with your requirements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can you work under strict data requirements?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. Engagements can be structured with data boundary controls, enhanced logging, custom approval workflows, and deployment patterns designed for strict or air-gapped environments. We recommend discussing specific requirements with our architects.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you provide audit logs?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Audit logging capabilities depend on the engagement model and deployment pattern. For private environment and on-premise patterns, we can structure comprehensive audit logging. Standard engagements include versioning and change logs for deliverables.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can you sign an NDA?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. We routinely sign NDAs and can structure secure distribution and handling protocols for samples, deliverables, and engagement materials.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How are samples shared securely?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Sample deliverables are typically shared through controlled access mechanisms. For sensitive previews, we can implement password protection, time-limited access, or secure file transfer protocols based on your requirements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you minimize sensitive exposure?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Through data minimization, masking/redaction patterns where needed, separation of sensitive context from deliverable packaging, and controlled access patterns. Specific techniques depend on the engagement scope and can be structured during scoping.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a security walkthrough?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We can align delivery patterns to your environment and scope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Speak to an Architect
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/technology/security-sovereignty#security-brief'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Request Security Brief
            </Button>
          </div>
          <a
            href="/deliverables"
            className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
          >
            View Sample Deliverables →
          </a>
        </div>
      </section>
    </>
  );
}

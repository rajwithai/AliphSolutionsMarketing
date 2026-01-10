import { useState } from 'react';
import { Link } from 'wouter';
import useSEO from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Check, Shield, FileText, Users, Activity, Ticket, BarChart3, ChevronDown, ChevronUp, X, CheckCircle2 } from 'lucide-react';

export default function Integrations() {
  useSEO({
    title: 'Integrations | Aliph Solutions',
    description: 'Integration patterns for sovereign AI workflows and Saudi GRC delivery—document sources, identity, security tooling, ticketing, and reporting systems. Designed for auditability.',
    ogTitle: 'Integrations',
    ogDescription: 'Fit to your environment. Governed by design.',
  });

  const [showArchitectModal, setShowArchitectModal] = useState(false);
  const [architectSubmitted, setArchitectSubmitted] = useState(false);
  const [showBriefForm, setShowBriefForm] = useState(false);
  const [briefSubmitted, setBriefSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleArchitectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setArchitectSubmitted(true);
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBriefSubmitted(true);
  };

  const integrationCategories = [
    {
      icon: FileText,
      title: 'Document & Knowledge Repositories',
      examples: 'SharePoint, Microsoft 365, Google Drive, Confluence',
      enables: 'Controlled content retrieval, single source of truth',
      color: 'blue',
    },
    {
      icon: Users,
      title: 'Identity & Access Management (IAM)',
      examples: 'SSO/IdP patterns (Azure AD / Entra ID, Okta)',
      enables: 'Role-based access, least privilege patterns',
      color: 'purple',
    },
    {
      icon: Shield,
      title: 'Security & Monitoring',
      examples: 'SIEM patterns (Splunk, Sentinel), DLP patterns, endpoint controls',
      enables: 'Logging, monitoring, policy enforcement alignment',
      color: 'red',
    },
    {
      icon: Ticket,
      title: 'Ticketing & Workflow Systems',
      examples: 'ServiceNow, Jira',
      enables: 'Remediation tracking, evidence linkage, task ownership',
      color: 'green',
    },
    {
      icon: Activity,
      title: 'GRC / Risk Tooling',
      examples: 'GRC platforms, risk registers, control libraries',
      enables: 'Mapping, reporting, governance cadence',
      color: 'amber',
    },
    {
      icon: BarChart3,
      title: 'Reporting & Analytics',
      examples: 'Power BI, dashboards',
      enables: 'Readiness reporting, board-level summaries',
      color: 'indigo',
    },
  ];

  const faqs = [
    {
      q: 'Do you have a marketplace of connectors?',
      a: 'No. We work with integration patterns rather than pre-built connectors. Each integration is designed for your environment, security posture, and scope. This approach gives you more control and reduces risk.',
    },
    {
      q: 'Can you integrate with Microsoft 365/SharePoint?',
      a: 'Yes. We can design integration patterns for Microsoft 365, SharePoint, and other Microsoft services where read-only access to approved content repositories is required. The approach depends on your access policies and data classification.',
    },
    {
      q: 'Can we keep strict access boundaries?',
      a: 'Yes. Integration patterns are designed to preserve role-based access controls, minimize data movement, and avoid unnecessary replication. We recommend read-only ingestion from approved sources and controlled workflow handoffs.',
    },
    {
      q: 'Do you require moving data outside our environment?',
      a: 'Not necessarily. Integration patterns can be structured for on-premises or private cloud deployment where data sovereignty is required. See our Security & Sovereignty page for deployment options.',
    },
    {
      q: 'How long does an integration take?',
      a: 'It depends on environment complexity, access approval processes, and scope. Simple read-only integrations can be designed and approved within 2-4 weeks. More complex patterns may require 6-8 weeks including testing and validation.',
    },
    {
      q: 'What do we receive?',
      a: 'You receive an integration approach document, data boundary and access model, workflow handoff design, evidence linkage approach, and reporting model. Everything is designed for your specific environment and audit requirements.',
    },
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Environment-fit</span>
              <span>•</span>
              <span>Secure patterns</span>
              <span>•</span>
              <span>Audit-ready outputs</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Integrations
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
              Aliph workflows are designed to work with the tools you already use—through integration patterns that preserve control, access boundaries, and auditability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setShowArchitectModal(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="integrations_speak_to_architect"
              >
                Speak to an Architect
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowBriefForm(true)}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="integrations_request_brief"
              >
                Request Integration Brief (PDF)
              </Button>
            </div>

            <a
              href="/technology/security-sovereignty"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
            >
              Security & Sovereignty
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Integrations Matter */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why Integrations Matter
          </h2>

          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 text-lg text-gray-700 mb-12">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span>Reduce duplication and uncontrolled copies</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span>Preserve role-based access</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span>Ensure evidence and outputs are traceable</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span>Keep workflows aligned to real operational systems</span>
              </li>
            </ul>

            <Card className="bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white p-8 border-2 border-[#C9A227]">
              <p className="text-2xl font-bold text-center">
                "Integrations should reduce risk—not introduce it."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Patterns */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              How We Integrate (Patterns)
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Integration patterns depend on environment and scope. We design approaches that fit your security posture.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Read-only Ingestion</h3>
                <p className="text-slate-600 mb-4">
                  Controlled access to approved repositories, preserving source permissions and access boundaries.
                </p>
                <p className="text-sm text-slate-500 italic">
                  Depends on environment and scope
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Workflow Handoff</h3>
                <p className="text-slate-600 mb-4">
                  Outputs packaged into your governance and review process, with clear ownership and approval gates.
                </p>
                <p className="text-sm text-slate-500 italic">
                  Depends on environment and scope
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Evidence & Reporting</h3>
                <p className="text-slate-600 mb-4">
                  Evidence pack alignment with ticketing and audit routines, maintaining traceability throughout.
                </p>
                <p className="text-sm text-slate-500 italic">
                  Depends on environment and scope
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              Common Integration Categories
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Examples of integration patterns we support. Availability depends on engagement scope and environment.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrationCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="group bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-amber-500 hover:shadow-xl transition-all"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[category.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {category.title}
                    </h3>
                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Examples</div>
                        <div className="text-sm text-slate-700">{category.examples}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Enables</div>
                        <div className="text-sm text-slate-700">{category.enables}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      Available based on engagement
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              Integration Security Considerations
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Integration patterns are designed with security and auditability as primary requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <Shield className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Minimize Data Movement</h3>
                  <p className="text-slate-600 text-sm">
                    Read-only patterns where possible, avoiding unnecessary duplication or data transfer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <Shield className="text-amber-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Preserve Access Controls</h3>
                  <p className="text-slate-600 text-sm">
                    Integration patterns honor existing role-based access and least privilege models.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <Shield className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Log Actions & Outputs</h3>
                  <p className="text-slate-600 text-sm">
                    Where applicable, all access and processing events can be logged for audit review.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <Shield className="text-purple-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Avoid Unnecessary Replication</h3>
                  <p className="text-slate-600 text-sm">
                    Integration patterns focus on controlled ingestion and handoff, not full data mirroring.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/technology/security-sovereignty">
                <a className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold">
                  Read Security & Sovereignty
                  <ArrowRight size={20} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You Receive */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              What You Receive
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Integration engagements deliver tangible documentation and design artifacts.
            </p>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">Integration approach document</span>
                    <span className="text-slate-600"> — fit-to-environment design with recommended patterns</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">Data boundary and access model</span>
                    <span className="text-slate-600"> — high-level view of access controls and boundaries</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">Workflow handoff design</span>
                    <span className="text-slate-600"> — approvals, governance gates, and ownership model</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">Evidence linkage approach</span>
                    <span className="text-slate-600"> — audit readiness and traceability design</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">Reporting model</span>
                    <span className="text-slate-600"> — dashboards, cadence, and board-level summary formats</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setShowBriefForm(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105"
                data-cta="integrations_request_brief"
              >
                Request Integration Brief
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Want a fit-to-environment recommendation?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Speak to an architect and we'll recommend the right patterns for your security posture and scope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <button
                onClick={() => setShowArchitectModal(true)}
                className="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105"
                data-cta="integrations_speak_to_architect"
              >
                Speak to an Architect
                <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <Link href="/deliverables">
                <a className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-semibold transition-all backdrop-blur-sm">
                  Request Sample Deliverables
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 pr-8">{faq.q}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="text-amber-600 flex-shrink-0" size={24} />
                    ) : (
                      <ChevronDown className="text-slate-400 flex-shrink-0" size={24} />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architect Modal */}
      {showArchitectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Speak to an Architect</h3>
                <button
                  onClick={() => {
                    setShowArchitectModal(false);
                    setArchitectSubmitted(false);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              {!architectSubmitted ? (
                <form onSubmit={handleArchitectSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Role *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Environment Type
                    </label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                      <option value="">Select environment</option>
                      <option value="microsoft">Microsoft-centric</option>
                      <option value="google">Google-centric</option>
                      <option value="mixed">Mixed</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Primary Integration Need
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Describe your integration requirements or questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105"
                  >
                    Request Call
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-green-600" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Request Received</h4>
                  <p className="text-slate-600 mb-6">
                    An architect will reach out within 24 hours to schedule a call.
                  </p>
                  <button
                    onClick={() => {
                      setShowArchitectModal(false);
                      setArchitectSubmitted(false);
                    }}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Brief Form Modal */}
      {showBriefForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Request Integration Brief</h3>
                  <p className="text-slate-600 mt-2">
                    We'll share a concise PDF describing integration patterns and recommended designs based on your environment.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowBriefForm(false);
                    setBriefSubmitted(false);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              {!briefSubmitted ? (
                <form onSubmit={handleBriefSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Role *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Environment Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select environment</option>
                      <option value="microsoft">Microsoft-centric</option>
                      <option value="google">Google-centric</option>
                      <option value="mixed">Mixed</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Systems of Interest (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Docs', 'IAM', 'SIEM', 'Ticketing', 'Reporting', 'GRC tooling'].map((system) => (
                        <label key={system} className="flex items-center gap-2 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer">
                          <input type="checkbox" value={system.toLowerCase()} className="rounded text-amber-500 focus:ring-amber-500" />
                          <span className="text-sm text-slate-700">{system}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      NDA Required?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="nda" value="yes" className="text-amber-500 focus:ring-amber-500" />
                        <span className="text-sm text-slate-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="nda" value="no" defaultChecked className="text-amber-500 focus:ring-amber-500" />
                        <span className="text-sm text-slate-700">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Additional context or specific integration questions..."
                    />
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    We do not share or sell your data.
                  </p>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105"
                  >
                    Request Brief
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-green-600" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Request Received</h4>
                  <p className="text-slate-600 mb-6">
                    We'll share a secure link and offer an optional walkthrough within 24-48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setShowBriefForm(false);
                      setBriefSubmitted(false);
                    }}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

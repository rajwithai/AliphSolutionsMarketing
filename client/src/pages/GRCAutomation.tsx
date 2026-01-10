import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import useSEO from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Check, X, ChevronDown, ChevronUp, FileText, Activity, CheckCircle2, Loader2 } from 'lucide-react';

// Form validation schema
const demoFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required'),
  role: z.string().min(2, 'Role is required'),
  sector: z.string().min(1, 'Please select your sector'),
  primaryFocus: z.string().min(1, 'Please select a focus area'),
  timeline: z.string().min(1, 'Please select a timeline'),
  notes: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

export default function GRCAutomation() {
  useSEO({
    title: 'GRC Automation Workflows | Aliph Solutions',
    description: 'Governed GRC automation workflows for Saudi organizations—evidence-ready outputs, repeatable execution, and auditability for PDPL, NCA ECC, ZATCA, governance, ERM, and internal audit.',
    ogTitle: 'GRC Automation Workflows',
    ogDescription: 'Repeatable delivery. Evidence-ready outputs. Governed by design.',
  });

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    mode: 'onChange',
  });

  const sector = watch('sector');
  const primaryFocus = watch('primaryFocus');
  const timeline = watch('timeline');

  const onDemoSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: '',
        subject: `Workflow Demo Request - ${data.primaryFocus}`,
        message: `Role: ${data.role}\n` +
                 `Sector: ${data.sector || 'Not specified'}\n` +
                 `Primary Focus: ${data.primaryFocus}\n` +
                 `Timeline: ${data.timeline || 'Not specified'}\n\n` +
                 `Notes:\n${data.notes || 'None'}`,
        inquiryType: 'solution' as const,
        language: 'en',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const errorMessages = result.errors.map((err: any) => err.message).join(', ');
          setServerError(errorMessages);
        } else {
          setServerError(result.message || 'Failed to submit demo request. Please try again.');
        }
        return;
      }

      setDemoSubmitted(true);
      reset();
    } catch (error) {
      console.error('Demo form submission error:', error);
      setServerError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const workflows = [
    {
      name: 'PDPL Gap & Roadmap Workflow',
      input: 'Current data practices, PDPL obligations',
      output: 'Gap analysis, remediation roadmap with owners',
      usedFor: 'PDPL readiness assessments',
    },
    {
      name: 'NCA ECC Control Mapping Workflow',
      input: 'Current controls, NCA ECC framework',
      output: 'Control mapping, evidence requirements, gaps',
      usedFor: 'NCA ECC compliance programs',
    },
    {
      name: 'ZATCA Compliance Cadence Workflow',
      input: 'Tax processes, ZATCA requirements',
      output: 'Compliance tracker, periodic checklist',
      usedFor: 'Ongoing ZATCA compliance',
    },
    {
      name: 'Policy Suite Builder Workflow',
      input: 'Business context, obligations, templates',
      output: 'Contextualized policy suite with owners',
      usedFor: 'Policy framework creation',
    },
    {
      name: 'Evidence Pack Builder Workflow',
      input: 'Control requirements, existing documentation',
      output: 'Structured evidence pack with gaps flagged',
      usedFor: 'Audit preparation',
    },
    {
      name: 'Risk Register & KRI Builder Workflow',
      input: 'Risk taxonomy, business context',
      output: 'Risk register with KRIs and ownership',
      usedFor: 'ERM foundation',
    },
    {
      name: 'Internal Audit Annual Plan Workflow',
      input: 'Risk register, audit universe, resources',
      output: 'Risk-based annual audit plan',
      usedFor: 'Internal audit planning',
    },
    {
      name: 'Third-Party Risk Workflow',
      input: 'Vendor list, criticality, requirements',
      output: 'TPRM tracker, assessment templates',
      usedFor: 'Vendor risk management',
    },
    {
      name: 'Board Reporting Summary Workflow',
      input: 'Compliance data, risk updates, metrics',
      output: 'Executive summary with dashboard format',
      usedFor: 'Board and committee reporting',
    },
    {
      name: 'Remediation Plan Tracker Workflow',
      input: 'Audit findings, gap analysis results',
      output: 'Remediation plan with timelines and status',
      usedFor: 'Issue closure tracking',
    },
  ];

  const faqs = [
    {
      q: 'Is this a software platform?',
      a: 'Not in the traditional sense. We use workflows to accelerate delivery, but we deliver outputs (documents, trackers, evidence packs) rather than platform access. For organizations that want continuous execution, we can run workflows as a managed service.',
    },
    {
      q: 'Can we use workflows in strict environments?',
      a: 'Yes. Workflows can be structured to run on-premises or in private cloud environments, with full data sovereignty and auditability. See our Security & Sovereignty page for deployment patterns.',
    },
    {
      q: 'How do you ensure auditability?',
      a: 'Workflows produce versioned outputs with traceability. Every deliverable includes metadata: who approved it, when, what inputs were used, and what rules were applied. Audit trails are structured for compliance review.',
    },
    {
      q: 'What do we receive at the end?',
      a: 'You receive implementation-ready deliverables: policies with owners, trackers with timelines, evidence structures with checkpoints, and reporting formats. Everything is designed to be used immediately by your team.',
    },
    {
      q: 'Do workflows replace our team?',
      a: 'No. Workflows accelerate execution and standardize quality, but your team retains oversight, approval, and contextualization. Think of workflows as system-led delivery that amplifies your team\'s capacity.',
    },
    {
      q: 'How do we start?',
      a: 'Request a workflow demo to see how specific workflows apply to your context. You can start with sample outputs, run a pilot project, or engage us for advisory or managed services.',
    },
  ];

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
              <span>Repeatability</span>
              <span>•</span>
              <span>Auditability</span>
              <span>•</span>
              <span>Speed</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              GRC Automation Workflows
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
              We use governed workflows to compress manual GRC work—producing structured deliverables, trackers, evidence packs, and reporting formats faster, without sacrificing control.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="grc_workflows_request_demo"
              >
                Request Workflow Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/deliverables'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="grc_workflows_request_samples"
              >
                Request Sample Outputs
              </Button>
            </div>

            <a
              href="/technology/aliph-brain"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
            >
              See the Aliph Brain
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why GRC Delivery Gets Stuck
          </h2>

          <div className="max-w-4xl mx-auto">

            <ul className="space-y-4 text-lg text-gray-700 mb-12">
              <li className="flex items-start gap-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>Manual repetition across frameworks and policies</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>Control mapping done from scratch each time</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>Evidence collection happens late</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>Reporting cadence is inconsistent</span>
              </li>
            </ul>

            <Card className="bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white p-8 border-2 border-[#C9A227]">
              <p className="text-2xl font-bold text-center">
                "Workflows turn compliance into repeatable execution."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Mean by Workflows */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            What a Governed Workflow Is
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            A workflow is a repeatable module that takes inputs, applies governed processing rules, and produces structured outputs.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-2 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Inputs</h3>
              <p className="text-gray-700">
                Documents, obligations, current state, business context
              </p>
            </Card>

            <Card className="p-8 border-2 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Governed Processing</h3>
              <p className="text-gray-700">
                Policy rules, templates, consistency checks, validation logic
              </p>
            </Card>

            <Card className="p-8 border-2 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Outputs</h3>
              <p className="text-gray-700">
                Deliverables, trackers, evidence packs, reporting formats
              </p>
            </Card>
          </div>

          <Card className="p-6 border-2">
            <p className="text-gray-900 font-bold mb-3">What it is NOT:</p>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <span className="inline-flex items-center gap-2">
                <X size={18} className="text-red-500" />
                Not a public chatbot
              </span>
              <span className="inline-flex items-center gap-2">
                <X size={18} className="text-red-500" />
                Not uncontrolled automation
              </span>
              <span className="inline-flex items-center gap-2">
                <X size={18} className="text-red-500" />
                Not black-box outputs
              </span>
            </div>
          </Card>

          <div className="text-center mt-8">
            <a
              href="/technology/security-sovereignty"
              className="inline-flex items-center gap-1 text-[#C9A227] hover:text-[#B8921F] font-semibold"
            >
              Learn about Security & Sovereignty
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Workflow Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              Workflow Map (Simplified)
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Every workflow follows a governed execution path from intake to audit trail.
            </p>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 overflow-x-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 min-w-max">
                {/* Intake */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">Intake</div>
                    <div className="text-sm text-slate-600">
                      <div>• Requirements</div>
                      <div>• Context</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Classification */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">Classification</div>
                    <div className="text-sm text-slate-600">
                      <div>• Obligation type</div>
                      <div>• Scope</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Mapping */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">Mapping</div>
                    <div className="text-sm text-slate-600">
                      <div>• Control mapping</div>
                      <div>• Obligation mapping</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Drafting */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">Drafting</div>
                    <div className="text-sm text-slate-600">
                      <div>• Policy suite</div>
                      <div>• SOP drafts</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Validation */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">Validation</div>
                    <div className="text-sm text-slate-600">
                      <div>• Consistency checks</div>
                      <div>• Completeness</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Packaging */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">Packaging</div>
                    <div className="text-sm text-slate-600">
                      <div>• Evidence pack</div>
                      <div>• Ownership map</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Reporting */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">Reporting</div>
                    <div className="text-sm text-slate-600">
                      <div>• Board summary</div>
                      <div>• Dashboard format</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Audit Trail */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-amber-500 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="font-bold text-slate-900 mb-2">Audit Trail</div>
                    <div className="text-sm text-slate-600">
                      <div>• Versioning</div>
                      <div>• Traceability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Library */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              Examples of Workflows We Run
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Each workflow is designed for a specific GRC function and produces tangible outputs.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {workflows.map((workflow, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-amber-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                    {workflow.name}
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Input</div>
                      <div className="text-sm text-slate-700">{workflow.input}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Output</div>
                      <div className="text-sm text-slate-700">{workflow.output}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Used For</div>
                      <div className="text-sm text-slate-700">{workflow.usedFor}</div>
                    </div>
                  </div>

                  <Link href="/deliverables">
                    <a className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm">
                      See sample output
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outputs You Receive */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              Outputs You Actually Receive
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Every workflow produces implementation-ready outputs that your team can use immediately.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Deliverables</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>Policies, frameworks, operating model docs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>SOPs and process documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>Gap analyses and roadmaps</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-amber-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Trackers</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>Risk registers with KRIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>Compliance trackers with status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>Remediation plans with timelines</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Evidence Packs</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span>Audit checklists and evidence structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span>Control mappings with evidence requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span>Testing protocols and validation formats</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Reporting Formats</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="text-purple-500 flex-shrink-0 mt-1" size={18} />
                    <span>Monthly readiness packs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-purple-500 flex-shrink-0 mt-1" size={18} />
                    <span>Board and committee summaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-purple-500 flex-shrink-0 mt-1" size={18} />
                    <span>Dashboard formats with metrics</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-lg p-6 mb-8">
              <p className="text-slate-900 font-semibold text-center">
                Everything ships implementation-ready: owners, timelines, evidence checkpoints.
              </p>
            </div>

            <div className="text-center">
              <Link href="/deliverables">
                <a
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105"
                  data-cta="grc_workflows_request_samples"
                >
                  Request Sample Outputs
                  <ArrowRight size={20} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Where Workflows Fit */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              Where Workflows Fit
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Workflows power both advisory engagements and managed services—delivering system-led execution with expert oversight.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
                  Advisory
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Accelerate Assessment & Pack Creation</h3>
                <ul className="space-y-3 text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>Speed up gap analysis and roadmap creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>Standardize deliverable quality and structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>Reduce time from assessment to implementation pack</span>
                  </li>
                </ul>
                <Link href="/advisory">
                  <a className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                    Learn about Advisory
                    <ArrowRight size={20} />
                  </a>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold mb-6">
                  Managed Services
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Run Recurring Routines</h3>
                <ul className="space-y-3 text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>Execute periodic compliance routines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>Maintain trackers and evidence structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>Generate reporting cadence for board and committees</span>
                  </li>
                </ul>
                <Link href="/managed-services">
                  <a className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold">
                    Learn about Managed Services
                    <ArrowRight size={20} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control + Quality */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              Built for Quality, Not Just Speed
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              Workflows are governed by design—ensuring outputs are auditable, consistent, and implementation-ready.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Governed Templates & Structured Outputs</h3>
                  <p className="text-slate-600 text-sm">
                    Every output follows pre-approved formats with required sections, ownership fields, and metadata.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Consistency Checks</h3>
                  <p className="text-slate-600 text-sm">
                    Validation logic ensures outputs meet quality thresholds before they're delivered.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Expert Validation When Required</h3>
                  <p className="text-slate-600 text-sm">
                    Workflows can route outputs for expert review and approval before finalization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Traceability & Versioning Patterns</h3>
                  <p className="text-slate-600 text-sm">
                    Full audit trail of inputs, processing rules, approvals, and output versions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/technology/aliph-brain">
                <a className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all">
                  See the Aliph Brain
                  <ArrowRight size={20} />
                </a>
              </Link>
              <Link href="/technology/security-sovereignty">
                <a className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-900 hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition-all">
                  Security & Sovereignty
                  <ArrowRight size={20} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Turn compliance into repeatable execution.
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Request a workflow demo or start with sample outputs. For continuous readiness, start a 30-day managed pilot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                size="lg"
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="grc_workflows_request_demo"
              >
                Request Workflow Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/managed-services'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="grc_workflows_start_pilot"
              >
                Start a 30-Day Pilot
              </Button>
            </div>
            <a
              href="/deliverables"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
            >
              Request Sample Outputs
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#C9A227] hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Request Workflow Demo</DialogTitle>
            <DialogDescription>
              We'll share a demo agenda and confirm a time within 24 hours.
            </DialogDescription>
          </DialogHeader>

          {!demoSubmitted ? (
            <form onSubmit={handleSubmit(onDemoSubmit)} className="space-y-4">
              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{serverError}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={errors.name ? 'text-red-600' : ''}>
                    {errors.name ? errors.name.message : 'Name *'}
                  </Label>
                  <Input id="name" {...register('name')} className={errors.name ? 'border-red-500' : ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={errors.email ? 'text-red-600' : ''}>
                    {errors.email ? errors.email.message : 'Email *'}
                  </Label>
                  <Input id="email" type="email" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className={errors.company ? 'text-red-600' : ''}>
                    {errors.company ? errors.company.message : 'Company *'}
                  </Label>
                  <Input id="company" {...register('company')} className={errors.company ? 'border-red-500' : ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className={errors.role ? 'text-red-600' : ''}>
                    {errors.role ? errors.role.message : 'Role *'}
                  </Label>
                  <Input id="role" {...register('role')} className={errors.role ? 'border-red-500' : ''} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector" className={errors.sector ? 'text-red-600' : ''}>
                  {errors.sector ? errors.sector.message : 'Sector *'}
                </Label>
                <Select value={sector} onValueChange={(value) => setValue('sector', value, { shouldValidate: true })}>
                  <SelectTrigger className={errors.sector ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial Services</SelectItem>
                    <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="telecom">Telecom & Digital</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="retail">Retail & Consumer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryFocus" className={errors.primaryFocus ? 'text-red-600' : ''}>
                  {errors.primaryFocus ? errors.primaryFocus.message : 'Primary Focus Area *'}
                </Label>
                <Select value={primaryFocus} onValueChange={(value) => setValue('primaryFocus', value, { shouldValidate: true })}>
                  <SelectTrigger className={errors.primaryFocus ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdpl">PDPL Compliance</SelectItem>
                    <SelectItem value="nca">NCA ECC</SelectItem>
                    <SelectItem value="zatca">ZATCA Compliance</SelectItem>
                    <SelectItem value="governance">Corporate Governance</SelectItem>
                    <SelectItem value="erm">Enterprise Risk Management</SelectItem>
                    <SelectItem value="audit">Internal Audit</SelectItem>
                    <SelectItem value="ai_governance">AI Governance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className={errors.timeline ? 'text-red-600' : ''}>
                  {errors.timeline ? errors.timeline.message : 'Timeline *'}
                </Label>
                <Select value={timeline} onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}>
                  <SelectTrigger className={errors.timeline ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Immediate (next 2 weeks)</SelectItem>
                    <SelectItem value="30">Within 30 days</SelectItem>
                    <SelectItem value="90">Within 90 days</SelectItem>
                    <SelectItem value="exploratory">Exploratory</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  {...register('notes')}
                  placeholder="Tell us about your specific workflow needs or questions..."
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#C9A227] hover:bg-[#B8921F] disabled:opacity-50">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Request Demo'
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-900 mb-2">Request Received</h3>
              <p className="text-green-800">
                We'll share a demo agenda and confirm a time within 24 hours.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

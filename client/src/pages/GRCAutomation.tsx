import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
import i18n from '@/i18n/config';
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
const getDemoFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('grcAutomation.demoForm.validation.nameMin')),
  email: z.string().email(i18n.t('grcAutomation.demoForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('grcAutomation.demoForm.validation.companyMin')),
  role: z.string().min(2, i18n.t('grcAutomation.demoForm.validation.roleMin')),
  sector: z.string().min(1, i18n.t('grcAutomation.demoForm.validation.sectorRequired')),
  primaryFocus: z.string().min(1, i18n.t('grcAutomation.demoForm.validation.primaryFocusRequired')),
  timeline: z.string().min(1, i18n.t('grcAutomation.demoForm.validation.timelineRequired')),
  notes: z.string().optional(),
});

type DemoFormData = z.infer<ReturnType<typeof getDemoFormSchema>>;

export default function GRCAutomation() {
  const { t } = useTranslation();
  
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
    resolver: zodResolver(getDemoFormSchema()),
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

  const workflows = t('grcAutomation.workflowLibrary.workflows', { returnObjects: true }) as Array<{
    name: string;
    input: string;
    output: string;
    usedFor: string;
  }>;

  const faqs = [
    {
      q: t('grcAutomation.faq.q1'),
      a: t('grcAutomation.faq.a1'),
    },
    {
      q: t('grcAutomation.faq.q2'),
      a: t('grcAutomation.faq.a2'),
    },
    {
      q: t('grcAutomation.faq.q3'),
      a: t('grcAutomation.faq.a3'),
    },
    {
      q: t('grcAutomation.faq.q4'),
      a: t('grcAutomation.faq.a4'),
    },
    {
      q: t('grcAutomation.faq.q5'),
      a: t('grcAutomation.faq.a5'),
    },
    {
      q: t('grcAutomation.faq.q6'),
      a: t('grcAutomation.faq.a6'),
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
              <span>{t('grcAutomation.hero.badge1')}</span>
              <span>•</span>
              <span>{t('grcAutomation.hero.badge2')}</span>
              <span>•</span>
              <span>{t('grcAutomation.hero.badge3')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('grcAutomation.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
              {t('grcAutomation.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="grc_workflows_request_demo"
              >
                {t('grcAutomation.hero.ctaPrimary')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/deliverables'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="grc_workflows_request_samples"
              >
                {t('grcAutomation.hero.ctaSecondary')}
              </Button>
            </div>

            <a
              href="/technology/aliph-brain"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
            >
              {t('grcAutomation.hero.link')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('grcAutomation.problem.title')}
          </h2>

          <div className="max-w-4xl mx-auto">

            <ul className="space-y-4 text-lg text-gray-700 mb-12">
              <li className="flex items-start gap-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>{t('grcAutomation.problem.point1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>{t('grcAutomation.problem.point2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>{t('grcAutomation.problem.point3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>{t('grcAutomation.problem.point4')}</span>
              </li>
            </ul>

            <Card className="bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white p-8 border-2 border-[#C9A227]">
              <p className="text-2xl font-bold text-center">
                {t('grcAutomation.problem.quote')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Mean by Workflows */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('grcAutomation.workflow.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {t('grcAutomation.workflow.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-2 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('grcAutomation.workflow.step1Title')}</h3>
              <p className="text-gray-700">
                {t('grcAutomation.workflow.step1Desc')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('grcAutomation.workflow.step2Title')}</h3>
              <p className="text-gray-700">
                {t('grcAutomation.workflow.step2Desc')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('grcAutomation.workflow.step3Title')}</h3>
              <p className="text-gray-700">
                {t('grcAutomation.workflow.step3Desc')}
              </p>
            </Card>
          </div>

          <Card className="p-6 border-2">
            <p className="text-gray-900 font-bold mb-3">{t('grcAutomation.workflow.notTitle')}</p>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <span className="inline-flex items-center gap-2">
                <X size={18} className="text-red-500" />
                {t('grcAutomation.workflow.not1')}
              </span>
              <span className="inline-flex items-center gap-2">
                <X size={18} className="text-red-500" />
                {t('grcAutomation.workflow.not2')}
              </span>
              <span className="inline-flex items-center gap-2">
                <X size={18} className="text-red-500" />
                {t('grcAutomation.workflow.not3')}
              </span>
            </div>
          </Card>

          <div className="text-center mt-8">
            <a
              href="/technology/security-sovereignty"
              className="inline-flex items-center gap-1 text-[#C9A227] hover:text-[#B8921F] font-semibold"
            >
              {t('grcAutomation.workflow.link')}
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
              {t('grcAutomation.workflowMap.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('grcAutomation.workflowMap.subtitle')}
            </p>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 overflow-x-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 min-w-max">
                {/* Intake */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">{t('grcAutomation.workflowMap.intakeTitle')}</div>
                    <div className="text-sm text-slate-600">
                      <div>• {t('grcAutomation.workflowMap.intakeItem1')}</div>
                      <div>• {t('grcAutomation.workflowMap.intakeItem2')}</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Classification */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">{t('grcAutomation.workflowMap.classificationTitle')}</div>
                    <div className="text-sm text-slate-600">
                      <div>• {t('grcAutomation.workflowMap.classificationItem1')}</div>
                      <div>• {t('grcAutomation.workflowMap.classificationItem2')}</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Mapping */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">{t('grcAutomation.workflowMap.mappingTitle')}</div>
                    <div className="text-sm text-slate-600">
                      <div>• {t('grcAutomation.workflowMap.mappingItem1')}</div>
                      <div>• {t('grcAutomation.workflowMap.mappingItem2')}</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Drafting */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">{t('grcAutomation.workflowMap.draftingTitle')}</div>
                    <div className="text-sm text-slate-600">
                      <div>• {t('grcAutomation.workflowMap.draftingItem1')}</div>
                      <div>• {t('grcAutomation.workflowMap.draftingItem2')}</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Validation */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">{t('grcAutomation.workflowMap.validationTitle')}</div>
                    <div className="text-sm text-slate-600">
                      <div>• {t('grcAutomation.workflowMap.validationItem1')}</div>
                      <div>• {t('grcAutomation.workflowMap.validationItem2')}</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Packaging */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">{t('grcAutomation.workflowMap.packagingTitle')}</div>
                    <div className="text-sm text-slate-600">
                      <div>• {t('grcAutomation.workflowMap.packagingItem1')}</div>
                      <div>• {t('grcAutomation.workflowMap.packagingItem2')}</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Reporting */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:border-amber-500 transition-all hover:shadow-lg">
                    <div className="font-bold text-slate-900 mb-2">{t('grcAutomation.workflowMap.reportingTitle')}</div>
                    <div className="text-sm text-slate-600">
                      <div>• {t('grcAutomation.workflowMap.reportingItem1')}</div>
                      <div>• {t('grcAutomation.workflowMap.reportingItem2')}</div>
                    </div>
                  </div>
                </div>

                <ArrowRight className="text-slate-400 hidden md:block flex-shrink-0" />

                {/* Audit Trail */}
                <div className="group flex-shrink-0">
                  <div className="bg-white border-2 border-amber-500 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="font-bold text-slate-900 mb-2">{t('grcAutomation.workflowMap.auditTrailTitle')}</div>
                    <div className="text-sm text-slate-600">
                      <div>• {t('grcAutomation.workflowMap.auditTrailItem1')}</div>
                      <div>• {t('grcAutomation.workflowMap.auditTrailItem2')}</div>
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
              {t('grcAutomation.workflowLibrary.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('grcAutomation.workflowLibrary.subtitle')}
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
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('grcAutomation.workflowLibrary.inputLabel')}</div>
                      <div className="text-sm text-slate-700">{workflow.input}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('grcAutomation.workflowLibrary.outputLabel')}</div>
                      <div className="text-sm text-slate-700">{workflow.output}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('grcAutomation.workflowLibrary.usedForLabel')}</div>
                      <div className="text-sm text-slate-700">{workflow.usedFor}</div>
                    </div>
                  </div>

                  <Link href="/deliverables">
                    <a className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm">
                      {t('grcAutomation.workflowLibrary.sampleLink')}
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
              {t('grcAutomation.outputs.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('grcAutomation.outputs.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t('grcAutomation.outputs.deliverablesTitle')}</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.deliverablesItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.deliverablesItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.deliverablesItem3')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-amber-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t('grcAutomation.outputs.trackersTitle')}</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.trackersItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.trackersItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.trackersItem3')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t('grcAutomation.outputs.evidenceTitle')}</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.evidenceItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.evidenceItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.evidenceItem3')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t('grcAutomation.outputs.reportingTitle')}</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="text-purple-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.reportingItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-purple-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.reportingItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-purple-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.outputs.reportingItem3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-lg p-6 mb-8">
              <p className="text-slate-900 font-semibold text-center">
                {t('grcAutomation.outputs.callout')}
              </p>
            </div>

            <div className="text-center">
              <Link href="/deliverables">
                <a
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105"
                  data-cta="grc_workflows_request_samples"
                >
                  {t('grcAutomation.outputs.cta')}
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
              {t('grcAutomation.whereFit.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('grcAutomation.whereFit.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
                  {t('grcAutomation.whereFit.advisoryBadge')}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('grcAutomation.whereFit.advisoryTitle')}</h3>
                <ul className="space-y-3 text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.whereFit.advisoryItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.whereFit.advisoryItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.whereFit.advisoryItem3')}</span>
                  </li>
                </ul>
                <Link href="/advisory">
                  <a className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                    {t('grcAutomation.whereFit.advisoryLink')}
                    <ArrowRight size={20} />
                  </a>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold mb-6">
                  {t('grcAutomation.whereFit.managedBadge')}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('grcAutomation.whereFit.managedTitle')}</h3>
                <ul className="space-y-3 text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.whereFit.managedItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.whereFit.managedItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                    <span>{t('grcAutomation.whereFit.managedItem3')}</span>
                  </li>
                </ul>
                <Link href="/managed-services">
                  <a className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold">
                    {t('grcAutomation.whereFit.managedLink')}
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
              {t('grcAutomation.quality.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('grcAutomation.quality.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{t('grcAutomation.quality.feature1Title')}</h3>
                  <p className="text-slate-600 text-sm">
                    {t('grcAutomation.quality.feature1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{t('grcAutomation.quality.feature2Title')}</h3>
                  <p className="text-slate-600 text-sm">
                    {t('grcAutomation.quality.feature2Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{t('grcAutomation.quality.feature3Title')}</h3>
                  <p className="text-slate-600 text-sm">
                    {t('grcAutomation.quality.feature3Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{t('grcAutomation.quality.feature4Title')}</h3>
                  <p className="text-slate-600 text-sm">
                    {t('grcAutomation.quality.feature4Desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/technology/aliph-brain">
                <a className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all">
                  {t('grcAutomation.quality.cta1')}
                  <ArrowRight size={20} />
                </a>
              </Link>
              <Link href="/technology/security-sovereignty">
                <a className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-900 hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition-all">
                  {t('grcAutomation.quality.cta2')}
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
              {t('grcAutomation.ctaBand.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {t('grcAutomation.ctaBand.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                size="lg"
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="grc_workflows_request_demo"
              >
                {t('grcAutomation.ctaBand.cta1')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/managed-services'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="grc_workflows_start_pilot"
              >
                {t('grcAutomation.ctaBand.cta2')}
              </Button>
            </div>
            <a
              href="/deliverables"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
            >
              {t('grcAutomation.ctaBand.link')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('grcAutomation.faq.title')}
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
            <DialogTitle className="text-2xl">{t('grcAutomation.demoForm.title')}</DialogTitle>
            <DialogDescription>
              {t('grcAutomation.demoForm.description')}
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
                    {errors.name ? errors.name.message : t('grcAutomation.demoForm.nameLabel')}
                  </Label>
                  <Input id="name" {...register('name')} className={errors.name ? 'border-red-500' : ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={errors.email ? 'text-red-600' : ''}>
                    {errors.email ? errors.email.message : t('grcAutomation.demoForm.emailLabel')}
                  </Label>
                  <Input id="email" type="email" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className={errors.company ? 'text-red-600' : ''}>
                    {errors.company ? errors.company.message : t('grcAutomation.demoForm.companyLabel')}
                  </Label>
                  <Input id="company" {...register('company')} className={errors.company ? 'border-red-500' : ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className={errors.role ? 'text-red-600' : ''}>
                    {errors.role ? errors.role.message : t('grcAutomation.demoForm.roleLabel')}
                  </Label>
                  <Input id="role" {...register('role')} className={errors.role ? 'border-red-500' : ''} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector" className={errors.sector ? 'text-red-600' : ''}>
                  {errors.sector ? errors.sector.message : t('grcAutomation.demoForm.sectorLabel')}
                </Label>
                <Select value={sector} onValueChange={(value) => setValue('sector', value, { shouldValidate: true })}>
                  <SelectTrigger className={errors.sector ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('grcAutomation.demoForm.sectorPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">{t('grcAutomation.demoForm.sectorFinancial')}</SelectItem>
                    <SelectItem value="energy">{t('grcAutomation.demoForm.sectorEnergy')}</SelectItem>
                    <SelectItem value="healthcare">{t('grcAutomation.demoForm.sectorHealthcare')}</SelectItem>
                    <SelectItem value="telecom">{t('grcAutomation.demoForm.sectorTelecom')}</SelectItem>
                    <SelectItem value="government">{t('grcAutomation.demoForm.sectorGovernment')}</SelectItem>
                    <SelectItem value="retail">{t('grcAutomation.demoForm.sectorRetail')}</SelectItem>
                    <SelectItem value="other">{t('grcAutomation.demoForm.sectorOther')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryFocus" className={errors.primaryFocus ? 'text-red-600' : ''}>
                  {errors.primaryFocus ? errors.primaryFocus.message : t('grcAutomation.demoForm.focusLabel')}
                </Label>
                <Select value={primaryFocus} onValueChange={(value) => setValue('primaryFocus', value, { shouldValidate: true })}>
                  <SelectTrigger className={errors.primaryFocus ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('grcAutomation.demoForm.focusPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdpl">{t('grcAutomation.demoForm.focusPdpl')}</SelectItem>
                    <SelectItem value="nca">{t('grcAutomation.demoForm.focusNca')}</SelectItem>
                    <SelectItem value="zatca">{t('grcAutomation.demoForm.focusZatca')}</SelectItem>
                    <SelectItem value="governance">{t('grcAutomation.demoForm.focusGovernance')}</SelectItem>
                    <SelectItem value="erm">{t('grcAutomation.demoForm.focusErm')}</SelectItem>
                    <SelectItem value="audit">{t('grcAutomation.demoForm.focusAudit')}</SelectItem>
                    <SelectItem value="ai_governance">{t('grcAutomation.demoForm.focusAi')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className={errors.timeline ? 'text-red-600' : ''}>
                  {errors.timeline ? errors.timeline.message : t('grcAutomation.demoForm.timelineLabel')}
                </Label>
                <Select value={timeline} onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}>
                  <SelectTrigger className={errors.timeline ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('grcAutomation.demoForm.timelinePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">{t('grcAutomation.demoForm.timelineNow')}</SelectItem>
                    <SelectItem value="30">{t('grcAutomation.demoForm.timeline30')}</SelectItem>
                    <SelectItem value="90">{t('grcAutomation.demoForm.timeline90')}</SelectItem>
                    <SelectItem value="exploratory">{t('grcAutomation.demoForm.timelineExploratory')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t('grcAutomation.demoForm.notesLabel')}</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  {...register('notes')}
                  placeholder={t('grcAutomation.demoForm.notesPlaceholder')}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#C9A227] hover:bg-[#B8921F] disabled:opacity-50">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('grcAutomation.demoForm.submitting')}
                  </>
                ) : (
                  t('grcAutomation.demoForm.submitButton')
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-900 mb-2">{t('grcAutomation.demoForm.successTitle')}</h3>
              <p className="text-green-800">
                {t('grcAutomation.demoForm.successMessage')}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

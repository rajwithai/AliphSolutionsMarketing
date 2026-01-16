import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
import useSEO from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Check, Shield, FileText, Users, Activity, Ticket, BarChart3, ChevronDown, ChevronUp, X, CheckCircle2, Loader2 } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';
import i18n from '@/i18n/config';

const getArchitectFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('integrations.architectForm.validation.nameMin')).max(100),
  email: z.string().email(i18n.t('integrations.architectForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('integrations.architectForm.validation.companyMin')).max(100),
  role: z.string().min(2, i18n.t('integrations.architectForm.validation.roleMin')).max(100),
  environment: z.string().optional(),
  integrationNeed: z.string().max(1000).optional(),
});

const getBriefFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('integrations.briefForm.validation.nameMin')).max(100),
  email: z.string().email(i18n.t('integrations.briefForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('integrations.briefForm.validation.companyMin')).max(100),
  role: z.string().min(2, i18n.t('integrations.briefForm.validation.roleMin')).max(100),
  environment: z.string().min(1, i18n.t('integrations.briefForm.validation.environmentRequired')),
  systemsOfInterest: z.array(z.string()).optional(),
  ndaRequired: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

type ArchitectFormData = z.infer<ReturnType<typeof getArchitectFormSchema>>;
type BriefFormData = z.infer<ReturnType<typeof getBriefFormSchema>>;

export default function Integrations() {
  const { t } = useTranslation();
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
  const [isArchitectSubmitting, setIsArchitectSubmitting] = useState(false);
  const [architectServerError, setArchitectServerError] = useState('');
  const [isBriefSubmitting, setIsBriefSubmitting] = useState(false);
  const [briefServerError, setBriefServerError] = useState('');

  const architectForm = useForm<ArchitectFormData>({
    resolver: zodResolver(getArchitectFormSchema()),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      environment: '',
      integrationNeed: '',
    },
  });

  const briefForm = useForm<BriefFormData>({
    resolver: zodResolver(getBriefFormSchema()),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      environment: '',
      systemsOfInterest: [],
      ndaRequired: 'no',
      notes: '',
    },
  });

  const architectEnvironment = architectForm.watch('environment');
  const briefEnvironment = briefForm.watch('environment');
  const systemsOfInterest = briefForm.watch('systemsOfInterest') || [];

  const handleArchitectSubmit = async (data: ArchitectFormData) => {
    setIsArchitectSubmitting(true);
    setArchitectServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formType: 'Integration Architect Request',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setArchitectServerError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setArchitectSubmitted(true);
    } catch (error) {
      setArchitectServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsArchitectSubmitting(false);
    }
  };

  const handleBriefSubmit = async (data: BriefFormData) => {
    setIsBriefSubmitting(true);
    setBriefServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formType: 'Integration Brief Request',
          systemsOfInterest: data.systemsOfInterest?.join(', ') || '',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setBriefServerError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setBriefSubmitted(true);
    } catch (error) {
      setBriefServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsBriefSubmitting(false);
    }
  };

  const categoryData = t('integrations.categories.categories', { returnObjects: true }) as Array<{
    title: string;
    examples: string;
    enables: string;
  }>;

  const integrationCategories = [
    {
      icon: FileText,
      ...categoryData[0],
      color: 'blue',
    },
    {
      icon: Users,
      ...categoryData[1],
      color: 'purple',
    },
    {
      icon: Shield,
      ...categoryData[2],
      color: 'red',
    },
    {
      icon: Ticket,
      ...categoryData[3],
      color: 'green',
    },
    {
      icon: Activity,
      ...categoryData[4],
      color: 'amber',
    },
    {
      icon: BarChart3,
      ...categoryData[5],
      color: 'indigo',
    },
  ];

  const faqs = [
    {
      q: t('integrations.faq.q1'),
      a: t('integrations.faq.a1'),
    },
    {
      q: t('integrations.faq.q2'),
      a: t('integrations.faq.a2'),
    },
    {
      q: t('integrations.faq.q3'),
      a: t('integrations.faq.a3'),
    },
    {
      q: t('integrations.faq.q4'),
      a: t('integrations.faq.a4'),
    },
    {
      q: t('integrations.faq.q5'),
      a: t('integrations.faq.a5'),
    },
    {
      q: t('integrations.faq.q6'),
      a: t('integrations.faq.a6'),
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
      <SuccessModal
        open={architectSubmitted}
        onClose={() => {
          setArchitectSubmitted(false);
          setShowArchitectModal(false);
          architectForm.reset();
        }}
        title={t('integrations.architectForm.successTitle')}
        message={t('integrations.architectForm.successMessage')}
        buttonText={t('integrations.architectForm.successButton')}
      />

      <SuccessModal
        open={briefSubmitted}
        onClose={() => {
          setBriefSubmitted(false);
          setShowBriefForm(false);
          briefForm.reset();
        }}
        title={t('integrations.briefForm.successTitle')}
        message={t('integrations.briefForm.successMessage')}
        buttonText={t('integrations.briefForm.successButton')}
      />

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
              <span>{t('integrations.hero.badge1')}</span>
              <span>•</span>
              <span>{t('integrations.hero.badge2')}</span>
              <span>•</span>
              <span>{t('integrations.hero.badge3')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('integrations.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
              {t('integrations.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setShowArchitectModal(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="integrations_speak_to_architect"
              >
                {t('integrations.hero.ctaPrimary')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowBriefForm(true)}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="integrations_request_brief"
              >
                {t('integrations.hero.ctaSecondary')}
              </Button>
            </div>

            <a
              href="/technology/security-sovereignty"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
            >
              {t('integrations.hero.link')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Integrations Matter */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('integrations.whyMatter.title')}
          </h2>

          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 text-lg text-gray-700 mb-12">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span>{t('integrations.whyMatter.point1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span>{t('integrations.whyMatter.point2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span>{t('integrations.whyMatter.point3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span>{t('integrations.whyMatter.point4')}</span>
              </li>
            </ul>

            <Card className="bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white p-8 border-2 border-[#C9A227]">
              <p className="text-2xl font-bold text-center">
                {t('integrations.whyMatter.quote')}
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
              {t('integrations.patterns.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('integrations.patterns.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('integrations.patterns.pattern1Title')}</h3>
                <p className="text-slate-600 mb-4">
                  {t('integrations.patterns.pattern1Desc')}
                </p>
                <p className="text-sm text-slate-500 italic">
                  {t('integrations.patterns.depends')}
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('integrations.patterns.pattern2Title')}</h3>
                <p className="text-slate-600 mb-4">
                  {t('integrations.patterns.pattern2Desc')}
                </p>
                <p className="text-sm text-slate-500 italic">
                  {t('integrations.patterns.depends')}
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('integrations.patterns.pattern3Title')}</h3>
                <p className="text-slate-600 mb-4">
                  {t('integrations.patterns.pattern3Desc')}
                </p>
                <p className="text-sm text-slate-500 italic">
                  {t('integrations.patterns.depends')}
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
              {t('integrations.categories.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('integrations.categories.subtitle')}
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
                        <div className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('integrations.categories.examplesLabel')}</div>
                        <div className="text-sm text-slate-700">{category.examples}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('integrations.categories.enablesLabel')}</div>
                        <div className="text-sm text-slate-700">{category.enables}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      {t('integrations.categories.availability')}
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
              {t('integrations.security.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('integrations.security.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <Shield className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{t('integrations.security.feature1Title')}</h3>
                  <p className="text-slate-600 text-sm">
                    {t('integrations.security.feature1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <Shield className="text-amber-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{t('integrations.security.feature2Title')}</h3>
                  <p className="text-slate-600 text-sm">
                    {t('integrations.security.feature2Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <Shield className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{t('integrations.security.feature3Title')}</h3>
                  <p className="text-slate-600 text-sm">
                    {t('integrations.security.feature3Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <Shield className="text-purple-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{t('integrations.security.feature4Title')}</h3>
                  <p className="text-slate-600 text-sm">
                    {t('integrations.security.feature4Desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/technology/security-sovereignty">
                <a className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold">
                  {t('integrations.security.link')}
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
              {t('integrations.receive.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              {t('integrations.receive.subtitle')}
            </p>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">{t('integrations.receive.item1Title')}</span>
                    <span className="text-slate-600"> — {t('integrations.receive.item1Desc')}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">{t('integrations.receive.item2Title')}</span>
                    <span className="text-slate-600"> — {t('integrations.receive.item2Desc')}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">{t('integrations.receive.item3Title')}</span>
                    <span className="text-slate-600"> — {t('integrations.receive.item3Desc')}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">{t('integrations.receive.item4Title')}</span>
                    <span className="text-slate-600"> — {t('integrations.receive.item4Desc')}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-slate-900">{t('integrations.receive.item5Title')}</span>
                    <span className="text-slate-600"> — {t('integrations.receive.item5Desc')}</span>
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
                {t('integrations.receive.cta')}
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
              {t('integrations.ctaBand.title')}
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t('integrations.ctaBand.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <button
                onClick={() => setShowArchitectModal(true)}
                className="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105"
                data-cta="integrations_speak_to_architect"
              >
                {t('integrations.ctaBand.cta1')}
                <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <Link href="/deliverables">
                <a className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-semibold transition-all backdrop-blur-sm">
                  {t('integrations.ctaBand.cta2')}
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
              {t('integrations.faq.title')}
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
      {showArchitectModal && !architectSubmitted && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">{t('integrations.architectForm.title')}</h3>
                <button
                  onClick={() => {
                    setShowArchitectModal(false);
                    architectForm.reset();
                    setArchitectServerError('');
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={architectForm.handleSubmit(handleArchitectSubmit)} className="space-y-6">
                {architectServerError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-600">{architectServerError}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${architectForm.formState.errors.name ? 'text-red-600' : 'text-slate-700'}`}>
                      {architectForm.formState.errors.name ? architectForm.formState.errors.name.message : t('integrations.architectForm.nameLabel')}
                    </label>
                    <input
                      type="text"
                      {...architectForm.register('name')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${architectForm.formState.errors.name ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${architectForm.formState.errors.email ? 'text-red-600' : 'text-slate-700'}`}>
                      {architectForm.formState.errors.email ? architectForm.formState.errors.email.message : t('integrations.architectForm.emailLabel')}
                    </label>
                    <input
                      type="email"
                      {...architectForm.register('email')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${architectForm.formState.errors.email ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${architectForm.formState.errors.company ? 'text-red-600' : 'text-slate-700'}`}>
                      {architectForm.formState.errors.company ? architectForm.formState.errors.company.message : t('integrations.architectForm.companyLabel')}
                    </label>
                    <input
                      type="text"
                      {...architectForm.register('company')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${architectForm.formState.errors.company ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${architectForm.formState.errors.role ? 'text-red-600' : 'text-slate-700'}`}>
                      {architectForm.formState.errors.role ? architectForm.formState.errors.role.message : t('integrations.architectForm.roleLabel')}
                    </label>
                    <input
                      type="text"
                      {...architectForm.register('role')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${architectForm.formState.errors.role ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('integrations.architectForm.environmentLabel')}
                  </label>
                  <select 
                    {...architectForm.register('environment')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    value={architectEnvironment}
                    onChange={(e) => architectForm.setValue('environment', e.target.value)}
                  >
                    <option value="">{t('integrations.architectForm.environmentPlaceholder')}</option>
                    <option value="microsoft">{t('integrations.architectForm.environmentMicrosoft')}</option>
                    <option value="google">{t('integrations.architectForm.environmentGoogle')}</option>
                    <option value="mixed">{t('integrations.architectForm.environmentMixed')}</option>
                    <option value="other">{t('integrations.architectForm.environmentOther')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('integrations.architectForm.integrationNeedLabel')}
                  </label>
                  <textarea
                    rows={4}
                    {...architectForm.register('integrationNeed')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={t('integrations.architectForm.integrationNeedPlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isArchitectSubmitting}
                  className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isArchitectSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t('integrations.architectForm.submitting')}
                    </span>
                  ) : (
                    t('integrations.architectForm.submitButton')
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Brief Form Modal */}
      {showBriefForm && !briefSubmitted && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{t('integrations.briefForm.title')}</h3>
                  <p className="text-slate-600 mt-2">
                    {t('integrations.briefForm.description')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowBriefForm(false);
                    briefForm.reset();
                    setBriefServerError('');
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={briefForm.handleSubmit(handleBriefSubmit)} className="space-y-6">
                {briefServerError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-600">{briefServerError}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${briefForm.formState.errors.name ? 'text-red-600' : 'text-slate-700'}`}>
                      {briefForm.formState.errors.name ? briefForm.formState.errors.name.message : t('integrations.briefForm.nameLabel')}
                    </label>
                    <input
                      type="text"
                      {...briefForm.register('name')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${briefForm.formState.errors.name ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${briefForm.formState.errors.email ? 'text-red-600' : 'text-slate-700'}`}>
                      {briefForm.formState.errors.email ? briefForm.formState.errors.email.message : t('integrations.briefForm.emailLabel')}
                    </label>
                    <input
                      type="email"
                      {...briefForm.register('email')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${briefForm.formState.errors.email ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${briefForm.formState.errors.company ? 'text-red-600' : 'text-slate-700'}`}>
                      {briefForm.formState.errors.company ? briefForm.formState.errors.company.message : t('integrations.briefForm.companyLabel')}
                    </label>
                    <input
                      type="text"
                      {...briefForm.register('company')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${briefForm.formState.errors.company ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${briefForm.formState.errors.role ? 'text-red-600' : 'text-slate-700'}`}>
                      {briefForm.formState.errors.role ? briefForm.formState.errors.role.message : t('integrations.briefForm.roleLabel')}
                    </label>
                    <input
                      type="text"
                      {...briefForm.register('role')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${briefForm.formState.errors.role ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${briefForm.formState.errors.environment ? 'text-red-600' : 'text-slate-700'}`}>
                    {briefForm.formState.errors.environment ? briefForm.formState.errors.environment.message : t('integrations.briefForm.environmentLabel')}
                  </label>
                  <select
                    {...briefForm.register('environment')}
                    value={briefEnvironment}
                    onChange={(e) => briefForm.setValue('environment', e.target.value, { shouldValidate: true })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${briefForm.formState.errors.environment ? 'border-red-500' : 'border-slate-300'}`}
                  >
                    <option value="">{t('integrations.briefForm.environmentPlaceholder')}</option>
                    <option value="microsoft">{t('integrations.briefForm.environmentMicrosoft')}</option>
                    <option value="google">{t('integrations.briefForm.environmentGoogle')}</option>
                    <option value="mixed">{t('integrations.briefForm.environmentMixed')}</option>
                    <option value="other">{t('integrations.briefForm.environmentOther')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('integrations.briefForm.systemsLabel')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'docs', label: t('integrations.briefForm.systemDocs') },
                      { key: 'iam', label: t('integrations.briefForm.systemIAM') },
                      { key: 'siem', label: t('integrations.briefForm.systemSIEM') },
                      { key: 'ticketing', label: t('integrations.briefForm.systemTicketing') },
                      { key: 'reporting', label: t('integrations.briefForm.systemReporting') },
                      { key: 'grc tooling', label: t('integrations.briefForm.systemGRC') },
                    ].map((system) => (
                      <label key={system.key} className="flex items-center gap-2 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          value={system.key} 
                          checked={systemsOfInterest.includes(system.key)}
                          onChange={(e) => {
                            const newSystems = e.target.checked
                              ? [...systemsOfInterest, system.key]
                              : systemsOfInterest.filter(s => s !== system.key);
                            briefForm.setValue('systemsOfInterest', newSystems);
                          }}
                          className="rounded text-amber-500 focus:ring-amber-500" 
                        />
                        <span className="text-sm text-slate-700">{system.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('integrations.briefForm.ndaLabel')}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        {...briefForm.register('ndaRequired')}
                        value="yes" 
                        className="text-amber-500 focus:ring-amber-500" 
                      />
                      <span className="text-sm text-slate-700">{t('integrations.briefForm.ndaYes')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        {...briefForm.register('ndaRequired')}
                        value="no" 
                        defaultChecked 
                        className="text-amber-500 focus:ring-amber-500" 
                      />
                      <span className="text-sm text-slate-700">{t('integrations.briefForm.ndaNo')}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('integrations.briefForm.notesLabel')}
                  </label>
                  <textarea
                    rows={4}
                    {...briefForm.register('notes')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={t('integrations.briefForm.notesPlaceholder')}
                  />
                </div>

                <p className="text-xs text-slate-500 italic">
                  {t('integrations.briefForm.privacy')}
                </p>

                <button
                  type="submit"
                  disabled={isBriefSubmitting}
                  className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBriefSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t('integrations.briefForm.submitting')}
                    </span>
                  ) : (
                    t('integrations.briefForm.submitButton')
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

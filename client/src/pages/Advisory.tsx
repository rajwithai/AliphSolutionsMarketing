import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, FileText, CheckCircle2, ArrowRight, Building2, TrendingUp, Target, Brain, Eye, Workflow, BookOpen, Scale, Server, Zap, Lock, FileCheck, Users, Loader2 } from 'lucide-react';
import WhoWeServeCards from '@/components/WhoWeServeCards';
import SuccessModal from '@/components/SuccessModal';
import useSEO from '@/hooks/useSEO';

// Form validation schema
const advisoryFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required').max(200),
  role: z.string().min(2, 'Role is required').max(100),
  sector: z.string().min(1, 'Please select a sector'),
  focusAreas: z.array(z.string()).min(1, 'Please select at least one focus area'),
  regulations: z.array(z.string()).optional(),
  timeline: z.string().min(1, 'Please select a timeline'),
  notes: z.string().optional(),
});

type AdvisoryFormData = z.infer<typeof advisoryFormSchema>;

export default function Advisory() {
  const { t } = useTranslation();

  useSEO({
    title: 'Advisory Services | Aliph Solutions',
    description: 'Saudi-first governance, risk, compliance, internal audit, and AI governance advisory—delivered through governed workflows and expert validation. Audit-ready outcomes for PDPL, NCA ECC, ZATCA and enterprise readiness.',
    keywords: 'advisory services, Saudi compliance, GRC consulting, governance advisory, risk management, internal audit, AI governance, PDPL, NCA ECC, ZATCA',
  });

  const [scopeModalOpen, setScopeModalOpen] = useState(false);
  const [scopeSubmitted, setScopeSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AdvisoryFormData>({
    resolver: zodResolver(advisoryFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      sector: '',
      focusAreas: [],
      regulations: [],
      timeline: '',
      notes: '',
    },
  });

  const focusAreas = watch('focusAreas') || [];
  const regulations = watch('regulations') || [];
  const sector = watch('sector');
  const timeline = watch('timeline');

  const toggleFocusArea = (area: string) => {
    const currentAreas = focusAreas;
    const newAreas = currentAreas.includes(area)
      ? currentAreas.filter(a => a !== area)
      : [...currentAreas, area];
    setValue('focusAreas', newAreas, { shouldValidate: true });
  };

  const toggleRegulation = (reg: string) => {
    const currentRegs = regulations;
    const newRegs = currentRegs.includes(reg)
      ? currentRegs.filter(r => r !== reg)
      : [...currentRegs, reg];
    setValue('regulations', newRegs);
  };

  const onSubmit = async (data: AdvisoryFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: '',
        subject: `Advisory Scope Request - ${data.company}`,
        message: `Role: ${data.role}\n` +
          `Sector: ${data.sector}\n` +
          `Focus Areas: ${data.focusAreas.join(', ')}\n` +
          `Regulations: ${data.regulations?.join(', ') || 'N/A'}\n` +
          `Timeline: ${data.timeline}\n\n` +
          `Additional Notes:\n${data.notes || 'None'}`,
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
          setServerError(result.message || 'Failed to submit request. Please try again.');
        }
        return;
      }

      setScopeSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setServerError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SuccessModal
        open={scopeSubmitted}
        onClose={() => {
          setScopeSubmitted(false);
          setScopeModalOpen(false);
          reset();
        }}
        title={t('advisory.form.successTitle')}
        message={t('advisory.form.successMessage')}
        buttonText={t('advisory.form.successButton')}
      />

      {/* Request Scope Modal */}
      <Dialog open={scopeModalOpen && !scopeSubmitted} onOpenChange={(open) => {
        setScopeModalOpen(open);
        if (!open) {
          reset();
          setServerError(null);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('advisory.form.title')}</DialogTitle>
            <DialogDescription>
              {t('advisory.form.subtitle')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Server Error Display */}
            {serverError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{serverError}</p>
              </div>
            )}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scope-name" className={errors.name ? 'text-red-500' : ''}>
                    {errors.name ? errors.name.message : t('advisory.form.fullName')}
                  </Label>
                  <Input
                    id="scope-name"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scope-email" className={errors.email ? 'text-red-500' : ''}>
                    {errors.email ? errors.email.message : t('advisory.form.workEmail')}
                  </Label>
                  <Input
                    id="scope-email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scope-company" className={errors.company ? 'text-red-500' : ''}>
                    {errors.company ? errors.company.message : t('advisory.form.company')}
                  </Label>
                  <Input
                    id="scope-company"
                    {...register('company')}
                    className={errors.company ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scope-role" className={errors.role ? 'text-red-500' : ''}>
                    {errors.role ? errors.role.message : t('advisory.form.role')}
                  </Label>
                  <Input
                    id="scope-role"
                    {...register('role')}
                    className={errors.role ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope-sector" className={errors.sector ? 'text-red-500' : ''}>
                  {errors.sector ? errors.sector.message : t('advisory.form.sector')}
                </Label>
                <Select value={sector} onValueChange={(value) => setValue('sector', value, { shouldValidate: true })}>
                  <SelectTrigger id="scope-sector" className={errors.sector ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('advisory.form.sectorPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">{t('advisory.form.sectors.finance')}</SelectItem>
                    <SelectItem value="energy">{t('advisory.form.sectors.energy')}</SelectItem>
                    <SelectItem value="healthcare">{t('advisory.form.sectors.healthcare')}</SelectItem>
                    <SelectItem value="government">{t('advisory.form.sectors.government')}</SelectItem>
                    <SelectItem value="giga">{t('advisory.form.sectors.giga')}</SelectItem>
                    <SelectItem value="sme">{t('advisory.form.sectors.sme')}</SelectItem>
                    <SelectItem value="other">{t('advisory.form.sectors.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className={errors.focusAreas ? 'text-red-500' : ''}>
                  {errors.focusAreas ? errors.focusAreas.message : t('advisory.form.focusAreas')}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'Governance', key: 'governance' },
                    { value: 'Risk', key: 'risk' },
                    { value: 'Compliance', key: 'compliance' },
                    { value: 'Internal Audit', key: 'internalAudit' },
                    { value: 'AI Governance', key: 'aiGovernance' }
                  ].map((area) => (
                    <div key={area.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`focus-${area.value}`}
                        checked={focusAreas.includes(area.value)}
                        onCheckedChange={() => toggleFocusArea(area.value)}
                      />
                      <label htmlFor={`focus-${area.value}`} className="text-sm cursor-pointer">
                        {t(`advisory.form.focusOptions.${area.key}`)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('advisory.form.regulationFocus')}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['PDPL', 'NCA ECC', 'ZATCA', 'CMA', 'SAMA'].map((reg) => (
                    <div key={reg} className="flex items-center space-x-2">
                      <Checkbox
                        id={`reg-${reg}`}
                        checked={regulations.includes(reg)}
                        onCheckedChange={() => toggleRegulation(reg)}
                      />
                      <label htmlFor={`reg-${reg}`} className="text-sm cursor-pointer">
                        {reg}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope-timeline" className={errors.timeline ? 'text-red-500' : ''}>
                  {errors.timeline ? errors.timeline.message : t('advisory.form.timeline')}
                </Label>
                <Select value={timeline} onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}>
                  <SelectTrigger id="scope-timeline" className={errors.timeline ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('advisory.form.timelinePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">{t('advisory.form.timelines.now')}</SelectItem>
                    <SelectItem value="30">{t('advisory.form.timelines.30')}</SelectItem>
                    <SelectItem value="90">{t('advisory.form.timelines.90')}</SelectItem>
                    <SelectItem value="6months">{t('advisory.form.timelines.6months')}</SelectItem>
                    <SelectItem value="exploring">{t('advisory.form.timelines.exploring')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope-notes">{t('advisory.form.notes')}</Label>
                <Textarea
                  id="scope-notes"
                  rows={3}
                  {...register('notes')}
                  placeholder={t('advisory.form.notesPlaceholder')}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setScopeModalOpen(false)} className="flex-1" disabled={isSubmitting}>
                  {t('advisory.form.cancel')}
                </Button>
                <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('advisory.form.submitting')}
                    </>
                  ) : (
                    t('advisory.form.submit')
                  )}
                </Button>
              </div>
            </form>
        </DialogContent>
      </Dialog>

      {/* SECTION 1: HERO */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center bg-[#060910] text-white overflow-hidden pt-20 pb-16 md:pt-28"
      >
        {/* BACKGROUND VISUAL: ABSTRACT SAUDI SOVEREIGN GRID */}
        <HeroBackground />

        {/* CONTENT CONTAINER - CENTERED */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center mb-6 md:mb-8"
          >
            <span className="text-sm md:text-base font-semibold text-[#C9A227] tracking-[0.2em] mb-4 uppercase">
              {t('advisory.hero.brand')}
            </span>
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-2 md:mb-3 text-center">
              {t('advisory.hero.headline1')} <br />
              <span className="text-[#C9A227]">{t('advisory.hero.headline2')}</span>
            </span>
            <span className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-400 tracking-tight text-center mt-2">
              {t('advisory.hero.headline3')}
            </span>
          </motion.h1>

          {/* SUBHEADLINE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-gray-300/90 mb-8 leading-relaxed font-light max-w-4xl mx-auto"
          >
            <p className="mb-4">
              {t('advisory.hero.subheadline')}
            </p>
          </motion.div>

          {/* VALUE TRIAD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10 text-left"
          >
            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-lg backdrop-blur-sm">
              <div className="text-[#C9A227] font-bold text-lg mb-2">{t('advisory.hero.quality')}</div>
              <p className="text-sm text-gray-400">{t('advisory.hero.qualityDesc')}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-lg backdrop-blur-sm">
              <div className="text-[#C9A227] font-bold text-lg mb-2">{t('advisory.hero.speed')}</div>
              <p className="text-sm text-gray-400">{t('advisory.hero.speedDesc')}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-lg backdrop-blur-sm">
              <div className="text-[#C9A227] font-bold text-lg mb-2">{t('advisory.hero.precision')}</div>
              <p className="text-sm text-gray-400">{t('advisory.hero.precisionDesc')}</p>
            </div>
          </motion.div>

          {/* FOOTER LINE */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm md:text-base text-gray-400 font-medium relative z-10 text-center mb-8 max-w-3xl mx-auto"
          >
            {t('advisory.hero.footer1')}
          </motion.p>

          {/* CLOSING */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xs md:text-sm text-gray-500 italic relative z-10 text-center mb-10"
          >
            {t('advisory.hero.footer2')}
          </motion.p>


          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative z-20"
          >
            <Button
              size="lg"
              onClick={() => setScopeModalOpen(true)}
              className="h-14 px-10 bg-[#C9A227] hover:bg-[#B8921F] text-black font-semibold text-lg transition-all shadow-[0_0_30px_rgba(201,162,39,0.15)] hover:shadow-[0_0_40px_rgba(201,162,39,0.3)] hover:-translate-y-0.5 w-full sm:w-auto"
            >
              {t('advisory.hero.ctaDemo')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-8 bg-white/[0.02] border-white/20 hover:border-white/40 text-gray-200 hover:text-white hover:bg-white/5 text-lg font-medium transition-all w-full sm:w-auto"
            >
              {t('advisory.hero.ctaOutcomes')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: WHO WE SERVE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('advisory.whoWeServe.title')}
          </h2>

          <WhoWeServeCards setScopeModalOpen={setScopeModalOpen} />

          <div className="text-center">
            <Button
              onClick={() => setScopeModalOpen(true)}
              variant="outline"
              size="lg"
              data-cta="advisory_request_scope"
            >
              {t('advisory.whoWeServe.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUTCOMES WE DELIVER */}
      <section id="outcomes" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('advisory.outcomes.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-4">
            {t('advisory.outcomes.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-2 mb-16">
            <Shield className="w-5 h-5 text-[#C9A227]" />
            <p className="text-center text-gray-500 font-medium">{t('advisory.outcomes.vision2030')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'PDPL Readiness & Privacy Operating Model',
                outputs: 'Gap analysis, policy suite, DPO framework',
                bestFor: 'Data controllers, processors, e-commerce',
                link: '/deliverables'
              },
              {
                title: 'NCA ECC Readiness & Evidence Packs',
                outputs: 'Control mapping, evidence checklists, roadmap',
                bestFor: 'Critical infrastructure, government vendors',
                link: '/deliverables'
              },
              {
                title: 'ZATCA Compliance Operations',
                outputs: 'Process controls, operating cadence, records',
                bestFor: 'Tax-exposed entities, e-invoicing readiness',
                link: '/deliverables'
              },
              {
                title: 'Corporate Governance',
                outputs: 'DoA matrix, board charters, reporting framework',
                bestFor: 'Enterprises and listed entities preparing for CMA compliance and board-level oversight.',
                link: '/advisory/governance'
              },
              {
                title: 'ERM Foundation & Risk Reporting',
                outputs: 'Risk taxonomy, appetite, KRI dashboard',
                bestFor: 'Enterprises scaling risk management',
                link: '/advisory/risk'
              },
              {
                title: 'Internal Audit Enablement',
                outputs: 'Audit charter, annual plan, methodology',
                bestFor: 'Building or scaling audit function',
                link: '/advisory/internal-audit'
              },
              {
                title: 'Third-Party / Vendor Risk',
                outputs: 'Risk assessment, due diligence, monitoring',
                bestFor: 'Organizations with critical vendor dependencies',
                link: '/advisory/risk'
              },
              {
                title: 'AI Governance',
                outputs: 'Policy, approval framework, auditability structure',
                bestFor: 'Aliph Brain-powered policy and approval frameworks with unbreakable validation.',
                link: '/advisory/ai-governance'
              },
            ].map((outcome, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group">
                <h3 className="text-lg font-bold mb-3 text-gray-900">{outcome.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-600"><span className="font-semibold">{t('advisory.outcomes.typicalOutputs')}</span> {outcome.outputs}</p>
                  <p className="text-xs text-gray-600"><span className="font-semibold">{t('advisory.outcomes.bestFor')}</span> {outcome.bestFor}</p>
                </div>
                <a
                  href={outcome.link}
                  className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
                  data-cta="advisory_view_domain"
                >
                  {t('advisory.outcomes.explore')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICE DOMAINS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('advisory.domains.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Governance Advisory',
                icon: Scale,
                offerings: [
                  'Board & committee governance structure',
                  'Delegation of authority frameworks',
                  'Policy architecture & governance operating model'
                ],
                receives: ['Charters', 'DoA matrix', 'Reporting packs'],
                link: '/advisory/governance'
              },
              {
                title: 'Risk Management',
                icon: Shield,
                offerings: [
                  'Enterprise risk management (ERM) foundation',
                  'Risk appetite & tolerance frameworks',
                  'Third-party & vendor risk governance'
                ],
                receives: ['Risk taxonomy', 'KRI dashboards', 'Risk register'],
                link: '/advisory/risk'
              },
              {
                title: 'Compliance',
                icon: CheckCircle2,
                offerings: [
                  'PDPL, NCA ECC, ZATCA readiness',
                  'Regulatory change management',
                  'Compliance operating model & evidence'
                ],
                receives: ['Gap analyses', 'Policy suites', 'Roadmaps'],
                link: '/advisory/compliance'
              },
              {
                title: 'Internal Audit',
                icon: Eye,
                offerings: [
                  'Audit function setup & enablement',
                  'Annual audit planning & risk-based methodology',
                  'Co-sourcing & managed audit delivery'
                ],
                receives: ['Audit charter', 'Annual plan', 'Audit reports'],
                link: '/advisory/internal-audit'
              },
              {
                title: 'AI Governance',
                icon: Brain,
                offerings: [
                  'AI policy & approval frameworks',
                  'AI exposure & risk assessment',
                  'Auditability & transparency controls'
                ],
                receives: ['AI policy', 'Approval process', 'Risk register'],
                link: '/advisory/ai-governance'
              },
            ].map((domain, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
                <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                  <domain.icon className="w-8 h-8 text-[#C9A227]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{domain.title}</h3>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">{t('advisory.domains.keyOfferings')}</p>
                  <ul className="space-y-1">
                    {domain.offerings.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-700 mb-2">{t('advisory.domains.whatYouReceive')}</p>
                  <div className="flex flex-wrap gap-2">
                    {domain.receives.map((item, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item}</span>
                    ))}
                  </div>
                </div>

                <a
                  href={domain.link}
                  className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
                  data-cta="advisory_view_domain"
                >
                  {t('advisory.domains.viewDeliverables')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW WE DELIVER */}
      <section id="delivery-model" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('advisory.delivery.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-4xl mx-auto">
            {t('advisory.delivery.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('advisory.delivery.methodology')}</h3>
              <p className="text-gray-600">
                {t('advisory.delivery.methodologyDesc')}
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Workflow className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('advisory.delivery.workflows')}</h3>
              <p className="text-gray-600">
                {t('advisory.delivery.workflowsDesc')}
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('advisory.delivery.validation')}</h3>
              <p className="text-gray-600">
                {t('advisory.delivery.validationDesc')}
              </p>
            </Card>
          </div>

          {/* 5-step flow */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              {[
                { label: t('advisory.delivery.step1'), desc: t('advisory.delivery.step1Desc') },
                { label: t('advisory.delivery.step2'), desc: t('advisory.delivery.step2Desc') },
                { label: t('advisory.delivery.step3'), desc: t('advisory.delivery.step3Desc') },
                { label: t('advisory.delivery.step4'), desc: t('advisory.delivery.step4Desc') },
                { label: t('advisory.delivery.step5'), desc: t('advisory.delivery.step5Desc') },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#C9A227]/30 text-center hover:border-[#C9A227] transition-all">
                    <p className="text-sm font-bold text-gray-900 mb-1">{step.label}</p>
                    <p className="text-xs text-gray-600">{step.desc}</p>
                  </Card>
                  {idx < 4 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A227] z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/aliph-brain'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              {t('advisory.delivery.ctaBrain')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
            >
              {t('advisory.delivery.ctaSecurity')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 6: ENGAGEMENT MODES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('advisory.engagement.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="text-4xl font-bold text-[#C9A227] mb-3">01</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('advisory.engagement.mode1Title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('advisory.engagement.mode1Desc')}
              </p>
              <p className="text-xs text-gray-500 italic">
                {t('advisory.engagement.mode1Duration')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="text-4xl font-bold text-[#C9A227] mb-3">02</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('advisory.engagement.mode2Title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('advisory.engagement.mode2Desc')}
              </p>
              <p className="text-xs text-gray-500 italic">
                {t('advisory.engagement.mode2Duration')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="text-4xl font-bold text-[#C9A227] mb-3">03</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('advisory.engagement.mode3Title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('advisory.engagement.mode3Desc')}
              </p>
              <p className="text-xs text-gray-500 italic">
                {t('advisory.engagement.mode3Duration')}
              </p>
            </Card>
          </div>

          <p className="text-center text-gray-600 mb-8 italic">
            {t('advisory.engagement.footer')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setScopeModalOpen(true)}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              data-cta="advisory_request_scope"
            >
              {t('advisory.engagement.ctaScope')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
              data-cta="advisory_book_readiness_call"
            >
              {t('advisory.engagement.ctaCall')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: PROOF */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('advisory.proof.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">{t('advisory.proof.evidence')}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('advisory.proof.evidenceDesc')}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  {t('advisory.proof.viewSample')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">{t('advisory.proof.board')}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('advisory.proof.boardDesc')}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  {t('advisory.proof.viewSample')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">{t('advisory.proof.roadmap')}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('advisory.proof.roadmapDesc')}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  {t('advisory.proof.viewSample')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              data-cta="advisory_request_samples"
            >
              {t('advisory.proof.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('advisory.finalCTA.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('advisory.finalCTA.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setScopeModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              data-cta="advisory_request_scope"
            >
              {t('advisory.finalCTA.ctaScope')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/deliverables'}
              className="border-white/30 text-white hover:bg-white/10"
              data-cta="advisory_request_samples"
            >
              {t('advisory.finalCTA.ctaSamples')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('advisory.faq.title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('advisory.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('advisory.faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-support" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('advisory.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('advisory.faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-data" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('advisory.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('advisory.faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('advisory.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('advisory.faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('advisory.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('advisory.faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('advisory.faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('advisory.faq.a6')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

// --- Helper Components for Hero Background ---

function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div style={{ y: y1, opacity }} className="relative w-full h-full">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 via-transparent to-transparent" />

        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 100 50 L 50 100 L 0 50 Z" fill="none" stroke="#C9A227" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="1" fill="#C9A227" />
              <circle cx="0" cy="50" r="0.5" fill="#C9A227" />
              <circle cx="100" cy="50" r="0.5" fill="#C9A227" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-grid)" />
          <rect width="100%" height="100%" fill="url(#center-mask)" style={{ mixBlendMode: 'multiply' }} />
          <radialGradient id="center-mask" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" stopOpacity="0.8" />
            <stop offset="60%" stopColor="black" stopOpacity="0.4" />
            <stop offset="100%" stopColor="black" stopOpacity="0.0" />
          </radialGradient>
          <g filter="url(#glow)">
            <PulsingNode x="15%" y="25%" label="Governance" delay={0} />
            <PulsingNode x="85%" y="25%" label="Risk" delay={2} />
            <PulsingNode x="20%" y="70%" label="Compliance" delay={4} />
            <PulsingNode x="80%" y="70%" label="AI" delay={1} />
          </g>
        </svg>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#C9A227]/5 rounded-full blur-[100px]"
        />
      </motion.div>
    </div>
  );
}

function PulsingNode({ x, y, label, delay }: { x: string, y: string, label: string, delay: number }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r="3"
        fill="#C9A227"
        animate={{ r: [2, 4, 2], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: delay, ease: "easeInOut" }}
      />
      <motion.text
        x={x}
        y={y}
        dy="-18"
        textAnchor="middle"
        fill="#C9A227"
        fontSize="10"
        fontWeight="700"
        style={{ opacity: 0.2, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace' }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: delay }}
      >
        {label}
      </motion.text>
    </g>
  );
}

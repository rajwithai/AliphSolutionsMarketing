import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Brain, FileText, Shield, CheckCircle2, ArrowRight, Zap, Users, Database, Eye, Lock, AlertTriangle, Workflow, Building2, Loader2 } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';
import useSEO from '@/hooks/useSEO';
import i18n from '@/i18n/config';

// Demo form validation schema
const getDemoFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('aliphBrain.demoForm.validation.nameMin')).max(100),
  email: z.string().email(i18n.t('aliphBrain.demoForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('aliphBrain.demoForm.validation.companyRequired')).max(200),
  role: z.string().min(2, i18n.t('aliphBrain.demoForm.validation.roleRequired')).max(100),
  sector: z.string().min(1, i18n.t('aliphBrain.demoForm.validation.sectorRequired')),
  focus: z.string().min(1, i18n.t('aliphBrain.demoForm.validation.focusRequired')),
  timeline: z.string().min(1, i18n.t('aliphBrain.demoForm.validation.timelineRequired')),
  notes: z.string().optional(),
});

type DemoFormData = z.infer<ReturnType<typeof getDemoFormSchema>>;

export default function AliphBrain() {
  const { t } = useTranslation();

  useSEO({
    title: 'Aliph Brain | Saudi GRC Advisory Engine',
    description: 'The Aliph Brain is a sovereign-by-design workflow engine and organizational memory for Saudi GRC—turning PDPL, NCA ECC, ZATCA, and governance requirements into audit-ready deliverables with expert validation.',
    keywords: 'Aliph Brain, GRC automation, Saudi compliance, workflow engine, PDPL automation, regulatory technology, Saudi Arabia',
  });

  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const demoForm = useForm<DemoFormData>({
    resolver: zodResolver(getDemoFormSchema()),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      sector: '',
      focus: '',
      timeline: '',
      notes: '',
    },
  });

  const demoSector = demoForm.watch('sector');
  const demoFocus = demoForm.watch('focus');
  const demoTimeline = demoForm.watch('timeline');

  const onDemoSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: '',
        subject: `Aliph Brain Demo Request - ${data.company}`,
        message: `Role: ${data.role}\n` +
          `Sector: ${data.sector}\n` +
          `Focus Area: ${data.focus}\n` +
          `Timeline: ${data.timeline}\n\n` +
          `Additional Notes:\n${data.notes || 'None'}`,
        inquiryType: 'solution' as const,
        language: 'en',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || t('aliphBrain.demoForm.validation.submitError'));
        return;
      }

      setDemoSubmitted(true);
    } catch (error) {
      setServerError(t('aliphBrain.demoForm.validation.unexpectedError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SuccessModal
        open={demoSubmitted}
        onClose={() => {
          setDemoSubmitted(false);
          setDemoModalOpen(false);
          demoForm.reset();
        }}
        title={t('aliphBrain.demoForm.successTitle')}
        message={t('aliphBrain.demoForm.successMessage')}
        buttonText={t('aliphBrain.demoForm.successButton')}
      />

      {/* Demo Modal */}
      <Dialog open={demoModalOpen && !demoSubmitted} onOpenChange={(open) => {
        setDemoModalOpen(open);
        if (!open) {
          demoForm.reset();
          setServerError(null);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('aliphBrain.demoForm.modalTitle')}</DialogTitle>
            <DialogDescription>
              {t('aliphBrain.demoForm.modalDescription')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={demoForm.handleSubmit(onDemoSubmit)} className="space-y-4">
            {serverError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{serverError}</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demo-name" className={demoForm.formState.errors.name ? 'text-red-500' : ''}>
                  {demoForm.formState.errors.name ? demoForm.formState.errors.name.message : t('aliphBrain.demoForm.labelName')}
                </Label>
                <Input
                  id="demo-name"
                  {...demoForm.register('name')}
                  className={demoForm.formState.errors.name ? 'border-red-500' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-email" className={demoForm.formState.errors.email ? 'text-red-500' : ''}>
                  {demoForm.formState.errors.email ? demoForm.formState.errors.email.message : t('aliphBrain.demoForm.labelEmail')}
                </Label>
                <Input
                  id="demo-email"
                  type="email"
                  {...demoForm.register('email')}
                  className={demoForm.formState.errors.email ? 'border-red-500' : ''}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demo-company" className={demoForm.formState.errors.company ? 'text-red-500' : ''}>
                  {demoForm.formState.errors.company ? demoForm.formState.errors.company.message : t('aliphBrain.demoForm.labelCompany')}
                </Label>
                <Input
                  id="demo-company"
                  {...demoForm.register('company')}
                  className={demoForm.formState.errors.company ? 'border-red-500' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-role" className={demoForm.formState.errors.role ? 'text-red-500' : ''}>
                  {demoForm.formState.errors.role ? demoForm.formState.errors.role.message : t('aliphBrain.demoForm.labelRole')}
                </Label>
                <Input
                  id="demo-role"
                  {...demoForm.register('role')}
                  className={demoForm.formState.errors.role ? 'border-red-500' : ''}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demo-sector" className={demoForm.formState.errors.sector ? 'text-red-500' : ''}>
                  {demoForm.formState.errors.sector ? demoForm.formState.errors.sector.message : t('aliphBrain.demoForm.labelSector')}
                </Label>
                <Select value={demoSector} onValueChange={(value) => demoForm.setValue('sector', value, { shouldValidate: true })}>
                  <SelectTrigger id="demo-sector" className={demoForm.formState.errors.sector ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('aliphBrain.demoForm.placeholderSector')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">{t('aliphBrain.demoForm.sectors.finance')}</SelectItem>
                    <SelectItem value="energy">{t('aliphBrain.demoForm.sectors.energy')}</SelectItem>
                    <SelectItem value="healthcare">{t('aliphBrain.demoForm.sectors.healthcare')}</SelectItem>
                    <SelectItem value="government">{t('aliphBrain.demoForm.sectors.government')}</SelectItem>
                    <SelectItem value="giga">{t('aliphBrain.demoForm.sectors.giga')}</SelectItem>
                    <SelectItem value="sme">{t('aliphBrain.demoForm.sectors.sme')}</SelectItem>
                    <SelectItem value="other">{t('aliphBrain.demoForm.sectors.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-focus" className={demoForm.formState.errors.focus ? 'text-red-500' : ''}>
                  {demoForm.formState.errors.focus ? demoForm.formState.errors.focus.message : t('aliphBrain.demoForm.labelFocus')}
                </Label>
                <Select value={demoFocus} onValueChange={(value) => demoForm.setValue('focus', value, { shouldValidate: true })}>
                  <SelectTrigger id="demo-focus" className={demoForm.formState.errors.focus ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('aliphBrain.demoForm.placeholderFocus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdpl">{t('aliphBrain.demoForm.focusAreas.pdpl')}</SelectItem>
                    <SelectItem value="ncaEcc">{t('aliphBrain.demoForm.focusAreas.ncaEcc')}</SelectItem>
                    <SelectItem value="zatca">{t('aliphBrain.demoForm.focusAreas.zatca')}</SelectItem>
                    <SelectItem value="governance">{t('aliphBrain.demoForm.focusAreas.governance')}</SelectItem>
                    <SelectItem value="erm">{t('aliphBrain.demoForm.focusAreas.erm')}</SelectItem>
                    <SelectItem value="internalAudit">{t('aliphBrain.demoForm.focusAreas.internalAudit')}</SelectItem>
                    <SelectItem value="aiGovernance">{t('aliphBrain.demoForm.focusAreas.aiGovernance')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-timeline" className={demoForm.formState.errors.timeline ? 'text-red-500' : ''}>
                {demoForm.formState.errors.timeline ? demoForm.formState.errors.timeline.message : t('aliphBrain.demoForm.labelTimeline')}
              </Label>
              <Select value={demoTimeline} onValueChange={(value) => demoForm.setValue('timeline', value, { shouldValidate: true })}>
                <SelectTrigger id="demo-timeline" className={demoForm.formState.errors.timeline ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('aliphBrain.demoForm.placeholderTimeline')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">{t('aliphBrain.demoForm.timelines.now')}</SelectItem>
                  <SelectItem value="within30">{t('aliphBrain.demoForm.timelines.within30')}</SelectItem>
                  <SelectItem value="within90">{t('aliphBrain.demoForm.timelines.within90')}</SelectItem>
                  <SelectItem value="exploring">{t('aliphBrain.demoForm.timelines.exploring')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-notes">{t('aliphBrain.demoForm.labelNotes')}</Label>
              <Textarea
                id="demo-notes"
                rows={3}
                {...demoForm.register('notes')}
                placeholder={t('aliphBrain.demoForm.placeholderNotes')}
              />
            </div>

            <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setDemoModalOpen(false)} className="flex-1" disabled={isSubmitting}>
                  {t('aliphBrain.demoForm.btnCancel')}
                </Button>
                <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('aliphBrain.demoForm.btnSubmitting')}
                    </>
                  ) : (
                    t('aliphBrain.demoForm.btnSubmit')
                  )}
                </Button>
              </div>
            </form>
        </DialogContent>
      </Dialog>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>{t('aliphBrain.hero.badge1')}</span>
              <span>•</span>
              <span>{t('aliphBrain.hero.badge2')}</span>
              <span>•</span>
              <span>{t('aliphBrain.hero.badge3')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight flex items-center gap-4">
              <Brain className="w-16 h-16 md:w-20 md:h-20 text-[#C9A227]" />
              {t('aliphBrain.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              {t('aliphBrain.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setDemoModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="aliph_brain_request_demo"
              >
                {t('aliphBrain.hero.ctaPrimary')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/deliverables'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="aliph_brain_request_samples"
              >
                {t('aliphBrain.hero.ctaSecondary')}
              </Button>
            </div>

            <a
              href="/technology/security-sovereignty"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
              data-cta="aliph_brain_security_link"
            >
              <Shield className="w-4 h-4" />
              {t('aliphBrain.hero.securityLink')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Memory graph visual */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <circle cx="200" cy="150" r="60" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="100" cy="100" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="300" cy="100" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="100" cy="200" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="300" cy="200" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <line x1="130" y1="110" x2="165" y2="140" stroke="#C9A227" strokeWidth="1" />
            <line x1="270" y1="110" x2="235" y2="140" stroke="#C9A227" strokeWidth="1" />
            <line x1="130" y1="190" x2="165" y2="160" stroke="#C9A227" strokeWidth="1" />
            <line x1="270" y1="190" x2="235" y2="160" stroke="#C9A227" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('aliphBrain.problem.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-2 border-amber-200 bg-amber-50/50 hover:border-amber-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t('aliphBrain.problem.card1Title')}
              </h3>
              <p className="text-gray-600">
                {t('aliphBrain.problem.card1Text')}
              </p>
            </Card>

            <Card className="p-8 border-2 border-amber-200 bg-amber-50/50 hover:border-amber-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t('aliphBrain.problem.card2Title')}
              </h3>
              <p className="text-gray-600">
                {t('aliphBrain.problem.card2Text')}
              </p>
            </Card>

            <Card className="p-8 border-2 border-amber-200 bg-amber-50/50 hover:border-amber-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t('aliphBrain.problem.card3Title')}
              </h3>
              <p className="text-gray-600">
                {t('aliphBrain.problem.card3Text')}
              </p>
            </Card>
          </div>

          <p className="text-center text-xl text-gray-700 max-w-3xl mx-auto border-l-4 border-[#C9A227] pl-6 italic">
            {t('aliphBrain.problem.quote')}
          </p>
        </div>
      </section>

      {/* SECTION 3: WHAT IT IS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
            {t('aliphBrain.whatItIs.title')}
          </h2>

          <p className="text-2xl text-center text-gray-700 mb-16 max-w-4xl mx-auto font-medium">
            {t('aliphBrain.whatItIs.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Database className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('aliphBrain.whatItIs.card1Title')}</h3>
              <p className="text-gray-600">
                {t('aliphBrain.whatItIs.card1Text')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Workflow className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('aliphBrain.whatItIs.card2Title')}</h3>
              <p className="text-gray-600">
                {t('aliphBrain.whatItIs.card2Text')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('aliphBrain.whatItIs.card3Title')}</h3>
              <p className="text-gray-600">
                {t('aliphBrain.whatItIs.card3Text')}
              </p>
            </Card>
          </div>

          {/* What it is NOT */}
          <Card className="bg-red-50 border-2 border-red-200 p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              {t('aliphBrain.whatItIs.notTitle')}
            </h3>
            <ul className="space-y-2 text-red-800">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>{t('aliphBrain.whatItIs.notItem1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>{t('aliphBrain.whatItIs.notItem2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>{t('aliphBrain.whatItIs.notItem3')}</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('aliphBrain.howItWorks.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('aliphBrain.howItWorks.subtitle')}
          </p>

          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
              {Object.values(t('aliphBrain.howItWorks.steps', { returnObjects: true }) as Record<string, {label: string, desc: string}>).map((step, idx) => {
                const icons = [FileText, Database, Workflow, CheckCircle2, Users, FileText, Eye];
                const StepIcon = icons[idx];
                return (
                  <div key={idx} className="relative">
                    <Card className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#C9A227]/30 text-center hover:border-[#C9A227] transition-all">
                      <StepIcon className="w-6 h-6 mx-auto mb-2 text-[#C9A227]" />
                      <p className="text-xs font-bold text-gray-900 mb-1">{step.label}</p>
                      <p className="text-xs text-gray-600">{step.desc}</p>
                    </Card>
                    {idx < 6 && (
                      <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A227] z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Output formats */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{t('aliphBrain.howItWorks.outputsTitle')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2">
                <h4 className="font-bold text-gray-900 mb-3">{t('aliphBrain.howItWorks.documentationTitle')}</h4>
                <ul className="space-y-2 text-gray-600">
                  {(t('aliphBrain.howItWorks.documentationItems', { returnObjects: true }) as string[]).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </Card>
              <Card className="p-6 border-2">
                <h4 className="font-bold text-gray-900 mb-3">{t('aliphBrain.howItWorks.structuredTitle')}</h4>
                <ul className="space-y-2 text-gray-600">
                  {(t('aliphBrain.howItWorks.structuredItems', { returnObjects: true }) as string[]).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WORKFLOWS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('aliphBrain.workflows.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('aliphBrain.workflows.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t('aliphBrain.workflows.items', { returnObjects: true }) as Array<{title: string, inputs: string, output: string}>).map((workflow, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center mb-4">
                  <Workflow className="w-6 h-6 text-[#C9A227]" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{workflow.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-600"><span className="font-semibold">Inputs:</span> {workflow.inputs}</p>
                  <p className="text-xs text-gray-600"><span className="font-semibold">Output:</span> {workflow.output}</p>
                </div>
                <a
                  href="/deliverables"
                  className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
                >
                  {t('aliphBrain.workflows.sampleLink')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: DIFFERENTIATION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('aliphBrain.comparison.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Generic AI */}
            <Card className="p-8 bg-white border-2">
              <div className="text-center mb-4">
                <Zap className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">{t('aliphBrain.comparison.genericTitle')}</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {t('aliphBrain.comparison.genericItem1')}
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  {t('aliphBrain.comparison.genericItem2')}
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  {t('aliphBrain.comparison.genericItem3')}
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  {t('aliphBrain.comparison.genericItem4')}
                </li>
              </ul>
            </Card>

            {/* Traditional Consulting */}
            <Card className="p-8 bg-white border-2">
              <div className="text-center mb-4">
                <Building2 className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">{t('aliphBrain.comparison.traditionalTitle')}</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {t('aliphBrain.comparison.traditionalItem1')}
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  {t('aliphBrain.comparison.traditionalItem2')}
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  {t('aliphBrain.comparison.traditionalItem3')}
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  {t('aliphBrain.comparison.traditionalItem4')}
                </li>
              </ul>
            </Card>

            {/* Aliph Brain + Advisory */}
            <Card className="p-8 bg-gradient-to-br from-[#C9A227] to-[#B8921F] text-white border-2 border-[#C9A227] shadow-xl transform hover:scale-105 transition-all">
              <div className="text-center mb-4">
                <Brain className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold">{t('aliphBrain.comparison.aliphTitle')}</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('aliphBrain.comparison.aliphItem1')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('aliphBrain.comparison.aliphItem2')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('aliphBrain.comparison.aliphItem3')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('aliphBrain.comparison.aliphItem4')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('aliphBrain.comparison.aliphItem5')}
                </li>
              </ul>
            </Card>
          </div>

          <p className="text-center text-xl text-gray-700 max-w-3xl mx-auto font-medium italic">
            {t('aliphBrain.comparison.quote')}
          </p>
        </div>
      </section>

      {/* SECTION 7: SECURITY & SOVEREIGNTY */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('aliphBrain.security.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('aliphBrain.security.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {(t('aliphBrain.security.items', { returnObjects: true }) as string[]).map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              data-cta="aliph_brain_security_link"
            >
              {t('aliphBrain.security.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setDemoModalOpen(true)}
              data-cta="aliph_brain_speak_to_architect"
            >
              {t('aliphBrain.security.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8: DELIVERABLE PACKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('aliphBrain.packs.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('aliphBrain.packs.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {(t('aliphBrain.packs.items', { returnObjects: true }) as Array<{title: string, items: string[]}>).map((pack, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#C9A227]" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{pack.title}</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {pack.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              data-cta="aliph_brain_request_samples"
            >
              {t('aliphBrain.packs.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setDemoModalOpen(true)}
              data-cta="aliph_brain_request_demo"
            >
              {t('aliphBrain.packs.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9: DEMO CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('aliphBrain.demoCTA.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('aliphBrain.demoCTA.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              data-cta="aliph_brain_request_demo"
            >
              {t('aliphBrain.demoCTA.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('aliphBrain.demoCTA.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('aliphBrain.faq.title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aliphBrain.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aliphBrain.faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aliphBrain.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aliphBrain.faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aliphBrain.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aliphBrain.faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aliphBrain.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aliphBrain.faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aliphBrain.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aliphBrain.faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aliphBrain.faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aliphBrain.faq.a6')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

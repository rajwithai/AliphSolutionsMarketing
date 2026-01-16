import { useState } from 'react';
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
import { Shield, Lock, Eye, FileText, CheckCircle2, AlertTriangle, Database, Users, ArrowRight, Network, Server, Cloud, Loader2 } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';
import useSEO from '@/hooks/useSEO';
import i18n from '@/i18n/config';

// Architect form validation schema
const getArchitectFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('securitySovereignty.architectForm.validation.nameMin')).max(100),
  email: z.string().email(i18n.t('securitySovereignty.architectForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('securitySovereignty.architectForm.validation.companyRequired')).max(200),
  role: z.string().min(2, i18n.t('securitySovereignty.architectForm.validation.roleRequired')).max(100),
  environment: z.string().min(1, i18n.t('securitySovereignty.architectForm.validation.environmentRequired')),
  focus: z.string().min(1, i18n.t('securitySovereignty.architectForm.validation.focusRequired')),
  notes: z.string().optional(),
});

// Brief form validation schema
const getBriefFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('securitySovereignty.briefForm.validation.nameMin')).max(100),
  email: z.string().email(i18n.t('securitySovereignty.briefForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('securitySovereignty.briefForm.validation.companyRequired')).max(200),
  role: z.string().min(2, i18n.t('securitySovereignty.briefForm.validation.roleRequired')).max(100),
  sector: z.string().min(1, i18n.t('securitySovereignty.briefForm.validation.sectorRequired')),
  primaryInterest: z.string().min(1, i18n.t('securitySovereignty.briefForm.validation.interestRequired')),
  ndaNeeded: z.boolean(),
});

type ArchitectFormData = z.infer<ReturnType<typeof getArchitectFormSchema>>;
type BriefFormData = z.infer<ReturnType<typeof getBriefFormSchema>>;

export default function SecuritySovereignty() {
  const { t } = useTranslation();

  useSEO({
    title: 'Security & Sovereignty | Aliph Solutions',
    description: 'Sovereign-by-design AI workflows for Saudi GRC—data control, policy enforcement, audit logging, and deployment patterns for regulated environments.',
    keywords: 'sovereign AI, data sovereignty, security architecture, audit logging, PDPL compliance, Saudi Arabia AI governance',
  });

  const [architectModalOpen, setArchitectModalOpen] = useState(false);
  const [architectSubmitted, setArchitectSubmitted] = useState(false);
  const [briefSubmitted, setBriefSubmitted] = useState(false);
  const [isSubmittingArchitect, setIsSubmittingArchitect] = useState(false);
  const [isSubmittingBrief, setIsSubmittingBrief] = useState(false);
  const [architectError, setArchitectError] = useState<string | null>(null);
  const [briefError, setBriefError] = useState<string | null>(null);

  // Architect form
  const architectForm = useForm<ArchitectFormData>({
    resolver: zodResolver(getArchitectFormSchema()),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      environment: '',
      focus: '',
      notes: '',
    },
  });

  const architectEnvironment = architectForm.watch('environment');
  const architectFocus = architectForm.watch('focus');

  // Brief form
  const briefForm = useForm<BriefFormData>({
    resolver: zodResolver(getBriefFormSchema()),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      sector: '',
      primaryInterest: '',
      ndaNeeded: false,
    },
  });

  const briefSector = briefForm.watch('sector');
  const briefPrimaryInterest = briefForm.watch('primaryInterest');
  const briefNdaNeeded = briefForm.watch('ndaNeeded');

  const onArchitectSubmit = async (data: ArchitectFormData) => {
    setIsSubmittingArchitect(true);
    setArchitectError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: '',
        subject: `Architecture Call Request - ${data.company}`,
        message: `Role: ${data.role}\n` +
          `Environment: ${data.environment}\n` +
          `Focus Area: ${data.focus}\n\n` +
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
        setArchitectError(result.message || t('securitySovereignty.architectForm.validation.submitError'));
        return;
      }

      setArchitectSubmitted(true);
    } catch (error) {
      setArchitectError(t('securitySovereignty.architectForm.validation.unexpectedError'));
    } finally {
      setIsSubmittingArchitect(false);
    }
  };

  const onBriefSubmit = async (data: BriefFormData) => {
    setIsSubmittingBrief(true);
    setBriefError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: '',
        subject: `Security Brief Request - ${data.company}`,
        message: `Role: ${data.role}\n` +
          `Sector: ${data.sector}\n` +
          `Primary Interest: ${data.primaryInterest}\n` +
          `NDA Needed: ${data.ndaNeeded ? 'Yes' : 'No'}`,
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
        setBriefError(result.message || t('securitySovereignty.briefForm.validation.submitError'));
        return;
      }

      setBriefSubmitted(true);
    } catch (error) {
      setBriefError(t('securitySovereignty.briefForm.validation.unexpectedError'));
    } finally {
      setIsSubmittingBrief(false);
    }
  };

  return (
    <>
      <SuccessModal
        open={architectSubmitted}
        onClose={() => {
          setArchitectSubmitted(false);
          setArchitectModalOpen(false);
          architectForm.reset();
        }}
        title={t('securitySovereignty.architectForm.successTitle')}
        message={t('securitySovereignty.architectForm.successMessage')}
        buttonText={t('securitySovereignty.architectForm.successButton')}
      />

      <SuccessModal
        open={briefSubmitted}
        onClose={() => {
          setBriefSubmitted(false);
          briefForm.reset();
        }}
        title={t('securitySovereignty.briefForm.successTitle')}
        message={t('securitySovereignty.briefForm.successMessage')}
        buttonText={t('securitySovereignty.briefForm.successButton')}
      />

      {/* Architect Modal */}
      <Dialog open={architectModalOpen && !architectSubmitted} onOpenChange={(open) => {
        setArchitectModalOpen(open);
        if (!open) {
          architectForm.reset();
          setArchitectError(null);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('securitySovereignty.architectForm.modalTitle')}</DialogTitle>
            <DialogDescription>
              {t('securitySovereignty.architectForm.modalDescription')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={architectForm.handleSubmit(onArchitectSubmit)} className="space-y-4">
            {architectError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{architectError}</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arch-name" className={architectForm.formState.errors.name ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.name ? architectForm.formState.errors.name.message : t('securitySovereignty.architectForm.labelName')}
                </Label>
                <Input
                  id="arch-name"
                  {...architectForm.register('name')}
                  className={architectForm.formState.errors.name ? 'border-red-500' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arch-email" className={architectForm.formState.errors.email ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.email ? architectForm.formState.errors.email.message : t('securitySovereignty.architectForm.labelEmail')}
                </Label>
                <Input
                  id="arch-email"
                  type="email"
                  {...architectForm.register('email')}
                  className={architectForm.formState.errors.email ? 'border-red-500' : ''}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arch-company" className={architectForm.formState.errors.company ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.company ? architectForm.formState.errors.company.message : t('securitySovereignty.architectForm.labelCompany')}
                </Label>
                <Input
                  id="arch-company"
                  {...architectForm.register('company')}
                  className={architectForm.formState.errors.company ? 'border-red-500' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arch-role" className={architectForm.formState.errors.role ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.role ? architectForm.formState.errors.role.message : t('securitySovereignty.architectForm.labelRole')}
                </Label>
                <Input
                  id="arch-role"
                  {...architectForm.register('role')}
                  className={architectForm.formState.errors.role ? 'border-red-500' : ''}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arch-environment" className={architectForm.formState.errors.environment ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.environment ? architectForm.formState.errors.environment.message : t('securitySovereignty.architectForm.labelEnvironment')}
                </Label>
                <Select
                  value={architectEnvironment}
                  onValueChange={(value) => architectForm.setValue('environment', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="arch-environment" className={architectForm.formState.errors.environment ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('securitySovereignty.architectForm.placeholderEnvironment')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">{t('securitySovereignty.architectForm.environments.standard')}</SelectItem>
                    <SelectItem value="private">{t('securitySovereignty.architectForm.environments.private')}</SelectItem>
                    <SelectItem value="onPrem">{t('securitySovereignty.architectForm.environments.onPrem')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="arch-focus" className={architectForm.formState.errors.focus ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.focus ? architectForm.formState.errors.focus.message : t('securitySovereignty.architectForm.labelFocus')}
                </Label>
                <Select
                  value={architectFocus}
                  onValueChange={(value) => architectForm.setValue('focus', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="arch-focus" className={architectForm.formState.errors.focus ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('securitySovereignty.architectForm.placeholderFocus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aiGov">{t('securitySovereignty.architectForm.focusAreas.aiGov')}</SelectItem>
                    <SelectItem value="pdpl">{t('securitySovereignty.architectForm.focusAreas.pdpl')}</SelectItem>
                    <SelectItem value="nca">{t('securitySovereignty.architectForm.focusAreas.nca')}</SelectItem>
                    <SelectItem value="zatca">{t('securitySovereignty.architectForm.focusAreas.zatca')}</SelectItem>
                    <SelectItem value="other">{t('securitySovereignty.architectForm.focusAreas.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arch-notes">{t('securitySovereignty.architectForm.labelNotes')}</Label>
              <Textarea
                id="arch-notes"
                rows={3}
                {...architectForm.register('notes')}
                placeholder={t('securitySovereignty.architectForm.placeholderNotes')}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setArchitectModalOpen(false)} className="flex-1" disabled={isSubmittingArchitect}>
                {t('securitySovereignty.architectForm.btnCancel')}
              </Button>
              <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]" disabled={isSubmittingArchitect}>
                {isSubmittingArchitect ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('securitySovereignty.architectForm.btnSubmitting')}
                  </>
                ) : (
                  t('securitySovereignty.architectForm.btnSubmit')
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
              <span>{t('securitySovereignty.hero.badge1')}</span>
              <span>•</span>
              <span>{t('securitySovereignty.hero.badge2')}</span>
              <span>•</span>
              <span>{t('securitySovereignty.hero.badge3')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('securitySovereignty.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
              {t('securitySovereignty.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setArchitectModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="speak_to_architect"
              >
                {t('securitySovereignty.hero.ctaPrimary')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('brief-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="request_security_brief"
              >
                {t('securitySovereignty.hero.ctaSecondary')}
              </Button>
            </div>

            <a
              href="/deliverables"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
              data-cta="view_sample_deliverables"
            >
              {t('securitySovereignty.hero.ctaTertiary')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Minimalist node illustration */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <circle cx="100" cy="150" r="40" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="200" cy="100" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="300" cy="150" r="40" fill="none" stroke="#C9A227" strokeWidth="2" />
            <line x1="130" y1="140" x2="175" y2="110" stroke="#C9A227" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="225" y1="110" x2="270" y2="140" stroke="#C9A227" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: REALITY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
            {t('securitySovereignty.reality.title')}
          </h2>

          <div className="max-w-3xl mx-auto mb-12">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>{t('securitySovereignty.reality.point1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>{t('securitySovereignty.reality.point2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>{t('securitySovereignty.reality.point3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>{t('securitySovereignty.reality.point4')}</span>
              </li>
            </ul>
          </div>

          <Card className="bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white p-8 border-2 border-[#C9A227] max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <Shield className="w-12 h-12 text-[#C9A227] flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">{t('securitySovereignty.reality.cardTitle')}</h3>
                <p className="text-gray-300 text-lg">
                  {t('securitySovereignty.reality.cardText')}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 3: SOVEREIGN-BY-DESIGN PRINCIPLES */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('securitySovereignty.principles.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Database, key: 'dataMin' },
              { icon: Eye, key: 'privacy' },
              { icon: Lock, key: 'policy' },
              { icon: FileText, key: 'trace' },
              { icon: Network, key: 'separation' },
              { icon: Server, key: 'modelIndep' },
            ].map((principle, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
                <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C9A227]/20 transition-colors">
                  <principle.icon className="w-8 h-8 text-[#C9A227]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{t(`securitySovereignty.principles.items.${principle.key}.title`)}</h3>
                <p className="text-gray-600">{t(`securitySovereignty.principles.items.${principle.key}.description`)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ARCHITECTURE OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('securitySovereignty.architecture.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('securitySovereignty.architecture.subtitle')}
          </p>

          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-2 items-center">
              {[
                { key: 'client', icon: Users },
                { key: 'ingestion', icon: Database },
                { key: 'privacy', icon: Shield },
                { key: 'policy', icon: Lock },
                { key: 'workflow', icon: Network },
                { key: 'validation', icon: CheckCircle2 },
                { key: 'outputs', icon: FileText },
                { key: 'audit', icon: Eye },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#C9A227]/30 text-center hover:border-[#C9A227] transition-all">
                    <step.icon className="w-6 h-6 mx-auto mb-1 text-[#C9A227]" />
                    <p className="text-xs font-semibold text-gray-900">{t(`securitySovereignty.architecture.steps.${step.key}`)}</p>
                  </Card>
                  {idx < 7 && (
                    <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A227] z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('securitySovereignty.architecture.enablesTitle')}</h3>
              <ul className="space-y-3">
                {t('securitySovereignty.architecture.enables', { returnObjects: true }).map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('securitySovereignty.architecture.distinctionTitle')}</h3>
              <p className="text-gray-700">
                {t('securitySovereignty.architecture.distinctionText')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: DEPLOYMENT PATTERNS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('securitySovereignty.deployment.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('securitySovereignty.deployment.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Cloud className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('securitySovereignty.deployment.patternA.title')}</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• {t('securitySovereignty.deployment.patternA.item1')}</li>
                <li>• {t('securitySovereignty.deployment.patternA.item2')}</li>
                <li>• {t('securitySovereignty.deployment.patternA.item3')}</li>
                <li>• {t('securitySovereignty.deployment.patternA.item4')}</li>
              </ul>
              <p className="text-sm text-gray-600 italic">{t('securitySovereignty.deployment.patternA.bestFor')}</p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('securitySovereignty.deployment.patternB.title')}</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• {t('securitySovereignty.deployment.patternB.item1')}</li>
                <li>• {t('securitySovereignty.deployment.patternB.item2')}</li>
                <li>• {t('securitySovereignty.deployment.patternB.item3')}</li>
                <li>• {t('securitySovereignty.deployment.patternB.item4')}</li>
              </ul>
              <p className="text-sm text-gray-600 italic">{t('securitySovereignty.deployment.patternB.bestFor')}</p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('securitySovereignty.deployment.patternC.title')}</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• {t('securitySovereignty.deployment.patternC.item1')}</li>
                <li>• {t('securitySovereignty.deployment.patternC.item2')}</li>
                <li>• {t('securitySovereignty.deployment.patternC.item3')}</li>
                <li>• {t('securitySovereignty.deployment.patternC.item4')}</li>
              </ul>
              <p className="text-sm text-gray-600 italic">{t('securitySovereignty.deployment.patternC.bestFor')}</p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => setArchitectModalOpen(true)}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              data-cta="schedule_architecture_call"
            >
              {t('securitySovereignty.deployment.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 6: AUDITABILITY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('securitySovereignty.auditability.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('securitySovereignty.auditability.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              { key: 'logs' },
              { key: 'versioning' },
              { key: 'ownership' },
              { key: 'evidence' },
              { key: 'roadmap' },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center border-2 hover:border-[#C9A227] transition-all">
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#C9A227]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(`securitySovereignty.auditability.items.${item.key}.label`)}</h3>
                <p className="text-sm text-gray-600">{t(`securitySovereignty.auditability.items.${item.key}.description`)}</p>
              </Card>
            ))}
          </div>

          <Card className="bg-amber-50 border-2 border-amber-300 p-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 text-amber-700 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{t('securitySovereignty.auditability.cardTitle')}</h3>
                <p className="text-amber-800">
                  {t('securitySovereignty.auditability.cardText')}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 7: PRIVACY POSTURE */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('securitySovereignty.privacy.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('securitySovereignty.privacy.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {[
              { key: 'dataMin' },
              { key: 'accessCtrl' },
              { key: 'purpose' },
              { key: 'retention' },
              { key: 'secure' },
              { key: 'transparency' },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <h3 className="text-lg font-bold mb-2 text-gray-900">{t(`securitySovereignty.privacy.items.${item.key}.title`)}</h3>
                <p className="text-gray-600">{t(`securitySovereignty.privacy.items.${item.key}.description`)}</p>
              </Card>
            ))}
          </div>

          <div className="text-center space-x-4">
            <a href="/legal/privacy" className="text-[#C9A227] hover:text-[#B8921F] font-medium">
              {t('securitySovereignty.privacy.link1')}
            </a>
            <span className="text-gray-400">•</span>
            <a href="/security" className="text-[#C9A227] hover:text-[#B8921F] font-medium">
              {t('securitySovereignty.privacy.link2')}
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 8: REQUEST SECURITY BRIEF */}
      <section id="security-brief" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {t('securitySovereignty.briefForm.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('securitySovereignty.briefForm.subtitle')}
            </p>
          </div>

          <Card className="p-8 border-2">
            <form onSubmit={briefForm.handleSubmit(onBriefSubmit)} className="space-y-6" id="brief-form">
              {briefError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{briefError}</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brief-name" className={briefForm.formState.errors.name ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.name ? briefForm.formState.errors.name.message : t('securitySovereignty.briefForm.labelName')}
                  </Label>
                  <Input
                    id="brief-name"
                    {...briefForm.register('name')}
                    className={briefForm.formState.errors.name ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brief-email" className={briefForm.formState.errors.email ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.email ? briefForm.formState.errors.email.message : t('securitySovereignty.briefForm.labelEmail')}
                  </Label>
                  <Input
                    id="brief-email"
                    type="email"
                    {...briefForm.register('email')}
                    className={briefForm.formState.errors.email ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brief-company" className={briefForm.formState.errors.company ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.company ? briefForm.formState.errors.company.message : t('securitySovereignty.briefForm.labelCompany')}
                  </Label>
                  <Input
                    id="brief-company"
                    {...briefForm.register('company')}
                    className={briefForm.formState.errors.company ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brief-role" className={briefForm.formState.errors.role ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.role ? briefForm.formState.errors.role.message : t('securitySovereignty.briefForm.labelRole')}
                  </Label>
                  <Input
                    id="brief-role"
                    {...briefForm.register('role')}
                    className={briefForm.formState.errors.role ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brief-sector" className={briefForm.formState.errors.sector ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.sector ? briefForm.formState.errors.sector.message : t('securitySovereignty.briefForm.labelSector')}
                  </Label>
                  <Select value={briefSector} onValueChange={(value) => briefForm.setValue('sector', value, { shouldValidate: true })}>
                    <SelectTrigger id="brief-sector" className={briefForm.formState.errors.sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder={t('securitySovereignty.briefForm.placeholderSector')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">{t('securitySovereignty.briefForm.sectors.finance')}</SelectItem>
                      <SelectItem value="energy">{t('securitySovereignty.briefForm.sectors.energy')}</SelectItem>
                      <SelectItem value="healthcare">{t('securitySovereignty.briefForm.sectors.healthcare')}</SelectItem>
                      <SelectItem value="government">{t('securitySovereignty.briefForm.sectors.government')}</SelectItem>
                      <SelectItem value="giga">{t('securitySovereignty.briefForm.sectors.giga')}</SelectItem>
                      <SelectItem value="other">{t('securitySovereignty.briefForm.sectors.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brief-interest" className={briefForm.formState.errors.primaryInterest ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.primaryInterest ? briefForm.formState.errors.primaryInterest.message : t('securitySovereignty.briefForm.labelInterest')}
                  </Label>
                  <Select value={briefPrimaryInterest} onValueChange={(value) => briefForm.setValue('primaryInterest', value, { shouldValidate: true })}>
                    <SelectTrigger id="brief-interest" className={briefForm.formState.errors.primaryInterest ? 'border-red-500' : ''}>
                      <SelectValue placeholder={t('securitySovereignty.briefForm.placeholderInterest')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="architecture">{t('securitySovereignty.briefForm.interests.architecture')}</SelectItem>
                      <SelectItem value="deployment">{t('securitySovereignty.briefForm.interests.deployment')}</SelectItem>
                      <SelectItem value="compliance">{t('securitySovereignty.briefForm.interests.compliance')}</SelectItem>
                      <SelectItem value="privacy">{t('securitySovereignty.briefForm.interests.privacy')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="brief-nda"
                  checked={briefNdaNeeded}
                  onCheckedChange={(checked) => briefForm.setValue('ndaNeeded', checked as boolean)}
                />
                <label htmlFor="brief-nda" className="text-sm cursor-pointer">{t('securitySovereignty.briefForm.ndaLabel')}</label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D] text-lg"
                data-cta="request_security_brief"
                disabled={isSubmittingBrief}
              >
                {isSubmittingBrief ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('securitySovereignty.briefForm.btnSubmitting')}
                  </>
                ) : (
                  t('securitySovereignty.briefForm.btnSubmit')
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                {t('securitySovereignty.briefForm.disclaimer')}
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* SECTION 9: ARCHITECT CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('securitySovereignty.architectCTA.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('securitySovereignty.architectCTA.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setArchitectModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              data-cta="schedule_architecture_call"
            >
              {t('securitySovereignty.architectCTA.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/deliverables'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('securitySovereignty.architectCTA.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('securitySovereignty.faq.title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('securitySovereignty.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('securitySovereignty.faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('securitySovereignty.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('securitySovereignty.faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('securitySovereignty.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('securitySovereignty.faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('securitySovereignty.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('securitySovereignty.faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('securitySovereignty.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('securitySovereignty.faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('securitySovereignty.faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('securitySovereignty.faq.a6')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

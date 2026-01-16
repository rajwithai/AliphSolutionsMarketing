import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye, Shield, FileText, CheckCircle2, AlertTriangle, ArrowRight, Lock, Users, Zap, Loader2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import SuccessModal from '@/components/SuccessModal';
import i18n from '@/i18n/config';

const getDemoFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('aiGovernance.demoForm.validation.nameMin')).max(100),
  email: z.string().email(i18n.t('aiGovernance.demoForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('aiGovernance.demoForm.validation.companyMin')).max(100),
  role: z.string().min(2, i18n.t('aiGovernance.demoForm.validation.roleMin')).max(100),
  sector: z.string().min(1, i18n.t('aiGovernance.demoForm.validation.sectorRequired')),
  currentStatus: z.string().optional(),
  primaryConcern: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

type DemoFormData = z.infer<ReturnType<typeof getDemoFormSchema>>;

export default function AIGovernance() {
  const { t } = useTranslation();
  
  useSEO({
    title: 'AI Governance | Aliph Solutions',
    description: 'Governed AI adoption for Saudi organizations—policies, operating model, controls, auditability, and safe workflows aligned to PDPL-era expectations.',
    keywords: 'AI governance, governed AI, AI policy, AI controls, AI audit, PDPL AI, Saudi AI governance',
  });

  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const demoForm = useForm<DemoFormData>({
    resolver: zodResolver(getDemoFormSchema()),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      sector: '',
      currentStatus: '',
      primaryConcern: '',
      timeline: '',
      notes: '',
    },
  });

  const demoSector = demoForm.watch('sector');
  const demoStatus = demoForm.watch('currentStatus');
  const demoConcern = demoForm.watch('primaryConcern');
  const demoTimeline = demoForm.watch('timeline');

  const handleDemoSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formType: 'AI Governance Demo Request',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setDemoSubmitted(true);
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pillars = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: t('aiGovernance.pillars.pillar1Title'),
      description: t('aiGovernance.pillars.pillar1Desc')
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: t('aiGovernance.pillars.pillar2Title'),
      description: t('aiGovernance.pillars.pillar2Desc')
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: t('aiGovernance.pillars.pillar3Title'),
      description: t('aiGovernance.pillars.pillar3Desc')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('aiGovernance.pillars.pillar4Title'),
      description: t('aiGovernance.pillars.pillar4Desc')
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('aiGovernance.pillars.pillar5Title'),
      description: t('aiGovernance.pillars.pillar5Desc')
    }
  ];

  const operatingRoles = [
    { role: t('aiGovernance.operatingModel.role1'), responsibility: t('aiGovernance.operatingModel.responsibility1') },
    { role: t('aiGovernance.operatingModel.role2'), responsibility: t('aiGovernance.operatingModel.responsibility2') },
    { role: t('aiGovernance.operatingModel.role3'), responsibility: t('aiGovernance.operatingModel.responsibility3') },
    { role: t('aiGovernance.operatingModel.role4'), responsibility: t('aiGovernance.operatingModel.responsibility4') },
    { role: t('aiGovernance.operatingModel.role5'), responsibility: t('aiGovernance.operatingModel.responsibility5') },
    { role: t('aiGovernance.operatingModel.role6'), responsibility: t('aiGovernance.operatingModel.responsibility6') }
  ];

  const controlFramework = [
    {
      category: t('aiGovernance.controls.category1'),
      controls: t('aiGovernance.controls.category1Items', { returnObjects: true }) as string[]
    },
    {
      category: t('aiGovernance.controls.category2'),
      controls: t('aiGovernance.controls.category2Items', { returnObjects: true }) as string[]
    },
    {
      category: t('aiGovernance.controls.category3'),
      controls: t('aiGovernance.controls.category3Items', { returnObjects: true }) as string[]
    },
    {
      category: t('aiGovernance.controls.category4'),
      controls: t('aiGovernance.controls.category4Items', { returnObjects: true }) as string[]
    }
  ];

  const deliverables = [
    { title: t('aiGovernance.deliverables.item1Title'), desc: t('aiGovernance.deliverables.item1Desc') },
    { title: t('aiGovernance.deliverables.item2Title'), desc: t('aiGovernance.deliverables.item2Desc') },
    { title: t('aiGovernance.deliverables.item3Title'), desc: t('aiGovernance.deliverables.item3Desc') },
    { title: t('aiGovernance.deliverables.item4Title'), desc: t('aiGovernance.deliverables.item4Desc') },
    { title: t('aiGovernance.deliverables.item5Title'), desc: t('aiGovernance.deliverables.item5Desc') },
    { title: t('aiGovernance.deliverables.item6Title'), desc: t('aiGovernance.deliverables.item6Desc') },
    { title: t('aiGovernance.deliverables.item7Title'), desc: t('aiGovernance.deliverables.item7Desc') },
    { title: t('aiGovernance.deliverables.item8Title'), desc: t('aiGovernance.deliverables.item8Desc') }
  ];

  return (
    <>
      <SuccessModal
        open={demoSubmitted}
        onClose={() => {
          setDemoSubmitted(false);
          setDemoModalOpen(false);
          demoForm.reset();
        }}
        title={t('aiGovernance.demoForm.successTitle')}
        message={t('aiGovernance.demoForm.successMessage')}
        buttonText={t('aiGovernance.demoForm.successButton')}
      />

      {/* HERO */}
      <section className="relative min-h-[75vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>{t('aiGovernance.hero.badge1')}</span>
              <span>•</span>
              <span>{t('aiGovernance.hero.badge2')}</span>
              <span>•</span>
              <span>{t('aiGovernance.hero.badge3')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('aiGovernance.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              {t('aiGovernance.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={() => window.location.href = '/company/contact'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="ai_governance_exposure_check"
              >
                {t('aiGovernance.hero.ctaPrimary')}
              </Button>
              <Dialog open={demoModalOpen && !demoSubmitted} onOpenChange={(open) => {
                setDemoModalOpen(open);
                if (open) {
                  setServerError('');
                } else {
                  // Reset form and clear errors when closing
                  demoForm.reset();
                  setServerError('');
                }
              }}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    data-cta="ai_governance_request_demo"
                  >
                    {t('aiGovernance.hero.ctaSecondary')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t('aiGovernance.demoForm.modalTitle')}</DialogTitle>
                    <DialogDescription>
                      {t('aiGovernance.demoForm.modalDescription')}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={demoForm.handleSubmit(handleDemoSubmit)} className="space-y-4 mt-4">
                    {serverError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-sm text-red-400">{serverError}</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="demo-name" className={demoForm.formState.errors.name ? 'text-red-500' : ''}>
                          {demoForm.formState.errors.name ? demoForm.formState.errors.name.message : t('aiGovernance.demoForm.labelName')}
                        </Label>
                        <Input
                          id="demo-name"
                          {...demoForm.register('name')}
                          className={`mt-1 ${demoForm.formState.errors.name ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="demo-email" className={demoForm.formState.errors.email ? 'text-red-500' : ''}>
                          {demoForm.formState.errors.email ? demoForm.formState.errors.email.message : t('aiGovernance.demoForm.labelEmail')}
                        </Label>
                        <Input
                          id="demo-email"
                          type="email"
                          {...demoForm.register('email')}
                          className={`mt-1 ${demoForm.formState.errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="demo-company" className={demoForm.formState.errors.company ? 'text-red-500' : ''}>
                          {demoForm.formState.errors.company ? demoForm.formState.errors.company.message : t('aiGovernance.demoForm.labelCompany')}
                        </Label>
                        <Input
                          id="demo-company"
                          {...demoForm.register('company')}
                          className={`mt-1 ${demoForm.formState.errors.company ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="demo-role" className={demoForm.formState.errors.role ? 'text-red-500' : ''}>
                          {demoForm.formState.errors.role ? demoForm.formState.errors.role.message : t('aiGovernance.demoForm.labelRole')}
                        </Label>
                        <Input
                          id="demo-role"
                          {...demoForm.register('role')}
                          className={`mt-1 ${demoForm.formState.errors.role ? 'border-red-500' : ''}`}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="demo-sector" className={demoForm.formState.errors.sector ? 'text-red-500' : ''}>
                        {demoForm.formState.errors.sector ? demoForm.formState.errors.sector.message : t('aiGovernance.demoForm.labelSector')}
                      </Label>
                      <Select value={demoSector} onValueChange={(value) => demoForm.setValue('sector', value, { shouldValidate: true })}>
                        <SelectTrigger id="demo-sector" className={`mt-1 ${demoForm.formState.errors.sector ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder={t('aiGovernance.demoForm.placeholderSector')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="finance">{t('aiGovernance.demoForm.sectors.finance')}</SelectItem>
                          <SelectItem value="energy">{t('aiGovernance.demoForm.sectors.energy')}</SelectItem>
                          <SelectItem value="healthcare">{t('aiGovernance.demoForm.sectors.healthcare')}</SelectItem>
                          <SelectItem value="telecom">{t('aiGovernance.demoForm.sectors.telecom')}</SelectItem>
                          <SelectItem value="government">{t('aiGovernance.demoForm.sectors.government')}</SelectItem>
                          <SelectItem value="other">{t('aiGovernance.demoForm.sectors.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="demo-status">{t('aiGovernance.demoForm.labelCurrentStatus')}</Label>
                      <Select value={demoStatus} onValueChange={(value) => demoForm.setValue('currentStatus', value)}>
                        <SelectTrigger id="demo-status" className="mt-1">
                          <SelectValue placeholder={t('aiGovernance.demoForm.placeholderCurrentStatus')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unknown">{t('aiGovernance.demoForm.currentStatus.unknown')}</SelectItem>
                          <SelectItem value="some-use">{t('aiGovernance.demoForm.currentStatus.someUse')}</SelectItem>
                          <SelectItem value="formal">{t('aiGovernance.demoForm.currentStatus.formal')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="demo-concern">{t('aiGovernance.demoForm.labelPrimaryConcern')}</Label>
                      <Select value={demoConcern} onValueChange={(value) => demoForm.setValue('primaryConcern', value)}>
                        <SelectTrigger id="demo-concern" className="mt-1">
                          <SelectValue placeholder={t('aiGovernance.demoForm.placeholderPrimaryConcern')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="data-exposure">{t('aiGovernance.demoForm.primaryConcern.dataExposure')}</SelectItem>
                          <SelectItem value="auditability">{t('aiGovernance.demoForm.primaryConcern.auditability')}</SelectItem>
                          <SelectItem value="policy">{t('aiGovernance.demoForm.primaryConcern.policy')}</SelectItem>
                          <SelectItem value="deployment">{t('aiGovernance.demoForm.primaryConcern.deployment')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="demo-timeline">{t('aiGovernance.demoForm.labelTimeline')}</Label>
                      <Select value={demoTimeline} onValueChange={(value) => demoForm.setValue('timeline', value)}>
                        <SelectTrigger id="demo-timeline" className="mt-1">
                          <SelectValue placeholder={t('aiGovernance.demoForm.placeholderTimeline')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">{t('aiGovernance.demoForm.timelines.now')}</SelectItem>
                          <SelectItem value="30">{t('aiGovernance.demoForm.timelines.30')}</SelectItem>
                          <SelectItem value="90">{t('aiGovernance.demoForm.timelines.90')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="demo-notes">{t('aiGovernance.demoForm.labelNotes')}</Label>
                      <Textarea
                        id="demo-notes"
                        rows={3}
                        {...demoForm.register('notes')}
                        placeholder={t('aiGovernance.demoForm.placeholderNotes')}
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#C9A227] hover:bg-[#B8921F]" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('aiGovernance.demoForm.btnSubmitting')}
                        </>
                      ) : (
                        t('aiGovernance.demoForm.btnSubmit')
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <a
              href="/technology/security-sovereignty"
              className="text-sm text-[#C9A227] hover:text-[#B8921F] inline-flex items-center gap-1"
            >
              {t('aiGovernance.hero.securityLink')} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* THE REALITY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('aiGovernance.reality.title')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('aiGovernance.reality.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 border-2 hover:border-amber-500 transition-all">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <p className="text-gray-700">{t('aiGovernance.reality.card1')}</p>
            </Card>

            <Card className="p-6 border-2 hover:border-amber-500 transition-all">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <p className="text-gray-700">{t('aiGovernance.reality.card2')}</p>
            </Card>

            <Card className="p-6 border-2 hover:border-amber-500 transition-all">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <p className="text-gray-700">{t('aiGovernance.reality.card3')}</p>
            </Card>

            <Card className="p-6 border-2 hover:border-amber-500 transition-all">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <p className="text-gray-700">{t('aiGovernance.reality.card4')}</p>
            </Card>
          </div>

          <Card className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-amber-50 to-white border-2 border-amber-300">
            <p className="text-2xl font-bold text-gray-900 text-center">
              {t('aiGovernance.reality.quote')}
            </p>
          </Card>
        </div>
      </section>

      {/* 5 PILLARS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('aiGovernance.pillars.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {pillars.map((pillar, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group">
                <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 text-[#C9A227] group-hover:bg-[#C9A227]/20 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </Card>
            ))}
          </div>

          <p className="text-center text-gray-700 italic max-w-2xl mx-auto">
            {t('aiGovernance.pillars.quote')}
          </p>
        </div>
      </section>

      {/* OPERATING MODEL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('aiGovernance.operatingModel.title')}
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {t('aiGovernance.operatingModel.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {operatingRoles.map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.role}</h3>
                    <p className="text-sm text-gray-600">{item.responsibility}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => window.location.href = '/deliverables'}
              variant="outline"
              data-cta="ai_governance_request_samples"
            >
              {t('aiGovernance.operatingModel.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* CONTROL FRAMEWORK */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('aiGovernance.controls.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {controlFramework.map((bucket, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{bucket.category}</h3>
                <ul className="space-y-2">
                  {bucket.controls.map((control, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <span>{control}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600 italic">
            {t('aiGovernance.controls.note')}
          </p>
        </div>
      </section>

      {/* HOW ALIPH ENABLES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('aiGovernance.enablement.title')}
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            {[
              { step: '1', title: t('aiGovernance.enablement.step1Title'), desc: t('aiGovernance.enablement.step1Desc') },
              { step: '2', title: t('aiGovernance.enablement.step2Title'), desc: t('aiGovernance.enablement.step2Desc') },
              { step: '3', title: t('aiGovernance.enablement.step3Title'), desc: t('aiGovernance.enablement.step3Desc') },
              { step: '4', title: t('aiGovernance.enablement.step4Title'), desc: t('aiGovernance.enablement.step4Desc') },
              { step: '5', title: t('aiGovernance.enablement.step5Title'), desc: t('aiGovernance.enablement.step5Desc') },
              { step: '6', title: t('aiGovernance.enablement.step6Title'), desc: t('aiGovernance.enablement.step6Desc') }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#C9A227] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/technology/aliph-brain" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              {t('aiGovernance.enablement.link1')}
            </a>
            <span className="text-gray-400">•</span>
            <a href="/technology/security-sovereignty" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              {t('aiGovernance.enablement.link2')}
            </a>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('aiGovernance.deliverables.title')}
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {t('aiGovernance.deliverables.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {deliverables.map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <FileText className="w-8 h-8 text-[#C9A227] mb-3" />
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              {t('aiGovernance.deliverables.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
              data-cta="ai_governance_speak_to_architect"
            >
              {t('aiGovernance.deliverables.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* GOVERNANCE DIAGRAM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('aiGovernance.diagram.title')}
          </h2>

          <div className="max-w-5xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-12 bg-[#C9A227]/10 border-2 border-[#C9A227] rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    {t('aiGovernance.diagram.user')}
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-32 h-12 bg-indigo-100 border-2 border-indigo-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    {t('aiGovernance.diagram.workflow')}
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-32 h-12 bg-blue-100 border-2 border-blue-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    {t('aiGovernance.diagram.policy')}
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-28 h-12 bg-green-100 border-2 border-green-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    {t('aiGovernance.diagram.privacy')}
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-20 h-12 bg-purple-100 border-2 border-purple-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    {t('aiGovernance.diagram.model')}
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-24 h-12 bg-emerald-100 border-2 border-emerald-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    {t('aiGovernance.diagram.output')}
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-4">
                  <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-[#C9A227]" />
                    <p className="text-sm text-gray-700 font-semibold">{t('aiGovernance.diagram.auditLog')}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('aiGovernance.finalCTA.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('aiGovernance.finalCTA.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              onClick={() => window.location.href = '/company/contact'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              {t('aiGovernance.finalCTA.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setServerError('');
                setDemoModalOpen(true);
              }}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('aiGovernance.finalCTA.ctaSecondary')}
            </Button>
          </div>
          <a
            href="/technology/security-sovereignty"
            className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
          >
            {t('aiGovernance.finalCTA.link')}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('aiGovernance.faq.title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aiGovernance.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aiGovernance.faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aiGovernance.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aiGovernance.faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aiGovernance.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aiGovernance.faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aiGovernance.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aiGovernance.faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aiGovernance.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aiGovernance.faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('aiGovernance.faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('aiGovernance.faq.a6')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

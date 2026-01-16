import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/config';
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
import { Shield, FileText, CheckCircle2, ArrowRight, Clock, Users, BarChart3, Eye, Workflow, Brain, Settings, TrendingUp, Loader2 } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';
import useSEO from '@/hooks/useSEO';

// Proposal form validation schema with i18n
const getProposalFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('managedServices.proposalForm.validation.nameMin')).max(100),
  email: z.string().email(i18n.t('managedServices.proposalForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('managedServices.proposalForm.validation.companyRequired')).max(200),
  role: z.string().min(2, i18n.t('managedServices.proposalForm.validation.roleRequired')).max(100),
  sector: z.string().min(1, i18n.t('managedServices.proposalForm.validation.sectorRequired')),
  serviceLines: z.array(z.string()).min(1, i18n.t('managedServices.proposalForm.validation.serviceLinesRequired')),
  size: z.string().min(1, i18n.t('managedServices.proposalForm.validation.sizeRequired')),
  timeline: z.string().min(1, i18n.t('managedServices.proposalForm.validation.timelineRequired')),
  notes: z.string().optional(),
});

// Pilot form validation schema with i18n
const getPilotFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('managedServices.pilotForm.validation.nameMin')).max(100),
  email: z.string().email(i18n.t('managedServices.pilotForm.validation.emailInvalid')),
  company: z.string().min(2, i18n.t('managedServices.pilotForm.validation.companyRequired')).max(200),
  objective: z.string().min(1, i18n.t('managedServices.pilotForm.validation.objectiveRequired')),
  pressure: z.string().min(1, i18n.t('managedServices.pilotForm.validation.pressureRequired')),
  notes: z.string().optional(),
});

type ProposalFormData = z.infer<ReturnType<typeof getProposalFormSchema>>;
type PilotFormData = z.infer<ReturnType<typeof getPilotFormSchema>>;

export default function ManagedServices() {
  const { t } = useTranslation();
  useSEO({
    title: 'Managed Services | Aliph Solutions',
    description: 'Managed GRC and compliance operations for Saudi organizations—SOPs, controls, evidence workflows, reporting cadence, and continuous readiness. Built for PDPL, NCA ECC, and ZATCA environments.',
    keywords: 'managed services, GRC operations, compliance operations, ZATCA operations, managed compliance, Saudi managed services, continuous readiness',
  });

  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [pilotModalOpen, setPilotModalOpen] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [pilotSubmitted, setPilotSubmitted] = useState(false);
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);
  const [isSubmittingPilot, setIsSubmittingPilot] = useState(false);
  const [proposalError, setProposalError] = useState<string | null>(null);
  const [pilotError, setPilotError] = useState<string | null>(null);

  // Proposal form
  const proposalForm = useForm<ProposalFormData>({
    resolver: zodResolver(getProposalFormSchema()),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      sector: '',
      serviceLines: [],
      size: '',
      timeline: '',
      notes: '',
    },
  });

  const serviceLines = proposalForm.watch('serviceLines') || [];
  const proposalSector = proposalForm.watch('sector');
  const proposalSize = proposalForm.watch('size');
  const proposalTimeline = proposalForm.watch('timeline');

  // Pilot form
  const pilotForm = useForm<PilotFormData>({
    resolver: zodResolver(getPilotFormSchema()),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      objective: '',
      pressure: '',
      notes: '',
    },
  });

  const pilotObjective = pilotForm.watch('objective');
  const pilotPressure = pilotForm.watch('pressure');

  const toggleServiceLine = (line: string) => {
    const current = serviceLines;
    const updated = current.includes(line)
      ? current.filter(l => l !== line)
      : [...current, line];
    proposalForm.setValue('serviceLines', updated, { shouldValidate: true });
  };

  const onProposalSubmit = async (data: ProposalFormData) => {
    setIsSubmittingProposal(true);
    setProposalError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: '',
        subject: `Managed Services Proposal Request - ${data.company}`,
        message: `Role: ${data.role}\n` +
          `Sector: ${data.sector}\n` +
          `Service Lines: ${data.serviceLines.join(', ')}\n` +
          `Organization Size: ${data.size}\n` +
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
        setProposalError(result.message || t('managedServices.proposalForm.validation.submitError'));
        return;
      }

      setProposalSubmitted(true);
    } catch (error) {
      setProposalError(t('managedServices.proposalForm.validation.unexpectedError'));
    } finally {
      setIsSubmittingProposal(false);
    }
  };

  const onPilotSubmit = async (data: PilotFormData) => {
    setIsSubmittingPilot(true);
    setPilotError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: '',
        subject: `30-Day Pilot Request - ${data.company}`,
        message: `Primary Objective: ${data.objective}\n` +
          `Pressure Source: ${data.pressure}\n\n` +
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
        setPilotError(result.message || t('managedServices.pilotForm.validation.submitError'));
        return;
      }

      setPilotSubmitted(true);
    } catch (error) {
      setPilotError(t('managedServices.pilotForm.validation.unexpectedError'));
    } finally {
      setIsSubmittingPilot(false);
    }
  };

  return (
    <>
      <SuccessModal
        open={proposalSubmitted}
        onClose={() => {
          setProposalSubmitted(false);
          setProposalModalOpen(false);
          proposalForm.reset();
        }}
        title={t('managedServices.proposalForm.successTitle')}
        message={t('managedServices.proposalForm.successMessage')}
        buttonText={t('managedServices.proposalForm.successButton')}
      />

      <SuccessModal
        open={pilotSubmitted}
        onClose={() => {
          setPilotSubmitted(false);
          setPilotModalOpen(false);
          pilotForm.reset();
        }}
        title={t('managedServices.pilotForm.successTitle')}
        message={t('managedServices.pilotForm.successMessage')}
        buttonText={t('managedServices.pilotForm.successButton')}
      />

      {/* Request Proposal Modal */}
      <Dialog open={proposalModalOpen && !proposalSubmitted} onOpenChange={(open) => {
        setProposalModalOpen(open);
        if (!open) {
          proposalForm.reset();
          setProposalError(null);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('managedServices.proposalForm.modalTitle')}</DialogTitle>
            <DialogDescription>
              {t('managedServices.proposalForm.modalDescription')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={proposalForm.handleSubmit(onProposalSubmit)} className="space-y-4">
              {proposalError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{proposalError}</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proposal-name" className={proposalForm.formState.errors.name ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.name ? proposalForm.formState.errors.name.message : t('managedServices.proposalForm.labelName')}
                  </Label>
                  <Input
                    id="proposal-name"
                    {...proposalForm.register('name')}
                    className={proposalForm.formState.errors.name ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal-email" className={proposalForm.formState.errors.email ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.email ? proposalForm.formState.errors.email.message : t('managedServices.proposalForm.labelEmail')}
                  </Label>
                  <Input
                    id="proposal-email"
                    type="email"
                    {...proposalForm.register('email')}
                    className={proposalForm.formState.errors.email ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proposal-company" className={proposalForm.formState.errors.company ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.company ? proposalForm.formState.errors.company.message : t('managedServices.proposalForm.labelCompany')}
                  </Label>
                  <Input
                    id="proposal-company"
                    {...proposalForm.register('company')}
                    className={proposalForm.formState.errors.company ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal-role" className={proposalForm.formState.errors.role ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.role ? proposalForm.formState.errors.role.message : t('managedServices.proposalForm.labelRole')}
                  </Label>
                  <Input
                    id="proposal-role"
                    {...proposalForm.register('role')}
                    className={proposalForm.formState.errors.role ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proposal-sector" className={proposalForm.formState.errors.sector ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.sector ? proposalForm.formState.errors.sector.message : t('managedServices.proposalForm.labelSector')}
                  </Label>
                  <Select value={proposalSector} onValueChange={(value) => proposalForm.setValue('sector', value, { shouldValidate: true })}>
                    <SelectTrigger id="proposal-sector" className={proposalForm.formState.errors.sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder={t('managedServices.proposalForm.placeholderSector')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">{t('managedServices.proposalForm.sectors.finance')}</SelectItem>
                      <SelectItem value="energy">{t('managedServices.proposalForm.sectors.energy')}</SelectItem>
                      <SelectItem value="healthcare">{t('managedServices.proposalForm.sectors.healthcare')}</SelectItem>
                      <SelectItem value="government">{t('managedServices.proposalForm.sectors.government')}</SelectItem>
                      <SelectItem value="giga">{t('managedServices.proposalForm.sectors.giga')}</SelectItem>
                      <SelectItem value="sme">{t('managedServices.proposalForm.sectors.sme')}</SelectItem>
                      <SelectItem value="other">{t('managedServices.proposalForm.sectors.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal-size" className={proposalForm.formState.errors.size ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.size ? proposalForm.formState.errors.size.message : t('managedServices.proposalForm.labelSize')}
                  </Label>
                  <Select value={proposalSize} onValueChange={(value) => proposalForm.setValue('size', value, { shouldValidate: true })}>
                    <SelectTrigger id="proposal-size" className={proposalForm.formState.errors.size ? 'border-red-500' : ''}>
                      <SelectValue placeholder={t('managedServices.proposalForm.placeholderSize')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sme">{t('managedServices.proposalForm.sizes.sme')}</SelectItem>
                      <SelectItem value="enterprise">{t('managedServices.proposalForm.sizes.enterprise')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className={proposalForm.formState.errors.serviceLines ? 'text-red-500' : ''}>
                  {proposalForm.formState.errors.serviceLines ? proposalForm.formState.errors.serviceLines.message : t('managedServices.proposalForm.labelServiceLines')}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {key: 'grc', label: t('managedServices.proposalForm.serviceLines.grc')},
                    {key: 'zatca', label: t('managedServices.proposalForm.serviceLines.zatca')},
                    {key: 'hr', label: t('managedServices.proposalForm.serviceLines.hr')},
                    {key: 'accounting', label: t('managedServices.proposalForm.serviceLines.accounting')},
                    {key: 'vendor', label: t('managedServices.proposalForm.serviceLines.vendor')},
                    {key: 'bot', label: t('managedServices.proposalForm.serviceLines.bot')}
                  ].map((line) => (
                    <div key={line.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`line-${line.key}`}
                        checked={serviceLines.includes(line.label)}
                        onCheckedChange={() => toggleServiceLine(line.label)}
                      />
                      <label htmlFor={`line-${line.key}`} className="text-sm cursor-pointer">
                        {line.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal-timeline" className={proposalForm.formState.errors.timeline ? 'text-red-500' : ''}>
                  {proposalForm.formState.errors.timeline ? proposalForm.formState.errors.timeline.message : t('managedServices.proposalForm.labelTimeline')}
                </Label>
                <Select value={proposalTimeline} onValueChange={(value) => proposalForm.setValue('timeline', value, { shouldValidate: true })}>
                  <SelectTrigger id="proposal-timeline" className={proposalForm.formState.errors.timeline ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('managedServices.proposalForm.placeholderTimeline')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">{t('managedServices.proposalForm.timelines.now')}</SelectItem>
                    <SelectItem value="30">{t('managedServices.proposalForm.timelines.30')}</SelectItem>
                    <SelectItem value="90">{t('managedServices.proposalForm.timelines.90')}</SelectItem>
                    <SelectItem value="exploring">{t('managedServices.proposalForm.timelines.exploring')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal-notes">{t('managedServices.proposalForm.labelNotes')}</Label>
                <Textarea
                  id="proposal-notes"
                  rows={3}
                  {...proposalForm.register('notes')}
                  placeholder={t('managedServices.proposalForm.placeholderNotes')}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setProposalModalOpen(false)} className="flex-1" disabled={isSubmittingProposal}>
                  {t('managedServices.proposalForm.btnCancel')}
                </Button>
                <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]" disabled={isSubmittingProposal}>
                  {isSubmittingProposal ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('managedServices.proposalForm.btnSubmitting')}
                    </>
                  ) : (
                    t('managedServices.proposalForm.btnSubmit')
                  )}
                </Button>
              </div>
            </form>
        </DialogContent>
      </Dialog>

      {/* Start Pilot Modal */}
      <Dialog open={pilotModalOpen && !pilotSubmitted} onOpenChange={(open) => {
        setPilotModalOpen(open);
        if (!open) {
          pilotForm.reset();
          setPilotError(null);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('managedServices.pilotForm.modalTitle')}</DialogTitle>
            <DialogDescription>
              {t('managedServices.pilotForm.modalDescription')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={pilotForm.handleSubmit(onPilotSubmit)} className="space-y-4">
            {pilotError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{pilotError}</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pilot-name" className={pilotForm.formState.errors.name ? 'text-red-500' : ''}>
                  {pilotForm.formState.errors.name ? pilotForm.formState.errors.name.message : t('managedServices.pilotForm.labelName')}
                </Label>
                <Input
                  id="pilot-name"
                  {...pilotForm.register('name')}
                  className={pilotForm.formState.errors.name ? 'border-red-500' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pilot-email" className={pilotForm.formState.errors.email ? 'text-red-500' : ''}>
                  {pilotForm.formState.errors.email ? pilotForm.formState.errors.email.message : t('managedServices.pilotForm.labelEmail')}
                </Label>
                <Input
                  id="pilot-email"
                  type="email"
                  {...pilotForm.register('email')}
                  className={pilotForm.formState.errors.email ? 'border-red-500' : ''}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-company" className={pilotForm.formState.errors.company ? 'text-red-500' : ''}>
                {pilotForm.formState.errors.company ? pilotForm.formState.errors.company.message : t('managedServices.pilotForm.labelCompany')}
              </Label>
              <Input
                id="pilot-company"
                {...pilotForm.register('company')}
                className={pilotForm.formState.errors.company ? 'border-red-500' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-objective" className={pilotForm.formState.errors.objective ? 'text-red-500' : ''}>
                {pilotForm.formState.errors.objective ? pilotForm.formState.errors.objective.message : t('managedServices.pilotForm.labelObjective')}
              </Label>
              <Textarea
                id="pilot-objective"
                rows={3}
                {...pilotForm.register('objective')}
                placeholder={t('managedServices.pilotForm.placeholderObjective')}
                className={pilotForm.formState.errors.objective ? 'border-red-500' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-pressure" className={pilotForm.formState.errors.pressure ? 'text-red-500' : ''}>
                {pilotForm.formState.errors.pressure ? pilotForm.formState.errors.pressure.message : t('managedServices.pilotForm.labelPressure')}
              </Label>
              <Select value={pilotPressure} onValueChange={(value) => pilotForm.setValue('pressure', value, { shouldValidate: true })}>
                <SelectTrigger id="pilot-pressure" className={pilotForm.formState.errors.pressure ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('managedServices.pilotForm.placeholderPressure')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdpl">{t('managedServices.pilotForm.pressures.pdpl')}</SelectItem>
                  <SelectItem value="nca-ecc">{t('managedServices.pilotForm.pressures.nca')}</SelectItem>
                  <SelectItem value="zatca">{t('managedServices.pilotForm.pressures.zatca')}</SelectItem>
                  <SelectItem value="audit">{t('managedServices.pilotForm.pressures.audit')}</SelectItem>
                  <SelectItem value="board">{t('managedServices.pilotForm.pressures.board')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-notes">{t('managedServices.pilotForm.labelNotes')}</Label>
              <Textarea
                id="pilot-notes"
                rows={3}
                {...pilotForm.register('notes')}
                placeholder={t('managedServices.pilotForm.placeholderNotes')}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setPilotModalOpen(false)} className="flex-1" disabled={isSubmittingPilot}>
                {t('managedServices.pilotForm.btnCancel')}
              </Button>
              <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]" disabled={isSubmittingPilot}>
                {isSubmittingPilot ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('managedServices.pilotForm.btnSubmitting')}
                  </>
                ) : (
                  t('managedServices.pilotForm.btnSubmit')
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>{t('managedServices.hero.badge1')}</span>
              <span>•</span>
              <span>{t('managedServices.hero.badge2')}</span>
              <span>•</span>
              <span>{t('managedServices.hero.badge3')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('managedServices.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              {t('managedServices.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setProposalModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="managed_request_proposal"
              >
                {t('managedServices.hero.ctaPrimary')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setPilotModalOpen(true)}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="managed_start_pilot"
              >
                {t('managedServices.hero.ctaSecondary')}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => window.location.href = '/deliverables'}
                className="text-white hover:bg-white/10"
                data-cta="managed_view_samples"
              >
                {t('managedServices.hero.ctaTertiary')}
              </Button>
            </div>
          </div>
        </div>

        {/* Operations dashboard visual */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect x="50" y="50" width="300" height="200" fill="none" stroke="#C9A227" strokeWidth="2" rx="8" />
            <rect x="70" y="80" width="60" height="40" fill="#C9A227" opacity="0.3" rx="4" />
            <rect x="150" y="80" width="60" height="40" fill="#C9A227" opacity="0.3" rx="4" />
            <rect x="230" y="80" width="60" height="40" fill="#C9A227" opacity="0.3" rx="4" />
            <line x1="70" y1="150" x2="310" y2="150" stroke="#C9A227" strokeWidth="1" />
            <circle cx="100" cy="180" r="8" fill="#C9A227" />
            <circle cx="180" cy="180" r="8" fill="#C9A227" />
            <circle cx="260" cy="180" r="8" fill="#C9A227" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
            {t('managedServices.problem.title')}
          </h2>

          <div className="max-w-3xl mx-auto mb-12">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <span>{t('managedServices.problem.point1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <span>{t('managedServices.problem.point2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <span>{t('managedServices.problem.point3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <span>{t('managedServices.problem.point4')}</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-2xl text-gray-900 max-w-3xl mx-auto border-l-4 border-[#C9A227] pl-6 italic font-medium">
            {t('managedServices.problem.quote')}
          </p>
        </div>
      </section>

      {/* SECTION 3: WHAT WE RUN */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('managedServices.operations.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('managedServices.operations.compliance.title')}</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• {t('managedServices.operations.compliance.item1')}</li>
                <li>• {t('managedServices.operations.compliance.item2')}</li>
                <li>• {t('managedServices.operations.compliance.item3')}</li>
              </ul>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('managedServices.operations.governance.title')}</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• {t('managedServices.operations.governance.item1')}</li>
                <li>• {t('managedServices.operations.governance.item2')}</li>
                <li>• {t('managedServices.operations.governance.item3')}</li>
              </ul>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('managedServices.operations.risk.title')}</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• {t('managedServices.operations.risk.item1')}</li>
                <li>• {t('managedServices.operations.risk.item2')}</li>
                <li>• {t('managedServices.operations.risk.item3')}</li>
              </ul>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('managedServices.operations.specialty.title')}</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• {t('managedServices.operations.specialty.item1')}</li>
                <li>• {t('managedServices.operations.specialty.item2')}</li>
                <li>• {t('managedServices.operations.specialty.item3')}</li>
              </ul>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setProposalModalOpen(true)}
              data-cta="managed_request_proposal"
            >
              {t('managedServices.serviceLines.discussModelBtn')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4: MANAGED SERVICES CATALOG */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('managedServices.serviceLines.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                key: 'grc',
                link: '/managed-services/grc-support-center'
              },
              {
                key: 'tax',
                link: '/managed-services/tax-vat-zatca-operations'
              },
              {
                key: 'payroll',
                link: '/managed-services/payroll-hr-operations'
              },
              {
                key: 'accounting',
                link: '/managed-services/accounting-bookkeeping'
              },
              {
                key: 'vendor',
                link: '/managed-services/vendor-management'
              },
              {
                key: 'bot',
                link: '/managed-services/build-operate-transfer'
              },
            ].map((service, idx) => {
              const serviceData = t(`managedServices.serviceLines.services.${service.key}`, { returnObjects: true }) as any;
              return (
                <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{serviceData.title}</h3>
                  <p className="text-sm text-[#C9A227] mb-4 font-medium">{t('managedServices.serviceLines.bestForLabel')} {serviceData.bestFor}</p>
                  
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-700 mb-2">{t('managedServices.serviceLines.whatsIncludedLabel')}</p>
                    <ul className="space-y-2">
                      {serviceData.included.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={service.link}
                      className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
                      data-cta="managed_explore_service_line"
                    >
                      {t('managedServices.serviceLines.exploreBtn')}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setProposalModalOpen(true)}
                      className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                      data-cta="managed_request_proposal"
                    >
                      {t('managedServices.serviceLines.requestProposalBtn')}
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('managedServices.model.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('managedServices.model.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-[#C9A227]/30">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('managedServices.model.step1.title')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t('managedServices.model.step1.item1')}</li>
                <li>• {t('managedServices.model.step1.item2')}</li>
                <li>• {t('managedServices.model.step1.item3')}</li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-[#C9A227]/30">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('managedServices.model.step2.title')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t('managedServices.model.step2.item1')}</li>
                <li>• {t('managedServices.model.step2.item2')}</li>
                <li>• {t('managedServices.model.step2.item3')}</li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-[#C9A227]/30">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('managedServices.model.step3.title')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t('managedServices.model.step3.item1')}</li>
                <li>• {t('managedServices.model.step3.item2')}</li>
                <li>• {t('managedServices.model.step3.item3')}</li>
              </ul>
            </Card>
          </div>

          {/* What you get every month */}
          <Card className="max-w-4xl mx-auto p-8 border-2 bg-gradient-to-br from-[#C9A227]/5 to-white">
            <h3 className="text-xl font-bold mb-6 text-gray-900 text-center">{t('managedServices.model.monthly.title')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                t('managedServices.model.monthly.item1'),
                t('managedServices.model.monthly.item2'),
                t('managedServices.model.monthly.item3'),
                t('managedServices.model.monthly.item4')
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227]" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 6: GOVERNED BY DESIGN */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('managedServices.governed.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('managedServices.governed.sops.title')}</h3>
              <p className="text-gray-600">
                {t('managedServices.governed.sops.description')}
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Workflow className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('managedServices.governed.brain.title')}</h3>
              <p className="text-gray-600">
                {t('managedServices.governed.brain.description')}
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('managedServices.governed.security.title')}</h3>
              <p className="text-gray-600">
                {t('managedServices.governed.security.description')}
              </p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/aliph-brain'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              {t('managedServices.governed.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
            >
              {t('managedServices.governed.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHO THIS IS FOR */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('managedServices.audience.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              t('managedServices.audience.segment1'),
              t('managedServices.audience.segment2'),
              t('managedServices.audience.segment3'),
              t('managedServices.audience.segment4')
            ].map((segment, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <Users className="w-10 h-10 text-[#C9A227] mb-4" />
                <p className="text-lg font-semibold text-gray-900">{segment}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: PROOF */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('managedServices.proof.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">{t('managedServices.proof.calendar.title')}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('managedServices.proof.calendar.description')}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  {t('managedServices.proof.viewSample')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">{t('managedServices.proof.checklist.title')}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('managedServices.proof.checklist.description')}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  {t('managedServices.proof.viewSample')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">{t('managedServices.proof.reporting.title')}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('managedServices.proof.reporting.description')}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  {t('managedServices.proof.viewSample')}
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
              data-cta="managed_view_samples"
            >
              {t('managedServices.proof.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('managedServices.finalCTA.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('managedServices.finalCTA.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              onClick={() => setPilotModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              data-cta="managed_start_pilot"
            >
              {t('managedServices.finalCTA.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setProposalModalOpen(true)}
              className="border-white/30 text-white hover:bg-white/10"
              data-cta="managed_request_proposal"
            >
              {t('managedServices.finalCTA.ctaSecondary')}
            </Button>
          </div>
          <div className="flex gap-6 justify-center text-sm">
            <a href="/deliverables" className="text-gray-300 hover:text-[#C9A227] transition-colors">
              {t('managedServices.finalCTA.link1')}
            </a>
            <a href="/technology/security-sovereignty" className="text-gray-300 hover:text-[#C9A227] transition-colors">
              {t('managedServices.finalCTA.link2')}
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('managedServices.faq.title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('managedServices.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('managedServices.faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('managedServices.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('managedServices.faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('managedServices.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('managedServices.faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('managedServices.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('managedServices.faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('managedServices.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('managedServices.faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('managedServices.faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('managedServices.faq.a6')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

// Proposal form validation schema
const proposalFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required').max(200),
  role: z.string().min(2, 'Role is required').max(100),
  sector: z.string().min(1, 'Please select a sector'),
  serviceLines: z.array(z.string()).min(1, 'Please select at least one service line'),
  size: z.string().min(1, 'Please select organization size'),
  timeline: z.string().min(1, 'Please select a timeline'),
  notes: z.string().optional(),
});

// Pilot form validation schema
const pilotFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required').max(200),
  objective: z.string().min(1, 'Please select an objective'),
  pressure: z.string().min(1, 'Please select a pressure source'),
  notes: z.string().optional(),
});

type ProposalFormData = z.infer<typeof proposalFormSchema>;
type PilotFormData = z.infer<typeof pilotFormSchema>;

export default function ManagedServices() {
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
    resolver: zodResolver(proposalFormSchema),
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
    resolver: zodResolver(pilotFormSchema),
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
        setProposalError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setProposalSubmitted(true);
    } catch (error) {
      setProposalError('An unexpected error occurred. Please try again.');
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
        setPilotError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setPilotSubmitted(true);
    } catch (error) {
      setPilotError('An unexpected error occurred. Please try again.');
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
        title="Proposal Request Received!"
        message="We'll respond with a scoped managed delivery model within 24-48 hours."
        buttonText="Close"
      />

      <SuccessModal
        open={pilotSubmitted}
        onClose={() => {
          setPilotSubmitted(false);
          setPilotModalOpen(false);
          pilotForm.reset();
        }}
        title="Pilot Request Received!"
        message="We'll confirm pilot scope and kickoff steps within 48 hours."
        buttonText="Close"
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
            <DialogTitle className="text-2xl">Request a Managed Proposal</DialogTitle>
            <DialogDescription>
              Tell us what you need operated. We'll respond with a scoped managed delivery model.
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
                    {proposalForm.formState.errors.name ? proposalForm.formState.errors.name.message : 'Full Name *'}
                  </Label>
                  <Input
                    id="proposal-name"
                    {...proposalForm.register('name')}
                    className={proposalForm.formState.errors.name ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal-email" className={proposalForm.formState.errors.email ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.email ? proposalForm.formState.errors.email.message : 'Work Email *'}
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
                    {proposalForm.formState.errors.company ? proposalForm.formState.errors.company.message : 'Company *'}
                  </Label>
                  <Input
                    id="proposal-company"
                    {...proposalForm.register('company')}
                    className={proposalForm.formState.errors.company ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal-role" className={proposalForm.formState.errors.role ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.role ? proposalForm.formState.errors.role.message : 'Role *'}
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
                    {proposalForm.formState.errors.sector ? proposalForm.formState.errors.sector.message : 'Sector *'}
                  </Label>
                  <Select value={proposalSector} onValueChange={(value) => proposalForm.setValue('sector', value, { shouldValidate: true })}>
                    <SelectTrigger id="proposal-sector" className={proposalForm.formState.errors.sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="giga">Giga Vendor</SelectItem>
                      <SelectItem value="sme">SME</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal-size" className={proposalForm.formState.errors.size ? 'text-red-500' : ''}>
                    {proposalForm.formState.errors.size ? proposalForm.formState.errors.size.message : 'Current Size *'}
                  </Label>
                  <Select value={proposalSize} onValueChange={(value) => proposalForm.setValue('size', value, { shouldValidate: true })}>
                    <SelectTrigger id="proposal-size" className={proposalForm.formState.errors.size ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sme">SME</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className={proposalForm.formState.errors.serviceLines ? 'text-red-500' : ''}>
                  {proposalForm.formState.errors.serviceLines ? proposalForm.formState.errors.serviceLines.message : 'Service Line Interest (select all that apply) *'}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {['GRC Support Center', 'ZATCA Ops', 'HR Ops', 'Accounting', 'Vendor Mgmt', 'BOT'].map((line) => (
                    <div key={line} className="flex items-center space-x-2">
                      <Checkbox
                        id={`line-${line}`}
                        checked={serviceLines.includes(line)}
                        onCheckedChange={() => toggleServiceLine(line)}
                      />
                      <label htmlFor={`line-${line}`} className="text-sm cursor-pointer">
                        {line}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal-timeline" className={proposalForm.formState.errors.timeline ? 'text-red-500' : ''}>
                  {proposalForm.formState.errors.timeline ? proposalForm.formState.errors.timeline.message : 'Timeline *'}
                </Label>
                <Select value={proposalTimeline} onValueChange={(value) => proposalForm.setValue('timeline', value, { shouldValidate: true })}>
                  <SelectTrigger id="proposal-timeline" className={proposalForm.formState.errors.timeline ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Now</SelectItem>
                    <SelectItem value="30">Within 30 days</SelectItem>
                    <SelectItem value="90">Within 90 days</SelectItem>
                    <SelectItem value="exploring">Exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal-notes">Additional Notes</Label>
                <Textarea
                  id="proposal-notes"
                  rows={3}
                  {...proposalForm.register('notes')}
                  placeholder="Current challenges, specific requirements..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setProposalModalOpen(false)} className="flex-1" disabled={isSubmittingProposal}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]" disabled={isSubmittingProposal}>
                  {isSubmittingProposal ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Request Proposal'
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
            <DialogTitle className="text-2xl">Start a 30-Day Pilot</DialogTitle>
            <DialogDescription>
              We'll confirm pilot scope and kickoff steps within 48 hours.
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
                  {pilotForm.formState.errors.name ? pilotForm.formState.errors.name.message : 'Full Name *'}
                </Label>
                <Input
                  id="pilot-name"
                  {...pilotForm.register('name')}
                  className={pilotForm.formState.errors.name ? 'border-red-500' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pilot-email" className={pilotForm.formState.errors.email ? 'text-red-500' : ''}>
                  {pilotForm.formState.errors.email ? pilotForm.formState.errors.email.message : 'Work Email *'}
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
                {pilotForm.formState.errors.company ? pilotForm.formState.errors.company.message : 'Company *'}
              </Label>
              <Input
                id="pilot-company"
                {...pilotForm.register('company')}
                className={pilotForm.formState.errors.company ? 'border-red-500' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-objective" className={pilotForm.formState.errors.objective ? 'text-red-500' : ''}>
                {pilotForm.formState.errors.objective ? pilotForm.formState.errors.objective.message : 'Primary Objective *'}
              </Label>
              <Select value={pilotObjective} onValueChange={(value) => pilotForm.setValue('objective', value, { shouldValidate: true })}>
                <SelectTrigger id="pilot-objective" className={pilotForm.formState.errors.objective ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="evidence-readiness">Evidence readiness</SelectItem>
                  <SelectItem value="reporting-cadence">Reporting cadence</SelectItem>
                  <SelectItem value="control-execution">Control execution</SelectItem>
                  <SelectItem value="audit-support">Audit support</SelectItem>
                  <SelectItem value="zatca-ops">ZATCA operations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-pressure" className={pilotForm.formState.errors.pressure ? 'text-red-500' : ''}>
                {pilotForm.formState.errors.pressure ? pilotForm.formState.errors.pressure.message : 'Where Pressure Comes From *'}
              </Label>
              <Select value={pilotPressure} onValueChange={(value) => pilotForm.setValue('pressure', value, { shouldValidate: true })}>
                <SelectTrigger id="pilot-pressure" className={pilotForm.formState.errors.pressure ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdpl">PDPL</SelectItem>
                  <SelectItem value="nca-ecc">NCA ECC</SelectItem>
                  <SelectItem value="zatca">ZATCA</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="board">Board</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-notes">Additional Notes</Label>
              <Textarea
                id="pilot-notes"
                rows={3}
                {...pilotForm.register('notes')}
                placeholder="Specific challenges or requirements..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setPilotModalOpen(false)} className="flex-1" disabled={isSubmittingPilot}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]" disabled={isSubmittingPilot}>
                {isSubmittingPilot ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Start Pilot'
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
              <span>Continuous Readiness</span>
              <span>•</span>
              <span>Evidence Workflows</span>
              <span>•</span>
              <span>Saudi-Aligned Operations</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Managed Services
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              We run compliance and governance workloads through SOPs, controls, evidence capture, and reporting—so your organization stays audit-ready while teams stay focused.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setProposalModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="managed_request_proposal"
              >
                Request a Managed Proposal
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setPilotModalOpen(true)}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="managed_start_pilot"
              >
                Start a 30-Day Pilot
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => window.location.href = '/deliverables'}
                className="text-white hover:bg-white/10"
                data-cta="managed_view_samples"
              >
                View Sample Deliverables
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
            Most Compliance Gaps Are Operational, Not Strategic
          </h2>

          <div className="max-w-3xl mx-auto mb-12">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <span>Policies exist but aren't executed consistently</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <span>Evidence collection happens late (during audits)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <span>Ownership is unclear across teams</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <span>Reporting cadence is missing</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-2xl text-gray-900 max-w-3xl mx-auto border-l-4 border-[#C9A227] pl-6 italic font-medium">
            Managed services turn compliance into a routine—not a crisis.
          </p>
        </div>
      </section>

      {/* SECTION 3: WHAT WE RUN */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            What We Operate
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Compliance Operations</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Compliance calendar</li>
                <li>• Evidence capture workflows</li>
                <li>• Recurring reporting</li>
              </ul>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Governance Operations</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Decision rights + approvals</li>
                <li>• Board/committee reporting support</li>
                <li>• Policy lifecycle tracking</li>
              </ul>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Risk Operations</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Risk register updates</li>
                <li>• KRIs monitoring</li>
                <li>• Issue tracking</li>
              </ul>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Assurance Support</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Audit coordination</li>
                <li>• Control testing support</li>
                <li>• Evidence readiness</li>
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
              Discuss Your Operating Model
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4: MANAGED SERVICES CATALOG */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Managed Service Lines
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'GRC Support Center',
                bestFor: 'Continuous compliance & risk operations',
                included: ['Compliance calendar & evidence workflows', 'Risk register & KRI monitoring', 'Board reporting support'],
                link: '/managed-services/grc-support-center'
              },
              {
                title: 'Tax/VAT/ZATCA Operations',
                bestFor: 'E-invoicing & tax compliance cadence',
                included: ['ZATCA e-invoicing operations', 'VAT return preparation & filing', 'Tax record management'],
                link: '/managed-services/tax-vat-zatca-operations'
              },
              {
                title: 'Payroll & HR Operations',
                bestFor: 'GOSI, end-of-service, WPS compliance',
                included: ['Payroll processing & GOSI filing', 'End-of-service calculation', 'WPS compliance & reporting'],
                link: '/managed-services/payroll-hr-operations'
              },
              {
                title: 'Accounting & Bookkeeping',
                bestFor: 'Month-end close & financial reporting',
                included: ['Transaction recording & reconciliation', 'Month-end close & reporting', 'Chart of accounts management'],
                link: '/managed-services/accounting-bookkeeping'
              },
              {
                title: 'Vendor Management',
                bestFor: 'Third-party risk & contract governance',
                included: ['Vendor onboarding & due diligence', 'Contract lifecycle tracking', 'Performance & compliance monitoring'],
                link: '/managed-services/vendor-management'
              },
              {
                title: 'Build–Operate–Transfer (BOT)',
                bestFor: 'Build function, operate, then transfer',
                included: ['Function design & setup', 'Steady-state operations', 'Knowledge transfer & handover'],
                link: '/managed-services/build-operate-transfer'
              },
            ].map((service, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-sm text-[#C9A227] mb-4 font-medium">Best for: {service.bestFor}</p>
                
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-700 mb-2">What's included:</p>
                  <ul className="space-y-2">
                    {service.included.map((item, i) => (
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
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setProposalModalOpen(true)}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                    data-cta="managed_request_proposal"
                  >
                    Request proposal
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            How Managed Delivery Works
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Pilot → Steady State → Scale
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-[#C9A227]/30">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Step 1: 30-Day Pilot</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Baseline maturity + workflow setup</li>
                <li>• Define cadence + reporting</li>
                <li>• Implement evidence routines</li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-[#C9A227]/30">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Step 2: Steady-State Operations</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Monthly/weekly routines</li>
                <li>• Dashboards + reporting</li>
                <li>• Continuous readiness</li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-[#C9A227]/30">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Step 3: Scale or Transfer</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Expand scope (functions/locations)</li>
                <li>• BOT transfer with training</li>
                <li>• Governance handover</li>
              </ul>
            </Card>
          </div>

          {/* What you get every month */}
          <Card className="max-w-4xl mx-auto p-8 border-2 bg-gradient-to-br from-[#C9A227]/5 to-white">
            <h3 className="text-xl font-bold mb-6 text-gray-900 text-center">What You Get Every Month</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Status report',
                'Evidence readiness tracker',
                'Risks/issues log',
                'Next actions'
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
            Governed Operations, Accelerated by Workflows
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">SOPs + Controls</h3>
              <p className="text-gray-600">
                Repeatable procedures with built-in controls, ownership, and checkpoints.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Workflow className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Aliph Brain Workflows</h3>
              <p className="text-gray-600">
                Faster documentation, tracking, and reporting through governed generation.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Security & Sovereignty Patterns</h3>
              <p className="text-gray-600">
                Controlled handling with data minimization, access control, and audit trails.
              </p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/aliph-brain'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              See the Aliph Brain
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
            >
              Security & Sovereignty
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHO THIS IS FOR */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Designed for Teams That Need Execution Capacity
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'SMEs scaling fast',
              'Giga-project vendors',
              'Enterprise teams with audit pressure',
              'New compliance functions building maturity'
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
            Operational Outputs You Can Expect
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">Compliance Calendar</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Weekly/monthly task scheduling with ownership, due dates, and completion tracking.
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  View sample
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">Evidence Checklist</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Structured requirements mapped to your artifacts with completeness status.
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  View sample
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="p-6 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#C9A227] mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900">Monthly Reporting Pack</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Status dashboards, risk heat maps, and action items formatted for leadership.
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>
              <div className="p-4 bg-gray-100 border-t">
                <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  View sample
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
              Request Sample Outputs
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Turn Compliance Into Routine
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start with a 30-day pilot or request a managed proposal. We'll scope the cadence, deliverables, and reporting model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              onClick={() => setPilotModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              data-cta="managed_start_pilot"
            >
              Start a 30-Day Pilot
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setProposalModalOpen(true)}
              className="border-white/30 text-white hover:bg-white/10"
              data-cta="managed_request_proposal"
            >
              Request a Managed Proposal
            </Button>
          </div>
          <div className="flex gap-6 justify-center text-sm">
            <a href="/deliverables" className="text-gray-300 hover:text-[#C9A227] transition-colors">
              View Sample Deliverables
            </a>
            <a href="/technology/security-sovereignty" className="text-gray-300 hover:text-[#C9A227] transition-colors">
              Speak to an Architect
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Is this outsourcing or governed managed execution?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                This is governed managed execution. We operate through SOPs, controls, evidence workflows, and reporting cadences—not unstructured task delivery. You retain oversight and governance; we run the operations with audit readiness built in.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you replace internal teams?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We augment internal teams or operate functions that don't yet exist. Many engagements involve working alongside your compliance, finance, or HR teams—providing capacity, specialized skills, or operational discipline during peak periods or growth phases.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you handle evidence and audits?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Evidence capture is built into operational workflows. We maintain evidence trackers, coordinate audit requests, and prepare audit-ready documentation packs. During audits, we support your team with evidence retrieval and response coordination.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can we start with one function?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. Most clients start with a single service line (e.g., GRC Support Center or ZATCA operations) as a 30-day pilot. Once proven, you can expand to additional functions or scale across locations. We support modular adoption.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you report progress?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You receive monthly status reports covering: completed tasks, evidence readiness status, open risks/issues, and next-period actions. Reporting cadence and format are defined during pilot setup and can be customized to your governance needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can you run this under strict data requirements?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. We support deployment patterns for stricter environments, including data boundary controls, enhanced logging, and on-premise or private cloud configurations. We can discuss specific sovereignty or confidentiality requirements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

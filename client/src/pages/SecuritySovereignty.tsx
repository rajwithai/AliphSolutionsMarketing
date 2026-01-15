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
import { Shield, Lock, Eye, FileText, CheckCircle2, AlertTriangle, Database, Users, ArrowRight, Network, Server, Cloud, Loader2 } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';
import useSEO from '@/hooks/useSEO';

// Architect form validation schema
const architectFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required').max(200),
  role: z.string().min(2, 'Role is required').max(100),
  environment: z.string().min(1, 'Please select an environment'),
  focus: z.string().min(1, 'Please select a focus area'),
  notes: z.string().optional(),
});

// Brief form validation schema
const briefFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required').max(200),
  role: z.string().min(2, 'Role is required').max(100),
  sector: z.string().min(1, 'Please select a sector'),
  primaryInterest: z.string().min(1, 'Please select a primary interest'),
  ndaNeeded: z.boolean(),
});

type ArchitectFormData = z.infer<typeof architectFormSchema>;
type BriefFormData = z.infer<typeof briefFormSchema>;

export default function SecuritySovereignty() {
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
    resolver: zodResolver(architectFormSchema),
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
    resolver: zodResolver(briefFormSchema),
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
        setArchitectError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setArchitectSubmitted(true);
    } catch (error) {
      setArchitectError('An unexpected error occurred. Please try again.');
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
        setBriefError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setBriefSubmitted(true);
    } catch (error) {
      setBriefError('An unexpected error occurred. Please try again.');
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
        title="Request Received!"
        message="We'll respond with available times for your architecture walkthrough within 24-48 hours."
        buttonText="Close"
      />

      <SuccessModal
        open={briefSubmitted}
        onClose={() => {
          setBriefSubmitted(false);
          briefForm.reset();
        }}
        title="Security Brief Request Received!"
        message="We'll send your security brief (PDF) within 24-48 hours."
        buttonText="Close"
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
            <DialogTitle className="text-2xl">Schedule Architecture Call</DialogTitle>
            <DialogDescription>
              Discuss your environment and sovereignty requirements with our architects.
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
                  {architectForm.formState.errors.name ? architectForm.formState.errors.name.message : 'Name *'}
                </Label>
                <Input
                  id="arch-name"
                  {...architectForm.register('name')}
                  className={architectForm.formState.errors.name ? 'border-red-500' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arch-email" className={architectForm.formState.errors.email ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.email ? architectForm.formState.errors.email.message : 'Email *'}
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
                  {architectForm.formState.errors.company ? architectForm.formState.errors.company.message : 'Company *'}
                </Label>
                <Input
                  id="arch-company"
                  {...architectForm.register('company')}
                  className={architectForm.formState.errors.company ? 'border-red-500' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arch-role" className={architectForm.formState.errors.role ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.role ? architectForm.formState.errors.role.message : 'Role *'}
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
                  {architectForm.formState.errors.environment ? architectForm.formState.errors.environment.message : 'Environment *'}
                </Label>
                <Select
                  value={architectEnvironment}
                  onValueChange={(value) => architectForm.setValue('environment', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="arch-environment" className={architectForm.formState.errors.environment ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Secure</SelectItem>
                    <SelectItem value="private">Private Environment</SelectItem>
                    <SelectItem value="on-prem">Edge / On-Prem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="arch-focus" className={architectForm.formState.errors.focus ? 'text-red-500' : ''}>
                  {architectForm.formState.errors.focus ? architectForm.formState.errors.focus.message : 'Focus Area *'}
                </Label>
                <Select
                  value={architectFocus}
                  onValueChange={(value) => architectForm.setValue('focus', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="arch-focus" className={architectForm.formState.errors.focus ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-governance">AI Governance</SelectItem>
                    <SelectItem value="pdpl">PDPL Compliance</SelectItem>
                    <SelectItem value="nca-ecc">NCA ECC</SelectItem>
                    <SelectItem value="zatca">ZATCA</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arch-notes">Additional Notes</Label>
              <Textarea
                id="arch-notes"
                rows={3}
                {...architectForm.register('notes')}
                placeholder="Specific requirements, security concerns, or questions..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setArchitectModalOpen(false)} className="flex-1" disabled={isSubmittingArchitect}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]" disabled={isSubmittingArchitect}>
                {isSubmittingArchitect ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Request Architecture Call'
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
              <span>Sovereign-by-Design</span>
              <span>•</span>
              <span>Audit-Ready</span>
              <span>•</span>
              <span>Built for Regulated Environments</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Security & Sovereignty
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
              AI speed with sovereignty, control, and auditability—designed for Saudi GRC delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setArchitectModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="speak_to_architect"
              >
                Speak to an Architect
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('brief-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="request_security_brief"
              >
                Request Security Brief (PDF)
              </Button>
            </div>

            <a
              href="/deliverables"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
              data-cta="view_sample_deliverables"
            >
              View Sample Deliverables
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
            Most AI risk isn't malicious. It's invisible.
          </h2>

          <div className="max-w-3xl mx-auto mb-12">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>Uncontrolled data sharing with public AI tools</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>Lack of audit trail for decisions and outputs</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>Unclear retention policies and access controls</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>Accountability still applies—even when AI is involved</span>
              </li>
            </ul>
          </div>

          <Card className="bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white p-8 border-2 border-[#C9A227] max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <Shield className="w-12 h-12 text-[#C9A227] flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Sovereignty isn't a slogan. It's a design requirement.</h3>
                <p className="text-gray-300 text-lg">
                  For organizations operating under Saudi regulation, control over data, processes, and audit trails isn't optional.
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
            Sovereign-by-Design Principles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: 'Data Minimization',
                description: 'Only necessary data enters workflows. Limit exposure by design, not policy alone.'
              },
              {
                icon: Eye,
                title: 'Privacy Controls',
                description: 'Masking and redaction patterns for sensitive content. Control what AI systems see.'
              },
              {
                icon: Lock,
                title: 'Policy Enforcement',
                description: 'RBAC, approval gates, and allowed actions enforced at the workflow layer.'
              },
              {
                icon: FileText,
                title: 'Traceability',
                description: 'Audit logs capture every step. Versioning tracks changes. Evidence is built in.'
              },
              {
                icon: Network,
                title: 'Separation of Concerns',
                description: 'Data, workflows, and outputs remain logically separated for control and security.'
              },
              {
                icon: Server,
                title: 'Model Independence',
                description: 'Avoid vendor lock-in. Adapt as national AI ecosystems evolve and mature.'
              },
            ].map((principle, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
                <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C9A227]/20 transition-colors">
                  <principle.icon className="w-8 h-8 text-[#C9A227]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ARCHITECTURE OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            The Sovereign Workflow Layer
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            How data moves through controlled, auditable processes
          </p>

          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-2 items-center">
              {[
                { label: 'Client Content', icon: Users },
                { label: 'Ingestion', icon: Database },
                { label: 'Privacy Layer', icon: Shield },
                { label: 'Policy Engine', icon: Lock },
                { label: 'Workflow', icon: Network },
                { label: 'Validation', icon: CheckCircle2 },
                { label: 'Outputs', icon: FileText },
                { label: 'Audit Log', icon: Eye },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#C9A227]/30 text-center hover:border-[#C9A227] transition-all">
                    <step.icon className="w-6 h-6 mx-auto mb-1 text-[#C9A227]" />
                    <p className="text-xs font-semibold text-gray-900">{step.label}</p>
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
              <h3 className="text-2xl font-bold mb-4 text-gray-900">What This Enables</h3>
              <ul className="space-y-3">
                {[
                  'Speed without sacrificing control',
                  'Full visibility into data handling',
                  'Evidence-ready outputs for audit',
                  'Compliance with Saudi regulations',
                  'Scalable, repeatable processes'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Key Distinction</h3>
              <p className="text-gray-700">
                Unlike public AI tools, every step in Aliph workflows is logged, controlled, and auditable. Data doesn't leave your control boundary without explicit authorization.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: DEPLOYMENT PATTERNS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Deployment Patterns
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Flexible architectures to match your environment and requirements
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Cloud className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Pattern A: Standard Secure Delivery</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Controlled workspace environment</li>
                <li>• Role-based access controls</li>
                <li>• Evidence-ready outputs</li>
                <li>• Standard audit logging</li>
              </ul>
              <p className="text-sm text-gray-600 italic">Best for: Most enterprise and SME engagements</p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Pattern B: Private Environment</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Private boundary for workflows</li>
                <li>• Enhanced logging and monitoring</li>
                <li>• Custom policy enforcement</li>
                <li>• Stricter data controls</li>
              </ul>
              <p className="text-sm text-gray-600 italic">Best for: Government, regulated industries, high-sensitivity data</p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Pattern C: Edge / On-Prem</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Highest sensitivity environments</li>
                <li>• Can be structured for on-premises</li>
                <li>• Full infrastructure control</li>
                <li>• Use-case dependent feasibility</li>
              </ul>
              <p className="text-sm text-gray-600 italic">Best for: Critical infrastructure, classified data environments</p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => setArchitectModalOpen(true)}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              data-cta="schedule_architecture_call"
            >
              Discuss Your Environment
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 6: AUDITABILITY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Auditability & Evidence Readiness
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Built-in transparency for governance and assurance
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              { label: 'Audit Logs', description: 'Every action captured with timestamp and actor' },
              { label: 'Versioning', description: 'Track changes across documents and workflows' },
              { label: 'Ownership Mapping', description: 'Clear accountability for every output' },
              { label: 'Evidence Checklist', description: 'Pre-built formats for regulator needs' },
              { label: 'Implementation Roadmap', description: 'Timeline and milestone tracking' },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center border-2 hover:border-[#C9A227] transition-all">
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#C9A227]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>

          <Card className="bg-amber-50 border-2 border-amber-300 p-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 text-amber-700 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Designed for Governance</h3>
                <p className="text-amber-800">
                  Outputs are designed for governance and assurance—not just readability. Every deliverable includes the evidence trail auditors and regulators expect.
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
            Privacy Posture (PDPL-Era Expectations)
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            General principles aligned with Saudi data protection requirements
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                title: 'Data Minimization',
                description: 'Workflows are designed to collect and process only what\'s necessary for the defined purpose.'
              },
              {
                title: 'Access Control',
                description: 'Role-based permissions ensure only authorized individuals can access sensitive data.'
              },
              {
                title: 'Purpose Limitation',
                description: 'Data used in workflows is restricted to the stated compliance or advisory purpose.'
              },
              {
                title: 'Retention Considerations',
                description: 'Clear policies on how long data is retained and when it\'s securely disposed.'
              },
              {
                title: 'Secure Handling',
                description: 'Encryption in transit and at rest. Secure transfer protocols for all data movement.'
              },
              {
                title: 'Transparency',
                description: 'Clear documentation of how data flows through workflows and who has access.'
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center space-x-4">
            <a href="/legal/privacy" className="text-[#C9A227] hover:text-[#B8921F] font-medium">
              Read Our Privacy Policy
            </a>
            <span className="text-gray-400">•</span>
            <a href="/security" className="text-[#C9A227] hover:text-[#B8921F] font-medium">
              View Security Standards
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 8: REQUEST SECURITY BRIEF */}
      <section id="security-brief" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Request Security Brief
            </h2>
            <p className="text-xl text-gray-600">
              Get a detailed PDF covering our security architecture and deployment options
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
                    {briefForm.formState.errors.name ? briefForm.formState.errors.name.message : 'Full Name *'}
                  </Label>
                  <Input
                    id="brief-name"
                    {...briefForm.register('name')}
                    className={briefForm.formState.errors.name ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brief-email" className={briefForm.formState.errors.email ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.email ? briefForm.formState.errors.email.message : 'Work Email *'}
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
                    {briefForm.formState.errors.company ? briefForm.formState.errors.company.message : 'Company *'}
                  </Label>
                  <Input
                    id="brief-company"
                    {...briefForm.register('company')}
                    className={briefForm.formState.errors.company ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brief-role" className={briefForm.formState.errors.role ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.role ? briefForm.formState.errors.role.message : 'Role *'}
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
                    {briefForm.formState.errors.sector ? briefForm.formState.errors.sector.message : 'Sector *'}
                  </Label>
                  <Select value={briefSector} onValueChange={(value) => briefForm.setValue('sector', value, { shouldValidate: true })}>
                    <SelectTrigger id="brief-sector" className={briefForm.formState.errors.sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="giga">Giga Vendor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brief-interest" className={briefForm.formState.errors.primaryInterest ? 'text-red-500' : ''}>
                    {briefForm.formState.errors.primaryInterest ? briefForm.formState.errors.primaryInterest.message : 'Primary Interest *'}
                  </Label>
                  <Select value={briefPrimaryInterest} onValueChange={(value) => briefForm.setValue('primaryInterest', value, { shouldValidate: true })}>
                    <SelectTrigger id="brief-interest" className={briefForm.formState.errors.primaryInterest ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="architecture">Architecture Overview</SelectItem>
                      <SelectItem value="deployment">Deployment Patterns</SelectItem>
                      <SelectItem value="compliance">Compliance & Audit</SelectItem>
                      <SelectItem value="privacy">Privacy Controls</SelectItem>
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
                <label htmlFor="brief-nda" className="text-sm cursor-pointer">NDA Required</label>
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
                    Submitting...
                  </>
                ) : (
                  'Request Brief'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                We do not sell or share your data. Requests are reviewed to ensure secure distribution.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* SECTION 9: ARCHITECT CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Speak to an Architect
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Discuss your environment, security requirements, and deployment options
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setArchitectModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              data-cta="schedule_architecture_call"
            >
              Schedule Architecture Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/deliverables'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Request Secure Deliverables
            </Button>
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
                Where is data stored?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                For most engagements, data remains in controlled environments with clear boundaries. For government or high-sensitivity cases, we can discuss private or on-premises patterns that meet your requirements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can this work in strict environments?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. Our architecture can be structured to support private environments and, in specific cases, edge or on-premises deployment. We'll work with your security team to validate feasibility.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What's included in audit logs?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Logs capture user actions, data access events, workflow execution steps, output generation, and version changes. All entries include timestamps and actor identification for full traceability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you prevent data leakage?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Through a combination of data minimization, access controls, masking/redaction for sensitive content, policy enforcement at the workflow layer, and continuous monitoring with alert thresholds.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Are you locked into specific AI vendors or models?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                No. Our architecture is designed for model independence. As Saudi AI ecosystems evolve and mature, we can adapt without rebuilding core workflows or forcing vendor lock-in.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can you sign an NDA for architecture discussions?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. We routinely sign mutual NDAs for architecture walkthroughs and security briefings, especially for government and large enterprise engagements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

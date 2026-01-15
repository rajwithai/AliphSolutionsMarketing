import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { FileText, Shield, CheckCircle2, Lock, Download, Eye, ArrowRight, Sparkles, Filter, Loader2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import SuccessModal from '@/components/SuccessModal';

interface DeliverablePackType {
  id: string;
  title: string;
  category: string;
  audience: string[];
  preview: string[];
  description: string;
  badge?: string;
}

const deliverablePacks: DeliverablePackType[] = [
  {
    id: 'pdpl',
    title: 'PDPL Readiness Pack',
    category: 'Regulation',
    audience: ['Enterprise', 'SME'],
    badge: 'Popular',
    description: 'Complete data protection compliance framework',
    preview: [
      'Policy suite map (21 policies)',
      'Operating roles outline (DPO, processors)',
      'Roadmap template (redacted milestones)',
      'Breach response plan structure',
      'Data inventory format',
      'Rights request workflow'
    ]
  },
  {
    id: 'nca-ecc',
    title: 'NCA ECC Readiness Pack',
    category: 'Regulation',
    audience: ['Enterprise', 'Government'],
    badge: 'New',
    description: 'Essential Cybersecurity Controls compliance suite',
    preview: [
      'Controls mapping structure (114 controls)',
      'Evidence pack template (redacted)',
      'Remediation plan format',
      'Assessment methodology',
      'Domain-by-domain roadmap',
      'Certification prep checklist'
    ]
  },
  {
    id: 'zatca',
    title: 'ZATCA Compliance Operations Pack',
    category: 'Regulation',
    audience: ['Enterprise', 'SME'],
    description: 'Tax compliance and e-invoicing framework',
    preview: [
      'Operating cadence (monthly/quarterly)',
      'Process control map',
      'Records readiness checklist structure',
      'E-invoicing integration checklist',
      'Audit trail requirements',
      'Exception handling procedures'
    ]
  },
  {
    id: 'governance',
    title: 'Corporate Governance Pack',
    category: 'Governance',
    audience: ['Enterprise'],
    badge: 'Popular',
    description: 'Board-ready governance documentation suite',
    preview: [
      'Delegation of Authority (DoA) structure',
      'Committee charter structures',
      'Reporting pack outline',
      'Conflict of interest policy format',
      'Board meeting cadence',
      'Escalation protocols'
    ]
  },
  {
    id: 'erm',
    title: 'ERM Foundation Pack',
    category: 'Risk',
    audience: ['Enterprise', 'Government'],
    description: 'Enterprise risk management framework',
    preview: [
      'Risk taxonomy and appetite outline',
      'Risk register structure',
      'KRI catalog format',
      'Three lines of defense model',
      'Risk committee charter',
      'Risk reporting dashboard structure'
    ]
  },
  {
    id: 'internal-audit',
    title: 'Internal Audit Enablement Pack',
    category: 'Audit',
    audience: ['Enterprise', 'Government'],
    description: 'Complete internal audit function setup',
    preview: [
      'IA charter structure',
      'Annual plan format (risk-based)',
      'Reporting templates (redacted)',
      'Workpaper standards',
      'Issue tracking system',
      'Quality assurance framework'
    ]
  },
  {
    id: 'ai-governance',
    title: 'AI Governance Pack',
    category: 'Governance',
    audience: ['Enterprise', 'SME'],
    badge: 'New',
    description: 'Sovereign AI governance and control framework',
    preview: [
      'AI policy structure',
      'Roles & approvals model',
      'Audit logging checklist',
      'Model risk assessment format',
      'Data minimization controls',
      'AI ethics framework'
    ]
  },
  {
    id: 'vendor-risk',
    title: 'Vendor / Third-Party Risk Pack',
    category: 'Risk',
    audience: ['Enterprise', 'Government', 'Giga'],
    description: 'Third-party risk management framework',
    preview: [
      'Assessment structure (tiered)',
      'Onboarding controls checklist',
      'Monitoring cadence',
      'Contract requirements template',
      'Exit management procedures',
      'Vendor scorecard format'
    ]
  },
];

const requestFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100),
  role: z.string().min(2, 'Role must be at least 2 characters').max(100),
  sector: z.string().min(1, 'Please select a sector'),
  timeline: z.string().min(1, 'Please select a timeline'),
  primaryNeeds: z.array(z.string()).min(1, 'Please select at least one need'),
  ndaRequired: z.boolean().optional(),
  readinessCall: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
});

type RequestFormData = z.infer<typeof requestFormSchema>;

export default function Deliverables() {
  useSEO({
    title: 'Sample Deliverables | Aliph Solutions',
    description: 'Preview audit-ready Saudi GRC deliverables—PDPL, NCA ECC, ZATCA, governance, ERM, and internal audit. Request sample packs with secure access.',
    keywords: 'GRC deliverables, PDPL templates, NCA ECC samples, ZATCA compliance, governance templates, Saudi Arabia',
  });

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedPack, setSelectedPack] = useState<DeliverablePackType | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const requestForm = useForm<RequestFormData>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      sector: '',
      timeline: '',
      primaryNeeds: [],
      ndaRequired: false,
      readinessCall: false,
      notes: '',
    },
  });

  const sector = requestForm.watch('sector');
  const timeline = requestForm.watch('timeline');
  const primaryNeeds = requestForm.watch('primaryNeeds');
  const ndaRequired = requestForm.watch('ndaRequired');
  const readinessCall = requestForm.watch('readinessCall');

  const categories = ['All', 'Regulation', 'Governance', 'Risk', 'Audit'];

  const filteredPacks = deliverablePacks.filter(pack => 
    selectedFilter === 'All' || pack.category === selectedFilter
  );

  const handlePreview = (pack: DeliverablePackType) => {
    setSelectedPack(pack);
    setPreviewModalOpen(true);
  };

  const handleRequestAccess = (packId?: string) => {
    if (packId && selectedPack) {
      // Pre-select the pack in form if coming from preview modal
      document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });
      setPreviewModalOpen(false);
    } else {
      document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (data: RequestFormData) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formType: 'Sample Deliverables Request',
          primaryNeeds: data.primaryNeeds.join(', '),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setFormSubmitted(true);
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SuccessModal
        open={formSubmitted}
        onClose={() => {
          setFormSubmitted(false);
          requestForm.reset();
        }}
        title="Request Received!"
        message="We'll respond with a secure preview link and next steps within 24 hours."
        buttonText="Close"
      />

      {/* Preview Modal */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedPack?.title}</DialogTitle>
            <DialogDescription>{selectedPack?.description}</DialogDescription>
          </DialogHeader>
          
          {selectedPack && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Preview Images/Placeholders */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 border-2 border-gray-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/20 rounded-full blur-3xl"></div>
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-3 bg-gray-300 rounded" style={{ width: `${90 - i * 10}%` }}></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/40 flex items-center justify-center">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <Lock className="w-4 h-4 mr-2" />
                      Preview Redacted
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 border-2 border-gray-300">
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-2 bg-gray-300 rounded" style={{ width: `${80 - i * 15}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right: TOC and Details */}
              <div>
                <h3 className="font-bold text-lg mb-4">Preview Includes:</h3>
                <ul className="space-y-2 mb-6">
                  {selectedPack.preview.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-amber-900">
                    <strong>What you receive in full pack:</strong><br />
                    Complete, unredacted templates ready for implementation with your organization details. Includes all supporting worksheets, checklists, and evidence formats.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#C9A227] hover:bg-[#B8921F]"
                    onClick={() => handleRequestAccess(selectedPack.id)}
                    data-cta="deliverables_request_full_sample"
                  >
                    Request Secure Access
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/company/contact'}
                    data-cta="deliverables_book_call"
                  >
                    Book a Readiness Call
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* SECTION 1: HERO */}
      <section className="relative py-20 bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
                <span>Audit-Ready</span>
                <span>•</span>
                <span>Implementation-First</span>
                <span>•</span>
                <span>Saudi-Aligned</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Sample Deliverables — Built for Saudi Regulation
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Preview the structure and quality of Aliph outputs. Full packs are shared securely based on your sector and need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  size="lg"
                  onClick={() => handleRequestAccess()}
                  className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                  data-cta="deliverables_request_access"
                >
                  Request Sample Access
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/company/contact'}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Book a Readiness Call
                </Button>
              </div>
              
              <p className="text-sm text-gray-400">
                <Lock className="w-4 h-4 inline mr-1" />
                Optional NDA available. Samples are shared with secure access.
              </p>
            </div>
            
            {/* Document Stack Visual */}
            <div className="relative">
              <div className="relative">
                {[
                  { label: 'Policy Suite', offset: '0', color: 'from-blue-500 to-blue-600' },
                  { label: 'Controls Mapping', offset: '12', color: 'from-indigo-500 to-indigo-600' },
                  { label: 'Evidence Pack', offset: '24', color: 'from-purple-500 to-purple-600' },
                  { label: 'Roadmap', offset: '36', color: 'from-[#C9A227] to-[#B8921F]' },
                ].map((doc, idx) => (
                  <div 
                    key={idx}
                    className={`absolute w-64 h-80 bg-gradient-to-br ${doc.color} rounded-lg shadow-2xl transform transition-transform hover:scale-105`}
                    style={{ 
                      top: `${doc.offset}px`,
                      left: `${idx * 20}px`,
                      zIndex: 4 - idx,
                      rotate: `${idx * 3}deg`
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-6 h-6" />
                        <span className="font-bold">{doc.label}</span>
                      </div>
                      <div className="space-y-2 opacity-70">
                        {[1, 2, 3, 4, 5].map((line) => (
                          <div key={line} className="h-2 bg-white/30 rounded" style={{ width: `${90 - line * 10}%` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT'S INCLUDED */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            What's Included in the Preview
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Table of Contents + Structure</h3>
              <p className="text-gray-600">
                Shows headings, sections, implementation approach, and overall framework architecture.
              </p>
            </Card>
            
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Sample Pages (Redacted)</h3>
              <p className="text-gray-600">
                Demonstrates writing quality, format standards, and professional presentation level.
              </p>
            </Card>
            
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Delivery Checklist</h3>
              <p className="text-gray-600">
                Owners, timelines, evidence checkpoints, and implementation milestones.
              </p>
            </Card>
          </div>
          
          <Card className="bg-amber-50 border-2 border-amber-300 p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-amber-900 mb-2">IP Protection Policy</h4>
                <p className="text-amber-800">
                  We don't publish full templates openly. Regulated-ready outputs are shared securely to protect your organization and our IP.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 3: DELIVERABLE LIBRARY */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Deliverable Packs
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Select a pack to preview the structure and request secure access
          </p>
          
          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 flex-wrap justify-center">
            <Filter className="w-5 h-5 text-gray-500" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === category
                    ? 'bg-[#C9A227] text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#C9A227]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPacks.map((pack) => (
              <Card key={pack.id} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#C9A227]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  {pack.badge && (
                    <Badge className="bg-[#C9A227] text-white">{pack.badge}</Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">{pack.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{pack.description}</p>
                
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">PREVIEW INCLUDES:</p>
                  <ul className="space-y-1">
                    {pack.preview.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                        <span className="text-[#C9A227] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {pack.preview.length > 3 && (
                      <li className="text-xs text-gray-500 italic">+ {pack.preview.length - 3} more</li>
                    )}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePreview(pack)}
                    data-cta="deliverables_preview_open"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]"
                    onClick={() => handleRequestAccess()}
                    data-cta="deliverables_request_access"
                  >
                    Request
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: DELIVERY STANDARDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            How Aliph Deliverables Are Built
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Every output follows a proven implementation methodology
          </p>
          
          {/* Workflow */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: 'Discover', icon: Sparkles },
                { label: 'Map', icon: FileText },
                { label: 'Build', icon: CheckCircle2 },
                { label: 'Validate', icon: Shield },
                { label: 'Evidence-Ready', icon: Download },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="p-4 text-center border-2 border-[#C9A227]/30 hover:border-[#C9A227] transition-all">
                    <step.icon className="w-8 h-8 mx-auto mb-2 text-[#C9A227]" />
                    <p className="text-sm font-semibold text-gray-900">{step.label}</p>
                  </Card>
                  {idx < 4 && (
                    <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A227]" />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Standards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Implementation owners & roles',
              'Evidence checkpoints for audit',
              'Change log format (versioning)',
              'Saudi-aligned language and structure',
            ].map((standard, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-700">{standard}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="/security" className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
              <Lock className="w-4 h-4" />
              View Security Standards
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: GATED REQUEST FORM */}
      <section id="request-form" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Request Sample Access
            </h2>
            <p className="text-xl text-gray-600">
              We'll share the most relevant preview set based on your sector and needs
            </p>
          </div>
          
          <Card className="p-8 border-2">
            <form onSubmit={requestForm.handleSubmit(handleSubmit)} className="space-y-6">
              {serverError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{serverError}</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={requestForm.formState.errors.name ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.name ? requestForm.formState.errors.name.message : 'Full Name *'}
                  </Label>
                  <Input
                    id="name"
                    {...requestForm.register('name')}
                    className={requestForm.formState.errors.name ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={requestForm.formState.errors.email ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.email ? requestForm.formState.errors.email.message : 'Work Email *'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...requestForm.register('email')}
                    className={requestForm.formState.errors.email ? 'border-red-500' : ''}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className={requestForm.formState.errors.company ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.company ? requestForm.formState.errors.company.message : 'Company *'}
                  </Label>
                  <Input
                    id="company"
                    {...requestForm.register('company')}
                    className={requestForm.formState.errors.company ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className={requestForm.formState.errors.role ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.role ? requestForm.formState.errors.role.message : 'Role/Title *'}
                  </Label>
                  <Input
                    id="role"
                    {...requestForm.register('role')}
                    className={requestForm.formState.errors.role ? 'border-red-500' : ''}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sector" className={requestForm.formState.errors.sector ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.sector ? requestForm.formState.errors.sector.message : 'Sector *'}
                  </Label>
                  <Select value={sector} onValueChange={(value) => requestForm.setValue('sector', value, { shouldValidate: true })}>
                    <SelectTrigger id="sector" className={requestForm.formState.errors.sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="telecom">Telecom</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="giga">Giga Vendor</SelectItem>
                      <SelectItem value="sme">SME/Startup</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline" className={requestForm.formState.errors.timeline ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.timeline ? requestForm.formState.errors.timeline.message : 'Timeline *'}
                  </Label>
                  <Select value={timeline} onValueChange={(value) => requestForm.setValue('timeline', value, { shouldValidate: true })}>
                    <SelectTrigger id="timeline" className={requestForm.formState.errors.timeline ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (0-30 days)</SelectItem>
                      <SelectItem value="30-90">30-90 days</SelectItem>
                      <SelectItem value="3-6">3-6 months</SelectItem>
                      <SelectItem value="exploring">Exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className={requestForm.formState.errors.primaryNeeds ? 'text-red-500' : ''}>
                  {requestForm.formState.errors.primaryNeeds ? requestForm.formState.errors.primaryNeeds.message : 'Primary Needs (select all that apply) *'}
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['PDPL', 'NCA ECC', 'ZATCA', 'Governance', 'ERM', 'Internal Audit', 'AI Governance', 'Vendor Risk'].map((need) => (
                    <div key={need} className="flex items-center space-x-2">
                      <Checkbox
                        id={need}
                        checked={primaryNeeds.includes(need)}
                        onCheckedChange={(checked) => {
                          const newNeeds = checked
                            ? [...primaryNeeds, need]
                            : primaryNeeds.filter(n => n !== need);
                          requestForm.setValue('primaryNeeds', newNeeds, { shouldValidate: true });
                        }}
                      />
                      <label htmlFor={need} className="text-sm cursor-pointer">{need}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nda"
                    checked={ndaRequired}
                    onCheckedChange={(checked) => requestForm.setValue('ndaRequired', checked as boolean)}
                  />
                  <label htmlFor="nda" className="text-sm cursor-pointer">NDA Required</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="call"
                    checked={readinessCall}
                    onCheckedChange={(checked) => requestForm.setValue('readinessCall', checked as boolean)}
                  />
                  <label htmlFor="call" className="text-sm cursor-pointer">I'd like a readiness call as well</label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  {...requestForm.register('notes')}
                  placeholder="Any specific requirements or questions..."
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D] text-lg"
                data-cta="deliverables_request_access"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Request Secure Access'
                )}
              </Button>
                
              
              <p className="text-xs text-gray-500 text-center">
                We do not sell or share your data. Requests are reviewed to ensure secure distribution.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* SECTION 6: SECONDARY CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a scoped proposal instead of samples?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Schedule Enterprise Demo
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/partnerships'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Request Government Partnership Proposal
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Why are samples gated?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our deliverables contain proprietary methodologies and Saudi-specific frameworks that represent significant IP. Gating ensures we share with serious prospects and protect both your organization's confidentiality and our competitive advantage.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can you sign an NDA?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. We routinely sign mutual NDAs, especially for government and large enterprise engagements. Simply check the NDA option in the request form and we'll send our standard template or review yours.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you customize per sector?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely. While our frameworks are sector-agnostic, we customize terminology, risk scenarios, and control examples for your industry (finance, energy, healthcare, etc.). Full deliverables include sector-specific case studies and implementation guidance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What is 'evidence-ready'?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Every deliverable includes built-in evidence collection formats, audit logs, and documentation standards that satisfy regulator requirements. You receive not just policies, but the proof system auditors expect.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How quickly can you share samples?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We typically respond within 24 hours with secure access links. For NDA requests or government partnerships, allow 2-3 business days for legal review and approval.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

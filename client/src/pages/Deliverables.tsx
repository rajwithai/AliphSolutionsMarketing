import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
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

const getDeliverablePacks = (t: any): DeliverablePackType[] => [
  {
    id: 'pdpl',
    title: t('deliverables.packs.pdpl.title'),
    category: t('deliverables.categories.regulation'),
    audience: [t('deliverables.audience.enterprise'), t('deliverables.audience.sme')],
    badge: t('deliverables.badges.popular'),
    description: t('deliverables.packs.pdpl.description'),
    preview: [
      t('deliverables.packs.pdpl.preview1'),
      t('deliverables.packs.pdpl.preview2'),
      t('deliverables.packs.pdpl.preview3'),
      t('deliverables.packs.pdpl.preview4'),
      t('deliverables.packs.pdpl.preview5'),
      t('deliverables.packs.pdpl.preview6')
    ]
  },
  {
    id: 'nca-ecc',
    title: t('deliverables.packs.ncaEcc.title'),
    category: t('deliverables.categories.regulation'),
    audience: [t('deliverables.audience.enterprise'), t('deliverables.audience.government')],
    badge: t('deliverables.badges.new'),
    description: t('deliverables.packs.ncaEcc.description'),
    preview: [
      t('deliverables.packs.ncaEcc.preview1'),
      t('deliverables.packs.ncaEcc.preview2'),
      t('deliverables.packs.ncaEcc.preview3'),
      t('deliverables.packs.ncaEcc.preview4'),
      t('deliverables.packs.ncaEcc.preview5'),
      t('deliverables.packs.ncaEcc.preview6')
    ]
  },
  {
    id: 'zatca',
    title: t('deliverables.packs.zatca.title'),
    category: t('deliverables.categories.regulation'),
    audience: [t('deliverables.audience.enterprise'), t('deliverables.audience.sme')],
    description: t('deliverables.packs.zatca.description'),
    preview: [
      t('deliverables.packs.zatca.preview1'),
      t('deliverables.packs.zatca.preview2'),
      t('deliverables.packs.zatca.preview3'),
      t('deliverables.packs.zatca.preview4'),
      t('deliverables.packs.zatca.preview5'),
      t('deliverables.packs.zatca.preview6')
    ]
  },
  {
    id: 'governance',
    title: t('deliverables.packs.governance.title'),
    category: t('deliverables.categories.governance'),
    audience: [t('deliverables.audience.enterprise')],
    badge: t('deliverables.badges.popular'),
    description: t('deliverables.packs.governance.description'),
    preview: [
      t('deliverables.packs.governance.preview1'),
      t('deliverables.packs.governance.preview2'),
      t('deliverables.packs.governance.preview3'),
      t('deliverables.packs.governance.preview4'),
      t('deliverables.packs.governance.preview5'),
      t('deliverables.packs.governance.preview6')
    ]
  },
  {
    id: 'erm',
    title: t('deliverables.packs.erm.title'),
    category: t('deliverables.categories.risk'),
    audience: [t('deliverables.audience.enterprise'), t('deliverables.audience.government')],
    description: t('deliverables.packs.erm.description'),
    preview: [
      t('deliverables.packs.erm.preview1'),
      t('deliverables.packs.erm.preview2'),
      t('deliverables.packs.erm.preview3'),
      t('deliverables.packs.erm.preview4'),
      t('deliverables.packs.erm.preview5'),
      t('deliverables.packs.erm.preview6')
    ]
  },
  {
    id: 'internal-audit',
    title: t('deliverables.packs.internalAudit.title'),
    category: t('deliverables.categories.audit'),
    audience: [t('deliverables.audience.enterprise'), t('deliverables.audience.government')],
    description: t('deliverables.packs.internalAudit.description'),
    preview: [
      t('deliverables.packs.internalAudit.preview1'),
      t('deliverables.packs.internalAudit.preview2'),
      t('deliverables.packs.internalAudit.preview3'),
      t('deliverables.packs.internalAudit.preview4'),
      t('deliverables.packs.internalAudit.preview5'),
      t('deliverables.packs.internalAudit.preview6')
    ]
  },
  {
    id: 'ai-governance',
    title: t('deliverables.packs.aiGovernance.title'),
    category: t('deliverables.categories.governance'),
    audience: [t('deliverables.audience.enterprise'), t('deliverables.audience.sme')],
    badge: t('deliverables.badges.new'),
    description: t('deliverables.packs.aiGovernance.description'),
    preview: [
      t('deliverables.packs.aiGovernance.preview1'),
      t('deliverables.packs.aiGovernance.preview2'),
      t('deliverables.packs.aiGovernance.preview3'),
      t('deliverables.packs.aiGovernance.preview4'),
      t('deliverables.packs.aiGovernance.preview5'),
      t('deliverables.packs.aiGovernance.preview6')
    ]
  },
  {
    id: 'vendor-risk',
    title: t('deliverables.packs.vendorRisk.title'),
    category: t('deliverables.categories.risk'),
    audience: [t('deliverables.audience.enterprise'), t('deliverables.audience.government'), t('deliverables.audience.giga')],
    description: t('deliverables.packs.vendorRisk.description'),
    preview: [
      t('deliverables.packs.vendorRisk.preview1'),
      t('deliverables.packs.vendorRisk.preview2'),
      t('deliverables.packs.vendorRisk.preview3'),
      t('deliverables.packs.vendorRisk.preview4'),
      t('deliverables.packs.vendorRisk.preview5'),
      t('deliverables.packs.vendorRisk.preview6')
    ]
  },
];

const requestFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(2).max(100),
  role: z.string().min(2).max(100),
  sector: z.string().min(1),
  timeline: z.string().min(1),
  primaryNeeds: z.array(z.string()).min(1),
  ndaRequired: z.boolean().optional(),
  readinessCall: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
});

type RequestFormData = z.infer<typeof requestFormSchema>;

export default function Deliverables() {
  const { t } = useTranslation();
  
  useSEO({
    title: 'Sample Deliverables | Aliph Solutions',
    description: 'Preview audit-ready Saudi GRC deliverables—PDPL, NCA ECC, ZATCA, governance, ERM, and internal audit. Request sample packs with secure access.',
    keywords: 'GRC deliverables, PDPL templates, NCA ECC samples, ZATCA compliance, governance templates, Saudi Arabia',
  });

  const [selectedFilter, setSelectedFilter] = useState<string>(t('deliverables.categories.all'));
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

  const deliverablePacks = getDeliverablePacks(t);
  
  const categories = [
    { key: 'all', label: t('deliverables.categories.all') },
    { key: 'regulation', label: t('deliverables.categories.regulation') },
    { key: 'governance', label: t('deliverables.categories.governance') },
    { key: 'risk', label: t('deliverables.categories.risk') },
    { key: 'audit', label: t('deliverables.categories.audit') }
  ];

  const filteredPacks = deliverablePacks.filter(pack => 
    selectedFilter === t('deliverables.categories.all') || pack.category === selectedFilter
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
        title={t('deliverables.successModal.title')}
        message={t('deliverables.successModal.message')}
        buttonText={t('deliverables.successModal.button')}
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
                      {t('deliverables.previewModal.redacted')}
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
                <h3 className="font-bold text-lg mb-4">{t('deliverables.previewModal.includesTitle')}</h3>
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
                    <strong>{t('deliverables.previewModal.fullPackTitle')}</strong><br />
                    {t('deliverables.previewModal.fullPackDesc')}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#C9A227] hover:bg-[#B8921F]"
                    onClick={() => handleRequestAccess(selectedPack.id)}
                    data-cta="deliverables_request_full_sample"
                  >
                    {t('deliverables.previewModal.requestBtn')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/company/contact'}
                    data-cta="deliverables_book_call"
                  >
                    {t('deliverables.previewModal.bookCallBtn')}
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
                <span>{t('deliverables.hero.badge1')}</span>
                <span>•</span>
                <span>{t('deliverables.hero.badge2')}</span>
                <span>•</span>
                <span>{t('deliverables.hero.badge3')}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t('deliverables.hero.title')}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {t('deliverables.hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  size="lg"
                  onClick={() => handleRequestAccess()}
                  className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                  data-cta="deliverables_request_access"
                >
                  {t('deliverables.hero.btnPrimary')}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/company/contact'}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {t('deliverables.hero.btnSecondary')}
                </Button>
              </div>
              
              <p className="text-sm text-gray-400">
                <Lock className="w-4 h-4 inline mr-1" />
                {t('deliverables.hero.ndaNote')}
              </p>
            </div>
            
            {/* Document Stack Visual */}
            <div className="relative">
              <div className="relative">
                {[
                  { label: t('deliverables.hero.doc1'), offset: '0', color: 'from-blue-500 to-blue-600' },
                  { label: t('deliverables.hero.doc2'), offset: '12', color: 'from-indigo-500 to-indigo-600' },
                  { label: t('deliverables.hero.doc3'), offset: '24', color: 'from-purple-500 to-purple-600' },
                  { label: t('deliverables.hero.doc4'), offset: '36', color: 'from-[#C9A227] to-[#B8921F]' },
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
            {t('deliverables.whatsIncluded.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('deliverables.whatsIncluded.card1Title')}</h3>
              <p className="text-gray-600">
                {t('deliverables.whatsIncluded.card1Desc')}
              </p>
            </Card>
            
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('deliverables.whatsIncluded.card2Title')}</h3>
              <p className="text-gray-600">
                {t('deliverables.whatsIncluded.card2Desc')}
              </p>
            </Card>
            
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('deliverables.whatsIncluded.card3Title')}</h3>
              <p className="text-gray-600">
                {t('deliverables.whatsIncluded.card3Desc')}
              </p>
            </Card>
          </div>
          
          <Card className="bg-amber-50 border-2 border-amber-300 p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-amber-900 mb-2">{t('deliverables.whatsIncluded.ipTitle')}</h4>
                <p className="text-amber-800">
                  {t('deliverables.whatsIncluded.ipDesc')}
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
            {t('deliverables.library.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            {t('deliverables.library.subtitle')}
          </p>
          
          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 flex-wrap justify-center">
            <Filter className="w-5 h-5 text-gray-500" />
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedFilter(category.label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === category.label
                    ? 'bg-[#C9A227] text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#C9A227]'
                }`}
              >
                {category.label}
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
                  <p className="text-xs font-semibold text-gray-500 mb-2">{t('deliverables.library.previewIncludes')}</p>
                  <ul className="space-y-1">
                    {pack.preview.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                        <span className="text-[#C9A227] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {pack.preview.length > 3 && (
                      <li className="text-xs text-gray-500 italic">{t('deliverables.library.moreItems', { count: pack.preview.length - 3 })}</li>
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
                    {t('deliverables.library.previewBtn')}
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]"
                    onClick={() => handleRequestAccess()}
                    data-cta="deliverables_request_access"
                  >
                    {t('deliverables.library.requestBtn')}
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
            {t('deliverables.standards.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('deliverables.standards.subtitle')}
          </p>
          
          {/* Workflow */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: t('deliverables.standards.step1'), icon: Sparkles },
                { label: t('deliverables.standards.step2'), icon: FileText },
                { label: t('deliverables.standards.step3'), icon: CheckCircle2 },
                { label: t('deliverables.standards.step4'), icon: Shield },
                { label: t('deliverables.standards.step5'), icon: Download },
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
              t('deliverables.standards.feature1'),
              t('deliverables.standards.feature2'),
              t('deliverables.standards.feature3'),
              t('deliverables.standards.feature4'),
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
              {t('deliverables.standards.securityLink')}
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
              {t('deliverables.form.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('deliverables.form.subtitle')}
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
                    {requestForm.formState.errors.name ? t('deliverables.form.errors.name') : t('deliverables.form.fields.name')}
                  </Label>
                  <Input
                    id="name"
                    {...requestForm.register('name')}
                    className={requestForm.formState.errors.name ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={requestForm.formState.errors.email ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.email ? t('common.invalidEmail') : t('deliverables.form.fields.email')}
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
                    {requestForm.formState.errors.company ? t('deliverables.form.errors.company') : t('deliverables.form.fields.company')}
                  </Label>
                  <Input
                    id="company"
                    {...requestForm.register('company')}
                    className={requestForm.formState.errors.company ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className={requestForm.formState.errors.role ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.role ? t('deliverables.form.errors.role') : t('deliverables.form.fields.role')}
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
                    {requestForm.formState.errors.sector ? t('deliverables.form.errors.sector') : t('deliverables.form.fields.sector')}
                  </Label>
                  <Select value={sector} onValueChange={(value) => requestForm.setValue('sector', value, { shouldValidate: true })}>
                    <SelectTrigger id="sector" className={requestForm.formState.errors.sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder={t('deliverables.form.placeholders.sector')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">{t('deliverables.form.sectors.finance')}</SelectItem>
                      <SelectItem value="energy">{t('deliverables.form.sectors.energy')}</SelectItem>
                      <SelectItem value="healthcare">{t('deliverables.form.sectors.healthcare')}</SelectItem>
                      <SelectItem value="telecom">{t('deliverables.form.sectors.telecom')}</SelectItem>
                      <SelectItem value="retail">{t('deliverables.form.sectors.retail')}</SelectItem>
                      <SelectItem value="government">{t('deliverables.form.sectors.government')}</SelectItem>
                      <SelectItem value="giga">{t('deliverables.form.sectors.giga')}</SelectItem>
                      <SelectItem value="sme">{t('deliverables.form.sectors.sme')}</SelectItem>
                      <SelectItem value="other">{t('deliverables.form.sectors.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline" className={requestForm.formState.errors.timeline ? 'text-red-500' : ''}>
                    {requestForm.formState.errors.timeline ? t('deliverables.form.errors.timeline') : t('deliverables.form.fields.timeline')}
                  </Label>
                  <Select value={timeline} onValueChange={(value) => requestForm.setValue('timeline', value, { shouldValidate: true })}>
                    <SelectTrigger id="timeline" className={requestForm.formState.errors.timeline ? 'border-red-500' : ''}>
                      <SelectValue placeholder={t('deliverables.form.placeholders.timeline')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">{t('deliverables.form.timelines.immediate')}</SelectItem>
                      <SelectItem value="30-90">{t('deliverables.form.timelines.month1to3')}</SelectItem>
                      <SelectItem value="3-6">{t('deliverables.form.timelines.month3to6')}</SelectItem>
                      <SelectItem value="exploring">{t('deliverables.form.timelines.exploring')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className={requestForm.formState.errors.primaryNeeds ? 'text-red-500' : ''}>
                  {requestForm.formState.errors.primaryNeeds ? t('deliverables.form.errors.primaryNeeds') : t('deliverables.form.fields.primaryNeeds')}
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: 'PDPL', label: t('deliverables.form.needs.pdpl') },
                    { key: 'NCA ECC', label: t('deliverables.form.needs.ncaEcc') },
                    { key: 'ZATCA', label: t('deliverables.form.needs.zatca') },
                    { key: 'Governance', label: t('deliverables.form.needs.governance') },
                    { key: 'ERM', label: t('deliverables.form.needs.erm') },
                    { key: 'Internal Audit', label: t('deliverables.form.needs.internalAudit') },
                    { key: 'AI Governance', label: t('deliverables.form.needs.aiGovernance') },
                    { key: 'Vendor Risk', label: t('deliverables.form.needs.vendorRisk') }
                  ].map((need) => (
                    <div key={need.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={need.key}
                        checked={primaryNeeds.includes(need.key)}
                        onCheckedChange={(checked) => {
                          const newNeeds = checked
                            ? [...primaryNeeds, need.key]
                            : primaryNeeds.filter(n => n !== need.key);
                          requestForm.setValue('primaryNeeds', newNeeds, { shouldValidate: true });
                        }}
                      />
                      <label htmlFor={need.key} className="text-sm cursor-pointer">{need.label}</label>
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
                  <label htmlFor="nda" className="text-sm cursor-pointer">{t('deliverables.form.fields.ndaRequired')}</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="call"
                    checked={readinessCall}
                    onCheckedChange={(checked) => requestForm.setValue('readinessCall', checked as boolean)}
                  />
                  <label htmlFor="call" className="text-sm cursor-pointer">{t('deliverables.form.fields.readinessCall')}</label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">{t('deliverables.form.fields.notes')}</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  {...requestForm.register('notes')}
                  placeholder={t('deliverables.form.placeholders.notes')}
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
                    {t('deliverables.form.submitting')}
                  </>
                ) : (
                  t('deliverables.form.submitBtn')
                )}
              </Button>
                
              
              <p className="text-xs text-gray-500 text-center">
                {t('deliverables.form.privacyNote')}
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* SECTION 6: SECONDARY CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('deliverables.secondaryCta.title')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              {t('deliverables.secondaryCta.btn1')}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/partnerships'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('deliverables.secondaryCta.btn2')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('deliverables.faq.title')}
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('deliverables.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('deliverables.faq.a1')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('deliverables.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('deliverables.faq.a2')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('deliverables.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('deliverables.faq.a3')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('deliverables.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('deliverables.faq.a4')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('deliverables.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('deliverables.faq.a5')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

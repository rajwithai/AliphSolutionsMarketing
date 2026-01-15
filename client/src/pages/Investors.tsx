import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { TrendingUp, Shield, Zap, CheckCircle2, ArrowRight, Brain, Lock, Loader2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import SuccessModal from '@/components/SuccessModal';
import vision2030Logo from '@assets/vision2030.png';

const deckFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  entity: z.string().min(2, 'Fund/Entity must be at least 2 characters').max(100),
  role: z.string().min(2, 'Role must be at least 2 characters').max(100),
  focus: z.string().min(1, 'Please select investment focus'),
  interests: z.array(z.string()).optional(),
  ndaRequested: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
});

type DeckFormData = z.infer<typeof deckFormSchema>;

export default function Investors() {
  useSEO({
    title: 'Investors | Aliph Solutions',
    description: 'Aliph Solutions is building a sovereign-by-design AI advisory engine for Saudi GRC—combining consulting-grade delivery with workflow scalability. Request the investor deck.',
    keywords: 'Aliph Solutions investors, GRC investment, sovereign AI, Saudi startup, compliance technology',
  });

  const [deckSubmitted, setDeckSubmitted] = useState(false);
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const deckForm = useForm<DeckFormData>({
    resolver: zodResolver(deckFormSchema),
    defaultValues: {
      name: '',
      email: '',
      entity: '',
      role: '',
      focus: '',
      interests: [],
      ndaRequested: false,
      notes: '',
    },
  });

  const focus = deckForm.watch('focus');
  const interests = deckForm.watch('interests') || [];
  const ndaRequested = deckForm.watch('ndaRequested');

  const handleDeckSubmit = async (data: DeckFormData) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formType: 'Investor Deck Request',
          interests: data.interests?.join(', ') || '',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || 'Failed to submit. Please try again.');
        return;
      }

      setDeckSubmitted(true);
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = interests.includes(interest)
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];
    deckForm.setValue('interests', newInterests);
  };

  const interestOptions = [
    'GRC platforms',
    'Sovereign AI',
    'Compliance automation',
    'KSA market',
    'GCC expansion',
    'Advisory services'
  ];

  return (
    <>
      <SuccessModal
        open={deckSubmitted}
        onClose={() => {
          setDeckSubmitted(false);
          setDeckModalOpen(false);
          deckForm.reset();
        }}
        title="Request Received!"
        message="Thanks. We'll share a secure link and offer a briefing within 24 hours."
        buttonText="Close"
      />

      {/* HERO */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Saudi-first</span>
              <span>•</span>
              <span>Sovereign-by-design</span>
              <span>•</span>
              <span>Workflow-scaled advisory</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Investors
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Aliph Solutions is building a sovereign AI advisory engine for governance, risk, and compliance—where regulation, sovereignty, and AI adoption are converging.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Dialog open={deckModalOpen && !deckSubmitted} onOpenChange={(open) => {
                setDeckModalOpen(open);
                if (open) {
                  setServerError('');
                } else {
                  // Reset form and clear errors when closing
                  deckForm.reset();
                  setServerError('');
                }
              }}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                    data-cta="investors_request_deck"
                  >
                    Request the Deck
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Request Investor Deck</DialogTitle>
                    <DialogDescription>
                      We share the deck and detailed materials through a secure link after a quick verification.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={deckForm.handleSubmit(handleDeckSubmit)} className="space-y-4 mt-4">
                    {serverError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-sm text-red-400">{serverError}</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deck-name" className={deckForm.formState.errors.name ? 'text-red-500' : ''}>
                          {deckForm.formState.errors.name ? deckForm.formState.errors.name.message : 'Full Name *'}
                        </Label>
                        <Input
                          id="deck-name"
                          {...deckForm.register('name')}
                          className={`mt-1 ${deckForm.formState.errors.name ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deck-email" className={deckForm.formState.errors.email ? 'text-red-500' : ''}>
                          {deckForm.formState.errors.email ? deckForm.formState.errors.email.message : 'Email *'}
                        </Label>
                        <Input
                          id="deck-email"
                          type="email"
                          {...deckForm.register('email')}
                          className={`mt-1 ${deckForm.formState.errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deck-entity" className={deckForm.formState.errors.entity ? 'text-red-500' : ''}>
                          {deckForm.formState.errors.entity ? deckForm.formState.errors.entity.message : 'Fund / Entity *'}
                        </Label>
                        <Input
                          id="deck-entity"
                          {...deckForm.register('entity')}
                          className={`mt-1 ${deckForm.formState.errors.entity ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deck-role" className={deckForm.formState.errors.role ? 'text-red-500' : ''}>
                          {deckForm.formState.errors.role ? deckForm.formState.errors.role.message : 'Role / Title *'}
                        </Label>
                        <Input
                          id="deck-role"
                          {...deckForm.register('role')}
                          className={`mt-1 ${deckForm.formState.errors.role ? 'border-red-500' : ''}`}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="deck-focus" className={deckForm.formState.errors.focus ? 'text-red-500' : ''}>
                        {deckForm.formState.errors.focus ? deckForm.formState.errors.focus.message : 'Focus *'}
                      </Label>
                      <Select value={focus} onValueChange={(value) => deckForm.setValue('focus', value, { shouldValidate: true })}>
                        <SelectTrigger id="deck-focus" className={`mt-1 ${deckForm.formState.errors.focus ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select investment stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="series-a">Series A</SelectItem>
                          <SelectItem value="strategic">Strategic</SelectItem>
                          <SelectItem value="family-office">Family Office</SelectItem>
                          <SelectItem value="corporate-vc">Corporate VC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-2 block">Areas of Interest (select all that apply)</Label>
                      <div className="grid md:grid-cols-2 gap-2">
                        {interestOptions.map((interest) => (
                          <label
                            key={interest}
                            className="flex items-center gap-2 p-2 border-2 rounded cursor-pointer hover:border-[#C9A227] transition-all"
                          >
                            <input
                              type="checkbox"
                              checked={interests.includes(interest)}
                              onChange={() => handleInterestToggle(interest)}
                              className="w-4 h-4 text-[#C9A227]"
                            />
                            <span className="text-sm">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="deck-nda"
                        checked={ndaRequested}
                        onChange={(e) => deckForm.setValue('ndaRequested', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="deck-nda" className="cursor-pointer">NDA Requested</Label>
                    </div>

                    <div>
                      <Label htmlFor="deck-notes">Notes (optional)</Label>
                      <Textarea
                        id="deck-notes"
                        rows={3}
                        {...deckForm.register('notes')}
                        placeholder="Timeline, specific questions, or other context..."
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[#C9A227] hover:bg-[#B8921F]">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Request Secure Deck'
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      We do not publish fundraising terms publicly. Details shared privately with qualified investors.
                    </p>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/company/contact'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="investors_book_briefing"
              >
                Book an Investor Briefing
              </Button>
            </div>

            <a
              href="/technology/aliph-brain"
              className="text-sm text-[#C9A227] hover:text-[#B8921F] inline-flex items-center gap-1"
              data-cta="investors_view_aliph_brain"
            >
              Explore the Aliph Brain <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-sm text-gray-400 mt-8 italic">
              Detailed metrics, roadmap, and architecture walkthrough available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why Now
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <Zap className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI adoption is unavoidable</h3>
              <p className="text-gray-600">
                Organizations are accelerating AI use across operations—creating productivity gains but also governance gaps and audit risk.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <Shield className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sovereignty is becoming a requirement</h3>
              <p className="text-gray-600">
                Data residency, control, and auditability are no longer optional. Regulations and buyer expectations are shifting toward sovereign patterns.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <TrendingUp className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance needs audit-ready execution</h3>
              <p className="text-gray-600">
                Not just documentation. Organizations need evidence-backed outputs with clear ownership, timelines, and implementation roadmaps.
              </p>
            </Card>

            <Card className="p-8 border-2 bg-gradient-to-br from-amber-50/50 to-white hover:border-[#C9A227] transition-all hover:shadow-lg">
              <div className="mb-6">
                <img
                  src={vision2030Logo}
                  alt="Vision 2030"
                  className="h-12 w-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Macro Alignment</h3>
              <ul className="text-gray-600 text-sm space-y-2 mb-4">
                <li>• Sovereignty and national infrastructure direction</li>
                <li>• Regulatory modernization + AI adoption at scale</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4 italic">
                Use of the Vision 2030 logo indicates alignment with national priorities, not endorsement.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* THE GAP */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            The Market Gap
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Traditional consulting vs generic AI vs Aliph
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-white border-2">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Traditional Consulting</h3>
              <p className="text-sm text-gray-600 mb-4">Rigorous methodology, credible outcomes, but slow and hard to scale.</p>
              <p className="text-xs text-gray-500">Expensive per engagement • Limited repeatability</p>
            </Card>

            <Card className="p-6 bg-white border-2">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Generic AI Tools</h3>
              <p className="text-sm text-gray-600 mb-4">Fast generation, but risky, uncontrolled, and not auditable.</p>
              <p className="text-xs text-gray-500">Black-box outputs • No validation layer</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#C9A227]/10 to-white border-2 border-[#C9A227]">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Aliph Solutions</h3>
              <p className="text-sm text-gray-700 mb-4">Consulting-grade outcomes delivered through governed workflows and sovereignty patterns.</p>
              <p className="text-xs text-[#C9A227] font-semibold">Repeatable • Auditable • Scalable</p>
            </Card>
          </div>

          <p className="text-center text-xl font-semibold text-gray-900">
            Service-backed delivery today. Workflow-scaled advantage tomorrow.
          </p>
        </div>
      </section>

      {/* THE ENGINE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            The Aliph Engine
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A227] font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Saudi Regulatory Intelligence Layer</h3>
                  <p className="text-gray-600">Knowledge base mapping regulations to controls, templates, and implementation patterns.</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A227] font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Workflow Library</h3>
                  <p className="text-gray-600">Agentic workflows producing structured, evidence-backed outputs aligned to advisory methodology.</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A227] font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Validation Layer</h3>
                  <p className="text-gray-600">Expert review gates where needed—automated QA checks plus human sign-off for critical outputs.</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A227] font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Evidence-Ready Output Packaging</h3>
                  <p className="text-gray-600">Audit trail, ownership mapping, implementation roadmap—ready for board and regulator review.</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/technology/aliph-brain" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              The Aliph Brain
            </a>
            <span className="text-gray-400">•</span>
            <a href="/technology/security-sovereignty" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              Security & Sovereignty
            </a>
            <span className="text-gray-400">•</span>
            <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              Sample Deliverables
            </a>
          </div>
        </div>
      </section>

      {/* MOAT */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Defensibility
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Compounding knowledge + workflows from delivery',
              'Sovereign-by-design architecture patterns',
              'Distribution via advisory and managed services',
              'Repeatable deliverables (packs) that scale across sectors',
              'Saudi-first positioning aligned to Vision 2030 direction'
            ].map((moat, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227] mb-4" />
                <p className="text-gray-700 font-medium">{moat}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS MODEL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Business Model
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advisory</h3>
              <p className="text-gray-600 mb-4">Fixed-scope outcome packs and programs for governance, risk, compliance, and AI governance.</p>
              <p className="text-sm text-gray-500">Service-led revenue with structured scoping</p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Managed Services</h3>
              <p className="text-gray-600 mb-4">Continuous readiness operations—GRC support center, compliance monitoring, evidence tracking.</p>
              <p className="text-sm text-gray-500">Recurring revenue + operational leverage</p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Platform Workflows</h3>
              <p className="text-gray-600 mb-4">Accelerators, tooling, workflow modules that increase delivery speed and margin expansion.</p>
              <p className="text-sm text-gray-500">Margin improvement through repeatability</p>
            </Card>
          </div>

          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            <strong>Revenue is service-led while workflows increase margins and repeatability.</strong> Advisory and managed services provide cash flow and market validation while platform workflows compound value.
          </p>
        </div>
      </section>

      {/* TRACTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Traction Signals
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <p className="text-gray-700">Active market engagement with Saudi ecosystem partners</p>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <p className="text-gray-700">Deliverable library and workflow system in development and expansion</p>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <p className="text-gray-700">Ongoing discussions across regulated and growth sectors</p>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <p className="text-gray-700">Product roadmap aligned to platform expansion milestones</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Roadmap
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              <Card className="p-8 border-2 border-[#C9A227] bg-gradient-to-r from-[#C9A227]/5 to-white">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-[#C9A227] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">Now</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Expand Deliverable Packs + Workflow Library</h3>
                    <p className="text-gray-700">Building out advisory domain coverage and workflow depth across PDPL, NCA ECC, ZATCA, internal audit, and AI governance.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">Next</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Scale Managed Services + Integrations</h3>
                    <p className="text-gray-700">Launch GRC support center operations, evidence tracking platform, and integration capabilities for enterprise systems.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">Future</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Regional Expansion + Regulated Modules</h3>
                    <p className="text-gray-700">GCC readiness, additional regulatory modules for banking/finance, and partnership ecosystem development.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTOR ACTIONS */}
      <section id="request-deck" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Request the Investor Deck
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            We share the deck and detailed materials through a secure link after a quick verification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => setDeckModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Request Secure Deck
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
            >
              Book Investor Briefing
            </Button>
          </div>

          <p className="text-sm text-gray-500 italic">
            We do not publish fundraising terms publicly. Details shared privately with qualified investors.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Investor FAQ
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Are you a consultancy or a product company?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Aliph is building a product-enabled advisory firm. We deliver consulting-grade services today using a workflow engine that compounds in value. Revenue is service-led with increasing margin leverage through repeatable workflows and deliverable packs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What makes this defensible vs Big Four?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We combine consulting rigor with workflow scalability that Big Four cannot replicate without cannibalizing their model. Our sovereign-by-design architecture, Saudi-first positioning, and compounding workflow library create structural advantages in speed, cost, and repeatability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you avoid generic AI risks?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Through governed workflows with validation layers—not black-box generation. Outputs go through automated QA checks, consistency validation, and expert review gates where needed. Every deliverable has ownership, audit trail, and evidence packaging.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How does sovereignty factor into delivery?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Sovereignty is a distribution and defensibility advantage. Our architecture supports data residency requirements, enhanced logging, and strict access controls—addressing buyer concerns that generic AI tools cannot. This opens doors in regulated sectors and government programs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What is the go-to-market?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Direct advisory sales to regulated enterprises and high-growth SMEs, plus ecosystem partnerships with consulting firms, legal advisors, and technology providers. Managed services create recurring revenue while advisory engagements validate and expand workflow coverage.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you scale margins?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Through workflow repeatability and deliverable pack standardization. Each engagement feeds the workflow library, reducing time-to-delivery and increasing quality consistency. Advisory margins improve as workflows mature; managed services add operational leverage; platform modules create software-like economics at the margin.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Building the Sovereign AI Advisory Engine for Saudi GRC
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request the deck to see detailed metrics, architecture, and roadmap.
          </p>
          <Button
            size="lg"
            onClick={() => setDeckModalOpen(true)}
            className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
          >
            Request Investor Deck
          </Button>
        </div>
      </section>
    </>
  );
}

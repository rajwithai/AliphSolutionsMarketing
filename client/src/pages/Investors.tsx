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
import { TrendingUp, Shield, Zap, CheckCircle2, ArrowRight, Brain, Lock, Loader2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import SuccessModal from '@/components/SuccessModal';
import vision2030Logo from '@assets/vision2030.png';

const getDeckFormSchema = () => z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  entity: z.string().min(2).max(100),
  role: z.string().min(2).max(100),
  focus: z.string().min(1),
  interests: z.array(z.string()).optional(),
  ndaRequested: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
});

type DeckFormData = z.infer<ReturnType<typeof getDeckFormSchema>>;

export default function Investors() {
  const { t } = useTranslation();
  
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
    resolver: zodResolver(getDeckFormSchema()),
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
    t('investors.interestOptions.grcPlatforms'),
    t('investors.interestOptions.sovereignAI'),
    t('investors.interestOptions.complianceAutomation'),
    t('investors.interestOptions.ksaMarket'),
    t('investors.interestOptions.gccExpansion'),
    t('investors.interestOptions.advisoryServices')
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
        title={t('investors.successModal.title')}
        message={t('investors.successModal.message')}
        buttonText={t('investors.successModal.btn')}
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
              <span>{t('investors.hero.badge1')}</span>
              <span>•</span>
              <span>{t('investors.hero.badge2')}</span>
              <span>•</span>
              <span>{t('investors.hero.badge3')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('investors.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              {t('investors.hero.description')}
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
                    {t('investors.hero.btnPrimary')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t('investors.deckModal.title')}</DialogTitle>
                    <DialogDescription>
                      {t('investors.deckModal.description')}
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
                          {deckForm.formState.errors.name ? t('investors.deckModal.errorName') : t('investors.deckModal.nameLabel')}
                        </Label>
                        <Input
                          id="deck-name"
                          {...deckForm.register('name')}
                          className={`mt-1 ${deckForm.formState.errors.name ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deck-email" className={deckForm.formState.errors.email ? 'text-red-500' : ''}>
                          {deckForm.formState.errors.email ? t('investors.deckModal.errorEmail') : t('investors.deckModal.emailLabel')}
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
                          {deckForm.formState.errors.entity ? t('investors.deckModal.errorEntity') : t('investors.deckModal.entityLabel')}
                        </Label>
                        <Input
                          id="deck-entity"
                          {...deckForm.register('entity')}
                          className={`mt-1 ${deckForm.formState.errors.entity ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deck-role" className={deckForm.formState.errors.role ? 'text-red-500' : ''}>
                          {deckForm.formState.errors.role ? t('investors.deckModal.errorRole') : t('investors.deckModal.roleLabel')}
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
                        {deckForm.formState.errors.focus ? t('investors.deckModal.errorFocus') : t('investors.deckModal.focusLabel')}
                      </Label>
                      <Select value={focus} onValueChange={(value) => deckForm.setValue('focus', value, { shouldValidate: true })}>
                        <SelectTrigger id="deck-focus" className={`mt-1 ${deckForm.formState.errors.focus ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder={t('investors.deckModal.focusPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-seed">{t('investors.focusOptions.preSeed')}</SelectItem>
                          <SelectItem value="seed">{t('investors.focusOptions.seed')}</SelectItem>
                          <SelectItem value="series-a">{t('investors.focusOptions.seriesA')}</SelectItem>
                          <SelectItem value="strategic">{t('investors.focusOptions.strategic')}</SelectItem>
                          <SelectItem value="family-office">{t('investors.focusOptions.familyOffice')}</SelectItem>
                          <SelectItem value="corporate-vc">{t('investors.focusOptions.corporateVC')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-2 block">{t('investors.deckModal.interestsLabel')}</Label>
                      <div className="grid md:grid-cols-2 gap-2">
                        {interestOptions.map((interest, idx) => (
                          <label
                            key={idx}
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
                      <Label htmlFor="deck-nda" className="cursor-pointer">{t('investors.deckModal.ndaLabel')}</Label>
                    </div>

                    <div>
                      <Label htmlFor="deck-notes">{t('investors.deckModal.notesLabel')}</Label>
                      <Textarea
                        id="deck-notes"
                        rows={3}
                        {...deckForm.register('notes')}
                        placeholder={t('investors.deckModal.notesPlaceholder')}
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[#C9A227] hover:bg-[#B8921F]">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t('investors.deckModal.submittingBtn')}
                        </>
                      ) : (
                        t('investors.deckModal.submitBtn')
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      {t('investors.deckModal.disclaimer')}
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
                {t('investors.hero.btnSecondary')}
              </Button>
            </div>

            <a
              href="/technology/aliph-brain"
              className="text-sm text-[#C9A227] hover:text-[#B8921F] inline-flex items-center gap-1"
              data-cta="investors_view_aliph_brain"
            >
              {t('investors.hero.linkAliphBrain')} <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-sm text-gray-400 mt-8 italic">
              {t('investors.hero.footer')}
            </p>
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('investors.whyNow.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <Zap className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('investors.whyNow.card1Title')}</h3>
              <p className="text-gray-600">
                {t('investors.whyNow.card1Desc')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <Shield className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('investors.whyNow.card2Title')}</h3>
              <p className="text-gray-600">
                {t('investors.whyNow.card2Desc')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
              <TrendingUp className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('investors.whyNow.card3Title')}</h3>
              <p className="text-gray-600">
                {t('investors.whyNow.card3Desc')}
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('investors.whyNow.card4Title')}</h3>
              <ul className="text-gray-600 text-sm space-y-2 mb-4">
                <li>{t('investors.whyNow.card4Point1')}</li>
                <li>{t('investors.whyNow.card4Point2')}</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4 italic">
                {t('investors.whyNow.card4Disclaimer')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* THE GAP */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('investors.marketGap.title')}
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {t('investors.marketGap.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-white border-2">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('investors.marketGap.traditional.title')}</h3>
              <p className="text-sm text-gray-600 mb-4">{t('investors.marketGap.traditional.desc')}</p>
              <p className="text-xs text-gray-500">{t('investors.marketGap.traditional.footer')}</p>
            </Card>

            <Card className="p-6 bg-white border-2">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('investors.marketGap.genericAI.title')}</h3>
              <p className="text-sm text-gray-600 mb-4">{t('investors.marketGap.genericAI.desc')}</p>
              <p className="text-xs text-gray-500">{t('investors.marketGap.genericAI.footer')}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#C9A227]/10 to-white border-2 border-[#C9A227]">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('investors.marketGap.aliph.title')}</h3>
              <p className="text-sm text-gray-700 mb-4">{t('investors.marketGap.aliph.desc')}</p>
              <p className="text-xs text-[#C9A227] font-semibold">{t('investors.marketGap.aliph.footer')}</p>
            </Card>
          </div>

          <p className="text-center text-xl font-semibold text-gray-900">
            {t('investors.marketGap.closing')}
          </p>
        </div>
      </section>

      {/* THE ENGINE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('investors.engine.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A227] font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('investors.engine.component1Title')}</h3>
                  <p className="text-gray-600">{t('investors.engine.component1Desc')}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A227] font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('investors.engine.component2Title')}</h3>
                  <p className="text-gray-600">{t('investors.engine.component2Desc')}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A227] font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('investors.engine.component3Title')}</h3>
                  <p className="text-gray-600">{t('investors.engine.component3Desc')}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A227] font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('investors.engine.component4Title')}</h3>
                  <p className="text-gray-600">{t('investors.engine.component4Desc')}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/technology/aliph-brain" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              {t('investors.engine.link1')}
            </a>
            <span className="text-gray-400">•</span>
            <a href="/technology/security-sovereignty" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              {t('investors.engine.link2')}
            </a>
            <span className="text-gray-400">•</span>
            <a href="/deliverables" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              {t('investors.engine.link3')}
            </a>
          </div>
        </div>
      </section>

      {/* MOAT */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('investors.defensibility.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              t('investors.defensibility.moat1'),
              t('investors.defensibility.moat2'),
              t('investors.defensibility.moat3'),
              t('investors.defensibility.moat4'),
              t('investors.defensibility.moat5')
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
            {t('investors.businessModel.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('investors.businessModel.advisory.title')}</h3>
              <p className="text-gray-600 mb-4">{t('investors.businessModel.advisory.desc')}</p>
              <p className="text-sm text-gray-500">{t('investors.businessModel.advisory.footer')}</p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('investors.businessModel.managedServices.title')}</h3>
              <p className="text-gray-600 mb-4">{t('investors.businessModel.managedServices.desc')}</p>
              <p className="text-sm text-gray-500">{t('investors.businessModel.managedServices.footer')}</p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('investors.businessModel.platformWorkflows.title')}</h3>
              <p className="text-gray-600 mb-4">{t('investors.businessModel.platformWorkflows.desc')}</p>
              <p className="text-sm text-gray-500">{t('investors.businessModel.platformWorkflows.footer')}</p>
            </Card>
          </div>

          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            {t('investors.businessModel.closing')}
          </p>
        </div>
      </section>

      {/* TRACTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('investors.traction.title')}
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <p className="text-gray-700">{t('investors.traction.signal1')}</p>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <p className="text-gray-700">{t('investors.traction.signal2')}</p>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <p className="text-gray-700">{t('investors.traction.signal3')}</p>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-[#C9A227] transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <p className="text-gray-700">{t('investors.traction.signal4')}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('investors.roadmap.title')}
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              <Card className="p-8 border-2 border-[#C9A227] bg-gradient-to-r from-[#C9A227]/5 to-white">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-[#C9A227] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">{t('investors.roadmap.now.label')}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('investors.roadmap.now.title')}</h3>
                    <p className="text-gray-700">{t('investors.roadmap.now.desc')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">{t('investors.roadmap.next.label')}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('investors.roadmap.next.title')}</h3>
                    <p className="text-gray-700">{t('investors.roadmap.next.desc')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">{t('investors.roadmap.future.label')}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('investors.roadmap.future.title')}</h3>
                    <p className="text-gray-700">{t('investors.roadmap.future.desc')}</p>
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
            {t('investors.requestDeck.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            {t('investors.requestDeck.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => setDeckModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              {t('investors.requestDeck.btnPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
            >
              {t('investors.requestDeck.btnSecondary')}
            </Button>
          </div>

          <p className="text-sm text-gray-500 italic">
            {t('investors.requestDeck.disclaimer')}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('investors.faq.title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('investors.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('investors.faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('investors.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('investors.faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('investors.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('investors.faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('investors.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('investors.faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('investors.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('investors.faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('investors.faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('investors.faq.a6')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('investors.finalCta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('investors.finalCta.subtitle')}
          </p>
          <Button
            size="lg"
            onClick={() => setDeckModalOpen(true)}
            className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
          >
            {t('investors.finalCta.btn')}
          </Button>
        </div>
      </section>
    </>
  );
}

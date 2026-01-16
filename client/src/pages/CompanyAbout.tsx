import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, Brain, Users, CheckCircle2, ArrowRight, Target, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
import useSEO from '@/hooks/useSEO';

export default function CompanyAbout() {
  const { t } = useTranslation();
  useSEO({
    title: 'About | Aliph Solutions',
    description: 'Aliph Solutions is a Saudi-first sovereign AI advisory engine for governance, risk, compliance, and AI governance—delivering audit-ready outcomes aligned with Vision 2030.',
    keywords: 'Aliph Solutions about, Saudi GRC advisory, sovereign AI, Vision 2030, compliance advisory Saudi Arabia',
  });

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[75vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>{t('companyAbout.hero.badge1')}</span>
              <span>•</span>
              <span>{t('companyAbout.hero.badge2')}</span>
              <span>•</span>
              <span>{t('companyAbout.hero.badge3')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('companyAbout.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              {t('companyAbout.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/deliverables'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                {t('companyAbout.hero.btn1')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/company/contact'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('companyAbout.hero.btn2')}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => window.location.href = '/technology/security-sovereignty'}
                className="text-white hover:bg-white/10"
              >
                {t('companyAbout.hero.btn3')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE WHY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('companyAbout.why.title')}
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              {t('companyAbout.why.para1')}
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              {t('companyAbout.why.para2')}
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              {t('companyAbout.why.para3')}
            </p>
          </div>

          <Card className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-[#C9A227]/10 to-white border-2 border-[#C9A227]/30">
            <p className="text-2xl font-bold text-gray-900 text-center">
              {t('companyAbout.why.highlight')}
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 3: MISSION & VISION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <Target className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('companyAbout.missionVision.missionTitle')}</h3>
              <p className="text-lg text-gray-700">
                {t('companyAbout.missionVision.missionDesc')}
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <Zap className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('companyAbout.missionVision.visionTitle')}</h3>
              <p className="text-lg text-gray-700">
                {t('companyAbout.missionVision.visionDesc')}
              </p>
            </Card>
          </div>

          <p className="text-center text-gray-700 italic max-w-3xl mx-auto">
            {t('companyAbout.missionVision.alignment')}
          </p>
        </div>
      </section>

      {/* SECTION 4: WHAT MAKES US DIFFERENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('companyAbout.different.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/advisory'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Users className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('companyAbout.different.card1Title')}</h3>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">{t('companyAbout.different.card1What')}</span> {t('companyAbout.different.card1WhatDesc')}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">{t('companyAbout.different.card1Why')}</span> {t('companyAbout.different.card1WhyDesc')}
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                {t('companyAbout.different.card1Link')}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/technology/security-sovereignty'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Shield className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('companyAbout.different.card2Title')}</h3>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">{t('companyAbout.different.card2What')}</span> {t('companyAbout.different.card2WhatDesc')}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">{t('companyAbout.different.card2Why')}</span> {t('companyAbout.different.card2WhyDesc')}
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                {t('companyAbout.different.card2Link')}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/technology/aliph-brain'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Brain className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('companyAbout.different.card3Title')}</h3>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">{t('companyAbout.different.card3What')}</span> {t('companyAbout.different.card3WhatDesc')}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">{t('companyAbout.different.card3Why')}</span> {t('companyAbout.different.card3WhyDesc')}
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                {t('companyAbout.different.card3Link')}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW WE WORK */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('companyAbout.howWeWork.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('companyAbout.howWeWork.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { title: t('companyAbout.howWeWork.principle1Title'), desc: t('companyAbout.howWeWork.principle1Desc') },
              { title: t('companyAbout.howWeWork.principle2Title'), desc: t('companyAbout.howWeWork.principle2Desc') },
              { title: t('companyAbout.howWeWork.principle3Title'), desc: t('companyAbout.howWeWork.principle3Desc') },
              { title: t('companyAbout.howWeWork.principle4Title'), desc: t('companyAbout.howWeWork.principle4Desc') },
              { title: t('companyAbout.howWeWork.principle5Title'), desc: t('companyAbout.howWeWork.principle5Desc') },
              { title: t('companyAbout.howWeWork.principle6Title'), desc: t('companyAbout.howWeWork.principle6Desc') }
            ].map((principle, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <h3 className="text-lg font-bold mb-2 text-gray-900">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.desc}</p>
              </Card>
            ))}
          </div>

          {/* Mini delivery flow */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">{t('companyAbout.howWeWork.flowTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center mb-8">
              {[
                { label: t('companyAbout.howWeWork.flow1Label'), desc: t('companyAbout.howWeWork.flow1Desc') },
                { label: t('companyAbout.howWeWork.flow2Label'), desc: t('companyAbout.howWeWork.flow2Desc') },
                { label: t('companyAbout.howWeWork.flow3Label'), desc: t('companyAbout.howWeWork.flow3Desc') },
                { label: t('companyAbout.howWeWork.flow4Label'), desc: t('companyAbout.howWeWork.flow4Desc') },
                { label: t('companyAbout.howWeWork.flow5Label'), desc: t('companyAbout.howWeWork.flow5Desc') },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#C9A227]/30 text-center">
                    <p className="text-sm font-bold text-gray-900 mb-1">{step.label}</p>
                    <p className="text-xs text-gray-600">{step.desc}</p>
                  </Card>
                  {idx < 4 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A227] z-10" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() => window.location.href = '/deliverables'}
                variant="outline"
              >
                {t('companyAbout.howWeWork.button')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHO WE SERVE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('companyAbout.whoWeServe.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              t('companyAbout.whoWeServe.segment1'),
              t('companyAbout.whoWeServe.segment2'),
              t('companyAbout.whoWeServe.segment3'),
              t('companyAbout.whoWeServe.segment4')
            ].map((segment, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227] mb-4" />
                <p className="text-lg font-semibold text-gray-900">{segment}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/industries'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              {t('companyAbout.whoWeServe.btn1')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
            >
              {t('companyAbout.whoWeServe.btn2')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: PARTNERSHIP INVITE */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            {t('companyAbout.partnerships.title')}
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {t('companyAbout.partnerships.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/company/partners'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              {t('companyAbout.partnerships.btn1')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
            >
              {t('companyAbout.partnerships.btn2')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('companyAbout.finalCta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('companyAbout.finalCta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              {t('companyAbout.finalCta.btn1')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('companyAbout.finalCta.btn2')}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('companyAbout.faq.title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('companyAbout.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('companyAbout.faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('companyAbout.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('companyAbout.faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('companyAbout.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('companyAbout.faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('companyAbout.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('companyAbout.faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('companyAbout.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('companyAbout.faq.a5')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

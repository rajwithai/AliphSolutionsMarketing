import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, Lock, Eye, Database, FileCheck, GitBranch, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
import useSEO from '@/hooks/useSEO';

export default function Security() {
  const { t } = useTranslation();
  
  useSEO({
    title: 'Security Statement | Aliph Solutions',
    description: 'Aliph Solutions security statement—how we approach data handling, access controls, auditability, and secure delivery patterns for Saudi GRC engagements.',
    keywords: 'Aliph security, data handling, access controls, audit logs, secure delivery, NDA, Saudi GRC security',
  });

  const principles = [
    { icon: <Database className="w-6 h-6" />, title: t('security.principles.principle1Title'), desc: t('security.principles.principle1Desc') },
    { icon: <Lock className="w-6 h-6" />, title: t('security.principles.principle2Title'), desc: t('security.principles.principle2Desc') },
    { icon: <Shield className="w-6 h-6" />, title: t('security.principles.principle3Title'), desc: t('security.principles.principle3Desc') },
    { icon: <Eye className="w-6 h-6" />, title: t('security.principles.principle4Title'), desc: t('security.principles.principle4Desc') },
    { icon: <GitBranch className="w-6 h-6" />, title: t('security.principles.principle5Title'), desc: t('security.principles.principle5Desc') },
    { icon: <FileCheck className="w-6 h-6" />, title: t('security.principles.principle6Title'), desc: t('security.principles.principle6Desc') }
  ];

  const deliveryPatterns = [
    {
      title: t('security.deliveryPatterns.pattern1Title'),
      description: t('security.deliveryPatterns.pattern1Desc'),
      features: [
        t('security.deliveryPatterns.pattern1Feature1'),
        t('security.deliveryPatterns.pattern1Feature2'),
        t('security.deliveryPatterns.pattern1Feature3')
      ]
    },
    {
      title: t('security.deliveryPatterns.pattern2Title'),
      description: t('security.deliveryPatterns.pattern2Desc'),
      features: [
        t('security.deliveryPatterns.pattern2Feature1'),
        t('security.deliveryPatterns.pattern2Feature2'),
        t('security.deliveryPatterns.pattern2Feature3')
      ]
    },
    {
      title: t('security.deliveryPatterns.pattern3Title'),
      description: t('security.deliveryPatterns.pattern3Desc'),
      features: [
        t('security.deliveryPatterns.pattern3Feature1'),
        t('security.deliveryPatterns.pattern3Feature2'),
        t('security.deliveryPatterns.pattern3Feature3')
      ]
    }
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>{t('security.hero.badge1')}</span>
              <span>•</span>
              <span>{t('security.hero.badge2')}</span>
              <span>•</span>
              <span>{t('security.hero.badge3')}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-10 h-10 text-[#C9A227]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('security.hero.title')}
              </h1>
            </div>

            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              {t('security.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/technology/security-sovereignty'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="security_speak_to_architect"
              >
                {t('security.hero.btn1')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/technology/security-sovereignty#security-brief'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="security_request_brief"
              >
                {t('security.hero.btn2')}
              </Button>
            </div>

            <div className="mt-6">
              <a
                href="/technology/security-sovereignty"
                className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
              >
                {t('security.hero.link')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY PRINCIPLES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('security.principles.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, idx) => (
              <Card
                key={idx}
                className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-4 text-[#C9A227] group-hover:bg-[#C9A227]/20 transition-colors">
                  {principle.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DATA HANDLING */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('security.dataHandling.title')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('security.dataHandling.subtitle')}
          </p>

          <Card className="max-w-4xl mx-auto p-8 border-2">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{t('security.dataHandling.point1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{t('security.dataHandling.point2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{t('security.dataHandling.point3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{t('security.dataHandling.point4')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{t('security.dataHandling.point5')}</span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-gray-50 border-l-4 border-[#C9A227] rounded">
              <p className="text-sm text-gray-700 italic">
                {t('security.dataHandling.note')}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/legal/privacy"
                className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
              >
                {t('security.dataHandling.privacyLink')}
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="/company/contact"
                className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
              >
                {t('security.dataHandling.contactLink')}
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* ACCESS CONTROL & GOVERNANCE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t('security.accessControl.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('security.accessControl.patternsTitle')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('security.accessControl.pattern1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('security.accessControl.pattern2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('security.accessControl.pattern3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('security.accessControl.pattern4')}</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-2 bg-gradient-to-br from-[#C9A227]/5 to-white">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-[#C9A227]" />
                <h3 className="text-xl font-bold text-gray-900">{t('security.accessControl.ndaTitle')}</h3>
              </div>
              <p className="text-gray-700 mb-4">
                {t('security.accessControl.ndaDesc')}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/company/contact'}
              >
                {t('security.accessControl.ndaBtn')}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* AUDITABILITY & EVIDENCE READINESS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('security.auditability.title')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('security.auditability.subtitle')}
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 mb-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">{t('security.auditability.feature1Title')}</p>
                    <p className="text-sm text-gray-600">{t('security.auditability.feature1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">{t('security.auditability.feature2Title')}</p>
                    <p className="text-sm text-gray-600">{t('security.auditability.feature2Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">{t('security.auditability.feature3Title')}</p>
                    <p className="text-sm text-gray-600">{t('security.auditability.feature3Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">{t('security.auditability.feature4Title')}</p>
                    <p className="text-sm text-gray-600">{t('security.auditability.feature4Desc')}</p>
                  </div>
                </li>
              </ul>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => window.location.href = '/deliverables'}
                className="bg-[#C9A227] hover:bg-[#B8921F]"
              >
                {t('security.auditability.btn')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY PATTERNS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('security.deliveryPatterns.title')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('security.deliveryPatterns.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {deliveryPatterns.map((pattern, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pattern.title}</h3>
                <p className="text-gray-600 mb-6">{pattern.description}</p>
                <ul className="space-y-2">
                  {pattern.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              {t('security.deliveryPatterns.btn')}
            </Button>
          </div>
        </div>
      </section>

      {/* INCIDENT / ISSUE REPORTING */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-[#C9A227]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-[#C9A227]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {t('security.reporting.title')}
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {t('security.reporting.description')}
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/company/contact'}
            className="bg-[#C9A227] hover:bg-[#B8921F]"
            data-cta="security_contact"
          >
            {t('security.reporting.btn')}
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('security.faq.title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('security.faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('security.faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('security.faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('security.faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('security.faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('security.faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('security.faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('security.faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('security.faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('security.faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {t('security.faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('security.faq.a6')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('security.finalCta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('security.finalCta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              {t('security.finalCta.btn1')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/technology/security-sovereignty#security-brief'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('security.finalCta.btn2')}
            </Button>
          </div>
          <a
            href="/deliverables"
            className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
          >
            {t('security.finalCta.link')}
          </a>
        </div>
      </section>
    </>
  );
}

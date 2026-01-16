import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

export default function AdvisoryInternalAudit() {
  const { t, i18n } = useTranslation();
  const [, setLocation] = useLocation();
  const language = i18n.language;

  useSEO({
    title: t('advisoryInternalAudit.hero.title') + ' | ' + (language === 'ar' ? 'أليف للحلول' : 'Aliph Solutions'),
    description: t('advisoryInternalAudit.hero.subtitle'),
    keywords: language === 'ar'
      ? 'التدقيق الداخلي، استشارات التدقيق، تخطيط التدقيق، التعهيد المشترك، التدقيق القائم على المخاطر، خدمات التدقيق السعودية'
      : 'internal audit, audit advisory, audit planning, co-sourcing, risk-based audit, Saudi audit services',
  });

  const deliverables = [
    'charter',
    'universe',
    'plan',
    'methodology',
    'templates',
    'reports',
    'tracking',
    'packs',
    'qaip'
  ];

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <>
      <section className="relative min-h-[60vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden" dir="ltr">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-10 h-10 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">{t('advisoryInternalAudit.hero.label')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('advisoryInternalAudit.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              {t('advisoryInternalAudit.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => handleNavigation('/deliverables')}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                {t('advisoryInternalAudit.hero.sampleBtn')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNavigation('/advisory')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('advisoryInternalAudit.hero.scopeBtn')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            {t('advisoryInternalAudit.covers.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('advisoryInternalAudit.covers.setup.title')}</h3>
              <p className="text-gray-600">
                {t('advisoryInternalAudit.covers.setup.desc')}
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('advisoryInternalAudit.covers.planning.title')}</h3>
              <p className="text-gray-600">
                {t('advisoryInternalAudit.covers.planning.desc')}
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('advisoryInternalAudit.covers.methodology.title')}</h3>
              <p className="text-gray-600">
                {t('advisoryInternalAudit.covers.methodology.desc')}
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('advisoryInternalAudit.covers.cosourcing.title')}</h3>
              <p className="text-gray-600">
                {t('advisoryInternalAudit.covers.cosourcing.desc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            {t('advisoryInternalAudit.deliverables.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('advisoryInternalAudit.deliverables.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {deliverables.map((key, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t(`advisoryInternalAudit.deliverables.items.${key}`)}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('advisoryInternalAudit.cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('advisoryInternalAudit.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => handleNavigation('/deliverables')}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              {t('advisoryInternalAudit.cta.sampleBtn')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNavigation('/advisory')}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('advisoryInternalAudit.cta.backBtn')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

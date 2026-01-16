import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useTranslation } from 'react-i18next';

export default function LegalTerms() {
  const { t } = useTranslation();

  useSEO({
    title: t('legalTerms.seo.title'),
    description: t('legalTerms.seo.description'),
    keywords: t('legalTerms.seo.keywords'),
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'acceptance', label: t('legalTerms.toc.acceptance') },
    { id: 'use-of-site', label: t('legalTerms.toc.useOfSite') },
    { id: 'intellectual-property', label: t('legalTerms.toc.intellectualProperty') },
    { id: 'disclaimers', label: t('legalTerms.toc.disclaimers') },
    { id: 'limitation', label: t('legalTerms.toc.limitation') },
    { id: 'third-party', label: t('legalTerms.toc.thirdParty') },
    { id: 'privacy', label: t('legalTerms.toc.privacy') },
    { id: 'changes', label: t('legalTerms.toc.changes') },
    { id: 'governing-law', label: t('legalTerms.toc.governingLaw') },
    { id: 'contact', label: t('legalTerms.toc.contact') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1220] to-[#1a1f35] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-[#C9A227]" />
            <span className="text-sm text-[#C9A227]">{t('legalTerms.hero.label')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('legalTerms.hero.title')}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-4">
            {t('legalTerms.hero.description')}
          </p>
          <p className="text-sm text-gray-400">{t('legalTerms.hero.lastUpdated')}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* TABLE OF CONTENTS */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4">{t('legalTerms.toc.title')}</h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block text-sm text-gray-600 hover:text-[#C9A227] text-left transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </Card>

              <Card className="p-4 mt-6 bg-amber-50 border-amber-200">
                <p className="text-sm text-amber-900">
                  {t('legalTerms.toc.note')}
                </p>
              </Card>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3 prose prose-gray max-w-none">
              <Card className="p-8 md:p-12">
                {/* ACCEPTANCE */}
                <section id="acceptance" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.acceptance.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalTerms.acceptance.p1')}
                  </p>
                  <p className="text-gray-700">
                    {t('legalTerms.acceptance.p2')}
                  </p>
                </section>

                {/* USE OF SITE */}
                <section id="use-of-site" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.useOfSite.title')}</h2>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalTerms.useOfSite.permitted.title')}</h3>
                  <p className="text-gray-700 mb-4">{t('legalTerms.useOfSite.permitted.intro')}</p>
                  <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                    {(t('legalTerms.useOfSite.permitted.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalTerms.useOfSite.prohibited.title')}</h3>
                  <p className="text-gray-700 mb-4">{t('legalTerms.useOfSite.prohibited.intro')}</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalTerms.useOfSite.prohibited.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* INTELLECTUAL PROPERTY */}
                <section id="intellectual-property" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.intellectualProperty.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalTerms.intellectualProperty.p1')}
                  </p>
                  <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t('legalTerms.intellectualProperty.p2') }} />
                  <p className="text-gray-700">
                    {t('legalTerms.intellectualProperty.p3')}
                  </p>
                </section>

                {/* DISCLAIMERS */}
                <section id="disclaimers" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.disclaimers.title')}</h2>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalTerms.disclaimers.info.title')}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('legalTerms.disclaimers.info.p1')}
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalTerms.disclaimers.warranty.title')}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('legalTerms.disclaimers.warranty.p1')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalTerms.disclaimers.warranty.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* LIMITATION OF LIABILITY */}
                <section id="limitation" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.limitation.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalTerms.limitation.p1')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    {(t('legalTerms.limitation.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700">
                    {t('legalTerms.limitation.p2')}
                  </p>
                </section>

                {/* THIRD-PARTY LINKS */}
                <section id="third-party" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.thirdParty.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalTerms.thirdParty.p1')}
                  </p>
                  <p className="text-gray-700">
                    {t('legalTerms.thirdParty.p2')}
                  </p>
                </section>

                {/* PRIVACY AND COOKIES */}
                <section id="privacy" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.privacy.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalTerms.privacy.p1')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/legal/privacy"
                      className="text-[#C9A227] hover:text-[#B8921F] font-medium underline"
                    >
                      {t('legalTerms.privacy.privacy')}
                    </a>
                    <span className="text-gray-400">•</span>
                    <a
                      href="/legal/cookies"
                      className="text-[#C9A227] hover:text-[#B8921F] font-medium underline"
                    >
                      {t('legalTerms.privacy.cookies')}
                    </a>
                  </div>
                </section>

                {/* CHANGES TO TERMS */}
                <section id="changes" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.changes.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalTerms.changes.p1')}
                  </p>
                  <p className="text-gray-700">
                    {t('legalTerms.changes.p2')}
                  </p>
                </section>

                {/* GOVERNING LAW */}
                <section id="governing-law" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.governingLaw.title')}</h2>
                  <p className="text-gray-700">
                    {t('legalTerms.governingLaw.p1')}
                  </p>
                </section>

                {/* CONTACT */}
                <section id="contact" className="mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalTerms.contact.title')}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('legalTerms.contact.p1')}
                  </p>
                  <Button
                    onClick={() => window.location.href = '/company/contact'}
                    className="bg-[#C9A227] hover:bg-[#B8921F]"
                    data-cta="terms_contact"
                  >
                    {t('legalTerms.contact.cta')}
                  </Button>
                </section>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

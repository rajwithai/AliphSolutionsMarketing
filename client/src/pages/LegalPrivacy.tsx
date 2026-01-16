import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useTranslation } from 'react-i18next';

export default function LegalPrivacy() {
  const { t } = useTranslation();

  useSEO({
    title: t('legalPrivacy.seo.title'),
    description: t('legalPrivacy.seo.description'),
    keywords: t('legalPrivacy.seo.keywords'),
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'scope', label: t('legalPrivacy.toc.scope') },
    { id: 'information-collect', label: t('legalPrivacy.toc.informationCollect') },
    { id: 'how-use', label: t('legalPrivacy.toc.howUse') },
    { id: 'legal-bases', label: t('legalPrivacy.toc.legalBases') },
    { id: 'cookies', label: t('legalPrivacy.toc.cookies') },
    { id: 'sharing', label: t('legalPrivacy.toc.sharing') },
    { id: 'transfers', label: t('legalPrivacy.toc.transfers') },
    { id: 'retention', label: t('legalPrivacy.toc.retention') },
    { id: 'security', label: t('legalPrivacy.toc.security') },
    { id: 'rights', label: t('legalPrivacy.toc.rights') },
    { id: 'third-party', label: t('legalPrivacy.toc.thirdParty') },
    { id: 'updates', label: t('legalPrivacy.toc.updates') },
    { id: 'contact', label: t('legalPrivacy.toc.contact') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1220] to-[#1a1f35] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#C9A227]" />
            <span className="text-sm text-[#C9A227]">{t('legalPrivacy.hero.label')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('legalPrivacy.hero.title')}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-4">
            {t('legalPrivacy.hero.description')}
          </p>
          <p className="text-sm text-gray-400">{t('legalPrivacy.hero.lastUpdated')}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* TABLE OF CONTENTS */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4">{t('legalPrivacy.toc.title')}</h3>
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
                  {t('legalPrivacy.toc.note')}
                </p>
              </Card>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3 prose prose-gray max-w-none">
              <Card className="p-8 md:p-12">
                {/* SCOPE */}
                <section id="scope" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.scope.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalPrivacy.scope.p1')}
                  </p>
                  <p className="text-gray-700">
                    {t('legalPrivacy.scope.p2')}
                  </p>
                </section>

                {/* INFORMATION WE COLLECT */}
                <section id="information-collect" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.informationCollect.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('legalPrivacy.informationCollect.intro')}</p>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalPrivacy.informationCollect.contact.title')}</h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    {(t('legalPrivacy.informationCollect.contact.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalPrivacy.informationCollect.inquiry.title')}</h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    {(t('legalPrivacy.informationCollect.inquiry.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalPrivacy.informationCollect.usage.title')}</h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    {(t('legalPrivacy.informationCollect.usage.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalPrivacy.informationCollect.newsletter.title')}</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalPrivacy.informationCollect.newsletter.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* HOW WE USE INFORMATION */}
                <section id="how-use" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.howUse.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('legalPrivacy.howUse.intro')}</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalPrivacy.howUse.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </section>

                {/* LEGAL BASES */}
                <section id="legal-bases" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.legalBases.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('legalPrivacy.legalBases.intro')}</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalPrivacy.legalBases.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </section>

                {/* COOKIES & ANALYTICS */}
                <section id="cookies" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.cookies.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalPrivacy.cookies.p1')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('legalPrivacy.cookies.p2')}
                    <a href="/legal/cookies" className="text-[#C9A227] hover:text-[#B8921F] underline">
                      {t('legalPrivacy.cookies.link')}
                    </a>.
                  </p>
                </section>

                {/* SHARING & DISCLOSURES */}
                <section id="sharing" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.sharing.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('legalPrivacy.sharing.intro')}</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalPrivacy.sharing.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                  <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html: t('legalPrivacy.sharing.note') }} />
                </section>

                {/* INTERNATIONAL TRANSFERS */}
                <section id="transfers" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.transfers.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalPrivacy.transfers.p1')}
                  </p>
                  <p className="text-gray-700">
                    {t('legalPrivacy.transfers.p2')}
                  </p>
                </section>

                {/* DATA RETENTION */}
                <section id="retention" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.retention.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('legalPrivacy.retention.intro')}</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalPrivacy.retention.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* SECURITY MEASURES */}
                <section id="security" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.security.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('legalPrivacy.security.intro')}</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalPrivacy.security.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700 mt-4">
                    {t('legalPrivacy.security.p2')}
                    <a href="/security" className="text-[#C9A227] hover:text-[#B8921F] underline">
                      {t('legalPrivacy.security.link')}
                    </a>.
                  </p>
                </section>

                {/* YOUR RIGHTS */}
                <section id="rights" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.rights.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('legalPrivacy.rights.intro')}</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {(t('legalPrivacy.rights.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                  <p className="text-gray-700 mt-4">
                    {t('legalPrivacy.rights.p2')}
                  </p>
                </section>

                {/* THIRD-PARTY LINKS */}
                <section id="third-party" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.thirdParty.title')}</h2>
                  <p className="text-gray-700">
                    {t('legalPrivacy.thirdParty.p1')}
                  </p>
                </section>

                {/* UPDATES */}
                <section id="updates" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.updates.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalPrivacy.updates.p1')}
                  </p>
                  <p className="text-gray-700">
                    {t('legalPrivacy.updates.p2')}
                  </p>
                </section>

                {/* CONTACT */}
                <section id="contact" className="mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalPrivacy.contact.title')}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('legalPrivacy.contact.p1')}
                  </p>
                  <Button
                    onClick={() => window.location.href = '/company/contact'}
                    className="bg-[#C9A227] hover:bg-[#B8921F]"
                    data-cta="privacy_contact"
                  >
                    {t('legalPrivacy.contact.cta')}
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

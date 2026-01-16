import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useTranslation } from 'react-i18next';

export default function LegalCookies() {
  const { t } = useTranslation();

  useSEO({
    title: t('legalCookies.seo.title'),
    description: t('legalCookies.seo.description'),
    keywords: t('legalCookies.seo.keywords'),
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'what-are-cookies', label: t('legalCookies.toc.whatAreCookies') },
    { id: 'types-used', label: t('legalCookies.toc.typesUsed') },
    { id: 'how-control', label: t('legalCookies.toc.howControl') },
    { id: 'consent', label: t('legalCookies.toc.consent') },
    { id: 'third-party', label: t('legalCookies.toc.thirdParty') },
    { id: 'updates', label: t('legalCookies.toc.updates') },
    { id: 'contact', label: t('legalCookies.toc.contact') }
  ];

  const cookieTypes = [
    {
      type: t('legalCookies.typesUsed.necessary.type'),
      purpose: t('legalCookies.typesUsed.necessary.purpose'),
      examples: t('legalCookies.typesUsed.necessary.examples'),
      control: t('legalCookies.typesUsed.necessary.control')
    },
    {
      type: t('legalCookies.typesUsed.analytics.type'),
      purpose: t('legalCookies.typesUsed.analytics.purpose'),
      examples: t('legalCookies.typesUsed.analytics.examples'),
      control: t('legalCookies.typesUsed.analytics.control')
    },
    {
      type: t('legalCookies.typesUsed.functional.type'),
      purpose: t('legalCookies.typesUsed.functional.purpose'),
      examples: t('legalCookies.typesUsed.functional.examples'),
      control: t('legalCookies.typesUsed.functional.control')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1220] to-[#1a1f35] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-8 h-8 text-[#C9A227]" />
            <span className="text-sm text-[#C9A227]">{t('legalCookies.hero.label')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('legalCookies.hero.title')}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-4">
            {t('legalCookies.hero.description')}
          </p>
          <p className="text-sm text-gray-400">{t('legalCookies.hero.lastUpdated')}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* TABLE OF CONTENTS */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4">{t('legalCookies.toc.title')}</h3>
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
                  {t('legalCookies.toc.note')}
                </p>
              </Card>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3 prose prose-gray max-w-none">
              <Card className="p-8 md:p-12">
                {/* WHAT ARE COOKIES */}
                <section id="what-are-cookies" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalCookies.whatAreCookies.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.whatAreCookies.p1')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.whatAreCookies.p2')}
                  </p>
                </section>

                {/* TYPES OF COOKIES */}
                <section id="types-used" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalCookies.typesUsed.title')}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('legalCookies.typesUsed.intro')}
                  </p>

                  <div className="space-y-6">
                    {cookieTypes.map((cookie, idx) => (
                      <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{cookie.type}</h3>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{t('legalCookies.typesUsed.fields.purpose')}</p>
                            <p className="text-gray-700">{cookie.purpose}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{t('legalCookies.typesUsed.fields.examples')}</p>
                            <p className="text-gray-700">{cookie.examples}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{t('legalCookies.typesUsed.fields.control')}</p>
                            <p className="text-gray-700">{cookie.control}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 border-l-4 border-[#C9A227] rounded">
                    <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('legalCookies.typesUsed.note') }} />
                  </div>
                </section>

                {/* HOW TO CONTROL */}
                <section id="how-control" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalCookies.howControl.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.howControl.intro')}
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalCookies.howControl.browserSettings.title')}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.howControl.browserSettings.p1')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                    {(t('legalCookies.howControl.browserSettings.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('legalCookies.howControl.browserHelp.title')}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.howControl.browserHelp.p1')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                    {(t('legalCookies.howControl.browserHelp.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>

                  <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded">
                    <p className="text-sm text-amber-900" dangerouslySetInnerHTML={{ __html: t('legalCookies.howControl.important') }} />
                  </div>
                </section>

                {/* CONSENT */}
                <section id="consent" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalCookies.consent.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.consent.p1')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.consent.p2')}
                  </p>
                </section>

                {/* THIRD-PARTY COOKIES */}
                <section id="third-party" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalCookies.thirdParty.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.thirdParty.p1')}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    {(t('legalCookies.thirdParty.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.thirdParty.p2')}
                  </p>
                  <p className="text-gray-700">
                    {t('legalCookies.thirdParty.p3')}
                  </p>
                </section>

                {/* UPDATES */}
                <section id="updates" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalCookies.updates.title')}</h2>
                  <p className="text-gray-700 mb-4">
                    {t('legalCookies.updates.p1')}
                  </p>
                  <p className="text-gray-700">
                    {t('legalCookies.updates.p2')}
                  </p>
                </section>

                {/* CONTACT */}
                <section id="contact" className="mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('legalCookies.contact.title')}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('legalCookies.contact.p1')}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <a
                      href="/legal/privacy"
                      className="text-[#C9A227] hover:text-[#B8921F] font-medium underline"
                    >
                      {t('legalCookies.contact.privacy')}
                    </a>
                    <span className="text-gray-400">•</span>
                    <a
                      href="/legal/terms"
                      className="text-[#C9A227] hover:text-[#B8921F] font-medium underline"
                    >
                      {t('legalCookies.contact.terms')}
                    </a>
                  </div>
                  <Button
                    onClick={() => window.location.href = '/company/contact'}
                    className="bg-[#C9A227] hover:bg-[#B8921F]"
                    data-cta="cookies_contact"
                  >
                    {t('legalCookies.contact.cta')}
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

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function LegalCookies() {
  useSEO({
    title: 'Cookie Policy | Aliph Solutions',
    description: 'Aliph Solutions cookie policy—how we use cookies and similar technologies and how you can control them.',
    keywords: 'cookie policy, cookies, tracking, analytics, Aliph Solutions',
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'what-are-cookies', label: 'What Are Cookies' },
    { id: 'types-used', label: 'Types of Cookies We Use' },
    { id: 'how-control', label: 'How to Control Cookies' },
    { id: 'consent', label: 'Cookie Consent' },
    { id: 'third-party', label: 'Third-Party Cookies' },
    { id: 'updates', label: 'Updates to this Policy' },
    { id: 'contact', label: 'Contact' }
  ];

  const cookieTypes = [
    {
      type: 'Necessary Cookies',
      purpose: 'Essential for the Site to function properly',
      examples: 'Session management, security, load balancing',
      control: 'Cannot be disabled as they are required for site operation'
    },
    {
      type: 'Analytics Cookies',
      purpose: 'Help us understand how visitors use the Site',
      examples: 'Page views, time on site, navigation patterns, referral sources',
      control: 'Can be controlled through browser settings or consent preferences'
    },
    {
      type: 'Functional Cookies',
      purpose: 'Remember your preferences and choices',
      examples: 'Language preferences, region settings, form data',
      control: 'Can be controlled through browser settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1220] to-[#1a1f35] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-8 h-8 text-[#C9A227]" />
            <span className="text-sm text-[#C9A227]">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-4">
            This Cookie Policy explains how Aliph Solutions uses cookies and similar technologies on our website and how you can control them.
          </p>
          <p className="text-sm text-gray-400">Last updated: January 8, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* TABLE OF CONTENTS */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4">Contents</h3>
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
                  This policy may be updated; check this page for changes.
                </p>
              </Card>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3 prose prose-gray max-w-none">
              <Card className="p-8 md:p-12">
                {/* WHAT ARE COOKIES */}
                <section id="what-are-cookies" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
                  <p className="text-gray-700 mb-4">
                    Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They help websites remember your actions and preferences over time, improving your browsing experience.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Similar technologies include web beacons, pixels, and local storage, which serve similar purposes. For simplicity, this policy refers to all such technologies as "cookies."
                  </p>
                </section>

                {/* TYPES OF COOKIES */}
                <section id="types-used" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
                  <p className="text-gray-700 mb-6">
                    We may use the following types of cookies on the Aliph Solutions website:
                  </p>

                  <div className="space-y-6">
                    {cookieTypes.map((cookie, idx) => (
                      <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{cookie.type}</h3>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Purpose:</p>
                            <p className="text-gray-700">{cookie.purpose}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Examples:</p>
                            <p className="text-gray-700">{cookie.examples}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Control:</p>
                            <p className="text-gray-700">{cookie.control}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 border-l-4 border-[#C9A227] rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> We do not currently use marketing or advertising cookies that track you across multiple websites. If this changes, we will update this policy and provide additional control options.
                    </p>
                  </div>
                </section>

                {/* HOW TO CONTROL */}
                <section id="how-control" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Control Cookies</h2>
                  <p className="text-gray-700 mb-4">
                    You have several options to manage and control cookies:
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-700 mb-4">
                    Most web browsers allow you to control cookies through settings. You can typically:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                    <li>Block all cookies</li>
                    <li>Accept only first-party cookies</li>
                    <li>Delete cookies when you close your browser</li>
                    <li>Clear all cookies stored on your device</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Browser Help Resources</h3>
                  <p className="text-gray-700 mb-4">
                    For instructions on managing cookies in popular browsers:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                    <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies</li>
                    <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy & Security &gt; Cookies</li>
                    <li><strong>Safari:</strong> Preferences &gt; Privacy</li>
                    <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions</li>
                  </ul>

                  <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded">
                    <p className="text-sm text-amber-900">
                      <strong>Important:</strong> Blocking or deleting cookies may affect your ability to use certain features of the Site and may impact your browsing experience.
                    </p>
                  </div>
                </section>

                {/* CONSENT */}
                <section id="consent" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookie Consent</h2>
                  <p className="text-gray-700 mb-4">
                    When you first visit the Aliph Solutions website, you may see a notice informing you about our use of cookies. By continuing to use the Site, you consent to our use of cookies as described in this policy.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Where required by law, we will obtain your explicit consent before placing non-essential cookies on your device. You can withdraw your consent at any time by adjusting your browser settings or contacting us.
                  </p>
                </section>

                {/* THIRD-PARTY COOKIES */}
                <section id="third-party" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
                  <p className="text-gray-700 mb-4">
                    We may use third-party services that place cookies on your device to help us analyze Site usage and improve performance. These services may include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    <li><strong>Analytics providers:</strong> To understand traffic patterns, visitor behavior, and site performance</li>
                    <li><strong>Hosting providers:</strong> To deliver and secure the Site infrastructure</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Third-party providers have their own privacy policies and cookie practices. We encourage you to review their policies to understand how they collect and use information.
                  </p>
                  <p className="text-gray-700">
                    We do not control third-party cookies and are not responsible for their practices. You can opt out of third-party analytics cookies through your browser settings or the provider's opt-out mechanisms.
                  </p>
                </section>

                {/* UPDATES */}
                <section id="updates" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Updates to this Policy</h2>
                  <p className="text-gray-700 mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. Changes will be posted on this page with an updated "Last updated" date.
                  </p>
                  <p className="text-gray-700">
                    We encourage you to review this policy periodically to stay informed about how we use cookies.
                  </p>
                </section>

                {/* CONTACT */}
                <section id="contact" className="mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
                  <p className="text-gray-700 mb-6">
                    If you have questions about this Cookie Policy or how we use cookies, please contact us.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <a
                      href="/legal/privacy"
                      className="text-[#C9A227] hover:text-[#B8921F] font-medium underline"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-gray-400">•</span>
                    <a
                      href="/legal/terms"
                      className="text-[#C9A227] hover:text-[#B8921F] font-medium underline"
                    >
                      Terms of Use
                    </a>
                  </div>
                  <Button
                    onClick={() => window.location.href = '/company/contact'}
                    className="bg-[#C9A227] hover:bg-[#B8921F]"
                    data-cta="cookies_contact"
                  >
                    Contact Us
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

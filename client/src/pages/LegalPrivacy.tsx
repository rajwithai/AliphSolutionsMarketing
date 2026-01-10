import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function LegalPrivacy() {
  useSEO({
    title: 'Privacy Policy | Aliph Solutions',
    description: 'Aliph Solutions privacy policy—how we collect, use, and protect personal information when you use our website and services.',
    keywords: 'privacy policy, data protection, PDPL, personal information, Aliph Solutions',
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'scope', label: 'Scope' },
    { id: 'information-collect', label: 'Information We Collect' },
    { id: 'how-use', label: 'How We Use Information' },
    { id: 'legal-bases', label: 'Legal Bases' },
    { id: 'cookies', label: 'Cookies & Analytics' },
    { id: 'sharing', label: 'Sharing & Disclosures' },
    { id: 'transfers', label: 'International Transfers' },
    { id: 'retention', label: 'Data Retention' },
    { id: 'security', label: 'Security Measures' },
    { id: 'rights', label: 'Your Choices & Rights' },
    { id: 'third-party', label: 'Third-Party Links' },
    { id: 'updates', label: 'Updates to this Policy' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1220] to-[#1a1f35] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#C9A227]" />
            <span className="text-sm text-[#C9A227]">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-4">
            This Privacy Policy explains how Aliph Solutions collects, uses, and protects personal information when you use our website or interact with our services.
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
                {/* SCOPE */}
                <section id="scope" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Scope</h2>
                  <p className="text-gray-700 mb-4">
                    This Privacy Policy applies to information collected through the Aliph Solutions website and when you interact with us regarding our advisory, managed services, or technology offerings.
                  </p>
                  <p className="text-gray-700">
                    For client engagements, additional contractual terms and data processing agreements may apply. Those terms will govern the handling of information specific to the engagement.
                  </p>
                </section>

                {/* INFORMATION WE COLLECT */}
                <section id="information-collect" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                  <p className="text-gray-700 mb-4">We may collect the following categories of information:</p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    <li>Name, email address, company name, and role/title</li>
                    <li>Phone number (if provided)</li>
                    <li>Location and sector information</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Inquiry Details</h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    <li>Information about your compliance needs, sector, and timeline</li>
                    <li>Details provided in contact forms or demo requests</li>
                    <li>Preferences indicated during interactions</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Website Usage Data</h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    <li>IP address, device type, and browser information</li>
                    <li>Pages visited, time spent, and navigation patterns</li>
                    <li>Referral source and search terms used to find our site</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Newsletter Subscription</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Email address and optional company information for regulatory updates</li>
                  </ul>
                </section>

                {/* HOW WE USE INFORMATION */}
                <section id="how-use" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Use Information</h2>
                  <p className="text-gray-700 mb-4">We may use collected information for the following purposes:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Respond to inquiries:</strong> Provide requested information, schedule calls, and share demos or proposals</li>
                    <li><strong>Deliver services:</strong> Support engagement scoping, delivery, and follow-up communication</li>
                    <li><strong>Improve site performance:</strong> Understand how visitors use the site and optimize content relevance</li>
                    <li><strong>Send communications:</strong> Deliver newsletters and regulatory updates if you have opted in (with unsubscribe option)</li>
                    <li><strong>Comply with legal obligations:</strong> Meet regulatory, audit, or legal requirements where applicable</li>
                  </ul>
                </section>

                {/* LEGAL BASES */}
                <section id="legal-bases" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal Bases (General)</h2>
                  <p className="text-gray-700 mb-4">We process personal information based on the following general principles:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Consent:</strong> Where you have provided consent (e.g., newsletter subscription, cookie acceptance)</li>
                    <li><strong>Legitimate interests:</strong> To respond to business inquiries, improve site functionality, and support operational needs</li>
                    <li><strong>Contractual necessity:</strong> To perform obligations under an engagement agreement if you become a client</li>
                    <li><strong>Legal obligations:</strong> To comply with applicable laws and regulations where required</li>
                  </ul>
                </section>

                {/* COOKIES & ANALYTICS */}
                <section id="cookies" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookies & Analytics</h2>
                  <p className="text-gray-700 mb-4">
                    We may use cookies and similar technologies to collect usage data and improve your experience. Analytics tools may be used to understand site traffic and visitor behavior.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You can control cookie preferences through your browser settings. For more details, see our{' '}
                    <a href="/legal/cookies" className="text-[#C9A227] hover:text-[#B8921F] underline">
                      Cookie Policy
                    </a>.
                  </p>
                </section>

                {/* SHARING & DISCLOSURES */}
                <section id="sharing" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Sharing & Disclosures</h2>
                  <p className="text-gray-700 mb-4">We may share information in the following circumstances:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Service providers:</strong> With hosting, email delivery, analytics, and other service providers that support site operations (under confidentiality obligations)</li>
                    <li><strong>Legal requirements:</strong> If required by law, regulation, legal process, or governmental request</li>
                    <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets (where applicable)</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    <strong>We do not sell personal data.</strong>
                  </p>
                </section>

                {/* INTERNATIONAL TRANSFERS */}
                <section id="transfers" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">International Transfers</h2>
                  <p className="text-gray-700 mb-4">
                    Some service providers may process data in jurisdictions outside Saudi Arabia. Where such transfers occur, we take reasonable steps to protect data in accordance with applicable standards and contractual safeguards.
                  </p>
                  <p className="text-gray-700">
                    Specific data residency and transfer controls may be implemented for client engagements depending on the engagement model and requirements.
                  </p>
                </section>

                {/* DATA RETENTION */}
                <section id="retention" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Retention</h2>
                  <p className="text-gray-700 mb-4">We retain personal information for as long as needed to fulfill the purposes described in this policy, including:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Inquiry and engagement records: As long as necessary for business, legal, and audit purposes</li>
                    <li>Newsletter subscriptions: Until you unsubscribe</li>
                    <li>Website usage data: Typically retained for a limited period as determined by analytics providers</li>
                  </ul>
                </section>

                {/* SECURITY MEASURES */}
                <section id="security" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Measures</h2>
                  <p className="text-gray-700 mb-4">We implement reasonable technical and organizational measures to protect personal information, including:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Access controls and role-based permissions</li>
                    <li>Secure hosting practices with reputable providers</li>
                    <li>Least privilege principles for data access</li>
                    <li>Monitoring and logging where applicable</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    For more information, see our{' '}
                    <a href="/security" className="text-[#C9A227] hover:text-[#B8921F] underline">
                      Security Statement
                    </a>.
                  </p>
                </section>

                {/* YOUR RIGHTS */}
                <section id="rights" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Choices & Rights</h2>
                  <p className="text-gray-700 mb-4">Depending on your jurisdiction and the nature of our relationship, you may have rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Opt-out of marketing:</strong> Unsubscribe from newsletters via the link in email communications</li>
                    <li><strong>Access and correction:</strong> Request access to or correction of your information where applicable</li>
                    <li><strong>Deletion:</strong> Request deletion of your information, subject to legal and contractual obligations</li>
                    <li><strong>Withdraw consent:</strong> Withdraw consent where processing is based on consent</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    To exercise these rights, contact us via the method below.
                  </p>
                </section>

                {/* THIRD-PARTY LINKS */}
                <section id="third-party" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
                  <p className="text-gray-700">
                    Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any information.
                  </p>
                </section>

                {/* UPDATES */}
                <section id="updates" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Updates to this Policy</h2>
                  <p className="text-gray-700 mb-4">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
                  </p>
                  <p className="text-gray-700">
                    Continued use of the website after changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                {/* CONTACT */}
                <section id="contact" className="mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
                  <p className="text-gray-700 mb-6">
                    If you have questions about this Privacy Policy or wish to exercise your rights, please contact us.
                  </p>
                  <Button
                    onClick={() => window.location.href = '/company/contact'}
                    className="bg-[#C9A227] hover:bg-[#B8921F]"
                    data-cta="privacy_contact"
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

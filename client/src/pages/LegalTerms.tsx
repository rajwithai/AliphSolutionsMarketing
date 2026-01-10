import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function LegalTerms() {
  useSEO({
    title: 'Terms of Use | Aliph Solutions',
    description: 'Aliph Solutions website terms of use—conditions for accessing and using this site and its content.',
    keywords: 'terms of use, terms and conditions, website terms, Aliph Solutions',
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'acceptance', label: 'Acceptance of Terms' },
    { id: 'use-of-site', label: 'Use of Site' },
    { id: 'intellectual-property', label: 'Intellectual Property' },
    { id: 'disclaimers', label: 'Disclaimers' },
    { id: 'limitation', label: 'Limitation of Liability' },
    { id: 'third-party', label: 'Links to Third Parties' },
    { id: 'privacy', label: 'Privacy and Cookies' },
    { id: 'changes', label: 'Changes to Terms' },
    { id: 'governing-law', label: 'Governing Law' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1220] to-[#1a1f35] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-[#C9A227]" />
            <span className="text-sm text-[#C9A227]">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-4">
            These Terms of Use govern your access to and use of the Aliph Solutions website and its content.
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
                  These terms may be updated; check this page for changes.
                </p>
              </Card>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3 prose prose-gray max-w-none">
              <Card className="p-8 md:p-12">
                {/* ACCEPTANCE */}
                <section id="acceptance" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
                  <p className="text-gray-700 mb-4">
                    By accessing or using the Aliph Solutions website ("Site"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
                  </p>
                  <p className="text-gray-700">
                    These terms apply to all visitors, users, and others who access the Site. Additional terms may apply to specific services, engagements, or partnerships.
                  </p>
                </section>

                {/* USE OF SITE */}
                <section id="use-of-site" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Use of Site</h2>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Permitted Use</h3>
                  <p className="text-gray-700 mb-4">You may use the Site for lawful purposes, including:</p>
                  <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                    <li>Learning about Aliph Solutions' services, technology, and offerings</li>
                    <li>Submitting inquiries or engagement requests</li>
                    <li>Accessing resources and informational materials</li>
                    <li>Subscribing to newsletters and regulatory updates</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Prohibited Use</h3>
                  <p className="text-gray-700 mb-4">You agree not to:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Use the Site in any manner that violates applicable laws or regulations</li>
                    <li>Attempt to gain unauthorized access to any part of the Site or related systems</li>
                    <li>Use automated systems (e.g., bots, scrapers) to access or collect data from the Site without permission</li>
                    <li>Interfere with or disrupt the Site's operation or infrastructure</li>
                    <li>Impersonate any person or entity or falsely represent your affiliation</li>
                    <li>Upload malicious code, viruses, or harmful materials</li>
                  </ul>
                </section>

                {/* INTELLECTUAL PROPERTY */}
                <section id="intellectual-property" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                  <p className="text-gray-700 mb-4">
                    All content on the Site, including text, graphics, logos, images, software, templates, frameworks, and methodologies (collectively, "Content"), is the property of Aliph Solutions or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Materials on this Site may not be copied, distributed, modified, reproduced, published, or used to create derivative works without the express written permission of Aliph Solutions.</strong>
                  </p>
                  <p className="text-gray-700">
                    Limited viewing and printing for personal, non-commercial use is permitted. Any other use requires prior written authorization.
                  </p>
                </section>

                {/* DISCLAIMERS */}
                <section id="disclaimers" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Disclaimers</h2>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Informational Purposes Only</h3>
                  <p className="text-gray-700 mb-4">
                    The information provided on this Site is for general informational purposes only. It does not constitute legal, compliance, regulatory, or professional advice. You should not rely on this information as a substitute for professional consultation tailored to your specific circumstances.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">No Warranties</h3>
                  <p className="text-gray-700 mb-4">
                    The Site and all Content are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Accuracy, completeness, or reliability of information</li>
                    <li>Fitness for a particular purpose or merchantability</li>
                    <li>Uninterrupted or error-free operation</li>
                    <li>Freedom from viruses or harmful components</li>
                  </ul>
                </section>

                {/* LIMITATION OF LIABILITY */}
                <section id="limitation" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">
                    To the maximum extent permitted by applicable law, Aliph Solutions and its affiliates, officers, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising out of or related to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                    <li>Your access to or use of (or inability to access or use) the Site</li>
                    <li>Any content or information obtained from the Site</li>
                    <li>Errors, inaccuracies, or omissions in Site content</li>
                    <li>Unauthorized access to or alteration of your data or transmissions</li>
                  </ul>
                  <p className="text-gray-700">
                    This limitation applies regardless of the theory of liability (contract, tort, negligence, or otherwise), even if Aliph Solutions has been advised of the possibility of such damages.
                  </p>
                </section>

                {/* THIRD-PARTY LINKS */}
                <section id="third-party" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Links to Third Parties</h2>
                  <p className="text-gray-700 mb-4">
                    The Site may contain links to third-party websites or services that are not owned or controlled by Aliph Solutions. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party sites.
                  </p>
                  <p className="text-gray-700">
                    You acknowledge and agree that Aliph Solutions shall not be responsible or liable for any damage or loss caused by your use of any third-party content, products, or services.
                  </p>
                </section>

                {/* PRIVACY AND COOKIES */}
                <section id="privacy" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy and Cookies</h2>
                  <p className="text-gray-700 mb-4">
                    Your use of the Site is also governed by our Privacy Policy and Cookie Policy. Please review these documents to understand how we collect, use, and protect your information.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/legal/privacy"
                      className="text-[#C9A227] hover:text-[#B8921F] font-medium underline"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-gray-400">•</span>
                    <a
                      href="/legal/cookies"
                      className="text-[#C9A227] hover:text-[#B8921F] font-medium underline"
                    >
                      Cookie Policy
                    </a>
                  </div>
                </section>

                {/* CHANGES TO TERMS */}
                <section id="changes" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                  <p className="text-gray-700 mb-4">
                    We may update these Terms of Use from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review these terms periodically.
                  </p>
                  <p className="text-gray-700">
                    Your continued use of the Site after changes are posted constitutes acceptance of the updated terms.
                  </p>
                </section>

                {/* GOVERNING LAW */}
                <section id="governing-law" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Governing Law</h2>
                  <p className="text-gray-700">
                    These Terms of Use shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, without regard to conflict of law principles. Any disputes arising from these terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of Riyadh, Saudi Arabia.
                  </p>
                </section>

                {/* CONTACT */}
                <section id="contact" className="mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
                  <p className="text-gray-700 mb-6">
                    If you have questions about these Terms of Use, please contact us.
                  </p>
                  <Button
                    onClick={() => window.location.href = '/company/contact'}
                    className="bg-[#C9A227] hover:bg-[#B8921F]"
                    data-cta="terms_contact"
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

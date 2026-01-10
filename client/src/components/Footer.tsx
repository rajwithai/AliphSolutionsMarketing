import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';
import logoImage from '@assets/aliph-logo-new.png';
import Vision2030Mark from '@/components/brand/Vision2030Mark';

// Newsletter validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email'),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

const footerSections = {
  platform: {
    title: 'Product & Platform',
    links: [
      { label: 'Security & Sovereignty', href: '/technology/security-sovereignty' },
      { label: 'Aliph Brain', href: '/technology/aliph-brain' },
      { label: 'AI Governance', href: '/technology/ai-governance' },
      { label: 'GRC Automation', href: '/technology/grc-automation-workflows' },
      { label: 'Integrations', href: '/technology/integrations' }
    ]
  },
  services: {
    title: 'Services',
    links: [
      { label: 'Advisory', href: '/advisory' },
      { label: 'Managed Services', href: '/managed-services' },
      { label: 'Government & Partnerships', href: '/partnerships' },
      { label: 'Request Proposal', href: '/company/contact' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About', href: '/company/about' },
      { label: 'Leadership', href: '/company/leadership' },
      // { label: 'Partners', href: '/company/partners' },
      // { label: 'Careers', href: '/company/careers' },
      { label: 'Contact', href: '/company/contact' },
      // { label: 'Investors', href: '/investors' }
    ]
  }
};

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    mode: 'onChange',
  });

  const onSubscribe = async (data: NewsletterData) => {
    setIsSubmitting(true);

    try {
      const payload = {
        name: 'Newsletter Subscriber',
        email: data.email,
        company: '',
        phone: '',
        subject: 'Newsletter Subscription',
        message: `Newsletter subscription request from ${data.email}`,
        inquiryType: 'general' as const,
        language: 'en',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubscribed(true);
        reset();
        setTimeout(() => {
          setSubscribed(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#0B1220] text-gray-300 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand + Newsletter */}
          <div>
            <Link href="/">
              <img
                src={logoImage}
                alt="Aliph Solutions"
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Sovereign AI advisory engine for Saudi GRC.
            </p>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Newsletter</h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubscribe)} className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Your email"
                      {...register('email')}
                      className={`bg-gray-900 border-gray-700 text-white text-sm ${errors.email ? 'border-red-500' : ''}`}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSubmitting}
                      className="bg-[#C9A227] hover:bg-[#B8921F] text-white disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : '→'}
                    </Button>
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email.message}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>
                      <span className="text-sm text-gray-400 hover:text-[#C9A227] transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2026 Aliph Solutions. All rights reserved.
            </div>
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-800 group relative">
              <Vision2030Mark size="md" className="opacity-80" />
              <span className="text-sm text-gray-400">Vision 2030 aligned</span>
              <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-64 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg text-xs text-gray-300 z-10">
                Use of the Vision 2030 logo indicates alignment with national priorities, not endorsement.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/legal/privacy"><span className="hover:text-[#C9A227] transition-colors">Privacy</span></Link>
            <Link href="/legal/terms"><span className="hover:text-[#C9A227] transition-colors">Terms</span></Link>
            <Link href="/legal/cookies"><span className="hover:text-[#C9A227] transition-colors">Cookies</span></Link>
            <Link href="/security"><span className="hover:text-[#C9A227] transition-colors">Security</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

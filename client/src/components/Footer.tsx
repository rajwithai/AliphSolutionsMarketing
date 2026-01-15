import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
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


export default function Footer() {
  const { t } = useTranslation();
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const footerSections = {
    platform: {
      title: t('footer.technology'),
      links: [
        { label: t('footer.securitySovereignty'), href: '/technology/security-sovereignty' },
        { label: t('footer.aliphBrain'), href: '/technology/aliph-brain' },
        { label: t('footer.aiGovernance'), href: '/technology/ai-governance' },
        { label: t('footer.grcAutomation'), href: '/technology/grc-automation-workflows' },
        { label: t('footer.integrations'), href: '/technology/integrations' }
      ]
    },
    services: {
      title: t('footer.solutions'),
      links: [
        { label: t('footer.advisory'), href: '/advisory' },
        { label: t('footer.managedServices'), href: '/managed-services' },
        { label: t('footer.deliverables'), href: '/deliverables' }
      ]
    },
    company: {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), href: '/company/about' },
        { label: t('footer.leadership'), href: '/company/leadership' },
        { label: t('footer.contact'), href: '/company/contact' },
        { label: t('footer.investors'), href: '/investors' }
      ]
    }
  };

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
              {t('footer.tagline')}
            </p>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">{t('footer.newsletter')}</h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('home.finalCTA.newsletterSuccess')}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubscribe)} className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder={t('home.finalCTA.newsletterPlaceholder')}
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
              {t('footer.copyright')}
            </div>
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-800 group relative">
              <Vision2030Mark size="md" className="opacity-80" />
              <span className="text-sm text-gray-400">{t('footer.disclaimer')}</span>
              <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-64 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg text-xs text-gray-300 z-10">
                {t('home.vision2030.disclaimer')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/legal/privacy"><span className="hover:text-[#C9A227] transition-colors">{t('footer.privacy')}</span></Link>
            <Link href="/legal/terms"><span className="hover:text-[#C9A227] transition-colors">{t('footer.terms')}</span></Link>
            <Link href="/legal/cookies"><span className="hover:text-[#C9A227] transition-colors">{t('footer.cookies')}</span></Link>
            <Link href="/security"><span className="hover:text-[#C9A227] transition-colors">{t('footer.security')}</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

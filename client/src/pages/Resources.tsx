import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { BookOpen, FileText, Users, Video, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

// Newsletter validation schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

export default function Resources() {
  useSEO({
    title: 'Resources | Aliph Solutions',
    description: 'Saudi-first regulatory intelligence, templates, guides, and practical insights for governance, risk, compliance, and AI governance.',
    keywords: 'Saudi compliance resources, regulatory intelligence, GRC templates, compliance guides, PDPL resources, NCA ECC resources',
  });

  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
    setServerError(null);

    try {
      // Map to API schema
      const payload = {
        name: data.company || 'Newsletter Subscriber',
        email: data.email,
        company: data.company,
        phone: '',
        subject: 'Newsletter Subscription',
        message: `Newsletter subscription request from ${data.email}${data.company ? ` (${data.company})` : ''}`,
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

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const errorMessages = result.errors.map((err: any) => err.message).join(', ');
          setServerError(errorMessages);
        } else {
          setServerError(result.message || 'Failed to subscribe. Please try again.');
        }
        return;
      }

      setSubscribed(true);
      reset();
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setServerError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const latestUpdates = [
    { date: '2026-01-05', title: 'PDPL Breach Notification Requirements Updated', excerpt: 'New guidance on incident reporting timelines', tags: ['PDPL', 'Privacy'], hub: 'pdpl' },
    { date: '2026-01-03', title: 'NCA ECC Control Testing Expectations', excerpt: 'Practical checklist for control evidence', tags: ['NCA ECC', 'Audit'], hub: 'nca-ecc' },
    { date: '2025-12-28', title: 'ZATCA E-Invoicing Phase 3 Scope', excerpt: 'What vendors need to prepare', tags: ['ZATCA', 'Tax'], hub: 'zatca' },
    { date: '2025-12-20', title: 'Qiwa Integration Best Practices', excerpt: 'HR operations governance for compliance', tags: ['MHRSD', 'HR'], hub: 'mhrsd-qiwa' },
    { date: '2025-12-15', title: 'Board Governance Reporting Standards', excerpt: 'What audit committees expect to see', tags: ['Governance', 'Risk'], hub: 'general' },
    { date: '2025-12-10', title: 'Third-Party Risk Assessment Templates', excerpt: 'Vendor due diligence for regulated environments', tags: ['Risk', 'Vendor'], hub: 'general' },
  ];

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Saudi-first</span>
              <span>•</span>
              <span>Practical</span>
              <span>•</span>
              <span>Audit-ready</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Resources
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Regulatory intelligence, toolkits, and practical guidance—built for leaders who need clarity and execution, not noise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/resources/regulatory-intelligence'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="resources_explore_intelligence"
              >
                Explore Regulatory Intelligence
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/deliverables'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Request Sample Deliverables
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => window.location.href = '/company/contact'}
                className="text-white hover:bg-white/10"
              >
                Book a Readiness Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED MODULES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What You'll Find Here
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/resources/regulatory-intelligence'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <BookOpen className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Regulatory Intelligence</h3>
              <p className="text-gray-600 mb-4">
                PDPL, NCA ECC, ZATCA, and workforce compliance—summarized into practical actions.
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                Explore
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/resources/templates'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <FileText className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Templates & Toolkits</h3>
              <p className="text-gray-600 mb-4">
                Evidence checklists, policy frameworks, and audit-ready templates.
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                Explore
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/resources/guides'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <BookOpen className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Guides</h3>
              <p className="text-gray-600 mb-4">
                Practical how-to guides for governance, risk management, and compliance operations.
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                Explore
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/resources/case-studies'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Users className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Case Studies</h3>
              <p className="text-gray-600 mb-4">
                Real implementations showing how organizations achieve compliance and governance.
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                Explore
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3: LATEST UPDATES */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest Updates</h2>
              <p className="text-gray-600">Recent regulatory intelligence and practical guidance</p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/resources/regulatory-intelligence'}
            >
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestUpdates.map((update, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg cursor-pointer"
                    onClick={() => window.location.href = `/resources/regulatory-intelligence/${update.hub}`}>
                <div className="text-sm text-gray-500 mb-2">{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{update.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{update.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {update.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: NEWSLETTER CAPTURE */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-[#0B1220] to-[#1a1f35] text-white border-2 border-[#C9A227]/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Monthly Saudi Regulatory Brief</h2>
            <p className="text-xl text-gray-300 mb-8">
              Practical updates for PDPL, NCA ECC, ZATCA, and workforce compliance—written for executives.
            </p>

            {subscribed ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-green-400">Subscribed! Check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubscribe)} className="space-y-4">
                {/* Server Error Display */}
                {serverError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{serverError}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newsletter-email" className={errors.email ? 'text-red-400 mb-2 block' : 'sr-only'}>
                      {errors.email ? errors.email.message : 'Email'}
                    </Label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="Work email *"
                      {...register('email')}
                      className={`bg-white/10 border-white/30 text-white placeholder:text-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <Input
                    id="newsletter-company"
                    type="text"
                    placeholder="Company (optional)"
                    {...register('company')}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-[#C9A227] hover:bg-[#B8921F] text-white disabled:opacity-50"
                    data-cta="resources_subscribe"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                  <p className="text-sm text-gray-400 mt-2">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* SECTION 5: CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Clarity on Your Obligations?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Turn regulatory complexity into implementation-ready plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/company/contact'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Request a Readiness Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/deliverables'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Request Sample Deliverables
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

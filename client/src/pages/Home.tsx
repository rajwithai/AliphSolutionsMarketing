import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import RequestModal from '@/components/RequestModal';
import SovereignHero from '@/components/SovereignHero';
import AssetsSection from '@/components/AssetsSection';
import DeliverablesSection from '@/components/DeliverablesSection';
import WhoWeServeSection from '@/components/WhoWeServeSection';
import { Shield, Zap, CheckCircle2, FileText, Lock, Database, Users, Building2, TrendingUp, ArrowRight, Brain, Scale, Loader2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import vision2030Logo from '@assets/vision2030.png';

// Newsletter validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email'),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

export default function Home() {
  useSEO({
    title: 'Aliph Solutions - Sovereign AI Advisory Engine for Saudi GRC',
    description: 'Big Four discipline, accelerated by governed AI workflows—delivering audit-ready outcomes for PDPL, NCA ECC, ZATCA, enterprise governance, ERM, and internal audit.',
    keywords: 'Saudi Arabia GRC, PDPL compliance, NCA ECC, ZATCA, AI governance, sovereign AI, compliance automation, Saudi consulting',
  });

  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: handleNewsletterSubmit,
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
    <>
      <RequestModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} type="demo" />
      <RequestModal open={partnershipModalOpen} onClose={() => setPartnershipModalOpen(false)} type="partnership" />

      {/* SECTION 1: HERO */}
      <SovereignHero
        onDemoClick={() => setDemoModalOpen(true)}
        onPartnershipClick={() => setPartnershipModalOpen(true)}
      />

      {/* VISION 2030 ALIGNMENT BAND */}
      <section className="py-16 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  src={vision2030Logo}
                  alt="Vision 2030"
                  className="h-24 md:h-32 w-auto"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Aligned with Vision 2030
                </h3>
                <p className="text-base text-gray-600 leading-relaxed mb-2">
                  Supporting national priorities in data sovereignty, institutional readiness, and digital transformation for Saudi Arabia's governance ecosystem.
                </p>
                <p className="text-xs text-gray-500 italic">
                  Use of the Vision 2030 logo indicates alignment with national priorities, not endorsement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0B1220] relative overflow-hidden border-t border-white/5">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Two Forces Colliding — <br className="hidden md:block" />
              And the Path Forward for Saudi Enterprises
            </h2>
            <div className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed space-y-2">
              <p>
                <span className="text-white font-medium">Vision 2030</span> accelerates AI adoption across the Kingdom's transformation agenda.
              </p>
              <p>
                <span className="text-white font-medium">PDPL</span> enforcement is now fully active, demanding unbreakable data sovereignty and accountability.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Problem 1: The AI Risk */}
            <Card className="p-10 bg-white/[0.02] border border-white/10 hover:border-red-500/30 hover:bg-red-500/[0.02] transition-all duration-500 group h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-8 group-hover:bg-red-500/10 transition-colors">
                <Shield className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-red-400 transition-colors">
                Uncontrolled AI Creates Invisible Exposure at Enterprise Scale
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-500/70 mt-1.5 text-xs">●</span>
                  <span className="leading-relaxed">Employees and teams increasingly adopt public AI tools for speed, often bypassing formal procurement and governance controls.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500/70 mt-1.5 text-xs">●</span>
                  <span className="leading-relaxed">When sensitive data leaves sovereign control, accountability, audit trails, and national data residency are compromised — risking regulatory scrutiny in an active PDPL environment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500/70 mt-1.5 text-xs">●</span>
                  <span className="leading-relaxed">For PIF-linked entities, listed companies, and regulated institutions, this exposure threatens strategic projects and Vision 2030 commitments.</span>
                </li>
              </ul>
            </Card>

            {/* Problem 2: The Advisory Gap */}
            <Card className="p-10 bg-white/[0.02] border border-white/10 hover:border-[#C9A227]/30 hover:bg-[#C9A227]/[0.02] transition-all duration-500 group h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-8 group-hover:bg-[#C9A227]/10 transition-colors">
                <Scale className="w-7 h-7 text-gray-400 group-hover:text-[#C9A227] transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-[#C9A227] transition-colors">
                Elite Advisory Remains Inaccessible at Required Velocity
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A227]/70 mt-1.5 text-xs">●</span>
                  <span className="leading-relaxed">Traditional Big Four cycles — rigorous but slow and resource-intensive — struggle to match the pace of AI-driven transformation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A227]/70 mt-1.5 text-xs">●</span>
                  <span className="leading-relaxed">Compliance obligations (PDPL, CMA, SAMA, NCA) apply universally across organizations, yet procurement timelines and costs limit timely support.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A227]/70 mt-1.5 text-xs">●</span>
                  <span className="leading-relaxed">Enterprises need governed, audit-ready GRC solutions now — not after prolonged engagements.</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Closing Narrative */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8">
              We understand the pressures you face: delivering on Vision 2030's ambitious timeline while safeguarding data sovereignty in a regulated landscape.
              <br /><br />
              At <strong className="text-white">Aliph Solutions</strong>, we bridge this collision with sovereign AI-enabled advisory — combining 30+ years of proven Big Four expertise with governed, Kingdom-first architecture. Our 15-agent workflows and compounding Aliph Brain deliver precise, audit-ready outcomes — faster, more securely, and fully aligned with Saudi priorities.
            </p>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setDemoModalOpen(true); }}
              className="inline-flex items-center gap-2 text-[#C9A227] hover:text-[#B8921F] font-semibold text-lg transition-colors border-b border-[#C9A227]/30 hover:border-[#C9A227] pb-1"
            >
              Discover How We Resolve This Tension <ArrowRight className="w-5 h-5" /> Request a Sovereign Compliance Scan
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY ALIPH - COMPARISON */}
      <section className="py-24 bg-[#0B1220] border-t border-white/5 relative overflow-hidden">
        {/* Subtle Background Glow for Aliph Column */}
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A227]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              The Sovereign Advantage — <br className="hidden md:block" />
              Built for Saudi Regulated Environments
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Institutional rigor meets AI velocity — without compromising Kingdom-first sovereignty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Traditional Consulting - Receded */}
            <Card className="p-8 bg-white/[0.02] border border-white/5 opacity-80 hover:opacity-100 transition-all duration-500 hover:border-white/10 group h-full">
              <div className="text-center mb-6">
                <Building2 className="w-10 h-10 mx-auto text-gray-600 mb-4 group-hover:text-gray-400 transition-colors" />
                <h3 className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors">Traditional Consulting</h3>
              </div>
              <p className="text-center text-gray-500 mb-6 text-sm">Rigorous and trusted — but not optimized for AI-era velocity in regulated Saudi environments.</p>
              <ul className="space-y-3 text-sm text-gray-600 group-hover:text-gray-400 transition-colors text-center">
                <li className="flex items-center gap-2 justify-center"><span className="text-gray-700">•</span> Heavy manual execution</li>
                <li className="flex items-center gap-2 justify-center"><span className="text-gray-700">•</span> Long mobilization cycles</li>
                <li className="flex items-center gap-2 justify-center"><span className="text-gray-700">•</span> Linear engagement models</li>
              </ul>
            </Card>

            {/* Generic AI - Receded */}
            <Card className="p-8 bg-white/[0.02] border border-white/5 opacity-80 hover:opacity-100 transition-all duration-500 hover:border-red-500/20 group h-full">
              <div className="text-center mb-6">
                <Zap className="w-10 h-10 mx-auto text-gray-600 mb-4 group-hover:text-red-400 transition-colors" />
                <h3 className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors">Generic AI</h3>
              </div>
              <p className="text-center text-gray-500 mb-6 text-sm">Fast and flexible — but misaligned with Saudi regulatory requirements.</p>
              <ul className="space-y-3 text-sm text-gray-600 group-hover:text-gray-400 transition-colors text-center">
                <li className="flex items-center gap-2 justify-center"><span className="text-red-900">•</span> Data sovereignty exposure (risks to PDPL compliance)</li>
                <li className="flex items-center gap-2 justify-center"><span className="text-red-900">•</span> Non-contextual, broad outputs lacking audit trails</li>
                <li className="flex items-center gap-2 justify-center"><span className="text-red-900">•</span> No regulator-grade validation or traceability</li>
              </ul>
            </Card>

            {/* Aliph - Dominant */}
            <Card className="relative p-10 bg-[#0B1220] border border-[#C9A227] shadow-[0_0_60px_-15px_rgba(201,162,39,0.15)] transform md:scale-110 md:-mt-4 z-20 h-full flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-[#C9A227]/10 to-transparent opacity-20" />
              <div className="relative z-10 text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-[#C9A227]/20">
                  <Brain className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Aliph Solutions</h3>
                <span className="text-[#C9A227] text-xs font-bold tracking-widest uppercase">THE SOVEREIGN STANDARD</span>
              </div>
              <ul className="space-y-4 text-sm relative z-10 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <span className="text-gray-200">Big Four-grade validation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <span className="text-gray-200">Sovereign-hosted infrastructure (KSA Azure Region, edge-ready)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <span className="text-gray-200">Audit-ready GRC outputs with unbreakable compliance checks</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <span className="text-gray-200">Instant expert deployment within governed 15-AI Agent workflows</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <span className="text-gray-200">Compounding intelligence via the Aliph Brain — quality improves with every engagement</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center mt-20 max-w-3xl mx-auto">
            <p className="text-lg text-gray-400 font-light mb-8">
              We bridge the gap between <span className="font-semibold text-white">institutional rigor</span> and <span className="font-semibold text-white">AI velocity</span> — delivering precise, audit-ready outcomes that accelerate Vision 2030 commitments while preserving full data sovereignty.
              <br className="hidden md:block" />
              We are honored to support Saudi enterprises and institutions in this transformative era.
            </p>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setDemoModalOpen(true); }}
              className="inline-flex items-center gap-2 text-[#C9A227] hover:text-[#B8921F] font-semibold text-lg transition-colors border-b border-[#C9A227]/30 hover:border-[#C9A227] pb-1"
            >
              Discover the Sovereign Advantage <ArrowRight className="w-5 h-5" /> Request Private Demo
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: ASSETS BEHIND ALIPH (Redesigned with Slide-Over) */}
      <AssetsSection />

      {/* SECTION 5: DELIVERABLES */}
      {/* SECTION 5: DELIVERABLES (Redesigned with Preview Modal) */}
      <DeliverablesSection />

      {/* SECTION 6: ARCHITECTURE */}
      <section className="py-20 bg-[#0B1220] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Sovereign AI Workflow Layer
          </h2>
          <p className="text-xl text-center text-gray-300 mb-16">
            AI workflows that don't break compliance
          </p>

          {/* Simple Flow Diagram */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1">
              {[
                { label: 'Inputs', icon: Database, desc: 'Docs, policies, obligations' },
                { label: 'Privacy Layer', icon: Shield, desc: 'Data minimization' },
                { label: 'Policy Engine', icon: Lock, desc: 'Role controls' },
                { label: 'Workflows', icon: Brain, desc: 'Agentic processing' },
                { label: 'Validation', icon: Users, desc: 'Expert review' },
                { label: 'Output', icon: FileText, desc: 'Audit pack' },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center">
                  <Card className="p-4 bg-white/5 border-white/10 text-center hover:bg-white/10 transition-all min-w-[140px] w-[140px] min-h-[120px] flex flex-col items-center justify-center">
                    <step.icon className="w-8 h-8 mx-auto mb-2 text-[#C9A227]" />
                    <h4 className="font-bold text-sm mb-1 text-white leading-tight">{step.label}</h4>
                    <p className="text-xs text-gray-300 leading-tight">{step.desc}</p>
                  </Card>
                  {idx < 5 && (
                    <div className="hidden md:flex items-center px-4">
                      <ArrowRight className="w-8 h-8 text-[#C9A227] flex-shrink-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              'Data minimization + optional masking',
              'Role-based controls and approvals',
              'Traceability via audit logs',
              'Evidence-ready deliverables',
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-300">{point}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              onClick={() => setDemoModalOpen(true)}
            >
              Speak to an Architect
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: MARKET STATS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Market Opportunity — <br className="hidden md:block" />
              Why Now for Saudi Enterprises
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              Vision 2030 accelerates digital transformation and AI adoption — while active PDPL enforcement demands unbreakable sovereignty and compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'KSA Consulting Market', value: '$4.3B+', sublabel: '2025 annual size, leading GCC growth' },
              { label: 'GRC Platform & Advisory Growth', value: '11–13% CAGR', sublabel: '2025–2033 projection' },
              { label: 'PDPL Maximum Fine', value: 'SAR 5M', sublabel: 'Per violation (active enforcement ceiling)' },
              { label: 'Vision 2030 Pipeline', value: '$1T+', sublabel: 'Mega-projects driving compliance demand' },
              { label: 'Active Mega-Projects', value: '50+', sublabel: 'Requiring Audit-Ready GRC' },
              { label: 'AI Adoption Growth', value: '45%+', sublabel: 'YoY, fueled by national initiatives' },
            ].map((stat, idx) => (
              <Card key={idx} className="p-8 text-center border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group">
                <div className="text-4xl md:text-5xl font-bold text-[#C9A227] mb-3 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                <div className="font-bold text-lg text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.sublabel}</div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 italic mb-8 max-w-2xl mx-auto">
              Indicative market signals based on 2025–2026 reports (Mordor Intelligence, Source Global Research, IMARC, SDAIA updates). Sources available upon request.
            </p>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setDemoModalOpen(true); }}
              className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#B8921F] text-white font-semibold py-3 px-6 rounded-md transition-colors shadow-sm hover:shadow-md"
            >
              See How Aliph Positions Your Organization <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 8: TARGET & TRAJECTORY (Redesigned with Accordion) */}
      <WhoWeServeSection />

      {/* SECTION 9: FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-1 bg-gradient-to-r from-[#C9A227] to-[#B8921F] mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Build Sovereign, Audit-Ready GRC for Vision 2030
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Secure, Kingdom-first GRC delivery — powered by governed AI workflows and senior-led expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D] text-white text-lg px-8"
            >
              Schedule a Sovereign Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setPartnershipModalOpen(true)}
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8"
            >
              Request Government Engagement Brief
            </Button>
          </div>

          {/* Newsletter */}
          <div className="max-w-md mx-auto">
            <p className="text-sm text-gray-400 mb-4 text-center">Receive Saudi regulatory intelligence briefs (PDPL, NCA ECC, ZATCA) — concise and action-ready.</p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm py-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit(onSubscribe)}>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Work email"
                    {...register('email')}
                    className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#C9A227] hover:bg-[#B8921F] disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get Briefs'}
                  </Button>
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 mt-2">{errors.email.message}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, Brain, Users, CheckCircle2, ArrowRight, Target, Zap } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function CompanyAbout() {
  useSEO({
    title: 'About | Aliph Solutions',
    description: 'Aliph Solutions is a Saudi-first sovereign AI advisory engine for governance, risk, compliance, and AI governance—delivering audit-ready outcomes aligned with Vision 2030.',
    keywords: 'Aliph Solutions about, Saudi GRC advisory, sovereign AI, Vision 2030, compliance advisory Saudi Arabia',
  });

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[75vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Saudi-first</span>
              <span>•</span>
              <span>Sovereign-by-Design</span>
              <span>•</span>
              <span>Audit-ready delivery</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              About Aliph Solutions
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              We exist to help Saudi organizations modernize governance, risk, and compliance—and adopt AI safely—through a sovereign-by-design advisory delivery system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/deliverables'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                Request Sample Deliverables
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/company/contact'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Contact Aliph
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => window.location.href = '/technology/security-sovereignty'}
                className="text-white hover:bg-white/10"
              >
                Speak to an Architect
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE WHY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why We Built Aliph
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              AI adoption is accelerating across teams—driving productivity, but also creating exposure without clear governance.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Accountability is accelerating through regulation and audit expectations—PDPL, NCA ECC, ZATCA, and board-level scrutiny.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Most organizations need speed—but cannot sacrifice sovereignty, control, and auditability.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-[#C9A227]/10 to-white border-2 border-[#C9A227]/30">
            <p className="text-2xl font-bold text-gray-900 text-center">
              Aliph is designed for AI speed with governance—not AI at any cost.
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 3: MISSION & VISION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <Target className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Mission</h3>
              <p className="text-lg text-gray-700">
                Make audit-ready GRC delivery faster, clearer, and governable—built for Saudi realities.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all">
              <Zap className="w-12 h-12 text-[#C9A227] mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Vision</h3>
              <p className="text-lg text-gray-700">
                Become the leading Saudi-first governed AI advisory ecosystem for regulatory modernization and institutional readiness.
              </p>
            </Card>
          </div>

          <p className="text-center text-gray-700 italic max-w-3xl mx-auto">
            Aligned with the Kingdom's digital transformation and data sovereignty direction under Vision 2030.
          </p>
        </div>
      </section>

      {/* SECTION 4: WHAT MAKES US DIFFERENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            What Makes Aliph Different
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/advisory'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Users className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Advisory Discipline</h3>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">What it means:</span> Consulting-grade methods, implementation-first delivery, owners and timelines, evidence packaging.
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Why it matters:</span> Deliverables that work, not just documentation that sits on shelves.
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                Explore Advisory
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/technology/security-sovereignty'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Shield className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Sovereign AI Architecture</h3>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">What it means:</span> Policy enforcement, audit logs, data minimization, access controls, deployment patterns for strict environments.
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Why it matters:</span> Control and auditability, not black-box risk.
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                Security & Sovereignty
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => window.location.href = '/technology/aliph-brain'}>
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Brain className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">The Aliph Brain</h3>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">What it means:</span> Organizational memory + workflow library + validation layer = repeatable, governed outputs.
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Why it matters:</span> Faster delivery without losing rigor or accountability.
              </p>
              <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                See the Aliph Brain
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW WE WORK */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            How We Work
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Operating principles that guide every engagement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { title: 'Clarity before complexity', desc: 'Diagnose, then build' },
              { title: 'Implementation over slides', desc: 'Owners, timelines, evidence' },
              { title: 'Governed AI', desc: 'Workflows + validation, not black boxes' },
              { title: 'Security by design', desc: 'Minimization, controls, traceability' },
              { title: 'Saudi-first delivery', desc: 'Local expectations, real operating models' },
              { title: 'Partnership mindset', desc: 'Fit-to-environment, long-term readiness' }
            ].map((principle, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <h3 className="text-lg font-bold mb-2 text-gray-900">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.desc}</p>
              </Card>
            ))}
          </div>

          {/* Mini delivery flow */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Our Delivery Flow</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center mb-8">
              {[
                { label: 'Discover', desc: 'Current state' },
                { label: 'Map', desc: 'Requirements' },
                { label: 'Build', desc: 'Governed outputs' },
                { label: 'Validate', desc: 'Expert review' },
                { label: 'Evidence-ready', desc: 'Audit-ready' },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#C9A227]/30 text-center">
                    <p className="text-sm font-bold text-gray-900 mb-1">{step.label}</p>
                    <p className="text-xs text-gray-600">{step.desc}</p>
                  </Card>
                  {idx < 4 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A227] z-10" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() => window.location.href = '/deliverables'}
                variant="outline"
              >
                View Sample Deliverables
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHO WE SERVE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Who We Serve
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              'Regulated enterprises',
              'High-growth SMEs',
              'Government & public sector programs',
              'Giga-project vendors and ecosystem partners'
            ].map((segment, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227] mb-4" />
                <p className="text-lg font-semibold text-gray-900">{segment}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/industries'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              Explore Industries
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
            >
              Request Scope
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: PARTNERSHIP INVITE */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Partnerships
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            We collaborate with ecosystem partners—consulting, legal, technology, and delivery teams—to support Saudi transformation programs and organizational readiness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/company/partners'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              Explore Partners
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
            >
              Explore Partnership Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Build Readiness with Sovereignty and Speed
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request a demo, sample deliverables, or a scoped delivery plan—built for your sector and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Request Sample Deliverables
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Contact Aliph
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Are you a product company or advisory firm?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Aliph is an AI-enabled advisory firm. We deliver consulting-grade outcomes using a governed system (the Aliph Brain) that combines expert methodology with workflow automation. You work with advisors who use technology to produce better, faster outputs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you ensure quality with AI involved?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Through governed workflows, validation layers, and expert review. Outputs go through automated QA checks, consistency validation, and—when required—expert sign-off before delivery. We don't blindly trust AI generation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can you support strict data environments?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. The Aliph Brain supports deployment patterns for stricter environments, including data boundary controls, enhanced logging, and on-premise or private cloud configurations. We can discuss specific sovereignty or confidentiality requirements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you work with SMEs and enterprises?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. We work with high-growth SMEs that need structure without bureaucracy, and with large enterprises that need audit-ready governance and compliance. Our delivery model scales across both.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do we start?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Request sample deliverables to see the quality, or book a readiness call to discuss your environment. We'll respond with a clear scope, delivery plan, and timeline. If it's a fit, we start discovery within days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

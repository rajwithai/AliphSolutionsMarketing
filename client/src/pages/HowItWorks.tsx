import { useLanguage } from '@/components/LanguageProvider';
import useSEO from '@/hooks/useSEO';
import { useLocation } from 'wouter';
import { Zap, Users, Rocket, FileText, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  useSEO({
    title: "How Aliph Works | AI + Expert GRC Methodology for Saudi Businesses",
    description: "Learn how Aliph combines AI intelligence with certified Saudi GRC experts to deliver instant, compliant, and measurable results.",
    keywords: "how it works, GRC methodology, AI compliance, Saudi advisory, Aliph process"
  });

  const tiers = [
    {
      id: 1,
      icon: Zap,
      color: '#224EFF',
      kickerKey: 'howItWorks.tier1.kicker',
      titleKey: 'howItWorks.tier1.title',
      bodyKey: 'howItWorks.tier1.body',
      bestForKey: 'howItWorks.tier1.bestFor',
      timeKey: 'howItWorks.tier1.time',
    },
    {
      id: 2,
      icon: Users,
      color: '#00BFA6',
      kickerKey: 'howItWorks.tier2.kicker',
      titleKey: 'howItWorks.tier2.title',
      bodyKey: 'howItWorks.tier2.body',
      bestForKey: 'howItWorks.tier2.bestFor',
      timeKey: 'howItWorks.tier2.time',
    },
    {
      id: 3,
      icon: Rocket,
      color: '#6C63FF',
      kickerKey: 'howItWorks.tier3.kicker',
      titleKey: 'howItWorks.tier3.title',
      bodyKey: 'howItWorks.tier3.body',
      bestForKey: 'howItWorks.tier3.bestFor',
      timeKey: 'howItWorks.tier3.time',
    },
  ];

  const deliverables = [
    {
      tierKey: 'howItWorks.deliverables.tier1',
      itemsKey: 'howItWorks.deliverables.tier1.items',
      icon: FileText,
    },
    {
      tierKey: 'howItWorks.deliverables.tier2',
      itemsKey: 'howItWorks.deliverables.tier2.items',
      icon: Users,
    },
    {
      tierKey: 'howItWorks.deliverables.tier3',
      itemsKey: 'howItWorks.deliverables.tier3.items',
      icon: Rocket,
    },
  ];

  const useCaseSteps = [
    {
      numberKey: 'howItWorks.useCase.step1.title',
      descKey: 'howItWorks.useCase.step1.desc',
      icon: FileText,
      color: '#224EFF',
    },
    {
      numberKey: 'howItWorks.useCase.step2.title',
      descKey: 'howItWorks.useCase.step2.desc',
      icon: Users,
      color: '#00BFA6',
    },
    {
      numberKey: 'howItWorks.useCase.step3.title',
      descKey: 'howItWorks.useCase.step3.desc',
      icon: Shield,
      color: '#6C63FF',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SECTION 1: Hero / Introduction */}
      <section 
        className="relative overflow-hidden py-24 sm:py-32"
        style={{
          background: 'linear-gradient(180deg, #F9FAFF 0%, #FFFFFF 100%)',
        }}
        data-testid="section-hero"
      >
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 
                className="text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-foreground leading-tight"
                data-testid="heading-hero-title"
              >
                {t('howItWorks.hero.title')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed" style={{ lineHeight: '1.6' }}>
                {t('howItWorks.hero.subtitle')}
              </p>
              <p className="mt-4 text-base text-foreground/70 italic">
                {t('howItWorks.hero.tagline')}
              </p>
            </motion.div>

            {/* AI Animation Visual - Placeholder gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-80 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #224EFF15 0%, #00BFA615 50%, #6C63FF15 100%)',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-4">
                    {[Zap, Users, Rocket].map((Icon, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg"
                      >
                        <Icon className="w-8 h-8 text-primary" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Three Tiers (Core Flow) */}
      <section 
        className="relative py-20 sm:py-24"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F7F9FF 100%)',
        }}
        data-testid="section-tiers"
      >
        {/* Gradient flow line (desktop only) */}
        <div 
          className="absolute top-1/2 left-0 right-0 h-1.5 hidden lg:block"
          style={{
            background: 'linear-gradient(90deg, #224EFF, #00BFA6, #6C63FF)',
            opacity: 0.08,
            filter: 'blur(8px)',
            transform: 'translateY(-50%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
              {t('howItWorks.tiers.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.article
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                  style={{
                    minHeight: '440px',
                  }}
                  data-testid={`card-tier-${tier.id}`}
                >
                  {/* Header: Tier badge + icon */}
                  <div className="flex items-center mb-4" style={{ gap: '8px' }}>
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${tier.color}15`,
                        color: tier.color,
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                      }}
                    >
                      Tier {tier.id}
                    </div>
                    <Icon className="w-[18px] h-[18px]" style={{ color: tier.color, strokeWidth: 2 }} />
                  </div>

                  {/* Kicker */}
                  <div 
                    className="text-sm uppercase font-semibold mb-2 tracking-wide"
                    style={{ color: tier.color }}
                  >
                    {t(tier.kickerKey)}
                  </div>

                  {/* Title */}
                  <h3 className="text-[22px] font-bold text-foreground mb-4">
                    {t(tier.titleKey)}
                  </h3>

                  {/* Body */}
                  <p className="text-base text-foreground/80 leading-relaxed mb-4">
                    {t(tier.bodyKey)}
                  </p>

                  {/* Best for */}
                  <p className="text-sm text-muted-foreground italic line-clamp-2 mb-6">
                    {t(tier.bestForKey)}
                  </p>

                  {/* Time indicator at bottom */}
                  <div className="mt-auto pt-4">
                    <div 
                      className="h-0.5 w-full mb-2"
                      style={{
                        backgroundColor: tier.color,
                        opacity: 0.65,
                      }}
                    />
                    <div 
                      className="text-right text-sm font-bold"
                      style={{ color: tier.color }}
                    >
                      {t(tier.timeKey)}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: What You Get in Each Tier */}
      <section 
        className="py-20 sm:py-24"
        style={{ backgroundColor: '#FAFAFE' }}
        data-testid="section-deliverables"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            {t('howItWorks.deliverables.title')}
          </h2>

          <div className="space-y-4">
            {deliverables.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:bg-blue-50/30 transition-colors duration-200"
                  data-testid={`deliverable-row-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {t(item.tierKey)}
                      </h3>
                      <p className="text-base text-muted-foreground">
                        {t(item.itemsKey)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: AI + Expert Synergy */}
      <section 
        className="relative py-20 sm:py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EEF2FF 0%, #FFFFFF 100%)',
        }}
        data-testid="section-synergy"
      >
        <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t('howItWorks.synergy.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6" style={{ lineHeight: '1.7' }}>
                {t('howItWorks.synergy.body')}
              </p>
              <p className="text-base text-primary font-semibold italic">
                {t('howItWorks.synergy.tagline')}
              </p>
            </div>

            {/* Flow Illustration */}
            <div className="flex flex-col gap-6">
              {[
                { label: 'AI', icon: Zap, color: '#224EFF' },
                { label: 'Knowledge Base', icon: FileText, color: '#00BFA6' },
                { label: 'SME Review', icon: Users, color: '#6C63FF' },
                { label: 'Client Delivery', icon: CheckCircle2, color: '#10B981' },
              ].map((node, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: `${node.color}15`,
                      border: `2px solid ${node.color}30`,
                    }}
                  >
                    <node.icon className="w-7 h-7" style={{ color: node.color }} />
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {node.label}
                  </div>
                  {i < 3 && (
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Use-Case Example */}
      <section 
        className="py-20 sm:py-24 bg-white"
        data-testid="section-use-case"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            {t('howItWorks.useCase.title')}
          </h2>

          <div className="space-y-8">
            {useCaseSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-6"
                  data-testid={`use-case-step-${index}`}
                >
                  {/* Number & Icon */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-md"
                      style={{ backgroundColor: step.color }}
                    >
                      {index + 1}
                    </div>
                    {index < useCaseSteps.length - 1 && (
                      <div 
                        className="w-0.5 flex-1 mt-4"
                        style={{
                          background: `linear-gradient(180deg, ${step.color} 0%, ${useCaseSteps[index + 1].color} 100%)`,
                          minHeight: '40px',
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t(step.numberKey)}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {t(step.descKey)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: Final CTA */}
      <section 
        className="relative py-28 sm:py-36 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #224EFF 0%, #6C63FF 100%)',
        }}
        data-testid="section-cta"
      >
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        
        <motion.div 
          className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('howItWorks.cta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('howItWorks.cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 min-h-12"
              onClick={() => setLocation('/contact')}
              data-testid="button-start-now"
            >
              {t('howItWorks.cta.primaryBtn')} →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold px-8 min-h-12"
              onClick={() => setLocation('/experts')}
              data-testid="button-talk-expert"
            >
              {t('howItWorks.cta.secondaryBtn')}
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

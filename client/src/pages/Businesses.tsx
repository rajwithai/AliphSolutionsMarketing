import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useSEO } from '@/hooks/useSEO';
import { useLocation } from 'wouter';
import { Zap, FileText, Users, Bot, TrendingUp, Clock, DollarSign, Brain, Shield, Activity, Building2, Fuel, ShoppingBag, Heart, Smartphone, Home, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Businesses() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [openStep, setOpenStep] = useState<number>(0);

  useSEO({
    title: "Business GRC Solutions for Saudi Enterprises | Aliph Solutions",
    description: "Discover Aliph — the AI-powered GRC platform that helps Saudi businesses generate compliance documents, collaborate with SMEs, and stay PDPL & ZATCA ready.",
    keywords: "business GRC, Saudi compliance, AI automation, PDPL, ZATCA, enterprise solutions"
  });

  const capabilities = [
    {
      icon: Zap,
      titleKey: 'businessSolutions.capability1.title',
      descKey: 'businessSolutions.capability1.desc',
      color: '#224EFF',
    },
    {
      icon: FileText,
      titleKey: 'businessSolutions.capability2.title',
      descKey: 'businessSolutions.capability2.desc',
      color: '#00BFA6',
    },
    {
      icon: Users,
      titleKey: 'businessSolutions.capability3.title',
      descKey: 'businessSolutions.capability3.desc',
      color: '#6C63FF',
    },
    {
      icon: Bot,
      titleKey: 'businessSolutions.capability4.title',
      descKey: 'businessSolutions.capability4.desc',
      color: '#10B981',
    },
  ];

  const industries = [
    {
      icon: Building2,
      nameKey: 'businessSolutions.industry1.name',
      descKey: 'businessSolutions.industry1.desc',
    },
    {
      icon: Fuel,
      nameKey: 'businessSolutions.industry2.name',
      descKey: 'businessSolutions.industry2.desc',
    },
    {
      icon: ShoppingBag,
      nameKey: 'businessSolutions.industry3.name',
      descKey: 'businessSolutions.industry3.desc',
    },
    {
      icon: Heart,
      nameKey: 'businessSolutions.industry4.name',
      descKey: 'businessSolutions.industry4.desc',
    },
    {
      icon: Smartphone,
      nameKey: 'businessSolutions.industry5.name',
      descKey: 'businessSolutions.industry5.desc',
    },
    {
      icon: Home,
      nameKey: 'businessSolutions.industry6.name',
      descKey: 'businessSolutions.industry6.desc',
    },
  ];

  const flowSteps = [
    {
      number: 1,
      titleKey: 'businessSolutions.flow.step1.title',
      descKey: 'businessSolutions.flow.step1.desc',
      icon: Zap,
      color: '#224EFF',
    },
    {
      number: 2,
      titleKey: 'businessSolutions.flow.step2.title',
      descKey: 'businessSolutions.flow.step2.desc',
      icon: Users,
      color: '#00BFA6',
    },
    {
      number: 3,
      titleKey: 'businessSolutions.flow.step3.title',
      descKey: 'businessSolutions.flow.step3.desc',
      icon: Activity,
      color: '#6C63FF',
    },
    {
      number: 4,
      titleKey: 'businessSolutions.flow.step4.title',
      descKey: 'businessSolutions.flow.step4.desc',
      icon: Shield,
      color: '#10B981',
    },
  ];

  const benefits = [
    {
      icon: Clock,
      titleKey: 'businessSolutions.benefit1.title',
      descKey: 'businessSolutions.benefit1.desc',
    },
    {
      icon: DollarSign,
      titleKey: 'businessSolutions.benefit2.title',
      descKey: 'businessSolutions.benefit2.desc',
    },
    {
      icon: Brain,
      titleKey: 'businessSolutions.benefit3.title',
      descKey: 'businessSolutions.benefit3.desc',
    },
    {
      icon: Shield,
      titleKey: 'businessSolutions.benefit4.title',
      descKey: 'businessSolutions.benefit4.desc',
    },
    {
      icon: TrendingUp,
      titleKey: 'businessSolutions.benefit5.title',
      descKey: 'businessSolutions.benefit5.desc',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SECTION 1: Hero / Platform Introduction */}
      <section 
        className="relative overflow-hidden py-24 sm:py-32"
        style={{
          background: 'linear-gradient(180deg, #F9FAFF 0%, #FFFFFF 100%)',
        }}
        data-testid="section-hero"
      >
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 
                className="text-4xl sm:text-5xl lg:text-[48px] font-semibold tracking-tight text-foreground leading-tight"
                data-testid="heading-hero-title"
              >
                {t('businessSolutions.hero.title')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed" style={{ lineHeight: '1.6' }}>
                {t('businessSolutions.hero.subtitle')}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#224EFF] to-[#6C63FF] text-white hover:opacity-90 font-semibold px-8 min-h-12"
                  onClick={() => setLocation('/how-it-works')}
                  data-testid="button-explore-platform"
                >
                  {t('businessSolutions.hero.primaryCta')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 min-h-12"
                  onClick={() => setLocation('/contact')}
                  data-testid="button-request-demo"
                >
                  {t('businessSolutions.hero.secondaryCta')}
                </Button>
              </div>
            </motion.div>

            {/* Dashboard/Interface Visual Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #224EFF15 0%, #00BFA615 50%, #6C63FF15 100%)',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {[FileText, Users, Shield, Activity].map((Icon, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-20 h-20 rounded-lg bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-md"
                      >
                        <Icon className="w-10 h-10 text-primary" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Capabilities — What Businesses Can Do */}
      <section 
        className="py-20 sm:py-24"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F8FF 100%)',
        }}
        data-testid="section-capabilities"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
              {t('businessSolutions.capabilities.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('businessSolutions.capabilities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-2"
                  style={{
                    borderRadius: '16px',
                  }}
                  data-testid={`card-capability-${index}`}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${capability.color}15`,
                      border: `2px solid ${capability.color}30`,
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: capability.color, strokeWidth: 2 }} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t(capability.titleKey)}
                  </h3>
                  
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t(capability.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: Industries & Use Cases */}
      <section 
        className="py-20 sm:py-24"
        style={{ backgroundColor: '#FAFAFE' }}
        data-testid="section-industries"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('businessSolutions.industries.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('businessSolutions.industries.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-white shadow-sm hover:shadow-lg transition-all duration-200"
                  style={{
                    backdropFilter: 'blur(4px)',
                  }}
                  data-testid={`card-industry-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {t(industry.nameKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(industry.descKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Interaction Flow */}
      <section 
        className="py-20 sm:py-24 bg-white"
        data-testid="section-flow"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16">
            {t('businessSolutions.flow.title')}
          </h2>

          {/* Desktop: Horizontal timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div 
                className="absolute top-12 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, #224EFF, #00BFA6, #6C63FF, #10B981)',
                  opacity: 0.15,
                }}
              />
              
              <div className="grid grid-cols-4 gap-8 relative">
                {flowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      className="text-center"
                      data-testid={`flow-step-${index}`}
                    >
                      <div className="flex justify-center mb-6">
                        <div 
                          className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg relative z-10 bg-white"
                          style={{
                            border: `3px solid ${step.color}`,
                          }}
                        >
                          <Icon className="w-10 h-10" style={{ color: step.color }} />
                        </div>
                      </div>
                      
                      <div 
                        className="text-sm font-bold uppercase tracking-wide mb-2"
                        style={{ color: step.color }}
                      >
                        Step {step.number}
                      </div>
                      
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {t(step.titleKey)}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground">
                        {t(step.descKey)}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical accordion */}
          <div className="lg:hidden space-y-4">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              const isOpen = openStep === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                  data-testid={`flow-step-mobile-${index}`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => setOpenStep(isOpen ? -1 : index)}
                    className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors duration-150"
                    data-testid={`accordion-trigger-${index}`}
                  >
                    <div 
                      className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-sm"
                      style={{
                        backgroundColor: `${step.color}20`,
                        border: `2px solid ${step.color}`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>

                    <div className="flex-1">
                      <div 
                        className="text-xs font-bold uppercase tracking-wide mb-1"
                        style={{ color: step.color }}
                      >
                        Step {step.number}
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {t(step.titleKey)}
                      </h3>
                    </div>

                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2">
                      <p className="text-sm text-muted-foreground pl-[72px]">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </motion.div>

                  {/* Gradient connector (visible between items) */}
                  {index < flowSteps.length - 1 && (
                    <div 
                      className="h-1 mx-4 mb-4"
                      style={{
                        background: `linear-gradient(90deg, ${step.color} 0%, ${flowSteps[index + 1].color} 100%)`,
                        opacity: 0.2,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: Benefits — Business Impact */}
      <section 
        className="py-20 sm:py-24"
        style={{ backgroundColor: '#F8F6FF' }}
        data-testid="section-benefits"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16">
            {t('businessSolutions.benefits.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-6 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  data-testid={`benefit-item-${index}`}
                >
                  <div className="flex-shrink-0">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #224EFF15 0%, #6C63FF15 100%)',
                      }}
                    >
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t(benefit.titleKey)}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {t(benefit.descKey)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: Social Proof */}
      <section 
        className="py-20 sm:py-24 bg-white"
        data-testid="section-social-proof"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('businessSolutions.socialProof.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('businessSolutions.socialProof.body')}
            </p>

            {/* Placeholder for avatars/logos */}
            <div className="mt-12 flex justify-center gap-4 flex-wrap">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 border-2 border-white shadow-sm"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Final CTA */}
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
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('businessSolutions.cta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('businessSolutions.cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 min-h-12"
              onClick={() => setLocation('/contact')}
              data-testid="button-book-demo"
            >
              {t('businessSolutions.cta.primaryBtn')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold px-8 min-h-12"
              onClick={() => setLocation('/how-it-works')}
              data-testid="button-free-report"
            >
              {t('businessSolutions.cta.secondaryBtn')}
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { Zap, Users, Rocket, ArrowRight } from 'lucide-react';

const tiers = [
  {
    id: 1,
    titleKey: 'tier1.title',
    subtitleKey: 'tier1.subtitle',
    descKey: 'tier1.description',
    bestForKey: 'tier1.bestFor',
    timeKey: 'tier1.time',
    icon: Zap,
    color: '#224EFF',
    lightBg: 'rgba(34, 78, 255, 0.05)',
    progress: 33,
  },
  {
    id: 2,
    titleKey: 'tier2.title',
    subtitleKey: 'tier2.subtitle',
    descKey: 'tier2.description',
    bestForKey: 'tier2.bestFor',
    timeKey: 'tier2.time',
    icon: Users,
    color: '#00BFA6',
    lightBg: 'rgba(0, 191, 166, 0.05)',
    progress: 66,
  },
  {
    id: 3,
    titleKey: 'tier3.title',
    subtitleKey: 'tier3.subtitle',
    descKey: 'tier3.description',
    bestForKey: 'tier3.bestFor',
    timeKey: 'tier3.time',
    icon: Rocket,
    color: '#6C63FF',
    lightBg: 'rgba(108, 99, 255, 0.05)',
    progress: 100,
  },
];

export default function TierSection() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleExploreTiers = () => {
    // Scroll to comparison chart section (future implementation)
    console.log('Explore tiers clicked - scroll to comparison chart');
  };

  return (
    <section 
      ref={ref}
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F9FAFF 0%, #FFFFFF 100%)',
      }}
      data-testid="section-tiers"
    >
      {/* Subtle mesh texture background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23224EFF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            data-testid="heading-tiers"
          >
            {t('tiers.title')}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            data-testid="text-tiers-intro"
          >
            {t('tiers.intro')}
          </motion.p>
        </div>

        {/* Tiers Flow - Desktop Horizontal / Mobile Vertical */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-8 lg:gap-6 mb-12">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const isLast = index === tiers.length - 1;
            
            return (
              <div key={tier.id} className="flex flex-col lg:flex-row items-center">
                {/* Tier Card */}
                <motion.div
                  className="relative w-full lg:w-80 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-testid={`card-tier-${tier.id}`}
                >
                  {/* Card Container */}
                  <div 
                    className="relative bg-card rounded-xl p-6 border-2 transition-all duration-300 hover:-translate-y-1.5 min-h-[480px] flex flex-col"
                    style={{
                      borderColor: tier.color,
                      backgroundColor: tier.lightBg,
                      boxShadow: `0 0 0 rgba(${parseInt(tier.color.slice(1, 3), 16)}, ${parseInt(tier.color.slice(3, 5), 16)}, ${parseInt(tier.color.slice(5, 7), 16)}, 0)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 20px 40px rgba(${parseInt(tier.color.slice(1, 3), 16)}, ${parseInt(tier.color.slice(3, 5), 16)}, ${parseInt(tier.color.slice(5, 7), 16)}, 0.25)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 rgba(${parseInt(tier.color.slice(1, 3), 16)}, ${parseInt(tier.color.slice(3, 5), 16)}, ${parseInt(tier.color.slice(5, 7), 16)}, 0)`;
                    }}
                  >
                    {/* Tier Badge */}
                    <div 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                      style={{ backgroundColor: tier.color }}
                    >
                      <span>Tier {tier.id}</span>
                    </div>

                    {/* Icon */}
                    <div 
                      className="inline-flex p-3 rounded-lg mb-3"
                      style={{ backgroundColor: tier.color, color: 'white' }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t(tier.titleKey)}
                    </h3>

                    {/* Subtitle */}
                    <p 
                      className="text-sm font-semibold mb-3"
                      style={{ color: tier.color }}
                    >
                      {t(tier.subtitleKey)}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {t(tier.descKey)}
                    </p>

                    {/* Best For */}
                    <p className="text-xs italic text-muted-foreground mb-4">
                      {t(tier.bestForKey)}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-muted-foreground">Time</span>
                        <span className="text-xs font-semibold" style={{ color: tier.color }}>
                          {t(tier.timeKey)}
                        </span>
                      </div>
                      <div 
                        className="h-2 bg-muted rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={isInView ? tier.progress : 0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Tier ${tier.id} completion time indicator`}
                      >
                        <motion.div
                          className="h-full"
                          style={{ backgroundColor: tier.color }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${tier.progress}%` } : {}}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Connector Arrow - Between Cards */}
                {!isLast && (
                  <motion.div 
                    className="flex items-center justify-center my-6 lg:my-0 lg:mx-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <div className="relative">
                      {/* Glowing effect with pulse */}
                      <motion.div 
                        className="absolute inset-0 blur-xl opacity-50"
                        style={{ 
                          background: `linear-gradient(135deg, ${tier.color} 0%, ${tiers[index + 1].color} 100%)`,
                        }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {/* Forward Arrow - Right on desktop, down on mobile */}
                      <ArrowRight 
                        className={`relative h-8 w-8 rotate-90 lg:rotate-0 ${isRTL ? 'lg:rotate-180' : ''}`}
                        style={{ 
                          color: tier.color,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progression Label */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div 
            className="inline-block px-6 py-3 rounded-full text-sm font-semibold"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 78, 255, 0.1) 0%, rgba(108, 99, 255, 0.1) 100%)',
              color: '#224EFF',
            }}
          >
            {t('tiers.progression')}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            size="lg"
            onClick={handleExploreTiers}
            className="relative overflow-hidden text-white font-bold px-8 py-6 text-base group hover:shadow-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #224EFF 0%, #6C63FF 100%)',
            }}
            data-testid="button-explore-all-tiers"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('tiers.cta')}
              <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
            </span>
            {/* Pulse effect on hover */}
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

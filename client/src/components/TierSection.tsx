import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Zap, Users, Rocket } from 'lucide-react';

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
  },
];

// Helper function to reduce saturation by 10%
const reduceSaturation = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  
  if (d === 0) return hex;
  
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const newS = Math.max(0, s - 0.1); // Reduce saturation by 10%
  
  const newD = l < 0.5 ? newS * (max + min) : newS * (2 - max - min);
  const m = l - newD / 2;
  
  const newR = Math.round(Math.max(min, Math.min(max, r - (r - m) * 0.1)));
  const newG = Math.round(Math.max(min, Math.min(max, g - (g - m) * 0.1)));
  const newB = Math.round(Math.max(min, Math.min(max, b - (b - m) * 0.1)));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

export default function TierSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [focusedCard, setFocusedCard] = useState<number | null>(null);

  const trackEvent = (eventName: string, tier: number) => {
    console.log(`[Analytics] ${eventName}`, { tier });
    // In production, replace with actual analytics call
    // window.gtag?.('event', eventName, { tier });
  };

  return (
    <section 
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #F8FAFF 0%, #FFFFFF 100%)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
      data-testid="section-tiers"
    >
      {/* Subtle mesh texture background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23224EFF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient flow line connecting tiers */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          width: '60%',
          height: '6px',
          background: 'linear-gradient(90deg, #224EFF 0%, #00BFA6 50%, #6C63FF 100%)',
          opacity: 0.08,
          filter: 'blur(8px)',
          zIndex: 0,
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-foreground mb-4"
            style={{
              fontSize: '42px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            data-testid="heading-tiers"
          >
            {t('tiers.title')}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground mx-auto"
            style={{ 
              width: '70%',
              lineHeight: '1.6',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            data-testid="text-tiers-intro"
          >
            {t('tiers.intro')}
          </motion.p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const isHovered = hoveredCard === tier.id;
            const isFocused = focusedCard === tier.id;
            const desaturatedColor = reduceSaturation(tier.color);
            
            return (
              <motion.article
                key={tier.id}
                className="relative cursor-pointer outline-none bg-white transition-all flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => {
                  setHoveredCard(tier.id);
                  trackEvent('how_it_works_card_hover', tier.id);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                onFocus={() => setFocusedCard(tier.id)}
                onBlur={() => setFocusedCard(null)}
                onClick={() => trackEvent('how_it_works_cta_click', tier.id)}
                tabIndex={0}
                role="article"
                aria-label={`Tier ${tier.id} — ${t(tier.titleKey)}`}
                data-testid={`card-tier-${tier.id}`}
                style={{
                  padding: '20px',
                  borderRadius: '14px',
                  border: `1px solid ${isHovered ? tier.color : 'rgba(0, 0, 0, 0.08)'}`,
                  boxShadow: isHovered 
                    ? '0 6px 18px rgba(0, 0, 0, 0.08)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  minHeight: '440px',
                  transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                  outline: isFocused ? `2px solid ${tier.color}` : 'none',
                  outlineOffset: '4px',
                  transitionDuration: '160ms',
                  transitionProperty: 'all',
                  transitionTimingFunction: 'ease-out',
                }}
              >
                {/* Card Container */}
                <div className="relative flex flex-col h-full">
                  {/* Header: Tier badge + Small inline icon */}
                  <div className="flex items-center mb-4" style={{ gap: '8px' }}>
                    {/* Tier Badge */}
                    <div 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ 
                        backgroundColor: tier.color,
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <span>Tier {tier.id}</span>
                    </div>

                    {/* Small inline icon - 18px with 4px gap */}
                    <motion.div
                      animate={{
                        filter: isHovered 
                          ? `drop-shadow(0 0 8px ${tier.color}60)` 
                          : 'drop-shadow(0 0 0px transparent)',
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon 
                        className="transition-all duration-300"
                        style={{ 
                          width: '18px', 
                          height: '18px',
                          color: tier.color, 
                          strokeWidth: 2,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-xl font-bold mb-2 transition-colors duration-300"
                    style={{ 
                      color: isHovered 
                        ? `color-mix(in srgb, currentColor 90%, black)` 
                        : 'currentColor'
                    }}
                  >
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

                  {/* Best For - italic, light gray, max two lines */}
                  <p 
                    className="text-xs italic mb-4 line-clamp-2"
                    style={{ color: '#5E5E80' }}
                  >
                    {t(tier.bestForKey)}
                  </p>

                  {/* Progress line with time label - reduced opacity and saturation */}
                  <div className="mt-auto">
                    <div 
                      className="relative"
                      style={{
                        height: '2px',
                        backgroundColor: tier.color,
                        opacity: 0.65,
                        marginBottom: '8px',
                      }}
                    />
                    <div className="flex justify-end">
                      <small 
                        className="font-bold text-xs" 
                        style={{ color: desaturatedColor }}
                      >
                        {t(tier.timeKey)}
                      </small>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

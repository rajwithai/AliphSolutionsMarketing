import { Zap, Users, Rocket, ArrowDown } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const tiers = [
  {
    icon: Zap,
    titleKey: 'tier1.title',
    level: '1',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
    borderColor: 'border-blue-300 dark:border-blue-700',
    accentColor: 'bg-blue-500'
  },
  {
    icon: Users,
    titleKey: 'tier2.title',
    level: '2',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300',
    borderColor: 'border-teal-300 dark:border-teal-700',
    accentColor: 'bg-teal-500'
  },
  {
    icon: Rocket,
    titleKey: 'tier3.title',
    level: '3',
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300',
    borderColor: 'border-indigo-300 dark:border-indigo-700',
    accentColor: 'bg-indigo-500'
  },
];

export default function TierFlowDiagram() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <div className="relative flex flex-col items-center py-8" data-testid="tier-flow-diagram">
      {tiers.map((tier, index) => {
        const Icon = tier.icon;
        const isLast = index === tiers.length - 1;
        
        return (
          <div key={tier.level} className="relative w-full">
            {/* Tier Card */}
            <div 
              className={`relative bg-card border-2 ${tier.borderColor} rounded-xl p-6 shadow-lg hover-elevate transition-all duration-300`}
              data-testid={`tier-flow-${tier.level}`}
            >
              {/* Tier Badge */}
              <div className="absolute -top-3 left-6">
                <div className={`${tier.accentColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                  Tier {tier.level}
                </div>
              </div>
              
              {/* Content */}
              <div className={`flex items-center gap-4 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`p-4 rounded-xl ${tier.color} flex-shrink-0`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h4 className="font-bold text-lg text-foreground">
                    {t(tier.titleKey)}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tier.level === '1' && t('common.instant')}
                    {tier.level === '2' && t('common.expertReviewed')}
                    {tier.level === '3' && t('common.fullService')}
                  </p>
                </div>
              </div>
              
              {/* Speed Indicator */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className={`${tier.accentColor} h-full transition-all duration-1000`}
                    style={{ width: tier.level === '1' ? '33%' : tier.level === '2' ? '66%' : '100%' }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {tier.level === '1' && '< 1min'}
                  {tier.level === '2' && '< 48h'}
                  {tier.level === '3' && '1-2 weeks'}
                </span>
              </div>
            </div>
            
            {/* Arrow Connector */}
            {!isLast && (
              <div className="flex justify-center my-4">
                <div className="relative">
                  <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl" />
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Progression Label */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-primary/10 dark:bg-primary/20 rounded-full px-6 py-3">
          <p className="text-sm font-semibold text-primary">
            {t('tiers.progression')}
          </p>
        </div>
      </div>
    </div>
  );
}

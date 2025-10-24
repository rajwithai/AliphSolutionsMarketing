import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from './LanguageProvider';
import { Zap, Users, Rocket, ArrowRight } from 'lucide-react';
import TierFlowDiagram from './TierFlowDiagram';

const tiers = [
  {
    icon: Zap,
    titleKey: 'tier1.title',
    descKey: 'tier1.description',
    level: '1',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    icon: Users,
    titleKey: 'tier2.title',
    descKey: 'tier2.description',
    level: '2', 
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300'
  },
  {
    icon: Rocket,
    titleKey: 'tier3.title',
    descKey: 'tier3.description',
    level: '3',
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300'
  },
];

export default function TierSection() {
  const { t } = useLanguage();
  
  const handleExploreTiers = () => {
    console.log('Explore tiers clicked');
    // In real app, navigate to how-it-works page
  };
  
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('tiers.title')}
            </h2>
            <div className="mt-8 space-y-6">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <Card key={tier.level} className="hover-elevate transition-all duration-200" data-testid={`card-tier-${tier.level}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${tier.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            Tier {tier.level}
                          </Badge>
                          <h3 className="font-semibold text-lg text-foreground">
                            {t(tier.titleKey)}
                          </h3>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground">
                        {t(tier.descKey)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-8">
              <Button 
                size="lg" 
                onClick={handleExploreTiers}
                data-testid="button-explore-tiers"
                className="flex items-center gap-2"
              >
                {t('common.exploreTiers')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <TierFlowDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
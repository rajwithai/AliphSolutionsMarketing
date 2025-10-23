import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Scale, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Cpu, 
  Rocket, 
  Award 
} from 'lucide-react';

export default function KnowledgeLibrarySection() {
  const { t } = useLanguage();
  
  const pillars = [
    { icon: Scale, title: t('library.pillar1'), color: 'from-purple-500/20 to-purple-600/20' },
    { icon: DollarSign, title: t('library.pillar2'), color: 'from-blue-500/20 to-blue-600/20' },
    { icon: Users, title: t('library.pillar3'), color: 'from-green-500/20 to-green-600/20' },
    { icon: TrendingUp, title: t('library.pillar4'), color: 'from-orange-500/20 to-orange-600/20' },
    { icon: Cpu, title: t('library.pillar5'), color: 'from-cyan-500/20 to-cyan-600/20' },
    { icon: Rocket, title: t('library.pillar6'), color: 'from-pink-500/20 to-pink-600/20' },
    { icon: Award, title: t('library.pillar7'), color: 'from-indigo-500/20 to-indigo-600/20' },
  ];
  
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('library.title')}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t('library.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Card 
                key={index} 
                className="hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer"
                data-testid={`card-pillar-${index + 1}`}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">
                    {pillar.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" data-testid="button-browse-pillars">
            {t('library.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}

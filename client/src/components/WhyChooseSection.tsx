import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Users, FileText, Zap, Target } from 'lucide-react';

export default function WhyChooseSection() {
  const { t } = useLanguage();
  
  const reasons = [
    { 
      icon: Brain, 
      title: t('whyChoose.point1Title'), 
      description: t('whyChoose.point1Desc'),
      gradient: 'from-purple-500/20 to-purple-600/20'
    },
    { 
      icon: Users, 
      title: t('whyChoose.point2Title'), 
      description: t('whyChoose.point2Desc'),
      gradient: 'from-blue-500/20 to-blue-600/20'
    },
    { 
      icon: FileText, 
      title: t('whyChoose.point3Title'), 
      description: t('whyChoose.point3Desc'),
      gradient: 'from-green-500/20 to-green-600/20'
    },
    { 
      icon: Zap, 
      title: t('whyChoose.point4Title'), 
      description: t('whyChoose.point4Desc'),
      gradient: 'from-orange-500/20 to-orange-600/20'
    },
    { 
      icon: Target, 
      title: t('whyChoose.point5Title'), 
      description: t('whyChoose.point5Desc'),
      gradient: 'from-pink-500/20 to-pink-600/20'
    },
  ];
  
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('whyChoose.title')}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t('whyChoose.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card 
                key={index} 
                className="hover-elevate active-elevate-2 transition-all duration-300"
                data-testid={`card-reason-${index + 1}`}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" data-testid="button-join-network">
            {t('whyChoose.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}

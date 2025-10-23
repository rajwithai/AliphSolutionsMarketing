import { useLanguage } from './LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Target, TrendingUp, Building2 } from 'lucide-react';

export default function Vision2030Section() {
  const { t } = useLanguage();
  
  const points = [
    { icon: Target, text: t('vision.point1') },
    { icon: TrendingUp, text: t('vision.point2') },
    { icon: Building2, text: t('vision.point3') },
  ];
  
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-50/50 via-background to-amber-50/50 dark:from-amber-950/20 dark:via-background dark:to-amber-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('vision.title')}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t('vision.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card key={index} className="bg-background/80 backdrop-blur-sm border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-amber-600 dark:text-amber-500" />
                  </div>
                  <p className="text-base text-foreground leading-relaxed">
                    {point.text}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

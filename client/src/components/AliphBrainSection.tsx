import { useLanguage } from './LanguageProvider';
import { Database, Shield, RefreshCw, CheckCircle } from 'lucide-react';

export default function AliphBrainSection() {
  const { t } = useLanguage();
  
  const features = [
    { icon: Database, text: t('brain.point1') },
    { icon: CheckCircle, text: t('brain.point2') },
    { icon: Shield, text: t('brain.point3') },
    { icon: RefreshCw, text: t('brain.point4') },
  ];
  
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/10 via-background to-blue-500/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-primary/10 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('brain.title')}
          </h2>
          <p className="mt-4 text-xl text-primary font-semibold">
            {t('brain.subtitle')}
          </p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t('brain.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-6 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/10 shadow-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-base text-foreground leading-relaxed mt-2">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

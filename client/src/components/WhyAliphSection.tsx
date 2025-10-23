import { useLanguage } from './LanguageProvider';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function WhyAliphSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('whyAliph.title')}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t('whyAliph.description')}
          </p>
          
          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-base font-semibold text-foreground">
                {t('whyAliph.highlight')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

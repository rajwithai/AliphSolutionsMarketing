import { useLanguage } from './LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('testimonials.title')}
          </h2>
        </div>
        
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
          <CardContent className="p-8 sm:p-12">
            <Quote className="h-12 w-12 text-primary mb-6" />
            <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed mb-6">
              "{t('testimonials.quote')}"
            </blockquote>
            <p className="text-base text-muted-foreground font-semibold">
              — {t('testimonials.author')}
            </p>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-base text-muted-foreground max-w-3xl mx-auto">
          {t('testimonials.subtitle')}
        </p>
      </div>
    </section>
  );
}

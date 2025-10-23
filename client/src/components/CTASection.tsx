import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const { t, isRTL } = useLanguage();
  const [, setLocation] = useLocation();
  
  const handleStartFree = () => {
    setLocation('/pricing');
  };
  
  const handleTalkToExpert = () => {
    setLocation('/contact');
  };
  
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-blue-500/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl p-8 sm:p-12 lg:p-16 border border-primary/20 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('closing.title')}
            </h2>
            
            <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                size="lg" 
                onClick={handleStartFree}
                data-testid="button-start-free"
                className="flex items-center gap-2 text-lg px-8 py-3 h-auto shadow-lg"
              >
                {t('closing.primaryCta')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleTalkToExpert}
                data-testid="button-talk-expert"
                className="text-lg px-8 py-3 h-auto border-2"
              >
                {t('closing.secondaryCta')}
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground">
              <p>{t('closing.tagline')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
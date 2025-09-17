import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@assets/generated_images/Professional_consulting_hero_image_0550d314.png';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  
  const handleGetSolution = () => {
    console.log('Get Your Solution clicked');
    // In real app, navigate to contact or onboarding
  };
  
  const handleJoinExperts = () => {
    console.log('Join Expert Network clicked');
    // In real app, navigate to expert application
  };
  
  const handleWatchVideo = () => {
    console.log('Watch explainer video clicked');
    // In real app, open video modal
  };
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-start rtl:lg:text-start">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">{t('hero.title')}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:mt-8 sm:text-xl lg:text-lg">
              {t('hero.subtitle')}
            </p>
            <div className={`mt-8 flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''} sm:justify-center lg:justify-start rtl:lg:justify-start`}>
              <Button 
                size="lg" 
                onClick={handleGetSolution}
                data-testid="button-get-solution"
                className="flex items-center gap-2"
              >
                {t('hero.primaryCta')}
                <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleJoinExperts}
                data-testid="button-join-experts"
              >
                {t('hero.secondaryCta')}
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-4 sm:justify-center lg:justify-start rtl:lg:justify-start">
              <Button 
                variant="ghost" 
                onClick={handleWatchVideo}
                data-testid="button-watch-video"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                  <Play className="h-4 w-4 text-primary fill-primary" />
                </div>
                <span>Watch 90-second explainer</span>
              </Button>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <img
                className="w-full rounded-lg"
                src={heroImage}
                alt="Professional consulting services"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
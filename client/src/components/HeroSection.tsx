import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { useLocation } from 'wouter';
import { ArrowRight, Zap, Users, Shield } from 'lucide-react';
import heroImage from '@assets/generated_images/Saudi_business_executives_meeting_a16dcce7.png';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const [, setLocation] = useLocation();
  
  const handleExplorePlatform = () => {
    setLocation('/how-it-works');
  };
  
  const handleJoinSME = () => {
    setLocation('/businesses');
  };
  
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-blue-500/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-blue-500/15 to-primary/15 rounded-full blur-2xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Content */}
          <div className="lg:col-span-7">
            {/* Main heading */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
              <span className="block">{t('hero.title')}</span>
            </h1>
            
            {/* Subtitle */}
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>
            
            {/* Trust indicators */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-primary/10">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">{t('hero.stat1')}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-primary/10">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">{t('hero.stat2')}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-primary/10">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">{t('hero.stat3')}</span>
              </div>
            </div>
            
            {/* CTA buttons */}
            <div className={`mt-10 flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                size="lg" 
                onClick={handleExplorePlatform}
                data-testid="button-explore-platform"
                className="flex items-center gap-2 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('hero.primaryCta')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleJoinSME}
                data-testid="button-join-sme"
                className="px-8 text-base font-semibold border-2"
              >
                {t('hero.secondaryCta')}
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl blur-xl" />
              
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  className="w-full h-auto object-cover"
                  src={heroImage}
                  alt="Professional GRC consulting services for Saudi businesses"
                  data-testid="img-hero"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

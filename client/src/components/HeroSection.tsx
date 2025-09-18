import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { useLocation } from 'wouter';
import { ArrowRight, Play, CheckCircle, Users, Shield, Trophy } from 'lucide-react';
import heroImage from '@assets/generated_images/Saudi_business_executives_meeting_a16dcce7.png';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const [, setLocation] = useLocation();
  
  const handleGetSolution = () => {
    setLocation('/contact');
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Elite GRC Advisory Platform</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
              <span className="block">{t('hero.title')}</span>
            </h1>
            
            {/* Subtitle */}
            <p className="mt-8 text-xl text-muted-foreground sm:text-2xl lg:text-xl leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>
            
            {/* Trust indicators */}
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Vision 2030 Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Elite Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Regulatory Compliant</span>
              </div>
            </div>
            
            {/* CTA buttons */}
            <div className={`mt-12 flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                size="lg" 
                onClick={handleGetSolution}
                data-testid="button-get-solution"
                className="flex items-center gap-2 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('hero.primaryCta')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleJoinExperts}
                data-testid="button-join-experts"
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-primary/5"
              >
                {t('hero.secondaryCta')}
              </Button>
            </div>
            
            {/* Video CTA */}
            <div className="mt-8">
              <Button 
                variant="ghost" 
                onClick={handleWatchVideo}
                data-testid="button-watch-video"
                className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary p-0 h-auto"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full shadow-lg">
                  <Play className="h-5 w-5 text-primary fill-primary ml-1" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Watch 90-second explainer</div>
                  <div className="text-sm text-muted-foreground">See how we transform GRC</div>
                </div>
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl blur-xl" />
              
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  className="w-full h-auto object-cover"
                  src={heroImage}
                  alt="Professional consulting services"
                  data-testid="img-hero"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                
                {/* Floating elements */}
                <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Live Advisory</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Successful Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useLanguage } from '@/components/LanguageProvider';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
import useSEO from '@/hooks/useSEO';
import { useLocation } from 'wouter';
import { Award, Users, Globe, Shield } from 'lucide-react';
import collaborationImage from '@assets/generated_images/Saudi_business_collaboration_scene_af2b3140.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Vision2030Mark from '@/components/brand/Vision2030Mark';

export default function About() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  useSEO({
    title: language === 'ar' 
      ? 'من نحن - أليف للحلول الاستشارية'
      : 'About Us - Aliph Solutions',
    description: language === 'ar'
      ? 'تعرف على أليف، منصة رائدة في مجال حلول الحوكمة وإدارة المخاطر والامتثال في السعودية. نربط الشركات بأفضل الخبراء المحليين.'
      : 'Learn about Aliph, a leading platform for governance, risk management, and compliance solutions in Saudi Arabia. We connect companies with the best local experts.',
    keywords: language === 'ar'
      ? 'أليف، الحوكمة، إدارة المخاطر، الامتثال، السعودية، رؤية 2030'
      : 'Aliph, governance, risk management, compliance, Saudi Arabia, Vision 2030'
  });

  const stats = [
    {
      icon: Users,
      number: '500+',
      label: t('about.stats.stat1Label')
    },
    {
      icon: Globe,
      number: '1000+',
      label: t('about.stats.stat2Label')
    },
    {
      icon: Award,
      number: '15+',
      label: t('about.stats.stat3Label')
    },
    {
      icon: Shield,
      number: '99%',
      label: t('about.stats.stat4Label')
    }
  ];

  const values = [
    {
      title: t('about.values.value1Title'),
      description: t('about.values.value1Desc')
    },
    {
      title: t('about.values.value2Title'),
      description: t('about.values.value2Desc')
    },
    {
      title: t('about.values.value3Title'),
      description: t('about.values.value3Desc')
    },
    {
      title: t('about.values.value4Title'),
      description: t('about.values.value4Desc')
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="heading-about-title">
            {t('about.hero.title')}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('about.hero.subtitle')}
          </p>
          
          {/* Hero Image */}
          <div className="mt-12 relative mx-auto max-w-4xl">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={collaborationImage}
                alt={t('about.hero.imageAlt')}
                className="w-full h-[400px] object-cover"
                loading="lazy"
                data-testid="img-about-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('about.mission.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('about.mission.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center hover-elevate transition-all duration-200" data-testid={`stat-${index}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1" data-testid={`text-stat-${index}`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`value-${index}`}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vision 2030 */}
        <div className="bg-primary/5 rounded-lg p-8 mb-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Vision2030Mark size="md" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('about.vision2030.title')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              {t('about.vision2030.description')}
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground mb-4">
              <span>{t('about.vision2030.pillar1')}</span>
              <span>•</span>
              <span>{t('about.vision2030.pillar2')}</span>
              <span>•</span>
              <span>{t('about.vision2030.pillar3')}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {t('about.vision2030.disclaimer')}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t('about.cta.title')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('about.cta.subtitle')}
          </p>
          <Button 
            size="lg" 
            onClick={() => setLocation('/contact')}
            data-testid="button-join-network"
          >
            {t('about.cta.button')}
          </Button>
        </div>
      </div>
    </div>
  );
}
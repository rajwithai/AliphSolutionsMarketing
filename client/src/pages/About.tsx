import { useLanguage } from '@/components/LanguageProvider';
import { useSEO } from '@/hooks/useSEO';
import { Award, Users, Globe, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function About() {
  const { language } = useLanguage();

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
      label: language === 'ar' ? 'خبير معتمد' : 'Certified Experts'
    },
    {
      icon: Globe,
      number: '1000+',
      label: language === 'ar' ? 'شركة تثق بنا' : 'Companies Trust Us'
    },
    {
      icon: Award,
      number: '15+',
      label: language === 'ar' ? 'سنة خبرة' : 'Years of Experience'
    },
    {
      icon: Shield,
      number: '99%',
      label: language === 'ar' ? 'معدل رضا العملاء' : 'Client Satisfaction'
    }
  ];

  const values = [
    {
      title: language === 'ar' ? 'التميز' : 'Excellence',
      description: language === 'ar' 
        ? 'نسعى دائماً لتقديم أعلى مستويات الجودة في خدماتنا'
        : 'We always strive to deliver the highest quality standards in our services'
    },
    {
      title: language === 'ar' ? 'الشفافية' : 'Transparency',
      description: language === 'ar'
        ? 'نؤمن بالوضوح الكامل في جميع تعاملاتنا مع عملائنا'
        : 'We believe in complete clarity in all our dealings with clients'
    },
    {
      title: language === 'ar' ? 'الابتكار' : 'Innovation',
      description: language === 'ar'
        ? 'نطور حلولاً مبتكرة تواكب أحدث التطورات في مجال الحوكمة'
        : 'We develop innovative solutions that keep pace with the latest developments in governance'
    },
    {
      title: language === 'ar' ? 'المصداقية' : 'Integrity',
      description: language === 'ar'
        ? 'نحافظ على أعلى معايير النزاهة والأخلاق المهنية'
        : 'We maintain the highest standards of integrity and professional ethics'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="heading-about-title">
            {language === 'ar' ? 'من نحن' : 'About Us'}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'أليف هي منصة رائدة في مجال حلول الحوكمة وإدارة المخاطر والامتثال في المملكة العربية السعودية، نهدف إلى ربط الشركات بأفضل الخبراء المحليين'
              : 'Aliph is a leading platform for governance, risk management, and compliance solutions in Saudi Arabia, connecting companies with the best local experts'
            }
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
              </h2>
              <p className="text-muted-foreground text-lg">
                {language === 'ar' 
                  ? 'نسعى لتمكين الشركات السعودية من تحقيق أعلى معايير الحوكمة وإدارة المخاطر والامتثال من خلال ربطها بشبكة واسعة من الخبراء المحليين المعتمدين، مما يساهم في تحقيق رؤية المملكة 2030'
                  : 'We strive to empower Saudi companies to achieve the highest standards of governance, risk management, and compliance by connecting them with a wide network of certified local experts, contributing to the achievement of Saudi Vision 2030'
                }
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
            {language === 'ar' ? 'قيمنا' : 'Our Values'}
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
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {language === 'ar' ? 'شريك في رؤية 2030' : 'Partner in Vision 2030'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'نحن فخورون بكوننا جزءاً من رؤية المملكة 2030، ونساهم في تطوير بيئة أعمال شفافة وقوية تدعم النمو الاقتصادي المستدام'
                : 'We are proud to be part of Saudi Vision 2030, contributing to the development of a transparent and strong business environment that supports sustainable economic growth'
              }
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
              <span>{language === 'ar' ? 'الشفافية' : 'Transparency'}</span>
              <span>•</span>
              <span>{language === 'ar' ? 'الكفاءة' : 'Efficiency'}</span>
              <span>•</span>
              <span>{language === 'ar' ? 'الاستدامة' : 'Sustainability'}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'انضم إلى رحلة النجاح' : 'Join Our Success Journey'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'ar' 
              ? 'كن جزءاً من شبكتنا المتنامية من الشركات الناجحة'
              : 'Be part of our growing network of successful companies'
            }
          </p>
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/contact'}
            data-testid="button-join-network"
          >
            {language === 'ar' ? 'ابدأ معنا اليوم' : 'Start With Us Today'}
          </Button>
        </div>
      </div>
    </div>
  );
}
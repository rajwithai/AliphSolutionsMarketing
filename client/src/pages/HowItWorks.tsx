import { useLanguage } from '@/components/LanguageProvider';
import { useSEO } from '@/hooks/useSEO';
import { useLocation } from 'wouter';
import { CheckCircle, Users, Shield, Target } from 'lucide-react';
import processImage from '@assets/generated_images/Three_tier_service_model_c40d675c.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HowItWorks() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  useSEO({
    title: language === 'ar' 
      ? 'كيف نعمل - أليف للحلول الاستشارية'
      : 'How It Works - Aliph Solutions',
    description: language === 'ar'
      ? 'تعرف على منهجيتنا المبسطة والفعالة لتقديم أفضل حلول الحوكمة وإدارة المخاطر والامتثال لشركتك في 4 خطوات واضحة.'
      : 'Learn about our simplified and effective methodology to deliver the best governance, risk management, and compliance solutions for your company in 4 clear steps.',
    keywords: language === 'ar'
      ? 'منهجية العمل، خطوات الحوكمة، عملية الاستشارة، أليف'
      : 'work methodology, governance steps, consulting process, Aliph'
  });

  const steps = [
    {
      icon: Target,
      title: language === 'ar' ? 'تحديد الاحتياجات' : 'Assess Your Needs',
      description: language === 'ar' 
        ? 'نحلل متطلبات شركتك ونحدد التحديات في مجال الحوكمة وإدارة المخاطر والامتثال'
        : 'We analyze your company\'s requirements and identify governance, risk, and compliance challenges'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'مطابقة الخبراء' : 'Expert Matching',
      description: language === 'ar'
        ? 'نربطك بأفضل الخبراء المحليين المختصين في مجالك وفقاً لاحتياجاتك المحددة'
        : 'We connect you with the best local experts specialized in your industry based on your specific needs'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'تنفيذ الحلول' : 'Solution Implementation',
      description: language === 'ar'
        ? 'نعمل معك لتطبيق الحلول المناسبة وضمان الامتثال الكامل للمعايير المحلية والدولية'
        : 'We work with you to implement appropriate solutions and ensure full compliance with local and international standards'
    },
    {
      icon: CheckCircle,
      title: language === 'ar' ? 'المتابعة والدعم' : 'Ongoing Support',
      description: language === 'ar'
        ? 'نقدم المتابعة المستمرة والدعم المخصص لضمان نجاح تطبيق الحلول على المدى الطويل'
        : 'We provide continuous monitoring and dedicated support to ensure long-term success of implemented solutions'
    }
  ];

  const benefits = [
    language === 'ar' ? 'خبراء محليون معتمدون' : 'Certified local experts',
    language === 'ar' ? 'حلول مخصصة لكل شركة' : 'Customized solutions for each company',
    language === 'ar' ? 'امتثال كامل للمعايير السعودية' : 'Full compliance with Saudi standards',
    language === 'ar' ? 'دعم مستمر على مدار الساعة' : '24/7 continuous support',
    language === 'ar' ? 'تكلفة فعالة ومرونة في الدفع' : 'Cost-effective with flexible payment options',
    language === 'ar' ? 'نتائج قابلة للقياس' : 'Measurable results'
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="heading-how-it-works-title">
            {language === 'ar' ? 'كيف نعمل' : 'How It Works'}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'نتبع منهجية مبسطة وفعالة لضمان حصولك على أفضل حلول الحوكمة وإدارة المخاطر والامتثال'
              : 'We follow a simplified and effective methodology to ensure you get the best governance, risk management, and compliance solutions'
            }
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="text-center hover-elevate transition-all duration-200" data-testid={`step-${index}`}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'لماذا تختار أليف؟' : 'Why Choose Aliph?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3" data-testid={`benefit-${index}`}>
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'ar' 
              ? 'تواصل معنا اليوم للحصول على استشارة مجانية'
              : 'Contact us today for a free consultation'
            }
          </p>
          <Button 
            size="lg" 
            onClick={() => setLocation('/contact')}
            data-testid="button-start-journey"
          >
            {language === 'ar' ? 'ابدأ رحلتك معنا' : 'Start Your Journey'}
          </Button>
        </div>
      </div>
    </div>
  );
}
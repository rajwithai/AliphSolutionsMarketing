import { useLanguage } from '@/components/LanguageProvider';
import useSEO from '@/hooks/useSEO';
import { useLocation } from 'wouter';
import { CheckCircle, Star, Zap } from 'lucide-react';
import serviceTierImage from '@assets/generated_images/Three-tier_service_model_visualization_7df1188a.png';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Pricing() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  useSEO({
    title: language === 'ar' 
      ? 'خطط الأسعار - أليف للحلول الاستشارية'
      : 'Pricing Plans - Aliph Solutions',
    description: language === 'ar'
      ? 'اختر الخطة المناسبة لاحتياجات شركتك من خطط أسعار أليف المرنة. خطط أساسية ومتقدمة ومؤسسية مع إمكانية التخصيص الكامل.'
      : 'Choose the right plan for your company needs from Aliph flexible pricing plans. Basic, Professional, and Enterprise plans with full customization options.',
    keywords: language === 'ar'
      ? 'أسعار الاستشارات، خطط الحوكمة، تكلفة الامتثال، أليف'
      : 'consulting prices, governance plans, compliance costs, Aliph pricing'
  });

  const plans = [
    {
      name: language === 'ar' ? 'الأساسي' : 'Basic',
      price: language === 'ar' ? '2,500 ريال/شهر' : '2,500 SAR/month',
      icon: CheckCircle,
      popular: false,
      features: [
        language === 'ar' ? 'استشارة شهرية واحدة' : 'One monthly consultation',
        language === 'ar' ? 'تقييم أساسي للمخاطر' : 'Basic risk assessment',
        language === 'ar' ? 'دعم عبر البريد الإلكتروني' : 'Email support',
        language === 'ar' ? 'تقارير ربع سنوية' : 'Quarterly reports',
        language === 'ar' ? 'مراجعة سياسات الامتثال' : 'Compliance policy review'
      ]
    },
    {
      name: language === 'ar' ? 'المتقدم' : 'Professional',
      price: language === 'ar' ? '5,000 ريال/شهر' : '5,000 SAR/month',
      icon: Star,
      popular: true,
      features: [
        language === 'ar' ? 'استشارات أسبوعية' : 'Weekly consultations',
        language === 'ar' ? 'تقييم شامل للمخاطر' : 'Comprehensive risk assessment',
        language === 'ar' ? 'دعم على مدار الساعة' : '24/7 support',
        language === 'ar' ? 'تقارير شهرية مفصلة' : 'Detailed monthly reports',
        language === 'ar' ? 'تطوير سياسات مخصصة' : 'Custom policy development',
        language === 'ar' ? 'تدريب الفريق' : 'Team training',
        language === 'ar' ? 'مراجعة ربع سنوية' : 'Quarterly review'
      ]
    },
    {
      name: language === 'ar' ? 'المؤسسي' : 'Enterprise',
      price: language === 'ar' ? 'سعر مخصص' : 'Custom Pricing',
      icon: Zap,
      popular: false,
      features: [
        language === 'ar' ? 'استشارات مخصصة' : 'Custom consultations',
        language === 'ar' ? 'خبير مخصص لشركتك' : 'Dedicated expert for your company',
        language === 'ar' ? 'حلول مطورة خصيصاً' : 'Fully customized solutions',
        language === 'ar' ? 'تقارير في الوقت الفعلي' : 'Real-time reporting',
        language === 'ar' ? 'تكامل مع أنظمتك' : 'Integration with your systems',
        language === 'ar' ? 'تدريب شامل للموظفين' : 'Comprehensive employee training',
        language === 'ar' ? 'مدير حساب مخصص' : 'Dedicated account manager'
      ]
    }
  ];

  const additionalServices = [
    {
      title: language === 'ar' ? 'تقييم المخاطر المتخصص' : 'Specialized Risk Assessment',
      price: language === 'ar' ? 'ابتداءً من 3,000 ريال' : 'Starting from 3,000 SAR'
    },
    {
      title: language === 'ar' ? 'تدريب الموظفين' : 'Employee Training',
      price: language === 'ar' ? 'ابتداءً من 1,500 ريال' : 'Starting from 1,500 SAR'
    },
    {
      title: language === 'ar' ? 'مراجعة شاملة للامتثال' : 'Comprehensive Compliance Review',
      price: language === 'ar' ? 'ابتداءً من 5,000 ريال' : 'Starting from 5,000 SAR'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="heading-pricing-title">
            {language === 'ar' ? 'خطط الأسعار' : 'Pricing Plans'}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اختر الخطة المناسبة لاحتياجات شركتك مع إمكانية التخصيص الكامل للحلول'
              : 'Choose the right plan for your company\'s needs with full solution customization capabilities'
            }
          </p>
        </div>

        {/* Service Model Visualization */}
        <div className="mb-16 text-center">
          <div className="relative mx-auto max-w-2xl">
            <img
              src={serviceTierImage}
              alt={language === 'ar' ? 'نموذج الخدمة ثلاثي المستويات' : 'Three-tier service model'}
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
              data-testid="img-pricing-model"
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative hover-elevate transition-all duration-200 ${
                  plan.popular ? 'border-primary shadow-lg' : ''
                }`}
                data-testid={`pricing-plan-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <div className="text-2xl font-bold text-primary mt-2" data-testid={`text-plan-price-${index}`}>{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => setLocation('/contact')}
                    data-testid={`button-select-plan-${index}`}
                  >
                    {language === 'ar' ? 'اختر هذه الخطة' : 'Choose This Plan'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'خدمات إضافية' : 'Additional Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`additional-service-${index}`}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-primary font-medium">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                {language === 'ar' ? 'هل يمكنني تغيير الخطة لاحقاً؟' : 'Can I change my plan later?'}
              </h4>
              <p className="text-muted-foreground text-sm">
                {language === 'ar' 
                  ? 'نعم، يمكنك ترقية أو تقليل الخطة في أي وقت حسب احتياجاتك.'
                  : 'Yes, you can upgrade or downgrade your plan at any time based on your needs.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                {language === 'ar' ? 'هل تشمل الأسعار ضريبة القيمة المضافة؟' : 'Do prices include VAT?'}
              </h4>
              <p className="text-muted-foreground text-sm">
                {language === 'ar' 
                  ? 'الأسعار المعروضة لا تشمل ضريبة القيمة المضافة البالغة 15%.'
                  : 'The displayed prices do not include the 15% VAT.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'هل تحتاج استشارة مخصصة؟' : 'Need a Custom Consultation?'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'ar' 
              ? 'تواصل معنا للحصول على عرض سعر مخصص يناسب احتياجات شركتك'
              : 'Contact us to get a customized quote that suits your company\'s needs'
            }
          </p>
          <Button 
            size="lg" 
            onClick={() => setLocation('/contact')}
            data-testid="button-custom-consultation"
          >
            {language === 'ar' ? 'احصل على عرض مخصص' : 'Get Custom Quote'}
          </Button>
        </div>
      </div>
    </div>
  );
}
import { useLanguage } from '@/components/LanguageProvider';
import { useSEO } from '@/hooks/useSEO';
import { useLocation } from 'wouter';
import { Building2, Users, Shield, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import businessImage from '@assets/generated_images/Saudi_business_collaboration_scene_6b1f8d31.png';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Businesses() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  useSEO({
    title: language === 'ar' 
      ? 'حلول للشركات - أليف للحلول الاستشارية'
      : 'Business Solutions - Aliph Solutions',
    description: language === 'ar'
      ? 'نمكن الشركات من جميع الأحجام من تحقيق أعلى معايير الحوكمة وإدارة المخاطر والامتثال في جميع القطاعات.'
      : 'We enable companies of all sizes to achieve the highest standards of governance, risk management, and compliance across all sectors.',
    keywords: language === 'ar'
      ? 'حلول الشركات، الحوكمة المؤسسية، إدارة المخاطر، أليف'
      : 'business solutions, corporate governance, risk management, Aliph'
  });

  const services = [
    {
      icon: Shield,
      title: language === 'ar' ? 'إدارة المخاطر المؤسسية' : 'Enterprise Risk Management',
      description: language === 'ar'
        ? 'تقييم وإدارة المخاطر التشغيلية والمالية والاستراتيجية لحماية أعمالك'
        : 'Assessment and management of operational, financial, and strategic risks to protect your business'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'الحوكمة المؤسسية' : 'Corporate Governance',
      description: language === 'ar'
        ? 'تطبيق أفضل ممارسات الحوكمة لضمان الشفافية والمساءلة في إدارة الشركة'
        : 'Implementation of best governance practices to ensure transparency and accountability in company management'
    },
    {
      icon: Building2,
      title: language === 'ar' ? 'الامتثال التنظيمي' : 'Regulatory Compliance',
      description: language === 'ar'
        ? 'ضمان امتثال شركتك لجميع المتطلبات التنظيمية والقانونية في المملكة'
        : 'Ensuring your company complies with all regulatory and legal requirements in the Kingdom'
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'تحسين الأداء المؤسسي' : 'Performance Optimization',
      description: language === 'ar'
        ? 'تطوير استراتيجيات لتحسين الكفاءة التشغيلية وزيادة العوائد'
        : 'Developing strategies to improve operational efficiency and increase returns'
    }
  ];

  const industries = [
    {
      name: language === 'ar' ? 'البنوك والخدمات المالية' : 'Banking & Financial Services',
      description: language === 'ar' 
        ? 'حلول متخصصة للامتثال المصرفي وإدارة المخاطر المالية'
        : 'Specialized solutions for banking compliance and financial risk management'
    },
    {
      name: language === 'ar' ? 'الطاقة والبتروكيماويات' : 'Energy & Petrochemicals',
      description: language === 'ar'
        ? 'استراتيجيات حوكمة متقدمة لقطاع الطاقة والصناعات البترولية'
        : 'Advanced governance strategies for energy and petroleum industries'
    },
    {
      name: language === 'ar' ? 'التجارة والخدمات' : 'Retail & Services',
      description: language === 'ar'
        ? 'حلول الامتثال وإدارة المخاطر للشركات التجارية ومقدمي الخدمات'
        : 'Compliance and risk management solutions for retail companies and service providers'
    },
    {
      name: language === 'ar' ? 'الصحة والتعليم' : 'Healthcare & Education',
      description: language === 'ar'
        ? 'برامج حوكمة مخصصة للمؤسسات الصحية والتعليمية'
        : 'Customized governance programs for healthcare and educational institutions'
    },
    {
      name: language === 'ar' ? 'التقنية والاتصالات' : 'Technology & Telecommunications',
      description: language === 'ar'
        ? 'حلول متطورة لإدارة المخاطر التقنية وحماية البيانات'
        : 'Advanced solutions for technology risk management and data protection'
    },
    {
      name: language === 'ar' ? 'الإنشاءات والعقار' : 'Construction & Real Estate',
      description: language === 'ar'
        ? 'استراتيجيات الحوكمة للمشاريع الكبرى وشركات التطوير العقاري'
        : 'Governance strategies for major projects and real estate development companies'
    }
  ];

  const benefits = [
    language === 'ar' ? 'تقليل المخاطر التشغيلية بنسبة تصل إلى 40%' : 'Reduce operational risks by up to 40%',
    language === 'ar' ? 'تحسين الكفاءة المؤسسية والعمليات' : 'Improve institutional efficiency and operations',
    language === 'ar' ? 'ضمان الامتثال الكامل للمعايير المحلية' : 'Ensure full compliance with local standards',
    language === 'ar' ? 'زيادة ثقة المستثمرين والشركاء' : 'Increase investor and partner confidence',
    language === 'ar' ? 'تحقيق وفورات في التكاليف التشغيلية' : 'Achieve savings in operational costs',
    language === 'ar' ? 'بناء سمعة قوية في السوق' : 'Build a strong market reputation'
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="heading-businesses-title">
            {language === 'ar' ? 'حلول للشركات' : 'Business Solutions'}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'نمكن الشركات من جميع الأحجام من تحقيق أعلى معايير الحوكمة وإدارة المخاطر والامتثال من خلال حلول مبتكرة ومخصصة'
              : 'We enable companies of all sizes to achieve the highest standards of governance, risk management, and compliance through innovative and customized solutions'
            }
          </p>
        </div>

        {/* Business Collaboration Image */}
        <div className="mb-16 text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src={businessImage}
              alt={language === 'ar' ? 'فرق العمل في بيئة أعمال سعودية حديثة' : 'Business teams in modern Saudi workplace'}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              loading="lazy"
              data-testid="img-businesses-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`service-${index}`}>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Industries */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'القطاعات التي نخدمها' : 'Industries We Serve'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`industry-${index}`}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">
                    {industry.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {industry.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-primary/5 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'فوائد العمل معنا' : 'Benefits of Working With Us'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3" data-testid={`benefit-${index}`}>
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {language === 'ar' ? 'قصة نجاح' : 'Success Story'}
                </h2>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
              </div>
              <blockquote className="text-lg text-muted-foreground text-center mb-6 italic">
                {language === 'ar' 
                  ? '"ساعدتنا أليف في تحسين نظام الحوكمة بشركتنا بشكل كبير، مما أدى إلى زيادة الثقة من المستثمرين وتحسين أدائنا المالي بنسبة 25% خلال عام واحد."'
                  : '"Aliph helped us significantly improve our company\'s governance system, leading to increased investor confidence and a 25% improvement in our financial performance within one year."'
                }
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-foreground">
                  {language === 'ar' ? 'أحمد السالم' : 'Ahmed Al-Salem'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'الرئيس التنفيذي، شركة الخليج التجارية' : 'CEO, Gulf Commercial Company'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'عمليتنا' : 'Our Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center" data-testid={`process-step-${step}`}>
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {step}
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {step === 1 && (language === 'ar' ? 'التحليل' : 'Analysis')}
                  {step === 2 && (language === 'ar' ? 'التخطيط' : 'Planning')}
                  {step === 3 && (language === 'ar' ? 'التنفيذ' : 'Implementation')}
                  {step === 4 && (language === 'ar' ? 'المتابعة' : 'Monitoring')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {step === 1 && (language === 'ar' ? 'تحليل شامل لوضعك الحالي' : 'Comprehensive analysis of your current situation')}
                  {step === 2 && (language === 'ar' ? 'وضع استراتيجية مخصصة' : 'Developing a customized strategy')}
                  {step === 3 && (language === 'ar' ? 'تطبيق الحلول المناسبة' : 'Implementing appropriate solutions')}
                  {step === 4 && (language === 'ar' ? 'مراقبة مستمرة للنتائج' : 'Continuous monitoring of results')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'هل أنت مستعد لتحويل شركتك؟' : 'Ready to Transform Your Business?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلى مئات الشركات التي تثق بنا لتحقيق أعلى معايير الحوكمة والامتثال'
              : 'Join hundreds of companies that trust us to achieve the highest standards of governance and compliance'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setLocation('/contact')}
              className="flex items-center gap-2"
              data-testid="button-start-transformation"
            >
              <span>{language === 'ar' ? 'ابدأ التحول اليوم' : 'Start Transformation Today'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              data-testid="button-schedule-consultation"
            >
              {language === 'ar' ? 'احجز استشارة مجانية' : 'Schedule Free Consultation'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
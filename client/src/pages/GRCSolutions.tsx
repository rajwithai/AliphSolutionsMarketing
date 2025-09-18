import { useLanguage } from '@/components/LanguageProvider';
import { useSEO } from '@/hooks/useSEO';
import { Shield, Users, FileText, BarChart3, CheckCircle, ArrowRight, Target } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function GRCSolutions() {
  const { language } = useLanguage();

  useSEO({
    title: language === 'ar' 
      ? 'حلول GRC المتكاملة - أليف'
      : 'Integrated GRC Solutions - Aliph',
    description: language === 'ar'
      ? 'حلول شاملة ومتكاملة للحوكمة وإدارة المخاطر والامتثال مصممة خصيصاً لتلبية احتياجات الشركات في السعودية.'
      : 'Comprehensive and integrated solutions for governance, risk management, and compliance specifically designed to meet the needs of companies in Saudi Arabia.',
    keywords: language === 'ar'
      ? 'حلول GRC، الحوكمة المتكاملة، إدارة مخاطر الشركات، أليف'
      : 'GRC solutions, integrated governance, enterprise risk management, Aliph'
  });

  const solutions = [
    {
      icon: Users,
      title: language === 'ar' ? 'حلول الحوكمة' : 'Governance Solutions',
      description: language === 'ar'
        ? 'تطوير وتنفيذ أطر الحوكمة المؤسسية وفقاً لأفضل الممارسات العالمية والمحلية'
        : 'Develop and implement corporate governance frameworks according to global and local best practices',
      features: [
        language === 'ar' ? 'هيكلة مجالس الإدارة' : 'Board structuring',
        language === 'ar' ? 'سياسات الحوكمة' : 'Governance policies',
        language === 'ar' ? 'إجراءات الرقابة الداخلية' : 'Internal control procedures',
        language === 'ar' ? 'تقييم أداء المجلس' : 'Board performance evaluation'
      ]
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'حلول إدارة المخاطر' : 'Risk Management Solutions',
      description: language === 'ar'
        ? 'تحديد وتقييم وإدارة المخاطر التشغيلية والمالية والاستراتيجية بشكل استباقي'
        : 'Identify, assess, and proactively manage operational, financial, and strategic risks',
      features: [
        language === 'ar' ? 'تقييم المخاطر الشامل' : 'Comprehensive risk assessment',
        language === 'ar' ? 'استراتيجيات التخفيف' : 'Mitigation strategies',
        language === 'ar' ? 'مصفوفة المخاطر' : 'Risk matrices',
        language === 'ar' ? 'خطط استمرارية الأعمال' : 'Business continuity plans'
      ]
    },
    {
      icon: FileText,
      title: language === 'ar' ? 'حلول الامتثال' : 'Compliance Solutions',
      description: language === 'ar'
        ? 'ضمان الامتثال الكامل للمتطلبات التنظيمية والقانونية في جميع جوانب العمل'
        : 'Ensure full compliance with regulatory and legal requirements in all aspects of business',
      features: [
        language === 'ar' ? 'مراجعة الامتثال' : 'Compliance reviews',
        language === 'ar' ? 'برامج التدريب' : 'Training programs',
        language === 'ar' ? 'أدلة السياسات' : 'Policy manuals',
        language === 'ar' ? 'المراقبة المستمرة' : 'Continuous monitoring'
      ]
    },
    {
      icon: BarChart3,
      title: language === 'ar' ? 'حلول التحليل والتقارير' : 'Analytics & Reporting Solutions',
      description: language === 'ar'
        ? 'تطوير أنظمة التقارير والتحليلات لمراقبة الأداء واتخاذ القرارات المدروسة'
        : 'Develop reporting and analytics systems to monitor performance and make informed decisions',
      features: [
        language === 'ar' ? 'لوحات المراقبة' : 'Monitoring dashboards',
        language === 'ar' ? 'مؤشرات الأداء الرئيسية' : 'Key performance indicators',
        language === 'ar' ? 'التقارير التنظيمية' : 'Regulatory reports',
        language === 'ar' ? 'التحليل التنبؤي' : 'Predictive analytics'
      ]
    }
  ];

  const industries = [
    {
      name: language === 'ar' ? 'القطاع المصرفي' : 'Banking Sector',
      regulations: ['SAMA', 'Basel III', language === 'ar' ? 'مكافحة غسل الأموال' : 'AML']
    },
    {
      name: language === 'ar' ? 'التأمين' : 'Insurance',
      regulations: ['SAMA', 'Solvency II', language === 'ar' ? 'حماية المستهلك' : 'Consumer Protection']
    },
    {
      name: language === 'ar' ? 'السوق المالية' : 'Capital Markets',
      regulations: ['CMA', 'IFRS', language === 'ar' ? 'الإفصاح المالي' : 'Financial Disclosure']
    },
    {
      name: language === 'ar' ? 'الطاقة' : 'Energy',
      regulations: ['ECRA', 'HSE', language === 'ar' ? 'البيئة والسلامة' : 'Environmental Safety']
    },
    {
      name: language === 'ar' ? 'الاتصالات' : 'Telecommunications',
      regulations: ['CITC', language === 'ar' ? 'حماية البيانات' : 'Data Protection', 'Cybersecurity']
    },
    {
      name: language === 'ar' ? 'الصحة' : 'Healthcare',
      regulations: ['SFDA', 'CBAHI', language === 'ar' ? 'خصوصية المرضى' : 'Patient Privacy']
    }
  ];

  const benefits = [
    language === 'ar' ? 'تقليل المخاطر التنظيمية والقانونية' : 'Reduce regulatory and legal risks',
    language === 'ar' ? 'تحسين الكفاءة التشغيلية' : 'Improve operational efficiency',
    language === 'ar' ? 'زيادة ثقة أصحاب المصلحة' : 'Increase stakeholder confidence',
    language === 'ar' ? 'تعزيز السمعة المؤسسية' : 'Enhance corporate reputation',
    language === 'ar' ? 'توفير التكاليف على المدى الطويل' : 'Long-term cost savings',
    language === 'ar' ? 'تحسين اتخاذ القرارات' : 'Improve decision-making'
  ];

  const approach = [
    {
      phase: language === 'ar' ? 'التقييم' : 'Assessment',
      description: language === 'ar' 
        ? 'تحليل شامل للوضع الحالي وتحديد الفجوات'
        : 'Comprehensive analysis of current state and gap identification'
    },
    {
      phase: language === 'ar' ? 'التصميم' : 'Design',
      description: language === 'ar'
        ? 'تطوير حلول مخصصة تناسب احتياجات شركتك'
        : 'Develop customized solutions that meet your company\'s needs'
    },
    {
      phase: language === 'ar' ? 'التنفيذ' : 'Implementation',
      description: language === 'ar'
        ? 'تطبيق الحلول مع ضمان التكامل مع العمليات الحالية'
        : 'Implement solutions while ensuring integration with current operations'
    },
    {
      phase: language === 'ar' ? 'المراقبة' : 'Monitoring',
      description: language === 'ar'
        ? 'متابعة مستمرة وتحسين الأداء حسب المطلوب'
        : 'Continuous monitoring and performance improvement as needed'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="heading-grc-title">
            {language === 'ar' ? 'حلول GRC المتكاملة' : 'Integrated GRC Solutions'}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'حلول شاملة ومتكاملة للحوكمة وإدارة المخاطر والامتثال مصممة خصيصاً لتلبية احتياجات الشركات في المملكة العربية السعودية'
              : 'Comprehensive and integrated solutions for governance, risk management, and compliance specifically designed to meet the needs of companies in Saudi Arabia'
            }
          </p>
        </div>

        {/* Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`solution-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {solution.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Industries & Regulations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'القطاعات والمتطلبات التنظيمية' : 'Industries & Regulatory Requirements'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`industry-${index}`}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-3">
                    {industry.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {industry.regulations.map((regulation, regIndex) => (
                      <Badge key={regIndex} variant="secondary" className="text-xs">
                        {regulation}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Approach */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'منهجيتنا' : 'Our Approach'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {approach.map((phase, index) => (
              <Card key={index} className="text-center hover-elevate transition-all duration-200" data-testid={`approach-${index}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {phase.phase}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-primary/5 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'فوائد حلول GRC' : 'Benefits of GRC Solutions'}
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

        {/* Technology Integration */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {language === 'ar' ? 'التكامل التقني' : 'Technology Integration'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {language === 'ar' 
                  ? 'نساعدك في تطبيق أحدث التقنيات والأدوات لإدارة GRC بكفاءة عالية، بما في ذلك الذكاء الاصطناعي والتحليلات المتقدمة لتحسين الأداء وتقليل المخاطر'
                  : 'We help you implement the latest technologies and tools for efficient GRC management, including AI and advanced analytics to improve performance and reduce risks'
                }
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['AI/ML', 'Automation', 'Analytics', 'Cloud Solutions', 'Integration APIs'].map((tech, index) => (
                  <Badge key={index} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'جاهز لتطبيق حلول GRC المتقدمة؟' : 'Ready to Implement Advanced GRC Solutions?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'تواصل معنا اليوم للحصول على استشارة مجانية وتقييم شامل لاحتياجات شركتك'
              : 'Contact us today for a free consultation and comprehensive assessment of your company\'s needs'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/contact'}
              className="flex items-center gap-2"
              data-testid="button-get-consultation"
            >
              <span>{language === 'ar' ? 'احصل على استشارة' : 'Get Consultation'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              data-testid="button-download-brochure"
            >
              {language === 'ar' ? 'تحميل الكتيب التعريفي' : 'Download Brochure'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
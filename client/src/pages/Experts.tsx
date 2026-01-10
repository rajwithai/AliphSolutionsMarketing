import { useLanguage } from '@/components/LanguageProvider';
import useSEO from '@/hooks/useSEO';
import { useLocation } from 'wouter';
import { Star, Award, Users, TrendingUp, CheckCircle, ArrowRight, Plus } from 'lucide-react';
import expertWorkspaceImage from '@assets/generated_images/Professional_consulting_hero_image_0550d314.png';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Experts() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  useSEO({
    title: language === 'ar' 
      ? 'انضم إلى شبكة الخبراء - أليف'
      : 'Join Our Expert Network - Aliph',
    description: language === 'ar'
      ? 'كن جزءاً من أكبر شبكة خبراء الحوكمة وإدارة المخاطر والامتثال في المملكة. طور مسيرتك واحصل على دخل إضافي.'
      : 'Be part of the largest governance, risk management, and compliance expert network in Saudi Arabia. Develop your career and earn additional income.',
    keywords: language === 'ar'
      ? 'شبكة خبراء، وظائف الحوكمة، استشاري مستقل، أليف'
      : 'expert network, governance jobs, freelance consultant, Aliph careers'
  });

  const requirements = [
    {
      title: language === 'ar' ? 'مؤهلات أكاديمية' : 'Academic Qualifications',
      description: language === 'ar' 
        ? 'درجة جامعية في إدارة الأعمال، القانون، المحاسبة، أو مجال ذي صلة'
        : 'University degree in Business Administration, Law, Accounting, or related field'
    },
    {
      title: language === 'ar' ? 'خبرة عملية' : 'Practical Experience',
      description: language === 'ar'
        ? 'خبرة لا تقل عن 5 سنوات في مجال الحوكمة أو إدارة المخاطر أو الامتثال'
        : 'Minimum 5 years of experience in governance, risk management, or compliance'
    },
    {
      title: language === 'ar' ? 'شهادات مهنية' : 'Professional Certifications',
      description: language === 'ar'
        ? 'شهادات معتمدة مثل CPA, CIA, CISA, أو شهادات أخرى ذات صلة'
        : 'Certified credentials such as CPA, CIA, CISA, or other relevant certifications'
    },
    {
      title: language === 'ar' ? 'إجادة اللغات' : 'Language Proficiency',
      description: language === 'ar'
        ? 'إجادة اللغة العربية والإنجليزية تحدثاً وكتابة'
        : 'Proficiency in Arabic and English, both spoken and written'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'دخل إضافي مرن' : 'Flexible Additional Income',
      description: language === 'ar' 
        ? 'احصل على دخل إضافي مع مرونة في اختيار المشاريع ومواعيد العمل'
        : 'Earn additional income with flexibility in choosing projects and work schedules'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'شبكة مهنية واسعة' : 'Extensive Professional Network',
      description: language === 'ar'
        ? 'توسيع شبكة علاقاتك المهنية مع خبراء وشركات رائدة في المملكة'
        : 'Expand your professional network with leading experts and companies in the Kingdom'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'تطوير المهارات' : 'Skill Development',
      description: language === 'ar'
        ? 'فرص مستمرة للتعلم والتطوير المهني من خلال مشاريع متنوعة'
        : 'Continuous opportunities for learning and professional development through diverse projects'
    },
    {
      icon: Star,
      title: language === 'ar' ? 'سمعة مهنية قوية' : 'Strong Professional Reputation',
      description: language === 'ar'
        ? 'بناء سمعة متميزة في السوق كخبير معتمد في مجالك'
        : 'Build an outstanding reputation in the market as a certified expert in your field'
    }
  ];

  const specializations = [
    language === 'ar' ? 'حوكمة الشركات' : 'Corporate Governance',
    language === 'ar' ? 'إدارة المخاطر المالية' : 'Financial Risk Management',
    language === 'ar' ? 'الامتثال التنظيمي' : 'Regulatory Compliance',
    language === 'ar' ? 'المراجعة الداخلية' : 'Internal Auditing',
    language === 'ar' ? 'أمن المعلومات' : 'Information Security',
    language === 'ar' ? 'إدارة المخاطر التشغيلية' : 'Operational Risk Management',
    language === 'ar' ? 'الامتثال المصرفي' : 'Banking Compliance',
    language === 'ar' ? 'حوكمة تقنية المعلومات' : 'IT Governance'
  ];

  const process = [
    {
      step: 1,
      title: language === 'ar' ? 'التقديم' : 'Application',
      description: language === 'ar' 
        ? 'قدم طلبك مع سيرتك الذاتية والشهادات المطلوبة'
        : 'Submit your application with CV and required certificates'
    },
    {
      step: 2,
      title: language === 'ar' ? 'التقييم' : 'Assessment',
      description: language === 'ar'
        ? 'مراجعة شاملة لمؤهلاتك وخبراتك من قبل فريقنا المختص'
        : 'Comprehensive review of your qualifications and experience by our specialized team'
    },
    {
      step: 3,
      title: language === 'ar' ? 'المقابلة' : 'Interview',
      description: language === 'ar'
        ? 'مقابلة شخصية لتقييم مهاراتك ومناقشة توقعاتك'
        : 'Personal interview to assess your skills and discuss expectations'
    },
    {
      step: 4,
      title: language === 'ar' ? 'الانضمام' : 'Onboarding',
      description: language === 'ar'
        ? 'تدريب تعريفي وإعداد ملفك الشخصي في شبكة الخبراء'
        : 'Orientation training and setting up your profile in the expert network'
    }
  ];

  const stats = [
    {
      number: '500+',
      label: language === 'ar' ? 'خبير نشط' : 'Active Experts'
    },
    {
      number: '95%',
      label: language === 'ar' ? 'معدل رضا العملاء' : 'Client Satisfaction Rate'
    },
    {
      number: '15K+',
      label: language === 'ar' ? 'ساعة استشارة' : 'Consultation Hours'
    },
    {
      number: '50+',
      label: language === 'ar' ? 'مدينة نغطيها' : 'Cities Covered'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="heading-experts-title">
            {language === 'ar' ? 'انضم إلى شبكة الخبراء' : 'Join Our Expert Network'}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'كن جزءاً من أكبر شبكة خبراء الحوكمة وإدارة المخاطر والامتثال في المملكة العربية السعودية'
              : 'Be part of the largest network of governance, risk management, and compliance experts in Saudi Arabia'
            }
          </p>
        </div>

        {/* Expert Workspace Hero */}
        <div className="mb-16 text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src={expertWorkspaceImage}
              alt={language === 'ar' ? 'بيئة عمل الخبراء والاستشاريين المحترفين' : 'Professional expert workspace environment'}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              loading="lazy"
              data-testid="img-experts-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-elevate transition-all duration-200" data-testid={`stat-${index}`}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'فوائد الانضمام إلينا' : 'Benefits of Joining Us'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`benefit-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'متطلبات الانضمام' : 'Joining Requirements'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((requirement, index) => (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`requirement-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {requirement.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {requirement.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'مجالات التخصص' : 'Areas of Specialization'}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {specializations.map((specialization, index) => (
              <Badge key={index} variant="secondary" className="hover-elevate cursor-pointer" data-testid={`specialization-${index}`}>
                {specialization}
              </Badge>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {language === 'ar' ? 'عملية الانضمام' : 'Joining Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <Card key={index} className="text-center hover-elevate transition-all duration-200" data-testid={`process-step-${index}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <blockquote className="text-lg text-muted-foreground mb-6 italic">
                {language === 'ar' 
                  ? '"الانضمام لشبكة أليف كان قراراً ممتازاً. ساعدني في بناء سمعة قوية وزيادة دخلي بشكل كبير، بالإضافة إلى العمل مع شركات رائدة في المملكة."'
                  : '"Joining the Aliph network was an excellent decision. It helped me build a strong reputation and significantly increase my income, in addition to working with leading companies in the Kingdom."'
                }
              </blockquote>
              <div>
                <p className="font-semibold text-foreground">
                  {language === 'ar' ? 'د. سارة المالكي' : 'Dr. Sarah Al-Malki'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'خبيرة الحوكمة المؤسسية' : 'Corporate Governance Expert'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'مستعد لتطوير مسيرتك المهنية؟' : 'Ready to Advance Your Career?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلى شبكة الخبراء الرائدة في المملكة وساهم في تطوير بيئة الأعمال السعودية'
              : 'Join the leading expert network in the Kingdom and contribute to developing the Saudi business environment'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setLocation('/contact')}
              className="flex items-center gap-2"
              data-testid="button-apply-now"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'تقدم الآن' : 'Apply Now'}</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center gap-2"
              data-testid="button-learn-more"
            >
              <span>{language === 'ar' ? 'تعرف على المزيد' : 'Learn More'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
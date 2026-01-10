import { useLanguage } from '@/components/LanguageProvider';
import useSEO from '@/hooks/useSEO';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import blogHeroImage from '@assets/generated_images/Social_media_preview_image_87c2a21e.png';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Blog() {
  const { language } = useLanguage();

  useSEO({
    title: language === 'ar' 
      ? 'المدونة - أليف للحلول الاستشارية'
      : 'Blog - Aliph Solutions',
    description: language === 'ar'
      ? 'اكتشف أحدث الاتجاهات والإرشادات في مجال الحوكمة وإدارة المخاطر والامتثال من خبرائنا المعتمدين في أليف.'
      : 'Discover the latest trends and guidance in governance, risk management, and compliance from our certified experts at Aliph.',
    keywords: language === 'ar'
      ? 'مدونة الحوكمة، مقالات المخاطر، نصائح الامتثال، أليف'
      : 'governance blog, risk articles, compliance tips, Aliph insights'
  });

  const featuredPost = {
    title: language === 'ar' 
      ? 'دليل شامل لتطبيق معايير الحوكمة في الشركات السعودية'
      : 'Complete Guide to Implementing Governance Standards in Saudi Companies',
    excerpt: language === 'ar'
      ? 'كل ما تحتاج معرفته حول تطبيق أفضل ممارسات الحوكمة وإدارة المخاطر في بيئة الأعمال السعودية وفقاً لرؤية 2030'
      : 'Everything you need to know about implementing best practices in governance and risk management in the Saudi business environment according to Vision 2030',
    author: language === 'ar' ? 'د. محمد الأحمد' : 'Dr. Mohammed Al-Ahmad',
    date: language === 'ar' ? '15 سبتمبر 2024' : 'September 15, 2024',
    readTime: language === 'ar' ? '8 دقائق قراءة' : '8 min read',
    category: language === 'ar' ? 'الحوكمة' : 'Governance'
  };

  const blogPosts = [
    {
      title: language === 'ar' 
        ? 'كيفية إعداد برنامج امتثال فعال'
        : 'How to Build an Effective Compliance Program',
      excerpt: language === 'ar'
        ? 'خطوات عملية لبناء برنامج امتثال قوي يحمي شركتك من المخاطر القانونية والتنظيمية'
        : 'Practical steps to build a strong compliance program that protects your company from legal and regulatory risks',
      author: language === 'ar' ? 'سارة العلي' : 'Sarah Al-Ali',
      date: language === 'ar' ? '12 سبتمبر 2024' : 'September 12, 2024',
      readTime: language === 'ar' ? '6 دقائق قراءة' : '6 min read',
      category: language === 'ar' ? 'الامتثال' : 'Compliance'
    },
    {
      title: language === 'ar'
        ? 'تأثير التحول الرقمي على إدارة المخاطر'
        : 'The Impact of Digital Transformation on Risk Management',
      excerpt: language === 'ar'
        ? 'كيف تؤثر التقنيات الحديثة على استراتيجيات إدارة المخاطر في الشركات'
        : 'How modern technologies are affecting risk management strategies in companies',
      author: language === 'ar' ? 'أحمد الشهري' : 'Ahmed Al-Shehri',
      date: language === 'ar' ? '10 سبتمبر 2024' : 'September 10, 2024',
      readTime: language === 'ar' ? '5 دقائق قراءة' : '5 min read',
      category: language === 'ar' ? 'إدارة المخاطر' : 'Risk Management'
    },
    {
      title: language === 'ar'
        ? 'أفضل الممارسات في مجلس الإدارة'
        : 'Best Practices for Board Governance',
      excerpt: language === 'ar'
        ? 'دليل شامل لأفضل الممارسات التي يجب على مجالس الإدارة اتباعها لضمان الحوكمة الفعالة'
        : 'A comprehensive guide to best practices that boards should follow to ensure effective governance',
      author: language === 'ar' ? 'فاطمة القحطاني' : 'Fatimah Al-Qahtani',
      date: language === 'ar' ? '8 سبتمبر 2024' : 'September 8, 2024',
      readTime: language === 'ar' ? '7 دقائق قراءة' : '7 min read',
      category: language === 'ar' ? 'الحوكمة' : 'Governance'
    },
    {
      title: language === 'ar'
        ? 'التحديات القانونية في البيئة التنظيمية السعودية'
        : 'Legal Challenges in Saudi Regulatory Environment',
      excerpt: language === 'ar'
        ? 'نظرة على أبرز التحديات القانونية التي تواجه الشركات في المملكة وكيفية التعامل معها'
        : 'A look at the key legal challenges facing companies in the Kingdom and how to deal with them',
      author: language === 'ar' ? 'خالد الدوسري' : 'Khalid Al-Dosari',
      date: language === 'ar' ? '5 سبتمبر 2024' : 'September 5, 2024',
      readTime: language === 'ar' ? '9 دقائق قراءة' : '9 min read',
      category: language === 'ar' ? 'القانون' : 'Legal'
    },
    {
      title: language === 'ar'
        ? 'مؤشرات الأداء الرئيسية لبرامج GRC'
        : 'Key Performance Indicators for GRC Programs',
      excerpt: language === 'ar'
        ? 'كيفية قياس فعالية برامج الحوكمة وإدارة المخاطر والامتثال باستخدام مؤشرات الأداء المناسبة'
        : 'How to measure the effectiveness of governance, risk management, and compliance programs using appropriate KPIs',
      author: language === 'ar' ? 'نورا المطيري' : 'Nora Al-Mutairi',
      date: language === 'ar' ? '3 سبتمبر 2024' : 'September 3, 2024',
      readTime: language === 'ar' ? '6 دقائق قراءة' : '6 min read',
      category: language === 'ar' ? 'تحليلات' : 'Analytics'
    },
    {
      title: language === 'ar'
        ? 'الاستعداد لمراجعات الجهات التنظيمية'
        : 'Preparing for Regulatory Audits',
      excerpt: language === 'ar'
        ? 'دليل عملي للاستعداد لمراجعات الجهات التنظيمية وضمان النجاح في التقييمات'
        : 'A practical guide to preparing for regulatory audits and ensuring success in assessments',
      author: language === 'ar' ? 'عبدالرحمن الغامدي' : 'Abdulrahman Al-Ghamdi',
      date: language === 'ar' ? '1 سبتمبر 2024' : 'September 1, 2024',
      readTime: language === 'ar' ? '8 دقائق قراءة' : '8 min read',
      category: language === 'ar' ? 'مراجعة' : 'Audit'
    }
  ];

  const categories = [
    language === 'ar' ? 'الحوكمة' : 'Governance',
    language === 'ar' ? 'إدارة المخاطر' : 'Risk Management',
    language === 'ar' ? 'الامتثال' : 'Compliance',
    language === 'ar' ? 'القانون' : 'Legal',
    language === 'ar' ? 'تحليلات' : 'Analytics',
    language === 'ar' ? 'مراجعة' : 'Audit'
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="heading-blog-title">
            {language === 'ar' ? 'المدونة' : 'Blog'}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف أحدث الاتجاهات والإرشادات في مجال الحوكمة وإدارة المخاطر والامتثال من خبرائنا المعتمدين'
              : 'Discover the latest trends and guidance in governance, risk management, and compliance from our certified experts'
            }
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="hover-elevate cursor-pointer" data-testid={`category-${index}`}>
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Hero Image */}
        <div className="mb-16 text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src={blogHeroImage}
              alt={language === 'ar' ? 'صورة المدونة والمقالات المتخصصة' : 'Blog and insights hero image'}
              className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              loading="lazy"
              data-testid="img-blog-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Featured Post */}
        <Card className="mb-16 hover-elevate transition-all duration-200" data-testid="featured-post">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4">{featuredPost.category}</Badge>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button className="flex items-center gap-2" data-testid="button-read-featured">
                  <span>{language === 'ar' ? 'اقرأ المقال' : 'Read Article'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center">
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'صورة المقال المميز' : 'Featured Article Image'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover-elevate transition-all duration-200 cursor-pointer" data-testid={`card-blog-post-${index}`}>
              <CardHeader>
                <div className="bg-muted/50 rounded-lg h-48 mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    {language === 'ar' ? 'صورة المقال' : 'Article Image'}
                  </span>
                </div>
                <Badge className="w-fit mb-2">{post.category}</Badge>
                <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" data-testid="button-load-more">
            {language === 'ar' ? 'تحميل المزيد من المقالات' : 'Load More Articles'}
          </Button>
        </div>
      </div>
    </div>
  );
}
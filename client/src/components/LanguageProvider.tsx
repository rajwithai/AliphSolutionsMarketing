import { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.howItWorks': 'How It Works',
    'nav.businesses': 'For Businesses',
    'nav.experts': 'For Experts',
    'nav.grc': 'GRC Solutions',
    'nav.pricing': 'Pricing',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signUp': 'Sign Up',
    
    // Homepage
    'hero.title': 'Expertise, On-Demand. The Future of Advisory in Saudi Arabia.',
    'hero.subtitle': 'We\'ve reimagined the consulting model to give you direct access to elite, AI-enhanced expertise—at the speed and scale your business demands.',
    'hero.primaryCta': 'Get Your Solution',
    'hero.secondaryCta': 'Join Our Expert Network',
    
    // Sections
    'oldWay.title': 'The Old Way Isn\'t Working.',
    'oldWay.description': 'Traditional firms are built for large, open-ended projects—costly, slow, and rigid. Saudi SMEs and fast-growing enterprises need precise answers faster. Aliph delivers vetted expertise, right-sized engagements, and AI-assisted speed so you can move with confidence.',
    
    'newModel.title': 'A New Model for a New Economy.',
    'tier1.title': 'AI-Assisted Self-Service',
    'tier1.description': 'Instant, intelligent, and affordable foundations (templates, checklists, guided drafting).',
    'tier2.title': 'Light Customization', 
    'tier2.description': 'Rapid expert review and refinement—bridge the last 10%.',
    'tier3.title': 'Heavy Customization',
    'tier3.description': 'Agile, milestone-driven expert projects for complex needs.',
    
    'grc.title': 'Start Where It Matters: Governance, Risk & Compliance.',
    'grc.description': 'With Vision 2030 accelerating transformation, meeting requirements from CMA, SAMA, MOC, and PDPL is mission-critical. We start by solving your high-stakes GRC needs—building a foundation of trust for everything that follows.',
    
    'experts.title': 'Expertise You Can Trust. Vetted. Local. World‑Class.',
    'experts.description': 'Our multi-stage vetting and Quality Score ensure you always work with top independent professionals. See profiles, ratings, and verified credentials before you commit.',
    
    'closing.title': 'Ready to Navigate Complexity with Confidence?',
    'closing.cta': 'Get Your GRC Solution Today',
    
    // Common
    'common.seeHowItWorks': 'See How It Works',
    'common.exploreTiers': 'Explore the Tiers',
    'common.meetExperts': 'Meet Our Experts',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.howItWorks': 'كيف نعمل',
    'nav.businesses': 'للشركات',
    'nav.experts': 'للخبراء',
    'nav.grc': 'حلول الحوكمة',
    'nav.pricing': 'الأسعار',
    'nav.blog': 'المدونة',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',
    'nav.login': 'تسجيل الدخول',
    'nav.signUp': 'إنشاء حساب',
    
    // Homepage
    'hero.title': 'خبرة عند الطلب. مستقبل الاستشارات في المملكة العربية السعودية.',
    'hero.subtitle': 'أعدنا ابتكار نموذج الاستشارات لنمنحك وصولًا مباشرًا إلى خبراء نخبة مدعومين بالذكاء الاصطناعي—بالسرعة والحجم المناسبين لعملك.',
    'hero.primaryCta': 'احصل على الحل الآن',
    'hero.secondaryCta': 'انضم إلى شبكة الخبراء',
    
    // Sections
    'oldWay.title': 'الأسلوب القديم لا يعمل.',
    'oldWay.description': 'تم تصميم الشركات التقليدية لمشاريع كبيرة ومفتوحة—باهظة وبطيئة وغير مرنة. تحتاج الشركات السعودية الصغيرة والمتوسطة والمؤسسات سريعة النمو إلى إجابات دقيقة وبسرعة. توفر «أليف» خبرة مُحقَّقة، ومهام بحجم مناسب، وسرعة مدعومة بالذكاء الاصطناعي لتتقدم بثقة.',
    
    'newModel.title': 'نموذج جديد لاقتصاد جديد.',
    'tier1.title': 'الخدمة الذاتية المدعومة بالذكاء الاصطناعي',
    'tier1.description': 'أسس فورية وذكية وبأسعار معقولة (قوالب، قوائم مرجعية، صياغة موجهة).',
    'tier2.title': 'تخصيص خفيف',
    'tier2.description': 'مراجعة سريعة من الخبراء وتحسين—سد الفجوة الأخيرة 10%.',
    'tier3.title': 'تخصيص ثقيل',
    'tier3.description': 'مشاريع خبراء رشيقة مدفوعة بالمعالم للاحتياجات المعقدة.',
    
    'grc.title': 'ابدأ بما هو مهم: الحوكمة وإدارة المخاطر والامتثال.',
    'grc.description': 'مع تسارع التحول ضمن رؤية 2030، أصبح الامتثال لمتطلبات «هيئة السوق المالية» و«ساما» و«وزارة التجارة» و«قانون حماية البيانات الشخصية» ضرورة استراتيجية. نبدأ بتلبية احتياجات GRC عالية الأهمية—لنؤسس الثقة لكل ما يلي.',
    
    'experts.title': 'خبرة موثوقة. مُحقَّقة. محلية وعالمية المستوى.',
    'experts.description': 'يضمن التدقيق متعدد المراحل ونقاط الجودة لدينا عملك دائماً مع أفضل المهنيين المستقلين. اطلع على الملفات الشخصية والتقييمات والشهادات المتحققة قبل الالتزام.',
    
    'closing.title': 'هل أنت مستعد للتعامل مع التعقيد بثقة؟',
    'closing.cta': 'احصل على حل GRC اليوم',
    
    // Common
    'common.seeHowItWorks': 'شاهد كيف نعمل',
    'common.exploreTiers': 'استكشف المستويات',
    'common.meetExperts': 'تعرف على خبرائنا',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  useEffect(() => {
    // Set HTML direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Apply Arabic font class to body when Arabic is selected
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language]);
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };
  
  const value = {
    language,
    setLanguage,
    t,
    isRTL: language === 'ar',
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
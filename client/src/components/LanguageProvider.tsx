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
    
    // Homepage Hero
    'hero.title': 'Saudi Arabia\'s First AI-Powered GRC Advisory Platform',
    'hero.subtitle': 'Empowering Saudi businesses to simplify compliance, manage risk, and align with Vision 2030 — powered by AI and expert intelligence.',
    'hero.primaryCta': 'Explore the Platform',
    'hero.secondaryCta': 'Join as SME Partner',
    'hero.stat1': '10× Faster Implementation',
    'hero.stat2': 'Powered by Saudi Experts',
    'hero.stat3': 'Compliant with PDPL, ZATCA, SAMA',
    
    // Why Aliph Exists
    'whyAliph.title': 'Compliance Shouldn\'t Be a Burden — It Should Be Your Competitive Edge',
    'whyAliph.description': 'Saudi businesses face an evolving web of regulations — PDPL, ZATCA, MHRSD, NCA, SAMA — all transforming under Vision 2030. Aliph Solutions makes compliance simple, affordable, and intelligent for every organization, from fast-growing SMEs to listed enterprises.',
    'whyAliph.highlight': 'Built in Saudi Arabia. Designed for Vision 2030. Validated by certified GRC experts.',
    
    // Three Tiers
    'tiers.title': 'How Aliph Works — Three Tiers, One Seamless Experience',
    'tier1.title': 'Self-Service Intelligence',
    'tier1.description': 'Instantly access 1,000+ Saudi-specific templates, policies, and toolkits curated by the Aliph Brain.',
    'tier2.title': 'Light Customization', 
    'tier2.description': 'Get your compliance materials reviewed and finalized by certified Saudi experts — fast, accurate, and regulator-ready.',
    'tier3.title': 'Heavy Customization (Micro-Assignments)',
    'tier3.description': 'Launch outcome-driven advisory projects with milestones, tracked deliverables, and guaranteed closure.',
    
    // Aliph Brain
    'brain.title': 'The Aliph Brain — Saudi Intelligence Engine',
    'brain.subtitle': 'Turning complexity into clarity — powered by Saudi law, data, and experts.',
    'brain.description': 'Trained on thousands of verified regulatory documents — PDPL, ZATCA, SAMA, MHRSD, CMA — and enriched by certified Saudi consultants, the Aliph Brain understands compliance like your in-house legal team.',
    'brain.point1': 'Saudi-first datasets from national regulators.',
    'brain.point2': 'Expert-validated knowledge library.',
    'brain.point3': 'Data never leaves your organization (PDPL-safe).',
    'brain.point4': 'Continuously updated from real advisory cases.',
    'brain.cta': 'Explore the Knowledge Library',
    
    // Knowledge Library
    'library.title': 'The Knowledge Library — Seven Pillars of Compliance',
    'library.subtitle': 'Explore frameworks and templates curated under the Seven Pillars of Saudi Enterprise:',
    'library.pillar1': 'Corporate Strategy & Legal Compliance',
    'library.pillar2': 'Corporate Finance & Taxation (ZATCA Ready)',
    'library.pillar3': 'Human Capital & Saudization Compliance',
    'library.pillar4': 'Marketing, Sales & Customer Experience',
    'library.pillar5': 'Digital Transformation & Cybersecurity',
    'library.pillar6': 'Vision 2030 Opportunities & Giga-Projects',
    'library.pillar7': 'Leadership & Professional Development',
    'library.cta': 'Browse Pillars',
    
    // Vision 2030
    'vision.title': 'Vision 2030 Alignment',
    'vision.description': 'Every policy, process, and product within Aliph Solutions supports the Kingdom\'s transformation agenda.',
    'vision.point1': 'Aligns with national programs and giga-projects',
    'vision.point2': 'Promotes transparency and governance excellence',
    'vision.point3': 'Empowers SMEs to meet Vision 2030 mandates',
    
    // Why Choose Aliph
    'whyChoose.title': 'Why Choose Aliph',
    'whyChoose.subtitle': 'We combine speed, trust, and local expertise — redefining how compliance works in Saudi Arabia.',
    'whyChoose.point1Title': 'AI + Human Hybrid',
    'whyChoose.point1Desc': 'Automation meets context',
    'whyChoose.point2Title': 'Local Expert Network',
    'whyChoose.point2Desc': 'Verified GRC specialists',
    'whyChoose.point3Title': 'Pre-Built Templates',
    'whyChoose.point3Desc': 'Ready for audits & filings',
    'whyChoose.point4Title': '10× Faster & 5× More Affordable',
    'whyChoose.point4Desc': 'Than traditional consulting',
    'whyChoose.point5Title': 'Vision 2030 Focused',
    'whyChoose.point5Desc': 'Built for Saudi enterprises',
    'whyChoose.cta': 'Join the Aliph Network',
    
    // Testimonials
    'testimonials.title': 'Trusted by Experts and Businesses Alike',
    'testimonials.quote': 'Aliph transformed our compliance workflow — what took weeks now takes days.',
    'testimonials.author': 'Compliance Director, Leading KSA Holding Company',
    'testimonials.subtitle': 'Built in collaboration with vetted Saudi GRC experts and aligned with national Vision 2030 goals — empowering businesses to achieve compliance with confidence.',
    
    // Final CTA
    'closing.title': 'Ready to Turn Compliance Into Your Competitive Advantage?',
    'closing.primaryCta': 'Start Free Now',
    'closing.secondaryCta': 'Talk to an Expert',
    'closing.tagline': 'No setup fees. No hidden retainers. Just clear results.',
    
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
    
    // Homepage Hero
    'hero.title': 'أول منصة استشارية مدعومة بالذكاء الاصطناعي للحوكمة والمخاطر والامتثال في السعودية',
    'hero.subtitle': 'تمكين الشركات السعودية من تبسيط الامتثال وإدارة المخاطر والتوافق مع رؤية 2030 — مدعوم بالذكاء الاصطناعي والخبرة البشرية.',
    'hero.primaryCta': 'استكشف المنصة',
    'hero.secondaryCta': 'انضم كشريك للمنشآت الصغيرة',
    'hero.stat1': 'تنفيذ أسرع 10 مرات',
    'hero.stat2': 'مدعوم من خبراء سعوديين',
    'hero.stat3': 'متوافق مع PDPL و ZATCA و SAMA',
    
    // Why Aliph Exists
    'whyAliph.title': 'الامتثال لا ينبغي أن يكون عبئًا — بل ميزتك التنافسية',
    'whyAliph.description': 'تواجه الشركات السعودية شبكة متطورة من التنظيمات — PDPL و ZATCA و MHRSD و NCA و SAMA — جميعها تتحول ضمن رؤية 2030. حلول أليف تجعل الامتثال بسيطًا وميسور التكلفة وذكيًا لكل مؤسسة، من المنشآت الصغيرة والمتوسطة سريعة النمو إلى الشركات المدرجة.',
    'whyAliph.highlight': 'مبني في السعودية. مصمم لرؤية 2030. موثق من خبراء GRC معتمدين.',
    
    // Three Tiers
    'tiers.title': 'كيف تعمل أليف — ثلاثة مستويات، تجربة واحدة سلسة',
    'tier1.title': 'الذكاء الذاتي',
    'tier1.description': 'احصل فورًا على أكثر من 1000 قالب وسياسة وأداة خاصة بالسعودية منسقة بواسطة عقل أليف.',
    'tier2.title': 'تخصيص خفيف', 
    'tier2.description': 'احصل على مراجعة وتنفيذ نهائي لمواد الامتثال الخاصة بك من خبراء سعوديين معتمدين — سريع ودقيق وجاهز للجهات التنظيمية.',
    'tier3.title': 'تخصيص مكثف (مهام صغيرة)',
    'tier3.description': 'أطلق مشاريع استشارية موجهة بالنتائج مع معالم ومخرجات متتبعة وإغلاق مضمون.',
    
    // Aliph Brain
    'brain.title': 'عقل أليف — محرك الذكاء السعودي',
    'brain.subtitle': 'تحويل التعقيد إلى وضوح — مدعوم بالقانون السعودي والبيانات والخبراء.',
    'brain.description': 'مدرب على آلاف الوثائق التنظيمية المحققة — PDPL و ZATCA و SAMA و MHRSD و CMA — ومدعوم من مستشارين سعوديين معتمدين، عقل أليف يفهم الامتثال مثل فريقك القانوني الداخلي.',
    'brain.point1': 'مجموعات بيانات سعودية أولاً من الجهات التنظيمية الوطنية.',
    'brain.point2': 'مكتبة معرفية موثقة من الخبراء.',
    'brain.point3': 'البيانات لا تغادر مؤسستك (آمنة حسب PDPL).',
    'brain.point4': 'تحديث مستمر من الحالات الاستشارية الفعلية.',
    'brain.cta': 'استكشف مكتبة المعرفة',
    
    // Knowledge Library
    'library.title': 'مكتبة المعرفة — الركائز السبع للامتثال',
    'library.subtitle': 'استكشف الأطر والقوالب المنسقة تحت الركائز السبع للمؤسسة السعودية:',
    'library.pillar1': 'الاستراتيجية المؤسسية والامتثال القانوني',
    'library.pillar2': 'المالية المؤسسية والضرائب (جاهز لـ ZATCA)',
    'library.pillar3': 'رأس المال البشري والامتثال للسعودة',
    'library.pillar4': 'التسويق والمبيعات وتجربة العملاء',
    'library.pillar5': 'التحول الرقمي والأمن السيبراني',
    'library.pillar6': 'فرص رؤية 2030 والمشاريع الضخمة',
    'library.pillar7': 'القيادة والتطوير المهني',
    'library.cta': 'تصفح الركائز',
    
    // Vision 2030
    'vision.title': 'التوافق مع رؤية 2030',
    'vision.description': 'كل سياسة وعملية ومنتج ضمن حلول أليف يدعم أجندة تحول المملكة.',
    'vision.point1': 'يتماشى مع البرامج الوطنية والمشاريع الضخمة',
    'vision.point2': 'يعزز الشفافية والتميز في الحوكمة',
    'vision.point3': 'يمكّن المنشآت الصغيرة والمتوسطة من تلبية متطلبات رؤية 2030',
    
    // Why Choose Aliph
    'whyChoose.title': 'لماذا تختار أليف',
    'whyChoose.subtitle': 'نجمع بين السرعة والثقة والخبرة المحلية — نعيد تعريف كيفية عمل الامتثال في السعودية.',
    'whyChoose.point1Title': 'هجين من الذكاء الاصطناعي والبشري',
    'whyChoose.point1Desc': 'الأتمتة تلتقي بالسياق',
    'whyChoose.point2Title': 'شبكة خبراء محليين',
    'whyChoose.point2Desc': 'متخصصون GRC موثقون',
    'whyChoose.point3Title': 'قوالب جاهزة',
    'whyChoose.point3Desc': 'جاهزة للتدقيق والإيداع',
    'whyChoose.point4Title': 'أسرع 10 مرات وأوفر 5 مرات',
    'whyChoose.point4Desc': 'من الاستشارات التقليدية',
    'whyChoose.point5Title': 'تركيز على رؤية 2030',
    'whyChoose.point5Desc': 'مبني للمؤسسات السعودية',
    'whyChoose.cta': 'انضم إلى شبكة أليف',
    
    // Testimonials
    'testimonials.title': 'موثوق به من قبل الخبراء والشركات على حد سواء',
    'testimonials.quote': 'حوّلت أليف سير عمل الامتثال لدينا — ما كان يستغرق أسابيع أصبح أيامًا.',
    'testimonials.author': 'مدير الامتثال، شركة قابضة رائدة في السعودية',
    'testimonials.subtitle': 'مبني بالتعاون مع خبراء GRC سعوديين موثقين ومتوافق مع أهداف رؤية 2030 الوطنية — لتمكين الشركات من تحقيق الامتثال بثقة.',
    
    // Final CTA
    'closing.title': 'هل أنت مستعد لتحويل الامتثال إلى ميزتك التنافسية؟',
    'closing.primaryCta': 'ابدأ مجانًا الآن',
    'closing.secondaryCta': 'تحدث إلى خبير',
    'closing.tagline': 'لا رسوم إعداد. لا عقود مخفية. فقط نتائج واضحة.',
    
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
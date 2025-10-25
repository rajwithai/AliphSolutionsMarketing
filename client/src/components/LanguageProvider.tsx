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
    'nav.businesses': 'Business Solutions',
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
    'tiers.intro': 'From instant AI guidance to expert-driven advisory projects, Aliph adapts to your compliance needs at every stage — all within a single, integrated platform.',
    'tier1.title': 'Self-Service Intelligence',
    'tier1.subtitle': 'AI-Assisted · Instant Access',
    'tier1.description': 'Access 1,000+ Saudi-specific templates, policies, and toolkits curated by the Aliph Brain — instantly.',
    'tier1.bestFor': 'Best for: teams starting their compliance journey or needing quick regulatory references.',
    'tier1.time': '< 15 min',
    'tier2.title': 'Light Customization', 
    'tier2.subtitle': 'Expert Reviewed · < 48 hours',
    'tier2.description': 'Get your materials reviewed, edited, and validated by certified Saudi GRC experts — fast, accurate, and ready for regulators.',
    'tier2.bestFor': 'Best for: businesses that already have drafts or AI-generated content needing human verification.',
    'tier2.time': '< 48 hours',
    'tier3.title': 'Heavy Customization',
    'tier3.subtitle': 'Full Service · 1–2 weeks',
    'tier3.description': 'Launch milestone-based micro-assignments with dedicated experts who manage deliverables end-to-end — agile, measurable, and guaranteed.',
    'tier3.bestFor': 'Best for: complex compliance challenges, policy frameworks, or internal audit set-ups.',
    'tier3.time': '1–2 weeks',
    'tiers.cta': 'Compare the Tiers',
    'tiers.progression': 'Seamless Progression Across All Tiers',
    
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
    
    // How It Works Page
    "howItWorks.hero.title": "From Instant Reports to Full Advisory Projects — Here's How Aliph Works",
    "howItWorks.hero.subtitle": "Whether you need a ready-to-use compliance report, expert review, or a complete advisory engagement — Aliph's AI-powered platform adapts to your needs.",
    "howItWorks.hero.tagline": "Three tiers. One seamless experience.",
    
    "howItWorks.tiers.title": "The Three Tiers",
    "howItWorks.tier1.kicker": "AI-Assisted · Instant Access",
    "howItWorks.tier1.title": "Self-Service Intelligence",
    "howItWorks.tier1.body": "Instantly access 1,000+ Saudi-specific templates, policies, and reports curated by the Aliph Brain. Generate ready-to-use outputs for internal reviews and compliance submissions — fast, accurate, and PDPL-safe.",
    "howItWorks.tier1.bestFor": "Best for: teams starting their compliance journey or needing quick regulatory references.",
    "howItWorks.tier1.time": "< 15 min",
    "howItWorks.tier2.kicker": "Human-Verified · 48 Hours",
    "howItWorks.tier2.title": "Expert Customization",
    "howItWorks.tier2.body": "Book a short session with certified Saudi GRC experts to validate or customize your AI-generated report. Receive regulator-ready documentation, reviewed and refined by specialists.",
    "howItWorks.tier2.bestFor": "Best for: businesses refining or verifying internal drafts.",
    "howItWorks.tier2.time": "< 48 hours",
    "howItWorks.tier3.kicker": "Full Service · 1–2 Weeks",
    "howItWorks.tier3.title": "Managed Advisory Projects",
    "howItWorks.tier3.body": "Launch milestone-based advisory micro-projects with vetted experts. Track deliverables, chat securely, and receive guaranteed outputs within your timeline.",
    "howItWorks.tier3.bestFor": "Best for: complex compliance frameworks or audit-ready documentation.",
    "howItWorks.tier3.time": "1–2 weeks",
    
    "howItWorks.deliverables.title": "What You'll Receive at Each Level",
    "howItWorks.deliverables.tier1": "Self-Service",
    "howItWorks.deliverables.tier1.items": "AI-generated report preview · Downloadable GRC templates · Reference documents · Free up to token limit",
    "howItWorks.deliverables.tier2": "Expert Customization",
    "howItWorks.deliverables.tier2.items": "30-60 min consultation · Document review workspace · SME change log · Validated final report",
    "howItWorks.deliverables.tier3": "Managed Advisory",
    "howItWorks.deliverables.tier3.items": "Milestone tracking · Deliverable uploads/reviews · Outcome-based pricing · Full-time SME access",
    
    "howItWorks.synergy.title": "The Power of AI Meets Human Expertise",
    "howItWorks.synergy.body": "Every response from Aliph Brain is built on a verified, Saudi-specific knowledge base — PDPL, ZATCA, SAMA, MHRSD, and more. When automation reaches its limit, certified SMEs step in to finalize your documents, ensuring real-world compliance and accuracy.",
    "howItWorks.synergy.tagline": "Automation for speed. Experts for certainty.",
    
    "howItWorks.useCase.title": "Example: Generating a PDPL Compliance Report",
    "howItWorks.useCase.step1.title": "Self-Service",
    "howItWorks.useCase.step1.desc": "AI drafts PDPL checklist and privacy policy.",
    "howItWorks.useCase.step2.title": "Light Customization",
    "howItWorks.useCase.step2.desc": "SME reviews and adjusts for your industry.",
    "howItWorks.useCase.step3.title": "Advisory",
    "howItWorks.useCase.step3.desc": "Full Data Protection Framework built with deliverables and audit prep milestones.",
    
    "howItWorks.cta.title": "Start Your Advisory Journey with Aliph",
    "howItWorks.cta.subtitle": "Choose your path — instant AI report, quick expert validation, or full project delivery. Whatever your goal, Aliph simplifies the road to compliance.",
    "howItWorks.cta.primaryBtn": "Start Now",
    "howItWorks.cta.secondaryBtn": "Talk to an Expert",
    
    // Business Solutions Page
    "businessSolutions.hero.title": "The GRC Platform for Saudi Businesses",
    "businessSolutions.hero.subtitle": "Automate, customize, and manage your compliance journey with AI-guided documentation, expert insights, and verified regulatory templates — all in one platform.",
    "businessSolutions.hero.primaryCta": "Explore the Platform →",
    "businessSolutions.hero.secondaryCta": "Request Enterprise Demo",
    
    "businessSolutions.capabilities.title": "Built for Every Stage of Your GRC Maturity",
    "businessSolutions.capabilities.subtitle": "From quick AI-generated reports to expert-led projects — Aliph adapts to your organization's compliance needs.",
    "businessSolutions.capability1.title": "AI-Generated GRC Documents",
    "businessSolutions.capability1.desc": "Instantly create audit-ready reports, checklists, and frameworks aligned with Saudi regulations.",
    "businessSolutions.capability2.title": "Access the GRC Knowledge Library",
    "businessSolutions.capability2.desc": "Explore 1,000+ verified templates and policies across industries.",
    "businessSolutions.capability3.title": "SME-Guided Customization",
    "businessSolutions.capability3.desc": "Book certified Saudi experts to review or refine your AI-generated reports.",
    "businessSolutions.capability4.title": "AI-GRC Companion",
    "businessSolutions.capability4.desc": "Let Aliph's embedded AI explain, guide, and monitor your compliance progress.",
    
    "businessSolutions.industries.title": "Tailored for Regulated Saudi Sectors",
    "businessSolutions.industries.subtitle": "Aliph serves highly regulated sectors with localized compliance frameworks and pre-built templates.",
    "businessSolutions.industry1.name": "Finance & Banking",
    "businessSolutions.industry1.desc": "PDPL-ready customer data templates.",
    "businessSolutions.industry2.name": "Energy & Petrochemicals",
    "businessSolutions.industry2.desc": "Sustainability & risk frameworks.",
    "businessSolutions.industry3.name": "Retail & Services",
    "businessSolutions.industry3.desc": "Supplier compliance automation.",
    "businessSolutions.industry4.name": "Healthcare & Education",
    "businessSolutions.industry4.desc": "Audit reports & policy libraries.",
    "businessSolutions.industry5.name": "Technology & Telecom",
    "businessSolutions.industry5.desc": "Data governance & cybersecurity docs.",
    "businessSolutions.industry6.name": "Construction & Real Estate",
    "businessSolutions.industry6.desc": "Safety and governance compliance packs.",
    
    "businessSolutions.flow.title": "How Businesses Use Aliph",
    "businessSolutions.flow.step1.title": "Start with AI",
    "businessSolutions.flow.step1.desc": "Generate or audit GRC documents using the Aliph Brain.",
    "businessSolutions.flow.step2.title": "Customize with Experts",
    "businessSolutions.flow.step2.desc": "Get validation from certified Saudi SMEs for regulator-ready precision.",
    "businessSolutions.flow.step3.title": "Scale with Projects",
    "businessSolutions.flow.step3.desc": "Launch advisory micro-projects directly within the platform.",
    "businessSolutions.flow.step4.title": "Stay Continuously Compliant",
    "businessSolutions.flow.step4.desc": "Receive automated updates and AI alerts for new regulations.",
    
    "businessSolutions.benefits.title": "Smarter, Faster, Compliant — The Aliph Advantage",
    "businessSolutions.benefit1.title": "70% Faster Documentation",
    "businessSolutions.benefit1.desc": "AI drafting + human verification.",
    "businessSolutions.benefit2.title": "Lower Advisory Costs",
    "businessSolutions.benefit2.desc": "Use AI first, experts only as needed.",
    "businessSolutions.benefit3.title": "Retain Institutional Knowledge",
    "businessSolutions.benefit3.desc": "Centralized updates & templates.",
    "businessSolutions.benefit4.title": "PDPL & ZATCA Ready",
    "businessSolutions.benefit4.desc": "Always aligned with Saudi regulations.",
    "businessSolutions.benefit5.title": "Measurable Risk Reduction",
    "businessSolutions.benefit5.desc": "Real-time AI dashboard insights.",
    
    "businessSolutions.socialProof.title": "Trusted by Saudi Experts and Early Enterprise Partners",
    "businessSolutions.socialProof.body": "Over 100 certified SMEs and early enterprise users rely on Aliph for their governance, risk, and compliance automation.",
    
    "businessSolutions.cta.title": "Ready to Modernize Your GRC Process?",
    "businessSolutions.cta.subtitle": "Experience how AI and experts can transform your governance and compliance journey.",
    "businessSolutions.cta.primaryBtn": "Book a Demo →",
    "businessSolutions.cta.secondaryBtn": "Start with Free AI Report",
    
    // Common
    'common.seeHowItWorks': 'See How It Works',
    'common.exploreTiers': 'Explore the Tiers',
    'common.meetExperts': 'Meet Our Experts',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.howItWorks': 'كيف نعمل',
    'nav.businesses': 'حلول الأعمال',
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
    'tiers.intro': 'من التوجيه الفوري بالذكاء الاصطناعي إلى المشاريع الاستشارية الموجهة من الخبراء، تتكيف أليف مع احتياجات الامتثال الخاصة بك في كل مرحلة — كل ذلك ضمن منصة واحدة متكاملة.',
    'tier1.title': 'الذكاء الذاتي',
    'tier1.subtitle': 'مدعوم بالذكاء الاصطناعي · وصول فوري',
    'tier1.description': 'احصل على أكثر من 1000 قالب وسياسة وأداة خاصة بالسعودية منسقة بواسطة عقل أليف — فورًا.',
    'tier1.bestFor': 'الأفضل لـ: الفرق التي تبدأ رحلة الامتثال أو تحتاج إلى مراجع تنظيمية سريعة.',
    'tier1.time': 'أقل من 15 دقيقة',
    'tier2.title': 'تخصيص خفيف', 
    'tier2.subtitle': 'مراجعة من الخبراء · أقل من 48 ساعة',
    'tier2.description': 'احصل على مراجعة وتحرير والتحقق من موادك من خبراء GRC سعوديين معتمدين — سريع ودقيق وجاهز للجهات التنظيمية.',
    'tier2.bestFor': 'الأفضل لـ: الشركات التي لديها مسودات أو محتوى ناتج عن الذكاء الاصطناعي يحتاج إلى تحقق بشري.',
    'tier2.time': 'أقل من 48 ساعة',
    'tier3.title': 'تخصيص مكثف',
    'tier3.subtitle': 'خدمة شاملة · 1–2 أسابيع',
    'tier3.description': 'أطلق مهام صغيرة قائمة على المعالم مع خبراء مخصصين يديرون المخرجات من البداية إلى النهاية — سريع، قابل للقياس، ومضمون.',
    'tier3.bestFor': 'الأفضل لـ: تحديات الامتثال المعقدة، أطر السياسات، أو إعدادات التدقيق الداخلي.',
    'tier3.time': '1–2 أسابيع',
    'tiers.cta': 'قارن بين المستويات',
    'tiers.progression': 'تقدم سلس عبر جميع المستويات',
    
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
    
    // How It Works Page
    "howItWorks.hero.title": "من التقارير الفورية إلى المشاريع الاستشارية الكاملة — إليك كيف تعمل أليف",
    "howItWorks.hero.subtitle": "سواء كنت بحاجة إلى تقرير امتثال جاهز للاستخدام، أو مراجعة من خبير، أو مشاركة استشارية كاملة — منصة أليف المدعومة بالذكاء الاصطناعي تتكيف مع احتياجاتك.",
    "howItWorks.hero.tagline": "ثلاثة مستويات. تجربة واحدة سلسة.",
    
    "howItWorks.tiers.title": "المستويات الثلاثة",
    "howItWorks.tier1.kicker": "مدعوم بالذكاء الاصطناعي · وصول فوري",
    "howItWorks.tier1.title": "الذكاء الذاتي",
    "howItWorks.tier1.body": "احصل فورًا على أكثر من 1000 قالب وسياسة وتقرير خاص بالسعودية منسق بواسطة عقل أليف. أنشئ مخرجات جاهزة للاستخدام للمراجعات الداخلية وتقديمات الامتثال — سريع ودقيق وآمن حسب PDPL.",
    "howItWorks.tier1.bestFor": "الأفضل لـ: الفرق التي تبدأ رحلة الامتثال أو تحتاج إلى مراجع تنظيمية سريعة.",
    "howItWorks.tier1.time": "أقل من 15 دقيقة",
    "howItWorks.tier2.kicker": "موثق من البشر · 48 ساعة",
    "howItWorks.tier2.title": "التخصيص من الخبراء",
    "howItWorks.tier2.body": "احجز جلسة قصيرة مع خبراء GRC سعوديين معتمدين للتحقق من أو تخصيص تقريرك الناتج عن الذكاء الاصطناعي. احصل على وثائق جاهزة للجهات التنظيمية، تمت مراجعتها وتحسينها من قبل المتخصصين.",
    "howItWorks.tier2.bestFor": "الأفضل لـ: الشركات التي تحسّن أو تتحقق من المسودات الداخلية.",
    "howItWorks.tier2.time": "أقل من 48 ساعة",
    "howItWorks.tier3.kicker": "خدمة شاملة · 1–2 أسابيع",
    "howItWorks.tier3.title": "المشاريع الاستشارية المدارة",
    "howItWorks.tier3.body": "أطلق مشاريع استشارية صغيرة قائمة على المعالم مع خبراء موثقين. تتبع المخرجات، تواصل بشكل آمن، واحصل على نتائج مضمونة ضمن الجدول الزمني الخاص بك.",
    "howItWorks.tier3.bestFor": "الأفضل لـ: أطر الامتثال المعقدة أو الوثائق الجاهزة للتدقيق.",
    "howItWorks.tier3.time": "1–2 أسابيع",
    
    "howItWorks.deliverables.title": "ما ستحصل عليه في كل مستوى",
    "howItWorks.deliverables.tier1": "الخدمة الذاتية",
    "howItWorks.deliverables.tier1.items": "معاينة تقرير ناتج عن الذكاء الاصطناعي · قوالب GRC قابلة للتنزيل · وثائق مرجعية · مجاني حتى حد الرموز",
    "howItWorks.deliverables.tier2": "التخصيص من الخبراء",
    "howItWorks.deliverables.tier2.items": "استشارة 30-60 دقيقة · مساحة عمل لمراجعة الوثائق · سجل تغييرات SME · تقرير نهائي موثق",
    "howItWorks.deliverables.tier3": "الاستشارات المدارة",
    "howItWorks.deliverables.tier3.items": "تتبع المعالم · تحميلات/مراجعات المخرجات · تسعير قائم على النتائج · وصول كامل لـ SME",
    
    "howItWorks.synergy.title": "قوة الذكاء الاصطناعي تلتقي بالخبرة البشرية",
    "howItWorks.synergy.body": "كل استجابة من عقل أليف مبنية على قاعدة معرفية موثقة وخاصة بالسعودية — PDPL و ZATCA و SAMA و MHRSD والمزيد. عندما يصل الأتمتة إلى حدها، يتدخل المتخصصون المعتمدون لإنهاء مستنداتك، مما يضمن الامتثال الفعلي والدقة.",
    "howItWorks.synergy.tagline": "الأتمتة للسرعة. الخبراء لليقين.",
    
    "howItWorks.useCase.title": "مثال: إنشاء تقرير امتثال PDPL",
    "howItWorks.useCase.step1.title": "الخدمة الذاتية",
    "howItWorks.useCase.step1.desc": "الذكاء الاصطناعي يصيغ قائمة تحقق PDPL وسياسة الخصوصية.",
    "howItWorks.useCase.step2.title": "التخصيص الخفيف",
    "howItWorks.useCase.step2.desc": "SME يراجع ويعدّل حسب صناعتك.",
    "howItWorks.useCase.step3.title": "الاستشارات",
    "howItWorks.useCase.step3.desc": "إطار حماية البيانات الكامل مبني مع المخرجات ومعالم إعداد التدقيق.",
    
    "howItWorks.cta.title": "ابدأ رحلتك الاستشارية مع أليف",
    "howItWorks.cta.subtitle": "اختر مسارك — تقرير ذكاء اصطناعي فوري، أو التحقق السريع من الخبراء، أو التسليم الكامل للمشروع. مهما كان هدفك، أليف تبسط الطريق إلى الامتثال.",
    "howItWorks.cta.primaryBtn": "ابدأ الآن",
    "howItWorks.cta.secondaryBtn": "تحدث إلى خبير",
    
    // Business Solutions Page
    "businessSolutions.hero.title": "منصة الحوكمة للشركات السعودية",
    "businessSolutions.hero.subtitle": "أتمتة وتخصيص وإدارة رحلة الامتثال الخاصة بك مع وثائق موجهة بالذكاء الاصطناعي، ورؤى الخبراء، وقوالب تنظيمية موثقة — كل ذلك في منصة واحدة.",
    "businessSolutions.hero.primaryCta": "استكشف المنصة ←",
    "businessSolutions.hero.secondaryCta": "اطلب عرض توضيحي للمؤسسات",
    
    "businessSolutions.capabilities.title": "مصممة لكل مرحلة من نضج GRC الخاص بك",
    "businessSolutions.capabilities.subtitle": "من التقارير السريعة الناتجة عن الذكاء الاصطناعي إلى المشاريع التي يقودها الخبراء — أليف تتكيف مع احتياجات الامتثال لمؤسستك.",
    "businessSolutions.capability1.title": "وثائق GRC ناتجة عن الذكاء الاصطناعي",
    "businessSolutions.capability1.desc": "أنشئ فورًا تقارير جاهزة للتدقيق وقوائم التحقق والأطر المتوافقة مع التنظيمات السعودية.",
    "businessSolutions.capability2.title": "الوصول إلى مكتبة المعرفة GRC",
    "businessSolutions.capability2.desc": "استكشف أكثر من 1000 قالب وسياسة موثقة عبر الصناعات.",
    "businessSolutions.capability3.title": "تخصيص موجه من SME",
    "businessSolutions.capability3.desc": "احجز خبراء سعوديين معتمدين لمراجعة أو تحسين تقاريرك الناتجة عن الذكاء الاصطناعي.",
    "businessSolutions.capability4.title": "رفيق AI-GRC",
    "businessSolutions.capability4.desc": "دع الذكاء الاصطناعي المدمج في أليف يشرح ويوجه ويراقب تقدم الامتثال الخاص بك.",
    
    "businessSolutions.industries.title": "مصممة للقطاعات السعودية المنظمة",
    "businessSolutions.industries.subtitle": "تخدم أليف القطاعات شديدة التنظيم مع أطر امتثال محلية وقوالب مسبقة البناء.",
    "businessSolutions.industry1.name": "المالية والبنوك",
    "businessSolutions.industry1.desc": "قوالب بيانات العملاء الجاهزة لـ PDPL.",
    "businessSolutions.industry2.name": "الطاقة والبتروكيماويات",
    "businessSolutions.industry2.desc": "أطر الاستدامة والمخاطر.",
    "businessSolutions.industry3.name": "التجزئة والخدمات",
    "businessSolutions.industry3.desc": "أتمتة امتثال الموردين.",
    "businessSolutions.industry4.name": "الرعاية الصحية والتعليم",
    "businessSolutions.industry4.desc": "تقارير التدقيق ومكتبات السياسات.",
    "businessSolutions.industry5.name": "التكنولوجيا والاتصالات",
    "businessSolutions.industry5.desc": "حوكمة البيانات ووثائق الأمن السيبراني.",
    "businessSolutions.industry6.name": "البناء والعقارات",
    "businessSolutions.industry6.desc": "حزم امتثال السلامة والحوكمة.",
    
    "businessSolutions.flow.title": "كيف تستخدم الشركات أليف",
    "businessSolutions.flow.step1.title": "ابدأ بالذكاء الاصطناعي",
    "businessSolutions.flow.step1.desc": "أنشئ أو راجع وثائق GRC باستخدام عقل أليف.",
    "businessSolutions.flow.step2.title": "تخصيص مع الخبراء",
    "businessSolutions.flow.step2.desc": "احصل على التحقق من SME سعوديين معتمدين للدقة الجاهزة للجهات التنظيمية.",
    "businessSolutions.flow.step3.title": "توسع مع المشاريع",
    "businessSolutions.flow.step3.desc": "أطلق مشاريع استشارية صغيرة مباشرة داخل المنصة.",
    "businessSolutions.flow.step4.title": "ابق متوافقًا باستمرار",
    "businessSolutions.flow.step4.desc": "احصل على تحديثات تلقائية وتنبيهات ذكاء اصطناعي للتنظيمات الجديدة.",
    
    "businessSolutions.benefits.title": "أذكى وأسرع ومتوافق — ميزة أليف",
    "businessSolutions.benefit1.title": "توثيق أسرع بنسبة 70٪",
    "businessSolutions.benefit1.desc": "صياغة بالذكاء الاصطناعي + التحقق البشري.",
    "businessSolutions.benefit2.title": "تكاليف استشارية أقل",
    "businessSolutions.benefit2.desc": "استخدم الذكاء الاصطناعي أولاً، الخبراء فقط عند الحاجة.",
    "businessSolutions.benefit3.title": "الاحتفاظ بالمعرفة المؤسسية",
    "businessSolutions.benefit3.desc": "تحديثات وقوالب مركزية.",
    "businessSolutions.benefit4.title": "جاهز لـ PDPL و ZATCA",
    "businessSolutions.benefit4.desc": "دائمًا متوافق مع التنظيمات السعودية.",
    "businessSolutions.benefit5.title": "تقليل المخاطر القابل للقياس",
    "businessSolutions.benefit5.desc": "رؤى لوحة تحكم الذكاء الاصطناعي في الوقت الفعلي.",
    
    "businessSolutions.socialProof.title": "موثوق به من قبل الخبراء السعوديين والشركاء المؤسسيين الأوائل",
    "businessSolutions.socialProof.body": "أكثر من 100 SME معتمد ومستخدمين مؤسسيين أوائل يعتمدون على أليف لأتمتة الحوكمة والمخاطر والامتثال.",
    
    "businessSolutions.cta.title": "هل أنت مستعد لتحديث عملية GRC الخاصة بك؟",
    "businessSolutions.cta.subtitle": "اختبر كيف يمكن للذكاء الاصطناعي والخبراء تحويل رحلة الحوكمة والامتثال الخاصة بك.",
    "businessSolutions.cta.primaryBtn": "احجز عرضًا توضيحيًا ←",
    "businessSolutions.cta.secondaryBtn": "ابدأ بتقرير ذكاء اصطناعي مجاني",
    
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
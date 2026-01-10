import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import logoImage from '@assets/aliphsol_1758205546494.png';
import RequestModal from './RequestModal';

// Navigation configuration
const navigationConfig = {
  solutions: {
    label: 'Solutions',
    type: 'mega',
    columns: [
      {
        title: 'Advisory',
        items: [
          { label: 'Advisory Hub', href: '/advisory', description: 'GRC readiness and transformation' },
          { label: 'Governance', href: '/advisory/governance', description: 'Board structures and delegation' },
          { label: 'Risk', href: '/advisory/risk', description: 'ERM and risk appetite frameworks' },
          { label: 'Compliance', href: '/advisory/compliance', description: 'PDPL, NCA ECC, ZATCA readiness' },
          { label: 'Internal Audit', href: '/advisory/internal-audit', description: 'Audit function setup and planning' },
        ],
      },
      {
        title: 'Managed Services',
        items: [
          { label: 'Managed Services Hub', href: '/managed-services', description: 'Recurring operational delivery' },
          { label: 'GRC Support Center', href: '/managed-services/grc-support-center', description: 'Continuous compliance operations' },
          { label: 'ZATCA Operations', href: '/managed-services/tax-vat-zatca-operations', description: 'Tax and e-invoicing support' },
          { label: 'Vendor Management', href: '/managed-services/vendor-management', description: 'Third-party risk oversight' },
          { label: 'Build–Operate–Transfer', href: '/managed-services/build-operate-transfer', description: 'Transition to internal teams' },
        ],
      },
    ],
  },
  industries: {
    label: 'Industries',
    type: 'simple',
    href: '/industries',
  },
  resources: {
    label: 'Resources',
    type: 'simple',
    href: '/resources',
  },
  technology: {
    label: 'Technology',
    type: 'mega',
    columns: [
      {
        title: 'Platform',
        items: [
          { label: 'Aliph Brain', href: '/technology/aliph-brain', description: 'Governed AI workflows and knowledge' },
          { label: 'Security & Sovereignty', href: '/technology/security-sovereignty', description: 'Data control and auditability' },
          { label: 'AI Governance', href: '/technology/ai-governance', description: 'Governed AI adoption framework' },
        ],
      },
      {
        title: 'Execution',
        items: [
          { label: 'GRC Automation', href: '/technology/grc-automation-workflows', description: 'Repeatable delivery workflows' },
          { label: 'Integrations', href: '/technology/integrations', description: 'Fit-to-environment patterns' },
        ],
      },
    ],
    footer: {
      text: 'Prefer proof first?',
      linkText: 'View Sample Deliverables',
      href: '/deliverables',
    },
  },
  company: {
    label: 'Company',
    type: 'dropdown',
    items: [
      { label: 'About', href: '/company/about' },
      { label: 'Leadership', href: '/company/leadership' },
      { label: 'Partners', href: '/company/partners' },
      { label: 'Careers', href: '/company/careers' },
      { label: 'Contact', href: '/company/contact' },
    ],
  },
  investors: {
    label: 'Investors',
    type: 'simple',
    href: '/investors',
  },
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuKey: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenMegaMenu(menuKey);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMegaMenu(null);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpenMegaMenu(null);
    }
  };

  return (
    <>
      <RequestModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} type="demo" />
      
      <header 
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-200 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-200 ${
            scrolled ? 'h-16' : 'h-18'
          }`}>
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center">
                <img
                  src={logoImage}
                  alt="Aliph Solutions"
                  className="h-11 w-auto"
                />
              </a>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" onKeyDown={handleKeyDown}>
              {/* Solutions Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-sm font-medium text-gray-700 hover:text-[#C9A227] transition-colors flex items-center gap-1 py-2">
                  Solutions
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                
                {openMegaMenu === 'solutions' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white border border-gray-200 rounded-xl shadow-xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-8">
                      {navigationConfig.solutions.columns.map((column, idx) => (
                        <div key={idx}>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            {column.title}
                          </h3>
                          <div className="space-y-1">
                            {column.items.map((item) => (
                              <Link key={item.href} href={item.href}>
                                <a 
                                  className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                                  onClick={() => setOpenMegaMenu(null)}
                                >
                                  <div className="text-sm font-medium text-gray-900 group-hover:text-[#C9A227] transition-colors">
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {item.description}
                                  </div>
                                </a>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Industries */}
              <Link href="/industries">
                <a className={`text-sm font-medium transition-colors py-2 ${
                  location === '/industries' ? 'text-[#C9A227]' : 'text-gray-700 hover:text-[#C9A227]'
                }`}>
                  Industries
                </a>
              </Link>

              {/* Resources */}
              <Link href="/resources">
                <a className={`text-sm font-medium transition-colors py-2 ${
                  location === '/resources' ? 'text-[#C9A227]' : 'text-gray-700 hover:text-[#C9A227]'
                }`}>
                  Resources
                </a>
              </Link>

              {/* Technology Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('technology')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-sm font-medium text-gray-700 hover:text-[#C9A227] transition-colors flex items-center gap-1 py-2">
                  Technology
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                
                {openMegaMenu === 'technology' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white border border-gray-200 rounded-xl shadow-xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-8 mb-6">
                      {navigationConfig.technology.columns.map((column, idx) => (
                        <div key={idx}>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            {column.title}
                          </h3>
                          <div className="space-y-1">
                            {column.items.map((item) => (
                              <Link key={item.href} href={item.href}>
                                <a 
                                  className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                                  onClick={() => setOpenMegaMenu(null)}
                                >
                                  <div className="text-sm font-medium text-gray-900 group-hover:text-[#C9A227] transition-colors">
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {item.description}
                                  </div>
                                </a>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Footer CTA */}
                    <div className="pt-4 border-t border-gray-200">
                      <Link href={navigationConfig.technology.footer!.href}>
                        <a 
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors group"
                          onClick={() => setOpenMegaMenu(null)}
                        >
                          <div>
                            <div className="text-xs text-gray-600">{navigationConfig.technology.footer!.text}</div>
                            <div className="text-sm font-medium text-[#C9A227]">{navigationConfig.technology.footer!.linkText}</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-sm font-medium text-gray-700 hover:text-[#C9A227] transition-colors flex items-center gap-1 py-2">
                  Company
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                
                {openMegaMenu === 'company' && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {navigationConfig.company.items.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <a 
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-[#C9A227] hover:bg-gray-50 transition-colors"
                          onClick={() => setOpenMegaMenu(null)}
                        >
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Investors */}
              <Link href="/investors">
                <a className={`text-sm font-medium transition-colors py-2 ${
                  location === '/investors' ? 'text-[#C9A227]' : 'text-gray-700 hover:text-[#C9A227]'
                }`}>
                  Investors
                </a>
              </Link>
            </nav>
            
            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="/deliverables"
                className="text-sm font-medium text-gray-700 hover:text-[#C9A227] transition-colors"
              >
                Sample Deliverables
              </a>
              <Button 
                size="sm"
                onClick={() => setDemoModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D] text-white px-5"
              >
                Request Demo
              </Button>
            </div>
          
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <Accordion type="single" collapsible className="space-y-2">
                {/* Solutions */}
                <AccordionItem value="solutions" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Solutions
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    {navigationConfig.solutions.columns.map((column, idx) => (
                      <div key={idx}>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">{column.title}</div>
                        {column.items.map((item) => (
                          <Link key={item.href} href={item.href}>
                            <a 
                              className="block py-2 text-sm text-gray-700"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </a>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Industries */}
                <Link href="/industries">
                  <a 
                    className="block px-4 py-3 text-sm font-medium text-gray-700 border rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Industries
                  </a>
                </Link>

                {/* Resources */}
                <Link href="/resources">
                  <a 
                    className="block px-4 py-3 text-sm font-medium text-gray-700 border rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                  </a>
                </Link>

                {/* Technology */}
                <AccordionItem value="technology" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Technology
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    {navigationConfig.technology.columns.map((column, idx) => (
                      <div key={idx}>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">{column.title}</div>
                        {column.items.map((item) => (
                          <Link key={item.href} href={item.href}>
                            <a 
                              className="block py-2 text-sm text-gray-700"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </a>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Company */}
                <AccordionItem value="company" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Company
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    {navigationConfig.company.items.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <a 
                          className="block py-2 text-sm text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Investors */}
                <Link href="/investors">
                  <a 
                    className="block px-4 py-3 text-sm font-medium text-gray-700 border rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Investors
                  </a>
                </Link>
              </Accordion>

              {/* Mobile CTAs */}
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D] text-white"
                  onClick={() => { setDemoModalOpen(true); setMobileMenuOpen(false); }}
                >
                  Request Demo
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => { window.location.href = '/deliverables'; setMobileMenuOpen(false); }}
                >
                  Sample Deliverables
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

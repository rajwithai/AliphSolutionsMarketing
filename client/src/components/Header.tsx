import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import logoImage from '@assets/aliph-logo-new.png';
import RequestModal from './RequestModal';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';




export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [location] = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navigation = [
    { label: t('header.home'), href: '/' },
    { label: t('header.advisory'), href: '/advisory' },
    { label: t('header.managedServices'), href: '/managed-services' },
  ];

  const technologyLinks = [
    { label: t('header.securitySovereignty'), href: '/technology/security-sovereignty' },
    { label: t('header.aliphBrain'), href: '/technology/aliph-brain' },
    { label: t('header.aiGovernance'), href: '/technology/ai-governance' },
    { label: t('header.grcAutomation'), href: '/technology/grc-automation-workflows' },
    { label: t('header.integrations'), href: '/technology/integrations' },
  ];

  const companyLinks = [
    { label: t('header.about'), href: '/company/about' },
    { label: t('header.leadership'), href: '/company/leadership' },
    { label: t('header.contact'), href: '/company/contact' },
  ];

  return (
    <>
      <RequestModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} type="demo" />

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <img
                src={logoImage}
                alt="Aliph Solutions"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`text-sm font-medium transition-colors hover:text-primary ${location === item.href ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                    {item.label}
                  </span>
                </Link>
              ))}

              {/* Technology Dropdown */}
              <div className="relative group">
                <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  {t('header.technology')}
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {technologyLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div className="px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Company Dropdown */}
              <div className="relative group">
                <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  {t('header.company')}
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {companyLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div className="px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/investors">
                <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {t('header.investors')}
                </span>
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {i18n.language === 'en' ? 'العربية' : 'English'}
              </Button>
              <Button
                size="sm"
                onClick={() => setDemoModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D] text-white"
              >
                {t('header.requestDemo')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t">
              <div className="space-y-1 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-muted ${location === item.href ? 'text-primary bg-muted' : 'text-muted-foreground'
                      }`}>
                      {item.label}
                    </div>
                  </Link>
                ))}

                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">{t('header.technology')}</div>
                {technologyLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className="block px-6 py-2 text-sm text-muted-foreground hover:bg-muted">
                      {link.label}
                    </div>
                  </Link>
                ))}

                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">{t('header.company')}</div>
                {companyLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className="block px-6 py-2 text-sm text-muted-foreground hover:bg-muted">
                      {link.label}
                    </div>
                  </Link>
                ))}

                <Link href="/investors" onClick={() => setMobileMenuOpen(false)}>
                  <div className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    {t('header.investors')}
                  </div>
                </Link>

                <div className="px-4 pt-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                  </Button>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => { setDemoModalOpen(true); setMobileMenuOpen(false); }}
                  >
                    {t('header.requestDemo')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

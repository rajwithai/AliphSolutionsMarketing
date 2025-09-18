import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { Link, useLocation } from 'wouter';
import logoImage from '@assets/Untitled design (21)_1758192863999.png';

const navigation = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.howItWorks', href: '/how-it-works' },
  { key: 'nav.businesses', href: '/businesses' },
  { key: 'nav.experts', href: '/experts' },
  { key: 'nav.grc', href: '/grc-solutions' },
  { key: 'nav.pricing', href: '/pricing' },
  { key: 'nav.blog', href: '/blog' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [location] = useLocation();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <img
              src={logoImage}
              alt={language === 'ar' ? 'حلول أليف - الشعار' : 'Aliph Solutions - Logo'}
              className="h-8 w-auto"
              data-testid="img-logo"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link 
                key={item.key}
                href={item.href}
                data-testid={`link-${item.key.split('.')[1]}`}
              >
                <span className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {t(item.key)}
                </span>
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              data-testid="button-language-toggle"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </Button>
            <Button variant="ghost" size="sm" data-testid="button-login">
              {t('nav.login')}
            </Button>
            <Button size="sm" data-testid="button-signup">
              {t('nav.signUp')}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              data-testid="button-mobile-language"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden" data-testid="mobile-menu">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link 
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.key.split('.')[1]}`}
                >
                  <div className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-muted rounded-md ${
                    location === item.href ? 'text-primary bg-muted' : 'text-muted-foreground'
                  }`}>
                    {t(item.key)}
                  </div>
                </Link>
              ))}
              <div className="flex gap-2 px-3 pt-2">
                <Button variant="ghost" size="sm" className="flex-1" data-testid="mobile-button-login">
                  {t('nav.login')}
                </Button>
                <Button size="sm" className="flex-1" data-testid="mobile-button-signup">
                  {t('nav.signUp')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'wouter';
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

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Managed Services', href: '/managed-services' },
];

const technologyLinks = [
  { label: 'Security & Sovereignty', href: '/technology/security-sovereignty' },
  { label: 'Aliph Brain', href: '/technology/aliph-brain' },
  { label: 'AI Governance', href: '/technology/ai-governance' },
  { label: 'GRC Automation', href: '/technology/grc-automation-workflows' },
  { label: 'Integrations', href: '/technology/integrations' },
];

const companyLinks = [
  { label: 'About', href: '/company/about' },
  { label: 'Leadership', href: '/company/leadership' },
  // { label: 'Partners', href: '/company/partners' },
  // { label: 'Careers', href: '/company/careers' },
  { label: 'Contact', href: '/company/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [location] = useLocation();

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
                  Technology
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
                  Company
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
                  Investors
                </span>
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                size="sm"
                onClick={() => setDemoModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D] text-white"
              >
                Request Demo
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

                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Technology</div>
                {technologyLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className="block px-6 py-2 text-sm text-muted-foreground hover:bg-muted">
                      {link.label}
                    </div>
                  </Link>
                ))}

                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Company</div>
                {companyLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className="block px-6 py-2 text-sm text-muted-foreground hover:bg-muted">
                      {link.label}
                    </div>
                  </Link>
                ))}

                <Link href="/investors" onClick={() => setMobileMenuOpen(false)}>
                  <div className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    Investors
                  </div>
                </Link>

                <div className="px-4 pt-4 space-y-2">
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => { setDemoModalOpen(true); setMobileMenuOpen(false); }}
                  >
                    Request Demo
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

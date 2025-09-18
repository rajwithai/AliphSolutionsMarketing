import { useLanguage } from './LanguageProvider';
import { Link } from 'wouter';
import { Separator } from '@/components/ui/separator';
import logoImage from '@assets/aliphsol_1758205546494.png';

const footerSections = {
  product: {
    title: 'Product',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'GRC Solutions', href: '/grc-solutions' },
      { label: 'Blog', href: '/blog' }
    ]
  },
  company: {
    title: 'Company', 
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'For Experts', href: '/experts' },
      { label: 'Careers', href: '/careers' }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'API Documentation', href: '/docs' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' }
    ]
  },
  contact: {
    title: 'Contact',
    links: [
      { label: 'support@aliph.sa', href: 'mailto:support@aliph.sa' },
      { label: '+966 11 123 4567', href: 'tel:+966111234567' },
      { label: 'Riyadh, Saudi Arabia', href: '#' }
    ]
  }
};

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" data-testid="footer-logo">
              <img
                src={logoImage}
                alt={language === 'ar' ? 'حلول أليف - الشعار' : 'Aliph Solutions - Logo'}
                className="h-8 w-auto"
                data-testid="img-footer-logo"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Elite advisory expertise reimagined for Saudi Arabia's growing businesses.
            </p>
          </div>
          
          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.href.startsWith('http') || link.href.startsWith('mailto') || link.href.startsWith('tel') ? (
                      <a 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        data-testid={`footer-link-${key}-${index}`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} data-testid={`footer-link-${key}-${index}`}>
                        <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Aliph Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">Made in Saudi Arabia 🇸🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { useLocation } from 'wouter';
import { ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  'AI-enhanced expert matching',
  'Saudi-specific regulatory templates', 
  'Fixed pricing with no surprises',
  '24-72 hour expert reviews'
];

export default function CTASection() {
  const { t, isRTL } = useLanguage();
  const [, setLocation] = useLocation();
  
  const handleGetSolution = () => {
    setLocation('/contact');
  };
  
  return (
    <section className="py-16 sm:py-24 bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-primary/10 rounded-2xl p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('closing.title')}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Join Saudi businesses who trust Aliph for their governance, risk, and compliance needs.
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-sm" data-testid={`benefit-${index}`}>
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Button 
                size="lg" 
                onClick={handleGetSolution}
                data-testid="button-get-grc-solution"
                className="flex items-center gap-2 text-lg px-8 py-3 h-auto"
              >
                {t('closing.cta')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Built with Saudi businesses for Saudi businesses.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
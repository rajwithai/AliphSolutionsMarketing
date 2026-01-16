import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { Shield, Target, FileCheck, Building, ArrowRight } from 'lucide-react';

const grcFeatures = [
  {
    icon: Shield,
    title: 'CMA Compliance',
    description: 'Capital Market Authority requirements and reporting'
  },
  {
    icon: Target,
    title: 'SAMA Alignment', 
    description: 'Saudi Arabian Monetary Authority frameworks'
  },
  {
    icon: FileCheck,
    title: 'PDPL Ready',
    description: 'Personal Data Protection Law compliance'
  },
  {
    icon: Building,
    title: 'MOC Standards',
    description: 'Ministry of Commerce regulatory standards'
  }
];

export default function GRCSection() {
  const { t } = useLanguage();
  
  const handleLearnMore = () => {
    
    // In real app, navigate to GRC solutions page
  };
  
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('grc.title')}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('grc.description')}
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {grcFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`card-grc-${index}`}>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            onClick={handleLearnMore}
            data-testid="button-grc-learn-more"
            className="flex items-center gap-2 mx-auto"
          >
            Learn More About GRC Solutions
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
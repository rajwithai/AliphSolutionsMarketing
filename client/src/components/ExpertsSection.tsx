import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from './LanguageProvider';
import { Star, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import collaborationImage from '@assets/generated_images/Saudi_business_collaboration_scene_af2b3140.png';

// todo: remove mock functionality
const mockExperts = [
  {
    name: 'Ahmad Al-Rashid',
    specialty: 'Corporate Governance',
    location: 'Riyadh',
    rating: 4.9,
    reviews: 47,
    experience: '12+ years'
  },
  {
    name: 'Fatima Al-Zahra',
    specialty: 'Risk Management', 
    location: 'Jeddah',
    rating: 4.8,
    reviews: 32,
    experience: '10+ years'
  },
  {
    name: 'Mohammed Al-Otaibi',
    specialty: 'Compliance & Audit',
    location: 'Dammam', 
    rating: 4.9,
    reviews: 58,
    experience: '15+ years'
  }
];

export default function ExpertsSection() {
  const { t } = useLanguage();
  
  const handleMeetExperts = () => {
    console.log('Meet our experts clicked');
    // In real app, navigate to experts page
  };
  
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('experts.title')}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {t('experts.description')}
            </p>
            
            <div className="mt-8 space-y-4">
              {mockExperts.map((expert, index) => (
                <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`card-expert-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{expert.name}</h3>
                        <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{expert.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{expert.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{expert.rating}</span>
                        <span className="text-xs text-muted-foreground">({expert.reviews})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8">
              <Button 
                size="lg" 
                onClick={handleMeetExperts}
                data-testid="button-meet-experts"
                className="flex items-center gap-2"
              >
                {t('common.meetExperts')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0">
            <div className="relative">
              <img
                src={collaborationImage}
                alt="Saudi business professionals collaborating"
                className="w-full rounded-lg shadow-xl"
                data-testid="img-collaboration"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent rounded-lg" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-background/90 text-foreground">
                  Vetted Saudi Experts
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
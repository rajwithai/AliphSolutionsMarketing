import ContactForm from '@/components/ContactForm';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Contact() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contactPage.getInTouch.address.title'),
      content: t('contactPage.getInTouch.address.content')
    },
    {
      icon: Phone,
      title: t('contactPage.getInTouch.phone.title'),
      content: '+966 11 123 4567'
    },
    {
      icon: Mail,
      title: t('contactPage.getInTouch.email.title'),
      content: 'connect@aliphsolutions.sa'
    },
    {
      icon: Clock,
      title: t('contactPage.getInTouch.hours.title'),
      content: t('contactPage.getInTouch.hours.content')
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('contactPage.title')}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('contactPage.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <ContactForm className="h-fit" />

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('contactPage.getInTouch.title')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('contactPage.getInTouch.description')}
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`contact-info-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-3">
                {t('contactPage.commitment.title')}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {t('contactPage.commitment.items.response')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {t('contactPage.commitment.items.consultation')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {t('contactPage.commitment.items.experts')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {t('contactPage.commitment.items.bilingual')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
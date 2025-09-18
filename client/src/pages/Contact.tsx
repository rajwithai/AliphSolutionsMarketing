import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/components/LanguageProvider';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Contact() {
  const { language } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: language === 'ar' ? 'العنوان' : 'Address',
      content: language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'
    },
    {
      icon: Phone,
      title: language === 'ar' ? 'الهاتف' : 'Phone',
      content: '+966 11 123 4567'
    },
    {
      icon: Mail,
      title: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      content: 'support@aliph.sa'
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'ساعات العمل' : 'Business Hours',
      content: language === 'ar' ? 'الأحد - الخميس: 9:00 ص - 6:00 م' : 'Sun - Thu: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'نحن هنا لمساعدتك. تواصل معنا اليوم وابدأ رحلتك مع حلول الحوكمة وإدارة المخاطر والامتثال المناسبة لعملك.'
              : 'We\'re here to help you succeed. Contact us today and start your journey with the right GRC solutions for your business.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <ContactForm className="h-fit" />
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {language === 'ar' ? 'معلومات التواصل' : 'Get in Touch'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {language === 'ar' 
                  ? 'اختر الطريقة المناسبة للتواصل معنا. فريقنا من الخبراء جاهز لمساعدتك في تحقيق أهدافك.'
                  : 'Choose the best way to reach us. Our team of experts is ready to help you achieve your goals.'
                }
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
                {language === 'ar' ? 'التزامنا بالجودة' : 'Our Commitment to Quality'}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {language === 'ar' ? 'استجابة خلال 24 ساعة' : '24-hour response time'}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {language === 'ar' ? 'استشارة مجانية لمدة 30 دقيقة' : 'Free 30-minute consultation'}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {language === 'ar' ? 'خبراء محليون معتمدون' : 'Certified local experts'}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {language === 'ar' ? 'دعم باللغتين العربية والإنجليزية' : 'Bilingual Arabic-English support'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
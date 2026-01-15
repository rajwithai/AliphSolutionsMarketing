import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './LanguageProvider';
import { insertContactSubmissionSchema, type InsertContactSubmission } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { CheckCircle, Send } from 'lucide-react';

interface ContactFormProps {
  defaultInquiryType?: 'solution' | 'expert' | 'general';
  className?: string;
}

export default function ContactForm({ defaultInquiryType = 'general', className = '' }: ContactFormProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: defaultInquiryType,
      language: language,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: language === 'ar' ? 'تم الإرسال بنجاح' : 'Submitted Successfully',
        description: language === 'ar' 
          ? 'شكراً لتواصلكم معنا. سنقوم بالرد عليكم قريباً.' 
          : 'Thank you for contacting us. We\'ll get back to you soon.',
      });
    },
    onError: (error: any) => {
      toast({
        title: language === 'ar' ? 'خطأ في الإرسال' : 'Submission Error',
        description: error?.message || (language === 'ar' 
          ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' 
          : 'There was an error sending your message. Please try again.'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate({
      ...data,
      language: language,
    });
  };

  const handleSendAnother = () => {
    form.reset({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: defaultInquiryType,
      language: language,
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">
              {language === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully'}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {language === 'ar' 
                ? 'شكراً لاهتمامكم بخدمات أليف. سيتواصل معكم أحد خبرائنا خلال 24-48 ساعة.'
                : 'Thank you for your interest in Aliph Solutions. One of our experts will contact you within 24-48 hours.'
              }
            </p>
            <Button 
              variant="outline" 
              onClick={handleSendAnother}
              data-testid="button-send-another"
            >
              {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-2xl font-bold text-center">
          {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
        </h3>
        <p className="text-muted-foreground text-center">
          {language === 'ar' 
            ? 'أخبرنا عن احتياجاتك وسنساعدك في العثور على الحل المناسب'
            : 'Tell us about your needs and we\'ll help you find the right solution'
          }
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? 'الاسم *' : 'Name *'}</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email"
                        placeholder={language === 'ar' ? 'name@company.com' : 'name@company.com'}
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? 'الشركة' : 'Company'}</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder={language === 'ar' ? 'اسم الشركة (اختياري)' : 'Company name (optional)'}
                        data-testid="input-company"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="tel"
                        placeholder={language === 'ar' ? '+966 50 123 4567' : '+966 50 123 4567'}
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? 'نوع الاستفسار *' : 'Inquiry Type *'}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-inquiry-type">
                        <SelectValue placeholder={language === 'ar' ? 'اختر نوع الاستفسار' : 'Select inquiry type'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="solution">{language === 'ar' ? 'أحتاج حلاً لشركتي' : 'I need a solution for my business'}</SelectItem>
                      <SelectItem value="expert">{language === 'ar' ? 'أريد الانضمام كخبير' : 'I want to join as an expert'}</SelectItem>
                      <SelectItem value="general">{language === 'ar' ? 'استفسار عام' : 'General inquiry'}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? 'الموضوع *' : 'Subject *'}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder={language === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                      data-testid="input-subject"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? 'الرسالة *' : 'Message *'}</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder={language === 'ar' ? 'أخبرنا المزيد عن احتياجاتك...' : 'Tell us more about your needs...'}
                      rows={4}
                      data-testid="textarea-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              size="lg" 
              className="w-full flex items-center gap-2"
              disabled={submitMutation.isPending}
              data-testid="button-submit-contact"
            >
              {submitMutation.isPending ? (
                <span>{language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>{language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

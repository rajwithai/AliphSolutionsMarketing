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
import { useTranslation } from 'react-i18next';
import { insertContactSubmissionSchema, type InsertContactSubmission } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { CheckCircle, Send } from 'lucide-react';

interface ContactFormProps {
  defaultInquiryType?: 'solution' | 'expert' | 'general';
  className?: string;
}

export default function ContactForm({ defaultInquiryType = 'general', className = '' }: ContactFormProps) {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Use current language for the form submission
  const currentLanguage = i18n.language;

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
      language: currentLanguage,
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
        title: t('contactForm.success.title'),
        description: t('contactForm.success.description'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('contactForm.error.title'),
        description: error?.message || t('contactForm.error.description'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate({
      ...data,
      language: currentLanguage,
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
      language: currentLanguage,
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
              {t('contactForm.success.title')}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {t('contactForm.success.message')}
            </p>
            <Button
              variant="outline"
              onClick={handleSendAnother}
              data-testid="button-send-another"
            >
              {t('contactForm.buttons.sendAnother')}
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
          {t('contactForm.title')}
        </h3>
        <p className="text-muted-foreground text-center">
          {t('contactForm.description')}
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
                    <FormLabel>{t('contactForm.labels.name')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('contactForm.placeholders.name')}
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
                    <FormLabel>{t('contactForm.labels.email')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder={t('contactForm.placeholders.email')}
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
                    <FormLabel>{t('contactForm.labels.company')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('contactForm.placeholders.company')}
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
                    <FormLabel>{t('contactForm.labels.phone')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder={t('contactForm.placeholders.phone')}
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
                  <FormLabel>{t('contactForm.labels.inquiryType')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-inquiry-type">
                        <SelectValue placeholder={t('contactForm.placeholders.inquiryType')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="solution">{t('contactForm.options.inquiryType.solution')}</SelectItem>
                      <SelectItem value="expert">{t('contactForm.options.inquiryType.expert')}</SelectItem>
                      <SelectItem value="general">{t('contactForm.options.inquiryType.general')}</SelectItem>
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
                  <FormLabel>{t('contactForm.labels.subject')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('contactForm.placeholders.subject')}
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
                  <FormLabel>{t('contactForm.labels.message')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('contactForm.placeholders.message')}
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
                <span>{t('contactForm.buttons.sending')}</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>{t('contactForm.buttons.submit')}</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

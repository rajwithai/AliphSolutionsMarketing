import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
import useSEO from '@/hooks/useSEO';

// Schema generator function to inject translations
const createFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t('companyContact.form.validations.nameMin') }).max(100, { message: t('companyContact.form.validations.nameMax') }),
  email: z.string().email({ message: t('companyContact.form.validations.emailInvalid') }),
  company: z.string().min(2, { message: t('companyContact.form.validations.companyMin') }).max(200, { message: t('companyContact.form.validations.companyMax') }),
  role: z.string().min(2, { message: t('companyContact.form.validations.roleMin') }).max(100, { message: t('companyContact.form.validations.roleMax') }),
  interestType: z.string().min(1, { message: t('companyContact.form.validations.interestTypeRequired') }),
  sector: z.string().min(1, { message: t('companyContact.form.validations.sectorRequired') }),
  primaryFocus: z.array(z.string()).min(1, { message: t('companyContact.form.validations.primaryFocusRequired') }),
  timeline: z.string().min(1, { message: t('companyContact.form.validations.timelineRequired') }),
  notes: z.string().optional(),
});

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

export default function CompanyContact() {
  const { t } = useTranslation();
  useSEO({
    title: t('companyContact.seo.title'),
    description: t('companyContact.seo.description'),
    keywords: t('companyContact.seo.keywords'),
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);

  // Memoize schema so it updates when language changes
  const formSchema = useMemo(() => createFormSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      interestType: '',
      sector: '',
      primaryFocus: [],
      timeline: '',
      notes: '',
    },
  });

  const interestType = watch('interestType');
  const sector = watch('sector');
  const timeline = watch('timeline');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // Use specialized form format to include all fields
      const payload = {
        formType: 'Contact Form Inquiry',
        name: data.name,
        email: data.email,
        company: data.company,
        role: data.role,
        interestType: data.interestType,
        sector: data.sector,
        primaryFocus: data.primaryFocus?.join(', ') || 'None',
        timeline: data.timeline,
        notes: data.notes || 'None',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Handle validation errors from server
          const errorMessages = result.errors.map((err: any) => err.message).join(', ');
          setServerError(errorMessages);
        } else {
          setServerError(result.message || t('companyContact.form.submitError'));
        }
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setServerError(t('companyContact.form.serverError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocusChange = (focus: string) => {
    const newFocus = selectedFocus.includes(focus)
      ? selectedFocus.filter((f) => f !== focus)
      : [...selectedFocus, focus];
    setSelectedFocus(newFocus);
    setValue('primaryFocus', newFocus, { shouldValidate: true });
  };

  const focusAreas = [
    { id: 'pdpl', label: t('companyContact.focusAreas.pdpl') },
    { id: 'nca', label: t('companyContact.focusAreas.nca') },
    { id: 'zatca', label: t('companyContact.focusAreas.zatca') },
    { id: 'audit', label: t('companyContact.focusAreas.audit') },
    { id: 'ai', label: t('companyContact.focusAreas.ai') },
    { id: 'board', label: t('companyContact.focusAreas.board') },
    { id: 'thirdParty', label: t('companyContact.focusAreas.thirdParty') },
    { id: 'managed', label: t('companyContact.focusAreas.managed') },
    { id: 'sovereign', label: t('companyContact.focusAreas.sovereign') },
    { id: 'other', label: t('companyContact.focusAreas.other') }
  ];

  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-[#C9A227] text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('companyContact.success.title')}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            {t('companyContact.success.message')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              {t('companyContact.success.btn1')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              {t('companyContact.success.btn2')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">{t('companyContact.hero.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('companyContact.hero.title')}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              {t('companyContact.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* FORM & SIDEBAR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* FORM */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('companyContact.form.title')}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Server Error Display */}
                  {serverError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{serverError}</p>
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className={errors.name ? 'text-red-600' : ''}>
                        {errors.name ? errors.name.message : t('companyContact.form.labels.name')}
                      </Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className={`mt-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className={errors.email ? 'text-red-600' : ''}>
                        {errors.email ? errors.email.message : t('companyContact.form.labels.email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`mt-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Company & Role */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company" className={errors.company ? 'text-red-600' : ''}>
                        {errors.company ? errors.company.message : t('companyContact.form.labels.company')}
                      </Label>
                      <Input
                        id="company"
                        {...register('company')}
                        className={`mt-2 ${errors.company ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role" className={errors.role ? 'text-red-600' : ''}>
                        {errors.role ? errors.role.message : t('companyContact.form.labels.role')}
                      </Label>
                      <Input
                        id="role"
                        {...register('role')}
                        className={`mt-2 ${errors.role ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Interest Type */}
                  <div>
                    <Label htmlFor="interestType" className={errors.interestType ? 'text-red-600' : ''}>
                      {errors.interestType ? errors.interestType.message : t('companyContact.form.labels.interestType')}
                    </Label>
                    <Select
                      value={interestType}
                      onValueChange={(value) => setValue('interestType', value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`mt-2 ${errors.interestType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder={t('companyContact.form.placeholders.interestType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo">{t('companyContact.options.interestType.demo')}</SelectItem>
                        <SelectItem value="advisory">{t('companyContact.options.interestType.advisory')}</SelectItem>
                        <SelectItem value="managed">{t('companyContact.options.interestType.managed')}</SelectItem>
                        <SelectItem value="architecture">{t('companyContact.options.interestType.architecture')}</SelectItem>
                        <SelectItem value="partnership">{t('companyContact.options.interestType.partnership')}</SelectItem>
                        <SelectItem value="other">{t('companyContact.options.interestType.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sector */}
                  <div>
                    <Label htmlFor="sector" className={errors.sector ? 'text-red-600' : ''}>
                      {errors.sector ? errors.sector.message : t('companyContact.form.labels.sector')}
                    </Label>
                    <Select
                      value={sector}
                      onValueChange={(value) => setValue('sector', value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`mt-2 ${errors.sector ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder={t('companyContact.form.placeholders.sector')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">{t('companyContact.options.sector.finance')}</SelectItem>
                        <SelectItem value="energy">{t('companyContact.options.sector.energy')}</SelectItem>
                        <SelectItem value="healthcare">{t('companyContact.options.sector.healthcare')}</SelectItem>
                        <SelectItem value="telecom">{t('companyContact.options.sector.telecom')}</SelectItem>
                        <SelectItem value="giga">{t('companyContact.options.sector.giga')}</SelectItem>
                        <SelectItem value="sme">{t('companyContact.options.sector.sme')}</SelectItem>
                        <SelectItem value="government">{t('companyContact.options.sector.government')}</SelectItem>
                        <SelectItem value="other">{t('companyContact.options.sector.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Primary Focus (Multi-select checkboxes) */}
                  <div>
                    <Label className={`mb-3 block ${errors.primaryFocus ? 'text-red-600' : ''}`}>
                      {errors.primaryFocus ? errors.primaryFocus.message : t('companyContact.form.labels.primaryFocus')}
                    </Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {focusAreas.map((focus) => (
                        <label
                          key={focus.id}
                          className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:border-[#C9A227] transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFocus.includes(focus.label)}
                            onChange={() => handleFocusChange(focus.label)}
                            className="w-4 h-4 text-[#C9A227] border-gray-300 rounded focus:ring-[#C9A227]"
                          />
                          <span className="text-sm text-gray-700">{focus.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.primaryFocus && (
                      <p className="text-sm text-red-600 mt-1">{errors.primaryFocus.message}</p>
                    )}
                  </div>

                  {/* Timeline */}
                  <div>
                    <Label htmlFor="timeline" className={errors.timeline ? 'text-red-600' : ''}>
                      {errors.timeline ? errors.timeline.message : t('companyContact.form.labels.timeline')}
                    </Label>
                    <Select
                      value={timeline}
                      onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`mt-2 ${errors.timeline ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder={t('companyContact.form.placeholders.timeline')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">{t('companyContact.options.timeline.urgent')}</SelectItem>
                        <SelectItem value="1month">{t('companyContact.options.timeline.1month')}</SelectItem>
                        <SelectItem value="3months">{t('companyContact.options.timeline.3months')}</SelectItem>
                        <SelectItem value="6months">{t('companyContact.options.timeline.6months')}</SelectItem>
                        <SelectItem value="planning">{t('companyContact.options.timeline.planning')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">{t('companyContact.form.labels.notes')}</Label>
                    <Textarea
                      id="notes"
                      rows={5}
                      {...register('notes')}
                      placeholder={t('companyContact.form.placeholders.notes')}
                      className="mt-2"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D] disabled:opacity-50 disabled:cursor-not-allowed"
                    data-attribute="contact_submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t('companyContact.form.buttons.submitting')}
                      </>
                    ) : (
                      t('companyContact.form.buttons.submit')
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="p-6 border-2">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('companyContact.sidebar.contactInfo.title')}</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{t('companyContact.sidebar.contactInfo.location.label')}</p>
                      <p className="text-sm text-gray-600">{t('companyContact.sidebar.contactInfo.location.value')}</p>
                      <p className="text-xs text-gray-500 italic">{t('companyContact.sidebar.contactInfo.location.note')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{t('companyContact.sidebar.contactInfo.email.label')}</p>
                      <p className="text-sm text-gray-600">{t('companyContact.sidebar.contactInfo.email.value')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{t('companyContact.sidebar.contactInfo.response.label')}</p>
                      <p className="text-sm text-gray-600">{t('companyContact.sidebar.contactInfo.response.value')}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6 border-2">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('companyContact.sidebar.quickLinks.title')}</h3>

                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = '/deliverables'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                    data-attribute="contact_request_demo"
                  >
                    <span className="text-sm font-medium text-gray-900">{t('companyContact.sidebar.quickLinks.demo')}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/advisory'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                    data-attribute="contact_request_scope"
                  >
                    <span className="text-sm font-medium text-gray-900">{t('companyContact.sidebar.quickLinks.advisory')}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/managed-services'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-900">{t('companyContact.sidebar.quickLinks.managed')}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/technology/security-sovereignty'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-900">{t('companyContact.sidebar.quickLinks.security')}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/company/partners'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-900">{t('companyContact.sidebar.quickLinks.partners')}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/security'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-900">{t('companyContact.sidebar.quickLinks.securityStatement')}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>

              {/* Office Hours */}
              <Card className="p-6 border-2 bg-gradient-to-br from-[#C9A227]/5 to-white">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t('companyContact.sidebar.officeHours.title')}</h3>
                <p className="text-sm text-gray-700">
                  {t('companyContact.sidebar.officeHours.days')}<br />
                  {t('companyContact.sidebar.officeHours.time')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('companyContact.finalCta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('companyContact.finalCta.description')}
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/deliverables'}
            className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
          >
            {t('companyContact.finalCta.btn')}
          </Button>
        </div>
      </section>
    </>
  );
}

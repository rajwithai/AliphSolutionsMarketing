import { useState } from 'react';
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
import useSEO from '@/hooks/useSEO';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required').max(200),
  role: z.string().min(2, 'Role/Title is required').max(100),
  interestType: z.string().min(1, 'Please select what brings you here'),
  sector: z.string().min(1, 'Please select your sector'),
  primaryFocus: z.array(z.string()).min(1, 'Please select at least one focus area'),
  timeline: z.string().min(1, 'Please select a timeline'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CompanyContact() {
  useSEO({
    title: 'Contact | Aliph Solutions',
    description: 'Contact Aliph Solutions to discuss GRC advisory, AI governance, managed services, or partnership opportunities. Riyadh, Saudi Arabia.',
    keywords: 'contact Aliph Solutions, GRC advisory inquiry, Saudi compliance, sovereign AI demo, partnership inquiry',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);

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
      // Map the form data to the API schema
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: '', // Optional field
        subject: `${data.interestType} - ${data.sector}`,
        message: `Role: ${data.role}\n` +
                 `Timeline: ${data.timeline}\n` +
                 `Primary Focus: ${data.primaryFocus?.join(', ') || 'None'}\n\n` +
                 `Additional Notes:\n${data.notes || 'None'}`,
        inquiryType: 'solution' as const,
        language: 'en',
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
          setServerError(result.message || 'Failed to submit form. Please try again.');
        }
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setServerError('An unexpected error occurred. Please try again later.');
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
    'PDPL Compliance',
    'NCA ECC Readiness',
    'ZATCA / Tax Compliance',
    'Internal Audit Setup',
    'AI Governance',
    'Board & Committee Governance',
    'Third-Party Risk',
    'Managed GRC Operations',
    'Sovereign Architecture',
    'Other'
  ];

  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-[#C9A227] text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            We've received your inquiry and will respond within 24 hours with next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              View Sample Deliverables
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Back to Home
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
              <span className="text-sm text-[#C9A227]">Get in Touch</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Contact Aliph
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Request a demo, scoped engagement plan, sample deliverables, or discuss partnership opportunities. We respond within 24 hours.
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
                  Send Us a Message
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
                        {errors.name ? errors.name.message : 'Full Name *'}
                      </Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className={`mt-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className={errors.email ? 'text-red-600' : ''}>
                        {errors.email ? errors.email.message : 'Email *'}
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
                        {errors.company ? errors.company.message : 'Company *'}
                      </Label>
                      <Input
                        id="company"
                        {...register('company')}
                        className={`mt-2 ${errors.company ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role" className={errors.role ? 'text-red-600' : ''}>
                        {errors.role ? errors.role.message : 'Role / Title *'}
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
                      {errors.interestType ? errors.interestType.message : 'What brings you here? *'}
                    </Label>
                    <Select
                      value={interestType}
                      onValueChange={(value) => setValue('interestType', value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`mt-2 ${errors.interestType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select interest type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo">Request Demo (Aliph Brain or GRC Platform)</SelectItem>
                        <SelectItem value="advisory">Advisory Scope (Governance, Risk, Compliance)</SelectItem>
                        <SelectItem value="managed">Managed Services (GRC Support, Operations)</SelectItem>
                        <SelectItem value="architecture">Architecture & Security Consultation</SelectItem>
                        <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sector */}
                  <div>
                    <Label htmlFor="sector" className={errors.sector ? 'text-red-600' : ''}>
                      {errors.sector ? errors.sector.message : 'Sector *'}
                    </Label>
                    <Select
                      value={sector}
                      onValueChange={(value) => setValue('sector', value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`mt-2 ${errors.sector ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="telecom">Telecom & Digital Services</SelectItem>
                        <SelectItem value="giga">Giga-project Vendor</SelectItem>
                        <SelectItem value="sme">SME / Startup</SelectItem>
                        <SelectItem value="government">Government / Public Sector</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Primary Focus (Multi-select checkboxes) */}
                  <div>
                    <Label className={`mb-3 block ${errors.primaryFocus ? 'text-red-600' : ''}`}>
                      {errors.primaryFocus ? errors.primaryFocus.message : 'Primary Focus Areas (select all that apply) *'}
                    </Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {focusAreas.map((focus) => (
                        <label
                          key={focus}
                          className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:border-[#C9A227] transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFocus.includes(focus)}
                            onChange={() => handleFocusChange(focus)}
                            className="w-4 h-4 text-[#C9A227] border-gray-300 rounded focus:ring-[#C9A227]"
                          />
                          <span className="text-sm text-gray-700">{focus}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <Label htmlFor="timeline" className={errors.timeline ? 'text-red-600' : ''}>
                      {errors.timeline ? errors.timeline.message : 'Timeline *'}
                    </Label>
                    <Select
                      value={timeline}
                      onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`mt-2 ${errors.timeline ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (within 2 weeks)</SelectItem>
                        <SelectItem value="1month">1 month</SelectItem>
                        <SelectItem value="3months">1-3 months</SelectItem>
                        <SelectItem value="6months">3-6 months</SelectItem>
                        <SelectItem value="planning">Planning / Exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      rows={5}
                      {...register('notes')}
                      placeholder="Tell us more about your environment, challenges, or specific requirements..."
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
                        Submitting...
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="p-6 border-2">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">Riyadh, Saudi Arabia</p>
                      <p className="text-xs text-gray-500 italic">(by appointment)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">connect@aliphsolutions.sa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Response Time</p>
                      <p className="text-sm text-gray-600">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6 border-2">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = '/deliverables'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                    data-attribute="contact_request_demo"
                  >
                    <span className="text-sm font-medium text-gray-900">Request Demo</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/advisory'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                    data-attribute="contact_request_scope"
                  >
                    <span className="text-sm font-medium text-gray-900">Advisory Services</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/managed-services'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-900">Managed Services</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/technology/security-sovereignty'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-900">Security & Sovereignty</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/company/partners'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-900">Partnership Inquiry</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => window.location.href = '/security'}
                    className="w-full flex items-center justify-between p-3 border-2 rounded-lg hover:border-[#C9A227] transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-900">Security Statement</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>

              {/* Office Hours */}
              <Card className="p-6 border-2 bg-gradient-to-br from-[#C9A227]/5 to-white">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Office Hours</h3>
                <p className="text-sm text-gray-700">
                  Sunday - Thursday<br />
                  9:00 AM - 6:00 PM (Riyadh Time)
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
            Need Sample Deliverables First?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            See the quality and structure of our audit-ready outputs before booking a call.
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/deliverables'}
            className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
          >
            Request Sample Deliverables
          </Button>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import { Loader2 } from 'lucide-react';

type RequestType = 'demo' | 'deliverables' | 'partnership';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  type: RequestType;
}

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required').max(200),
  role: z.string().min(2, 'Role is required').max(100),
  primaryNeed: z.string().optional().or(z.literal('')),
  sector: z.string().min(1, 'Please select your sector'),
  timeline: z.string().min(1, 'Please select a timeline'),
  notes: z.string().optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

const modalConfig = {
  demo: {
    title: 'Request a Sovereign GRC Demo',
    description: 'Tell us about your needs and we\'ll respond with a demo agenda and next steps.',
  },
  deliverables: {
    title: 'Request Sample Deliverables',
    description: 'Select the deliverable packs you\'re interested in reviewing.',
  },
  partnership: {
    title: 'Request Government Partnership Proposal',
    description: 'Let\'s discuss how Aliph can support your organization\'s compliance and governance objectives.',
  },
};

export default function RequestModal({ open, onClose, type }: RequestModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const config = modalConfig[type];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      primaryNeed: '',
      sector: '',
      timeline: '',
      notes: '',
    },
  });

  const primaryNeed = watch('primaryNeed');
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
        subject: `${type.charAt(0).toUpperCase() + type.slice(1)} Request - ${data.primaryNeed || data.company}`,
        message: `Role: ${data.role}\n` +
          `Primary Need: ${data.primaryNeed || 'N/A'}\n` +
          `Sector: ${data.sector || 'N/A'}\n` +
          `Timeline: ${data.timeline || 'N/A'}\n\n` +
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
          const errorMessages = result.errors.map((err: any) => err.message).join(', ');
          setServerError(errorMessages);
        } else {
          setServerError(result.message || 'Failed to submit request. Please try again.');
        }
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        reset();
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setServerError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C9A227] focus:ring-[#C9A227] h-11";
  const labelClasses = "text-gray-300";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#0B1220] border-[#C9A227] text-white p-6 md:p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-white mb-2">{config.title}</DialogTitle>
          <DialogDescription className="text-gray-400 text-base">{config.description}</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-[#C9A227]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C9A227]/20">
              <div className="text-[#C9A227] text-2xl">✓</div>
            </div>
            <div className="text-[#C9A227] text-lg font-semibold mb-2">Request Submitted</div>
            <p className="text-sm text-gray-400">
              We'll respond with {type === 'demo' ? 'a demo agenda' : 'next steps'} shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Server Error Display */}
            {serverError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{serverError}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={errors.name ? 'text-red-400' : labelClasses}>
                  {errors.name ? errors.name.message : 'Name *'}
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500 focus:ring-red-500 bg-red-500/5' : inputClasses}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className={errors.email ? 'text-red-400' : labelClasses}>
                  {errors.email ? errors.email.message : 'Email *'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500 focus:ring-red-500 bg-red-500/5' : inputClasses}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className={errors.company ? 'text-red-400' : labelClasses}>
                  {errors.company ? errors.company.message : 'Company *'}
                </Label>
                <Input
                  id="company"
                  {...register('company')}
                  className={errors.company ? 'border-red-500 focus:ring-red-500 bg-red-500/5' : inputClasses}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className={errors.role ? 'text-red-400' : labelClasses}>
                  {errors.role ? errors.role.message : 'Role *'}
                </Label>
                <Input
                  id="role"
                  {...register('role')}
                  className={errors.role ? 'border-red-500 focus:ring-red-500 bg-red-500/5' : inputClasses}
                />
              </div>
            </div>

            {type === 'demo' && (
              <div className="space-y-2">
                <Label htmlFor="primaryNeed" className={errors.primaryNeed ? 'text-red-400' : labelClasses}>
                  {errors.primaryNeed ? errors.primaryNeed.message : 'Primary Need *'}
                </Label>
                <Select
                  value={primaryNeed}
                  onValueChange={(value) => setValue('primaryNeed', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="primaryNeed" className={`${errors.primaryNeed ? 'border-red-500' : 'border-white/10 bg-white/5 text-white focus:ring-[#C9A227]'} h-11`}>
                    <SelectValue placeholder="Select your primary need" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1220] border-white/10 text-white">
                    <SelectItem value="pdpl">PDPL Compliance</SelectItem>
                    <SelectItem value="nca-ecc">NCA ECC Compliance</SelectItem>
                    <SelectItem value="zatca">ZATCA Compliance</SelectItem>
                    <SelectItem value="governance">Corporate Governance</SelectItem>
                    <SelectItem value="erm">Enterprise Risk Management</SelectItem>
                    <SelectItem value="internal-audit">Internal Audit</SelectItem>
                    <SelectItem value="ai-governance">AI Governance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sector" className={errors.sector ? 'text-red-400' : labelClasses}>
                  {errors.sector ? errors.sector.message : 'Sector *'}
                </Label>
                <Select
                  value={sector}
                  onValueChange={(value) => setValue('sector', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="sector" className={`${errors.sector ? 'border-red-500' : 'border-white/10 bg-white/5 text-white focus:ring-[#C9A227]'} h-11`}>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1220] border-white/10 text-white">
                    <SelectItem value="finance">Finance & Banking</SelectItem>
                    <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="giga">Giga-project Vendors</SelectItem>
                    <SelectItem value="sme">SMEs & Startups</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline" className={errors.timeline ? 'text-red-400' : labelClasses}>
                  {errors.timeline ? errors.timeline.message : 'Timeline *'}
                </Label>
                <Select
                  value={timeline}
                  onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="timeline" className={`${errors.timeline ? 'border-red-500' : 'border-white/10 bg-white/5 text-white focus:ring-[#C9A227]'} h-11`}>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1220] border-white/10 text-white">
                    <SelectItem value="now">Immediate</SelectItem>
                    <SelectItem value="30">Within 30 days</SelectItem>
                    <SelectItem value="90">Within 90 days</SelectItem>
                    <SelectItem value="exploratory">Exploratory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className={labelClasses}>Additional Notes</Label>
              <Textarea
                id="notes"
                rows={3}
                {...register('notes')}
                placeholder="Tell us more about your requirements..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C9A227] focus:ring-[#C9A227] min-h-[100px]"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1 text-gray-400 hover:text-white hover:bg-white/5" disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="flex-[2] bg-[#C9A227] hover:bg-[#B8921F] text-black font-semibold h-11" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

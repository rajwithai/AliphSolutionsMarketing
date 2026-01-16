import { useState, useMemo } from 'react';
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
import SuccessModal from '@/components/SuccessModal';
import { useTranslation } from 'react-i18next';

type RequestType = 'demo' | 'deliverables' | 'partnership';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  type: RequestType;
}

// Schema generator to inject translations
const createFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t('requestModal.form.validations.nameMin') }).max(100, { message: t('requestModal.form.validations.nameMax') }),
  email: z.string().email({ message: t('requestModal.form.validations.emailInvalid') }),
  company: z.string().min(2, { message: t('requestModal.form.validations.companyRequired') }).max(200, { message: t('requestModal.form.validations.companyMax') }),
  role: z.string().min(2, { message: t('requestModal.form.validations.roleRequired') }).max(100, { message: t('requestModal.form.validations.roleMax') }),
  primaryNeed: z.string().optional().or(z.literal('')),
  sector: z.string().min(1, { message: t('requestModal.form.validations.sectorRequired') }),
  timeline: z.string().min(1, { message: t('requestModal.form.validations.timelineRequired') }),
  notes: z.string().optional().or(z.literal('')),
});

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

export default function RequestModal({ open, onClose, type }: RequestModalProps) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Memoize schema so it updates when language changes
  const formSchema = useMemo(() => createFormSchema(t), [t]);

  const modalConfig = {
    demo: {
      title: t('requestModal.types.demo.title'),
      description: t('requestModal.types.demo.description'),
    },
    deliverables: {
      title: t('requestModal.types.deliverables.title'),
      description: t('requestModal.types.deliverables.description'),
    },
    partnership: {
      title: t('requestModal.types.partnership.title'),
      description: t('requestModal.types.partnership.description'),
    },
  };

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
        language: 'en', // Could be dynamic based on current language
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
          setServerError(result.message || t('requestModal.form.submitError'));
        }
        return;
      }

      setSubmitted(true);
      // User will manually close the success modal via the Close button
    } catch (error) {
      console.error('Form submission error:', error);
      setServerError(t('requestModal.form.serverError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C9A227] focus:ring-[#C9A227] h-11";
  const labelClasses = "text-gray-300";

  return (
    <>
      <SuccessModal
        open={submitted}
        onClose={() => {
          setSubmitted(false);
          onClose();
          reset();
        }}
        title={t('requestModal.success.title')}
        message={t('requestModal.success.message', {
          responseType: type === 'demo'
            ? t('requestModal.success.responseTypes.demo')
            : t('requestModal.success.responseTypes.nextSteps')
        })}
        buttonText={t('requestModal.success.button')}
      />

      <Dialog open={open && !submitted} onOpenChange={(isOpen) => {
        if (!isOpen) {
          reset();
          setServerError(null);
        }
        onClose();
      }}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#0B1220] border-[#C9A227] text-white p-6 md:p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-white mb-2">{config.title}</DialogTitle>
            <DialogDescription className="text-gray-400 text-base">{config.description}</DialogDescription>
          </DialogHeader>

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
                  {errors.name ? errors.name.message : t('requestModal.form.labels.name')}
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500 focus:ring-red-500 bg-red-500/5' : inputClasses}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className={errors.email ? 'text-red-400' : labelClasses}>
                  {errors.email ? errors.email.message : t('requestModal.form.labels.email')}
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
                  {errors.company ? errors.company.message : t('requestModal.form.labels.company')}
                </Label>
                <Input
                  id="company"
                  {...register('company')}
                  className={errors.company ? 'border-red-500 focus:ring-red-500 bg-red-500/5' : inputClasses}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className={errors.role ? 'text-red-400' : labelClasses}>
                  {errors.role ? errors.role.message : t('requestModal.form.labels.role')}
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
                  {errors.primaryNeed ? errors.primaryNeed.message : t('requestModal.form.labels.primaryNeed')}
                </Label>
                <Select
                  value={primaryNeed}
                  onValueChange={(value) => setValue('primaryNeed', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="primaryNeed" className={`${errors.primaryNeed ? 'border-red-500' : 'border-white/10 bg-white/5 text-white focus:ring-[#C9A227]'} h-11`}>
                    <SelectValue placeholder={t('requestModal.form.placeholders.primaryNeed')} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1220] border-white/10 text-white">
                    <SelectItem value="pdpl">{t('requestModal.options.primaryNeed.pdpl')}</SelectItem>
                    <SelectItem value="nca-ecc">{t('requestModal.options.primaryNeed.ncaEcc')}</SelectItem>
                    <SelectItem value="zatca">{t('requestModal.options.primaryNeed.zatca')}</SelectItem>
                    <SelectItem value="governance">{t('requestModal.options.primaryNeed.governance')}</SelectItem>
                    <SelectItem value="erm">{t('requestModal.options.primaryNeed.erm')}</SelectItem>
                    <SelectItem value="internal-audit">{t('requestModal.options.primaryNeed.internalAudit')}</SelectItem>
                    <SelectItem value="ai-governance">{t('requestModal.options.primaryNeed.aiGovernance')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sector" className={errors.sector ? 'text-red-400' : labelClasses}>
                  {errors.sector ? errors.sector.message : t('requestModal.form.labels.sector')}
                </Label>
                <Select
                  value={sector}
                  onValueChange={(value) => setValue('sector', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="sector" className={`${errors.sector ? 'border-red-500' : 'border-white/10 bg-white/5 text-white focus:ring-[#C9A227]'} h-11`}>
                    <SelectValue placeholder={t('requestModal.form.placeholders.sector')} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1220] border-white/10 text-white">
                    <SelectItem value="finance">{t('requestModal.options.sector.finance')}</SelectItem>
                    <SelectItem value="energy">{t('requestModal.options.sector.energy')}</SelectItem>
                    <SelectItem value="healthcare">{t('requestModal.options.sector.healthcare')}</SelectItem>
                    <SelectItem value="giga">{t('requestModal.options.sector.giga')}</SelectItem>
                    <SelectItem value="sme">{t('requestModal.options.sector.sme')}</SelectItem>
                    <SelectItem value="other">{t('requestModal.options.sector.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline" className={errors.timeline ? 'text-red-400' : labelClasses}>
                  {errors.timeline ? errors.timeline.message : t('requestModal.form.labels.timeline')}
                </Label>
                <Select
                  value={timeline}
                  onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="timeline" className={`${errors.timeline ? 'border-red-500' : 'border-white/10 bg-white/5 text-white focus:ring-[#C9A227]'} h-11`}>
                    <SelectValue placeholder={t('requestModal.form.placeholders.timeline')} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1220] border-white/10 text-white">
                    <SelectItem value="now">{t('requestModal.options.timeline.now')}</SelectItem>
                    <SelectItem value="30">{t('requestModal.options.timeline.30')}</SelectItem>
                    <SelectItem value="90">{t('requestModal.options.timeline.90')}</SelectItem>
                    <SelectItem value="exploratory">{t('requestModal.options.timeline.exploratory')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className={labelClasses}>{t('requestModal.form.labels.notes')}</Label>
              <Textarea
                id="notes"
                rows={3}
                {...register('notes')}
                placeholder={t('requestModal.form.placeholders.notes')}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C9A227] focus:ring-[#C9A227] min-h-[100px]"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1 text-gray-400 hover:text-white hover:bg-white/5" disabled={isSubmitting}>
                {t('requestModal.form.buttons.cancel')}
              </Button>
              <Button type="submit" className="flex-[2] bg-[#C9A227] hover:bg-[#B8921F] text-black font-semibold h-11" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('requestModal.form.buttons.submitting')}
                  </>
                ) : (
                  t('requestModal.form.buttons.submit')
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

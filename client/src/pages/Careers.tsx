import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import useSEO from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, CheckCircle2, Target, Shield, TrendingUp, MapPin, Users, Code, FileText, Network, Award, Activity, Loader2 } from 'lucide-react';

// Form validation schema
const careerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  location: z.string().min(1, 'Please select a location'),
  track: z.string().min(1, 'Please select a track'),
  seniority: z.string().min(1, 'Please select seniority level'),
  linkedin: z.string().optional(),
  cvLink: z.string().optional(),
  notes: z.string().optional(),
});

type CareerFormData = z.infer<typeof careerFormSchema>;

export default function Careers() {
  useSEO({
    title: 'Careers | Aliph Solutions',
    description: 'Join Aliph Solutions—Saudi-first GRC advisory and sovereign AI workflows. Explore roles across advisory, delivery, and technology.',
    ogTitle: 'Careers at Aliph Solutions',
    ogDescription: 'Build sovereign, audit-ready transformation for Saudi organizations.',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerFormSchema),
    mode: 'onChange',
  });

  const location = watch('location');
  const track = watch('track');
  const seniority = watch('seniority');

  const onSubmit = async (data: CareerFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: '',
        phone: '',
        subject: `Career Interest - ${data.track}`,
        message: `Career Application Details:\n\n` +
                 `Track: ${data.track}\n` +
                 `Seniority: ${data.seniority}\n` +
                 `Location: ${data.location}\n` +
                 `LinkedIn: ${data.linkedin || 'Not provided'}\n` +
                 `CV Link: ${data.cvLink || 'Not provided'}\n\n` +
                 `Additional Notes:\n${data.notes || 'None'}`,
        inquiryType: 'general' as const,
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
          setServerError(result.message || 'Failed to submit. Please try again.');
        }
        return;
      }

      setFormSubmitted(true);
      reset();
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Career form submission error:', error);
      setServerError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tracks = [
    {
      icon: FileText,
      title: 'Advisory',
      subtitle: 'GRC / PDPL / ERM / Internal Audit',
      description: 'Work on readiness assessments, control frameworks, policy suites, and implementation roadmaps for Saudi organizations.',
      skills: 'Big Four background, GRC frameworks (ISO, NIST, PDPL, NCA ECC), strong writing, client interaction',
      track: 'Advisory',
    },
    {
      icon: Activity,
      title: 'Managed Services Operations',
      subtitle: 'Compliance Ops / Reporting Cadence',
      description: 'Run recurring compliance routines, maintain trackers, generate board-ready reporting, and deliver evidence packs.',
      skills: 'Operational rigor, attention to detail, tracker maintenance, reporting discipline, process documentation',
      track: 'Managed Services',
    },
    {
      icon: Code,
      title: 'Technology & Workflows',
      subtitle: 'Full-stack / Data / Product',
      description: 'Build and improve governed AI workflows, integration patterns, audit logging, and delivery acceleration systems.',
      skills: 'Full-stack development (TypeScript, Python), AI/LLM integration, security patterns, product thinking',
      track: 'Technology',
    },
    {
      icon: Award,
      title: 'Research & Regulatory Intelligence',
      subtitle: 'Saudi Regulation Summarization',
      description: 'Track PDPL, NCA ECC, ZATCA, and other Saudi regulations. Summarize obligations and update knowledge systems.',
      skills: 'Legal/regulatory research, Arabic fluency (preferred), structured analysis, documentation',
      track: 'Research',
    },
    {
      icon: Network,
      title: 'Partnerships & Growth',
      subtitle: 'Ecosystem / Alliances',
      description: 'Build partnerships with legal firms, consulting networks, technology vendors, and government-aligned programs.',
      skills: 'Relationship building, strategic thinking, enterprise sales/partnerships, Saudi market knowledge',
      track: 'Partnerships',
    },
  ];

  const principles = [
    {
      icon: FileText,
      title: 'High-Quality Writing',
      description: 'Clear, structured documentation. No ambiguity in deliverables.',
    },
    {
      icon: Shield,
      title: 'Security & Discretion',
      description: 'Data sensitivity by default. Client confidentiality respected.',
    },
    {
      icon: TrendingUp,
      title: 'Speed Through Structure',
      description: 'Workflows and templates accelerate delivery without sacrificing quality.',
    },
    {
      icon: CheckCircle2,
      title: 'Honest Communication',
      description: 'No fluff. Clear expectations. Direct feedback.',
    },
    {
      icon: Target,
      title: 'Client Outcomes First',
      description: 'Audit-ready results. Implementation-focused delivery.',
    },
    {
      icon: Users,
      title: 'Continuous Improvement',
      description: 'Learn from delivery. Improve templates. Raise quality standards.',
    },
  ];

  const scrollToForm = () => {
    document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const prefillTrack = (trackName: string) => {
    setValue('track', trackName, { shouldValidate: true });
    scrollToForm();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Saudi-first</span>
              <span>•</span>
              <span>Mission-driven</span>
              <span>•</span>
              <span>Delivery-minded</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Careers
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
              Join Aliph Solutions to build sovereign-by-design advisory delivery—where governance, compliance, and AI adoption converge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="careers_register_interest_hero"
              >
                Register Interest
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/advisory'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Explore Our Work
              </Button>
            </div>

            <a
              href="/technology/aliph-brain"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
            >
              Our Technology
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why Join Aliph
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-2 border-gray-200 hover:border-[#C9A227] transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Outcomes, Not Slides</h3>
              <p className="text-gray-700">
                Audit-ready deliverables, implementation-first outputs. We ship trackers, policies, evidence packs, and roadmaps—not decks.
              </p>
            </Card>

            <Card className="p-8 border-2 border-gray-200 hover:border-[#C9A227] transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sovereign-by-Design Thinking</h3>
              <p className="text-gray-700">
                Security, traceability, and governance baked into workflows. Built for regulated environments from day one.
              </p>
            </Card>

            <Card className="p-8 border-2 border-gray-200 hover:border-[#C9A227] transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Compounding System</h3>
              <p className="text-gray-700">
                Every delivery improves workflows and knowledge. Templates, structures, and intelligence compound over time.
              </p>
            </Card>

            <Card className="p-8 border-2 border-gray-200 hover:border-[#C9A227] transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Saudi-First Impact</h3>
              <p className="text-gray-700">
                Support institutional readiness under Vision 2030 direction. Help organizations navigate PDPL, NCA ECC, and AI governance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            What We Look For
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            We value clarity, ownership, and structured thinking over credentials alone.
          </p>

          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Delivery ownership and clarity</strong> — you ship complete work and communicate proactively</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Structured thinking</strong> — governance, risk, compliance frameworks come naturally</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Executive communication</strong> — ability to explain complex topics clearly and concisely</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Respect for data sensitivity</strong> — discretion and security awareness by default</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Builder's mindset</strong> — improve templates, workflows, and quality continuously</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Open Roles / Tracks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Open Roles
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            We're building across advisory, operations, technology, research, and partnerships. Register interest in the track that fits you.
          </p>

          <div className="space-y-4 max-w-5xl mx-auto">
            {tracks.map((track, index) => {
              const Icon = track.icon;
              return (
                <Card key={index} className="border-2 hover:border-[#C9A227] transition-all">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`track-${index}`} className="border-0">
                      <AccordionTrigger className="px-8 py-6 hover:no-underline">
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#C9A227] to-[#B8921F] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{track.title}</h3>
                            <p className="text-sm text-gray-600">{track.subtitle}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-6">
                        <div className="space-y-4 pt-4 border-t">
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">What you would work on:</p>
                            <p className="text-gray-700">{track.description}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Skills that help:</p>
                            <p className="text-gray-700">{track.skills}</p>
                          </div>
                          <Button
                            onClick={() => prefillTrack(track.track)}
                            className="bg-[#C9A227] hover:bg-[#B8921F] mt-4"
                            data-cta={`careers_register_${track.track.toLowerCase()}`}
                          >
                            Register Interest in {track.title}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            How We Work
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Card key={index} className="p-6 border-2 hover:shadow-lg transition-all">
                  <Icon className="w-8 h-8 text-[#C9A227] mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{principle.title}</h3>
                  <p className="text-gray-700 text-sm">{principle.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            What You Can Expect
          </h2>

          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Competitive compensation</strong> — role-dependent, market-aligned</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Flexible work arrangements</strong> — where possible and role-appropriate</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Growth and learning</strong> — GRC, AI governance, and Saudi regulatory landscape</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span><strong>Meaningful responsibility</strong> — early ownership on high-impact work</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Register Interest Form */}
      <section id="register-form" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
              Register Interest
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Tell us what track you're interested in. We'll follow up when a relevant role opens.
            </p>

            {!formSubmitted ? (
              <Card className="p-8 border-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={errors.name ? 'text-red-600' : ''}>
                        {errors.name ? errors.name.message : 'Full Name *'}
                      </Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className={errors.email ? 'text-red-600' : ''}>
                        {errors.email ? errors.email.message : 'Email *'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location" className={errors.location ? 'text-red-600' : ''}>
                        {errors.location ? errors.location.message : 'Location *'}
                      </Label>
                      <Select
                        value={location}
                        onValueChange={(value) => setValue('location', value, { shouldValidate: true })}
                      >
                        <SelectTrigger id="location" className={errors.location ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="riyadh">Riyadh</SelectItem>
                          <SelectItem value="saudi">Saudi Arabia (other)</SelectItem>
                          <SelectItem value="gcc">GCC</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="track" className={errors.track ? 'text-red-600' : ''}>
                        {errors.track ? errors.track.message : 'Track *'}
                      </Label>
                      <Select
                        value={track}
                        onValueChange={(value) => setValue('track', value, { shouldValidate: true })}
                      >
                        <SelectTrigger id="track" className={errors.track ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select track" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Advisory">Advisory</SelectItem>
                          <SelectItem value="Managed Services">Managed Services</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                          <SelectItem value="Partnerships">Partnerships</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seniority" className={errors.seniority ? 'text-red-600' : ''}>
                      {errors.seniority ? errors.seniority.message : 'Seniority *'}
                    </Label>
                    <Select
                      value={seniority}
                      onValueChange={(value) => setValue('seniority', value, { shouldValidate: true })}
                    >
                      <SelectTrigger id="seniority" className={errors.seniority ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select seniority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="intern">Intern</SelectItem>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="mid">Mid-level</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="lead">Lead / Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className={errors.linkedin ? 'text-red-600' : ''}>
                        {errors.linkedin ? errors.linkedin.message : 'LinkedIn URL (optional)'}
                      </Label>
                      <Input
                        id="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        {...register('linkedin')}
                        className={errors.linkedin ? 'border-red-500' : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvLink" className={errors.cvLink ? 'text-red-600' : ''}>
                        {errors.cvLink ? errors.cvLink.message : 'CV Link (optional)'}
                      </Label>
                      <Input
                        id="cvLink"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        {...register('cvLink')}
                        className={errors.cvLink ? 'border-red-500' : ''}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className={errors.notes ? 'text-red-600' : ''}>
                      {errors.notes ? errors.notes.message : 'Notes (optional)'}
                    </Label>
                    <Textarea
                      id="notes"
                      rows={4}
                      placeholder="Tell us about your background, interests, or anything else relevant..."
                      {...register('notes')}
                      className={errors.notes ? 'border-red-500' : ''}
                    />
                  </div>

                  <p className="text-sm text-gray-600 italic">
                    We'll only use your information for recruitment purposes.
                  </p>

                  {serverError && (
                    <div className="text-red-600 text-sm text-center">
                      {serverError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                    data-cta="careers_register_interest"
                    disabled={isSubmitting || formSubmitted}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : formSubmitted ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Submitted!
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </form>
              </Card>
            ) : (
              <Card className="p-12 border-2 border-green-200 bg-green-50/50">
                <div className="text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Thanks!</h3>
                  <p className="text-green-800">
                    We'll be in touch when there's a fit.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Build sovereign, audit-ready transformation
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                Register Interest
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/company/contact'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

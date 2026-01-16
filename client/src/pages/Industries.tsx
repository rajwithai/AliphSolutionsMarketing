import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Building2, Zap, Heart, Radio, Briefcase, TrendingUp, CheckCircle2, ArrowRight, Shield, FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function Industries() {
  useSEO({
    title: 'Industries | Aliph Solutions',
    description: 'Saudi-first GRC advisory, managed services, and sovereign AI workflows—tailored to regulated sectors and fast-growing organizations.',
    keywords: 'Saudi industries, sector compliance, finance GRC, energy compliance, healthcare governance, SME compliance, giga-project readiness',
  });

  const [callModalOpen, setCallModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    sector: '',
    focus: '',
    timeline: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCallModalOpen(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        sector: '',
        focus: '',
        timeline: '',
        notes: ''
      });
    }, 2000);
  };

  const industries = [
    {
      title: 'Finance & Banking',
      icon: Building2,
      pressures: ['High audit scrutiny + governance requirements', 'Sensitive data handling + access control'],
      outcomes: ['PDPL readiness + evidence packs', 'Board governance + risk frameworks'],
      link: '/industries/finance-banking'
    },
    {
      title: 'Energy & Petrochemicals',
      icon: Zap,
      pressures: ['Operational continuity expectations', 'Vendor ecosystem + critical operations'],
      outcomes: ['NCA ECC readiness + control evidence', 'Vendor risk governance'],
      link: '/industries/energy-petrochemicals'
    },
    {
      title: 'Healthcare',
      icon: Heart,
      pressures: ['Highly sensitive personal data', 'Strict access and retention requirements'],
      outcomes: ['PDPL compliance + breach readiness', 'Governance + audit preparation'],
      link: '/industries/healthcare'
    },
    {
      title: 'Telecom & Digital Services',
      icon: Radio,
      pressures: ['Large-scale data environments', 'Cyber controls + vendor exposure'],
      outcomes: ['NCA ECC + PDPL readiness', 'Vendor risk + ERM foundation'],
      link: '/industries/telecom'
    },
    {
      title: 'Giga-project Vendors',
      icon: Briefcase,
      pressures: ['Procurement readiness expectations', 'Evidence for compliance + governance'],
      outcomes: ['Governance + evidence documentation', 'Vendor risk assessment readiness'],
      link: '/industries/giga-project-vendors'
    },
    {
      title: 'SMEs & Startups',
      icon: TrendingUp,
      pressures: ['Scaling fast with limited teams', 'Need structure without bureaucracy'],
      outcomes: ['PDPL + ZATCA basics', 'Governance foundation + audit prep'],
      link: '/industries/smes-startups'
    }
  ];

  return (
    <>
      {/* Sector Readiness Call Modal */}
      <Dialog open={callModalOpen} onOpenChange={setCallModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Request a Sector Readiness Call</DialogTitle>
            <DialogDescription>
              We'll respond with a sector-ready agenda and next steps.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-900 mb-2">Request Received</h3>
              <p className="text-green-800">
                We'll respond with a sector-ready agenda and next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="call-name">Full Name *</Label>
                  <Input
                    id="call-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="call-email">Work Email *</Label>
                  <Input
                    id="call-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="call-company">Company *</Label>
                  <Input
                    id="call-company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="call-role">Role *</Label>
                  <Input
                    id="call-role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="call-sector">Sector *</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                    <SelectTrigger id="call-sector">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="telecom">Telecom & Digital Services</SelectItem>
                      <SelectItem value="giga">Giga-project Vendors</SelectItem>
                      <SelectItem value="sme">SMEs & Startups</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="call-focus">Primary Focus</Label>
                  <Select value={formData.focus} onValueChange={(value) => setFormData({ ...formData, focus: value })}>
                    <SelectTrigger id="call-focus">
                      <SelectValue placeholder="Select focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdpl">PDPL</SelectItem>
                      <SelectItem value="nca-ecc">NCA ECC</SelectItem>
                      <SelectItem value="zatca">ZATCA</SelectItem>
                      <SelectItem value="governance">Governance</SelectItem>
                      <SelectItem value="erm">ERM</SelectItem>
                      <SelectItem value="ia">Internal Audit</SelectItem>
                      <SelectItem value="ai-governance">AI Governance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="call-timeline">Timeline</Label>
                <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                  <SelectTrigger id="call-timeline">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Now</SelectItem>
                    <SelectItem value="30">Within 30 days</SelectItem>
                    <SelectItem value="90">Within 90 days</SelectItem>
                    <SelectItem value="exploring">Exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="call-notes">Additional Notes</Label>
                <Textarea
                  id="call-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specific requirements or questions..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setCallModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]">
                  Request Call
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[75vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Saudi-first</span>
              <span>•</span>
              <span>Sector-ready</span>
              <span>•</span>
              <span>Audit-ready</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Industries
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Sector-aligned delivery for organizations that operate under regulatory pressure and real execution demands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setCallModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="industries_request_call"
              >
                Request a Sector Readiness Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/deliverables'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Request Sample Deliverables
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => window.location.href = '/technology/security-sovereignty'}
                className="text-white hover:bg-white/10"
              >
                Security & Sovereignty
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INDUSTRY SELECTOR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Find Your Sector
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group cursor-pointer"
                    onClick={() => window.location.href = industry.link}>
                <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                  <industry.icon className="w-8 h-8 text-[#C9A227]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{industry.title}</h3>
                
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Primary pressures:</p>
                  <ul className="space-y-1">
                    {industry.pressures.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Typical outcomes:</p>
                  <ul className="space-y-1">
                    {industry.outcomes.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1">
                  Explore sector
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE DELIVER ACROSS SECTORS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            What We Deliver Across Sectors
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Consistent outcomes, sector-adapted execution
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              'PDPL Readiness',
              'NCA ECC Readiness',
              'ZATCA Compliance Operations',
              'Corporate Governance',
              'ERM Foundation',
              'Internal Audit Enablement'
            ].map((outcome, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                  <span className="text-lg font-semibold text-gray-900">{outcome}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              View Sample Deliverables
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW WE ADAPT BY SECTOR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            How We Adapt by Sector
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Sector Control Mapping</h3>
              <p className="text-gray-600">
                Obligations → controls → evidence requirements, structured for your sector's regulatory environment.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Evidence Pack Packaging</h3>
              <p className="text-gray-600">
                Audit-ready documentation formatted for implementation owners, board reporting, and regulator review.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Governed Workflow Acceleration</h3>
              <p className="text-gray-600">
                Aliph Brain workflows + expert validation for faster, consistent delivery without losing rigor.
              </p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/aliph-brain'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              See the Aliph Brain
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
            >
              Security & Sovereignty
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get a Sector-Ready Plan
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Tell us your sector and timeline. We'll respond with a scoped plan and sample outputs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setCallModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              data-cta="industries_request_call"
            >
              Request Sector Readiness Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/deliverables'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Request Sample Deliverables
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you customize by sector?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. We adapt terminology, risk scenarios, control examples, and evidence formats for your sector (finance, energy, healthcare, etc.). Sector context is built into the Aliph Brain's organizational memory and validated by experts.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can you work with our existing teams?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. We complement internal compliance, risk, audit, and IT teams. Many engagements involve co-delivery—providing specialized regulatory expertise, structured deliverables, and capacity during peak periods or growth.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What do we receive?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Evidence-ready deliverable packs including: policies, control mappings, gap analyses, roadmaps, implementation guides, evidence checklists, and board reporting frameworks. Everything is designed for audit and implementation—not just documentation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you handle sensitive data?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The Aliph Brain supports deployment patterns for stricter environments, including data boundary controls, enhanced logging, and on-premise or private cloud configurations. We can discuss specific sovereignty or confidentiality requirements and validate feasibility.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

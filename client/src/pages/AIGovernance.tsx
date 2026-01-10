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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye, Shield, FileText, CheckCircle2, AlertTriangle, ArrowRight, Lock, Users, Zap } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function AIGovernance() {
  useSEO({
    title: 'AI Governance | Aliph Solutions',
    description: 'Governed AI adoption for Saudi organizations—policies, operating model, controls, auditability, and safe workflows aligned to PDPL-era expectations.',
    keywords: 'AI governance, governed AI, AI policy, AI controls, AI audit, PDPL AI, Saudi AI governance',
  });

  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    sector: '',
    currentStatus: '',
    primaryConcern: '',
    timeline: '',
    notes: ''
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request submitted:', demoFormData);
    setDemoSubmitted(true);
  };

  const pillars = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Visibility',
      description: 'Know where AI is used, by whom, and for what purpose across the organization.'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Data Control',
      description: 'Minimize exposure, implement masking patterns, and control what data flows to AI systems.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Policy & Boundaries',
      description: 'Clear acceptable use rules—what is allowed, prohibited, and who can approve exceptions.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Auditability',
      description: 'Logs, versioning, approval trails—everything documented for internal audit and regulators.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Safe Internal Option',
      description: 'Approved workflows and tools that meet governance requirements while enabling productivity.'
    }
  ];

  const operatingRoles = [
    { role: 'Executive Sponsor', responsibility: 'Strategic direction, budget approval, escalation authority' },
    { role: 'Risk/Compliance', responsibility: 'Policy ownership, risk assessment, audit coordination' },
    { role: 'IT/Security', responsibility: 'Technical controls, logging infrastructure, access management' },
    { role: 'Data/Privacy', responsibility: 'Data handling patterns, PDPL alignment, breach protocols' },
    { role: 'Business Owners', responsibility: 'Use case intake, workflow approval, training rollout' },
    { role: 'Internal Audit', responsibility: 'Assurance testing, control validation, evidence review' }
  ];

  const controlFramework = [
    {
      category: 'People',
      controls: ['Training & awareness programs', 'Acceptable use acknowledgment', 'Approval workflows for exceptions', 'Role-based access permissions']
    },
    {
      category: 'Process',
      controls: ['Use case intake & review', 'Risk assessment templates', 'Escalation procedures', 'Periodic usage reviews']
    },
    {
      category: 'Technology',
      controls: ['Access controls & authentication', 'Data masking patterns', 'Audit logging infrastructure', 'Workflow validation layers']
    },
    {
      category: 'Assurance',
      controls: ['Control testing protocols', 'Audit evidence packaging', 'Output quality reviews', 'Compliance reporting']
    }
  ];

  const deliverables = [
    { title: 'AI Acceptable Use Policy', desc: 'Structured policy defining permitted/prohibited use' },
    { title: 'AI Risk Register', desc: 'Format for tracking AI-related risks and controls' },
    { title: 'AI Approval & Exception Process', desc: 'SOP for use case review and exception handling' },
    { title: 'Data Handling Guidelines for AI', desc: 'Principles for minimization, masking, retention' },
    { title: 'Logging & Audit Checklist', desc: 'Evidence-ready documentation requirements' },
    { title: 'AI Governance Operating Model', desc: 'Roles, RACI, decision rights, reporting cadence' },
    { title: 'Training Pack', desc: 'Awareness materials with do/don\'t scenarios' },
    { title: 'Implementation Roadmap', desc: '30/60/90-day plan format with milestones' }
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[75vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Visibility</span>
              <span>•</span>
              <span>Control</span>
              <span>•</span>
              <span>Auditability</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              AI Governance
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Governed AI means your organization can adopt AI at speed—while keeping data control, clear usage boundaries, and audit-ready traceability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={() => window.location.href = '/company/contact'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="ai_governance_exposure_check"
              >
                Run AI Exposure Check
              </Button>
              <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    data-cta="ai_governance_request_demo"
                  >
                    Request AI Governance Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Request AI Governance Demo</DialogTitle>
                    <DialogDescription>
                      We'll respond with a demo agenda and next steps tailored to your environment.
                    </DialogDescription>
                  </DialogHeader>
                  {demoSubmitted ? (
                    <div className="py-8 text-center">
                      <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Request Received</h3>
                      <p className="text-gray-600">
                        We'll respond with a demo agenda and next steps within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleDemoSubmit} className="space-y-4 mt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="demo-name">Name *</Label>
                          <Input
                            id="demo-name"
                            required
                            value={demoFormData.name}
                            onChange={(e) => setDemoFormData({ ...demoFormData, name: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="demo-email">Email *</Label>
                          <Input
                            id="demo-email"
                            type="email"
                            required
                            value={demoFormData.email}
                            onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="demo-company">Company *</Label>
                          <Input
                            id="demo-company"
                            required
                            value={demoFormData.company}
                            onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="demo-role">Role *</Label>
                          <Input
                            id="demo-role"
                            required
                            value={demoFormData.role}
                            onChange={(e) => setDemoFormData({ ...demoFormData, role: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="demo-sector">Sector *</Label>
                        <Select value={demoFormData.sector} onValueChange={(value) => setDemoFormData({ ...demoFormData, sector: value })}>
                          <SelectTrigger id="demo-sector" className="mt-1">
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="finance">Finance & Banking</SelectItem>
                            <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="telecom">Telecom & Digital</SelectItem>
                            <SelectItem value="government">Government</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="demo-status">Current AI Status</Label>
                        <Select value={demoFormData.currentStatus} onValueChange={(value) => setDemoFormData({ ...demoFormData, currentStatus: value })}>
                          <SelectTrigger id="demo-status" className="mt-1">
                            <SelectValue placeholder="Select current status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unknown">Unknown</SelectItem>
                            <SelectItem value="some-use">Some use</SelectItem>
                            <SelectItem value="formal">Formal programs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="demo-concern">Primary Concern</Label>
                        <Select value={demoFormData.primaryConcern} onValueChange={(value) => setDemoFormData({ ...demoFormData, primaryConcern: value })}>
                          <SelectTrigger id="demo-concern" className="mt-1">
                            <SelectValue placeholder="Select primary concern" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="data-exposure">Data exposure</SelectItem>
                            <SelectItem value="auditability">Auditability</SelectItem>
                            <SelectItem value="policy">Policy</SelectItem>
                            <SelectItem value="deployment">Deployment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="demo-timeline">Timeline</Label>
                        <Select value={demoFormData.timeline} onValueChange={(value) => setDemoFormData({ ...demoFormData, timeline: value })}>
                          <SelectTrigger id="demo-timeline" className="mt-1">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="now">Now</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="demo-notes">Notes</Label>
                        <Textarea
                          id="demo-notes"
                          rows={3}
                          value={demoFormData.notes}
                          onChange={(e) => setDemoFormData({ ...demoFormData, notes: e.target.value })}
                          placeholder="Specific questions or context..."
                          className="mt-1"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-[#C9A227] hover:bg-[#B8921F]">
                        Request Demo
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <a
              href="/technology/security-sovereignty"
              className="text-sm text-[#C9A227] hover:text-[#B8921F] inline-flex items-center gap-1"
            >
              Security & Sovereignty <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* THE REALITY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            AI adoption is happening—whether it's approved or not.
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            The reality most organizations face today
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 border-2 hover:border-amber-500 transition-all">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <p className="text-gray-700">Teams use public AI tools for speed without formal approval</p>
            </Card>

            <Card className="p-6 border-2 hover:border-amber-500 transition-all">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <p className="text-gray-700">Sensitive data can be copied into external systems unintentionally</p>
            </Card>

            <Card className="p-6 border-2 hover:border-amber-500 transition-all">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <p className="text-gray-700">No consistent logging or review of what's generated or shared</p>
            </Card>

            <Card className="p-6 border-2 hover:border-amber-500 transition-all">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <p className="text-gray-700">Policies lag behind actual behavior and organizational needs</p>
            </Card>
          </div>

          <Card className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-amber-50 to-white border-2 border-amber-300">
            <p className="text-2xl font-bold text-gray-900 text-center">
              The risk isn't AI. The risk is unmanaged AI.
            </p>
          </Card>
        </div>
      </section>

      {/* 5 PILLARS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            The 5 Pillars of Governed AI
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {pillars.map((pillar, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group">
                <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 text-[#C9A227] group-hover:bg-[#C9A227]/20 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </Card>
            ))}
          </div>

          <p className="text-center text-gray-700 italic max-w-2xl mx-auto">
            If one pillar is missing, adoption becomes exposure.
          </p>
        </div>
      </section>

      {/* OPERATING MODEL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Operating Model (Who Owns What)
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Clear roles, decision rights, and reporting cadence
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {operatingRoles.map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.role}</h3>
                    <p className="text-sm text-gray-600">{item.responsibility}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => window.location.href = '/deliverables'}
              variant="outline"
              data-cta="ai_governance_request_samples"
            >
              Request an Operating Model Sample
            </Button>
          </div>
        </div>
      </section>

      {/* CONTROL FRAMEWORK */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Controls That Make AI Safe
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {controlFramework.map((bucket, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{bucket.category}</h3>
                <ul className="space-y-2">
                  {bucket.controls.map((control, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <span>{control}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600 italic">
            Controls are tailored to your sector and environment.
          </p>
        </div>
      </section>

      {/* HOW ALIPH ENABLES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            How Aliph Enables Governed AI Adoption
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            {[
              { step: '1', title: 'AI Exposure Assessment', desc: 'Discover current usage patterns and risk signals across the organization' },
              { step: '2', title: 'Policy + Acceptable Use Boundaries', desc: 'Define what is allowed, prohibited, and exception processes' },
              { step: '3', title: 'Data Handling Patterns', desc: 'Establish minimization, masking, and retention protocols' },
              { step: '4', title: 'Workflow Enablement', desc: 'Deploy approved internal workflows that meet governance requirements' },
              { step: '5', title: 'Logging + Auditability Setup', desc: 'Implement tracing for outputs, approvals, and usage patterns' },
              { step: '6', title: 'Rollout + Training + Continuous Improvement', desc: 'Launch awareness programs and establish review cadence' }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#C9A227] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/technology/aliph-brain" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              The Aliph Brain (Workflows)
            </a>
            <span className="text-gray-400">•</span>
            <a href="/technology/security-sovereignty" className="text-[#C9A227] hover:text-[#B8921F] font-medium underline">
              Security & Sovereignty
            </a>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            AI Governance Deliverables
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Tangible, audit-ready outputs from the AI Governance Pack
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {deliverables.map((item, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <FileText className="w-8 h-8 text-[#C9A227] mb-3" />
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
            >
              Request Sample Deliverables
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
              data-cta="ai_governance_speak_to_architect"
            >
              Speak to an Architect
            </Button>
          </div>
        </div>
      </section>

      {/* GOVERNANCE DIAGRAM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Governance Layer (Simplified)
          </h2>

          <div className="max-w-5xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-12 bg-[#C9A227]/10 border-2 border-[#C9A227] rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    User
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-32 h-12 bg-indigo-100 border-2 border-indigo-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    Approved Workflow
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-32 h-12 bg-blue-100 border-2 border-blue-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    Policy Enforcement
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-28 h-12 bg-green-100 border-2 border-green-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    Privacy Layer
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-20 h-12 bg-purple-100 border-2 border-purple-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    Model
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="w-24 h-12 bg-emerald-100 border-2 border-emerald-300 rounded flex items-center justify-center text-sm font-semibold text-gray-900">
                    Output
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-4">
                  <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-[#C9A227]" />
                    <p className="text-sm text-gray-700 font-semibold">Underneath: Audit Log + Evidence Checklist</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Adopt AI without losing control.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Run an exposure check or request a demo. We'll show the practical path to governed AI adoption in your environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              onClick={() => window.location.href = '/company/contact'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              Run AI Exposure Check
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setDemoModalOpen(true)}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Request AI Governance Demo
            </Button>
          </div>
          <a
            href="/technology/security-sovereignty"
            className="text-sm text-[#C9A227] hover:text-[#B8921F] underline"
          >
            View Security & Sovereignty →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Is AI governance only for large enterprises?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                No. High-growth SMEs and mid-market organizations also need governance—especially when handling regulated data or preparing for audit. We offer phased implementation that scales to your current needs and maturity level.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you handle sensitive data?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Through data minimization, masking patterns, and controlled workflows. We help you establish protocols that prevent unnecessary exposure while enabling productive AI use. Specific handling depends on your sector and data classification requirements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you ensure quality and reduce hallucinations?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Through validation layers and output review gates. Workflows include consistency checks, source citation requirements, and expert review where needed. We don't eliminate AI errors completely—we structure controls to catch and correct them before they become problems.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do we need to stop AI usage to govern it?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Not necessarily. We often implement governance in phases while teams continue working. The goal is to channel existing usage into approved workflows and add visibility/controls—not to stop productivity. Where high-risk usage exists, we may recommend temporary restrictions while alternatives are deployed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How long does it take to get governed?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Basic governance (policy + operating model + initial controls) can be established in 30-60 days. Full deployment including workflow enablement, training, and audit readiness typically takes 90 days. Timelines depend on your starting point and complexity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What do we receive?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The AI Governance Pack includes policy templates, operating model with RACI, risk register format, approval processes, data handling guidelines, logging checklists, training materials, and implementation roadmap. All deliverables are evidence-ready and structured for audit review.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

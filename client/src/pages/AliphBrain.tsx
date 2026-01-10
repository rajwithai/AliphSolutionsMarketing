import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Brain, FileText, Shield, CheckCircle2, ArrowRight, Zap, Users, Database, Eye, Lock, AlertTriangle, Workflow, Building2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

export default function AliphBrain() {
  useSEO({
    title: 'Aliph Brain | Saudi GRC Advisory Engine',
    description: 'The Aliph Brain is a sovereign-by-design workflow engine and organizational memory for Saudi GRC—turning PDPL, NCA ECC, ZATCA, and governance requirements into audit-ready deliverables with expert validation.',
    keywords: 'Aliph Brain, GRC automation, Saudi compliance, workflow engine, PDPL automation, regulatory technology, Saudi Arabia',
  });

  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    sector: '',
    focus: '',
    timeline: '',
    notes: ''
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo form submitted:', demoFormData);
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setDemoModalOpen(false);
      setDemoFormData({
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

  return (
    <>
      {/* Demo Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Request an Aliph Brain Demo</DialogTitle>
            <DialogDescription>
              See how governed workflows produce audit-ready outputs faster
            </DialogDescription>
          </DialogHeader>

          {demoSubmitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-900 mb-2">Request Received</h3>
              <p className="text-green-800">
                We'll share a demo agenda and confirm a time.
              </p>
            </div>
          ) : (
            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demo-name">Full Name *</Label>
                  <Input
                    id="demo-name"
                    required
                    value={demoFormData.name}
                    onChange={(e) => setDemoFormData({ ...demoFormData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-email">Work Email *</Label>
                  <Input
                    id="demo-email"
                    type="email"
                    required
                    value={demoFormData.email}
                    onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demo-company">Company *</Label>
                  <Input
                    id="demo-company"
                    required
                    value={demoFormData.company}
                    onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-role">Role *</Label>
                  <Input
                    id="demo-role"
                    required
                    value={demoFormData.role}
                    onChange={(e) => setDemoFormData({ ...demoFormData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demo-sector">Sector</Label>
                  <Select value={demoFormData.sector} onValueChange={(value) => setDemoFormData({ ...demoFormData, sector: value })}>
                    <SelectTrigger id="demo-sector">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="energy">Energy & Petrochemicals</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="giga">Giga Vendor</SelectItem>
                      <SelectItem value="sme">SME</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-focus">Focus Area</Label>
                  <Select value={demoFormData.focus} onValueChange={(value) => setDemoFormData({ ...demoFormData, focus: value })}>
                    <SelectTrigger id="demo-focus">
                      <SelectValue placeholder="Select focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdpl">PDPL</SelectItem>
                      <SelectItem value="nca-ecc">NCA ECC</SelectItem>
                      <SelectItem value="zatca">ZATCA</SelectItem>
                      <SelectItem value="governance">Governance</SelectItem>
                      <SelectItem value="erm">ERM</SelectItem>
                      <SelectItem value="internal-audit">Internal Audit</SelectItem>
                      <SelectItem value="ai-governance">AI Governance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-timeline">Timeline</Label>
                <Select value={demoFormData.timeline} onValueChange={(value) => setDemoFormData({ ...demoFormData, timeline: value })}>
                  <SelectTrigger id="demo-timeline">
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
                <Label htmlFor="demo-notes">Additional Notes</Label>
                <Textarea
                  id="demo-notes"
                  rows={3}
                  value={demoFormData.notes}
                  onChange={(e) => setDemoFormData({ ...demoFormData, notes: e.target.value })}
                  placeholder="Specific requirements or questions..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setDemoModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-[#C9A227] hover:bg-[#B8921F]">
                  Request Demo
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#C9A227]">
              <span>Sovereign-by-Design</span>
              <span>•</span>
              <span>Compounding Intelligence</span>
              <span>•</span>
              <span>Audit-Ready Delivery</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight flex items-center gap-4">
              <Brain className="w-16 h-16 md:w-20 md:h-20 text-[#C9A227]" />
              The Aliph Brain
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              A Saudi-first organizational memory and governed workflow engine—built to deliver consulting-grade GRC outputs faster, with control and auditability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => setDemoModalOpen(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
                data-cta="aliph_brain_request_demo"
              >
                Request an Aliph Brain Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/deliverables'}
                className="border-white/30 text-white hover:bg-white/10"
                data-cta="aliph_brain_request_samples"
              >
                Request Sample Deliverables
              </Button>
            </div>

            <a
              href="/technology/security-sovereignty"
              className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
              data-cta="aliph_brain_security_link"
            >
              <Shield className="w-4 h-4" />
              Security & Sovereignty
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Memory graph visual */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <circle cx="200" cy="150" r="60" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="100" cy="100" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="300" cy="100" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="100" cy="200" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <circle cx="300" cy="200" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
            <line x1="130" y1="110" x2="165" y2="140" stroke="#C9A227" strokeWidth="1" />
            <line x1="270" y1="110" x2="235" y2="140" stroke="#C9A227" strokeWidth="1" />
            <line x1="130" y1="190" x2="165" y2="160" stroke="#C9A227" strokeWidth="1" />
            <line x1="270" y1="190" x2="235" y2="160" stroke="#C9A227" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why Most Organizations Don't Scale Compliance
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-2 border-amber-200 bg-amber-50/50 hover:border-amber-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Regulations change faster than documentation
              </h3>
              <p className="text-gray-600">
                Updates to PDPL, NCA ECC, ZATCA require constant revision. Static deliverables go stale quickly.
              </p>
            </Card>

            <Card className="p-8 border-2 border-amber-200 bg-amber-50/50 hover:border-amber-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Knowledge lives in people, not systems
              </h3>
              <p className="text-gray-600">
                Advisory insights don't transfer. Every engagement starts from scratch. Lessons don't compound.
              </p>
            </Card>

            <Card className="p-8 border-2 border-amber-200 bg-amber-50/50 hover:border-amber-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                AI without governance creates exposure
              </h3>
              <p className="text-gray-600">
                Public tools are fast but uncontrolled. Data leaks, no audit trail, unclear accountability.
              </p>
            </Card>
          </div>

          <p className="text-center text-xl text-gray-700 max-w-3xl mx-auto border-l-4 border-[#C9A227] pl-6 italic">
            The Aliph Brain exists to turn Saudi regulatory complexity into repeatable execution.
          </p>
        </div>
      </section>

      {/* SECTION 3: WHAT IT IS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
            What the Aliph Brain Is
          </h2>

          <p className="text-2xl text-center text-gray-700 mb-16 max-w-4xl mx-auto font-medium">
            The Aliph Brain converts advisory knowledge into reusable workflows and evidence-ready deliverables—without sacrificing sovereignty or quality.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Database className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Organizational Memory</h3>
              <p className="text-gray-600">
                Saudi-first knowledge base covering PDPL, NCA ECC, ZATCA, governance frameworks, with client context boundary separation.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <Workflow className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Workflow Library</h3>
              <p className="text-gray-600">
                Agentic workflows that produce structured outputs—gap analyses, policy suites, control mappings, risk registers, audit plans.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-xl group">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/20 transition-colors">
                <CheckCircle2 className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Validation Layer</h3>
              <p className="text-gray-600">
                Expert review where required, automated QA checks, consistency validation, and evidence formatting.
              </p>
            </Card>
          </div>

          {/* What it is NOT */}
          <Card className="bg-red-50 border-2 border-red-200 p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              What the Aliph Brain is NOT
            </h3>
            <ul className="space-y-2 text-red-800">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Not a public chatbot without data controls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Not a generic template dump without context</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Not a black box without audit trail or explainability</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            The core engine: from intake to audit-ready output
          </p>

          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
              {[
                { label: 'Intake', icon: FileText, desc: 'Objective + sector + regulation' },
                { label: 'Context', icon: Database, desc: 'Brain + client materials' },
                { label: 'Generation', icon: Workflow, desc: 'Governed workflows' },
                { label: 'QA Checks', icon: CheckCircle2, desc: 'Rules + scoring' },
                { label: 'Validation', icon: Users, desc: 'Expert review' },
                { label: 'Packaging', icon: FileText, desc: 'Deliverable + evidence' },
                { label: 'Audit Log', icon: Eye, desc: 'Traceability' },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#C9A227]/30 text-center hover:border-[#C9A227] transition-all">
                    <step.icon className="w-6 h-6 mx-auto mb-2 text-[#C9A227]" />
                    <p className="text-xs font-bold text-gray-900 mb-1">{step.label}</p>
                    <p className="text-xs text-gray-600">{step.desc}</p>
                  </Card>
                  {idx < 6 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A227] z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Output formats */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">Output Formats</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2">
                <h4 className="font-bold text-gray-900 mb-3">Documentation</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• PDF deliverable packs</li>
                  <li>• Word/Doc templates (redacted samples)</li>
                  <li>• Implementation roadmaps</li>
                </ul>
              </Card>
              <Card className="p-6 border-2">
                <h4 className="font-bold text-gray-900 mb-3">Structured Outputs</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Excel registers (risk, compliance tracker)</li>
                  <li>• Slide-ready board summaries</li>
                  <li>• Evidence pack formats</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WORKFLOWS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            What the Aliph Brain Can Produce
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Workflow capabilities without exposing full IP
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'PDPL Gap & Roadmap Builder',
                inputs: 'Current state + obligations',
                output: 'Gap analysis + remediation roadmap'
              },
              {
                title: 'NCA ECC Controls Mapping Builder',
                inputs: 'Scope + current controls',
                output: 'Control mapping + evidence requirements'
              },
              {
                title: 'ZATCA Compliance Ops Builder',
                inputs: 'Business processes + tax obligations',
                output: 'Compliance cadence + operating procedures'
              },
              {
                title: 'Policy Suite Generator',
                inputs: 'Sector + regulatory scope',
                output: 'Full policy suite (governance/compliance)'
              },
              {
                title: 'Evidence Pack Builder',
                inputs: 'Requirements + current artifacts',
                output: 'Audit-ready evidence documentation'
              },
              {
                title: 'Risk Register + KRIs Builder',
                inputs: 'Risk universe + appetite',
                output: 'Risk register + KRI dashboard'
              },
              {
                title: 'Internal Audit Plan Builder',
                inputs: 'Universe + risk assessment',
                output: 'Annual audit plan + methodology'
              },
              {
                title: 'Third-Party Risk Assessment',
                inputs: 'Vendor profile + criticality',
                output: 'Risk assessment + monitoring cadence'
              },
              {
                title: 'Board Governance Toolkit',
                inputs: 'Structure + regulatory requirements',
                output: 'Charters + DoA + reporting pack'
              },
              {
                title: 'Regulatory Change Monitor',
                inputs: 'Subscribed regulations',
                output: 'Change summaries + impact analysis'
              },
            ].map((workflow, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg group">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center mb-4">
                  <Workflow className="w-6 h-6 text-[#C9A227]" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{workflow.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-600"><span className="font-semibold">Inputs:</span> {workflow.inputs}</p>
                  <p className="text-xs text-gray-600"><span className="font-semibold">Output:</span> {workflow.output}</p>
                </div>
                <a
                  href="/deliverables"
                  className="text-[#C9A227] hover:text-[#B8921F] text-sm font-medium inline-flex items-center gap-1"
                >
                  See sample output
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: DIFFERENTIATION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            How We're Different
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Generic AI */}
            <Card className="p-8 bg-white border-2">
              <div className="text-center mb-4">
                <Zap className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Generic AI Tools</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Fast drafts
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Weak governance
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Unclear data boundary
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  No audit structure
                </li>
              </ul>
            </Card>

            {/* Traditional Consulting */}
            <Card className="p-8 bg-white border-2">
              <div className="text-center mb-4">
                <Building2 className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Traditional Consulting</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Rigorous methodology
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Slower cycles
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Manual repetition
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Knowledge trapped in teams
                </li>
              </ul>
            </Card>

            {/* Aliph Brain + Advisory */}
            <Card className="p-8 bg-gradient-to-br from-[#C9A227] to-[#B8921F] text-white border-2 border-[#C9A227] shadow-xl transform hover:scale-105 transition-all">
              <div className="text-center mb-4">
                <Brain className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold">Aliph Brain + Advisory</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Governed workflows
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Sovereignty patterns
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Expert validation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Evidence-ready packaging
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Compounding improvement
                </li>
              </ul>
            </Card>
          </div>

          <p className="text-center text-xl text-gray-700 max-w-3xl mx-auto font-medium italic">
            Service-backed delivery today. Workflow-scaled advantage tomorrow.
          </p>
        </div>
      </section>

      {/* SECTION 7: SECURITY & SOVEREIGNTY */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Built to Respect Sovereignty
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Control, auditability, and deployment flexibility
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {[
              'Data minimization patterns by design',
              'Policy enforcement and access control at workflow layer',
              'Audit logs and traceability for every step',
              'Deployment patterns for stricter environments when required'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#C9A227] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/technology/security-sovereignty'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              data-cta="aliph_brain_security_link"
            >
              Read Security & Sovereignty
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setDemoModalOpen(true)}
              data-cta="aliph_brain_speak_to_architect"
            >
              Speak to an Architect
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8: DELIVERABLE PACKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Outcome Packs Delivered Through the Brain
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            What you receive at the end of an engagement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'PDPL Readiness Pack', items: ['Gap analysis', 'Policy suite', 'Evidence documentation'] },
              { title: 'NCA ECC Readiness Pack', items: ['Control mapping', 'Implementation roadmap', 'Audit prep'] },
              { title: 'ZATCA Compliance Operations Pack', items: ['Process controls', 'Operating cadence', 'Records checklist'] },
              { title: 'Corporate Governance Pack', items: ['DoA matrix', 'Board charters', 'Reporting framework'] },
              { title: 'ERM Foundation Pack', items: ['Risk taxonomy', 'Appetite statements', 'KRI dashboard'] },
              { title: 'Internal Audit Enablement Pack', items: ['Audit charter', 'Annual plan', 'Methodology'] },
            ].map((pack, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#C9A227]" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{pack.title}</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {pack.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/deliverables'}
              className="bg-[#C9A227] hover:bg-[#B8921F]"
              data-cta="aliph_brain_request_samples"
            >
              Request Sample Deliverables
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setDemoModalOpen(true)}
              data-cta="aliph_brain_request_demo"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9: DEMO CTA BAND */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See the Aliph Brain in Action
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            A short demo showing how workflows produce audit-ready outputs—faster, governed, and implementation-first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              data-cta="aliph_brain_request_demo"
            >
              Request a Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/company/contact'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Book a Readiness Call
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Is Aliph a software product?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Aliph is an AI-enabled advisory service. The Aliph Brain is the internal engine we use to deliver faster, governed, and more consistent outputs. You work with experts who use the Brain to produce audit-ready deliverables.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do you avoid hallucinations?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Through governed workflows, validation layers, and expert review. Outputs go through automated QA checks, consistency validation, and—when required—expert sign-off before delivery. We don't blindly trust AI generation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you customize by sector?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. The workflows adapt terminology, risk scenarios, and control examples for your industry (finance, energy, healthcare, etc.). Sector context is built into the Brain's organizational memory.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can you work under strict data requirements?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. The Brain supports deployment patterns for stricter environments, including private boundaries and enhanced logging. We can discuss your specific requirements and validate feasibility.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What do we receive at the end?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Evidence-ready deliverable packs including: policies, control mappings, gap analyses, roadmaps, implementation guides, owners, and evidence formats. Everything is designed for audit and implementation—not just documentation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do we start?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Request a demo or sample deliverables to see the quality. If it's a fit, we scope your engagement (PDPL, NCA ECC, ZATCA, governance, etc.), run the workflows, validate outputs, and deliver your outcome pack with implementation support.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

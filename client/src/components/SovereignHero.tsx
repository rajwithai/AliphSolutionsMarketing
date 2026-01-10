import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle2, FileCheck, Brain, Lock, Server, Zap } from 'lucide-react';

export default function SovereignHero({ onDemoClick, onPartnershipClick }: { onDemoClick: () => void, onPartnershipClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax for the visual background of the first section
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      {/* HERO SECTION 1: SLIM, TOP FOLD */}
      <section
        ref={containerRef}
        className="relative min-h-[90vh] flex items-center justify-center bg-[#060910] text-white overflow-hidden pt-20 pb-16 md:pt-28"
      >
        {/* BACKGROUND VISUAL: ABSTRACT SAUDI SOVEREIGN GRID */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{ y: y1, opacity }}
            className="relative w-full h-full"
          >
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 via-transparent to-transparent" />

            {/* Islamic Geometry Inspired Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamic-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  {/* Geometric lines forming a lattice */}
                  <path
                    d="M 50 0 L 100 50 L 50 100 L 0 50 Z"
                    fill="none"
                    stroke="#C9A227"
                    strokeWidth="0.5"
                  />
                  <circle cx="50" cy="50" r="1" fill="#C9A227" />
                  <circle cx="0" cy="50" r="0.5" fill="#C9A227" />
                  <circle cx="100" cy="50" r="0.5" fill="#C9A227" />
                </pattern>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamic-grid)" />

              {/* Center Mask to enhance text readability */}
              <rect width="100%" height="100%" fill="url(#center-mask)" style={{ mixBlendMode: 'multiply' }} />
              <radialGradient id="center-mask" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="black" stopOpacity="0.8" />
                <stop offset="60%" stopColor="black" stopOpacity="0.4" />
                <stop offset="100%" stopColor="black" stopOpacity="0.0" />
              </radialGradient>

              {/* Pulsing Nodes Representing GRC & AI - Distributed Symmetrically */}
              <g filter="url(#glow)">
                <PulsingNode x="15%" y="25%" label="Governance" delay={0} />
                <PulsingNode x="85%" y="25%" label="Risk" delay={2} />
                <PulsingNode x="20%" y="70%" label="Compliance" delay={4} />
                <PulsingNode x="80%" y="70%" label="AI" delay={1} />
              </g>
            </svg>

            {/* Ambient Light Drift - Symmetrical */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#C9A227]/5 rounded-full blur-[100px]"
            />
          </motion.div>
        </div>

        {/* CONTENT CONTAINER - CENTERED */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center mb-6 md:mb-8"
          >
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-2 md:mb-3 text-center">
              Sovereign AI-Enabled <span className="text-[#C9A227]">GRC Advisory</span>
            </span>
            <span className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-400 tracking-tight text-center">
              Empowering Saudi Enterprises for Vision 2030
            </span>
          </motion.h1>

          {/* SUBHEADLINE (2-3 lines) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-gray-300/90 mb-8 leading-relaxed font-light max-w-3xl mx-auto"
          >
            <p className="mb-2">
              Big Four-grade advisory delivered through governed, Kingdom-first AI infrastructure.
            </p>
            <p>
              Audit-ready outcomes for PDPL, NCA, CMA, SAMA, and national-scale governance — with full data sovereignty.
            </p>
          </motion.div>

          {/* BADGES (Pills) */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
            <TrustChip icon={Shield} text="Vision 2030 Aligned" delay={0.4} />
            <TrustChip icon={CheckCircle2} text="Sovereign-by-Design" delay={0.5} />
            <TrustChip icon={FileCheck} text="Audit-Ready Outputs" delay={0.6} />
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto relative z-20"
            >
              <Button
                size="lg"
                onClick={onDemoClick}
                className="h-14 px-10 bg-[#C9A227] hover:bg-[#B8921F] text-black font-semibold text-lg transition-all shadow-[0_0_30px_rgba(201,162,39,0.15)] hover:shadow-[0_0_40px_rgba(201,162,39,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 w-full sm:w-auto"
              >
                Request Sovereign Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onPartnershipClick}
                className="h-14 px-8 bg-white/[0.02] border-white/20 hover:border-white/40 text-gray-200 hover:text-white hover:bg-white/5 text-lg font-medium transition-all duration-300 active:scale-95 w-full sm:w-auto"
              >
                Explore Institutional Partnership
              </Button>
            </motion.div>

            {/* FOOTER LINE */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xs md:text-sm text-gray-500 tracking-wide font-medium relative z-10 text-center"
            >
              Designed for Saudi regulatory environments. Deployed with full data sovereignty.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE SOVEREIGN ADVANTAGE */}
      <section className="relative py-24 bg-[#0B1220] text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column: Headline & Bio */}
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Proven Expertise Meets <br />
                <span className="text-[#C9A227]">Advanced Sovereign AI</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-6 text-gray-300 text-lg leading-relaxed font-light"
              >
                <p>
                  We combine 30+ years of proven Big Four expertise—serving PIF portfolio companies,
                  major enterprises, and regulators—with a state-of-the-art sovereign AI architecture
                  designed specifically for the Kingdom.
                </p>
                <p className="font-medium text-white/90">
                  We understand the pressures of delivering Vision 2030 commitments while maintaining
                  sovereignty and regulatory excellence. We are honored to support your GRC priorities
                  in this transformative era.
                </p>
              </motion.div>
            </div>

            {/* Right Column: Features List */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle accent blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A227]/5 blur-[80px] rounded-full pointer-events-none" />

              <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
                <Brain className="w-6 h-6 text-[#C9A227]" />
                Aliph Brain Advantage
              </h3>

              <ul className="space-y-5">
                <AdvantageItem
                  icon={Server}
                  text="PDPL-compliant data residency in the KSA Azure Region"
                />
                <AdvantageItem
                  icon={Zap}
                  text="Edge-ready deployment for maximum control"
                />
                <AdvantageItem
                  icon={CheckCircle2}
                  text="Unbreakable compliance validation (never bypassed)"
                />
                <AdvantageItem
                  icon={Lock}
                  text="Accelerating your responsible digital transformation"
                />
              </ul>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

function TrustChip({ icon: Icon, text, delay }: { icon: any, text: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/[0.03] border border-[#C9A227]/30 hover:bg-white/[0.05] transition-all duration-300"
    >
      <Icon className="w-3.5 h-3.5 text-[#C9A227]" />
      <span className="text-[10px] md:text-xs font-semibold text-gray-300 uppercase tracking-widest">{text}</span>
    </motion.div>
  );
}

function AdvantageItem({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <li className="flex items-start gap-4 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
      <div className="mt-1 p-1.5 rounded-lg bg-[#C9A227]/10 flex-shrink-0">
        <Icon className="w-5 h-5 text-[#C9A227]" />
      </div>
      <span className="text-gray-200 leading-snug">{text}</span>
    </li>
  );
}

function PulsingNode({ x, y, label, delay }: { x: string, y: string, label: string, delay: number }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r="3"
        fill="#C9A227"
        animate={{
          r: [2, 4, 2],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut"
        }}
      />
      <motion.text
        x={x}
        y={y}
        dy="-18"
        textAnchor="middle"
        fill="#C9A227"
        fontSize="10"
        fontWeight="700"
        style={{ opacity: 0.2, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace' }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: delay }}
      >
        {label}
      </motion.text>
    </g>
  );
}

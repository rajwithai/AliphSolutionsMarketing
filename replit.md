# Aliph Solutions - Saudi Arabia Advisory Platform

## Overview

Aliph Solutions is a comprehensive GRC (Governance, Risk & Compliance) advisory platform specifically designed for the Saudi Arabian market. The platform reimagines traditional consulting by providing direct access to elite, AI-enhanced expertise through a three-tiered service model. Built to support Vision 2030 transformation, it connects businesses with vetted local experts for governance, risk management, and compliance needs while ensuring alignment with Saudi regulatory requirements (CMA, SAMA, MOC, PDPL).

## Recent Changes

### October 25, 2025 - Tier Section Complete Redesign & Refinements
- Completely redesigned TierSection based on specifications with comprehensive refinements
- Implemented progressive flow visualization showing Tier 1 → 2 → 3 journey
- **Visual Design**:
  - Specific color scheme: #224EFF (Tier 1), #00BFA6 (Tier 2), #6C63FF (Tier 3)
  - Background gradient (#F9FAFF → #FFFFFF) with reduced mesh texture opacity (20%)
  - Horizontal flow on desktop, vertical stack on mobile
  - Forward-pointing arrows (→) showing progression, reversing for RTL
  - Equal height cards (min-height 480px) for visual consistency
  - Enhanced hover states: 6px lift + tier-colored shadow glow
- **Animations** (Framer Motion):
  - Cards slide in with 100ms stagger delay (snappier feel)
  - Progress bars animate to fill percentage on scroll
  - Connector glows pulse infinitely with 4s cycle
  - Pulse effect on hover for CTA button
- **Content Structure**:
  - Refined tier descriptions for better rhythm and clarity
  - Tier 1: Shortened to remove duplication ("instantly, anytime")
  - Tier 2: Changed "regulator-ready" to "ready for regulators"
  - Tier 3: Merged sentences for smoother reading flow
  - "Best for:" micro-copy for user self-identification
  - Time estimates with animated progress indicators
- **CTA**: "Compare the Tiers →" button with bold text, arrow icon, gradient (#224EFF → #6C63FF), pulse hover effect
- Full bilingual support (English/Arabic) with RTL layout and arrow reversal
- Accessibility improvements: semantic roles and ARIA attributes on progress bars
- Verified through comprehensive E2E testing: equal heights, forward arrows, hover effects, animations, responsive design, bilingual support

### October 24, 2025 - Final Homepage Content Polish
- Updated all homepage content to final production-ready copy per specifications
- Refined messaging across all sections with enhanced clarity and impact:
  - Hero: Emphasized "Saudi businesses" alignment with Vision 2030
  - Why Aliph: Changed "laws" to "regulations", "backed" to "validated"
  - Tier 2: New focus on "certified Saudi experts" and "regulator-ready" output
  - Aliph Brain: Added "understands compliance like your in-house legal team"
  - Knowledge Library: New subtitle emphasizing Seven Pillars framework
  - Why Choose: Updated to "Automation meets context" and "Built for Saudi enterprises"
  - Testimonials: Enhanced Vision 2030 alignment messaging
  - CTA: New tagline "No setup fees. No hidden retainers. Just clear results."
- Updated all Arabic translations to match refined English content
- Verified complete bilingual support through automated E2E testing
- All content now production-ready and aligned with final specifications

### October 23, 2025 - Homepage Content Overhaul
- Implemented comprehensive production-ready content across all homepage sections
- Created new component sections: WhyAliphSection, AliphBrainSection, KnowledgeLibrarySection, Vision2030Section, WhyChooseSection, TestimonialsSection
- Updated HeroSection with new messaging, trust indicators, and dual-CTA design
- Enhanced TierSection and CTASection with production-ready copy
- Expanded LanguageProvider with complete bilingual translations (English/Arabic) for all new content
- Verified end-to-end bilingual support with automated testing
- Homepage now follows: Hero → Why Aliph → Tiers → Brain → Library → Vision 2030 → Why Choose → Testimonials → CTA

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state and data fetching
- **Internationalization**: Custom LanguageProvider supporting English/Arabic with RTL layout support
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints with structured error handling and request logging
- **Validation**: Zod schemas for runtime type checking and data validation
- **Storage Interface**: Abstracted storage layer with in-memory implementation (designed for easy database migration)

### Component Design System
- **UI Components**: Radix UI primitives with custom styling for accessibility
- **Design Tokens**: CSS custom properties for theming and consistent visual hierarchy
- **Typography**: Inter font for English, Noto Sans Arabic for Arabic text
- **Color System**: Professional palette with deep navy primary, teal accents, and proper contrast ratios
- **Layout System**: Responsive grid layouts with consistent spacing using Tailwind utilities

### Internationalization Support
- **Languages**: English and Arabic with complete translation coverage
- **RTL Support**: Full right-to-left layout support for Arabic content
- **Cultural Adaptation**: Saudi-specific terminology and business context
- **SEO Optimization**: Multilingual meta tags and structured data

### Data Layer
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Type-safe database schema with automated migrations
- **Contact System**: Structured contact form submissions with inquiry categorization
- **User Management**: Basic user authentication schema (expandable for future features)

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL serverless database for scalability
- **UI Framework**: Radix UI for accessible, headless component primitives
- **Form Management**: React Hook Form with Hookform Resolvers for validation integration
- **Styling**: Tailwind CSS with PostCSS for advanced CSS processing
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build System**: Vite with custom configuration for optimal development experience
- **Type Checking**: TypeScript with strict configuration for code quality
- **Code Quality**: ESLint integration through Vite plugins
- **Runtime Error Handling**: Replit-specific error modal for development debugging

### Third-Party Integrations
- **Analytics Potential**: Structured for Google Analytics/Tag Manager integration
- **Email Services**: Ready for integration with transactional email providers
- **Payment Processing**: Architecture supports future payment gateway integration
- **CRM Integration**: Contact form designed for easy CRM system connectivity

### SEO and Performance
- **Meta Management**: Custom useSEO hook for dynamic meta tag management
- **Image Optimization**: Asset structure prepared for image optimization services
- **Search Engine Optimization**: Comprehensive meta tags, Open Graph, and Twitter Card support
- **Structured Data**: JSON-LD schema markup for enhanced search presence
# Aliph Solutions - Saudi Arabia Advisory Platform

## Overview

Aliph Solutions is a comprehensive GRC (Governance, Risk & Compliance) advisory platform specifically designed for the Saudi Arabian market. The platform reimagines traditional consulting by providing direct access to elite, AI-enhanced expertise through a three-tiered service model. Built to support Vision 2030 transformation, it connects businesses with vetted local experts for governance, risk management, and compliance needs while ensuring alignment with Saudi regulatory requirements (CMA, SAMA, MOC, PDPL).

## Recent Changes

### October 25, 2025 - Executive-Grade Tier Section Surgical Refinements
- Comprehensive micro-polish pass for boardroom-ready presentation quality
- **Micro-Copy Updates**:
  - "AI-Assisted" now hyphenated (was "AI Assisted")
  - Consistent time formatting: "< 15 min", "< 48 hours", "1–2 weeks" (en dash)
  - Removed redundant wording in Tier 1 description ("instantly, anytime" → "instantly")
  - Extended "Best for" lines to full sentences with 2-line max (line-clamp-2)
- **Visual Rhythm Adjustments**:
  - Card padding reduced to 20px (from 24px) for tighter layout
  - Section intro margin-bottom increased to 16px for better breathing room
  - Intro line-height set to 1.6 for improved scanning
  - All card heights standardized at 440px minimum with aligned baselines
- **Time Indicator Refinement**:
  - Reduced line opacity to 65% (from 100%) for subtlety
  - Implemented 10% saturation reduction on time labels via custom color math function
  - Right-aligned positioning maintained
- **Tier Badge Row Enhancement**:
  - Explicit 8px gap between badge and icon (previously implicit)
  - Added inner shadow and 1px white border at 20% opacity to badges
  - Icon size locked at 18px with strokeWidth 2
- **Interaction Polish**:
  - Border transition speed reduced to 160ms (from 300ms) for snappier response
  - All hover/focus styles applied to article element (not inner div) for reliable testing
  - Hover: translateY(-3px), intensified shadow, tier-colored border animation
  - Focus: 2px solid outline in tier color with 4px offset
- **Semantic & Accessibility Improvements**:
  - Wrapped cards in `<article>` tags with aria-labels
  - Added `role="article"` for semantic clarity
  - Used `<h3>` tags for tier titles
  - Full keyboard navigation with tabIndex={0} and visible focus rings
- **Analytics Integration**:
  - Added trackEvent() function for hover and click events
  - Console logging implementation (ready for production endpoint)
  - Events tracked: `how_it_works_card_hover`, `how_it_works_cta_click`
- **Clean-up**:
  - Removed "Explore the Knowledge Library" button from AliphBrainSection
  - Cleaned up unused imports
- Full architect review completed with no blocking defects
- All bilingual translations updated (English/Arabic)
- Production-ready with WCAG AA accessibility compliance

### October 25, 2025 - Boardroom-Ready Tier Section Redesign (Linear.app/Notion AI Style)
- Complete redesign from component-library aesthetic to minimal, corporate-modern premium design
- Achieved sleek, airy, purposeful interface matching Linear.app and Notion AI design language
- **Icon Treatment Simplification**:
  - Removed large 56px translucent gradient circles (looked like placeholders)
  - Replaced with small 18px inline outline icons next to tier badges
  - Icon glow effect on hover using drop-shadow filter (8px blur with tier color)
  - Icons positioned inline with badges using flex layout
- **Spacing Reduction (25% less padding)**:
  - Section padding: 80px top/bottom (reduced from 120px)
  - Card padding: 24px 28px (tightened from uniform 24px)
  - Card min-height: 440px (reduced from 480px)
  - Tighter, more focused layout prevents "empty corporate" feel
- **Unified Card Styling**:
  - White background with 14px border-radius
  - Subtle default shadow: 0 2px 8px rgba(0,0,0,0.05)
  - Hover shadow: 0 6px 18px rgba(0,0,0,0.08) with translateY(-3px) lift
  - Border: 1px solid rgba(0,0,0,0.08) → animates to tier color on hover
  - Cursor pointer for interactive feel
- **Progress Indicators Simplification**:
  - Removed circular timeline dots (childish appearance)
  - Replaced with elegant 2px horizontal line in tier color
  - Time text right-aligned below line with bold styling
  - Clean, business-grade, minimal aesthetic
- **Removed Unnecessary Elements**:
  - Deleted "Compare the Tiers" CTA button (added no functional value)
  - Deleted "Seamless Progression" tag (visual distraction)
  - Removed connector arrows between cards
  - Self-contained section with full focus on tier cards
- **Gradient Flow Addition**:
  - Subtle gradient line behind cards: linear-gradient(90deg, #224EFF, #00BFA6, #6C63FF)
  - Opacity 0.08, height 6px, blur 8px for AI system continuity
  - Desktop only (hidden on mobile)
  - Adds visual connection without clutter
- **Typography Polish**:
  - Headline: 42px, font-weight 700, letter-spacing -0.02em
  - Intro text: 70% width for better readability
  - "Best for": #5E5E80 color, italic, line-clamp-1 for single line
  - All text left-aligned within cards
- **Sophisticated Hover Interactions**:
  - Icon glow: drop-shadow animation with tier color
  - Border color: Smooth transition from gray to tier color
  - Text darkening: 10% using CSS color-mix
  - All transitions: 300ms for living, responsive feel
- Full bilingual support (English/Arabic) with RTL layout maintained
- Responsive grid: 3 columns desktop, single stack mobile
- E2E testing verified: icons, spacing, shadows, progress lines, hover effects, typography, responsiveness
- Production-ready for boardroom presentations and client demos

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
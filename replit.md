# Aliph Solutions - Saudi Arabia Advisory Platform

## Overview

Aliph Solutions is a comprehensive GRC (Governance, Risk & Compliance) advisory platform specifically designed for the Saudi Arabian market. The platform reimagines traditional consulting by providing direct access to elite, AI-enhanced expertise through a three-tiered service model. Built to support Vision 2030 transformation, it connects businesses with vetted local experts for governance, risk management, and compliance needs while ensuring alignment with Saudi regulatory requirements (CMA, SAMA, MOC, PDPL).

## Recent Changes

### October 25, 2025 - Premium SaaS-Grade Tier Section Redesign
- Completely redesigned TierSection with premium modernization following strict design specifications
- Transformed from template-style to production-ready enterprise design (Notion/Linear/Anthropic UI quality)
- **Card Layout Modernization**:
  - White background surfaces with 14px corner radius (from colored backgrounds)
  - Soft shadows: rgba(20, 40, 80, 0.06) → intensifies to rgba(20, 40, 80, 0.12) on hover
  - Subtle gradient overlay (#FFFFFF → #F8FAFF at 15% opacity) for depth
  - Hover lift: translateY -4px with smooth transitions
  - Equal height cards (min-height 480px) for visual consistency
- **Icon + Header Modernization**:
  - Replaced solid color icon blocks with outline icons (strokeWidth 2)
  - Icons inside 56px translucent gradient circles:
    * Tier 1: #224EFF → #5A7BFF at 20% opacity
    * Tier 2: #00BFA6 → #6DEDD1 at 20% opacity
    * Tier 3: #6C63FF → #A593FF at 20% opacity
  - Tier badge + icon aligned on same line (removed separate header bar)
  - Icon circles pulse on hover (scale 1 → 1.05)
- **Progress Bars → Micro Timelines**:
  - Replaced horizontal progress bars with dotted timeline system
  - 3 dots per tier (10px diameter), state-based coloring:
    * Tier 1: 1 filled dot, 2 empty
    * Tier 2: 2 filled dots, 1 empty
    * Tier 3: 3 filled dots
  - Animated scale-in with stagger, full accessibility (ARIA + test IDs)
- **Premium CTA Button**:
  - Pill shape (50px border-radius) with gradient: linear(90deg, #224EFF, #6C63FF)
  - Padding: 14px 32px, Font: SemiBold 15px
  - Hover: Gradient shifts to (#5A7BFF → #A593FF)
  - Custom implementation with inner glow + shadow
- **Background Enhancement**:
  - Radial gradient centered on Tier 2 (#F8FAFF → #FFFFFF)
  - Reduced mesh texture opacity to 10% (from 20%)
  - 120px top/bottom padding for proper whitespace
- **Motion Polish**:
  - Cards slide in with 100ms stagger (snappier feel)
  - Icon circles pulse on hover with Framer Motion
  - Connector shimmer animation: 3s infinite cycle
  - Timeline dots scale in with stagger
- Full bilingual support (English/Arabic) with RTL layout and arrow reversal
- Comprehensive accessibility: ARIA attributes, semantic roles, test IDs on all interactive elements
- Verified through E2E testing: white backgrounds, 14px radius, timeline dots, pill button, hover states, responsive design

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
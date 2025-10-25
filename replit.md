# Aliph Solutions - Saudi Arabia Advisory Platform

## Overview

Aliph Solutions is a comprehensive GRC (Governance, Risk & Compliance) advisory platform designed for the Saudi Arabian market. It reimagines traditional consulting by providing direct access to elite, AI-enhanced expertise through a three-tiered service model. The platform supports Vision 2030 transformation by connecting businesses with vetted local experts for governance, risk management, and compliance, ensuring alignment with Saudi regulatory requirements (CMA, SAMA, MOC, PDPL).

## Recent Changes (October 25, 2025)

### Business Solutions Page Rebuild
- **Complete redesign**: Transitioned from service-focused "For Business" to platform-focused "Business Solutions"
- **Navigation update**: Renamed route in header navigation (English: "Business Solutions", Arabic: "حلول الأعمال")
- **7 Production sections**: Hero with platform positioning, Capabilities (4 cards), Industries (6 sectors), Interaction Flow (4-step timeline), Benefits (5 metrics), Social Proof, Final CTA
- **Mobile accordion**: Implemented collapsible accordion for mobile Interaction Flow with gradient connectors and rotating chevron indicators
- **Bilingual support**: Added 60+ translation keys for English/Arabic across all sections
- **Platform messaging**: Repositioned from "we deliver services" to "you use our platform"
- **SEO optimization**: B2B-focused meta tags with Saudi market keywords (PDPL, ZATCA, GRC automation)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite.
- **Styling**: Tailwind CSS with shadcn/ui.
- **Routing**: Wouter for lightweight client-side routing.
- **State Management**: TanStack Query (React Query) for server state.
- **Internationalization**: Custom LanguageProvider supporting English/Arabic with RTL.
- **Form Handling**: React Hook Form with Zod validation.
- **UI/UX Decisions**: Executive-grade design matching Linear.app/Notion AI aesthetic, with a professional color palette (deep navy, teal accents). Responsive grid layouts and consistent spacing. Inter font for English, Noto Sans Arabic for Arabic.

### Backend Architecture
- **Runtime**: Node.js with Express.js.
- **Language**: TypeScript with ES modules.
- **API Design**: RESTful endpoints with structured error handling.
- **Validation**: Zod schemas for runtime type checking.
- **Storage Interface**: Abstracted layer with in-memory implementation for easy database migration.

### Component Design System
- **UI Components**: Radix UI primitives with custom styling.
- **Design Tokens**: CSS custom properties for theming.
- **Typography**: Inter font for English, Noto Sans Arabic for Arabic text.
- **Color System**: Professional palette with deep navy primary, teal accents.
- **Layout System**: Responsive grid layouts with consistent spacing.

### Internationalization Support
- **Languages**: English and Arabic with complete translation coverage.
- **RTL Support**: Full right-to-left layout support for Arabic content.
- **Cultural Adaptation**: Saudi-specific terminology and business context.
- **SEO Optimization**: Multilingual meta tags.

### Data Layer
- **Database**: PostgreSQL configured through Drizzle ORM.
- **Schema Management**: Type-safe database schema with automated migrations.
- **Contact System**: Structured contact form submissions.
- **User Management**: Basic user authentication schema.

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL serverless database.
- **UI Framework**: Radix UI.
- **Form Management**: React Hook Form with Hookform Resolvers.
- **Styling**: Tailwind CSS with PostCSS.
- **Icons**: Lucide React.

### Development Tools
- **Build System**: Vite.
- **Type Checking**: TypeScript.
- **Code Quality**: ESLint.
- **Runtime Error Handling**: Replit-specific error modal.

### Third-Party Integrations
- **Analytics Potential**: Structured for Google Analytics/Tag Manager integration.
- **Email Services**: Ready for integration with transactional email providers.
- **Payment Processing**: Architecture supports future payment gateway integration.
- **CRM Integration**: Contact form designed for easy CRM system connectivity.

### SEO and Performance
- **Meta Management**: Custom useSEO hook.
- **Search Engine Optimization**: Comprehensive meta tags, Open Graph, and Twitter Card support.
- **Structured Data**: JSON-LD schema markup.
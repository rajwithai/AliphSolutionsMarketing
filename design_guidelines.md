# Design Guidelines for Aliph Solutions Marketing Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from professional consulting and advisory websites like McKinsey, Deloitte, and PwC, with specific adaptation for Saudi Arabian GRC advisory services. The design emphasizes trust, expertise, and cultural sensitivity.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Vibrant Purple: 267 84% 65% (primary brand color from logo)
- Professional Blue: 213 94% 68% (secondary from logo gradient)
- Pure White: 0 0% 100% (backgrounds, text contrast)

**Accent Colors:**
- Light Purple: 280 75% 85% (subtle backgrounds and highlights)
- Purple Accent: 267 60% 35% (text and details)
- Gradient Effects: Purple to blue following logo design

**Arabic Mode Adjustments:**
- Consistent purple-blue brand colors for Arabic typography
- Enhanced contrast ratios for Arabic text legibility

### B. Typography
**Primary**: Inter (Google Fonts) - clean, professional, excellent Arabic support
**Arabic**: Noto Sans Arabic (Google Fonts) - optimized for RTL layouts
**Hierarchy**: 
- Headers: 600-700 weight
- Body: 400-500 weight  
- Accent text: 500 weight

### C. Layout System
**Tailwind Spacing Primitives**: Consistent use of 4, 8, 12, 16, 24 units
- Sections: py-16 to py-24
- Component spacing: gap-8, gap-12
- Inner content: px-4 to px-8
- Generous whitespace with max-w-7xl containers

### D. Component Library

**Navigation**: 
- Sticky header with language switcher
- Clean horizontal nav with subtle hover states
- Mobile-first hamburger menu with RTL support

**Hero Sections**:
- Large, impactful headers with supporting subtext
- Strategic use of purple CTAs against dark backgrounds
- Minimal, professional imagery focus

**Service Cards**:
- Clean white cards with subtle shadows
- Purple accent borders for hierarchy
- Consistent padding and typography scale

**Forms**:
- Professional styling with purple focus states (using ring token)
- Clear validation states
- Generous spacing and legible labels

**Buttons**:
- Primary: Purple background with white text (using primary token)
- Secondary: Light purple background with dark purple text
- Outline buttons on images: blurred backgrounds, no custom hover states

### E. Content Sections

**Maximum 4-5 sections total**:
1. **Hero**: Large impact statement, dual CTA buttons
2. **Service Tiers**: Three-column layout showcasing advisory levels
3. **GRC Focus**: Saudi Arabia-specific governance highlights
4. **Social Proof/Expertise**: Client testimonials or case studies
5. **Contact CTA**: Simple, direct conversion focus

**Page-Specific Treatments**:
- **How It Works**: Step-by-step visual journey
- **For Businesses**: Tab-based role content (Startup Founder, CCO, General Counsel)
- **Pricing**: Clean tier comparison with purple highlights
- **Blog**: MDX-powered with consistent typography hierarchy

## Visual Strategy

**Professional Minimalism**: Clean layouts with strategic color usage, emphasizing trust and expertise over flashy design elements.

**Cultural Sensitivity**: Warm undertones in Arabic layouts, appropriate imagery choices, and respectful color applications for Middle Eastern business context.

**Conversion Focus**: Every section serves a clear purpose toward client engagement, with prominent but tasteful CTAs throughout.

## Images
- **Hero Image**: Yes - professional consulting imagery or abstract geometric patterns
- **Service Icons**: Simple line icons in purple/blue brand colors
- **Team Photos**: Professional headshots on About page
- **Background Elements**: Subtle geometric patterns, never distracting from content
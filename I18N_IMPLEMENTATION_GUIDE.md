# i18n Implementation Guide

## ✅ Setup Complete

I've successfully set up `react-i18next` for full bilingual support (English/Arabic) in your application.

### What's Working Now:

1. **Language Toggle Button** - In Header (Desktop & Mobile)
   - Click العربية to switch to Arabic
   - Click English to switch back to English
   - Language preference saved in localStorage
   - RTL layout automatically applied for Arabic

2. **Header Fully Translated**
   - All navigation items
   - All dropdown menus
   - Request Demo button

3. **Translation Files Created**
   - `client/src/i18n/locales/en.json` - English translations
   - `client/src/i18n/locales/ar.json` - Arabic translations

## 📝 How to Add Translations to Other Pages

### Step 1: Import useTranslation hook

```typescript
import { useTranslation } from 'react-i18next';
```

### Step 2: Use the hook in your component

```typescript
function YourPage() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.vision2030.title')}</h1>
      <p>{t('home.vision2030.description')}</p>
    </div>
  );
}
```

### Step 3: Add translation keys to JSON files

Add your keys to both:
- `client/src/i18n/locales/en.json`
- `client/src/i18n/locales/ar.json`

Example:
```json
{
  "pageName": {
    "title": "Your Title",
    "subtitle": "Your Subtitle",
    "button": "Click Me"
  }
}
```

## 📄 Pages That Need Translation

Yeh pages abhi translate nahi hui hain, aapko gradually implement karna hoga:

### High Priority:
1. ❌ Home.tsx - Main landing page
2. ❌ Footer.tsx - Footer component
3. ❌ Advisory.tsx
4. ❌ ManagedServices.tsx

### Medium Priority:
5. ❌ SecuritySovereignty.tsx
6. ❌ AliphBrain.tsx
7. ❌ AIGovernance.tsx
8. ❌ GRCAutomation.tsx
9. ❌ Integrations.tsx
10. ❌ Deliverables.tsx
11. ❌ Investors.tsx

### Low Priority:
12. ❌ CompanyAbout.tsx
13. ❌ CompanyLeadership.tsx
14. ❌ CompanyContact.tsx
15. ❌ All other pages

## 🔧 How to Translate a Page (Example: Home.tsx)

### Before:
```typescript
<h1>Aligned with Vision 2030</h1>
```

### After:
```typescript
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('home.vision2030.title')}</h1>
  );
}
```

## 📋 Translation Keys Already Available

I've already created comprehensive translations for the Home page. Check:
- `client/src/i18n/locales/en.json`
- `client/src/i18n/locales/ar.json`

Keys include:
- `header.*` - All header/navigation items
- `home.vision2030.*` - Vision 2030 section
- `home.collisionSection.*` - Two Forces Colliding section  
- `home.whyAliph.*` - Why Aliph section
- `home.architecture.*` - Architecture section
- `home.marketStats.*` - Market stats section
- `home.finalCTA.*` - Final CTA section
- `footer.*` - Footer items
- `common.*` - Common UI elements

## 🎯 Next Steps

1. **Start with Home.tsx**
   - Import `useTranslation`
   - Replace all hardcoded text with `t('key')`
   - Test Arabic/English switching

2. **Then Footer.tsx**
   - Same process

3. **Gradually do other pages**
   - One page at a time
   - Test after each page

## 💡 Tips

- Use nested keys for better organization: `page.section.item`
- Keep translation keys descriptive
- Test both English and Arabic after each change
- RTL layout will automatically apply for Arabic
- Numbers and special characters stay the same

## ⚠️ Important Notes

- Don't delete the old `LanguageProvider.tsx` yet - it's still used by other parts
- Translation files are JSON - watch for syntax errors
- i18n is already initialized in App.tsx
- Language changes are instant - no page reload needed

## 📞 Need Help?

If translation text looks wrong or layout breaks in Arabic:
1. Check if translation key exists in both en.json and ar.json
2. Verify RTL styling isn't breaking layout
3. Some components may need RTL-specific CSS adjustments

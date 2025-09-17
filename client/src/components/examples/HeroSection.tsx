import HeroSection from '../HeroSection';
import { LanguageProvider } from '../LanguageProvider';

export default function HeroSectionExample() {
  return (
    <LanguageProvider>
      <HeroSection />
    </LanguageProvider>
  );
}
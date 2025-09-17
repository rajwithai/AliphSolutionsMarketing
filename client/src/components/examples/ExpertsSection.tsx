import ExpertsSection from '../ExpertsSection';
import { LanguageProvider } from '../LanguageProvider';

export default function ExpertsSectionExample() {
  return (
    <LanguageProvider>
      <ExpertsSection />
    </LanguageProvider>
  );
}
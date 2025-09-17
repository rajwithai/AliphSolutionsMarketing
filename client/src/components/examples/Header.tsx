import Header from '../Header';
import { LanguageProvider } from '../LanguageProvider';

export default function HeaderExample() {
  return (
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
}
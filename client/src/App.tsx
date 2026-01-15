import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import './i18n/config';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import HowItWorks from "@/pages/HowItWorks";
import Pricing from "@/pages/Pricing";
import Blog from "@/pages/Blog";
import Businesses from "@/pages/Businesses";
import Experts from "@/pages/Experts";
import GRCSolutions from "@/pages/GRCSolutions";
import Deliverables from "@/pages/Deliverables";
import SecuritySovereignty from "@/pages/SecuritySovereignty";
import AliphBrain from "@/pages/AliphBrain";
import Advisory from "@/pages/Advisory";
import AdvisoryGovernance from "@/pages/AdvisoryGovernance";
import AdvisoryRisk from "@/pages/AdvisoryRisk";
import AdvisoryCompliance from "@/pages/AdvisoryCompliance";
import AdvisoryInternalAudit from "@/pages/AdvisoryInternalAudit";
import AdvisoryAIGovernance from "@/pages/AdvisoryAIGovernance";
import ManagedServices from "@/pages/ManagedServices";
import ManagedGRCSupport from "@/pages/ManagedGRCSupport";
import Resources from "@/pages/Resources";
import Industries from "@/pages/Industries";
import CompanyAbout from "@/pages/CompanyAbout";
import CompanyLeadership from "@/pages/CompanyLeadership";
import CompanyPartners from "@/pages/CompanyPartners";
import CompanyContact from "@/pages/CompanyContact";
import Security from "@/pages/Security";
import LegalPrivacy from "@/pages/LegalPrivacy";
import LegalTerms from "@/pages/LegalTerms";
import LegalCookies from "@/pages/LegalCookies";
import Investors from "@/pages/Investors";
import AIGovernance from "@/pages/AIGovernance";
import GRCAutomation from "@/pages/GRCAutomation";
import Integrations from "@/pages/Integrations";
import Careers from "@/pages/Careers";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/blog" component={Blog} />
      <Route path="/businesses" component={Businesses} />
      <Route path="/experts" component={Experts} />
      <Route path="/grc-solutions" component={GRCSolutions} />
      <Route path="/deliverables" component={Deliverables} />
      <Route path="/technology/security-sovereignty" component={SecuritySovereignty} />
      <Route path="/technology/aliph-brain" component={AliphBrain} />
      <Route path="/technology/ai-governance" component={AIGovernance} />
      <Route path="/technology/grc-automation-workflows" component={GRCAutomation} />
      <Route path="/technology/integrations" component={Integrations} />
      <Route path="/advisory" component={Advisory} />
      <Route path="/advisory/governance" component={AdvisoryGovernance} />
      <Route path="/advisory/risk" component={AdvisoryRisk} />
      <Route path="/advisory/compliance" component={AdvisoryCompliance} />
      <Route path="/advisory/internal-audit" component={AdvisoryInternalAudit} />
      <Route path="/advisory/ai-governance" component={AdvisoryAIGovernance} />
      <Route path="/managed-services" component={ManagedServices} />
      <Route path="/managed-services/grc-support-center" component={ManagedGRCSupport} />
      <Route path="/resources" component={Resources} />
      <Route path="/industries" component={Industries} />
      <Route path="/company/about" component={CompanyAbout} />
      <Route path="/company/leadership" component={CompanyLeadership} />
      <Route path="/company/partners" component={CompanyPartners} />
      <Route path="/company/contact" component={CompanyContact} />
      <Route path="/company/careers" component={Careers} />
      <Route path="/security" component={Security} />
      <Route path="/legal/privacy" component={LegalPrivacy} />
      <Route path="/legal/terms" component={LegalTerms} />
      <Route path="/legal/cookies" component={LegalCookies} />
      <Route path="/investors" component={Investors} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <ScrollToTop />
          <Header />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

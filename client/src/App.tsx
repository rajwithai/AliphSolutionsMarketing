import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageProvider";
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Router />
            </main>
            <Footer />
          </div>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

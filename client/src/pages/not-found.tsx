import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Known valid routes
const knownRoutes = new Set([
  '/',
  '/about',
  '/pricing', 
  '/grc-solutions',
  '/businesses',
  '/experts',
  '/how-it-works',
  '/blog',
  '/contact'
]);

// Route aliases - normalize common URL variations
const routeAliases: Record<string, string> = {
  '/howitworks': '/how-it-works',
  '/how_it_works': '/how-it-works',
  '/grc': '/grc-solutions',
  '/grcsolutions': '/grc-solutions',
  '/grc_solutions': '/grc-solutions',
  '/business': '/businesses',
  '/expert': '/experts',
  '/join': '/experts',
  '/experts/join': '/experts',
  '/pricing/': '/pricing',
  '/about/': '/about',
  '/contact/': '/contact',
  '/blog/': '/blog',
  '/home': '/',
};

export default function NotFound() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const lowercasePath = currentPath.toLowerCase();
    
    // First check for exact alias match (including trailing slashes)
    if (routeAliases[lowercasePath]) {
      console.log(`Redirecting ${currentPath} to ${routeAliases[lowercasePath]}`);
      setLocation(routeAliases[lowercasePath]);
      return;
    }
    
    // Then normalize path: remove trailing slashes
    const normalizedPath = lowercasePath.replace(/\/+$/, '') || '/';
    
    // Check for alias match after normalization
    if (currentPath !== normalizedPath && routeAliases[normalizedPath]) {
      console.log(`Redirecting ${currentPath} to ${routeAliases[normalizedPath]}`);
      setLocation(routeAliases[normalizedPath]);
      return;
    }
    
    // Smart fallback: if normalized path is a known route, redirect to it
    if (currentPath !== normalizedPath && knownRoutes.has(normalizedPath)) {
      console.log(`Normalizing ${currentPath} to ${normalizedPath}`);
      setLocation(normalizedPath);
      return;
    }
    
    // For any unknown path, redirect to home
    console.log(`Unknown path ${currentPath}, redirecting to home`);
    setLocation('/');
  }, [setLocation]);

  // This component should never render since it immediately redirects
  return null;
}

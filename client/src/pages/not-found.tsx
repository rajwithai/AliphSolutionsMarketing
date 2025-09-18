import { useEffect } from 'react';
import { useLocation } from 'wouter';

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
    
    // Normalize path: remove trailing slashes, convert to lowercase
    const normalizedPath = currentPath.toLowerCase().replace(/\/+$/, '') || '/';
    
    // Check for direct alias match
    if (routeAliases[normalizedPath]) {
      console.log(`Redirecting ${currentPath} to ${routeAliases[normalizedPath]}`);
      setLocation(routeAliases[normalizedPath]);
      return;
    }
    
    // Check for path that just needs trailing slash removed
    if (currentPath !== normalizedPath && routeAliases[normalizedPath]) {
      console.log(`Redirecting ${currentPath} to ${routeAliases[normalizedPath]}`);
      setLocation(routeAliases[normalizedPath]);
      return;
    }
    
    // For any unknown path, redirect to home
    console.log(`Unknown path ${currentPath}, redirecting to home`);
    setLocation('/');
  }, [setLocation]);

  // This component should never render since it immediately redirects
  return null;
}

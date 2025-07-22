import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-brand bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! This page seems to have lost its brand identity.</p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-brand text-white rounded-lg font-semibold shadow-brand hover:shadow-glow hover:scale-105 transition-all duration-300"
        >
          Return to BrandForge
        </a>
      </div>
    </div>
  );
};

export default NotFound;

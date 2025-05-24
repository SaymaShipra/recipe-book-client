import { useLocation } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 animate-fade-in">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-green mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="bg-brand-green hover:bg-brand-green/90">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

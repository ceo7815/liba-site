import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEOHead
        title="404 — הדף לא נמצא | ליבה ביטוח ופנסיוני"
        description="הדף שחיפשתם לא נמצא. חזרו לדף הבית של ליבה ביטוח ופנסיוני."
        noindex
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold font-heading">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">הדף שחיפשתם לא נמצא</p>
        <Link to="/" className="text-accent underline hover:text-accent/90 font-medium">
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

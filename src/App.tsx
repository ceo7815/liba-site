import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import SocialButtons from "@/components/SocialButtons";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/fbq";

const RouteChangePixel = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
  return null;
};

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage"));
const ServiceHubPage = lazy(() => import("./pages/ServiceHubPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LPMortgagePage = lazy(() => import("./pages/LPMortgagePage"));
const LPMortgageCheckPage = lazy(() => import("./pages/LPMortgageCheckPage"));
const LPMortgageThankYouPage = lazy(() => import("./pages/LPMortgageThankYouPage"));
const LPGovBenefitsPage = lazy(() => import("./pages/LPGovBenefitsPage"));
const LPGovBenefitsCheckPage = lazy(() => import("./pages/LPGovBenefitsCheckPage"));
const LPGovBenefitsThankYouPage = lazy(() => import("./pages/LPGovBenefitsThankYouPage"));
const LPHealthKidsPage = lazy(() => import("./pages/LPHealthKidsPage"));
const LPHealthKidsNeedsPage = lazy(() => import("./pages/LPHealthKidsNeedsPage"));
const LPHealthKidsCheckPage = lazy(() => import("./pages/LPHealthKidsCheckPage"));
const LPHealthKidsThankYouPage = lazy(() => import("./pages/LPHealthKidsThankYouPage"));
const LPHealthKidsCampaignPage = lazy(() => import("./pages/healthKids/LPHealthKidsCampaignPage"));
const LPHealthKidsCampaignNeedsPage = lazy(() => import("./pages/healthKids/LPHealthKidsCampaignNeedsPage"));
const LPHealthKidsCampaignCheckPage = lazy(() => import("./pages/healthKids/LPHealthKidsCampaignCheckPage"));
const LPHealthKidsCampaignThankYouPage = lazy(() => import("./pages/healthKids/LPHealthKidsCampaignThankYouPage"));
const LPAthletePage = lazy(() => import("./pages/LPAthletePage"));
const LPAthleteThankYouPage = lazy(() => import("./pages/LPAthleteThankYouPage"));
const LPInsuranceCheckPage = lazy(() => import("./pages/LPInsuranceCheckPage"));
const LPInsuranceCheckThankYouPage = lazy(() => import("./pages/LPInsuranceCheckThankYouPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RouteChangePixel />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Landing pages — no Header/Footer, but with CookieConsent */}
            <Route path="/lp/mortgage-insurance" element={<><LPMortgagePage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/mortgage-insurance/check" element={<><LPMortgageCheckPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/mortgage-insurance/thank-you" element={<><LPMortgageThankYouPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/government-benefits" element={<><LPGovBenefitsPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/government-benefits/check" element={<><LPGovBenefitsCheckPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/government-benefits/thank-you" element={<><LPGovBenefitsThankYouPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids" element={<><LPHealthKidsPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids/needs" element={<><LPHealthKidsNeedsPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids/check" element={<><LPHealthKidsCheckPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids/thank-you" element={<><LPHealthKidsThankYouPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids-migdal" element={<><LPHealthKidsCampaignPage campaignId="migdal" /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids-migdal/needs" element={<><LPHealthKidsCampaignNeedsPage campaignId="migdal" /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids-migdal/check" element={<><LPHealthKidsCampaignCheckPage campaignId="migdal" /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids-migdal/thank-you" element={<><LPHealthKidsCampaignThankYouPage campaignId="migdal" /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids-partners" element={<><LPHealthKidsCampaignPage campaignId="partners" /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids-partners/needs" element={<><LPHealthKidsCampaignNeedsPage campaignId="partners" /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids-partners/check" element={<><LPHealthKidsCampaignCheckPage campaignId="partners" /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/lp/health-kids-partners/thank-you" element={<><LPHealthKidsCampaignThankYouPage campaignId="partners" /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/athlete-pack" element={<><LPAthletePage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/athlete-thankyou" element={<><LPAthleteThankYouPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/insurance-check" element={<><LPInsuranceCheckPage /><CookieConsent /><AccessibilityWidget /></>} />
            <Route path="/insurance-check/thankyou" element={<><LPInsuranceCheckThankYouPage /><CookieConsent /><AccessibilityWidget /></>} />


            {/* All other pages — with Header/Footer */}
            <Route path="*" element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:category" element={<BlogPage />} />
                  <Route path="/blog/:category/:slug" element={<BlogArticlePage />} />
                  <Route path="/tools/insurance-scan" element={<Navigate to="/insurance-check" replace />} />
                  <Route path="/services/:hubSlug" element={<ServiceHubPage />} />
                  <Route path="/services/:hubSlug/:slug" element={<ServiceDetailPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />
                  <Route path="/thank-you" element={<ThankYouPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                <CookieConsent />
                <AccessibilityWidget />
                <SocialButtons layout="dock" />
              </>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

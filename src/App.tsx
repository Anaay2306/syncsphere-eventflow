import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ManageEvents from "./pages/organizer/ManageEvents";
import Analytics from "./pages/organizer/Analytics";
import Speakers from "./pages/organizer/Speakers";
import VendorServices from "./pages/vendor/Services";
import VendorPartnerships from "./pages/vendor/Partnerships";
import SponsorSponsorships from "./pages/sponsor/Sponsorships";
import SponsorAnalytics from "./pages/sponsor/Analytics";
import AttendeeDashboard from "./pages/dashboards/AttendeeDashboard";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      
      // If user signs in, they're already being redirected by Auth component
      // This just updates the auth state
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/events" 
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/organizer/events" 
            element={
              <ProtectedRoute>
                <ManageEvents />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/organizer/analytics" 
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/organizer/speakers" 
            element={
              <ProtectedRoute>
                <Speakers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vendor/services" 
            element={
              <ProtectedRoute>
                <VendorServices />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vendor/partnerships" 
            element={
              <ProtectedRoute>
                <VendorPartnerships />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sponsor/sponsorships" 
            element={
              <ProtectedRoute>
                <SponsorSponsorships />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sponsor/analytics" 
            element={
              <ProtectedRoute>
                <SponsorAnalytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendee/agenda" 
            element={
              <ProtectedRoute>
                <AttendeeDashboard initialTab="agenda" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendee/networking" 
            element={
              <ProtectedRoute>
                <AttendeeDashboard initialTab="networking" />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

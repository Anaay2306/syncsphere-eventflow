import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import OrganizerDashboard from "./dashboards/OrganizerDashboard";
import AttendeeDashboard from "./dashboards/AttendeeDashboard";
import VendorDashboard from "./dashboards/VendorDashboard";
import SponsorDashboard from "./dashboards/SponsorDashboard";

export default function Dashboard() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("No authenticated user found");
        return;
      }

      // Try to get user role from profiles table
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        
        // If profile doesn't exist, try to get role from user metadata
        const roleFromMetadata = user.user_metadata?.role;
        if (roleFromMetadata) {
          setUserRole(roleFromMetadata);
          console.log("Using role from user metadata:", roleFromMetadata);
        } else {
          setError("Unable to determine user role");
        }
      } else {
        setUserRole(data?.role || null);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
            <button 
              onClick={fetchUserRole}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    switch (userRole) {
      case "organizer":
        return <OrganizerDashboard />;
      case "attendee":
        return <AttendeeDashboard />;
      case "vendor":
        return <VendorDashboard />;
      case "sponsor":
        return <SponsorDashboard />;
      default:
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Unable to determine your role</p>
              <button 
                onClick={fetchUserRole}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}

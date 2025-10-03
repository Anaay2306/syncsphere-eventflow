import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import OrganizerDashboard from "./dashboards/OrganizerDashboard";
import AttendeeDashboard from "./dashboards/AttendeeDashboard";
import VendorDashboard from "./dashboards/VendorDashboard";
import SponsorDashboard from "./dashboards/SponsorDashboard";

export default function Dashboard() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setUserRole(data?.role || null);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const renderDashboard = () => {
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
        return <div>Loading...</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}

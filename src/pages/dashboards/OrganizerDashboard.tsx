import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { Calendar, Users, CheckCircle2, TrendingUp } from "lucide-react";

export default function OrganizerDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    activeSessions: 0,
    completionRate: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: events } = await supabase
        .from("events")
        .select("*")
        .eq("organizer_id", user.id);

      const { data: registrations } = await supabase
        .from("registrations")
        .select("*, events!inner(*)")
        .eq("events.organizer_id", user.id);

      const { data: sessions } = await supabase
        .from("sessions")
        .select("*, events!inner(*)")
        .eq("events.organizer_id", user.id);

      setStats({
        totalEvents: events?.length || 0,
        totalAttendees: registrations?.length || 0,
        activeSessions: sessions?.length || 0,
        completionRate: 78, // Mock data for now
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      icon: Calendar,
      label: "Total Events",
      value: stats.totalEvents,
      color: "from-primary to-primary-glow",
    },
    {
      icon: Users,
      label: "Total Attendees",
      value: stats.totalAttendees,
      color: "from-accent to-primary",
    },
    {
      icon: CheckCircle2,
      label: "Active Sessions",
      value: stats.activeSessions,
      color: "from-success to-accent",
    },
    {
      icon: TrendingUp,
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      color: "from-primary-glow to-accent",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Organizer Dashboard
          </span>
        </h2>
        <p className="text-muted-foreground">Manage your events and track performance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <GlassCard
            key={index}
            hover
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h3>
        <p className="text-muted-foreground">
          Event creation, session management, and advanced features coming soon...
        </p>
      </GlassCard>
    </div>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { Calendar, QrCode, Trophy, Star } from "lucide-react";

export default function AttendeeDashboard() {
  const [stats, setStats] = useState({
    registeredEvents: 0,
    checkedInSessions: 0,
    pointsEarned: 0,
    badgesUnlocked: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: registrations } = await supabase
        .from("registrations")
        .select("*")
        .eq("attendee_id", user.id);

      const totalPoints = registrations?.reduce((sum, reg) => sum + (reg.points || 0), 0) || 0;
      const checkedIn = registrations?.filter(reg => reg.checked_in).length || 0;

      setStats({
        registeredEvents: registrations?.length || 0,
        checkedInSessions: checkedIn,
        pointsEarned: totalPoints,
        badgesUnlocked: Math.floor(totalPoints / 100),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      icon: Calendar,
      label: "Registered Events",
      value: stats.registeredEvents,
      color: "from-primary to-primary-glow",
    },
    {
      icon: QrCode,
      label: "Check-ins",
      value: stats.checkedInSessions,
      color: "from-accent to-primary",
    },
    {
      icon: Trophy,
      label: "Points Earned",
      value: stats.pointsEarned,
      color: "from-success to-accent",
    },
    {
      icon: Star,
      label: "Badges Unlocked",
      value: stats.badgesUnlocked,
      color: "from-primary-glow to-accent",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Attendee Portal
          </span>
        </h2>
        <p className="text-muted-foreground">Your personalized event experience</p>
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
        <h3 className="text-xl font-semibold mb-4 text-foreground">My Schedule</h3>
        <p className="text-muted-foreground">
          Event schedule, QR check-in, and gamification features coming soon...
        </p>
      </GlassCard>
    </div>
  );
}

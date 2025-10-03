import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { TrendingUp, Eye, Users, DollarSign } from "lucide-react";

export default function SponsorDashboard() {
  const [stats, setStats] = useState({
    activeEvents: 0,
    totalImpressions: 0,
    boothVisits: 0,
    estimatedROI: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: sponsorships } = await supabase
        .from("sponsors")
        .select("*")
        .eq("sponsor_id", user.id);

      const totalImpressions = sponsorships?.reduce((sum, s) => sum + (s.impressions || 0), 0) || 0;
      const totalVisits = sponsorships?.reduce((sum, s) => sum + (s.booth_visits || 0), 0) || 0;

      setStats({
        activeEvents: sponsorships?.length || 0,
        totalImpressions,
        boothVisits: totalVisits,
        estimatedROI: Math.floor(totalImpressions * 0.05),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      icon: TrendingUp,
      label: "Active Events",
      value: stats.activeEvents,
      color: "from-primary to-primary-glow",
    },
    {
      icon: Eye,
      label: "Total Impressions",
      value: stats.totalImpressions.toLocaleString(),
      color: "from-accent to-primary",
    },
    {
      icon: Users,
      label: "Booth Visits",
      value: stats.boothVisits,
      color: "from-success to-accent",
    },
    {
      icon: DollarSign,
      label: "Estimated ROI",
      value: `$${stats.estimatedROI.toLocaleString()}`,
      color: "from-primary-glow to-success",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sponsor Dashboard
          </span>
        </h2>
        <p className="text-muted-foreground">Track your sponsorship performance and ROI</p>
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
        <h3 className="text-xl font-semibold mb-4 text-foreground">Analytics Overview</h3>
        <p className="text-muted-foreground">
          Detailed analytics, sponsor materials, and event applications coming soon...
        </p>
      </GlassCard>
    </div>
  );
}

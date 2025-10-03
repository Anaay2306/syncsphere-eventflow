import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle2, Clock, AlertCircle, FileText } from "lucide-react";

export default function VendorDashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTask: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("vendor_id", user.id);

      const completed = tasks?.filter(t => t.status === "completed").length || 0;
      const pending = tasks?.filter(t => t.status === "pending").length || 0;
      const overdue = tasks?.filter(t => 
        t.due_date && new Date(t.due_date) < new Date() && t.status !== "completed"
      ).length || 0;

      setStats({
        totalTasks: tasks?.length || 0,
        completedTasks: completed,
        pendingTasks: pending,
        overdueTask: overdue,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      icon: FileText,
      label: "Total Tasks",
      value: stats.totalTasks,
      color: "from-primary to-primary-glow",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: stats.completedTasks,
      color: "from-success to-accent",
    },
    {
      icon: Clock,
      label: "Pending",
      value: stats.pendingTasks,
      color: "from-accent to-primary",
    },
    {
      icon: AlertCircle,
      label: "Overdue",
      value: stats.overdueTask,
      color: "from-destructive to-primary",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Vendor Portal
          </span>
        </h2>
        <p className="text-muted-foreground">Manage your tasks and deliverables</p>
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
        <h3 className="text-xl font-semibold mb-4 text-foreground">My Tasks</h3>
        <p className="text-muted-foreground">
          Task list, file uploads, and real-time chat features coming soon...
        </p>
      </GlassCard>
    </div>
  );
}

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import Navbar from "@/components/Navbar";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Eye,
  Heart,
  Share2
} from "lucide-react";

export default function Analytics() {
  const stats = [
    { label: "Total Events", value: "12", change: "+2", icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: "Total Attendees", value: "1,247", change: "+156", icon: Users, color: "from-green-500 to-green-600" },
    { label: "Revenue", value: "$24,580", change: "+$3,200", icon: DollarSign, color: "from-purple-500 to-purple-600" },
    { label: "Avg Rating", value: "4.8", change: "+0.2", icon: Heart, color: "from-pink-500 to-pink-600" }
  ];

  const eventPerformance = [
    { name: "Tech Summit", attendees: 250, revenue: "$12,500", rating: 4.9 },
    { name: "Marketing Workshop", attendees: 180, revenue: "$4,500", rating: 4.7 },
    { name: "Startup Pitch", attendees: 200, revenue: "$5,000", rating: 4.8 },
    { name: "Design Conference", attendees: 150, revenue: "$2,580", rating: 4.6 }
  ];

  return (
    <>
      <Navbar userRole="organizer" />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient-primary">Analytics Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">Track your event performance and insights</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover className="p-6 group">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-3xl font-bold text-gradient-primary">{stat.value}</p>
                        <span className="text-sm text-green-500 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Event Performance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold text-gradient-primary mb-6">Event Performance</h2>
                <div className="space-y-4">
                  {eventPerformance.map((event, index) => (
                    <div key={event.name} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.attendees}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {event.revenue}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {event.rating}
                          </span>
                        </div>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Charts Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold text-gradient-primary mb-6">Revenue Trends</h2>
                <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Additional Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold text-gradient-primary mb-6">Engagement Metrics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gradient-primary">12.5K</h3>
                  <p className="text-muted-foreground">Page Views</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Share2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gradient-primary">847</h3>
                  <p className="text-muted-foreground">Social Shares</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gradient-primary">94%</h3>
                  <p className="text-muted-foreground">Satisfaction Rate</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  );
}

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  MapPin, 
  Clock,
  BarChart3,
  Settings,
  Eye
} from "lucide-react";

export default function ManageEvents() {
  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "March 15, 2024",
      status: "published",
      attendees: 250,
      capacity: 300,
      location: "Convention Center, NYC",
      revenue: "$12,500"
    },
    {
      id: 2,
      title: "Digital Marketing Workshop",
      date: "March 20, 2024",
      status: "draft",
      attendees: 0,
      capacity: 150,
      location: "Online Event",
      revenue: "$0"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "March 25, 2024",
      status: "published",
      attendees: 180,
      capacity: 200,
      location: "Innovation Hub, SF",
      revenue: "$4,500"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Navbar userRole="organizer" />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient-primary">Manage Events</span>
              </h1>
              <p className="text-xl text-muted-foreground">Create and manage your events</p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          </motion.div>

          <div className="grid gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <Badge className={`${getStatusColor(event.status)} text-white capitalize`}>
                          {event.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees}/{event.capacity} attendees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          <span>{event.revenue} revenue</span>
                        </div>
                      </div>

                      <div className="w-full bg-background/50 rounded-full h-2 mb-4">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

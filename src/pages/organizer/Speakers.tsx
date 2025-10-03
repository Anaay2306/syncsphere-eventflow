import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  Users, 
  Plus, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  Clock,
  X,
  Edit,
  Star
} from "lucide-react";

export default function Speakers() {
  const speakers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "AI Research Director",
      company: "TechCorp",
      bio: "Leading expert in machine learning and artificial intelligence with 15+ years of experience.",
      avatar: "SJ",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 123-4567",
      sessions: ["AI in Healthcare", "Future of Machine Learning"],
      status: "confirmed",
      rating: 4.9
    },
    {
      id: 2,
      name: "Marcus Chen",
      title: "Startup Founder",
      company: "InnovateLab",
      bio: "Serial entrepreneur and startup mentor with 3 successful exits.",
      avatar: "MC",
      email: "marcus@innovatelab.com",
      phone: "+1 (555) 987-6543",
      sessions: ["Startup Scaling", "Investment Strategies"],
      status: "pending",
      rating: 4.7
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX Design Lead",
      company: "DesignStudio",
      bio: "Award-winning designer specializing in user experience and product design.",
      avatar: "ER",
      email: "emily@designstudio.com",
      phone: "+1 (555) 456-7890",
      sessions: ["Design Thinking Workshop"],
      status: "confirmed",
      rating: 4.8
    }
  ];

  const staff = [
    {
      id: 1,
      name: "John Smith",
      role: "Event Coordinator",
      department: "Operations",
      email: "john@syncsphere.com",
      phone: "+1 (555) 111-2222",
      status: "active"
    },
    {
      id: 2,
      name: "Lisa Wang",
      role: "Technical Support",
      department: "IT",
      email: "lisa@syncsphere.com",
      phone: "+1 (555) 333-4444",
      status: "active"
    },
    {
      id: 3,
      name: "Mike Brown",
      role: "Security Manager",
      department: "Security",
      email: "mike@syncsphere.com",
      phone: "+1 (555) 555-6666",
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'declined': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

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
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient-primary">Speakers & Staff</span>
              </h1>
              <p className="text-xl text-muted-foreground">Manage your event speakers and staff members</p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              <Plus className="w-5 h-5 mr-2" />
              Add Speaker
            </Button>
          </motion.div>

          {/* Speakers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold text-gradient-primary mb-6">Speakers</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {speakers.map((speaker, index) => (
                  <GlassCard key={speaker.id} hover className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{speaker.avatar}</span>
                      </div>
                      <h3 className="text-lg font-bold">{speaker.name}</h3>
                      <p className="text-sm text-muted-foreground">{speaker.title}</p>
                      <p className="text-sm text-muted-foreground">{speaker.company}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{speaker.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{speaker.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{speaker.phone}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Badge className={`${getStatusColor(speaker.status)} text-white capitalize mb-2`}>
                        {speaker.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{speaker.bio}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Sessions:</h4>
                      <div className="space-y-1">
                        {speaker.sessions.map((session, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {session}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Staff Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gradient-primary">Staff Members</h2>
                <Button className="bg-gradient-to-r from-primary to-accent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Staff
                </Button>
              </div>
              
              <div className="space-y-4">
                {staff.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {member.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white">
                        {member.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  );
}

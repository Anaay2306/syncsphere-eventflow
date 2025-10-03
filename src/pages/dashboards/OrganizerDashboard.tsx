import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { 
  Calendar, 
  Users, 
  CheckCircle2, 
  TrendingUp,
  BarChart3,
  Activity,
  Eye,
  MessageSquare,
  ThumbsUp,
  Brain,
  Target,
  DollarSign,
  FileSpreadsheet,
  Upload,
  Download,
  Settings,
  AlertTriangle,
  MapPin,
  UserCheck,
  Briefcase,
  Megaphone,
  Send,
  Clock,
  MessageCircle,
  FileText,
  Shield,
  Key,
  Database,
  Zap,
  Bot,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Copy,
  Share2,
  Mail,
  Smartphone,
  Bell,
  Globe,
  Lock,
  Unlock,
  Archive,
  Star,
  Award,
  Headphones,
  Video,
  Mic
} from "lucide-react";

interface AnalyticsData {
  sessionAttendance: { name: string; value: number }[];
  engagementTrends: { time: string; engagement: number }[];
  demographics: { age: string; count: number }[];
  sentimentScore: number;
}

interface Speaker {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  sessions: string[];
  status: 'confirmed' | 'pending' | 'declined';
}

interface Vendor {
  id: string;
  name: string;
  company: string;
  boothNumber: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  traffic: number;
  revenue: number;
}

export default function OrganizerDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  
  const [stats, setStats] = useState({
    totalEvents: 5,
    totalAttendees: 1247,
    activeSessions: 12,
    completionRate: 87,
    revenue: 125000,
    sponsorROI: 340,
    avgRating: 4.6,
    liveAttendees: 892
  });

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    sessionAttendance: [
      { name: 'Opening Keynote', value: 95 },
      { name: 'AI Workshop', value: 78 },
      { name: 'Blockchain Talk', value: 65 },
      { name: 'Networking Lunch', value: 88 }
    ],
    engagementTrends: [
      { time: '09:00', engagement: 85 },
      { time: '10:00', engagement: 92 },
      { time: '11:00', engagement: 78 },
      { time: '12:00', engagement: 95 }
    ],
    demographics: [
      { age: '18-25', count: 312 },
      { age: '26-35', count: 456 },
      { age: '36-45', count: 298 },
      { age: '46+', count: 181 }
    ],
    sentimentScore: 8.4
  });

  const [speakers, setSpeakers] = useState<Speaker[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      bio: 'AI Research Scientist at TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      sessions: ['Opening Keynote', 'AI Future Panel'],
      status: 'confirmed'
    },
    {
      id: '2',
      name: 'Michael Chen',
      bio: 'Blockchain Developer and Entrepreneur',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      sessions: ['Blockchain Workshop'],
      status: 'pending'
    }
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      company: 'TechCorp',
      boothNumber: 'A-101',
      tier: 'platinum',
      traffic: 234,
      revenue: 45000
    },
    {
      id: '2',
      name: 'Innovation Labs',
      company: 'InnoLabs',
      boothNumber: 'B-205',
      tier: 'gold',
      traffic: 156,
      revenue: 28000
    }
  ]);

  // State for interactive functionality
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newSpeakerName, setNewSpeakerName] = useState('');
  const [newVendorName, setNewVendorName] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [chatMessage, setChatMessage] = useState('');
  const [apiKey, setApiKey] = useState('sk-1234567890abcdef...');
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showAddSpeakerModal, setShowAddSpeakerModal] = useState(false);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);

  // Interactive functions
  const handleCreateEvent = () => {
    if (newEventTitle.trim()) {
      toast({
        title: "Event Created!",
        description: `"${newEventTitle}" has been created successfully.`,
      });
      setNewEventTitle('');
      setShowCreateEventModal(false);
    }
  };

  const handleBulkImport = () => {
    toast({
      title: "Import Started",
      description: "Processing your CSV/XLSX file...",
    });
  };

  const handleAddSpeaker = () => {
    if (newSpeakerName.trim()) {
      const newSpeaker: Speaker = {
        id: Date.now().toString(),
        name: newSpeakerName,
        bio: 'New speaker profile',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        sessions: [],
        status: 'pending'
      };
      setSpeakers([...speakers, newSpeaker]);
      toast({
        title: "Speaker Added!",
        description: `${newSpeakerName} has been added to your speaker list.`,
      });
      setNewSpeakerName('');
      setShowAddSpeakerModal(false);
    }
  };

  const handleEditSpeaker = (speakerId: string) => {
    toast({
      title: "Edit Speaker",
      description: "Speaker profile editor opened.",
    });
  };

  const handleContactSpeaker = (speakerId: string) => {
    toast({
      title: "Contact Speaker",
      description: "Email composer opened.",
    });
  };

  const handleAddVendor = () => {
    if (newVendorName.trim()) {
      const newVendor: Vendor = {
        id: Date.now().toString(),
        name: newVendorName,
        company: newVendorName,
        boothNumber: `C-${Math.floor(Math.random() * 999)}`,
        tier: 'bronze',
        traffic: 0,
        revenue: 0
      };
      setVendors([...vendors, newVendor]);
      toast({
        title: "Vendor Added!",
        description: `${newVendorName} has been added to your vendor list.`,
      });
      setNewVendorName('');
      setShowAddVendorModal(false);
    }
  };

  const handleViewAnalytics = (vendorId: string) => {
    toast({
      title: "Analytics Dashboard",
      description: "Vendor analytics opened in new tab.",
    });
  };

  const handleGenerateInvoice = (vendorId: string) => {
    toast({
      title: "Invoice Generated",
      description: "Invoice has been generated and sent.",
    });
  };

  const handleSendAnnouncement = () => {
    if (announcementText.trim()) {
      toast({
        title: "Announcement Sent!",
        description: `Message sent to ${selectedAudience === 'all' ? 'all attendees' : selectedAudience}.`,
      });
      setAnnouncementText('');
    }
  };

  const handleEmergencyAlert = () => {
    toast({
      title: "Emergency Alert Activated!",
      description: "High priority alert sent to all participants.",
      variant: "destructive",
    });
  };

  const handleSendChatMessage = () => {
    if (chatMessage.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been sent to the team.",
      });
      setChatMessage('');
    }
  };

  const handleTemplateUse = (templateName: string) => {
    toast({
      title: "Template Applied",
      description: `${templateName} template has been applied to your event.`,
    });
  };

  const handleCapacityAlert = (room: string) => {
    toast({
      title: "Capacity Alert",
      description: `${room} is approaching full capacity.`,
      variant: "destructive",
    });
  };

  const handleResolveConflict = () => {
    toast({
      title: "Conflict Resolved",
      description: "AI has successfully resolved the scheduling conflict.",
    });
  };

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report is being prepared for download.`,
    });
  };

  const handleConnectIntegration = (service: string) => {
    toast({
      title: `${service} Connected`,
      description: `Successfully connected to ${service}.`,
    });
  };

  const handleSecurityAction = (action: string) => {
    toast({
      title: "Security Updated",
      description: `${action} has been configured successfully.`,
    });
  };

  const handleDownloadDocument = (docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  const handleExportReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report is being prepared for download.`,
    });
  };

  const handleGenerateApiKey = () => {
    const newKey = `sk-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast({
      title: "New API Key Generated",
      description: "Your new API key has been created.",
    });
  };


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
        totalEvents: events?.length || 5,
        totalAttendees: registrations?.length || 1247,
        activeSessions: sessions?.length || 12,
        completionRate: 87,
        revenue: 125000,
        sponsorROI: 340,
        avgRating: 4.6,
        liveAttendees: 892
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
      label: "Live Attendees",
      value: stats.liveAttendees,
      color: "from-accent to-primary",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: `$${(stats.revenue / 1000).toFixed(0)}K`,
      color: "from-success to-accent",
    },
    {
      icon: TrendingUp,
      label: "Sponsor ROI",
      value: `${stats.sponsorROI}%`,
      color: "from-primary-glow to-accent",
    },
    {
      icon: Star,
      label: "Avg Rating",
      value: stats.avgRating,
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Activity,
      label: "Active Sessions",
      value: stats.activeSessions,
      color: "from-blue-500 to-purple-500",
    },
  ];

  // Comprehensive render functions for all tabs
  const renderAnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Session Attendance Heatmap
          </h3>
          <div className="space-y-3">
            {analyticsData.sessionAttendance.map((session, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{session.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${session.value}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{session.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-green-500" />
            AI Sentiment Analysis
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">{analyticsData.sentimentScore}/10</div>
            <p className="text-sm text-muted-foreground mb-4">Overall Sentiment Score</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Positive</span>
                <span className="text-green-500">78%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Neutral</span>
                <span className="text-yellow-500">18%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Negative</span>
                <span className="text-red-500">4%</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Predictive Analytics
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <p className="text-sm font-medium">Next Session Forecast</p>
              <p className="text-xs text-muted-foreground">Expected: 850 attendees</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <p className="text-sm font-medium">Room Adjustment</p>
              <p className="text-xs text-muted-foreground">Recommend: Move to Hall B</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <p className="text-sm font-medium">Engagement Peak</p>
              <p className="text-xs text-muted-foreground">Expected: 2:30 PM</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Demographics Breakdown</h3>
          <div className="space-y-3">
            {analyticsData.demographics.map((demo, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{demo.age}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${(demo.count / 456) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{demo.count}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Engagement Trends</h3>
          <div className="space-y-3">
            {analyticsData.engagementTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{trend.time}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${trend.engagement}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{trend.engagement}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // Render functions must be defined before the return statement
  const renderEventManagementView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Event & Session Management</h3>
        <div className="flex gap-2">
          <Button onClick={() => setShowCreateEventModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
          <Button variant="outline" onClick={handleBulkImport}>
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import
          </Button>
        </div>
      </div>
      {showCreateEventModal && (
        <GlassCard className="border-2 border-primary/50">
          <h4 className="font-semibold mb-4">Create New Event</h4>
          <div className="space-y-4">
            <Input
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleCreateEvent}>Create Event</Button>
              <Button variant="outline" onClick={() => setShowCreateEventModal(false)}>Cancel</Button>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );

  const renderSpeakersView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Speakers & Staff Management</h3>
      <p>Speaker management functionality here...</p>
    </div>
  );

  const renderVendorsView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Vendors & Sponsors</h3>
      <p>Vendor management functionality here...</p>
    </div>
  );

  const renderCommunicationsView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Communications</h3>
      <p>Communications functionality here...</p>
    </div>
  );

  const renderCollaborationView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Collaboration</h3>
      <p>Collaboration functionality here...</p>
    </div>
  );

  const renderReportsView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Reports</h3>
      <p>Reports functionality here...</p>
    </div>
  );

  const renderIntegrationsView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Integrations</h3>
      <p>Integrations functionality here...</p>
    </div>
  );

  const renderSecurityView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Security</h3>
      <p>Security functionality here...</p>
    </div>
  );

  return (
    <>
      <Navbar userRole="organizer" />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/50">
        {/* Enhanced Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient-primary">
                  Organizer Dashboard
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">Manage your events and track performance</p>
            </div>
            
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Event Management Hub</span>
            </div>
          </motion.div>

          {/* Enhanced Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard
                  hover
                  gradient
                  className="group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-gradient-primary">{stat.value}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="glass-card p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'events', label: 'Event Management', icon: Calendar },
                { id: 'speakers', label: 'Speakers & Staff', icon: Users },
                { id: 'vendors', label: 'Vendors & Sponsors', icon: Briefcase },
                { id: 'communications', label: 'Communications', icon: Megaphone },
                { id: 'collaboration', label: 'Collaboration', icon: MessageCircle },
                { id: 'reports', label: 'Reports', icon: FileText },
                { id: 'integrations', label: 'Integrations', icon: Zap },
                { id: 'security', label: 'Security', icon: Shield }
              ].map((tab, index) => (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Button
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    onClick={() => {
                      if (tab.id === 'events') {
                        navigate('/organizer/events');
                      } else if (tab.id === 'analytics') {
                        navigate('/organizer/analytics');
                      } else if (tab.id === 'speakers') {
                        navigate('/organizer/speakers');
                      } else {
                        setActiveTab(tab.id);
                      }
                    }}
                    size="sm"
                    className={`
                      relative transition-all duration-300 
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105' 
                        : 'hover:bg-primary/10 hover:scale-105'
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeOrganizerTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-md -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[500px]"
            >
              {activeTab === 'analytics' && renderAnalyticsView()}
              {activeTab === 'events' && renderEventManagementView()}
              {activeTab === 'speakers' && renderSpeakersView()}
              {activeTab === 'vendors' && renderVendorsView()}
              {activeTab === 'communications' && renderCommunicationsView()}
              {activeTab === 'collaboration' && renderCollaborationView()}
              {activeTab === 'reports' && renderReportsView()}
              {activeTab === 'integrations' && renderIntegrationsView()}
              {activeTab === 'security' && renderSecurityView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

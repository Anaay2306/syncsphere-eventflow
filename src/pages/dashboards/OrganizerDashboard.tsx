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
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Vendors & Sponsors Management</h3>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { tier: 'Platinum', count: 3, revenue: '$45,000', color: 'from-slate-400 to-slate-600' },
          { tier: 'Gold', count: 5, revenue: '$25,000', color: 'from-yellow-400 to-yellow-600' },
          { tier: 'Silver', count: 8, revenue: '$12,000', color: 'from-gray-300 to-gray-500' }
        ].map((tier, index) => (
          <GlassCard key={index} hover gradient>
            <div className="space-y-3">
              <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${tier.color} text-white text-sm font-semibold`}>
                {tier.tier} Tier
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vendors</span>
                  <span className="font-bold">{tier.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-bold text-green-500">{tier.revenue}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h4 className="font-semibold mb-4">Active Vendors & Sponsors</h4>
        <div className="space-y-3">
          {[
            { name: 'TechCorp Solutions', company: 'Technology', booth: 'A-12', tier: 'Platinum', traffic: 450 },
            { name: 'Global Innovations', company: 'Innovation', booth: 'B-08', tier: 'Gold', traffic: 320 },
            { name: 'Digital Dynamics', company: 'Digital Services', booth: 'C-15', tier: 'Silver', traffic: 180 }
          ].map((vendor, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{vendor.name}</p>
                  <p className="text-sm text-muted-foreground">{vendor.company} • Booth {vendor.booth}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{vendor.tier}</p>
                  <p className="text-xs text-muted-foreground">{vendor.traffic} visitors</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderCommunicationsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Communications Center</h3>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Send className="w-4 h-4 mr-2" />
          Send Announcement
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Email Campaigns', value: '12 Active', icon: Mail, color: 'from-blue-500 to-blue-600' },
          { label: 'SMS Notifications', value: '1,247 Sent', icon: Smartphone, color: 'from-green-500 to-green-600' },
          { label: 'Push Alerts', value: '3,450 Delivered', icon: Bell, color: 'from-purple-500 to-purple-600' }
        ].map((stat, index) => (
          <GlassCard key={index} hover gradient>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-gradient-primary">{stat.value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" />
            Recent Announcements
          </h4>
          <div className="space-y-3">
            {[
              { title: 'Event Schedule Updated', time: '2 hours ago', type: 'info' },
              { title: 'New Speaker Added', time: '5 hours ago', type: 'success' },
              { title: 'Venue Change Alert', time: '1 day ago', type: 'warning' }
            ].map((announcement, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{announcement.time}</p>
                  </div>
                  <Badge variant={announcement.type === 'warning' ? 'destructive' : 'default'}>
                    {announcement.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Quick Message
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Recipient Group</label>
              <select className="w-full px-3 py-2 border rounded-lg bg-background">
                <option>All Attendees</option>
                <option>Speakers Only</option>
                <option>Vendors & Sponsors</option>
                <option>VIP Guests</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea placeholder="Type your message here..." rows={4} />
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-accent">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderCollaborationView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Team Collaboration</h3>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <UserCheck className="w-4 h-4 mr-2" />
          Invite Team Member
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Team Members
          </h4>
          <div className="space-y-3">
            {[
              { name: 'Sarah Johnson', role: 'Event Coordinator', status: 'online', tasks: 12 },
              { name: 'Michael Chen', role: 'Technical Lead', status: 'online', tasks: 8 },
              { name: 'Emma Davis', role: 'Marketing Manager', status: 'away', tasks: 15 },
              { name: 'James Wilson', role: 'Logistics Manager', status: 'offline', tasks: 6 }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-white font-semibold">{member.name.charAt(0)}</span>
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                      member.status === 'online' ? 'bg-green-500' :
                      member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{member.tasks} tasks</p>
                  <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Shared Documents
          </h4>
          <div className="space-y-3">
            {[
              { name: 'Event Schedule.pdf', size: '2.4 MB', shared: '3 hours ago', type: 'pdf' },
              { name: 'Vendor Contracts.docx', size: '1.8 MB', shared: '1 day ago', type: 'doc' },
              { name: 'Budget Spreadsheet.xlsx', size: '890 KB', shared: '2 days ago', type: 'excel' }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.size} • {doc.shared}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </GlassCard>
      </div>

      <GlassCard>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Team Chat
        </h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {[
            { user: 'Sarah', message: 'Updated the event schedule', time: '10:30 AM' },
            { user: 'Michael', message: 'Audio system check completed', time: '11:15 AM' },
            { user: 'Emma', message: 'Social media posts scheduled', time: '12:00 PM' }
          ].map((chat, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">{chat.user.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{chat.user}</span>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </GlassCard>
    </div>
  );

  const renderReportsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Reports & Analytics</h3>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Download className="w-4 h-4 mr-2" />
          Export All Reports
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$125,000', change: '+12%', icon: DollarSign, color: 'from-green-500 to-green-600' },
          { label: 'Attendance Rate', value: '87%', change: '+5%', icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Engagement Score', value: '92/100', change: '+8%', icon: Activity, color: 'from-purple-500 to-purple-600' },
          { label: 'Satisfaction', value: '4.8/5', change: '+0.3', icon: Star, color: 'from-yellow-500 to-yellow-600' }
        ].map((metric, index) => (
          <GlassCard key={index} hover gradient>
            <div className="space-y-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-gradient-primary">{metric.value}</p>
                <p className="text-xs text-green-500 font-medium">{metric.change} vs last event</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            Available Reports
          </h4>
          <div className="space-y-3">
            {[
              { name: 'Attendance Report', date: 'Last updated: Today', status: 'ready' },
              { name: 'Revenue Analysis', date: 'Last updated: Yesterday', status: 'ready' },
              { name: 'Engagement Metrics', date: 'Last updated: 2 days ago', status: 'ready' },
              { name: 'Sponsor ROI Report', date: 'Last updated: 3 days ago', status: 'ready' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Performance Trends
          </h4>
          <div className="space-y-4">
            {[
              { metric: 'Registration Growth', value: '+23%', trend: 'up' },
              { metric: 'Session Attendance', value: '+15%', trend: 'up' },
              { metric: 'Sponsor Engagement', value: '+31%', trend: 'up' },
              { metric: 'App Downloads', value: '+42%', trend: 'up' }
            ].map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">{trend.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">{trend.value}</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h4 className="font-semibold mb-4">Custom Report Generator</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Report Type</label>
            <select className="w-full px-3 py-2 border rounded-lg bg-background">
              <option>Attendance Report</option>
              <option>Revenue Analysis</option>
              <option>Engagement Metrics</option>
              <option>Custom Report</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Date Range</label>
            <select className="w-full px-3 py-2 border rounded-lg bg-background">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Format</label>
            <select className="w-full px-3 py-2 border rounded-lg bg-background">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-accent">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </GlassCard>
    </div>
  );

  const renderIntegrationsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Integrations & API</h3>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: 'Zoom', status: 'Connected', icon: Video, color: 'from-blue-500 to-blue-600' },
          { name: 'Slack', status: 'Connected', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
          { name: 'Stripe', status: 'Connected', icon: DollarSign, color: 'from-green-500 to-green-600' }
        ].map((integration, index) => (
          <GlassCard key={index} hover gradient>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center`}>
                  <integration.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{integration.name}</p>
                  <p className="text-xs text-green-500">{integration.status}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Available Integrations
          </h4>
          <div className="space-y-3">
            {[
              { name: 'Google Calendar', description: 'Sync event schedules', status: 'available' },
              { name: 'Mailchimp', description: 'Email marketing automation', status: 'available' },
              { name: 'Salesforce', description: 'CRM integration', status: 'available' },
              { name: 'HubSpot', description: 'Marketing & sales platform', status: 'available' }
            ].map((app, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{app.name}</p>
                    <p className="text-xs text-muted-foreground">{app.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            API Keys
          </h4>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Production API Key</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background rounded text-xs font-mono">
                  sk_live_••••••••••••••••1234
                </code>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Development API Key</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background rounded text-xs font-mono">
                  sk_test_••••••••••••••••5678
                </code>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Generate New Key
            </Button>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Webhooks
        </h4>
        <div className="space-y-3">
          {[
            { url: 'https://api.example.com/webhook/registration', event: 'New Registration', status: 'active' },
            { url: 'https://api.example.com/webhook/checkin', event: 'Check-in Event', status: 'active' },
            { url: 'https://api.example.com/webhook/payment', event: 'Payment Received', status: 'active' }
          ].map((webhook, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{webhook.event}</p>
                <code className="text-xs text-muted-foreground">{webhook.url}</code>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <Plus className="w-4 h-4 mr-2" />
          Add Webhook
        </Button>
      </GlassCard>
    </div>
  );

  const renderSecurityView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Security & Permissions</h3>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Shield className="w-4 h-4 mr-2" />
          Security Audit
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Active Sessions', value: '24', icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Failed Logins', value: '3', icon: AlertTriangle, color: 'from-red-500 to-red-600' },
          { label: 'API Requests', value: '1,247', icon: Activity, color: 'from-green-500 to-green-600' }
        ].map((stat, index) => (
          <GlassCard key={index} hover gradient>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-gradient-primary">{stat.value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Access Control
          </h4>
          <div className="space-y-3">
            {[
              { role: 'Admin', users: 3, permissions: 'Full Access', color: 'red' },
              { role: 'Event Manager', users: 8, permissions: 'Event Management', color: 'blue' },
              { role: 'Staff', users: 15, permissions: 'Limited Access', color: 'green' },
              { role: 'Viewer', users: 25, permissions: 'Read Only', color: 'gray' }
            ].map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-${role.color}-500/20 flex items-center justify-center`}>
                    <Shield className={`w-5 h-5 text-${role.color}-500`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{role.role}</p>
                    <p className="text-xs text-muted-foreground">{role.permissions}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{role.users} users</p>
                  <Button variant="ghost" size="sm" className="h-6 px-2 mt-1">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Security Settings
          </h4>
          <div className="space-y-4">
            {[
              { setting: 'Two-Factor Authentication', enabled: true },
              { setting: 'Password Expiry (90 days)', enabled: true },
              { setting: 'IP Whitelisting', enabled: false },
              { setting: 'Session Timeout (30 min)', enabled: true }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">{setting.setting}</span>
                <Button 
                  variant={setting.enabled ? "default" : "outline"} 
                  size="sm"
                  className={setting.enabled ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {setting.enabled ? <Lock className="w-4 h-4 mr-1" /> : <Unlock className="w-4 h-4 mr-1" />}
                  {setting.enabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Recent Security Activity
        </h4>
        <div className="space-y-3">
          {[
            { action: 'Admin login from new device', user: 'admin@syncsphere.com', time: '2 hours ago', type: 'warning' },
            { action: 'Password changed successfully', user: 'sarah@syncsphere.com', time: '5 hours ago', type: 'success' },
            { action: 'Failed login attempt', user: 'unknown@example.com', time: '1 day ago', type: 'error' },
            { action: 'API key regenerated', user: 'michael@syncsphere.com', time: '2 days ago', type: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'error' ? 'bg-red-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>
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

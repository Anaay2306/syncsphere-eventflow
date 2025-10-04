import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { 
  TrendingUp, 
  Eye, 
  Users, 
  DollarSign,
  Upload,
  Download,
  Edit,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  BarChart3,
  MousePointer,
  Target,
  Award,
  FileText,
  Image,
  Plus,
  Search,
  Filter,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
  Zap,
  Activity,
  PieChart,
  LineChart
} from "lucide-react";

interface SponsorProfile {
  companyName: string;
  logo: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
}

interface PromotionalMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'banner';
  size: string;
  uploadedAt: string;
  status: 'active' | 'pending' | 'rejected';
  downloads: number;
}

interface EventOpportunity {
  id: string;
  eventName: string;
  organizer: string;
  date: string;
  location: string;
  expectedAttendees: number;
  sponsorshipTiers: string[];
  budget: string;
  deadline: string;
  description: string;
}

interface Analytics {
  impressions: number;
  boothVisits: number;
  clickThroughs: number;
  roi: number;
  conversionRate: number;
  engagementRate: number;
}

export default function SponsorDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState<SponsorProfile>({
    companyName: 'TechCorp Solutions',
    logo: '/api/placeholder/150/150',
    description: 'Leading technology solutions provider specializing in enterprise software and cloud services.',
    website: 'https://techcorp.com',
    email: 'partnerships@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105',
    industry: 'Technology'
  });

  const [materials, setMaterials] = useState<PromotionalMaterial[]>([
    {
      id: '1',
      name: 'Company_Brochure_2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedAt: '2024-10-01T10:30:00Z',
      status: 'active',
      downloads: 45
    },
    {
      id: '2',
      name: 'Logo_Banner_Large.png',
      type: 'banner',
      size: '1.8 MB',
      uploadedAt: '2024-09-28T14:20:00Z',
      status: 'active',
      downloads: 32
    },
    {
      id: '3',
      name: 'Product_Showcase.jpg',
      type: 'image',
      size: '890 KB',
      uploadedAt: '2024-09-25T16:45:00Z',
      status: 'pending',
      downloads: 0
    }
  ]);

  const [eventOpportunities, setEventOpportunities] = useState<EventOpportunity[]>([
    {
      id: '1',
      eventName: 'Tech Innovation Summit 2024',
      organizer: 'Innovation Events Inc',
      date: '2024-12-15',
      location: 'San Francisco, CA',
      expectedAttendees: 2500,
      sponsorshipTiers: ['Platinum', 'Gold', 'Silver'],
      budget: '$50,000 - $150,000',
      deadline: '2024-11-01',
      description: 'Premier technology conference featuring industry leaders and emerging innovations.'
    },
    {
      id: '2',
      eventName: 'Digital Transformation Expo',
      organizer: 'Future Tech Events',
      date: '2024-11-20',
      location: 'New York, NY',
      expectedAttendees: 1800,
      sponsorshipTiers: ['Title', 'Presenting', 'Supporting'],
      budget: '$25,000 - $100,000',
      deadline: '2024-10-15',
      description: 'Explore the latest trends in digital transformation and enterprise solutions.'
    }
  ]);

  const [analytics, setAnalytics] = useState<Analytics>({
    impressions: 125000,
    boothVisits: 3200,
    clickThroughs: 850,
    roi: 340,
    conversionRate: 12.5,
    engagementRate: 8.7
  });

  const [stats, setStats] = useState({
    activeEvents: 5,
    totalImpressions: 125000,
    boothVisits: 3200,
    estimatedROI: 340,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Mock data for now - replace with actual Supabase queries
      setStats({
        activeEvents: 5,
        totalImpressions: 125000,
        boothVisits: 3200,
        estimatedROI: 340,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your sponsor profile has been updated successfully.",
    });
  };

  const handleMaterialUpload = () => {
    toast({
      title: "Material Upload",
      description: "File upload functionality will be implemented with actual file picker.",
    });
  };

  const handleApplyToEvent = (eventId: string) => {
    toast({
      title: "Application Submitted",
      description: "Your sponsorship application has been sent to the organizer.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const statCards = [
    {
      icon: Calendar,
      label: "Active Events",
      value: stats.activeEvents,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Eye,
      label: "Total Impressions",
      value: stats.totalImpressions.toLocaleString(),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      label: "Booth Visits",
      value: stats.boothVisits.toLocaleString(),
      color: "from-green-500 to-green-600",
    },
    {
      icon: DollarSign,
      label: "ROI",
      value: `${stats.estimatedROI}%`,
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Company Profile</h3>
        <Button 
          className="bg-gradient-to-r from-primary to-accent"
          onClick={handleProfileUpdate}
        >
          <Edit className="w-4 h-4 mr-2" />
          Update Profile
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{profile.companyName}</h4>
                <p className="text-sm text-muted-foreground">{profile.industry}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Company Name</label>
                <Input value={profile.companyName} readOnly />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Industry</label>
                <Input value={profile.industry} readOnly />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea value={profile.description} rows={3} readOnly />
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4">Contact Information</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Website</p>
                <p className="font-medium">{profile.website}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{profile.address}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderMaterials = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Promotional Materials</h3>
        <Button 
          className="bg-gradient-to-r from-primary to-accent"
          onClick={handleMaterialUpload}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Material
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { type: 'PDF Documents', icon: FileText, count: materials.filter(m => m.type === 'pdf').length, color: 'from-red-500 to-red-600' },
          { type: 'Images', icon: Image, count: materials.filter(m => m.type === 'image').length, color: 'from-green-500 to-green-600' },
          { type: 'Banners', icon: Award, count: materials.filter(m => m.type === 'banner').length, color: 'from-blue-500 to-blue-600' }
        ].map((category, index) => (
          <GlassCard key={index} hover gradient>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{category.type}</p>
                <p className="text-2xl font-bold text-gradient-primary">{category.count}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h4 className="font-semibold mb-4">Uploaded Materials</h4>
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  {material.type === 'pdf' && <FileText className="w-6 h-6 text-white" />}
                  {material.type === 'image' && <Image className="w-6 h-6 text-white" />}
                  {material.type === 'banner' && <Award className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <p className="font-semibold">{material.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {material.size} • {formatDate(material.uploadedAt)} • {material.downloads} downloads
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(material.status)}>
                  {material.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Impressions', value: analytics.impressions.toLocaleString(), change: '+12%', icon: Eye, color: 'from-purple-500 to-purple-600' },
          { label: 'Booth Visits', value: analytics.boothVisits.toLocaleString(), change: '+8%', icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Click-Throughs', value: analytics.clickThroughs.toLocaleString(), change: '+15%', icon: MousePointer, color: 'from-green-500 to-green-600' },
          { label: 'ROI', value: `${analytics.roi}%`, change: '+23%', icon: TrendingUp, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Conversion Rate', value: `${analytics.conversionRate}%`, change: '+5%', icon: Target, color: 'from-red-500 to-red-600' },
          { label: 'Engagement Rate', value: `${analytics.engagementRate}%`, change: '+7%', icon: Activity, color: 'from-indigo-500 to-indigo-600' }
        ].map((metric, index) => (
          <GlassCard key={index} hover gradient>
            <div className="space-y-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-gradient-primary">{metric.value}</p>
                <p className="text-xs text-green-500 font-medium">{metric.change} vs last month</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Performance Trends
          </h4>
          <div className="space-y-4">
            {[
              { period: 'This Week', impressions: '28,500', visits: '720', ctr: '2.5%' },
              { period: 'Last Week', impressions: '25,200', visits: '650', ctr: '2.6%' },
              { period: 'This Month', impressions: '125,000', visits: '3,200', ctr: '2.6%' },
              { period: 'Last Month', impressions: '110,000', visits: '2,800', ctr: '2.5%' }
            ].map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-medium text-sm">{trend.period}</span>
                <div className="flex gap-4 text-sm">
                  <span>{trend.impressions} views</span>
                  <span>{trend.visits} visits</span>
                  <span className="text-green-500">{trend.ctr} CTR</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Event Performance
          </h4>
          <div className="space-y-3">
            {[
              { event: 'Tech Summit 2024', impressions: 45000, roi: '420%', status: 'active' },
              { event: 'Innovation Expo', impressions: 32000, roi: '380%', status: 'active' },
              { event: 'Digital Conference', impressions: 28000, roi: '290%', status: 'completed' },
              { event: 'Startup Showcase', impressions: 20000, roi: '250%', status: 'completed' }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{event.event}</p>
                  <p className="text-xs text-muted-foreground">{event.impressions.toLocaleString()} impressions</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-500">{event.roi}</p>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Apply for Events</h3>
        <div className="flex gap-2">
          <Input placeholder="Search events..." className="w-64" />
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {eventOpportunities.map((event) => (
          <GlassCard key={event.id} hover className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-xl mb-2">{event.eventName}</h4>
                  <p className="text-muted-foreground mb-3">{event.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span>{event.organizer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{event.expectedAttendees.toLocaleString()} expected attendees</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-green-500">{event.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Deadline: {formatDate(event.deadline)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Available Sponsorship Tiers:</p>
                    <div className="flex flex-wrap gap-2">
                      {event.sponsorshipTiers.map((tier, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tier}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="bg-gradient-to-r from-primary to-accent"
                  onClick={() => handleApplyToEvent(event.id)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Save for Later
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar userRole="sponsor" />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/50">
        {/* Enhanced Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-pulse-slow" />
        </div>

        <div className="relative z-10 p-6 pt-24">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Enhanced Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
                  Sponsor Portal
                </h1>
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Sponsor
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                Manage your sponsorships and track performance
              </p>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard hover gradient className="group cursor-pointer relative overflow-hidden">
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
                  { id: 'profile', label: 'Profile', icon: Building2 },
                  { id: 'materials', label: 'Materials', icon: Upload },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { id: 'events', label: 'Apply for Events', icon: Calendar }
                ].map((tab, index) => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Button
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      onClick={() => setActiveTab(tab.id)}
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
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[500px]"
            >
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'materials' && renderMaterials()}
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'events' && renderEvents()}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

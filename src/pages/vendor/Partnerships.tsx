import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { 
  Handshake,
  Plus,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Star,
  DollarSign,
  Calendar,
  Users,
  Building2,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
  Phone,
  Mail,
  Globe,
  MapPin,
  Award,
  Target,
  Briefcase,
  Network,
  UserCheck,
  FileText,
  Zap
} from "lucide-react";

interface Partnership {
  id: string;
  organizerName: string;
  eventName: string;
  eventType: string;
  location: string;
  date: string;
  budget: string;
  status: 'pending' | 'active' | 'completed' | 'declined';
  rating: number;
  description: string;
  requirements: string[];
  contact: {
    email: string;
    phone: string;
  };
}

interface PartnershipOpportunity {
  id: string;
  title: string;
  organizer: string;
  eventType: string;
  location: string;
  date: string;
  budget: string;
  description: string;
  requirements: string[];
  deadline: string;
  applicants: number;
}

export default function VendorPartnerships() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('active-partnerships');
  const [searchTerm, setSearchTerm] = useState('');

  const [partnerships, setPartnerships] = useState<Partnership[]>([
    {
      id: '1',
      organizerName: 'TechCorp Events',
      eventName: 'Annual Tech Conference 2024',
      eventType: 'Corporate Conference',
      location: 'San Francisco, CA',
      date: '2024-11-15',
      budget: '$5,000 - $8,000',
      status: 'active',
      rating: 4.8,
      description: 'Large-scale tech conference requiring comprehensive AV setup and catering services.',
      requirements: ['Professional AV Equipment', 'Catering for 500+', 'Technical Support'],
      contact: {
        email: 'events@techcorp.com',
        phone: '+1 (555) 123-4567'
      }
    },
    {
      id: '2',
      organizerName: 'Elite Weddings',
      eventName: 'Johnson-Smith Wedding',
      eventType: 'Wedding',
      location: 'Napa Valley, CA',
      date: '2024-10-28',
      budget: '$3,000 - $5,000',
      status: 'active',
      rating: 4.9,
      description: 'Elegant wedding ceremony and reception requiring photography and decoration services.',
      requirements: ['Wedding Photography', 'Floral Arrangements', 'Lighting Setup'],
      contact: {
        email: 'coordinator@eliteweddings.com',
        phone: '+1 (555) 987-6543'
      }
    },
    {
      id: '3',
      organizerName: 'Global Expo Inc',
      eventName: 'International Trade Show',
      eventType: 'Trade Show',
      location: 'Las Vegas, NV',
      date: '2024-12-05',
      budget: '$10,000 - $15,000',
      status: 'completed',
      rating: 4.7,
      description: 'International trade show requiring booth setup and promotional services.',
      requirements: ['Booth Construction', 'Promotional Materials', 'Staff Coordination'],
      contact: {
        email: 'partnerships@globalexpo.com',
        phone: '+1 (555) 456-7890'
      }
    }
  ]);

  const [opportunities, setOpportunities] = useState<PartnershipOpportunity[]>([
    {
      id: '1',
      title: 'Music Festival Production Partner',
      organizer: 'Summer Sounds Festival',
      eventType: 'Music Festival',
      location: 'Austin, TX',
      date: '2024-12-20',
      budget: '$15,000 - $25,000',
      description: 'Seeking experienced vendors for stage setup, sound engineering, and crowd management.',
      requirements: ['Stage Construction', 'Sound Engineering', 'Security Services'],
      deadline: '2024-10-20',
      applicants: 12
    },
    {
      id: '2',
      title: 'Corporate Retreat Services',
      organizer: 'Innovation Labs',
      eventType: 'Corporate Retreat',
      location: 'Lake Tahoe, CA',
      date: '2024-11-30',
      budget: '$8,000 - $12,000',
      description: 'Multi-day corporate retreat requiring catering, transportation, and activity coordination.',
      requirements: ['Catering Services', 'Transportation', 'Team Building Activities'],
      deadline: '2024-10-25',
      applicants: 8
    },
    {
      id: '3',
      title: 'Charity Gala Production',
      organizer: 'Hope Foundation',
      eventType: 'Charity Gala',
      location: 'New York, NY',
      date: '2024-12-15',
      budget: '$6,000 - $10,000',
      description: 'Elegant charity gala requiring full event production and entertainment services.',
      requirements: ['Event Production', 'Entertainment', 'Decoration'],
      deadline: '2024-10-30',
      applicants: 15
    }
  ]);

  const stats = {
    activePartnerships: partnerships.filter(p => p.status === 'active').length,
    completedPartnerships: partnerships.filter(p => p.status === 'completed').length,
    totalRevenue: '$45,000',
    averageRating: (partnerships.reduce((sum, p) => sum + p.rating, 0) / partnerships.length).toFixed(1)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'declined': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleApplyToOpportunity = (opportunityId: string) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been sent to the organizer.",
    });
  };

  const handleContactPartner = (partnershipId: string) => {
    toast({
      title: "Contact Initiated",
      description: "Opening communication channel with the organizer.",
    });
  };

  const renderActivePartnerships = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Active Partnerships</h3>
        <div className="flex gap-2">
          <Input 
            placeholder="Search partnerships..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {partnerships.filter(p => p.status === 'active' || p.status === 'pending').map((partnership) => (
          <GlassCard key={partnership.id} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-xl">{partnership.eventName}</h4>
                  <Badge className={getStatusColor(partnership.status)}>
                    {partnership.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-2">{partnership.organizerName}</p>
                <p className="text-sm text-muted-foreground mb-3">{partnership.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(partnership.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{partnership.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-green-500">{partnership.budget}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{partnership.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{partnership.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{partnership.contact.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {partnership.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-primary to-accent"
                onClick={() => handleContactPartner(partnership.id)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Contract
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Partnership Opportunities</h3>
        <div className="flex gap-2">
          <Input 
            placeholder="Search opportunities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {opportunities.map((opportunity) => (
          <GlassCard key={opportunity.id} hover className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">{opportunity.title}</h4>
                <p className="text-muted-foreground text-sm">{opportunity.organizer}</p>
              </div>
              
              <p className="text-sm text-muted-foreground">{opportunity.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{new Date(opportunity.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-green-500">{opportunity.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{opportunity.applicants} applicants</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity.requirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-primary to-accent flex-1"
                  onClick={() => handleApplyToOpportunity(opportunity.id)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Partnership Analytics</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Success Rate', value: '85%', change: '+5%', icon: Target, color: 'from-green-500 to-green-600' },
          { label: 'Average Project Value', value: '$7,500', change: '+12%', icon: DollarSign, color: 'from-blue-500 to-blue-600' },
          { label: 'Partner Retention', value: '92%', change: '+8%', icon: UserCheck, color: 'from-purple-500 to-purple-600' },
          { label: 'Response Time', value: '2.4 hrs', change: '-15%', icon: Clock, color: 'from-orange-500 to-orange-600' }
        ].map((metric, index) => (
          <GlassCard key={index} hover gradient>
            <div className="space-y-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-gradient-primary">{metric.value}</p>
                <p className="text-xs text-green-500 font-medium">{metric.change} vs last quarter</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4">Partnership History</h4>
          <div className="space-y-3">
            {partnerships.slice(0, 4).map((partnership) => (
              <div key={partnership.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{partnership.eventName}</p>
                  <p className="text-xs text-muted-foreground">{partnership.organizerName}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(partnership.status)}>
                    {partnership.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(partnership.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4">Top Partners</h4>
          <div className="space-y-3">
            {[
              { name: 'TechCorp Events', projects: 5, rating: 4.8, revenue: '$25,000' },
              { name: 'Elite Weddings', projects: 8, rating: 4.9, revenue: '$18,000' },
              { name: 'Global Expo Inc', projects: 3, rating: 4.7, revenue: '$15,000' },
              { name: 'Innovation Labs', projects: 4, rating: 4.6, revenue: '$12,000' }
            ].map((partner, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">{partner.projects} projects</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{partner.rating}</span>
                  </div>
                  <p className="text-xs font-semibold text-green-500">{partner.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  return (
    <>
      <Navbar userRole="vendor" />
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
                  Partnerships
                </h1>
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Vendor Network
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                Manage partnerships and discover new opportunities
              </p>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Active Partnerships', value: stats.activePartnerships, icon: Handshake, color: 'from-blue-500 to-blue-600' },
                { label: 'Completed Projects', value: stats.completedPartnerships, icon: CheckCircle, color: 'from-green-500 to-green-600' },
                { label: 'Total Revenue', value: stats.totalRevenue, icon: DollarSign, color: 'from-purple-500 to-purple-600' },
                { label: 'Average Rating', value: stats.averageRating, icon: Star, color: 'from-yellow-500 to-yellow-600' }
              ].map((stat, index) => (
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
                  { id: 'active-partnerships', label: 'Active Partnerships', icon: Handshake },
                  { id: 'opportunities', label: 'Opportunities', icon: Zap },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
              {activeTab === 'active-partnerships' && renderActivePartnerships()}
              {activeTab === 'opportunities' && renderOpportunities()}
              {activeTab === 'analytics' && renderAnalytics()}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

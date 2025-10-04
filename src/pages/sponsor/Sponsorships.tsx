import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { 
  Building2,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  Eye,
  Send,
  Filter,
  Search,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  BarChart3,
  Activity,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

interface Sponsorship {
  id: string;
  eventName: string;
  organizer: string;
  tier: string;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  startDate: string;
  endDate: string;
  location: string;
  investment: number;
  expectedAttendees: number;
  actualAttendees?: number;
  impressions: number;
  boothVisits: number;
  roi: number;
  description: string;
}

export default function SponsorSponsorships() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([
    {
      id: '1',
      eventName: 'Tech Innovation Summit 2024',
      organizer: 'Innovation Events Inc',
      tier: 'Platinum',
      status: 'active',
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      location: 'San Francisco, CA',
      investment: 75000,
      expectedAttendees: 2500,
      actualAttendees: 2650,
      impressions: 45000,
      boothVisits: 850,
      roi: 420,
      description: 'Premier technology conference featuring industry leaders and emerging innovations.'
    },
    {
      id: '2',
      eventName: 'Digital Transformation Expo',
      organizer: 'Future Tech Events',
      tier: 'Gold',
      status: 'active',
      startDate: '2024-11-20',
      endDate: '2024-11-22',
      location: 'New York, NY',
      investment: 45000,
      expectedAttendees: 1800,
      actualAttendees: 1950,
      impressions: 32000,
      boothVisits: 620,
      roi: 380,
      description: 'Explore the latest trends in digital transformation and enterprise solutions.'
    },
    {
      id: '3',
      eventName: 'AI & Machine Learning Conference',
      organizer: 'Tech Leaders Forum',
      tier: 'Silver',
      status: 'completed',
      startDate: '2024-09-10',
      endDate: '2024-09-12',
      location: 'Austin, TX',
      investment: 25000,
      expectedAttendees: 1200,
      actualAttendees: 1350,
      impressions: 28000,
      boothVisits: 480,
      roi: 290,
      description: 'Deep dive into artificial intelligence and machine learning applications.'
    },
    {
      id: '4',
      eventName: 'Startup Showcase 2024',
      organizer: 'Entrepreneur Network',
      tier: 'Title Sponsor',
      status: 'pending',
      startDate: '2025-01-25',
      endDate: '2025-01-27',
      location: 'Seattle, WA',
      investment: 100000,
      expectedAttendees: 3000,
      impressions: 0,
      boothVisits: 0,
      roi: 0,
      description: 'Showcase of innovative startups and emerging technologies.'
    }
  ]);

  const stats = {
    totalInvestment: sponsorships.reduce((sum, s) => sum + s.investment, 0),
    activeSponsorship: sponsorships.filter(s => s.status === 'active').length,
    totalImpressions: sponsorships.reduce((sum, s) => sum + s.impressions, 0),
    averageROI: Math.round(sponsorships.filter(s => s.roi > 0).reduce((sum, s) => sum + s.roi, 0) / sponsorships.filter(s => s.roi > 0).length)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'platinum': return 'from-slate-400 to-slate-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'title sponsor': return 'from-purple-500 to-purple-700';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewDetails = (sponsorshipId: string) => {
    toast({
      title: "View Details",
      description: `Opening details for sponsorship ${sponsorshipId}`,
    });
  };

  const handleEditSponsorship = (sponsorshipId: string) => {
    toast({
      title: "Edit Sponsorship",
      description: `Editing sponsorship ${sponsorshipId}`,
    });
  };

  const filteredSponsorships = sponsorships.filter(sponsorship => {
    const matchesSearch = sponsorship.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsorship.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || sponsorship.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const renderSponsorshipCard = (sponsorship: Sponsorship) => (
    <GlassCard key={sponsorship.id} hover className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-semibold text-xl">{sponsorship.eventName}</h4>
              <Badge className={getStatusColor(sponsorship.status)}>
                {sponsorship.status}
              </Badge>
              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getTierColor(sponsorship.tier)} text-white text-sm font-semibold`}>
                {sponsorship.tier}
              </div>
            </div>
            <p className="text-muted-foreground mb-3">{sponsorship.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span>{sponsorship.organizer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{formatDate(sponsorship.startDate)} - {formatDate(sponsorship.endDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{sponsorship.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-green-500">{formatCurrency(sponsorship.investment)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {sponsorship.actualAttendees || sponsorship.expectedAttendees} attendees
                    {sponsorship.actualAttendees && ` (${sponsorship.expectedAttendees} expected)`}
                  </span>
                </div>
                {sponsorship.roi > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-green-500">{sponsorship.roi}% ROI</span>
                  </div>
                )}
              </div>
            </div>

            {sponsorship.status !== 'pending' && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gradient-primary">{sponsorship.impressions.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Impressions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gradient-primary">{sponsorship.boothVisits}</p>
                  <p className="text-xs text-muted-foreground">Booth Visits</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gradient-primary">{sponsorship.roi}%</p>
                  <p className="text-xs text-muted-foreground">ROI</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-accent"
            onClick={() => handleViewDetails(sponsorship.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleEditSponsorship(sponsorship.id)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {sponsorship.status === 'completed' && (
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Report
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
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
                  My Sponsorships
                </h1>
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Sponsor Portfolio
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                Manage and track your sponsorship investments
              </p>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Investment', value: formatCurrency(stats.totalInvestment), icon: DollarSign, color: 'from-green-500 to-green-600' },
                { label: 'Active Sponsorships', value: stats.activeSponsorship, icon: Activity, color: 'from-blue-500 to-blue-600' },
                { label: 'Total Impressions', value: stats.totalImpressions.toLocaleString(), icon: Eye, color: 'from-purple-500 to-purple-600' },
                { label: 'Average ROI', value: `${stats.averageROI}%`, icon: TrendingUp, color: 'from-yellow-500 to-yellow-600' }
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

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex gap-2">
                <Input 
                  placeholder="Search sponsorships..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'active', label: 'Active' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'pending', label: 'Pending' }
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={activeTab === tab.id ? 'bg-gradient-to-r from-primary to-accent' : ''}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sponsorships List */}
            <div className="space-y-6">
              {filteredSponsorships.length > 0 ? (
                filteredSponsorships.map(renderSponsorshipCard)
              ) : (
                <GlassCard className="p-12 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">No sponsorships found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                    </div>
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

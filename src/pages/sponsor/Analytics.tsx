import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  Eye,
  Users,
  MousePointer,
  Target,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Award,
  Building2,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

interface ROIMetric {
  period: string;
  investment: number;
  revenue: number;
  roi: number;
  impressions: number;
  conversions: number;
  ctr: number;
}

interface EventROI {
  eventName: string;
  investment: number;
  revenue: number;
  roi: number;
  impressions: number;
  boothVisits: number;
  leads: number;
  status: 'active' | 'completed';
}

export default function SponsorAnalytics() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');

  const [roiMetrics, setROIMetrics] = useState<ROIMetric[]>([
    { period: 'Jan 2024', investment: 50000, revenue: 180000, roi: 260, impressions: 25000, conversions: 125, ctr: 0.5 },
    { period: 'Feb 2024', investment: 45000, revenue: 165000, roi: 267, impressions: 22000, conversions: 110, ctr: 0.5 },
    { period: 'Mar 2024', investment: 60000, revenue: 240000, roi: 300, impressions: 35000, conversions: 175, ctr: 0.5 },
    { period: 'Apr 2024', investment: 55000, revenue: 220000, roi: 300, impressions: 30000, conversions: 150, ctr: 0.5 },
    { period: 'May 2024', investment: 70000, revenue: 315000, roi: 350, impressions: 42000, conversions: 210, ctr: 0.5 },
    { period: 'Jun 2024', investment: 65000, revenue: 292000, roi: 349, impressions: 38000, conversions: 190, ctr: 0.5 }
  ]);

  const [eventROI, setEventROI] = useState<EventROI[]>([
    {
      eventName: 'Tech Innovation Summit 2024',
      investment: 75000,
      revenue: 315000,
      roi: 420,
      impressions: 45000,
      boothVisits: 850,
      leads: 125,
      status: 'active'
    },
    {
      eventName: 'Digital Transformation Expo',
      investment: 45000,
      revenue: 171000,
      roi: 380,
      impressions: 32000,
      boothVisits: 620,
      leads: 95,
      status: 'active'
    },
    {
      eventName: 'AI & Machine Learning Conference',
      investment: 25000,
      revenue: 72500,
      roi: 290,
      impressions: 28000,
      boothVisits: 480,
      leads: 68,
      status: 'completed'
    },
    {
      eventName: 'Cloud Computing Summit',
      investment: 35000,
      revenue: 87500,
      roi: 250,
      impressions: 20000,
      boothVisits: 350,
      leads: 52,
      status: 'completed'
    }
  ]);

  const totalStats = {
    totalInvestment: roiMetrics.reduce((sum, m) => sum + m.investment, 0),
    totalRevenue: roiMetrics.reduce((sum, m) => sum + m.revenue, 0),
    averageROI: Math.round(roiMetrics.reduce((sum, m) => sum + m.roi, 0) / roiMetrics.length),
    totalImpressions: roiMetrics.reduce((sum, m) => sum + m.impressions, 0),
    totalConversions: roiMetrics.reduce((sum, m) => sum + m.conversions, 0),
    averageCTR: (roiMetrics.reduce((sum, m) => sum + m.ctr, 0) / roiMetrics.length).toFixed(2)
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getROITrend = (current: number, previous: number) => {
    if (previous === 0) return { trend: 'neutral', percentage: 0 };
    const change = ((current - previous) / previous) * 100;
    return {
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      percentage: Math.abs(change).toFixed(1)
    };
  };

  const handleExportReport = () => {
    toast({
      title: "Export Report",
      description: "ROI analytics report will be exported to PDF.",
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Analytics data has been updated with latest information.",
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Investment', 
            value: formatCurrency(totalStats.totalInvestment), 
            change: '+12%',
            trend: 'up',
            icon: DollarSign, 
            color: 'from-red-500 to-red-600' 
          },
          { 
            label: 'Total Revenue', 
            value: formatCurrency(totalStats.totalRevenue), 
            change: '+18%',
            trend: 'up',
            icon: TrendingUp, 
            color: 'from-green-500 to-green-600' 
          },
          { 
            label: 'Average ROI', 
            value: `${totalStats.averageROI}%`, 
            change: '+8%',
            trend: 'up',
            icon: Target, 
            color: 'from-blue-500 to-blue-600' 
          },
          { 
            label: 'Total Impressions', 
            value: totalStats.totalImpressions.toLocaleString(), 
            change: '+15%',
            trend: 'up',
            icon: Eye, 
            color: 'from-purple-500 to-purple-600' 
          }
        ].map((stat, index) => (
          <GlassCard key={index} hover gradient>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
                  {stat.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
                  {stat.trend === 'neutral' && <Minus className="w-4 h-4 text-gray-500" />}
                  <span className={`text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 
                    stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
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
            <LineChart className="w-5 h-5 text-primary" />
            ROI Trend Analysis
          </h4>
          <div className="space-y-4">
            {roiMetrics.slice(-4).map((metric, index) => {
              const prevMetric = index > 0 ? roiMetrics[roiMetrics.length - 4 + index - 1] : null;
              const trend = prevMetric ? getROITrend(metric.roi, prevMetric.roi) : { trend: 'neutral', percentage: '0' };
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{metric.period}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(metric.investment)} invested
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-500">{metric.roi}%</span>
                      {trend.trend !== 'neutral' && (
                        <div className="flex items-center gap-1">
                          {trend.trend === 'up' ? 
                            <ArrowUp className="w-3 h-3 text-green-500" /> : 
                            <ArrowDown className="w-3 h-3 text-red-500" />
                          }
                          <span className={`text-xs ${trend.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {trend.percentage}%
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(metric.revenue)} revenue
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Performance Metrics
          </h4>
          <div className="space-y-4">
            {[
              { metric: 'Conversion Rate', value: `${((totalStats.totalConversions / totalStats.totalImpressions) * 100).toFixed(2)}%`, target: '0.8%', status: 'above' },
              { metric: 'Click-Through Rate', value: `${totalStats.averageCTR}%`, target: '0.4%', status: 'above' },
              { metric: 'Cost Per Lead', value: formatCurrency(totalStats.totalInvestment / totalStats.totalConversions), target: '$400', status: 'below' },
              { metric: 'Revenue Per Event', value: formatCurrency(totalStats.totalRevenue / eventROI.length), target: '$150K', status: 'above' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{item.value}</span>
                    <Badge variant={item.status === 'above' ? 'default' : 'secondary'} className="text-xs">
                      {item.status === 'above' ? '↗' : '↘'} {item.target}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.status === 'above' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                    }`}
                    style={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderEventAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Event-by-Event ROI Analysis</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter Events
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {eventROI.map((event, index) => (
          <GlassCard key={index} hover className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">{event.eventName}</h4>
                    <Badge className={event.status === 'active' ? 'bg-green-500' : 'bg-blue-500'}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Investment</p>
                      <p className="text-xl font-bold text-red-500">{formatCurrency(event.investment)}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-xl font-bold text-green-500">{formatCurrency(event.revenue)}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="text-xl font-bold text-gradient-primary">{event.roi}%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Leads Generated</p>
                      <p className="text-xl font-bold text-blue-500">{event.leads}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-gradient-primary">{event.impressions.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Impressions</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gradient-primary">{event.boothVisits}</p>
                  <p className="text-xs text-muted-foreground">Booth Visits</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gradient-primary">{((event.boothVisits / event.impressions) * 100).toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">Conversion Rate</p>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderComparative = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comparative Analysis</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4">ROI by Event Type</h4>
          <div className="space-y-3">
            {[
              { type: 'Technology Conferences', roi: 385, events: 3, color: 'from-blue-500 to-blue-600' },
              { type: 'Industry Summits', roi: 320, events: 2, color: 'from-green-500 to-green-600' },
              { type: 'Trade Shows', roi: 275, events: 2, color: 'from-purple-500 to-purple-600' },
              { type: 'Networking Events', roi: 240, events: 1, color: 'from-yellow-500 to-yellow-600' }
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color}`} />
                  <div>
                    <p className="font-medium text-sm">{category.type}</p>
                    <p className="text-xs text-muted-foreground">{category.events} events</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-500">{category.roi}%</p>
                  <p className="text-xs text-muted-foreground">Avg ROI</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4">Investment vs Revenue</h4>
          <div className="space-y-4">
            {eventROI.slice(0, 4).map((event, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium truncate">{event.eventName}</span>
                  <span className="text-sm font-bold text-green-500">{event.roi}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (event.roi / 500) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{formatCurrency(event.investment)}</span>
                    <span>{formatCurrency(event.revenue)}</span>
                  </div>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
                    ROI Analytics
                  </h1>
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    Advanced Analytics
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground">
                  Track and analyze your sponsorship return on investment
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRefreshData}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button 
                  className="bg-gradient-to-r from-primary to-accent"
                  onClick={handleExportReport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Enhanced Tab Navigation */}
            <div className="glass-card p-2 mb-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'events', label: 'Event Analysis', icon: Calendar },
                  { id: 'comparative', label: 'Comparative', icon: TrendingUp }
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
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'events' && renderEventAnalysis()}
              {activeTab === 'comparative' && renderComparative()}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

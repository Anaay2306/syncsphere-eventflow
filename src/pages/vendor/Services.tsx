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
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Utensils,
  Music,
  Mic,
  Lightbulb,
  Truck,
  Shield,
  Award
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  rating: number;
  bookings: number;
  status: 'active' | 'inactive' | 'pending';
  image: string;
}

export default function VendorServices() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('my-services');

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Professional Photography',
      category: 'Photography',
      description: 'High-quality event photography with professional editing',
      price: '$500-1500',
      duration: '4-8 hours',
      rating: 4.8,
      bookings: 24,
      status: 'active',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: 'Premium Catering Service',
      category: 'Catering',
      description: 'Full-service catering with customizable menus for all event types',
      price: '$25-75 per person',
      duration: 'Event duration',
      rating: 4.9,
      bookings: 18,
      status: 'active',
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      name: 'Audio Visual Setup',
      category: 'Technical',
      description: 'Complete AV setup including sound system, projectors, and lighting',
      price: '$800-2500',
      duration: '6-10 hours',
      rating: 4.7,
      bookings: 15,
      status: 'active',
      image: '/api/placeholder/300/200'
    },
    {
      id: '4',
      name: 'Event Decoration',
      category: 'Decoration',
      description: 'Custom event decoration and theme setup',
      price: '$300-1200',
      duration: '3-5 hours',
      rating: 4.6,
      bookings: 12,
      status: 'pending',
      image: '/api/placeholder/300/200'
    }
  ]);

  const stats = {
    totalServices: services.length,
    activeServices: services.filter(s => s.status === 'active').length,
    totalBookings: services.reduce((sum, s) => sum + s.bookings, 0),
    averageRating: (services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)
  };

  const serviceCategories = [
    { name: 'Photography', icon: Camera, color: 'from-purple-500 to-purple-600' },
    { name: 'Catering', icon: Utensils, color: 'from-orange-500 to-orange-600' },
    { name: 'Music & Entertainment', icon: Music, color: 'from-pink-500 to-pink-600' },
    { name: 'Technical Services', icon: Mic, color: 'from-blue-500 to-blue-600' },
    { name: 'Decoration', icon: Lightbulb, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Transportation', icon: Truck, color: 'from-green-500 to-green-600' }
  ];

  const handleAddService = () => {
    toast({
      title: "Add New Service",
      description: "Service creation form will be implemented.",
    });
  };

  const handleEditService = (serviceId: string) => {
    toast({
      title: "Edit Service",
      description: `Editing service ${serviceId}`,
    });
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
    toast({
      title: "Service Deleted",
      description: "Service has been removed successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const renderMyServices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Services</h3>
        <Button 
          className="bg-gradient-to-r from-primary to-accent"
          onClick={handleAddService}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <GlassCard key={service.id} hover className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Package className="w-12 h-12 text-primary" />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{service.name}</h4>
                  <p className="text-sm text-muted-foreground">{service.category}</p>
                </div>
                <Badge className={getStatusColor(service.status)}>
                  {service.status}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{service.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{service.bookings} bookings</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold text-green-500">{service.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{service.duration}</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditService(service.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteService(service.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderServiceCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Service Categories</h3>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Request New Category
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCategories.map((category, index) => (
          <GlassCard key={index} hover gradient className="group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{category.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {services.filter(s => s.category.toLowerCase().includes(category.name.toLowerCase())).length} services
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Service Analytics</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$12,450', change: '+15%', icon: DollarSign, color: 'from-green-500 to-green-600' },
          { label: 'Bookings This Month', value: '23', change: '+8%', icon: Calendar, color: 'from-blue-500 to-blue-600' },
          { label: 'Average Rating', value: stats.averageRating, change: '+0.2', icon: Star, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Response Rate', value: '94%', change: '+3%', icon: TrendingUp, color: 'from-purple-500 to-purple-600' }
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
          <h4 className="font-semibold mb-4">Recent Bookings</h4>
          <div className="space-y-3">
            {[
              { event: 'Corporate Conference 2024', date: 'Oct 15, 2024', service: 'Photography', status: 'confirmed' },
              { event: 'Wedding Reception', date: 'Oct 18, 2024', service: 'Catering', status: 'pending' },
              { event: 'Product Launch', date: 'Oct 22, 2024', service: 'AV Setup', status: 'confirmed' }
            ].map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{booking.event}</p>
                  <p className="text-xs text-muted-foreground">{booking.service} • {booking.date}</p>
                </div>
                <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4">Performance Metrics</h4>
          <div className="space-y-4">
            {[
              { metric: 'Service Quality', value: '4.8/5', progress: 96 },
              { metric: 'On-Time Delivery', value: '98%', progress: 98 },
              { metric: 'Customer Satisfaction', value: '4.9/5', progress: 98 },
              { metric: 'Repeat Bookings', value: '65%', progress: 65 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.metric}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
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
                  My Services
                </h1>
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Vendor Services
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                Manage your service offerings and track performance
              </p>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Services', value: stats.totalServices, icon: Package, color: 'from-blue-500 to-blue-600' },
                { label: 'Active Services', value: stats.activeServices, icon: CheckCircle, color: 'from-green-500 to-green-600' },
                { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'from-purple-500 to-purple-600' },
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
                  { id: 'my-services', label: 'My Services', icon: Package },
                  { id: 'categories', label: 'Categories', icon: Award },
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
              {activeTab === 'my-services' && renderMyServices()}
              {activeTab === 'categories' && renderServiceCategories()}
              {activeTab === 'analytics' && renderAnalytics()}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Filter,
  Search,
  Plus,
  Eye,
  Heart
} from "lucide-react";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Convention Center, NYC",
      attendees: 250,
      category: "Technology",
      status: "upcoming",
      image: "/api/placeholder/400/200",
      rating: 4.8,
      price: "Free"
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      date: "March 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Online Event",
      attendees: 150,
      category: "Marketing",
      status: "upcoming",
      image: "/api/placeholder/400/200",
      rating: 4.6,
      price: "$49"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Innovation Hub, SF",
      attendees: 300,
      category: "Business",
      status: "upcoming",
      image: "/api/placeholder/400/200",
      rating: 4.9,
      price: "$25"
    }
  ];

  const categories = ["All", "Technology", "Marketing", "Business", "Design", "Health"];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/50">
        {/* Enhanced Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient-primary">
                Discover Events
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find and join amazing events happening around you
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={category === "All" ? "default" : "outline"}
                      size="sm"
                      className={category === "All" ? "bg-gradient-to-r from-primary to-accent" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Filter Button */}
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover className="group overflow-hidden">
                  {/* Event Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-primary/50" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-background/80">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-gradient-primary transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>

                    {/* Rating and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                      <div className="text-lg font-bold text-gradient-primary">
                        {event.price}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-accent">
                        Register Now
                      </Button>
                      <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Create Event CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <GlassCard className="p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gradient-primary">
                  Want to create your own event?
                </h3>
                <p className="text-muted-foreground">
                  Join thousands of organizers using SyncSphere to create amazing events
                </p>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Event
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  );
}

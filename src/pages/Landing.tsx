import { GradientButton } from "@/components/ui/gradient-button";
import { GlassCard } from "@/components/ui/glass-card";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, TrendingUp, Sparkles, CheckCircle2, Zap } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered schedule builder with conflict resolution"
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Tailored experiences for organizers, attendees, vendors & sponsors"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Track engagement, attendance, and ROI instantly"
    },
    {
      icon: Zap,
      title: "Live Updates",
      description: "Real-time announcements and notifications for all participants"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen gradient-hero">
        {/* Enhanced Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-pulse-slow" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-primary/30 animate-glow">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-gradient-primary">Next-Gen Event Management Platform</span>
            </div>

            {/* Main Heading with Enhanced Typography */}
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="text-gradient-primary animate-pulse-slow">
                SyncSphere
              </span>
              <br />
              <span className="text-foreground/90 text-4xl md:text-5xl font-light">
                Where Events Come Alive
              </span>
            </h1>

            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for managing events with AI-powered scheduling, 
              real-time collaboration, and seamless multi-role coordination
            </p>

            {/* Animated Stats */}
            <div className="flex flex-wrap justify-center gap-8 py-8">
              {[
                { label: "Events Managed", value: "10K+", icon: Calendar },
                { label: "Active Users", value: "50K+", icon: Users },
                { label: "Success Rate", value: "99%", icon: TrendingUp },
              ].map((stat, index) => (
                <div key={stat.label} className="glass-card text-center animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <GradientButton 
                size="lg" 
                onClick={() => navigate("/auth")} 
                className="w-full sm:w-auto text-lg px-8 py-4 animate-glow"
              >
                Get Started Free
                <Sparkles className="w-5 h-5 ml-2" />
              </GradientButton>
              <GradientButton 
                size="lg" 
                variant="secondary" 
                onClick={() => navigate("/auth")} 
                className="w-full sm:w-auto text-lg px-8 py-4 glass-card-hover"
              >
                Watch Demo
                <Calendar className="w-5 h-5 ml-2" />
              </GradientButton>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="relative z-10 py-32 px-4 bg-gradient-to-b from-transparent to-background/50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/30">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Platform Features</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold">
                <span className="text-gradient-primary">
                  Why Choose SyncSphere?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Everything you need to create, manage, and scale successful events with cutting-edge technology
              </p>
            </div>

            {/* Enhanced Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <GlassCard 
                  key={index} 
                  hover 
                  gradient
                  className="group relative overflow-hidden"
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex items-start gap-6">
                    {/* Enhanced Icon */}
                    <div className="relative">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <feature.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Success Indicator */}
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-success group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Additional Feature Highlights */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, label: "Multi-Role Support", value: "4 User Types" },
                { icon: Calendar, label: "Event Types", value: "Unlimited" },
                { icon: TrendingUp, label: "Analytics", value: "Real-time" },
                { icon: Zap, label: "Performance", value: "Lightning Fast" },
              ].map((item, index) => (
                <div key={item.label} className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gradient-primary">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="relative z-10 py-32 px-4">
          <div className="max-w-5xl mx-auto">
            <GlassCard 
              gradient 
              glow 
              className="relative overflow-hidden text-center space-y-8 p-16"
            >
              {/* Animated Background Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                  backgroundSize: '50px 50px'
                }} />
              </div>
              
              <div className="relative z-10 space-y-8">
                {/* Floating Icons */}
                <div className="flex justify-center gap-4 mb-8">
                  {[Calendar, Users, TrendingUp, Sparkles].map((Icon, index) => (
                    <div 
                      key={index}
                      className="w-12 h-12 rounded-full glass flex items-center justify-center animate-float"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  ))}
                </div>

                <h2 className="text-4xl md:text-6xl font-bold">
                  <span className="text-gradient-primary">
                    Ready to Transform
                  </span>
                  <br />
                  <span className="text-foreground">Your Events?</span>
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Join thousands of event organizers, attendees, vendors, and sponsors already using SyncSphere 
                  to create unforgettable experiences with cutting-edge technology
                </p>

                {/* Enhanced Stats Row */}
                <div className="flex flex-wrap justify-center gap-8 py-8">
                  {[
                    { value: "10,000+", label: "Events Created" },
                    { value: "50,000+", label: "Happy Users" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "24/7", label: "Support" },
                  ].map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-bold text-gradient-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                  <GradientButton 
                    size="lg" 
                    onClick={() => navigate("/auth")} 
                    className="text-xl px-12 py-6 animate-glow shadow-2xl"
                  >
                    Start Your Journey
                    <Sparkles className="w-6 h-6 ml-3" />
                  </GradientButton>
                  <div className="text-sm text-muted-foreground">
                    ✨ No credit card required • Free 30-day trial
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </div>
    </>
  );
}

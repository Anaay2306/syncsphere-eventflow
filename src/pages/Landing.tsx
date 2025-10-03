import { GradientButton } from "@/components/ui/gradient-button";
import { GlassCard } from "@/components/ui/glass-card";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary-foreground">Next-Gen Event Management</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              SyncSphere
            </span>
            <br />
            <span className="text-foreground">Where Events Come Alive</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate platform for managing events with AI-powered scheduling, 
            real-time collaboration, and seamless multi-role coordination
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <GradientButton size="lg" onClick={() => navigate("/auth")} className="w-full sm:w-auto">
              Get Started
              <Sparkles className="w-4 h-4" />
            </GradientButton>
            <GradientButton size="lg" variant="secondary" onClick={() => navigate("/auth")} className="w-full sm:w-auto">
              Sign In
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Why SyncSphere?
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to run successful events, all in one intelligent platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <GlassCard 
                key={index} 
                hover 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="text-center space-y-6 p-12 animate-fade-in bg-gradient-to-br from-card to-primary/5">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Events?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join event organizers, attendees, vendors, and sponsors already using SyncSphere 
              to create unforgettable experiences
            </p>
            <GradientButton size="lg" onClick={() => navigate("/auth")} className="mt-4">
              Start Your Journey
              <Sparkles className="w-4 h-4" />
            </GradientButton>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

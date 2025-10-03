import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  User, 
  Palette,
  Globe,
  Lock,
  Mail,
  Smartphone,
  Eye,
  Volume2
} from "lucide-react";

export default function Settings() {
  const settingsCategories = [
    {
      title: "Account Settings",
      icon: User,
      settings: [
        { label: "Email Notifications", description: "Receive email updates about events", enabled: true },
        { label: "SMS Notifications", description: "Get text messages for important updates", enabled: false },
        { label: "Marketing Emails", description: "Receive promotional content and offers", enabled: true },
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      settings: [
        { label: "Profile Visibility", description: "Make your profile visible to other users", enabled: true },
        { label: "Two-Factor Authentication", description: "Add extra security to your account", enabled: false },
        { label: "Data Sharing", description: "Allow anonymous usage data collection", enabled: true },
      ]
    },
    {
      title: "Appearance",
      icon: Palette,
      settings: [
        { label: "Dark Mode", description: "Use dark theme across the application", enabled: true },
        { label: "Reduced Motion", description: "Minimize animations and transitions", enabled: false },
        { label: "High Contrast", description: "Increase contrast for better visibility", enabled: false },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        { label: "Push Notifications", description: "Receive browser notifications", enabled: true },
        { label: "Sound Alerts", description: "Play sounds for notifications", enabled: true },
        { label: "Event Reminders", description: "Get reminded about upcoming events", enabled: true },
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
        </div>

        <div className="relative z-10 p-6 max-w-4xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient-primary">Settings</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Customize your SyncSphere experience
            </p>
          </motion.div>

          <div className="space-y-6">
            {settingsCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                      <category.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-gradient-primary">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.settings.map((setting, settingIndex) => (
                      <div key={setting.label} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{setting.label}</h3>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                        <Switch defaultChecked={setting.enabled} />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold text-gradient-primary mb-6">Account Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Export Data</div>
                    <div className="text-sm text-muted-foreground">Download your account data</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Reset Preferences</div>
                    <div className="text-sm text-muted-foreground">Restore default settings</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4 text-orange-500 hover:text-orange-600">
                  <div className="text-left">
                    <div className="font-medium">Deactivate Account</div>
                    <div className="text-sm text-muted-foreground">Temporarily disable your account</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4 text-red-500 hover:text-red-600">
                  <div className="text-left">
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm text-muted-foreground">Permanently remove your account</div>
                  </div>
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Save Changes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent px-8">
              Save Changes
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
  Volume2,
  Download,
  RotateCcw,
  UserX,
  Trash2,
  Save,
  AlertTriangle
} from "lucide-react";

interface UserSettings {
  // Account Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  
  // Privacy & Security
  profileVisibility: boolean;
  twoFactorAuth: boolean;
  dataSharing: boolean;
  
  // Appearance
  darkMode: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  
  // Notifications
  pushNotifications: boolean;
  soundAlerts: boolean;
  eventReminders: boolean;
}

const defaultSettings: UserSettings = {
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: true,
  profileVisibility: true,
  twoFactorAuth: false,
  dataSharing: true,
  darkMode: true,
  reducedMotion: false,
  highContrast: false,
  pushNotifications: true,
  soundAlerts: true,
  eventReminders: true,
};

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        const newSettings = { ...defaultSettings, ...parsed };
        setSettings(newSettings);
        applyThemeSettings(newSettings);
      } catch (error) {
        console.error('Error parsing saved settings:', error);
        applyThemeSettings(defaultSettings);
      }
    } else {
      applyThemeSettings(defaultSettings);
    }
  }, []);

  // Apply theme and accessibility settings to the DOM
  const applyThemeSettings = (settingsToApply = settings) => {
    const root = document.documentElement;
    
    if (settingsToApply.darkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    
    if (settingsToApply.reducedMotion) {
      root.style.setProperty('--motion-reduce', 'reduce');
    } else {
      root.style.setProperty('--motion-reduce', 'no-preference');
    }
    
    if (settingsToApply.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  };

  // Update a specific setting
  const updateSetting = (key: keyof UserSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    setHasChanges(true);
    
    // Apply theme changes immediately for appearance settings
    if (['darkMode', 'reducedMotion', 'highContrast'].includes(key)) {
      setTimeout(() => applyThemeSettings(newSettings), 100);
    }
    
    // Handle special cases
    if (key === 'pushNotifications' && value) {
      requestNotificationPermission();
    }
    
    if (key === 'twoFactorAuth' && value) {
      handleTwoFactorSetup();
    }
  };

  // Request browser notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive browser notifications.",
        });
      } else {
        toast({
          title: "Notifications Blocked",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        });
        updateSetting('pushNotifications', false);
      }
    }
  };

  // Handle Two-Factor Authentication setup
  const handleTwoFactorSetup = () => {
    toast({
      title: "Two-Factor Authentication",
      description: "2FA setup would redirect to authentication provider. Feature simulated.",
    });
  };

  // Save settings to localStorage and potentially to backend
  const saveSettings = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Simulate API call to save to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Apply all theme settings
      applyThemeSettings();
      
      setHasChanges(false);
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Saving Settings",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset all settings to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
    localStorage.removeItem('userSettings');
    toast({
      title: "Settings Reset",
      description: "All preferences have been restored to defaults.",
    });
  };

  // Export user data
  const exportData = () => {
    const userData = {
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `syncsphere-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Your account data has been downloaded.",
    });
  };

  // Deactivate account
  const deactivateAccount = async () => {
    if (window.confirm('Are you sure you want to deactivate your account? This action can be reversed.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Account Deactivated",
          description: "Your account has been temporarily disabled. Contact support to reactivate.",
        });
        
        // In a real app, this would sign out the user
        await supabase.auth.signOut();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to deactivate account. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Delete account permanently
  const deleteAccount = async () => {
    const confirmation = window.prompt('Type "DELETE" to confirm permanent account deletion:');
    if (confirmation === 'DELETE') {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Account Deleted",
          description: "Your account has been permanently deleted.",
        });
        
        // In a real app, this would delete all user data
        await supabase.auth.signOut();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete account. Please contact support.",
          variant: "destructive",
        });
      }
    } else if (confirmation !== null) {
      toast({
        title: "Deletion Cancelled",
        description: "Account deletion was cancelled.",
      });
    }
  };

  const settingsCategories = [
    {
      title: "Account Settings",
      icon: User,
      settings: [
        { 
          key: 'emailNotifications' as keyof UserSettings, 
          label: "Email Notifications", 
          description: "Receive email updates about events",
          icon: Mail
        },
        { 
          key: 'smsNotifications' as keyof UserSettings, 
          label: "SMS Notifications", 
          description: "Get text messages for important updates",
          icon: Smartphone
        },
        { 
          key: 'marketingEmails' as keyof UserSettings, 
          label: "Marketing Emails", 
          description: "Receive promotional content and offers",
          icon: Mail
        },
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      settings: [
        { 
          key: 'profileVisibility' as keyof UserSettings, 
          label: "Profile Visibility", 
          description: "Make your profile visible to other users",
          icon: Eye
        },
        { 
          key: 'twoFactorAuth' as keyof UserSettings, 
          label: "Two-Factor Authentication", 
          description: "Add extra security to your account",
          icon: Lock
        },
        { 
          key: 'dataSharing' as keyof UserSettings, 
          label: "Data Sharing", 
          description: "Allow anonymous usage data collection",
          icon: Globe
        },
      ]
    },
    {
      title: "Appearance",
      icon: Palette,
      settings: [
        { 
          key: 'darkMode' as keyof UserSettings, 
          label: "Dark Mode", 
          description: "Use dark theme across the application",
          icon: Palette
        },
        { 
          key: 'reducedMotion' as keyof UserSettings, 
          label: "Reduced Motion", 
          description: "Minimize animations and transitions",
          icon: SettingsIcon
        },
        { 
          key: 'highContrast' as keyof UserSettings, 
          label: "High Contrast", 
          description: "Increase contrast for better visibility",
          icon: Eye
        },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        { 
          key: 'pushNotifications' as keyof UserSettings, 
          label: "Push Notifications", 
          description: "Receive browser notifications",
          icon: Bell
        },
        { 
          key: 'soundAlerts' as keyof UserSettings, 
          label: "Sound Alerts", 
          description: "Play sounds for notifications",
          icon: Volume2
        },
        { 
          key: 'eventReminders' as keyof UserSettings, 
          label: "Event Reminders", 
          description: "Get reminded about upcoming events",
          icon: Bell
        },
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
            {hasChanges && (
              <div className="flex items-center justify-center gap-2 text-amber-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">You have unsaved changes</span>
              </div>
            )}
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
                    {category.settings.map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                        <div className="flex items-center gap-3 flex-1">
                          <setting.icon className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium text-foreground">{setting.label}</h3>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={settings[setting.key]} 
                          onCheckedChange={(checked) => updateSetting(setting.key, checked)}
                        />
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
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                  <SettingsIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-gradient-primary">Account Actions</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4 hover:bg-primary/5"
                  onClick={exportData}
                >
                  <Download className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Export Data</div>
                    <div className="text-sm text-muted-foreground">Download your account data</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4 hover:bg-primary/5"
                  onClick={resetSettings}
                >
                  <RotateCcw className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Reset Preferences</div>
                    <div className="text-sm text-muted-foreground">Restore default settings</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  onClick={deactivateAccount}
                >
                  <UserX className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Deactivate Account</div>
                    <div className="text-sm text-muted-foreground">Temporarily disable your account</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={deleteAccount}
                >
                  <Trash2 className="w-5 h-5 mr-3" />
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
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent px-8"
              onClick={saveSettings}
              disabled={!hasChanges || isLoading}
            >
              <Save className="w-5 h-5 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  User, 
  Sun, 
  Moon, 
  Calendar,
  Users,
  Building2,
  Package,
  LogOut,
  Settings,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  userRole?: 'organizer' | 'attendee' | 'sponsor' | 'vendor' | null;
}

export default function Navbar({ userRole }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  const navItems = [
    { 
      label: 'Home', 
      icon: Home, 
      href: '/', 
      show: true 
    },
    { 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      href: '/dashboard', 
      show: isAuthenticated 
    },
    { 
      label: 'Events', 
      icon: Calendar, 
      href: '/events', 
      show: isAuthenticated 
    },
    { 
      label: 'Profile', 
      icon: User, 
      href: '/profile', 
      show: isAuthenticated 
    },
  ];

  const roleSpecificItems = {
    organizer: [
      { label: 'Manage Events', icon: Calendar, href: '/organizer/events' },
      { label: 'Analytics', icon: BarChart3, href: '/organizer/analytics' },
    ],
    attendee: [
      { label: 'My Events', icon: Calendar, href: '/attendee/events' },
      { label: 'Networking', icon: Users, href: '/attendee/networking' },
    ],
    sponsor: [
      { label: 'Sponsorships', icon: Building2, href: '/sponsor/sponsorships' },
      { label: 'ROI Tracking', icon: TrendingUp, href: '/sponsor/analytics' },
    ],
    vendor: [
      { label: 'Services', icon: Package, href: '/vendor/services' },
      { label: 'Bookings', icon: Calendar, href: '/vendor/bookings' },
    ],
  };

  const currentRoleItems = userRole ? roleSpecificItems[userRole] || [] : [];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gradient-primary">SyncSphere</span>
                {userRole && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {userRole}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.filter(item => item.show).map((item) => (
                <motion.div key={item.href} whileHover={{ y: -2 }}>
                  <Button
                    variant={location.pathname === item.href ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate(item.href)}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}

              {/* Role-specific items */}
              {currentRoleItems.map((item) => (
                <motion.div key={item.href} whileHover={{ y: -2 }}>
                  <Button
                    variant={location.pathname === item.href ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate(item.href)}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-9 h-9 p-0"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>

              {/* Auth Buttons */}
              {!isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/auth')}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                  >
                    Get Started
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/profile')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-9 h-9 p-0"
                >
                  {isOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden glass border-b border-glass-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.filter(item => item.show).map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Button
                    variant={location.pathname === item.href ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(item.href);
                      setIsOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}

              {/* Role-specific mobile items */}
              {currentRoleItems.map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    variant={location.pathname === item.href ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(item.href);
                      setIsOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}

              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t border-glass-border space-y-2">
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/auth');
                        setIsOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-accent"
                      onClick={() => {
                        navigate('/auth');
                        setIsOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/profile');
                        setIsOpen(false);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />
    </>
  );
}

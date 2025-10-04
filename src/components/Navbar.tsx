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
  TrendingUp,
  Mic,
  Handshake
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
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status and get user role
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        // Get user role from user metadata or database
        const role = session.user.user_metadata?.role || userRole || 'attendee';
        setCurrentUserRole(role);
      } else {
        setCurrentUserRole(null);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        const role = session.user.user_metadata?.role || userRole || 'attendee';
        setCurrentUserRole(role);
      } else {
        setCurrentUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [userRole]);

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

  // Determine if we're on landing page or in app
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';
  
  // Landing page navigation (public)
  const landingNavItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Features', icon: BarChart3, href: '#features' },
    { label: 'About', icon: Users, href: '#about' },
    { label: 'Contact', icon: User, href: '#contact' },
  ];

  // Authenticated app navigation (common for all roles)
  const appNavItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Events', icon: Calendar, href: '/events' },
    { label: 'Profile', icon: User, href: '/profile' },
  ];

  // Role-specific navigation items
  const roleSpecificItems = {
    organizer: [
      { label: 'Manage Events', icon: Calendar, href: '/organizer/events' },
      { label: 'Analytics', icon: BarChart3, href: '/organizer/analytics' },
      { label: 'Speakers', icon: Mic, href: '/organizer/speakers' },
    ],
    attendee: [
      { label: 'My Agenda', icon: Calendar, href: '/attendee/agenda' },
      { label: 'Networking', icon: Users, href: '/attendee/networking' },
    ],
    sponsor: [
      { label: 'Sponsorships', icon: Building2, href: '/sponsor/sponsorships' },
      { label: 'ROI Analytics', icon: TrendingUp, href: '/sponsor/analytics' },
    ],
    vendor: [
      { label: 'Services', icon: Package, href: '/vendor/services' },
      { label: 'Partnerships', icon: Handshake, href: '/vendor/partnerships' },
    ],
  };

  // Get current navigation items based on context
  const getNavigationItems = () => {
    if (isLandingPage || isAuthPage || !isAuthenticated) {
      return landingNavItems;
    }
    
    // For authenticated users, show app navigation + role-specific items
    const roleItems = currentUserRole ? roleSpecificItems[currentUserRole as keyof typeof roleSpecificItems] || [] : [];
    return [...appNavItems, ...roleItems];
  };

  const navigationItems = getNavigationItems();

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
              onClick={() => {
                if (isAuthenticated) {
                  // Redirect to dashboard for authenticated users
                  navigate('/dashboard');
                } else {
                  // Redirect to landing page for non-authenticated users
                  navigate('/');
                }
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gradient-primary">SyncSphere</span>
                {isAuthenticated && currentUserRole && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {currentUserRole}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <motion.div key={item.href} whileHover={{ y: -2 }}>
                  <Button
                    variant={location.pathname === item.href ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      if (item.href.startsWith('#')) {
                        // Handle anchor links for landing page with offset for fixed navbar
                        const element = document.querySelector(item.href) as HTMLElement;
                        if (element) {
                          const offsetTop = element.offsetTop - 80; // Account for navbar height
                          window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                          });
                        }
                      } else {
                        navigate(item.href);
                      }
                    }}
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
                    onClick={() => navigate('/settings')}
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
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    variant={location.pathname === item.href ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      if (item.href.startsWith('#')) {
                        // Handle anchor links for landing page with offset for fixed navbar
                        const element = document.querySelector(item.href) as HTMLElement;
                        if (element) {
                          const offsetTop = element.offsetTop - 80; // Account for navbar height
                          window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                          });
                        }
                      } else {
                        navigate(item.href);
                      }
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
                        navigate('/settings');
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

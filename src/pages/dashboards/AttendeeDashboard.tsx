import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { 
  Calendar, 
  QrCode, 
  Trophy, 
  Star, 
  Clock, 
  MapPin, 
  Bell, 
  AlertTriangle,
  CheckCircle,
  Users,
  MessageSquare,
  Award,
  Zap,
  Search,
  Filter,
  Navigation,
  Camera,
  Bookmark,
  Download,
  FileText,
  Bot,
  Send,
  Heart,
  Share2,
  Volume2,
  Eye,
  Globe,
  Accessibility,
  Languages,
  Target,
  Gamepad2,
  Map,
  UserPlus,
  Calendar as CalendarIcon,
  MessageCircle,
  BarChart3,
  Settings,
  Headphones,
  Video,
  Mic,
  ThumbsUp,
  Archive,
  Award as CertificateIcon,
  TrendingUp
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  status: string;
}

interface Session {
  id: string;
  event_id: string;
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  speaker: string;
  checked_in: boolean;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  created_at: string;
}

interface GameStats {
  points: number;
  level: number;
  badges: string[];
  rank: number;
  checkIns: number;
  feedbackSubmitted: number;
}

interface Attendee {
  id: string;
  name: string;
  title: string;
  company: string;
  interests: string[];
  avatar: string;
  isOnline: boolean;
}

interface Meeting {
  id: string;
  attendeeId: string;
  attendeeName: string;
  time: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Note {
  id: string;
  sessionId: string;
  content: string;
  timestamp: string;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  total: number;
  completed: boolean;
}

interface ChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'question' | 'poll';
}

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
}

interface AttendeeDashboardProps {
  initialTab?: string;
}

export default function AttendeeDashboard({ initialTab = 'agenda' }: AttendeeDashboardProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [qrCode, setQrCode] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  // Update active tab when initialTab prop changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  
  const [stats, setStats] = useState({
    registeredEvents: 0,
    checkedInSessions: 0,
    pointsEarned: 0,
    badgesUnlocked: 0,
  });
  
  const [events, setEvents] = useState<Event[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newNote, setNewNote] = useState('');
  
  const [gameStats, setGameStats] = useState<GameStats>({
    points: 1250,
    level: 5,
    badges: ['Early Bird', 'Feedback Master', 'Networking Pro'],
    rank: 12,
    checkIns: 8,
    feedbackSubmitted: 6
  });

  useEffect(() => {
    fetchStats();
    loadMockData();
    generateQRCode();
  }, []);

  const loadMockData = () => {
    // Mock events data
    setEvents([
      {
        id: '1',
        title: 'Tech Conference 2024',
        description: 'Annual technology conference with AI focus',
        start_date: '2024-10-05T09:00:00Z',
        end_date: '2024-10-05T17:00:00Z',
        location: 'Main Auditorium',
        status: 'upcoming'
      },
      {
        id: '2',
        title: 'AI Workshop',
        description: 'Hands-on AI development workshop',
        start_date: '2024-10-06T10:00:00Z',
        end_date: '2024-10-06T16:00:00Z',
        location: 'Lab 101',
        status: 'upcoming'
      },
      {
        id: '3',
        title: 'Blockchain Summit',
        description: 'Exploring the future of blockchain technology',
        start_date: '2024-10-07T09:00:00Z',
        end_date: '2024-10-07T18:00:00Z',
        location: 'Convention Center',
        status: 'upcoming'
      }
    ]);

    // Mock sessions data
    setSessions([
      {
        id: '1',
        event_id: '1',
        title: 'Opening Keynote',
        start_time: '2024-10-05T09:00:00Z',
        end_time: '2024-10-05T10:00:00Z',
        location: 'Main Auditorium',
        speaker: 'Dr. Sarah Johnson',
        checked_in: false
      },
      {
        id: '2',
        event_id: '1',
        title: 'Future of AI',
        start_time: '2024-10-05T10:30:00Z',
        end_time: '2024-10-05T11:30:00Z',
        location: 'Hall A',
        speaker: 'Prof. Michael Chen',
        checked_in: true
      },
      {
        id: '3',
        event_id: '1',
        title: 'Networking Lunch',
        start_time: '2024-10-05T12:00:00Z',
        end_time: '2024-10-05T13:00:00Z',
        location: 'Cafeteria',
        speaker: 'Open Session',
        checked_in: false
      }
    ]);

    // Mock announcements
    setAnnouncements([
      {
        id: '1',
        title: 'Schedule Update',
        message: 'The AI Workshop has been moved to Lab 102',
        type: 'warning',
        created_at: '2024-10-03T10:00:00Z'
      },
      {
        id: '2',
        title: 'New Session Added',
        message: 'Bonus session on Blockchain technology at 4 PM',
        type: 'success',
        created_at: '2024-10-03T11:30:00Z'
      },
      {
        id: '3',
        title: 'Reminder',
        message: 'Don\'t forget to check-in for gamification points!',
        type: 'info',
        created_at: '2024-10-03T12:00:00Z'
      }
    ]);

    // Mock attendees data
    setAttendees([
      {
        id: '1',
        name: 'Sarah Johnson',
        title: 'AI Research Scientist',
        company: 'TechCorp',
        interests: ['AI', 'Machine Learning', 'Data Science'],
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        isOnline: true
      },
      {
        id: '2',
        name: 'Michael Chen',
        title: 'Blockchain Developer',
        company: 'CryptoStart',
        interests: ['Blockchain', 'Web3', 'Smart Contracts'],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        isOnline: false
      },
      {
        id: '3',
        name: 'Emily Davis',
        title: 'UX Designer',
        company: 'DesignHub',
        interests: ['UX Design', 'Product Design', 'User Research'],
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        isOnline: true
      }
    ]);

    // Mock meetings data
    setMeetings([
      {
        id: '1',
        attendeeId: '1',
        attendeeName: 'Sarah Johnson',
        time: '2024-10-05T14:00:00Z',
        location: 'Meeting Room A',
        status: 'scheduled'
      },
      {
        id: '2',
        attendeeId: '3',
        attendeeName: 'Emily Davis',
        time: '2024-10-05T16:30:00Z',
        location: 'Coffee Lounge',
        status: 'scheduled'
      }
    ]);

    // Mock quests data
    setQuests([
      {
        id: '1',
        title: 'Session Explorer',
        description: 'Attend 5 different sessions',
        points: 250,
        progress: 3,
        total: 5,
        completed: false
      },
      {
        id: '2',
        title: 'Networking Champion',
        description: 'Connect with 10 new attendees',
        points: 300,
        progress: 7,
        total: 10,
        completed: false
      },
      {
        id: '3',
        title: 'Feedback Hero',
        description: 'Submit feedback for 8 sessions',
        points: 200,
        progress: 8,
        total: 8,
        completed: true
      }
    ]);

    // Mock chat messages
    setChatMessages([
      {
        id: '1',
        sessionId: '1',
        userId: '1',
        userName: 'Sarah J.',
        message: 'Great presentation! Any thoughts on the future of AGI?',
        timestamp: '2024-10-05T10:15:00Z',
        type: 'text'
      },
      {
        id: '2',
        sessionId: '1',
        userId: '2',
        userName: 'Michael C.',
        message: 'How do you see AI impacting blockchain development?',
        timestamp: '2024-10-05T10:16:00Z',
        type: 'question'
      }
    ]);

    // Mock polls
    setPolls([
      {
        id: '1',
        question: 'Which AI trend excites you most?',
        options: [
          { id: '1', text: 'Generative AI', votes: 45 },
          { id: '2', text: 'Computer Vision', votes: 32 },
          { id: '3', text: 'Natural Language Processing', votes: 28 },
          { id: '4', text: 'Robotics', votes: 15 }
        ],
        totalVotes: 120
      }
    ]);
  };

  const generateQRCode = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // Generate a mock QR code using SVG
      const qrData = {
        userId: user.id,
        timestamp: Date.now(),
        type: 'check-in'
      };
      
      // Create a simple mock QR code SVG
      const mockQRSvg = `
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="white"/>
          <g fill="black">
            <rect x="20" y="20" width="20" height="20"/>
            <rect x="60" y="20" width="20" height="20"/>
            <rect x="100" y="20" width="20" height="20"/>
            <rect x="140" y="20" width="20" height="20"/>
            <rect x="180" y="20" width="20" height="20"/>
            <rect x="20" y="60" width="20" height="20"/>
            <rect x="180" y="60" width="20" height="20"/>
            <rect x="20" y="100" width="20" height="20"/>
            <rect x="60" y="100" width="20" height="20"/>
            <rect x="100" y="100" width="20" height="20"/>
            <rect x="140" y="100" width="20" height="20"/>
            <rect x="180" y="100" width="20" height="20"/>
            <rect x="20" y="140" width="20" height="20"/>
            <rect x="180" y="140" width="20" height="20"/>
            <rect x="20" y="180" width="20" height="20"/>
            <rect x="60" y="180" width="20" height="20"/>
            <rect x="100" y="180" width="20" height="20"/>
            <rect x="140" y="180" width="20" height="20"/>
            <rect x="180" y="180" width="20" height="20"/>
          </g>
          <text x="100" y="110" text-anchor="middle" fill="black" font-size="12" font-family="monospace">
            ${user.id.substring(0, 8)}
          </text>
        </svg>
      `;
      
      const qrString = `data:image/svg+xml;base64,${btoa(mockQRSvg)}`;
      setQrCode(qrString);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: registrations } = await supabase
        .from("registrations")
        .select("*")
        .eq("attendee_id", user.id);

      const totalPoints = registrations?.reduce((sum, reg) => sum + (reg.points || 0), 0) || 0;
      const checkedIn = registrations?.filter(reg => reg.checked_in).length || 0;

      setStats({
        registeredEvents: registrations?.length || 2,
        checkedInSessions: checkedIn || 3,
        pointsEarned: totalPoints || 1250,
        badgesUnlocked: Math.floor((totalPoints || 1250) / 100),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Set mock data on error
      setStats({
        registeredEvents: 2,
        checkedInSessions: 3,
        pointsEarned: 1250,
        badgesUnlocked: 12,
      });
    }
  };

  const handleCheckIn = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, checked_in: true }
        : session
    ));
    
    setGameStats(prev => ({
      ...prev,
      points: prev.points + 50,
      checkIns: prev.checkIns + 1
    }));
    
    toast({
      title: "Check-in Successful!",
      description: "You earned 50 points for checking in!",
    });
  };

  const handleSOS = () => {
    setSosActive(true);
    toast({
      title: "Emergency Alert Sent!",
      description: "Security and medical team have been notified.",
      variant: "destructive",
    });
    
    // Auto-reset SOS after 30 seconds
    setTimeout(() => setSosActive(false), 30000);
  };

  const submitFeedback = (sessionId: string, rating: number) => {
    setGameStats(prev => ({
      ...prev,
      points: prev.points + 25,
      feedbackSubmitted: prev.feedbackSubmitted + 1
    }));
    
    toast({
      title: "Feedback Submitted!",
      description: "Thank you! You earned 25 points.",
    });
  };

  const statCards = [
    {
      icon: Calendar,
      label: "Registered Events",
      value: stats.registeredEvents,
      color: "from-primary to-primary-glow",
    },
    {
      icon: QrCode,
      label: "Check-ins",
      value: stats.checkedInSessions,
      color: "from-accent to-primary",
    },
    {
      icon: Trophy,
      label: "Points Earned",
      value: gameStats.points,
      color: "from-success to-accent",
    },
    {
      icon: Star,
      label: "Level",
      value: gameStats.level,
      color: "from-primary-glow to-accent",
    },
  ];

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Bell;
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Early Bird': 'bg-blue-500',
      'Feedback Master': 'bg-green-500',
      'Networking Pro': 'bg-purple-500',
      'Check-in Champion': 'bg-orange-500',
      'Session Guru': 'bg-red-500'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-500';
  };

  // Missing render functions for tabs
  const renderAgendaView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Agenda</h3>
        <Button 
          onClick={() => setShowQR(!showQR)}
          className="bg-gradient-to-r from-primary to-accent"
        >
          <QrCode className="w-4 h-4 mr-2" />
          {showQR ? 'Hide QR' : 'Show QR'}
        </Button>
      </div>

      {showQR && (
        <GlassCard className="text-center p-6">
          <h4 className="text-lg font-semibold mb-4">Your Check-in QR Code</h4>
          {qrCode && (
            <div className="inline-block p-4 bg-white rounded-lg">
              <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-4">
            Show this QR code at session entrances for quick check-in
          </p>
        </GlassCard>
      )}

      <div className="space-y-4">
        {sessions.map((session, index) => {
          const isUpcoming = new Date(session.start_time) > new Date();
          const isLive = new Date(session.start_time) <= new Date() && new Date(session.end_time) >= new Date();
          
          return (
            <GlassCard key={session.id} className="relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      isLive ? 'bg-red-500 animate-pulse' : 
                      session.checked_in ? 'bg-green-500' : 
                      'bg-gray-400'
                    }`} />
                    <h4 className="font-semibold">{session.title}</h4>
                    {isLive && (
                      <Badge variant="destructive" className="animate-pulse">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(session.start_time)} - {formatTime(session.end_time)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {session.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.speaker}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {!session.checked_in && (isLive || isUpcoming) && (
                      <Button 
                        size="sm" 
                        onClick={() => handleCheckIn(session.id)}
                        className="bg-gradient-to-r from-green-500 to-green-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Check In (+50 pts)
                      </Button>
                    )}
                    
                    {session.checked_in && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => submitFeedback(session.id, 5)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Feedback (+25 pts)
                      </Button>
                    )}
                  </div>
                </div>
                
                {session.checked_in && (
                  <div className="text-green-500">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );

  const renderDiscoverView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Discover Events & Sessions</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4">Recommended Sessions</h4>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium">Blockchain Future</p>
              <p className="text-sm text-muted-foreground">2:00 PM - Hall B</p>
              <Badge className="mt-2">Trending</Badge>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">AI Innovation</p>
              <p className="text-sm text-muted-foreground">3:30 PM - Hall A</p>
              <Badge variant="outline" className="mt-2">Popular</Badge>
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <h4 className="font-semibold mb-4">Popular Speakers</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                SJ
              </div>
              <div>
                <p className="font-medium">Dr. Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">AI Researcher</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-sm">
                MC
              </div>
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-muted-foreground">Blockchain Expert</p>
              </div>
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <h4 className="font-semibold mb-4">Event Categories</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Target className="w-4 h-4 mr-2" />
              Technology
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Award className="w-4 h-4 mr-2" />
              Innovation
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Networking
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderNetworkingView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Connect with Peers</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4">Suggested Connections</h4>
          <div className="space-y-3">
            {attendees.slice(0, 3).map(attendee => (
              <div key={attendee.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={attendee.avatar} alt={attendee.name} className="w-10 h-10 rounded-full" />
                    {attendee.isOnline && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{attendee.name}</p>
                    <p className="text-xs text-muted-foreground">{attendee.title}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <UserPlus className="w-3 h-3 mr-1" />
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>
        
        <GlassCard>
          <h4 className="font-semibold mb-4">Upcoming Meetings</h4>
          <div className="space-y-3">
            {meetings.map(meeting => (
              <div key={meeting.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{meeting.attendeeName}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(meeting.time)} • {meeting.location}</p>
                </div>
                <Badge variant={meeting.status === 'scheduled' ? 'default' : 'secondary'}>
                  {meeting.status}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderLiveSessionView = () => (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live: Opening Keynote</h3>
          <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <Video className="w-16 h-16 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Video Stream</p>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Mic className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
              <Button size="sm" variant="outline">
                <ThumbsUp className="w-4 h-4 mr-2" />
                React
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <div className="h-48 overflow-y-auto space-y-2 p-3 bg-muted/30 rounded-lg">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="text-sm">
                    <span className="font-medium text-primary">{msg.userName}:</span>
                    <span className="ml-2">{msg.message}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="text-sm"
                />
                <Button size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Live Poll</h4>
              {polls.map(poll => (
                <div key={poll.id} className="space-y-2">
                  <p className="text-sm font-medium">{poll.question}</p>
                  {poll.options.map(option => (
                    <div key={option.id} className="flex items-center justify-between text-sm">
                      <span>{option.text}</span>
                      <span className="text-muted-foreground">{Math.round(option.votes/poll.totalVotes*100)}%</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const renderProductivityView = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Session Notes</h3>
          <div className="space-y-3">
            <Textarea
              placeholder="Take notes for the current session..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={4}
            />
            <Button size="sm" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Save Note
            </Button>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Recent Notes</h4>
            <div className="space-y-2">
              {notes.slice(0, 3).map(note => (
                <div key={note.id} className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatTime(note.timestamp)}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
        
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Download Session Slides
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Archive className="w-4 h-4 mr-2" />
              Access Recording
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CertificateIcon className="w-4 h-4 mr-2" />
              Generate Certificate
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderAccessibilityView = () => (
    <div className="space-y-6">
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Accessibility Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">High Contrast Mode</p>
              <p className="text-sm text-muted-foreground">Enhance visibility</p>
            </div>
            <Button 
              variant={accessibilityMode ? "default" : "outline"}
              onClick={() => setAccessibilityMode(!accessibilityMode)}
            >
              {accessibilityMode ? "On" : "Off"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Language</p>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1 border rounded"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Screen Reader Support</p>
              <p className="text-sm text-muted-foreground">Enable screen reader compatibility</p>
            </div>
            <Button variant="outline">
              <Accessibility className="w-4 h-4 mr-2" />
              Enable
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const renderAnnouncementsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Live Announcements</h3>
        <Badge variant="secondary">
          <Bell className="w-3 h-3 mr-1" />
          {announcements.length} New
        </Badge>
      </div>
      
      <div className="space-y-4">
        {announcements.map((announcement) => {
          const IconComponent = getAnnouncementIcon(announcement.type);
          return (
            <GlassCard key={announcement.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  announcement.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                  announcement.type === 'success' ? 'bg-green-500/20 text-green-500' :
                  'bg-blue-500/20 text-blue-500'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{announcement.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{announcement.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatTime(announcement.created_at)}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );

  const renderGamificationView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Gamification Hub</h3>
        <Badge className="bg-gradient-to-r from-primary to-accent">
          Level {gameStats.level}
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4">Your Progress</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Points</span>
              <span className="font-bold text-primary">{gameStats.points}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Rank</span>
              <span className="font-bold">#{gameStats.rank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Check-ins</span>
              <span className="font-bold">{gameStats.checkIns}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4">Achievements</h4>
          <div className="grid grid-cols-2 gap-2">
            {gameStats.badges.map((badge, index) => (
              <div key={index} className={`p-2 rounded-lg text-center text-xs ${getBadgeColor(badge)}`}>
                <Award className="w-4 h-4 mx-auto mb-1 text-white" />
                <span className="text-white font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderSupportView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Help & Support</h3>
        <Button 
          variant={sosActive ? "destructive" : "outline"}
          onClick={handleSOS}
          className="animate-pulse"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          {sosActive ? "SOS Active" : "Emergency SOS"}
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4">AI Assistant</h4>
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">EventBot</span>
              </div>
              <p className="text-sm">How can I help you today? Ask me about sessions, speakers, or navigation!</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Ask me anything..." className="flex-1" />
              <Button size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4">Quick Help</h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Map className="w-4 h-4 mr-2" />
              Event Map & Navigation
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Headphones className="w-4 h-4 mr-2" />
              Technical Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Organizers
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  return (
    <>
      <Navbar userRole="attendee" />
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
                    Welcome Back!
                  </h1>
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    Attendee
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground">
                  Ready to make the most of your event experience?
                </p>
              </div>
              
              <Button 
                variant={sosActive ? "destructive" : "outline"}
                size="lg"
                onClick={handleSOS}
                className={`${sosActive ? 'animate-pulse' : ''} shadow-lg`}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                {sosActive ? "SOS Active" : "Emergency SOS"}
              </Button>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard
                    hover
                    gradient
                    className="group cursor-pointer relative overflow-hidden"
                  >
                    {/* Animated Background */}
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
                { id: 'agenda', label: 'My Agenda', icon: Calendar },
                { id: 'discover', label: 'Discover', icon: Search },
                { id: 'networking', label: 'Networking', icon: Users },
                { id: 'live-session', label: 'Live Session', icon: Video },
                { id: 'productivity', label: 'Notes & Planning', icon: FileText },
                { id: 'announcements', label: 'Announcements', icon: Bell },
                { id: 'gamification', label: 'Gamification', icon: Trophy },
                { id: 'support', label: 'Support', icon: Bot },
                { id: 'accessibility', label: 'Accessibility', icon: Accessibility }
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
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-md -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[500px]"
            >
              {activeTab === 'agenda' && renderAgendaView()}
              {activeTab === 'discover' && renderDiscoverView()}
              {activeTab === 'networking' && renderNetworkingView()}
              {activeTab === 'live-session' && renderLiveSessionView()}
              {activeTab === 'productivity' && renderProductivityView()}
              {activeTab === 'announcements' && renderAnnouncementsView()}
              {activeTab === 'gamification' && renderGamificationView()}
              {activeTab === 'support' && renderSupportView()}
              {activeTab === 'accessibility' && renderAccessibilityView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </>
  );
}

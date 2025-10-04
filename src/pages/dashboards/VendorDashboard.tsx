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
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText,
  Upload,
  Download,
  MessageSquare,
  Send,
  AlertTriangle,
  Calendar,
  CheckCircle,
  XCircle,
  Paperclip,
  Eye,
  Trash2,
  User,
  Package,
  TrendingUp,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Briefcase
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  assigned_by: string;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOrganizer: boolean;
}

export default function VendorDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('tasks');
  const [sosActive, setSosActive] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  
  const [stats, setStats] = useState({
    totalTasks: 8,
    completedTasks: 5,
    pendingTasks: 2,
    overdueTask: 1,
  });

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Submit Stage Layout Design',
      description: 'Provide detailed stage layout with dimensions and equipment placement',
      due_date: '2024-10-10T18:00:00Z',
      status: 'pending',
      priority: 'high',
      assigned_by: 'Event Coordinator'
    },
    {
      id: '2',
      title: 'Upload Catering Menu',
      description: 'Final menu with pricing for 500 attendees',
      due_date: '2024-10-08T12:00:00Z',
      status: 'in-progress',
      priority: 'high',
      assigned_by: 'Event Manager'
    },
    {
      id: '3',
      title: 'Equipment List Submission',
      description: 'Complete list of AV equipment to be provided',
      due_date: '2024-10-05T15:00:00Z',
      status: 'overdue',
      priority: 'high',
      assigned_by: 'Technical Lead'
    },
    {
      id: '4',
      title: 'Insurance Documentation',
      description: 'Submit liability insurance certificates',
      due_date: '2024-10-12T17:00:00Z',
      status: 'completed',
      priority: 'medium',
      assigned_by: 'Admin'
    }
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Stage_Layout_v2.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploaded_at: '2024-10-03T10:30:00Z',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Catering_Menu_Final.docx',
      type: 'DOCX',
      size: '1.2 MB',
      uploaded_at: '2024-10-03T14:20:00Z',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Equipment_Inventory.xlsx',
      type: 'XLSX',
      size: '890 KB',
      uploaded_at: '2024-10-02T16:45:00Z',
      status: 'approved'
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Event Coordinator',
      message: 'Hi! Can you please update the stage layout with the new dimensions?',
      timestamp: '2024-10-03T09:30:00Z',
      isOrganizer: true
    },
    {
      id: '2',
      sender: 'You',
      message: 'Sure, I\'ll upload the updated layout by end of day.',
      timestamp: '2024-10-03T09:45:00Z',
      isOrganizer: false
    },
    {
      id: '3',
      sender: 'Event Coordinator',
      message: 'Great! Also, please confirm the catering menu for final approval.',
      timestamp: '2024-10-03T10:00:00Z',
      isOrganizer: true
    }
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Mock data for now - replace with actual Supabase queries
      setStats({
        totalTasks: 8,
        completedTasks: 5,
        pendingTasks: 2,
        overdueTask: 1,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSOS = () => {
    setSosActive(true);
    toast({
      title: "Emergency Alert Sent!",
      description: "Organizer team has been notified immediately.",
      variant: "destructive",
    });
    
    setTimeout(() => setSosActive(false), 30000);
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File upload functionality will be implemented with actual file picker.",
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toISOString(),
      isOrganizer: false
    };
    
    setChatMessages([...chatMessages, message]);
    setNewMessage('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the organizer team.",
    });
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus}`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const statCards = [
    {
      icon: FileText,
      label: "Total Tasks",
      value: stats.totalTasks,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: stats.completedTasks,
      color: "from-green-500 to-green-600",
    },
    {
      icon: Clock,
      label: "Pending",
      value: stats.pendingTasks,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: AlertCircle,
      label: "Overdue",
      value: stats.overdueTask,
      color: "from-red-500 to-red-600",
    },
  ];

  const renderTasksView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Tasks & Deadlines</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <GlassCard key={task.id} hover className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-lg">{task.title}</h4>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {formatDate(task.due_date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Assigned by: {task.assigned_by}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {task.status !== 'completed' && (
                  <Button 
                    size="sm" 
                    onClick={() => updateTaskStatus(task.id, 'completed')}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Complete
                  </Button>
                )}
                {task.status === 'pending' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateTaskStatus(task.id, 'in-progress')}
                  >
                    Start
                  </Button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderFilesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">File Uploads & Documents</h3>
        <Button 
          className="bg-gradient-to-r from-primary to-accent"
          onClick={handleFileUpload}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h4 className="font-semibold mb-4">Required Documents</h4>
          <div className="space-y-3">
            {[
              { name: 'Stage Layout', required: true, uploaded: true },
              { name: 'Catering Menu', required: true, uploaded: true },
              { name: 'Equipment List', required: true, uploaded: false },
              { name: 'Insurance Certificate', required: true, uploaded: true },
              { name: 'Safety Protocols', required: false, uploaded: false }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${doc.uploaded ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.required ? 'Required' : 'Optional'}
                    </p>
                  </div>
                </div>
                {doc.uploaded ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Button variant="outline" size="sm" onClick={handleFileUpload}>
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-semibold mb-4">Uploaded Files</h4>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} • {formatDate(file.uploaded_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={file.status === 'approved' ? 'default' : 'secondary'}>
                    {file.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderChatView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Real-Time Chat with Organizers</h3>
        <Badge variant="default" className="bg-green-500">
          <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
          Online
        </Badge>
      </div>

      <GlassCard className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOrganizer ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[70%] ${msg.isOrganizer ? 'bg-muted' : 'bg-gradient-to-r from-primary to-accent'} rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${msg.isOrganizer ? 'text-foreground' : 'text-white'}`}>
                    {msg.sender}
                  </span>
                  <span className={`text-xs ${msg.isOrganizer ? 'text-muted-foreground' : 'text-white/70'}`}>
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
                <p className={`text-sm ${msg.isOrganizer ? 'text-foreground' : 'text-white'}`}>
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input 
              placeholder="Type your message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-accent"
              onClick={handleSendMessage}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </GlassCard>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
                    Vendor Portal
                  </h1>
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    Vendor
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground">
                  Manage tasks, upload files, and communicate with organizers
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
                  { id: 'tasks', label: 'Tasks & Deadlines', icon: FileText },
                  { id: 'files', label: 'File Uploads', icon: Upload },
                  { id: 'chat', label: 'Chat with Organizers', icon: MessageSquare }
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
                          layoutId="activeVendorTab"
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
                {activeTab === 'tasks' && renderTasksView()}
                {activeTab === 'files' && renderFilesView()}
                {activeTab === 'chat' && renderChatView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

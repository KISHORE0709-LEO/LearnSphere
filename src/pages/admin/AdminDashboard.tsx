import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  PlayCircle
} from "lucide-react";

interface DashboardStats {
  totalCourses: number;
  coursesThisMonth: number;
  totalLearners: number;
  learnersThisWeek: number;
  completionRate: number;
  completionRateChange: number;
  avgTimeSpent: number;
}

interface Activity {
  type: string;
  user_name: string;
  course_title: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        // Use mock data when no user found
        setStats({
          totalCourses: 5,
          coursesThisMonth: 2,
          totalLearners: 150,
          learnersThisWeek: 12,
          completionRate: 78,
          completionRateChange: 5,
          avgTimeSpent: 4.2
        });
        setRecentActivity([
          {
            type: "enrolled",
            user_name: "John Doe",
            course_title: "React Fundamentals",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
          },
          {
            type: "completed",
            user_name: "Jane Smith",
            course_title: "JavaScript Basics",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
          }
        ]);
        setLoading(false);
        return;
      }
      
      const user = JSON.parse(userStr);
      if (!user.id) {
        console.error('User ID not found');
        setLoading(false);
        return;
      }
      
      const isAdmin = user.role === 'admin';
      const instructorId = user.id;

      const [statsRes, activityRes] = await Promise.all([
        fetch(`http://localhost:3001/api/admin/dashboard-stats?instructorId=${instructorId}&isAdmin=${isAdmin}`),
        fetch(`http://localhost:3001/api/admin/recent-activity?instructorId=${instructorId}&isAdmin=${isAdmin}`)
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      } else {
        console.error('Failed to fetch dashboard stats');
      }

      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setRecentActivity(Array.isArray(activityData) ? activityData : []);
      } else {
        console.error('Failed to fetch recent activity');
        setRecentActivity([]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setRecentActivity([]);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  const statsConfig = [
    { 
      label: "Total Courses", 
      value: stats?.totalCourses || 0, 
      change: `+${stats?.coursesThisMonth || 0} this month`,
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      label: "Total Learners", 
      value: stats?.totalLearners || 0, 
      change: `+${stats?.learnersThisWeek || 0} this week`,
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    { 
      label: "Completion Rate", 
      value: `${stats?.completionRate || 0}%`, 
      change: `${stats?.completionRateChange && stats.completionRateChange > 0 ? '+' : ''}${stats?.completionRateChange || 0}% this month`,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    { 
      label: "Avg. Time Spent", 
      value: `${stats?.avgTimeSpent || 0}h`, 
      change: "per course",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
  ];
  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-success mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/reporting">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                No recent activity
              </div>
            ) : (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === "enrolled" ? "bg-primary/10" :
                    activity.type === "completed" ? "bg-success/10" :
                    "bg-secondary/10"
                  }`}>
                    {activity.type === "enrolled" ? (
                      <Eye className="h-4 w-4 text-primary" />
                    ) : activity.type === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <PlayCircle className="h-4 w-4 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user_name}</span>
                      {" "}
                      <span className="text-muted-foreground">
                        {activity.type === "enrolled" ? "enrolled in" :
                         activity.type === "completed" ? "completed" : "started"}
                      </span>
                      {" "}
                      <span className="font-medium">{activity.course_title}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{getTimeAgo(activity.timestamp)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/courses/new">
                <BookOpen className="h-4 w-4 mr-3" />
                Create New Course
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/courses">
                <Eye className="h-4 w-4 mr-3" />
                Manage Courses
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/reporting">
                <TrendingUp className="h-4 w-4 mr-3" />
                View Reports
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/attendees">
                <Users className="h-4 w-4 mr-3" />
                Manage Attendees
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

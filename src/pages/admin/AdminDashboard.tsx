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

const stats = [
  { 
    label: "Total Courses", 
    value: "12", 
    change: "+2 this month",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  { 
    label: "Total Learners", 
    value: "1,234", 
    change: "+56 this week",
    icon: Users,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  { 
    label: "Completion Rate", 
    value: "78%", 
    change: "+5% this month",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  { 
    label: "Avg. Time Spent", 
    value: "2.5h", 
    change: "per course",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
];

const recentActivity = [
  { type: "enrolled", user: "John Doe", course: "React Patterns", time: "2 hours ago" },
  { type: "completed", user: "Jane Smith", course: "Python Basics", time: "4 hours ago" },
  { type: "started", user: "Mike Johnson", course: "UI/UX Design", time: "6 hours ago" },
  { type: "enrolled", user: "Sarah Williams", course: "AWS Cloud", time: "1 day ago" },
];

export default function AdminDashboard() {
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
        {stats.map((stat, index) => (
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
            {recentActivity.map((activity, index) => (
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
                    <span className="font-medium">{activity.user}</span>
                    {" "}
                    <span className="text-muted-foreground">
                      {activity.type === "enrolled" ? "enrolled in" :
                       activity.type === "completed" ? "completed" : "started"}
                    </span>
                    {" "}
                    <span className="font-medium">{activity.course}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
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

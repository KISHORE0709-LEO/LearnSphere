import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Plus,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: BookOpen, label: "Courses", href: "/admin/courses" },
  { icon: Users, label: "Attendees", href: "/admin/attendees" },
  { icon: BarChart3, label: "Reporting", href: "/admin/reporting" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "h-16 flex items-center border-b border-sidebar-border px-4",
        collapsed ? "justify-center" : "gap-2"
      )}>
        <GraduationCap className="h-8 w-8 text-primary shrink-0" />
        {!collapsed && (
          <span className="text-lg font-bold text-gradient">LearnSphere</span>
        )}
      </div>

      {/* Create Course Button */}
      <div className="p-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="glow" 
              className={cn("w-full", collapsed && "px-0")}
              onClick={() => navigate("/admin/courses/new")}
            >
              <Plus className="h-4 w-4" />
              {!collapsed && <span>New Course</span>}
            </Button>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">New Course</TooltipContent>}
        </Tooltip>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/admin" && location.pathname.startsWith(item.href));
          
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-primary glow-sm" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                  {!collapsed && item.label}
                </Link>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
            </Tooltip>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/admin/help"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50",
                collapsed && "justify-center px-2"
              )}
            >
              <HelpCircle className="h-5 w-5 shrink-0" />
              {!collapsed && "Help & Support"}
            </Link>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">Help & Support</TooltipContent>}
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => navigate("/")}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50",
                collapsed && "justify-center px-2"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && "Back to Website"}
            </button>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">Back to Website</TooltipContent>}
        </Tooltip>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </motion.aside>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Users, 
  Clock, 
  PlayCircle, 
  CheckCircle2,
  Settings2,
  Download
} from "lucide-react";

interface ReportData {
  id: string;
  course_name: string;
  participant_name: string;
  enrollment_date: string;
  start_date: string | null;
  hours_spent: number;
  minutes_spent: number;
  completion: number;
  completion_date: string | null;
  status: string;
}

interface OverviewStats {
  total: number;
  yetToStart: number;
  inProgress: number;
  completed: number;
}

const allColumns = [
  { id: "srNo", label: "Sr No.", default: true },
  { id: "courseName", label: "Course Name", default: true },
  { id: "participantName", label: "Participant Name", default: true },
  { id: "enrolledDate", label: "Enrolled Date", default: true },
  { id: "startDate", label: "Start Date", default: true },
  { id: "timeSpent", label: "Time Spent", default: true },
  { id: "completion", label: "Completion %", default: true },
  { id: "completedDate", label: "Completed Date", default: false },
  { id: "status", label: "Status", default: true },
];

export default function AdminReporting() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.filter(c => c.default).map(c => c.id)
  );
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [overviewStats, setOverviewStats] = useState<OverviewStats>({
    total: 0,
    yetToStart: 0,
    inProgress: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportingData();
  }, []);

  const fetchReportingData = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        console.error('No user found in localStorage');
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

      const response = await fetch(
        `http://localhost:3001/api/admin/reporting?instructorId=${instructorId}&isAdmin=${isAdmin}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch reporting data');
      }
      
      const data = await response.json();

      setReportData(Array.isArray(data.data) ? data.data : []);
      setOverviewStats({
        total: data.overview?.total || 0,
        yetToStart: data.overview?.yetToStart || 0,
        inProgress: data.overview?.inProgress || 0,
        completed: data.overview?.completed || 0
      });
    } catch (error) {
      console.error('Error fetching reporting data:', error);
      setReportData([]);
      setOverviewStats({
        total: 0,
        yetToStart: 0,
        inProgress: 0,
        completed: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatTimeSpent = (hours: number, minutes: number) => {
    if (hours === 0 && minutes === 0) return '0h';
    return `${hours}h ${minutes}m`;
  };

  const overviewStatsConfig = [
    { label: "Total Participants", value: overviewStats.total, icon: Users, color: "text-primary" },
    { label: "Yet to Start", value: overviewStats.yetToStart, icon: Clock, color: "text-warning" },
    { label: "In Progress", value: overviewStats.inProgress, icon: PlayCircle, color: "text-secondary" },
    { label: "Completed", value: overviewStats.completed, icon: CheckCircle2, color: "text-success" },
  ];

  const filteredData = reportData.filter(row => {
    const matchesSearch = 
      row.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.participant_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !activeFilter || row.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "yet-to-start":
        return <Badge variant="warning">Yet to Start</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-muted-foreground">Loading reporting data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold">Reporting</h1>
          <p className="text-muted-foreground">Track learner progress across courses</p>
        </div>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overviewStatsConfig.map((stat, index) => (
          <motion.button
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => {
              const filterMap: Record<string, string> = {
                "Yet to Start": "yet-to-start",
                "In Progress": "in-progress",
                "Completed": "completed",
              };
              setActiveFilter(activeFilter === filterMap[stat.label] ? null : filterMap[stat.label]);
            }}
            className={`bg-card border rounded-xl p-5 text-left transition-all ${
              activeFilter === (stat.label === "Yet to Start" ? "yet-to-start" : 
                stat.label === "In Progress" ? "in-progress" : 
                stat.label === "Completed" ? "completed" : null)
                ? "border-primary glow-sm"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.button>
        ))}
      </div>

      {/* Search & Columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by course or participant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Settings2 className="h-4 w-4 mr-2" />
              Columns
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Customize Columns</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {allColumns.map((column) => (
                <div key={column.id} className="flex items-center gap-3">
                  <Checkbox
                    id={column.id}
                    checked={visibleColumns.includes(column.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setVisibleColumns([...visibleColumns, column.id]);
                      } else {
                        setVisibleColumns(visibleColumns.filter(c => c !== column.id));
                      }
                    }}
                  />
                  <label htmlFor={column.id} className="text-sm cursor-pointer">
                    {column.label}
                  </label>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.includes("srNo") && <TableHead className="w-16">Sr No.</TableHead>}
              {visibleColumns.includes("courseName") && <TableHead>Course Name</TableHead>}
              {visibleColumns.includes("participantName") && <TableHead>Participant</TableHead>}
              {visibleColumns.includes("enrolledDate") && <TableHead>Enrolled</TableHead>}
              {visibleColumns.includes("startDate") && <TableHead>Started</TableHead>}
              {visibleColumns.includes("timeSpent") && <TableHead>Time Spent</TableHead>}
              {visibleColumns.includes("completion") && <TableHead>Completion</TableHead>}
              {visibleColumns.includes("completedDate") && <TableHead>Completed</TableHead>}
              {visibleColumns.includes("status") && <TableHead>Status</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={row.id}>
                {visibleColumns.includes("srNo") && <TableCell>{index + 1}</TableCell>}
                {visibleColumns.includes("courseName") && <TableCell className="font-medium">{row.course_name}</TableCell>}
                {visibleColumns.includes("participantName") && <TableCell>{row.participant_name}</TableCell>}
                {visibleColumns.includes("enrolledDate") && <TableCell>{formatDate(row.enrollment_date)}</TableCell>}
                {visibleColumns.includes("startDate") && <TableCell>{formatDate(row.start_date)}</TableCell>}
                {visibleColumns.includes("timeSpent") && <TableCell>{formatTimeSpent(row.hours_spent, row.minutes_spent)}</TableCell>}
                {visibleColumns.includes("completion") && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${row.completion}%` }}
                        />
                      </div>
                      <span className="text-xs">{Math.round(row.completion)}%</span>
                    </div>
                  </TableCell>
                )}
                {visibleColumns.includes("completedDate") && <TableCell>{formatDate(row.completion_date)}</TableCell>}
                {visibleColumns.includes("status") && <TableCell>{getStatusBadge(row.status)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredData.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No data found
          </div>
        )}
      </motion.div>
    </div>
  );
}

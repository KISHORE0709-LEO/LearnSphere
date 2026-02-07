import { useState } from "react";
import { useParams } from "react-router-dom";
import { Users, Clock, CheckCircle, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockParticipants = [
  {
    id: 1,
    courseName: "Basics of Odoo CRM",
    participantName: "Salman Khan",
    enrolledDate: "Feb 14",
    startDate: "Feb 16",
    timeSpent: "2:20",
    completionPercentage: 30,
    completedDate: "Feb 21",
    status: "In progress",
  },
  {
    id: 2,
    courseName: "Basics of Odoo CRM",
    participantName: "John Doe",
    enrolledDate: "Feb 10",
    startDate: "Feb 12",
    timeSpent: "5:45",
    completionPercentage: 100,
    completedDate: "Feb 20",
    status: "Completed",
  },
  {
    id: 3,
    courseName: "Basics of Odoo CRM",
    participantName: "Jane Smith",
    enrolledDate: "Feb 15",
    startDate: "Feb 17",
    timeSpent: "3:10",
    completionPercentage: 45,
    completedDate: "",
    status: "In progress",
  },
];

export default function CourseReporting() {
  const { id } = useParams();
  const [selectedColumns, setSelectedColumns] = useState({
    sno: true,
    courseName: true,
    participantName: true,
    enrolledDate: true,
    startDate: true,
    timeSpent: true,
    completionPercentage: true,
    completedDate: true,
    status: true,
  });
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const stats = {
    total: mockParticipants.length,
    yetToStart: mockParticipants.filter(p => p.status === "Yet to start").length,
    inProgress: mockParticipants.filter(p => p.status === "In progress").length,
    completed: mockParticipants.filter(p => p.status === "Completed").length,
  };

  const filteredParticipants = filterStatus
    ? mockParticipants.filter(p => p.status === filterStatus)
    : mockParticipants;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Course Reporting</h1>
        <p className="text-muted-foreground">Track learner progress and completion</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Left Sidebar - Column Selector */}
        <div className="lg:pt-[52px]">
          <Card className="glass border-border h-fit">
          <CardHeader>
            <CardTitle className="text-base">Customizable Table</CardTitle>
            <p className="text-xs text-muted-foreground">Pick which columns to show/hide</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries({
              sno: "S.No.",
              courseName: "Course Name",
              participantName: "Participant name",
              enrolledDate: "Enrolled Date",
              startDate: "Start date",
              timeSpent: "Time spent",
              completionPercentage: "Completion percentage",
              completedDate: "Completed date",
              status: "Status",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedColumns[key as keyof typeof selectedColumns]}
                  onCheckedChange={(checked) =>
                    setSelectedColumns({ ...selectedColumns, [key]: checked })
                  }
                />
                <Label htmlFor={key} className="text-sm cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-6">Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                className="glass border-border cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => setFilterStatus(null)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Participants</p>
                      <p className="text-3xl font-bold text-primary">{stats.total}</p>
                    </div>
                    <Users className="h-10 w-10 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="glass border-border cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => setFilterStatus("Yet to start")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Yet to Start</p>
                      <p className="text-3xl font-bold text-warning">{stats.yetToStart}</p>
                    </div>
                    <Clock className="h-10 w-10 text-warning opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="glass border-border cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => setFilterStatus("In progress")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-3xl font-bold text-primary">{stats.inProgress}</p>
                    </div>
                    <PlayCircle className="h-10 w-10 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="glass border-border cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => setFilterStatus("Completed")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-3xl font-bold text-success">{stats.completed}</p>
                    </div>
                    <CheckCircle className="h-10 w-10 text-success opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Users Table */}
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="text-base">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {selectedColumns.sno && <TableHead>S.No.</TableHead>}
                      {selectedColumns.courseName && <TableHead>Course Name</TableHead>}
                      {selectedColumns.participantName && <TableHead>Participant name</TableHead>}
                      {selectedColumns.enrolledDate && <TableHead>Enrolled Date</TableHead>}
                      {selectedColumns.startDate && <TableHead>Start date</TableHead>}
                      {selectedColumns.timeSpent && <TableHead>Time spent</TableHead>}
                      {selectedColumns.completionPercentage && <TableHead>Completion %</TableHead>}
                      {selectedColumns.completedDate && <TableHead>Completed date</TableHead>}
                      {selectedColumns.status && <TableHead>Status</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        {selectedColumns.sno && <TableCell>{participant.id}</TableCell>}
                        {selectedColumns.courseName && (
                          <TableCell className="text-primary">{participant.courseName}</TableCell>
                        )}
                        {selectedColumns.participantName && (
                          <TableCell>{participant.participantName}</TableCell>
                        )}
                        {selectedColumns.enrolledDate && (
                          <TableCell>{participant.enrolledDate}</TableCell>
                        )}
                        {selectedColumns.startDate && <TableCell>{participant.startDate}</TableCell>}
                        {selectedColumns.timeSpent && (
                          <TableCell className="text-warning">{participant.timeSpent}</TableCell>
                        )}
                        {selectedColumns.completionPercentage && (
                          <TableCell>{participant.completionPercentage}%</TableCell>
                        )}
                        {selectedColumns.completedDate && (
                          <TableCell>{participant.completedDate || "-"}</TableCell>
                        )}
                        {selectedColumns.status && (
                          <TableCell>
                            <Badge
                              variant={
                                participant.status === "Completed"
                                  ? "default"
                                  : participant.status === "In progress"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                participant.status === "Completed"
                                  ? "bg-success"
                                  : participant.status === "In progress"
                                  ? "bg-primary/20 text-primary"
                                  : ""
                              }
                            >
                              {participant.status}
                            </Badge>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Clock, CheckCircle, PlayCircle, UserPlus, Mail, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export default function CourseReporting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newAttendee, setNewAttendee] = useState({ name: "", email: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchCourseReporting();
  }, [id]);

  const fetchCourseReporting = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch(
        `http://localhost:3001/api/admin/reporting?instructorId=${user.id}&isAdmin=${user.role === 'admin'}`
      );
      const data = await response.json();
      
      const courseData = data.data.filter((item: any) => item.course_id === id);
      setParticipants(courseData);
    } catch (error) {
      console.error('Error fetching course reporting:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: participants.length,
    yetToStart: participants.filter(p => p.status === 'yet-to-start').length,
    inProgress: participants.filter(p => p.status === 'in-progress').length,
    completed: participants.filter(p => p.status === 'completed').length,
  };

  const filteredParticipants = filterStatus
    ? participants.filter(p => p.status === filterStatus)
    : participants;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (hours: number, minutes: number) => {
    if (hours === 0 && minutes === 0) return '0h';
    return `${hours}h ${minutes}m`;
  };

  const handleAddAttendee = () => {
    if (!newAttendee.name.trim() || !newAttendee.email.trim()) return;

    toast({
      title: "Attendee added",
      description: `${newAttendee.name} has been enrolled in this course`,
    });
    setAddDialogOpen(false);
    setNewAttendee({ name: "", email: "" });
    fetchCourseReporting();
  };

  const handleContactAttendee = (email: string, name: string) => {
    navigate('/admin/attendees');
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading reporting data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Reporting</h1>
          <p className="text-muted-foreground">Track learner progress and completion</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Attendee
        </Button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
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

        <div className="space-y-8">
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
                onClick={() => setFilterStatus('yet-to-start')}
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
                onClick={() => setFilterStatus('in-progress')}
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
                onClick={() => setFilterStatus('completed')}
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
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.map((participant, index) => (
                      <TableRow key={participant.id}>
                        {selectedColumns.sno && <TableCell>{index + 1}</TableCell>}
                        {selectedColumns.courseName && <TableCell>{participant.course_name}</TableCell>}
                        {selectedColumns.participantName && <TableCell>{participant.participant_name}</TableCell>}
                        {selectedColumns.enrolledDate && <TableCell>{formatDate(participant.enrolled_date)}</TableCell>}
                        {selectedColumns.startDate && <TableCell>{formatDate(participant.start_date)}</TableCell>}
                        {selectedColumns.timeSpent && <TableCell>{formatTime(participant.time_spent_hours, participant.time_spent_minutes)}</TableCell>}
                        {selectedColumns.completionPercentage && <TableCell>{participant.completion_percentage}%</TableCell>}
                        {selectedColumns.completedDate && <TableCell>{formatDate(participant.completed_date)}</TableCell>}
                        {selectedColumns.status && (
                          <TableCell>
                            <Badge
                              variant={participant.status === 'completed' ? 'default' : participant.status === 'in-progress' ? 'secondary' : 'outline'}
                            >
                              {participant.status}
                            </Badge>
                          </TableCell>
                        )}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleContactAttendee(participant.participant_email, participant.participant_name)}>
                                <Mail className="h-4 w-4 mr-2" />
                                Contact Attendee
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Attendee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                value={newAttendee.name}
                onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={newAttendee.email}
                onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAttendee}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

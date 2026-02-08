import { useState, useEffect } from "react";
import { Search, UserPlus, Mail, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminAttendees() {
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newAttendee, setNewAttendee] = useState({ name: "", email: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/learners');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setAttendees(data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = (email: string, name: string) => {
    const subject = encodeURIComponent('Message from LearnSphere');
    const body = encodeURIComponent(`Hello ${name},\n\n`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
    toast({
      title: "Opening Gmail",
      description: `Composing email to ${name}`,
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name}?`)) return;
    
    try {
      // TODO: Add backend endpoint to delete user
      setAttendees(attendees.filter((a) => a.id !== id));
      toast({
        title: "Attendee removed",
        description: `${name} has been removed`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove attendee",
        variant: "destructive",
      });
    }
  };

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAttendee = () => {
    if (!newAttendee.name.trim() || !newAttendee.email.trim()) return;

    const attendee = {
      id: Date.now().toString(),
      name: newAttendee.name,
      email: newAttendee.email,
      role: "learner",
      courses: 0,
      points: 0,
      joinedat: new Date().toISOString(),
    };

    setAttendees([...attendees, attendee]);
    setAddDialogOpen(false);
    setNewAttendee({ name: "", email: "" });
    toast({
      title: "Attendee added",
      description: `${attendee.name} has been added successfully`,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading attendees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendees</h1>
          <p className="text-muted-foreground">Manage learners and their progress</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Attendee
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search attendees by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="glass border-border rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Attendee</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {getInitials(attendee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{attendee.name}</span>
                  </div>
                </TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{attendee.courses} courses</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-warning font-medium">{attendee.points} pts</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(attendee.joinedat).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSendEmail(attendee.email, attendee.name)}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(attendee.id, attendee.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

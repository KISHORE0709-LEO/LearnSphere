import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Share2, Edit, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminCoursesNew() {
  const [courses, setCourses] = useState([
    {
      id: "1",
      title: "Introduction to Odoo AI",
      tags: ["AI", "Odoo", "Automation"],
      views: 15,
      contents: 6,
      duration: "25:30",
      published: true,
    },
    {
      id: "2",
      title: "Basics of Odoo CRM",
      tags: ["CRM", "Sales", "Odoo"],
      views: 20,
      contents: 8,
      duration: "40:35",
      published: true,
    },
    {
      id: "3",
      title: "About Odoo Courses",
      tags: ["Odoo", "Tutorial", "Beginner"],
      views: 10,
      contents: 5,
      duration: "10:20",
      published: false,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const { toast } = useToast();

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateCourse = () => {
    if (!newCourseName.trim()) return;
    
    const newCourse = {
      id: Date.now().toString(),
      title: newCourseName,
      tags: [],
      views: 0,
      contents: 0,
      duration: "0:00",
      published: false,
    };
    
    setCourses([...courses, newCourse]);
    setCreateDialogOpen(false);
    setNewCourseName("");
    toast({
      title: "Course created",
      description: "New course draft has been created",
    });
  };

  const handleShare = (courseId: string, title: string) => {
    const shareLink = `${window.location.origin}/courses/${courseId}`;
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link copied",
      description: `Share link for "${title}" copied to clipboard`,
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Courses</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "kanban" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses by title or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="p-6 glass border-border hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  {course.published && (
                    <Badge variant="default" className="bg-primary">
                      Published
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  {course.tags.map((tag, idx) => (
                    <span key={idx} className="text-destructive">
                      {tag}
                      {idx < course.tags.length - 1 ? " •" : ""}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Views</span>
                    <span className="ml-2 font-medium text-warning">{course.views}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Contents</span>
                    <span className="ml-2 font-medium text-warning">{course.contents}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration</span>
                    <span className="ml-2 font-medium text-warning">{course.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(course.id, course.title)}
                >
                  Share
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/admin/courses/${course.id}`}>Edit</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg glow-md"
        size="icon"
        onClick={() => setCreateDialogOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Course</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Provide a name... (Eg: Basics of Odoo CRM)"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateCourse()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCourse}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

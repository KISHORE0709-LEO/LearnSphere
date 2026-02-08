import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Share2, Edit, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminCoursesNew() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch('http://localhost:3001/api/courses');
      
      if (response.ok) {
        const data = await response.json();
        
        // Filter by instructor if not admin
        const filteredCourses = user.role === 'admin' 
          ? data 
          : data.filter((c: any) => c.instructor_id === user.id);
        
        setCourses(filteredCourses);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      
      // Fallback to localStorage for locally created courses
      const localCourses = JSON.parse(localStorage.getItem('localCourses') || '[]');
      setCourses(localCourses);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags?.some((tag: string) => tag?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

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
                  {course.is_published && (
                    <Badge variant="default" className="bg-primary">
                      Published
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  {course.tags?.map((tag: string, idx: number) => (
                    <span key={idx} className="text-destructive">
                      {tag}
                      {idx < course.tags.length - 1 ? " •" : ""}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Enrollments</span>
                    <span className="ml-2 font-medium text-warning">{course.total_enrollments || 0}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating</span>
                    <span className="ml-2 font-medium text-warning">{Number(course.average_rating || 0).toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category</span>
                    <span className="ml-2 font-medium text-warning">{course.category || 'N/A'}</span>
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
    </div>
  );
}

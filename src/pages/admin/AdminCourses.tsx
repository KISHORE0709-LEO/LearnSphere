import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminCourseCard } from "@/components/courses/AdminCourseCard";
import { 
  Search, 
  Grid3X3, 
  List as ListIcon,
  LayoutGrid
} from "lucide-react";

// Mock data
const mockAdminCourses = [
  {
    id: "1",
    title: "Advanced React Patterns",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    tags: ["React", "Frontend"],
    viewsCount: 1250,
    lessonsCount: 24,
    duration: "8h 30m",
    isPublished: true,
  },
  {
    id: "2",
    title: "Python for Data Science",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
    tags: ["Python", "Data Science"],
    viewsCount: 2340,
    lessonsCount: 36,
    duration: "12h 45m",
    isPublished: true,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    tags: ["Design", "UX"],
    viewsCount: 890,
    lessonsCount: 18,
    duration: "6h 15m",
    isPublished: false,
  },
  {
    id: "4",
    title: "Cloud Architecture with AWS",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    tags: ["AWS", "Cloud"],
    viewsCount: 1560,
    lessonsCount: 42,
    duration: "15h 20m",
    isPublished: false,
  },
];

type ViewMode = "grid" | "list" | "kanban";

export default function AdminCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const navigate = useNavigate();

  const filteredCourses = mockAdminCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const publishedCourses = filteredCourses.filter(c => c.isPublished);
  const draftCourses = filteredCourses.filter(c => !c.isPublished);

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Manage your course catalog</p>
        </div>
      </motion.div>

      {/* Search & View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "kanban" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Courses Display */}
      {viewMode === "kanban" ? (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Published Column */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-success" />
              <h3 className="font-semibold">Published ({publishedCourses.length})</h3>
            </div>
            <div className="space-y-4">
              {publishedCourses.map((course) => (
                <AdminCourseCard
                  key={course.id}
                  {...course}
                  onEdit={() => navigate(`/admin/courses/${course.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Draft Column */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <h3 className="font-semibold">Draft ({draftCourses.length})</h3>
            </div>
            <div className="space-y-4">
              {draftCourses.map((course) => (
                <AdminCourseCard
                  key={course.id}
                  {...course}
                  onEdit={() => navigate(`/admin/courses/${course.id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={
          viewMode === "grid"
            ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }>
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AdminCourseCard
                {...course}
                onEdit={() => navigate(`/admin/courses/${course.id}`)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-muted-foreground">No courses found</p>
        </motion.div>
      )}
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/courses/CourseCard";
import { Search, Filter, Grid3X3, List } from "lucide-react";

// Mock data
const mockCourses = [
  {
    id: "1",
    title: "Advanced React Patterns",
    description: "Master advanced React patterns including compound components, render props, and hooks.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    tags: ["React", "Frontend"],
    duration: "8h 30m",
    lessonsCount: 24,
    rating: 4.8,
    studentsCount: 1250,
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Learn Python programming with focus on data analysis, visualization, and machine learning basics.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
    tags: ["Python", "Data Science"],
    duration: "12h 45m",
    lessonsCount: 36,
    rating: 4.9,
    studentsCount: 2340,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Create beautiful, user-centered designs with modern tools and methodologies.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    tags: ["Design", "UX"],
    duration: "6h 15m",
    lessonsCount: 18,
    rating: 4.7,
    studentsCount: 890,
  },
  {
    id: "4",
    title: "Cloud Architecture with AWS",
    description: "Design and deploy scalable cloud solutions using Amazon Web Services.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    tags: ["AWS", "Cloud"],
    duration: "15h 20m",
    lessonsCount: 42,
    rating: 4.6,
    studentsCount: 1560,
  },
  {
    id: "5",
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications with Flutter and Dart.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    tags: ["Flutter", "Mobile"],
    duration: "10h 45m",
    lessonsCount: 32,
    rating: 4.8,
    studentsCount: 1100,
  },
  {
    id: "6",
    title: "DevOps Essentials",
    description: "Master CI/CD, containerization, and infrastructure as code for modern development.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop",
    tags: ["DevOps", "Docker"],
    duration: "9h 30m",
    lessonsCount: 28,
    rating: 4.5,
    studentsCount: 780,
  },
];

const categories = ["All", "Frontend", "Backend", "Design", "Data Science", "Cloud", "Mobile"];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/courses/${courseId}`);
    }
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
      course.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Explore <span className="text-gradient">Courses</span>
          </h1>
          <p className="text-muted-foreground">
            Discover courses to advance your skills
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Courses Grid */}
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
              <CourseCard
                {...course}
                onClick={() => handleCourseClick(course.id)}
              />
            </motion.div>
          ))}
        </div>

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
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/courses/CourseCard";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Search } from "lucide-react";

// Mock data
const mockUserCourses = [
  {
    id: "1",
    title: "Advanced React Patterns",
    description: "Master advanced React patterns including compound components, render props, and hooks.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    tags: ["React", "Frontend"],
    duration: "8h 30m",
    lessonsCount: 24,
    progress: 65,
    status: "in-progress" as const,
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Learn Python programming with focus on data analysis and visualization.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
    tags: ["Python", "Data Science"],
    duration: "12h 45m",
    lessonsCount: 36,
    progress: 100,
    status: "completed" as const,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Create beautiful, user-centered designs with modern tools.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    tags: ["Design", "UX"],
    duration: "6h 15m",
    lessonsCount: 18,
    progress: 0,
    status: "not-started" as const,
  },
];

const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  points: 45,
  coursesCompleted: 3,
  coursesInProgress: 2,
};

export default function MyCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCourses = mockUserCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                My <span className="text-gradient">Learning</span>
              </h1>
              <p className="text-muted-foreground">
                Continue where you left off
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>

            {/* Course Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard
                    {...course}
                    onClick={() => navigate(`/courses/${course.id}`)}
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

          {/* Sidebar - Profile */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ProfileCard {...mockUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

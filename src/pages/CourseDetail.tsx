import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LessonItem, type LessonType, type LessonStatus } from "@/components/courses/LessonItem";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Circle,
  Star,
  Search,
  User
} from "lucide-react";

// Mock data
const mockCourse = {
  id: "1",
  title: "Advanced React Patterns",
  description: "Master advanced React patterns including compound components, render props, and custom hooks. This comprehensive course will take you from intermediate to expert level.",
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
  tags: ["React", "Frontend", "JavaScript"],
  duration: "8h 30m",
  lessonsCount: 24,
  completedCount: 15,
  progress: 62,
  rating: 4.8,
  reviewsCount: 128,
};

const mockLessons: Array<{
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  status: LessonStatus;
}> = [
  { id: "1", title: "Introduction to Advanced Patterns", type: "video", duration: "12:30", status: "completed" },
  { id: "2", title: "Compound Components Pattern", type: "video", duration: "18:45", status: "completed" },
  { id: "3", title: "Pattern Documentation", type: "document", duration: "10 min read", status: "completed" },
  { id: "4", title: "Render Props Deep Dive", type: "video", duration: "22:15", status: "in-progress" },
  { id: "5", title: "Visual Guide to Props", type: "image", duration: "", status: "not-started" },
  { id: "6", title: "Module 1 Quiz", type: "quiz", duration: "15 questions", status: "not-started" },
  { id: "7", title: "Custom Hooks Mastery", type: "video", duration: "28:00", status: "not-started" },
  { id: "8", title: "Building a Hook Library", type: "document", duration: "15 min read", status: "not-started" },
];

const mockReviews = [
  { id: "1", name: "Sarah M.", rating: 5, text: "Excellent course! The compound components section was particularly enlightening." },
  { id: "2", name: "John D.", rating: 4, text: "Great content, well structured. Would love more practical examples." },
  { id: "3", name: "Mike R.", rating: 5, text: "Best React course I've taken. The instructor explains complex topics very clearly." },
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredLessons = mockLessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartLearning = () => {
    // Navigate to first incomplete lesson
    const nextLesson = mockLessons.find(l => l.status !== "completed");
    if (nextLesson) {
      navigate(`/learn/${id}/lesson/${nextLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-[1fr_400px] gap-8 mb-8"
        >
          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {mockCourse.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {mockCourse.title}
            </h1>
            
            <p className="text-muted-foreground mb-6">
              {mockCourse.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{mockCourse.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{mockCourse.lessonsCount} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-warning fill-warning" />
                <span>{mockCourse.rating} ({mockCourse.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Your Progress</span>
                <span className="text-primary font-medium">{mockCourse.progress}%</span>
              </div>
              <Progress value={mockCourse.progress} className="h-2" />
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  {mockCourse.completedCount} completed
                </span>
                <span className="flex items-center gap-1">
                  <Circle className="h-3 w-3" />
                  {mockCourse.lessonsCount - mockCourse.completedCount} remaining
                </span>
              </div>
            </div>

            <Button variant="glow" size="lg" onClick={handleStartLearning}>
              <Play className="h-5 w-5 mr-2" />
              Continue Learning
            </Button>
          </div>

          {/* Image */}
          <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden">
            <img 
              src={mockCourse.image} 
              alt={mockCourse.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Course Content</TabsTrigger>
            <TabsTrigger value="reviews">Ratings & Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              {/* Search */}
              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Lessons List */}
              <div className="space-y-2">
                {filteredLessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    {...lesson}
                    onClick={() => navigate(`/learn/${id}/lesson/${lesson.id}`)}
                  />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="reviews">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              {/* Rating Summary */}
              <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border">
                <div className="text-center">
                  <p className="text-5xl font-bold text-gradient">{mockCourse.rating}</p>
                  <div className="flex items-center gap-1 my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-5 w-5 ${star <= Math.round(mockCourse.rating) ? "text-warning fill-warning" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{mockCourse.reviewsCount} reviews</p>
                </div>

                <Button variant="outline">
                  Add Review
                </Button>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-3 w-3 ${star <= review.rating ? "text-warning fill-warning" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

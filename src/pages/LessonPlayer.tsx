import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LessonItem, type LessonType, type LessonStatus } from "@/components/courses/LessonItem";
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  PanelLeftClose,
  PanelLeft,
  FileDown,
  ExternalLink,
  Play,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockCourse = {
  id: "1",
  title: "Advanced React Patterns",
  progress: 62,
};

const mockLessons: Array<{
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  status: LessonStatus;
  description?: string;
  content?: string;
  videoUrl?: string;
  attachments?: Array<{ name: string; type: "file" | "link"; url: string }>;
}> = [
  { 
    id: "1", 
    title: "Introduction to Advanced Patterns", 
    type: "video", 
    duration: "12:30", 
    status: "completed",
    description: "Learn the fundamentals of advanced React patterns and when to use them.",
    videoUrl: "https://www.youtube.com/embed/dpw9EHDh2bM",
    attachments: [
      { name: "Course Slides.pdf", type: "file", url: "#" },
      { name: "React Docs", type: "link", url: "https://react.dev" },
    ]
  },
  { 
    id: "2", 
    title: "Compound Components Pattern", 
    type: "video", 
    duration: "18:45", 
    status: "completed",
    description: "Deep dive into compound components and how they enable flexible APIs.",
    videoUrl: "https://www.youtube.com/embed/dpw9EHDh2bM",
  },
  { 
    id: "3", 
    title: "Pattern Documentation", 
    type: "document", 
    duration: "10 min read", 
    status: "completed",
    description: "Comprehensive documentation on all patterns covered.",
    content: "This is a sample document content. In a real application, this would be rich text or PDF viewer.",
  },
  { 
    id: "4", 
    title: "Render Props Deep Dive", 
    type: "video", 
    duration: "22:15", 
    status: "in-progress",
    description: "Understanding render props pattern and its applications.",
    videoUrl: "https://www.youtube.com/embed/dpw9EHDh2bM",
  },
  { 
    id: "5", 
    title: "Visual Guide to Props", 
    type: "image", 
    duration: "", 
    status: "not-started",
    description: "Visual diagram explaining prop flow in React.",
  },
  { 
    id: "6", 
    title: "Module 1 Quiz", 
    type: "quiz", 
    duration: "15 questions", 
    status: "not-started",
    description: "Test your knowledge from Module 1.",
  },
];

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const currentLessonIndex = mockLessons.findIndex(l => l.id === lessonId);
  const currentLesson = mockLessons[currentLessonIndex];
  const nextLesson = mockLessons[currentLessonIndex + 1];
  const prevLesson = mockLessons[currentLessonIndex - 1];

  const handleBack = () => {
    navigate(`/courses/${courseId}`);
  };

  const handleNext = () => {
    if (nextLesson) {
      navigate(`/learn/${courseId}/lesson/${nextLesson.id}`);
    }
  };

  const handlePrev = () => {
    if (prevLesson) {
      navigate(`/learn/${courseId}/lesson/${prevLesson.id}`);
    }
  };

  const renderContent = () => {
    if (!currentLesson) return null;

    switch (currentLesson.type) {
      case "video":
        return (
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <iframe
              src={currentLesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case "document":
        return (
          <div className="bg-card border border-border rounded-xl p-8 min-h-[400px]">
            <p className="text-muted-foreground">{currentLesson.content}</p>
          </div>
        );
      case "image":
        return (
          <div className="bg-card border border-border rounded-xl p-8 flex items-center justify-center min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800" 
              alt={currentLesson.title}
              className="max-w-full max-h-[500px] rounded-lg"
            />
          </div>
        );
      case "quiz":
        return (
          <div className="bg-card border border-border rounded-xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-4">{currentLesson.title}</h3>
            <p className="text-muted-foreground mb-6">
              {currentLesson.duration} • Multiple attempts allowed
            </p>
            <Button variant="glow" size="lg">
              <Play className="h-5 w-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-screen sticky top-0 bg-card border-r border-border overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold truncate mb-2">{mockCourse.title}</h2>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary">{mockCourse.progress}%</span>
                  </div>
                  <Progress value={mockCourse.progress} className="h-1.5" />
                </div>
              </div>

              {/* Lessons */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {mockLessons.map((lesson) => (
                  <div key={lesson.id}>
                    <LessonItem
                      {...lesson}
                      isActive={lesson.id === lessonId}
                      onClick={() => navigate(`/learn/${courseId}/lesson/${lesson.id}`)}
                    />
                    {/* Attachments */}
                    {lesson.id === lessonId && lesson.attachments && (
                      <div className="ml-8 mt-1 space-y-1">
                        {lesson.attachments.map((attachment, idx) => (
                          <a
                            key={idx}
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {attachment.type === "file" ? (
                              <FileDown className="h-3 w-3" />
                            ) : (
                              <ExternalLink className="h-3 w-3" />
                            )}
                            {attachment.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePrev}
              disabled={!prevLesson}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleNext}
              disabled={!nextLesson}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-8 max-w-5xl mx-auto w-full">
          {/* Lesson Title */}
          <motion.div
            key={currentLesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
            {currentLesson.description && (
              <p className="text-muted-foreground">{currentLesson.description}</p>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            key={`content-${currentLesson.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {renderContent()}
          </motion.div>

          {/* Mark Complete Button */}
          {currentLesson.status !== "completed" && currentLesson.type !== "quiz" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <Button variant="outline" size="lg">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Mark as Complete
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

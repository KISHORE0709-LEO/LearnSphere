import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const getMockTopic = (topicId: string) => ({
  id: topicId,
  title: "Sample Lesson",
  type: "video",
  duration: 15,
  content_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  description: "This is a sample lesson. In production, this content would be loaded from your database.",
  is_completed: false
});

const getMockModule = () => ({
  id: "module-1",
  title: "Sample Module"
});

export default function LessonPlayer() {
  const { courseId, moduleId, topicId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [topic, setTopic] = useState<any>(null);
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Try to fetch topic from database (suppress console errors for expected failures)
    fetch(`http://localhost:3001/api/courses/${courseId}/modules/${moduleId}/topics/${topicId}`)
      .then(res => {
        if (!res.ok) throw new Error('Topic endpoint not found');
        return res.json();
      })
      .then(data => {
        setTopic(data.topic);
        setModule(data.module);
        setIsCompleted(data.topic.is_completed || false);
        setLoading(false);
      })
      .catch(() => {
        // Try localStorage fallback
        const storageKey = `course_${courseId}_lessons`;
        const savedLessons = localStorage.getItem(storageKey);
        
        if (savedLessons) {
          const lessons = JSON.parse(savedLessons);
          const foundTopic = lessons.find((lesson: any) => lesson.id === topicId);
          
          if (foundTopic) {
            setTopic({
              id: foundTopic.id,
              title: foundTopic.title,
              type: foundTopic.lesson_type,
              duration: foundTopic.duration,
              content_url: foundTopic.content_url || foundTopic.videoLink || "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: foundTopic.description || "This lesson content is stored locally.",
              is_completed: false
            });
            setModule({ id: moduleId, title: "Module" });
            setIsCompleted(false);
            setLoading(false);
            return;
          }
        }
        
        // Final fallback to mock data
        setTopic(getMockTopic(topicId || ''));
        setModule(getMockModule());
        setIsCompleted(false);
        setLoading(false);
      });
  }, [courseId, moduleId, topicId]);

  const handleMarkComplete = async () => {
    if (!currentUser || isCompleted) return;

    try {
      const res = await fetch(`http://localhost:3001/api/progress/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          courseId,
          moduleId,
          topicId
        })
      });

      if (res.ok) {
        setIsCompleted(true);
        toast({ title: "Success", description: "Topic marked as complete!" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to update progress", variant: "destructive" });
    }
  };

  const handleVideoEnd = () => {
    if (topic?.type === "video" && !isCompleted) {
      handleMarkComplete();
    }
  };

  const handleNext = () => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/courses/${courseId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            <div className="flex items-center gap-2">
              {isCompleted && (
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">{module?.title || 'Module'}</p>
            <h1 className="text-3xl font-bold">{topic?.title || 'Lesson'}</h1>
          </div>

          {/* Content Display */}
          <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
            {topic?.type === "video" && (
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={topic.content_url}
                  title={topic.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={handleVideoEnd}
                />
              </div>
            )}

            {topic?.type === "document" && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6 p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Document Resource</h3>
                      <p className="text-sm text-muted-foreground">Downloadable PDF document</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open(topic.content_url, '_blank')}
                    variant="default"
                  >
                    Download PDF
                  </Button>
                </div>
                <iframe
                  src={`${topic.content_url}#view=FitH`}
                  className="w-full h-[600px] border-0 rounded-lg"
                  title={topic.title}
                />
              </div>
            )}

            {topic?.type === "image" && (
              <div className="p-8">
                <img
                  src={topic.content_url}
                  alt={topic.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Description */}
          {topic?.description && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-2">About this lesson</h3>
              <p className="text-muted-foreground">{topic.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(`/courses/${courseId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-3">
              {!isCompleted && (
                <Button
                  variant="outline"
                  onClick={handleMarkComplete}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              )}
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

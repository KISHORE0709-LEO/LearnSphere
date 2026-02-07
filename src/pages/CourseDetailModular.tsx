import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, CheckCircle, Circle, Video, FileText, Image as ImageIcon, HelpCircle, Star, BookOpen, ListChecks, XCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Topic {
  id: string;
  title: string;
  type: "video" | "document" | "image";
  duration: number;
  is_completed: boolean;
}

interface Module {
  id: string;
  title: string;
  order_index: number;
  topics: Topic[];
  quiz_id?: string;
  quiz_title?: string;
  quiz_completed?: boolean;
}

// Mock modules data as fallback
const getMockModules = (courseId: string) => [
  {
    id: `${courseId}-m1`,
    title: "Introduction & Fundamentals",
    order_index: 1,
    topics: [
      { id: `${courseId}-t1`, title: "Course Overview", type: "video" as const, duration: 15, is_completed: false },
      { id: `${courseId}-t2`, title: "Getting Started Guide", type: "document" as const, duration: 10, is_completed: false },
      { id: `${courseId}-t3`, title: "System Architecture", type: "image" as const, duration: 5, is_completed: false },
      { id: `${courseId}-t4`, title: "Setup & Configuration", type: "video" as const, duration: 20, is_completed: false },
    ],
    quiz_id: `${courseId}-q1`,
    quiz_title: "Fundamentals Quiz",
    quiz_completed: false
  },
  {
    id: `${courseId}-m2`,
    title: "Core Concepts & Features",
    order_index: 2,
    topics: [
      { id: `${courseId}-t5`, title: "Key Features Overview", type: "video" as const, duration: 18, is_completed: false },
      { id: `${courseId}-t6`, title: "Best Practices Guide", type: "document" as const, duration: 12, is_completed: false },
      { id: `${courseId}-t7`, title: "Workflow Demonstration", type: "video" as const, duration: 25, is_completed: false },
      { id: `${courseId}-t8`, title: "Process Flow Diagram", type: "image" as const, duration: 8, is_completed: false },
    ],
    quiz_id: `${courseId}-q2`,
    quiz_title: "Core Concepts Quiz",
    quiz_completed: false
  },
  {
    id: `${courseId}-m3`,
    title: "Advanced Techniques",
    order_index: 3,
    topics: [
      { id: `${courseId}-t9`, title: "Advanced Configuration", type: "video" as const, duration: 22, is_completed: false },
      { id: `${courseId}-t10`, title: "Optimization Strategies", type: "document" as const, duration: 14, is_completed: false },
      { id: `${courseId}-t11`, title: "Advanced Features Demo", type: "video" as const, duration: 28, is_completed: false },
    ],
    quiz_id: `${courseId}-q3`,
    quiz_title: "Advanced Techniques Quiz",
    quiz_completed: false
  },
  {
    id: `${courseId}-m4`,
    title: "Practical Applications",
    order_index: 4,
    topics: [
      { id: `${courseId}-t12`, title: "Real-world Use Cases", type: "video" as const, duration: 20, is_completed: false },
      { id: `${courseId}-t13`, title: "Case Study Analysis", type: "document" as const, duration: 15, is_completed: false },
      { id: `${courseId}-t14`, title: "Implementation Guide", type: "video" as const, duration: 25, is_completed: false },
    ],
    quiz_id: `${courseId}-q4`,
    quiz_title: "Practical Applications Quiz",
    quiz_completed: false
  }
];

export default function CourseDetailModular() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    const userId = currentUser?.id || '';

    // Fetch course from database
    fetch(`http://localhost:3001/api/courses/${id}`)
      .then(res => res.json())
      .then(courseData => {
        setCourse(courseData);
        
        // Fetch modules with userId
        return fetch(`http://localhost:3001/api/courses/${id}/modules?userId=${userId}`);
      })
      .then(res => {
        if (!res.ok) throw new Error('Modules endpoint not found');
        return res.json();
      })
      .then(modulesData => {
        setModules(modulesData);
        if (modulesData.length > 0) {
          setExpandedModules(new Set([modulesData[0].id]));
        }
        
        // Fetch reviews
        fetch(`http://localhost:3001/api/courses/${id}/reviews`)
          .then(res => res.json())
          .then(reviewsData => setReviews(reviewsData))
          .catch(err => console.log('Reviews fetch error:', err));
        
        setLoading(false);
      })
      .catch(err => {
        console.log('Using mock modules data:', err.message);
        // Use mock data as fallback
        const mockModules = getMockModules(id || '');
        setModules(mockModules);
        setExpandedModules(new Set([mockModules[0].id]));
        setLoading(false);
      });
  }, [id, currentUser, toast]);

  const handleSubmitReview = async () => {
    if (!currentUser || newRating === 0) {
      toast({ title: "Error", description: "Please select a rating", variant: "destructive" });
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch(`http://localhost:3001/api/courses/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, rating: newRating, comment: newComment })
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews(prev => [{ ...newReview, user_name: currentUser.name }, ...prev]);
        setNewRating(0);
        setNewComment('');
        setShowReviewForm(false);
        toast({ title: "Success", description: "Review submitted successfully!" });
        
        const courseRes = await fetch(`http://localhost:3001/api/courses/${id}`);
        const courseData = await courseRes.json();
        setCourse(courseData);
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to submit review", variant: "destructive" });
    } finally {
      setSubmittingReview(false);
    }
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleTopicClick = (moduleId: string, topicId: string) => {
    navigate(`/learn/${id}/module/${moduleId}/topic/${topicId}`);
  };

  const handleMarkComplete = async (moduleId: string, topicId: string) => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:3001/api/progress/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          courseId: id,
          moduleId,
          topicId
        })
      });

      if (res.ok) {
        setModules(prev => prev.map(module => {
          if (module.id === moduleId) {
            return {
              ...module,
              topics: module.topics.map(topic =>
                topic.id === topicId ? { ...topic, is_completed: true } : topic
              )
            };
          }
          return module;
        }));
        toast({ title: "Success", description: "Topic marked as complete!" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to update progress", variant: "destructive" });
    }
  };

  const getTopicIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "document": return <FileText className="h-4 w-4" />;
      case "image": return <ImageIcon className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const calculateProgress = () => {
    let totalTopics = 0;
    let completedTopics = 0;
    
    modules.forEach(module => {
      totalTopics += module.topics.length;
      completedTopics += module.topics.filter(t => t.is_completed).length;
      if (module.quiz_id && module.quiz_completed) completedTopics++;
      if (module.quiz_id) totalTopics++;
    });

    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  };

  const calculateStats = () => {
    const totalModules = modules.length;
    const completedModules = modules.filter(m => 
      m.topics.every(t => t.is_completed) && (!m.quiz_id || m.quiz_completed)
    ).length;
    const totalContent = modules.reduce((sum, m) => 
      sum + m.topics.length + (m.quiz_id ? 1 : 0), 0
    );
    
    return {
      totalModules,
      completedModules,
      incompleteModules: totalModules - completedModules,
      totalContent,
      completedContent: modules.reduce((sum, m) => 
        sum + m.topics.filter(t => t.is_completed).length + (m.quiz_completed ? 1 : 0), 0
      )
    };
  };

  const progress = calculateProgress();
  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found</p>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Course Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-6">
            <img
              src={course.cover_image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
              alt={course.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <Badge className="mb-2">{course.category}</Badge>
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
            
            {/* Progress Card */}
            <div className="bg-muted/30 rounded-lg p-4 min-w-[280px]">
              <div className="text-center mb-3">
                <div className="text-3xl font-bold text-primary">{progress}%</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <Progress value={progress} className="h-2 mb-4" />
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-background rounded p-2">
                  <div className="flex items-center justify-center mb-1">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-lg font-bold">{stats.totalContent}</div>
                  <div className="text-xs text-muted-foreground">Contents</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="flex items-center justify-center mb-1">
                    <ListChecks className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-lg font-bold">{stats.completedModules}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="flex items-center justify-center mb-1">
                    <XCircle className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="text-lg font-bold">{stats.incompleteModules}</div>
                  <div className="text-xs text-muted-foreground">Incomplete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-1 border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Course Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-1 border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'reviews'
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Star className="h-4 w-4" />
                Ratings & Reviews ({reviews.length})
              </button>
            </div>
            <div className="relative w-80">
              <Input
                placeholder="Search content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-10 rounded-full"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' ? (
        <div className="max-w-4xl space-y-4">
          {modules.filter(module => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return module.title.toLowerCase().includes(query) ||
                   module.topics.some(t => t.title.toLowerCase().includes(query)) ||
                   module.quiz_title?.toLowerCase().includes(query);
          }).map((module, moduleIndex) => {
            const isExpanded = expandedModules.has(module.id);
            const completedTopics = module.topics.filter(t => t.is_completed).length;
            const totalItems = module.topics.length + (module.quiz_id ? 1 : 0);
            const completedItems = completedTopics + (module.quiz_completed ? 1 : 0);
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: moduleIndex * 0.1 }}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">Module {moduleIndex + 1}: {module.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {completedItems}/{totalItems} completed
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {module.topics.length} topics {module.quiz_id && '+ 1 quiz'}
                  </div>
                </button>

                {/* Module Topics */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {module.topics.map((topic, topicIndex) => (
                      <div
                        key={topic.id}
                        className="flex items-center gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {topic.is_completed ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="text-sm text-muted-foreground">
                            {moduleIndex + 1}.{topicIndex + 1}
                          </span>
                          <button
                            onClick={() => handleTopicClick(module.id, topic.id)}
                            className="font-medium hover:text-primary transition-colors text-left"
                          >
                            {topic.title}
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          {getTopicIcon(topic.type)}
                          <span className="text-sm text-muted-foreground">{topic.duration} min</span>
                          {!topic.is_completed && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkComplete(module.id, topic.id)}
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Module Quiz */}
                    {module.quiz_id && (
                      <div className="flex items-center gap-4 p-4 bg-muted/10">
                        <div className="flex items-center gap-3 flex-1">
                          {module.quiz_completed ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <HelpCircle className="h-5 w-5 text-warning" />
                          <button
                            onClick={() => navigate(`/learn/${id}/quiz/${module.quiz_id}`)}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {module.quiz_title || `Module ${moduleIndex + 1} Quiz`}
                          </button>
                        </div>
                        <Button
                          size="sm"
                          variant={module.quiz_completed ? "outline" : "default"}
                          onClick={() => navigate(`/learn/${id}/quiz/${module.quiz_id}`)}
                        >
                          {module.quiz_completed ? "Retake" : "Start Quiz"}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        ) : (
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Student Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-5 w-5 ${star <= Math.round(Number(course.average_rating || 0)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xl font-bold">{Number(course.average_rating || 0).toFixed(1)}</span>
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>
            {currentUser && <Button onClick={() => setShowReviewForm(!showReviewForm)}>{showReviewForm ? 'Cancel' : 'Write a Review'}</Button>}
          </div>

          {showReviewForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border border-border rounded-lg p-6 bg-card mb-6">
              <h3 className="font-semibold mb-4">Write Your Review</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewRating(star)} className="transition-transform hover:scale-110">
                        <Star className={`h-8 w-8 cursor-pointer ${star <= newRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Comment</label>
                  <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Share your experience with this course..." className="w-full min-h-[100px] p-3 border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSubmitReview} disabled={submittingReview || newRating === 0}>{submittingReview ? 'Submitting...' : 'Submit Review'}</Button>
                  <Button variant="outline" onClick={() => { setShowReviewForm(false); setNewRating(0); setNewComment(''); }}>Cancel</Button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No reviews yet. Be the first to review this course!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-border rounded-lg p-6 bg-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {review.user_name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review.user_name || 'Anonymous'}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

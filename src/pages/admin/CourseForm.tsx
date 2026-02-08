import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonItem, type LessonType, type LessonStatus } from "@/components/courses/LessonItem";
import { ContentDialog } from "@/components/courses/ContentDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  UserPlus, 
  Mail, 
  ImagePlus,
  Plus,
  Video,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  Globe,
  Lock,
  Users,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const lessonTypes = [
  { value: "video", label: "Video", icon: Video },
  { value: "document", label: "Document", icon: FileText },
  { value: "image", label: "Image", icon: ImageIcon },
  { value: "quiz", label: "Quiz", icon: HelpCircle },
];

export default function CourseForm() {
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  const [actualId, setActualId] = useState(urlId);
  const isNew = actualId === "new";
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [lessons, setLessons] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [coverImage, setCoverImage] = useState<string>("");
  const [addAttendeeDialog, setAddAttendeeDialog] = useState(false);
  const [newAttendee, setNewAttendee] = useState({ name: "", email: "" });
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (urlId !== actualId) {
      setActualId(urlId);
    }
  }, [urlId]);

  useEffect(() => {
    if (actualId === 'new') {
      setCourse({
        title: "",
        description: "",
        tags: [],
        isPublished: false,
        visibility: "everyone",
        accessRule: "open",
        price: 0,
        responsible: "",
      });
      setLessons([]);
      setLoading(false);
    } else if (actualId && actualId !== 'new' && !/^\d+$/.test(actualId)) {
      // Only fetch if actualId is a valid UUID (not a timestamp)
      fetchCourse();
    } else if (actualId && /^\d+$/.test(actualId)) {
      // If it's a timestamp, load from localStorage and redirect
      const storageKey = `course_${actualId}_lessons`;
      const savedLessons = localStorage.getItem(storageKey);
      if (savedLessons) {
        setLessons(JSON.parse(savedLessons));
      }
      navigate('/admin/courses/new', { replace: true });
    }
  }, [actualId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${actualId}`);
      if (!response.ok) throw new Error('Course not found');
      const data = await response.json();
      
      setCourse({
        title: data.title,
        description: data.description,
        tags: data.tags || [],
        isPublished: data.is_published,
        visibility: "everyone",
        accessRule: "open",
        price: 0,
        responsible: data.instructor_name,
      });
      
      setCoverImage(data.cover_image_url || "");
      
      // Fetch modules and topics
      const modulesResponse = await fetch(`http://localhost:3001/api/courses/${actualId}/modules`);
      if (!modulesResponse.ok) throw new Error('Modules not found');
      const modulesData = await modulesResponse.json();
      
      // Flatten modules and topics into lessons format
      const allLessons: any[] = [];
      if (Array.isArray(modulesData)) {
        modulesData.forEach((module: any) => {
          // Add module as a header
          allLessons.push({
            id: `module-${module.id}`,
            title: module.title,
            lesson_type: 'document',
            isModuleHeader: true
          });
          
          // Add topics
          module.topics?.forEach((topic: any) => {
            allLessons.push({
              id: topic.id,
              title: topic.title,
              lesson_type: topic.type,
              duration: topic.duration
            });
          });
          
          // Add quiz if exists
          if (module.quiz_id) {
            allLessons.push({
              id: module.quiz_id,
              title: module.quiz_title || 'Module Quiz',
              lesson_type: 'quiz'
            });
          }
        });
      }
      
      setLessons(allLessons);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = async (content: any) => {
    let courseId = actualId;

    if (isNew || actualId === 'new') {
      if (!course.title.trim()) {
        toast({
          title: "Course title required",
          description: "Please enter a course title before adding content",
          variant: "destructive",
        });
        return;
      }

      const savedId = await handleSaveCourse(true);
      if (!savedId) return;
      courseId = savedId;
    }

    // Just add to local state since backend endpoints don't exist
    const newLesson = {
      id: Date.now().toString(),
      title: content.title,
      lesson_type: content.type,
      duration: content.duration,
      content_url: content.videoLink,
      description: content.description
    };
    
    setLessons(prev => [...prev, newLesson]);
    
    toast({
      title: "Content added",
      description: `${content.title} has been added successfully`,
    });
  };

  const handleAddAttendee = () => {
    if (!newAttendee.name.trim() || !newAttendee.email.trim()) return;

    toast({
      title: "Attendee added",
      description: `${newAttendee.name} has been enrolled in this course`,
    });
    setAddAttendeeDialog(false);
    setNewAttendee({ name: "", email: "" });
  };

  const handleContactAttendees = () => {
    navigate('/admin/attendees');
  };

  const handleSaveCourse = async (silent = false) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const isCreating = isNew || actualId === 'new';
      const url = isCreating 
        ? 'http://localhost:3001/api/courses'
        : `http://localhost:3001/api/courses/${actualId}`;
      
      const response = await fetch(url, {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: course.title,
          description: course.description,
          tags: course.tags,
          is_published: course.isPublished,
          cover_image_url: coverImage,
          instructor_id: user.id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (!silent) {
          toast({
            title: "Course saved",
            description: "Your changes have been saved successfully",
          });
        }
        
        if (isCreating && result.id) {
          setActualId(result.id);
          window.history.replaceState(null, '', `/admin/courses/${result.id}`);
          return result.id;
        }
        return actualId;
      } else {
        throw new Error('Failed to save course');
      }
    } catch (error) {
      // Fallback to localStorage
      const courseId = isNew ? Date.now().toString() : actualId;
      const courseData = {
        id: courseId,
        title: course.title,
        description: course.description,
        tags: course.tags,
        is_published: course.isPublished,
        cover_image_url: coverImage,
        instructor_id: user?.id || 'local-user',
        created_at: new Date().toISOString()
      };
      
      // Save to localStorage
      const existingCourses = JSON.parse(localStorage.getItem('localCourses') || '[]');
      const courseIndex = existingCourses.findIndex((c: any) => c.id === courseId);
      
      if (courseIndex >= 0) {
        existingCourses[courseIndex] = courseData;
      } else {
        existingCourses.push(courseData);
      }
      
      localStorage.setItem('localCourses', JSON.stringify(existingCourses));
      
      if (!silent) {
        toast({
          title: "Course saved locally",
          description: "Your changes have been saved to local storage",
        });
      }
      
      if (isNew) {
        setActualId(courseId);
        window.history.replaceState(null, '', `/admin/courses/${courseId}`);
        return courseId;
      }
      return actualId;
    }
  };

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/courses")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold">{isNew ? "Create Course" : course.title}</h1>
              {!isNew && (
                <div className="flex items-center gap-2 mt-1">
                  {course.isPublished ? (
                    <Badge variant="glow" className="text-xs">
                      <Globe className="h-3 w-3 mr-1" />
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">Draft</Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/courses/new")}>
              New
            </Button>
            <Button variant="outline" size="sm" onClick={handleSaveCourse}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate(`/admin/courses/${actualId}/reporting`)}>
              View Reporting
            </Button>
            <Button variant="outline" size="sm" onClick={handleContactAttendees}>
              <Mail className="h-4 w-4 mr-2" />
              Contact Attendees
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAddAttendeeDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Attendees
            </Button>
            
            <div className="flex items-center gap-2 ml-4 px-4 border-l border-border">
              <Label htmlFor="publish" className="text-sm">Share on web / Publish on website</Label>
              <Switch 
                id="publish"
                checked={course.isPublished}
                onCheckedChange={(checked) => setCourse({ ...course, isPublished: checked })}
                className="data-[state=checked]:bg-success"
              />
            </div>
            
            <Button variant="outline" size="sm" onClick={() => {
              if (!actualId || actualId === 'new') {
                alert('Please save the course first before previewing');
                return;
              }
              window.open(`/courses/${actualId}`, '_blank');
            }}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="p-6 lg:p-8 max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Form */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                placeholder="Enter course title..."
                value={course.title}
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="React, Frontend, JavaScript..."
                defaultValue={course.tags?.join(", ")}
              />
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
                <TabsTrigger value="quiz">Quizzes</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Lessons</h3>
                    <Button size="sm" onClick={() => setIsContentDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Content
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {lessons.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No content yet. Click "Add Content" to start.</p>
                      </div>
                    ) : (
                      lessons.map((lesson) => (
                        lesson.isModuleHeader ? (
                          <div key={lesson.id} className="font-semibold text-primary mt-4 mb-2 px-3">
                            {lesson.title}
                          </div>
                        ) : (
                          <LessonItem
                            key={lesson.id}
                            id={lesson.id}
                            title={lesson.title}
                            type={lesson.lesson_type || 'video'}
                            duration={lesson.duration ? `${lesson.duration} min` : undefined}
                            status="not-started"
                            isAdmin
                            onEdit={() => {
                              console.log('Edit lesson:', lesson.id);
                            }}
                            onDelete={() => {
                              setLessons(lessons.filter(l => l.id !== lesson.id));
                            }}
                          />
                        )
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="description" className="mt-6">
                <div className="space-y-2">
                  <Label>Course Description</Label>
                  <Textarea
                    placeholder="Describe what learners will gain from this course..."
                    value={course.description}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    className="min-h-[200px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="options" className="mt-6">
                <div className="space-y-6">
                  {/* Visibility */}
                  <div className="space-y-2">
                    <Label>Visibility (Show course to)</Label>
                    <Select
                      value={course.visibility}
                      onValueChange={(value) => setCourse({ ...course, visibility: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Everyone
                          </div>
                        </SelectItem>
                        <SelectItem value="signed-in">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Signed In Users
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Access Rule */}
                  <div className="space-y-2">
                    <Label>Access Rule</Label>
                    <Select
                      value={course.accessRule}
                      onValueChange={(value) => setCourse({ ...course, accessRule: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Open
                          </div>
                        </SelectItem>
                        <SelectItem value="invitation">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            On Invitation
                          </div>
                        </SelectItem>
                        <SelectItem value="payment">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            On Payment
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price (if payment) */}
                  {course.accessRule === "payment" && (
                    <div className="space-y-2">
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={course.price}
                        onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  )}

                  {/* Course Admin */}
                  <div className="space-y-2">
                    <Label>Course Admin / Responsible</Label>
                    <Input
                      placeholder="Select responsible person..."
                      value={course.responsible}
                      onChange={(e) => setCourse({ ...course, responsible: e.target.value })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quiz" className="mt-6">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Quizzes</h3>
                    <Button size="sm" onClick={() => navigate(`/admin/courses/${actualId}/quiz/new`)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Quiz
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{quiz.title}</p>
                            <p className="text-sm text-muted-foreground">{quiz.questions?.length || 0} questions</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/courses/${actualId}/quiz/${quiz.id}`)}
                        >
                          Edit
                        </Button>
                      </div>
                    ))}
                    {quizzes.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="mb-4">No quizzes yet</p>
                        <Button onClick={() => navigate(`/admin/courses/${actualId}/quiz/new`)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Quiz
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Course Image */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Course Image</Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              {coverImage ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border group">
                  <img 
                    src={coverImage} 
                    alt="Course cover" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Change
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => setCoverImage("")}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ContentDialog
        open={isContentDialogOpen}
        onOpenChange={setIsContentDialogOpen}
        onSave={handleAddContent}
      />

      <Dialog open={addAttendeeDialog} onOpenChange={setAddAttendeeDialog}>
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
            <Button variant="outline" onClick={() => setAddAttendeeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAttendee}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

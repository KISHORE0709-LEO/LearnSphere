import { useState } from "react";
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

// Mock data
const mockCourse = {
  id: "1",
  title: "Advanced React Patterns",
  description: "Master advanced React patterns including compound components, render props, and custom hooks.",
  tags: ["React", "Frontend", "JavaScript"],
  isPublished: true,
  visibility: "everyone",
  accessRule: "open",
  price: 0,
  responsible: "John Doe",
};

const mockLessons: Array<{
  id: string;
  title: string;
  type: LessonType;
  duration?: string;
}> = [
  { id: "1", title: "Introduction to Advanced Patterns", type: "video", duration: "12:30" },
  { id: "2", title: "Compound Components Pattern", type: "video", duration: "18:45" },
  { id: "3", title: "Pattern Documentation", type: "document", duration: "10 min read" },
  { id: "4", title: "Render Props Deep Dive", type: "video", duration: "22:15" },
  { id: "5", title: "Visual Guide to Props", type: "image" },
  { id: "6", title: "Module 1 Quiz", type: "quiz", duration: "15 questions" },
];

const lessonTypes = [
  { value: "video", label: "Video", icon: Video },
  { value: "document", label: "Document", icon: FileText },
  { value: "image", label: "Image", icon: ImageIcon },
  { value: "quiz", label: "Quiz", icon: HelpCircle },
];

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  
  const [course, setCourse] = useState(isNew ? {
    title: "",
    description: "",
    tags: [],
    isPublished: false,
    visibility: "everyone",
    accessRule: "open",
    price: 0,
    responsible: "",
  } : mockCourse);
  
  const [activeTab, setActiveTab] = useState("content");
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [lessons, setLessons] = useState(mockLessons);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  // Load quizzes for this course
  useState(() => {
    const allQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const courseQuizzes = allQuizzes.filter((q: any) => q.courseId === id);
    setQuizzes(courseQuizzes);
  });

  const handleAddContent = (content: any) => {
    const newLesson = {
      id: content.id,
      title: content.title,
      type: content.type,
      duration: content.duration || content.fileName,
    };
    setLessons([...lessons, newLesson]);
  };

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
            <Button variant="outline" size="sm" onClick={() => navigate(`/admin/courses/${id}/reporting`)}>
              View Reporting
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Contact Attendees
            </Button>
            <Button variant="outline" size="sm">
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
            
            <Button variant="outline" size="sm">
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
                    {lessons.map((lesson) => (
                      <LessonItem
                        key={lesson.id}
                        {...lesson}
                        status="not-started"
                        isAdmin
                        onEdit={() => {}}
                        onDelete={() => {}}
                      />
                    ))}
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
                    <Button size="sm" onClick={() => navigate(`/admin/courses/${id}/quiz/new`)}>
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
                          onClick={() => navigate(`/admin/courses/${id}/quiz/${quiz.id}`)}
                        >
                          Edit
                        </Button>
                      </div>
                    ))}
                    {quizzes.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="mb-4">No quizzes yet</p>
                        <Button onClick={() => navigate(`/admin/courses/${id}/quiz/new`)}>
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
              <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContentDialog
        open={isContentDialogOpen}
        onOpenChange={setIsContentDialogOpen}
        onSave={handleAddContent}
      />
    </div>
  );
}

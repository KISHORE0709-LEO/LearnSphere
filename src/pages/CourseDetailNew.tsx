import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, CheckCircle, Circle, FileText, Video, Image as ImageIcon, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ReviewsSection from "@/components/courses/ReviewsSection";

const mockCourse = {
  id: "1",
  title: "Basics of Odoo CRM",
  description: "Learn the fundamentals of Odoo CRM system and master customer relationship management",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  tags: ["CRM", "Odoo"],
  averageRating: 4.5,
  totalReviews: 3,
  contents: [
    { id: "1", title: "Introduction to CRM Concepts", type: "video", completed: false },
    { id: "2", title: "Getting Started with Odoo CRM", type: "document", completed: true },
    { id: "3", title: "CRM Dashboard Overview", type: "video", completed: true },
    { id: "4", title: "Lead Management Guide", type: "document", completed: false },
    { id: "5", title: "Pipeline Configuration", type: "video", completed: false },
    { id: "6", title: "Sales Process Flowchart", type: "image", completed: false },
    { id: "7", title: "Module 1 Quiz: CRM Basics", type: "quiz", completed: false },
    { id: "8", title: "Advanced Sales Automation", type: "video", completed: false },
    { id: "9", title: "Email Integration Setup", type: "document", completed: false },
    { id: "10", title: "Customer Segmentation", type: "video", completed: false },
    { id: "11", title: "Reporting Dashboard", type: "image", completed: false },
    { id: "12", title: "Module 2 Quiz: Sales Automation", type: "quiz", completed: false },
    { id: "13", title: "Activity Management", type: "video", completed: false },
    { id: "14", title: "Best Practices Guide", type: "document", completed: false },
    { id: "15", title: "CRM Analytics Deep Dive", type: "video", completed: false },
    { id: "16", title: "Integration Architecture", type: "image", completed: false },
    { id: "17", title: "Module 3 Quiz: Advanced Features", type: "quiz", completed: false },
    { id: "18", title: "Final Assessment Quiz", type: "quiz", completed: false },
  ],
};

const mockReviews = [
  {
    id: "1",
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Excellent course! The content is well-structured and easy to follow. I learned so much about Odoo CRM.",
    date: "2024-01-15",
  },
  {
    id: "2",
    userName: "Michael Chen",
    rating: 4,
    comment: "Great course overall. The instructor explains concepts clearly. Would love to see more practical examples.",
    date: "2024-01-10",
  },
  {
    id: "3",
    userName: "Emily Rodriguez",
    rating: 5,
    comment: "Best CRM course I've taken! The hands-on approach really helped me understand the system better.",
    date: "2024-01-05",
  },
];

const getIcon = (type: string, completed: boolean) => {
  const iconClass = "h-5 w-5";
  if (completed) {
    return <CheckCircle className={`${iconClass} text-primary`} />;
  }
  
  switch (type) {
    case "video":
      return <Video className={iconClass} />;
    case "document":
      return <FileText className={iconClass} />;
    case "image":
      return <ImageIcon className={iconClass} />;
    case "quiz":
      return <HelpCircle className={iconClass} />;
    default:
      return <Circle className={iconClass} />;
  }
};

export default function CourseDetailNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState(mockReviews);

  const handleAddReview = (rating: number, comment: string) => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const newReview = {
      id: String(reviews.length + 1),
      userName: user.name || "Current User",
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([newReview, ...reviews]);
  };

  const completedCount = mockCourse.contents.filter(c => c.completed).length;
  const totalCount = mockCourse.contents.length;
  const incompleteCount = totalCount - completedCount;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const filteredContents = mockCourse.contents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Course Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-6">
            <img
              src={mockCourse.image}
              alt={mockCourse.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <Badge className="mb-2">Course</Badge>
              <h1 className="text-2xl font-bold mb-2">{mockCourse.title}</h1>
              <p className="text-muted-foreground mb-3">{mockCourse.description}</p>
              <div className="flex gap-2">
                {mockCourse.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Progress Card */}
            <div className="bg-muted/30 rounded-lg p-4 min-w-[280px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{progressPercentage}% Completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-4" />
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="font-bold text-lg">{totalCount}</div>
                  <div className="text-muted-foreground">Content</div>
                </div>
                <div>
                  <div className="font-bold text-lg text-primary">{completedCount}</div>
                  <div className="text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="font-bold text-lg text-warning">{incompleteCount}</div>
                  <div className="text-muted-foreground">Incomplete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-3 px-1 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Course Overview
            </button>
            <button
              onClick={() => setActiveTab("ratings")}
              className={`py-3 px-1 border-b-2 transition-colors ${
                activeTab === "ratings"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Ratings and Reviews
            </button>
            <div className="ml-auto">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          {activeTab === "overview" && (
            <>
              <h2 className="text-lg font-semibold mb-4">{totalCount} Contents</h2>
              <div className="space-y-2">
                {filteredContents.map((content, index) => (
                  <motion.button
                    key={content.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/learn/${id}/lesson/${content.id}`)}
                    className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all text-left group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-border group-hover:border-primary transition-colors">
                      {content.completed ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-muted-foreground">#{index + 1}</span>
                      <span className="font-medium">{content.title}</span>
                    </div>
                    {getIcon(content.type, content.completed)}
                  </motion.button>
                ))}
              </div>
            </>
          )}

          {activeTab === "ratings" && (
            <ReviewsSection
              courseId={mockCourse.id}
              averageRating={mockCourse.averageRating}
              totalReviews={reviews.length}
              reviews={reviews}
              onAddReview={handleAddReview}
            />
          )}
        </div>
      </div>
    </div>
  );
}

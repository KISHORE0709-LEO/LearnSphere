import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockCourses = [
  {
    id: "1",
    title: "Basics of Odoo CRM",
    description: "Learn the fundamentals of Odoo CRM system",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    tags: ["CRM", "Odoo"],
    price: 0,
    isPaid: false,
    progress: 30,
    status: "in-progress",
  },
  {
    id: "2",
    title: "Advanced Odoo CRM",
    description: "Master advanced features of Odoo CRM",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    tags: ["CRM", "Advanced"],
    price: 500,
    isPaid: false,
    progress: 0,
    status: "not-started",
  },
  {
    id: "3",
    title: "Introduction to Odoo AI",
    description: "Explore AI capabilities in Odoo platform",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    tags: ["AI", "Odoo"],
    price: 0,
    isPaid: false,
    progress: 0,
    status: "available",
  },
];

const badgeLevels = [
  { name: "Newbie", points: 20, color: "text-gray-400" },
  { name: "Explorer", points: 40, color: "text-blue-400" },
  { name: "Achiever", points: 60, color: "text-green-400" },
  { name: "Specialist", points: 80, color: "text-purple-400" },
  { name: "Expert", points: 100, color: "text-orange-400" },
  { name: "Master", points: 120, color: "text-yellow-400" },
];

export default function MyCoursesNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const filteredCourses = mockCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userPoints = currentUser?.points || 20;
  const currentBadge = badgeLevels.reduce((prev, curr) => 
    userPoints >= curr.points ? curr : prev
  , badgeLevels[0]);

  const getButtonText = (course: any) => {
    if (course.price > 0 && !course.isPaid) return "Buy Course";
    if (course.status === "in-progress") return "Continue";
    if (course.status === "not-started") return "Start";
    return "Join Course";
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Search Bar Section */}
      <div className="border-b border-border bg-card py-4">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content - My Courses */}
          <div>
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass border-border overflow-hidden hover:border-primary/50 transition-all h-full flex flex-col">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      {course.price > 0 && !course.isPaid && (
                        <div className="absolute top-2 right-2 bg-success/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                          INR {course.price}
                        </div>
                      )}
                      {course.isPaid && (
                        <Badge className="absolute top-2 right-2 bg-success">Paid</Badge>
                      )}
                    </div>
                    <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {course.description}
                      </p>
                      <div className="flex gap-2">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {course.status === "in-progress" && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}
                      <Button
                        className="w-full mt-auto"
                        variant={course.price > 0 && !course.isPaid ? "default" : "glow"}
                        asChild
                      >
                        <Link to={`/courses/${course.id}`}>
                          {getButtonText(course)}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - My Profile */}
          <div>
            <Card className="glass border-border sticky top-24">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-semibold text-lg">My Profile</h3>
                
                {/* Points Circle */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(userPoints / 120) * 351.86} 351.86`}
                        className="text-primary transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary">{userPoints}</p>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                  </div>
                  <p className={`mt-4 text-xl font-bold ${currentBadge.color}`}>
                    {currentBadge.name}
                  </p>
                </div>

                {/* Badge Levels */}
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    Badges
                  </h4>
                  <div className="space-y-2">
                    {badgeLevels.map((badge) => (
                      <div
                        key={badge.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span
                          className={`${
                            userPoints >= badge.points
                              ? badge.color + " font-semibold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {badge.name}
                        </span>
                        <span className="text-muted-foreground">{badge.points} Points</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

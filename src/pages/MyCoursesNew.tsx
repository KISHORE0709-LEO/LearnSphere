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
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        const userData = JSON.parse(user);
        console.log('MyCoursesNew - Loaded user data:', userData);
        setCurrentUser(userData);
        
        // Fetch enrolled courses
        fetch(`http://localhost:3001/api/users/${userData.id}/enrollments`)
          .then(res => res.json())
          .then(data => {
            setEnrolledCourses(data);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      }
    };

    loadUserData();

    // Reload user data when window regains focus
    window.addEventListener('focus', loadUserData);
    return () => window.removeEventListener('focus', loadUserData);
  }, []);

  const filteredCourses = enrolledCourses.filter((enrollment) =>
    enrollment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userPoints = currentUser?.total_points || 0;
  
  const getBadgeProgress = (points: number) => {
    const levels = [
      { name: "Newbie", points: 0, next: 20 },
      { name: "Explorer", points: 20, next: 40 },
      { name: "Achiever", points: 40, next: 60 },
      { name: "Specialist", points: 60, next: 80 },
      { name: "Expert", points: 80, next: 100 },
      { name: "Master", points: 100, next: 120 },
    ];
    
    let current = levels[0];
    for (const level of levels) {
      if (points >= level.points) current = level;
    }
    
    if (points >= 120) {
      return { badge: { name: "Master", color: "text-yellow-400" }, progress: 100 };
    }
    
    const progressToNext = ((points - current.points) / (current.next - current.points)) * 100;
    const badgeColors: Record<string, string> = {
      "Newbie": "text-gray-400",
      "Explorer": "text-blue-400",
      "Achiever": "text-green-400",
      "Specialist": "text-purple-400",
      "Expert": "text-orange-400",
      "Master": "text-yellow-400"
    };
    
    return { 
      badge: { name: current.name, color: badgeColors[current.name] },
      progress: progressToNext
    };
  };
  
  const { badge: currentBadge, progress: circleProgress } = getBadgeProgress(userPoints);

  const getButtonText = (enrollment: any) => {
    if (enrollment.progress_percentage > 0) return "Continue";
    return "Start";
  };

  const getStatus = (enrollment: any) => {
    if (enrollment.is_completed) return "completed";
    if (enrollment.progress_percentage > 0) return "in-progress";
    return "not-started";
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
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : filteredCourses.length === 0 ? (
              <p className="text-muted-foreground">No enrolled courses yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCourses.map((enrollment, index) => (
                <motion.div
                  key={enrollment.course_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass border-border overflow-hidden hover:border-primary/50 transition-all h-full flex flex-col">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={enrollment.cover_image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
                        alt={enrollment.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg line-clamp-1">{enrollment.title}</h3>
                      <Badge variant="secondary" className="text-xs w-fit">
                        {enrollment.category}
                      </Badge>
                      {getStatus(enrollment) === "in-progress" && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{Math.round(enrollment.progress_percentage)}%</span>
                          </div>
                          <Progress value={enrollment.progress_percentage} className="h-2" />
                        </div>
                      )}
                      <Button
                        className="w-full mt-auto"
                        variant="glow"
                        asChild
                      >
                        <Link to={`/courses/${enrollment.course_id}`}>
                          {getButtonText(enrollment)}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
                ))}
              </div>
            )}
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
                        strokeDasharray={`${(circleProgress / 100) * 351.86} 351.86`}
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

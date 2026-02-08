import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield, LogOut, Trophy, Star, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";
import LearningStats from "@/components/profile/LearningStats";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/login");
    } else {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      
      if (userData.id) {
        fetch(`http://localhost:3001/api/users/${userData.id}`)
          .then(res => {
            if (!res.ok) throw new Error('User not found');
            return res.json();
          })
          .then(data => {
            const updatedUser = { ...userData, ...data };
            setUser(updatedUser);
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
          })
          .catch(err => {
            console.error('Failed to fetch user data:', err);
            // Continue with localStorage data if API fails
          });
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" });
      return;
    }

    if (file.size > 500 * 1024) {
      toast({ title: "Error", description: "Image must be less than 500KB", variant: "destructive" });
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      
      try {
        const res = await fetch(`http://localhost:3001/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatar_url: base64String })
        });

        if (!res.ok) throw new Error('Failed to update avatar');
        
        const updatedUserData = await res.json();
        const updatedUser = { ...user, avatar_url: base64String };
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        toast({ title: "Success", description: "Profile picture updated!" });
      } catch (error) {
        toast({ title: "Error", description: "Failed to update profile picture", variant: "destructive" });
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-radial p-4 pt-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="glass-strong border-border">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.name} className="object-cover" />
                    ) : (
                      <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center cursor-pointer transition-colors">
                    <Camera className="h-4 w-4 text-primary-foreground" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <Badge variant={user.role === "instructor" ? "default" : "secondary"}>
                    {user.role === "instructor" ? "Instructor" : "Learner"}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium capitalize">{user.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{user.created_at ? formatDate(user.created_at) : 'N/A'}</p>
                  </div>
                </div>

                {user.role === "learner" && (
                  <>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                      <Trophy className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Points</p>
                        <p className="font-medium">{user.total_points || 0}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                      <Star className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Badge Level</p>
                        <p className="font-medium">{user.badge_level || 'Newbie'}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate(user.role === "instructor" ? "/admin" : "/courses")}
                  className="flex-1"
                >
                  Go to {user.role === "instructor" ? "Dashboard" : "Courses"}
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {user.role === "learner" && (
            <>
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <LearningStats userId={user.id} />
                </CardContent>
              </Card>

              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ActivityHeatmap userId={user.id} />
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
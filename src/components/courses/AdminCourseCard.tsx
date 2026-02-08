import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  MoreVertical, 
  Eye, 
  Clock, 
  BookOpen, 
  Globe, 
  Pencil, 
  Share2, 
  Trash2,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Mail
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface AdminCourseCardProps {
  id: string;
  title: string;
  image: string;
  tags: string[];
  viewsCount: number;
  lessonsCount: number;
  duration: string;
  isPublished: boolean;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

export function AdminCourseCard({
  id,
  title,
  image,
  tags,
  viewsCount,
  lessonsCount,
  duration,
  isPublished,
  onEdit,
  onShare,
  onDelete
}: AdminCourseCardProps) {
  const courseUrl = `${window.location.origin}/courses/${id}`;
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(`Check out this course: ${title}`);
    const url = encodeURIComponent(courseUrl);
    
    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      instagram: courseUrl,
      email: `mailto:?subject=${text}&body=${url}`,
    };

    if (platform === 'instagram') {
      navigator.clipboard.writeText(courseUrl);
      toast({
        title: "Link copied!",
        description: "You can now share it on Instagram",
      });
    } else if (platform === 'email') {
      window.location.href = shareUrls[platform];
    } else {
      const newWindow = window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
      if (newWindow) {
        toast({
          title: "Opening share dialog",
          description: `Sharing on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
        });
      } else {
        navigator.clipboard.writeText(courseUrl);
        toast({
          title: "Link copied!",
          description: "Please allow popups or paste the link manually",
        });
      }
    }
    onShare?.();
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        
        {/* Published Badge */}
        {isPublished && (
          <div className="absolute top-3 left-3">
            <Badge variant="glow" className="gap-1">
              <Globe className="h-3 w-3" />
              Published
            </Badge>
          </div>
        )}

        {/* Actions */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('telegram')}>
                    <Send className="h-4 w-4 mr-2" />
                    Telegram
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('facebook')}>
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('instagram')}>
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('email')}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{viewsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{lessonsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

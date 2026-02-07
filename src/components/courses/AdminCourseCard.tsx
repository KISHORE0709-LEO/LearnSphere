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
  Trash2 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
              <DropdownMenuItem onClick={onShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
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

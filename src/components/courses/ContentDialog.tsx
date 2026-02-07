import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Video, FileText, Image as ImageIcon, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ContentType = "video" | "document" | "image";

interface ContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (content: any) => void;
}

export function ContentDialog({ open, onOpenChange, onSave }: ContentDialogProps) {
  const [contentType, setContentType] = useState<ContentType>("video");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoLink: "",
    responsible: "",
    duration: "",
    fileName: "",
    allowDownload: false,
    attachmentFile: "",
    attachmentLink: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (contentType === "video") {
      if (!formData.videoLink.trim()) {
        newErrors.videoLink = "Video link is required";
      } else {
        const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|drive\.google\.com)/.test(formData.videoLink);
        if (!isValidUrl) {
          newErrors.videoLink = "Please enter a valid YouTube or Google Drive link";
        }
      }
      if (!formData.duration.trim()) {
        newErrors.duration = "Duration is required";
      } else {
        const isValidDuration = /^([0-9]{1,2}):([0-5][0-9])$/.test(formData.duration);
        if (!isValidDuration) {
          newErrors.duration = "Duration must be in format hh:mm (e.g., 12:30)";
        }
      }
    }

    if ((contentType === "document" || contentType === "image") && !formData.fileName) {
      newErrors.fileName = `Please upload a ${contentType}`;
    }

    if (!formData.responsible.trim()) {
      newErrors.responsible = "Responsible person is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const content = {
      id: Date.now().toString(),
      title: formData.title,
      type: contentType,
      description: formData.description,
      responsible: formData.responsible,
      ...(contentType === "video" && {
        videoLink: formData.videoLink,
        duration: formData.duration,
      }),
      ...(contentType === "document" && {
        fileName: formData.fileName,
        allowDownload: formData.allowDownload,
      }),
      ...(contentType === "image" && {
        fileName: formData.fileName,
        allowDownload: formData.allowDownload,
      }),
    };

    onSave(content);
    handleClose();
    toast({
      title: "Content added",
      description: `${formData.title} has been added successfully`,
    });
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      videoLink: "",
      responsible: "",
      duration: "",
      fileName: "",
      allowDownload: false,
      attachmentFile: "",
      attachmentLink: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  const handleAttachmentFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, attachmentFile: file.name });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = contentType === "document" 
        ? ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        : ["image/jpeg", "image/png", "image/gif", "image/webp"];

      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, fileName: `Invalid file type. Please upload a valid ${contentType}` });
        return;
      }

      setFormData({ ...formData, fileName: file.name });
      setErrors({ ...errors, fileName: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Content Title *</Label>
            <Input
              id="title"
              placeholder="Enter content title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          {/* Content Category */}
          <div className="space-y-2">
            <Label>Content Category *</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setContentType("video")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contentType === "video"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Video className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Video</p>
              </button>
              <button
                type="button"
                onClick={() => setContentType("document")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contentType === "document"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Document</p>
              </button>
              <button
                type="button"
                onClick={() => setContentType("image")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contentType === "image"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <ImageIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Image</p>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="attachment">Additional Attachment</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              {/* Video Fields */}
              {contentType === "video" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="videoLink">Video Link (YouTube / Google Drive) *</Label>
                    <Input
                      id="videoLink"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.videoLink}
                      onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                    />
                    {errors.videoLink && <p className="text-sm text-destructive">{errors.videoLink}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hh:mm) *</Label>
                    <Input
                      id="duration"
                      placeholder="12:30"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                    {errors.duration && <p className="text-sm text-destructive">{errors.duration}</p>}
                  </div>
                </>
              )}

              {/* Document Fields */}
              {contentType === "document" && (
                <>
                  <div className="space-y-2">
                    <Label>Upload Document *</Label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" asChild>
                        <label className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </Button>
                      {formData.fileName && (
                        <span className="text-sm text-muted-foreground">{formData.fileName}</span>
                      )}
                    </div>
                    {errors.fileName && <p className="text-sm text-destructive">{errors.fileName}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="responsible">Responsible *</Label>
                      <Input
                        id="responsible"
                        placeholder="Enter responsible person"
                        value={formData.responsible}
                        onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                      />
                      {errors.responsible && <p className="text-sm text-destructive">{errors.responsible}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowDownload">Allow Download</Label>
                      <div className="flex items-center gap-2 h-10">
                        <input
                          type="checkbox"
                          id="allowDownload"
                          checked={formData.allowDownload}
                          onChange={(e) => setFormData({ ...formData, allowDownload: e.target.checked })}
                          className="h-4 w-4 rounded border-border"
                        />
                        <span className="text-sm text-muted-foreground">Enable download</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Image Fields */}
              {contentType === "image" && (
                <>
                  <div className="space-y-2">
                    <Label>Upload Image *</Label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" asChild>
                        <label className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </Button>
                      {formData.fileName && (
                        <span className="text-sm text-muted-foreground">{formData.fileName}</span>
                      )}
                    </div>
                    {errors.fileName && <p className="text-sm text-destructive">{errors.fileName}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="responsibleImg">Responsible *</Label>
                      <Input
                        id="responsibleImg"
                        placeholder="Enter responsible person"
                        value={formData.responsible}
                        onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                      />
                      {errors.responsible && <p className="text-sm text-destructive">{errors.responsible}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowDownloadImg">Allow Download</Label>
                      <div className="flex items-center gap-2 h-10">
                        <input
                          type="checkbox"
                          id="allowDownloadImg"
                          checked={formData.allowDownload}
                          onChange={(e) => setFormData({ ...formData, allowDownload: e.target.checked })}
                          className="h-4 w-4 rounded border-border"
                        />
                        <span className="text-sm text-muted-foreground">Enable download</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="responsible">Responsible *</Label>
                <Input
                  id="responsible"
                  placeholder="Enter responsible person"
                  value={formData.responsible}
                  onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                />
                {errors.responsible && <p className="text-sm text-destructive">{errors.responsible}</p>}
              </div>
            </TabsContent>

            <TabsContent value="description" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter content description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[150px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="attachment" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" asChild>
                      <label className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleAttachmentFileUpload}
                        />
                      </label>
                    </Button>
                    {formData.attachmentFile && (
                      <span className="text-sm text-muted-foreground">{formData.attachmentFile}</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attachmentLink">Link</Label>
                  <Input
                    id="attachmentLink"
                    placeholder="https://example.com/resource"
                    value={formData.attachmentLink}
                    onChange={(e) => setFormData({ ...formData, attachmentLink: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Add Content</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

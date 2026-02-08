import { useState } from "react";
import { MessageSquare, Mail, Phone, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminHelpSupport() {
  const [ticket, setTicket] = useState({ subject: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!ticket.subject.trim() || !ticket.message.trim()) return;

    toast({
      title: "Support ticket submitted",
      description: "We'll get back to you within 24 hours",
    });
    setTicket({ subject: "", message: "" });
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Get assistance and submit support tickets</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="glass border-border">
          <CardHeader>
            <Mail className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Email Support</CardTitle>
            <CardDescription>Send us an email</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">support@learnsphere.com</p>
            <Button variant="outline" size="sm" onClick={() => window.open('mailto:support@learnsphere.com')}>
              Send Email
            </Button>
          </CardContent>
        </Card>

        <Card className="glass border-border">
          <CardHeader>
            <Phone className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Phone Support</CardTitle>
            <CardDescription>Call us directly</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">+1 (555) 123-4567</p>
            <Button variant="outline" size="sm">
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card className="glass border-border">
          <CardHeader>
            <FileText className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Browse our guides</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Access help articles</p>
            <Button variant="outline" size="sm">
              View Docs
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Submit Support Ticket
          </CardTitle>
          <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Brief description of your issue"
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Provide detailed information about your issue..."
              className="min-h-[150px]"
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
            />
          </div>
          <Button onClick={handleSubmit} disabled={!ticket.subject.trim() || !ticket.message.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Submit Ticket
          </Button>
        </CardContent>
      </Card>

      <Card className="glass border-border">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">How do I create a new course?</h4>
            <p className="text-sm text-muted-foreground">
              Navigate to Courses → Create Course button. Fill in the course details and add content modules.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">How do I add learners to a course?</h4>
            <p className="text-sm text-muted-foreground">
              Go to the course page and click "Add Attendees" to enroll learners individually or in bulk.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">How do I track learner progress?</h4>
            <p className="text-sm text-muted-foreground">
              Use the Reporting section to view detailed analytics on learner progress, completion rates, and performance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

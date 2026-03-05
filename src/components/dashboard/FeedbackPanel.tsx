import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Textarea } from "@/components/shared/textarea";
import { Badge } from "@/components/shared/badge";
import { ScrollArea } from "@/components/shared/scroll-area";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/shared/sheet";
import { FeedbackEntry, STATUS_STYLES } from "@/const/feedbackConst";
import { fetchFeedbackData } from "@/api/apiService/feedback/getFeedbackData";
import { sendFeedback } from "@/api/apiService/feedback/sendFeeback";

export default function FeedbackPanel({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<FeedbackEntry[]>();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    const newFeedbackEntry: FeedbackEntry = {
      id: crypto.randomUUID(),
      text: text.trim(),
      date: new Date(),
      status: "Under Review",
    };
    sendFeedbackAsync(newFeedbackEntry).then(() => {
      setEntries((prev) => [
        newFeedbackEntry,
        ...prev,
      ]);
      setText("");

    })
  };

  const sendFeedbackAsync = async (entry: FeedbackEntry) => {
    try {
      const data = await sendFeedback(entry);
      return data;
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  }

  useEffect(() => {
    const fetchFeedbackDataAsync = async () => {
      const data = await fetchFeedbackData();
      setEntries(data);
    }
    fetchFeedbackDataAsync().catch(console.error);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className={triggerClassName}>
          <MessageSquare className="h-4 w-4" />
          Feedback
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col w-[400px] sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle>Feedback</SheetTitle>
        </SheetHeader>

        <div className="space-y-3 pt-2">
          <Textarea
            placeholder="Share your feedback…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
          <Button onClick={handleSubmit} disabled={!text.trim()} className="w-full">
            Submit
          </Button>
        </div>

        <div className="mt-6 flex-1 min-h-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Prior Feedback
          </p>
          <ScrollArea className="h-[calc(100%-2rem)]">
            <div className="space-y-3 pr-3">
              {entries?.length > 0 && entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-md border border-border p-3 space-y-1.5"
                >
                  <p className="text-sm text-foreground line-clamp-3">{entry.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {entry.date.toLocaleDateString()}{" "}
                      {entry.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <Badge variant="outline" className={STATUS_STYLES[entry.status]}>
                      {entry.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type FeedbackStatus = "Under Review" | "Acknowledged" | "Resolved";

interface FeedbackEntry {
  id: string;
  text: string;
  date: Date;
  status: FeedbackStatus;
}

const seedData: FeedbackEntry[] = [
  {
    id: "1",
    text: "Cost breakdown by department would be very useful",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "Under Review",
  },
  {
    id: "2",
    text: "Would like to filter agents by team ownership",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "Acknowledged",
  },
  {
    id: "3",
    text: "Latency charts would benefit from a p99 percentile option",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "Resolved",
  },
];

const statusStyles: Record<FeedbackStatus, string> = {
  "Under Review": "bg-amber-100 text-amber-800 border-amber-200",
  Acknowledged: "bg-blue-100 text-blue-800 border-blue-200",
  Resolved: "bg-green-100 text-green-800 border-green-200",
};

export default function FeedbackPanel({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<FeedbackEntry[]>(seedData);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    setEntries((prev) => [
      {
        id: crypto.randomUUID(),
        text: text.trim(),
        date: new Date(),
        status: "Under Review",
      },
      ...prev,
    ]);
    setText("");
  };

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
              {entries.map((entry) => (
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
                    <Badge variant="outline" className={statusStyles[entry.status]}>
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

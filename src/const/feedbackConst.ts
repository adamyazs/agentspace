export const FEEDBACK_DATA: FeedbackEntry[] = [
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

export type FeedbackStatus = "Under Review" | "Acknowledged" | "Resolved";

export interface FeedbackEntry {
  id?: string;
  text: string;
  date: Date;
  status: FeedbackStatus;
}

export const STATUS_STYLES: Record<FeedbackStatus, string> = {
  "Under Review": "bg-amber-100 text-amber-800 border-amber-200",
  Acknowledged: "bg-blue-100 text-blue-800 border-blue-200",
  Resolved: "bg-green-100 text-green-800 border-green-200",
};
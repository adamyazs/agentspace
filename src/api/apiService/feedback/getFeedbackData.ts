import { FEEDBACK_DATA, FeedbackEntry } from "@/const/feedbackConst";
import apiClient from "@/api/apiClient";

export const fetchFeedbackData = async (): Promise<FeedbackEntry[]> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return FEEDBACK_DATA;
    }
    try {
        const response = await apiClient.get("/api/feedback");
        return response.data as FeedbackEntry[];
    } catch (error) {
        console.error("Error fetching feedback data:", error);
        throw error;
    }
}
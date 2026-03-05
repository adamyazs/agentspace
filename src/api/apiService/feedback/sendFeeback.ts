import apiClient from "@/api/apiClient";
import { FEEDBACK_DATA, FeedbackEntry } from "@/const/feedbackConst";

export const sendFeedback = async (payload: FeedbackEntry): Promise<FeedbackEntry> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return FEEDBACK_DATA[0];
    }
    try {
        const response = await apiClient.post("/api/feedback", payload);
        return response.data as FeedbackEntry;
    } catch (error) {
        console.error("Error fetching feedback data:", error);
        throw error;
    }
}
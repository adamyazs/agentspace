import apiClient from "@/api/apiClient";
import { TOKENS_COST_DATA, TimeSeriesPoint } from "@/const/dashboard/usageCostConst";

export const fetchUsageCostData = async (): Promise<TimeSeriesPoint[]> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return TOKENS_COST_DATA;
    }
    try {
        const response = await apiClient.get("/api/usage-cost-data");
        return response.data as TimeSeriesPoint[];
    } catch (error) {
        console.error("Error fetching usage cost data:", error);
        throw error;
    }
}
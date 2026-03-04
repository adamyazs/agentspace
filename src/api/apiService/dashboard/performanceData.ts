import apiClient from "@/api/apiClient";
import { LATENCY_DATA, ERROR_THRESHOLD, LATENCY_COLORS, LATENCY_NAMES, ERROR_RATE_DATA, PerformanceAPIResponse } from "@/const/dashboard/performanceConst";

export const fetchPerformanceData = async (): Promise<PerformanceAPIResponse> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return {
            latencyData: LATENCY_DATA,
            errorRateData: ERROR_RATE_DATA,
            errorThreshold: ERROR_THRESHOLD,
            latency_name: LATENCY_NAMES,
            latency_colors: LATENCY_COLORS
        } as PerformanceAPIResponse;
    }
    try {
        const response = await apiClient.get("/api/performance-data");
        return response.data as PerformanceAPIResponse;
    } catch (error) {
        console.error("Error fetching runtime data:", error);
        throw error;
    }
}
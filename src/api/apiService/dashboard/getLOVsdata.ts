import apiClient from "@/api/apiClient";
import { ALL_AGENT_NAMES, ALL_MODEL_NAMES, ALL_RUNTIMES, ALL_TIME_RANGES, LOVsDataResponse } from "@/const/navBar";

export const fetchLOVsData = async (): Promise<LOVsDataResponse> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return {
            agentNames: ALL_AGENT_NAMES,
            modelNames: ALL_MODEL_NAMES,
            runtimes: ALL_RUNTIMES,
            timeRanges: ALL_TIME_RANGES,
            updatedTime: new Date(),
        } as LOVsDataResponse;
    }
    try {
        const response = await apiClient.get("/api/agent-data");
        return response.data as LOVsDataResponse;
    } catch (error) {
        console.error("Error fetching agent data:", error);
        throw error;
    }
}
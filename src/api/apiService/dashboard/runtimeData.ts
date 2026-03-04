import apiClient from "@/api/apiClient";
import { RUN_TIME_DATA, RuntimeDistribution } from "@/const/dashboard/runtimeDistributionConst";

export const fetchRuntimeData = async (): Promise<RuntimeDistribution[]> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return RUN_TIME_DATA;
    }
    try {
        const response = await apiClient.get("/api/runtime-data");
        return response.data as RuntimeDistribution[];
    } catch (error) {
        console.error("Error fetching runtime data:", error);
        throw error;
    }
}
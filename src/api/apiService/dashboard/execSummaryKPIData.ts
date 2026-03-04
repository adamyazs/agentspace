import apiClient from "@/api/apiClient";
import { KPI_DATA, KPIs } from "@/const/dashboard/execSummaryKPIConst";

export const fetchKPIData = async (): Promise<KPIs[]> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return KPI_DATA;
    }
    try {
        const response = await apiClient.get("/api/kpi-data");
        return response.data as KPIs[];
    } catch (error) {
        console.error("Error fetching KPI data:", error);
        throw error;
    }
}
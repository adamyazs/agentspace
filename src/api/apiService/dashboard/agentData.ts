import { AGENT_ROW_DATA, AgentRow } from "@/const/dashboard/agentInventoryDashboardConst";
import apiClient from "@/api/apiClient";

export const fetchAgentData = async (): Promise<AgentRow[]> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return AGENT_ROW_DATA;
    }
    try {
        const response = await apiClient.get("/api/agent-data");
        return response.data as AgentRow[];
    } catch (error) {
        console.error("Error fetching agent data:", error);
        throw error;
    }
}
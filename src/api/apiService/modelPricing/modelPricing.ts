import { defaultPricing, ModelPricingRow } from "@/const/modelPricingConst";
import apiClient from "@/api/apiClient";

export const fetchModelPricing = async (): Promise<ModelPricingRow[]> => {
    console.log(window.location.hostname);
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return defaultPricing;
    }
    console.log("here")
    try {
        const response = await apiClient.get("/api/model-pricing");
        return response.data as ModelPricingRow[];
    } catch (error) {
        console.error("Error fetching model pricing:", error);
        throw error;
    }
}
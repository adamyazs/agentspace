import { documentationSections, DocumentationSectionRow } from "@/const/documentationPageConst";
import apiClient from "@/api/apiClient";

export const fetchDocumentationSections = async (): Promise<DocumentationSectionRow[]> => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost")
    ) {
        return documentationSections;
    }
    try {
        const response = await apiClient.get("/api/documentation-sections");
        return response.data as DocumentationSectionRow[];
    } catch (error) {
        console.error("Error fetching documentation sections:", error);
        throw error;
    }
}
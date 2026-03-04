import { Environment, ModelName } from "@/const/navBar";

export type AgentStatus = "Healthy" | "Warning" | "Critical";

export const PAGE_SIZE = 6;
// Define columns dynamically or pass as prop if needed
export const AGENT_ROW_COLUMNS: AgentInventoryDashboardColumnData[] = [
    { title: "Agent Name", key: "agentName", type: "text", isEditable: false },
    { title: "Description", key: "description", type: "text", isEditable: true },
    { title: "Environment", key: "environment", type: "text", isEditable: false },
    { title: "Runtime", key: "runtime", type: "text", isEditable: false },
    { title: "Model", key: "modelName", type: "text", isEditable: false },
    { title: "Total Tokens", key: "totalTokens", type: "number", isEditable: false },
    { title: "Cost", key: "cost", type: "number", isEditable: false },
    { title: "Avg Latency", key: "avgLatency", type: "number", isEditable: false },
    { title: "Error Rate", key: "errorRate", type: "number", isEditable: false },
    { title: "Status", key: "status", type: "text", isEditable: false },
];

export interface AgentInventoryDashboardColumnData {
    title: string;
    key: string;
    type: "text" | "number";
    isEditable: boolean;
}

export const AGENT_ROW_DATA: AgentRow[] = [
    {
        id: "1",
        agentName: "content-synthesis-agent",
        description: "Synthesizes content from multiple sources to generate comprehensive reports.",
        environment: "Prod",
        runtime: "Agent Engine",
        modelName: "Gemini 2.5 Pro",
        totalTokens: 14200000,
        cost: 2840,
        avgLatency: 312,
        errorRate: 0.8,
        status: "Healthy"
    },
    {
        id: "2",
        agentName: "customer-support-bot",
        description: "Handles customer inquiries and provides support through chat interactions.",
        environment: "Prod",
        runtime: "GKE",
        modelName: "Gemini 2.5 Flash",
        totalTokens: 9800000,
        cost: 1176,
        avgLatency: 285,
        errorRate: 1.2,
        status: "Healthy"
    },
    {
        id: "3",
        agentName: "data-extraction-pipeline",
        description: "Extracts structured data from unstructured documents for analysis.",
        environment: "Prod",
        runtime: "Agent Engine",
        modelName: "Azure OpenAI GPT-4",
        totalTokens: 21500000,
        cost: 4300,
        avgLatency: 520,
        errorRate: 3.8,
        status: "Warning"
    },
    {
        id: "5",
        agentName: "fraud-detection-agent",
        description: "Analyzes transaction data in real-time to identify potential fraudulent activities.",
        environment: "Prod",
        runtime: "GKE",
        modelName: "Azure OpenAI GPT-5",
        totalTokens: 18900000,
        cost: 3780,
        avgLatency: 390,
        errorRate: 4.7,
        status: "Critical"
    },
    {
        id: "6",
        agentName: "invoice-processing-v2",
        description: "Processes and validates invoices using advanced NLP techniques.",
        environment: "Prod",
        runtime: "GKE",
        modelName: "Gemini 2.0 Flash",
        totalTokens: 7200000,
        cost: 864,
        avgLatency: 275,
        errorRate: 0.6,
        status: "Healthy"
    },
    {
        id: "9",
        agentName: "risk-assessment-agent",
        description: "Evaluates financial risk based on market data and historical trends.",
        environment: "Prod",
        runtime: "Agent Engine",
        modelName: "Gemini 2.5 Pro",
        totalTokens: 16700000,
        cost: 3340,
        avgLatency: 420,
        errorRate: 0.9,
        status: "Healthy"
    },
    {
        id: "10",
        agentName: "semantic-search-engine",
        description: "Provides semantic search capabilities across large document repositories.",
        environment: "Prod",
        runtime: "GKE",
        modelName: "Gemini 3.1 Flash",
        totalTokens: 8300000,
        cost: 996,
        avgLatency: 310,
        errorRate: 1.5,
        status: "Healthy"
    },
    {
        id: "12",
        agentName: "translation-pipeline",
        description: "Translates content between multiple languages while preserving context and nuance.",
        environment: "Prod",
        runtime: "GKE",
        modelName: "Azure OpenAI GPT-4",
        totalTokens: 12600000,
        cost: 2520,
        avgLatency: 365,
        errorRate: 4.9,
        status: "Critical"
    }
]

export interface AgentRow {
    id: string;
    agentName: string;
    description?: string;
    environment: Environment;
    runtime: string;
    modelName: ModelName;
    totalTokens: number;
    cost: number;
    avgLatency: number;
    errorRate: number;
    status: AgentStatus;
}

// navBar related constants and types
export const HEADER_NAV_BAR: NavBarItem[] = [
  { key: "dashboard" as const, label: "Observability", iconKey: "Activity" },
  { key: "docs" as const, label: "Documentation", iconKey: "FileText" },
  { key: "pricing" as const, label: "Model Pricing", iconKey: "DollarSign" },
]

export const USER: UserProfile = { name: "John Doe", avatarUrl: "", role: "Admin" };

interface UserProfile {
  name: string;
  avatarUrl?: string;
  role?: string;
}

interface NavBarItem {
  key: "dashboard" | "docs" | "pricing";
  label: string;
  iconKey: string;
}

// all dropdown constants
export const ALL_ENVIRONMENTS: Environment[] = ["Dev", "QA", "Prod"];

export const ALL_AGENT_NAMES: AgentName[] = ["Gemini 2.0", "Gemini 2.5", "Gemini 3.1", "Azure OpenAI"];

export const ALL_MODEL_NAMES: ModelName[] = [
  "Gemini 2.0 Lite", "Gemini 2.0 Flash", "Gemini 2.0 Pro",
  "Gemini 2.5 Lite", "Gemini 2.5 Flash", "Gemini 2.5 Pro",
  "Gemini 3.1 Lite", "Gemini 3.1 Flash", "Gemini 3.1 Pro",
  "Azure OpenAI GPT-4", "Azure OpenAI GPT-5",
];

export const ALL_RUNTIMES: Runtime[] = ["Agent Engine", "GKE"];

export const ALL_TIME_RANGES: TimeRange[] = ["1h", "24h", "1w", "1m", "Custom"];

// all types for dashboard navBar and filters

export type Environment = "Dev" | "QA" | "Prod";

export type AgentName = "Gemini 2.0" | "Gemini 2.5" | "Gemini 3.1" | "Azure OpenAI";

export type ModelName =
  | "Gemini 2.0 Lite" | "Gemini 2.0 Flash" | "Gemini 2.0 Pro"
  | "Gemini 2.5 Lite" | "Gemini 2.5 Flash" | "Gemini 2.5 Pro"
  | "Gemini 3.1 Lite" | "Gemini 3.1 Flash" | "Gemini 3.1 Pro"
  | "Azure OpenAI GPT-4" | "Azure OpenAI GPT-5";

export type Runtime = "Agent Engine" | "GKE";

export type TimeRange = "1h" | "24h" | "1w" | "1m" | "Custom";

// sub-bar related constants

export const SUB_BAR_SIDE_HEADER: string = "Agent Observability Dashboard";


// all constants and types related to header component
export type ActiveTab = "dashboard" | "docs" | "pricing";

export interface DashboardHeaderProps {
  environment: Environment;
  setEnvironment: (v: Environment) => void;
  agentName: AgentName;
  setAgentName: (v: AgentName) => void;
  selectedModels: ModelName[];
  setSelectedModels: (v: ModelName[]) => void;
  selectedRuntimes: Runtime[];
  setSelectedRuntimes: (v: Runtime[]) => void;
  timeRange: TimeRange;
  setTimeRange: (v: TimeRange) => void;
  activeTab: ActiveTab;
  setActiveTab: (v: ActiveTab) => void;
}
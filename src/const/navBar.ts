// navBar related constants and types
export const HEADER_NAV_BAR: NavBarItem[] = [
  { key: "dashboard" as const, label: "Observability", iconKey: "Activity", roleAccess: ["super_user", "user"] },
  { key: "docs" as const, label: "Documentation", iconKey: "FileText", roleAccess: ["super_user", "user"] },
  { key: "pricing" as const, label: "Model Pricing", iconKey: "DollarSign", roleAccess: ["super_user"] },
]

export const USER: UserProfile = { name: "John Doe", avatarUrl: "", role: "super_user" };

export const USER_ROLES : string[] = ["user", "super_user"] as const;

interface UserProfile {
  name: string;
  avatarUrl?: string;
  role?: string;
}

interface NavBarItem {
  key: "dashboard" | "docs" | "pricing";
  label: string;
  iconKey: string;
  roleAccess?: string[]; // Optional: specify which roles can see this tab
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

export const ALL_RUNTIMES: string[] = ["Agent Engine", "GKE"];

export const ALL_TIME_RANGES: TimeRange[] = ["3h", "24h", "1w", "1m", "Custom"];

// all types for dashboard navBar and filters

export type Environment = "Dev" | "QA" | "Prod";

export type AgentName = "Gemini 2.0" | "Gemini 2.5" | "Gemini 3.1" | "Azure OpenAI";

export type ModelName =
  | "Gemini 2.0 Lite" | "Gemini 2.0 Flash" | "Gemini 2.0 Pro"
  | "Gemini 2.5 Lite" | "Gemini 2.5 Flash" | "Gemini 2.5 Pro"
  | "Gemini 3.1 Lite" | "Gemini 3.1 Flash" | "Gemini 3.1 Pro"
  | "Azure OpenAI GPT-4" | "Azure OpenAI GPT-5";

export type TimeRange = "3h" | "24h" | "1w" | "1m" | "Custom";


export type Runtime = "Agent Engine" | "GKE";

// sub-bar related constants

export const SUB_BAR_SIDE_HEADER: string = "Agent Observability Dashboard";


// all constants and types related to header component
export type ActiveTab = "dashboard" | "docs" | "pricing";

export interface NavBarProps {
  environment: Environment;
  setEnvironment: (v: Environment) => void;
  agentName: AgentName;
  setAgentName: (v: AgentName) => void;
  selectedModels: ModelName[];
  setSelectedModels: (v: ModelName[]) => void;
  selectedRuntimes: string[];
  setSelectedRuntimes: (v: string[]) => void;
  timeRange: TimeRange;
  setTimeRange: (v: TimeRange) => void;
  activeTab: ActiveTab;
  setActiveTab: (v: ActiveTab) => void;
}
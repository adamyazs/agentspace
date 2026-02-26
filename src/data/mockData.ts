export type Environment = "Dev" | "QA" | "Prod";

export type ModelName =
  | "Gemini 2.0 Lite" | "Gemini 2.0 Flash" | "Gemini 2.0 Pro"
  | "Gemini 2.5 Lite" | "Gemini 2.5 Flash" | "Gemini 2.5 Pro"
  | "Gemini 3.1 Lite" | "Gemini 3.1 Flash" | "Gemini 3.1 Pro"
  | "Azure OpenAI GPT-4" | "Azure OpenAI GPT-5";

export type Runtime = "Agent Engine" | "GKE";
export type TimeRange = "1h" | "24h" | "1w" | "1m" | "Custom";
export type AgentStatus = "Healthy" | "Warning" | "Critical";

export const ALL_MODEL_NAMES: ModelName[] = [
  "Gemini 2.0 Lite", "Gemini 2.0 Flash", "Gemini 2.0 Pro",
  "Gemini 2.5 Lite", "Gemini 2.5 Flash", "Gemini 2.5 Pro",
  "Gemini 3.1 Lite", "Gemini 3.1 Flash", "Gemini 3.1 Pro",
  "Azure OpenAI GPT-4", "Azure OpenAI GPT-5",
];

export const ALL_RUNTIMES: Runtime[] = ["Agent Engine", "GKE"];

export interface TimeSeriesPoint {
  time: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost: number;
}

export interface LatencyPoint {
  label: string;
  modelLatency_p50: number;
  modelLatency_p95: number;
  totalLatency_p50: number;
  totalLatency_p95: number;
}

export interface ErrorRatePoint {
  time: string;
  errorRate: number;
}

export interface RuntimeDistribution {
  runtime: Runtime;
  count: number;
  percentage: number;
}

export interface AgentRow {
  id: string;
  agentName: string;
  environment: Environment;
  runtime: Runtime;
  modelName: ModelName;
  totalTokens: number;
  cost: number;
  avgLatency: number;
  errorRate: number;
  status: AgentStatus;
}

export interface KPIs {
  totalCost: number;
  totalCostTrend: number;
  totalTokens: number;
  totalTokensTrend: number;
  avgLatency: number;
  avgLatencyTrend: number;
  errorRate: number;
  errorRateTrend: number;
  llmCalls: number;
  llmCallsTrend: number;
}

// ─── SCALE FACTORS ───────────────────────────────────────────────────────────

const envScale: Record<Environment, number> = { Prod: 1.0, QA: 0.45, Dev: 0.18 };
const timeScale: Record<TimeRange, number> = { "1h": 0.06, "24h": 1.0, "1w": 6.4, "1m": 26, Custom: 1.3 };

const modelScale: Record<ModelName, number> = {
  "Gemini 2.0 Lite": 0.05, "Gemini 2.0 Flash": 0.08, "Gemini 2.0 Pro": 0.12,
  "Gemini 2.5 Lite": 0.08, "Gemini 2.5 Flash": 0.14, "Gemini 2.5 Pro": 0.18,
  "Gemini 3.1 Lite": 0.06, "Gemini 3.1 Flash": 0.10, "Gemini 3.1 Pro": 0.15,
  "Azure OpenAI GPT-4": 0.20, "Azure OpenAI GPT-5": 0.25,
};

const modelLatencyFactor: Record<ModelName, number> = {
  "Gemini 2.0 Lite": 0.55, "Gemini 2.0 Flash": 0.70, "Gemini 2.0 Pro": 1.0,
  "Gemini 2.5 Lite": 0.50, "Gemini 2.5 Flash": 0.65, "Gemini 2.5 Pro": 0.95,
  "Gemini 3.1 Lite": 0.48, "Gemini 3.1 Flash": 0.60, "Gemini 3.1 Pro": 0.90,
  "Azure OpenAI GPT-4": 1.1, "Azure OpenAI GPT-5": 0.85,
};

const timeLabels: Record<TimeRange, string[]> = {
  "1h": ["00m","05m","10m","15m","20m","25m","30m","35m","40m","45m","50m","55m","60m"],
  "24h": ["00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"],
  "1w": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  "1m": ["Week 1","Week 2","Week 3","Week 4"],
  Custom: ["Period 1","Period 2","Period 3","Period 4","Period 5","Period 6"],
};

const timeSpikeIdx: Record<TimeRange, number> = { "1h": 8, "24h": 7, "1w": 4, "1m": 2, Custom: 3 };

// ─── DATA GENERATORS ─────────────────────────────────────────────────────────

function multiModelScale(models: ModelName[]): number {
  if (models.length === 0) return 1;
  return models.reduce((sum, m) => sum + modelScale[m], 0) / 0.12; // normalize to ~1 for Pro-class
}

function getTimeSeries(env: Environment, models: ModelName[], time: TimeRange): TimeSeriesPoint[] {
  const scale = envScale[env] * multiModelScale(models) * timeScale[time];
  const labels = timeLabels[time];
  const spikeAt = timeSpikeIdx[time];
  return labels.map((t, i) => {
    const cycle = Math.sin((i / labels.length) * Math.PI) * 0.6 + 0.4;
    const spikeMult = i === spikeAt ? 1.6 : 1;
    const inp = +(3.5 * scale * cycle * spikeMult).toFixed(2);
    const out = +(inp * 0.62).toFixed(2);
    const total = +(inp + out).toFixed(2);
    const cost = +(total * 2.1).toFixed(2);
    return { time: t, inputTokens: inp, outputTokens: out, totalTokens: total, cost };
  });
}

function getErrorRate(env: Environment, models: ModelName[], time: TimeRange): ErrorRatePoint[] {
  const base = env === "Prod" ? 2.0 : env === "QA" ? 1.2 : 0.6;
  const mFactor = models.length > 0
    ? models.reduce((s, m) => s + (m.includes("GPT") ? 1.1 : m.includes("Lite") ? 0.7 : 0.95), 0) / models.length
    : 1;
  const labels = timeLabels[time];
  const spikeAt = timeSpikeIdx[time];
  return labels.map((t, i) => {
    const noise = Math.sin(i * 1.3) * 0.4 + 0.6;
    const spike = i === spikeAt ? 2.2 : 1;
    return { time: t, errorRate: +(base * mFactor * noise * spike).toFixed(2) };
  });
}

function getKPIs(env: Environment, models: ModelName[], time: TimeRange): KPIs {
  const s = envScale[env] * multiModelScale(models) * timeScale[time];
  return {
    totalCost: Math.round(127840 * s),
    totalCostTrend: env === "Prod" ? 8.4 : env === "QA" ? 4.2 : 1.8,
    totalTokens: +(142.6 * s).toFixed(1),
    totalTokensTrend: 9.5,
    avgLatency: Math.round(381 * (models.length > 0
      ? models.reduce((s, m) => s + modelLatencyFactor[m], 0) / models.length
      : 1)),
    avgLatencyTrend: time === "1w" ? -5.1 : time === "1h" ? 1.2 : -3.2,
    errorRate: +(2.1 * (env === "Dev" ? 0.4 : env === "QA" ? 0.7 : 1.0)).toFixed(1),
    errorRateTrend: env === "Prod" ? 0.4 : -0.3,
    llmCalls: Math.round(2480000 * s),
    llmCallsTrend: time === "1w" ? 22.3 : time === "1h" ? 3.1 : 15.7,
  };
}

function getRuntimeDistribution(env: Environment, runtimes: Runtime[]): RuntimeDistribution[] {
  const base: Record<Runtime, number> = { "Agent Engine": 48420, "GKE": 31150 };
  const envFactor: Record<Environment, Partial<Record<Runtime, number>>> = {
    Prod: { "Agent Engine": 1.2 },
    QA: { "GKE": 0.8 },
    Dev: { "Agent Engine": 0.4 },
  };
  const selected = runtimes.length === 0 ? ALL_RUNTIMES : runtimes;
  const raw = selected.map((r) => {
    const factor = envFactor[env]?.[r] ?? 1.0;
    return { runtime: r, count: Math.round(base[r] * factor) };
  });
  const total = raw.reduce((a, b) => a + b.count, 0);
  return raw.map((r) => ({ ...r, percentage: +(r.count / total * 100).toFixed(1) }));
}

function getLatencyData(models: ModelName[], runtimes: Runtime[]): LatencyPoint[] {
  const avgFactor = models.length > 0
    ? models.reduce((s, m) => s + modelLatencyFactor[m], 0) / models.length
    : 1;
  const selected = runtimes.length === 0 ? ALL_RUNTIMES : runtimes;
  return selected.map((r) => {
    const rFactor = r === "GKE" ? 0.92 : 1.0;
    const f = avgFactor * rFactor;
    return {
      label: r,
      modelLatency_p50: Math.round(312 * f),
      modelLatency_p95: Math.round(540 * f),
      totalLatency_p50: Math.round(481 * f),
      totalLatency_p95: Math.round(830 * f),
    };
  });
}

// ─── AGENT TABLE ─────────────────────────────────────────────────────────────

const allAgents: AgentRow[] = [
  { id: "1", agentName: "content-synthesis-agent", environment: "Prod", runtime: "Agent Engine", modelName: "Gemini 2.5 Pro", totalTokens: 14200000, cost: 2840, avgLatency: 312, errorRate: 0.8, status: "Healthy" },
  { id: "2", agentName: "customer-support-bot", environment: "Prod", runtime: "GKE", modelName: "Gemini 2.5 Flash", totalTokens: 9800000, cost: 1176, avgLatency: 285, errorRate: 1.2, status: "Healthy" },
  { id: "3", agentName: "data-extraction-pipeline", environment: "Prod", runtime: "Agent Engine", modelName: "Azure OpenAI GPT-4", totalTokens: 21500000, cost: 4300, avgLatency: 520, errorRate: 3.8, status: "Warning" },
  { id: "4", agentName: "document-classifier", environment: "QA", runtime: "Agent Engine", modelName: "Gemini 3.1 Lite", totalTokens: 5600000, cost: 336, avgLatency: 198, errorRate: 0.4, status: "Healthy" },
  { id: "5", agentName: "fraud-detection-agent", environment: "Prod", runtime: "GKE", modelName: "Azure OpenAI GPT-5", totalTokens: 18900000, cost: 3780, avgLatency: 390, errorRate: 4.7, status: "Critical" },
  { id: "6", agentName: "invoice-processing-v2", environment: "Prod", runtime: "GKE", modelName: "Gemini 2.0 Flash", totalTokens: 7200000, cost: 864, avgLatency: 275, errorRate: 0.6, status: "Healthy" },
  { id: "7", agentName: "legal-review-assistant", environment: "QA", runtime: "Agent Engine", modelName: "Gemini 3.1 Pro", totalTokens: 11400000, cost: 2280, avgLatency: 480, errorRate: 1.9, status: "Healthy" },
  { id: "8", agentName: "marketing-copy-gen", environment: "Dev", runtime: "GKE", modelName: "Gemini 2.0 Lite", totalTokens: 2100000, cost: 252, avgLatency: 560, errorRate: 2.1, status: "Warning" },
  { id: "9", agentName: "risk-assessment-agent", environment: "Prod", runtime: "Agent Engine", modelName: "Gemini 2.5 Pro", totalTokens: 16700000, cost: 3340, avgLatency: 420, errorRate: 0.9, status: "Healthy" },
  { id: "10", agentName: "semantic-search-engine", environment: "Prod", runtime: "GKE", modelName: "Gemini 3.1 Flash", totalTokens: 8300000, cost: 996, avgLatency: 310, errorRate: 1.5, status: "Healthy" },
  { id: "11", agentName: "supply-chain-optimizer", environment: "QA", runtime: "Agent Engine", modelName: "Gemini 2.5 Lite", totalTokens: 4800000, cost: 288, avgLatency: 340, errorRate: 0.3, status: "Healthy" },
  { id: "12", agentName: "translation-pipeline", environment: "Prod", runtime: "GKE", modelName: "Azure OpenAI GPT-4", totalTokens: 12600000, cost: 2520, avgLatency: 365, errorRate: 4.9, status: "Critical" },
  { id: "13", agentName: "qa-regression-bot", environment: "QA", runtime: "GKE", modelName: "Gemini 2.0 Pro", totalTokens: 3400000, cost: 408, avgLatency: 290, errorRate: 0.7, status: "Healthy" },
  { id: "14", agentName: "dev-prototype-agent", environment: "Dev", runtime: "Agent Engine", modelName: "Gemini 3.1 Lite", totalTokens: 800000, cost: 48, avgLatency: 620, errorRate: 3.1, status: "Warning" },
  { id: "15", agentName: "compliance-checker", environment: "Dev", runtime: "GKE", modelName: "Azure OpenAI GPT-5", totalTokens: 1200000, cost: 144, avgLatency: 480, errorRate: 1.4, status: "Healthy" },
];

function getAgentTable(env: Environment, models: ModelName[], runtimes: Runtime[]): AgentRow[] {
  return allAgents.filter((a) =>
    a.environment === env &&
    (models.length === 0 || models.includes(a.modelName)) &&
    (runtimes.length === 0 || runtimes.includes(a.runtime))
  );
}

// ─── EXPORTED RESOLVER ───────────────────────────────────────────────────────

export interface DashboardData {
  kpis: KPIs;
  timeSeries: TimeSeriesPoint[];
  errorRate: ErrorRatePoint[];
  latency: LatencyPoint[];
  runtimeDist: RuntimeDistribution[];
  agents: AgentRow[];
  spikeLabel: string;
}

export function getDashboardData(
  env: Environment,
  models: ModelName[],
  runtimes: Runtime[],
  time: TimeRange
): DashboardData {
  const labels = timeLabels[time];
  const spikeIdx = timeSpikeIdx[time];
  return {
    kpis: getKPIs(env, models, time),
    timeSeries: getTimeSeries(env, models, time),
    errorRate: getErrorRate(env, models, time),
    latency: getLatencyData(models, runtimes),
    runtimeDist: getRuntimeDistribution(env, runtimes),
    agents: getAgentTable(env, models, runtimes),
    spikeLabel: labels[spikeIdx] ?? labels[labels.length - 1],
  };
}

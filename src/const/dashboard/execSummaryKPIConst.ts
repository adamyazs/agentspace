export const KPI_DATA: KPIs[] = [
    { "key": "totalCost", value: "127840", title: "Total Cost", trendValue: 8.4, subtext: "vs. previous period", suffix: "$" },
    { "key": "totalTokens", value: "142.6", title: "Total Tokens", trendValue: 9.5, subtext: "input + output tokens", suffix: "M" },
    { "key": "avgLatency", value: "381", title: "Avg Latency", trendValue: -3.2, subtext: "model + overhead", suffix: "ms" },
    { "key": "errorRate", value: "2.1", title: "Error Rate", trendValue: 0.4, subtext: "across all runtimes", suffix: "%" },
    { "key": "llmCalls", value: "2.48", title: "LLM Calls", trendValue: 15.7, subtext: "total inference requests", suffix: "M" },
]


export interface KPIs {
    key: string;
    value: string;
    title: string;
    trendValue: number;
    subtext: string;
    suffix?: string;
}

export const SPIKE_LABEL = "14:00";

export const TOKENS_COST_DATA: TimeSeriesPoint[] = [
    {
        "time": "00:00",
        "inputTokens": 1.4,
        "outputTokens": 0.87,
        "totalTokens": 2.27,
        "cost": 4.77
    },
    {
        "time": "02:00",
        "inputTokens": 1.94,
        "outputTokens": 1.2,
        "totalTokens": 3.14,
        "cost": 6.59
    },
    {
        "time": "04:00",
        "inputTokens": 2.45,
        "outputTokens": 1.52,
        "totalTokens": 3.97,
        "cost": 8.34
    },
    {
        "time": "06:00",
        "inputTokens": 2.88,
        "outputTokens": 1.79,
        "totalTokens": 4.67,
        "cost": 9.81
    },
    {
        "time": "08:00",
        "inputTokens": 3.22,
        "outputTokens": 2,
        "totalTokens": 5.22,
        "cost": 10.96
    },
    {
        "time": "10:00",
        "inputTokens": 3.43,
        "outputTokens": 2.13,
        "totalTokens": 5.56,
        "cost": 11.68
    },
    {
        "time": "12:00",
        "inputTokens": 3.5,
        "outputTokens": 2.17,
        "totalTokens": 5.67,
        "cost": 11.91
    },
    {
        "time": "14:00",
        "inputTokens": 5.49,
        "outputTokens": 3.4,
        "totalTokens": 8.89,
        "cost": 18.67
    },
    {
        "time": "16:00",
        "inputTokens": 3.22,
        "outputTokens": 2,
        "totalTokens": 5.22,
        "cost": 10.96
    },
    {
        "time": "18:00",
        "inputTokens": 2.88,
        "outputTokens": 1.79,
        "totalTokens": 4.67,
        "cost": 9.81
    },
    {
        "time": "20:00",
        "inputTokens": 2.45,
        "outputTokens": 1.52,
        "totalTokens": 3.97,
        "cost": 8.34
    },
    {
        "time": "22:00",
        "inputTokens": 1.94,
        "outputTokens": 1.2,
        "totalTokens": 3.14,
        "cost": 6.59
    }
]

export const ALL_TOKEN_KEYS_WITH_LABEL = [
    { "input": { "key": "inputTokens", "label": "Input Tokens (M)" } },
    { "output": { "key": "outputTokens", "label": "Output Tokens (M)" } },
    { "total": { "key": "totalTokens", "label": "Total Tokens (M)" } }
]

export interface TimeSeriesPoint {
    time: string;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    cost: number;
}

export const TOKEN_TYPE: TokenView[] = ["input", "output", "total"];

export type TokenView = "input" | "output" | "total";


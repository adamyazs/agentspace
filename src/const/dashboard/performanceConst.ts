export type Percentile = "p50" | "p95";

export const LATENCY_DATA: LatencyPoint[] = [
    {
        "label": "Agent Engine",
        "p50": {
            "modelLatency": 312,
            "totalLatency": 481,
        },
        "p95": {
            "modelLatency": 540,
            "totalLatency": 830
        }
    },
    {
        "label": "GKE",
        "p50": {
            "modelLatency": 150,
            "totalLatency": 443,
        },
        "p95": {
            "modelLatency": 497,
            "totalLatency": 764
        }
    }
]

export const ERROR_THRESHOLD : number = 3.0;

export const LATENCY_COLORS = {
    "p50": {
        "modelLatency_chart": "#D71600",
        "totalLatency_chart": "hsl(220, 60%, 50%)",
        "modelLatency_legends": "hsl(0,68%,33%)",
        "totalLatency_legends": "hsl(220,60%,50%)",
    },
    "p95": {
        "modelLatency_chart": "#D71600",
        "totalLatency_chart": "hsl(220, 60%, 50%)",
        "modelLatency_legends": "hsl(0,68%,33%)",
        "totalLatency_legends": "hsl(220,60%,50%)",
    }

}

export const LATENCY_NAMES: { [key: string]: string } = {
    "modelLatency": "Model Latency",
    "totalLatency": "Total Latency",
}

export const ERROR_RATE_DATA: ErrorRatePoint[] = [
    {
        "time": "00:00",
        "errorRate": 1.2
    },
    {
        "time": "02:00",
        "errorRate": 1.97
    },
    {
        "time": "04:00",
        "errorRate": 1.61
    },
    {
        "time": "06:00",
        "errorRate": 0.65
    },
    {
        "time": "08:00",
        "errorRate": 0.49
    },
    {
        "time": "10:00",
        "errorRate": 1.37
    },
    {
        "time": "12:00",
        "errorRate": 2
    },
    {
        "time": "14:00",
        "errorRate": 3.2
    },
    {
        "time": "16:00",
        "errorRate": 0.54
    },
    {
        "time": "18:00",
        "errorRate": 0.59
    },
    {
        "time": "20:00",
        "errorRate": 1.54
    },
    {
        "time": "22:00",
        "errorRate": 1.99
    }
]

export interface LatencyPoint {
    label: string;
    [percentile: string]: LatencyValue | string;
}

export interface LatencyValue {
    modelLatency: number;
    totalLatency: number;
}

export interface ErrorRatePoint {
    time: string;
    errorRate: number;
}

export interface PerformanceAPIResponse {
    latencyData: LatencyPoint[];
    errorRateData: ErrorRatePoint[];
    errorThreshold: number;
    latency_name: { [key: string]: string };
    latency_colors: {
        [percentile: string]: {
            modelLatency_chart: string;
            totalLatency_chart: string;
            modelLatency_legends: string;
            totalLatency_legends: string;
        }
    }
}
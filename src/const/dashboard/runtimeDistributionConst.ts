export const RUN_TIME_DATA : RuntimeDistribution[] = [
    {
        "runtime": "Agent Engine",
        "count": 58104,
        "percentage": 65.1,
        "color": "#D71600"
    },
    {
        "runtime": "GKE",
        "count": 31150,
        "percentage": 34.9,
        "color": "hsl(220, 60%, 50%)"
    }
]


export interface RuntimeDistribution {
  runtime: string;
  count: number;
  percentage: number;
  color?: string;
}
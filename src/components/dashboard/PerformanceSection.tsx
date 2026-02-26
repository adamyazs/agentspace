import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ReferenceLine,
} from "recharts";
import type { LatencyPoint, ErrorRatePoint } from "@/data/mockData";

type Percentile = "p50" | "p95";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}ms
        </p>
      ))}
    </div>
  );
};

const ErrorTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          Error Rate: {p.value}%
        </p>
      ))}
    </div>
  );
};

const ERROR_THRESHOLD = 3.0;

export default function PerformanceSection({
  latencyData,
  errorRateData,
}: {
  latencyData: LatencyPoint[];
  errorRateData: ErrorRatePoint[];
}) {
  const [percentile, setPercentile] = useState<Percentile>("p50");

  const modelKey = `modelLatency_${percentile}` as keyof LatencyPoint;
  const totalKey = `totalLatency_${percentile}` as keyof LatencyPoint;

  const maxErrorRate = Math.max(...errorRateData.map((d) => d.errorRate));
  const isAboveThreshold = maxErrorRate > ERROR_THRESHOLD;

  return (
    <div className="flex gap-3 flex-col lg:flex-row">
      {/* Latency Breakdown */}
      <div className="bg-card border border-border rounded-sm p-5 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Latency Breakdown
          </h3>
          <div className="flex gap-1">
            {(["p50", "p95"] as Percentile[]).map((p) => (
              <button
                key={p}
                onClick={() => setPercentile(p)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-sm uppercase transition-colors ${
                  percentile === p
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-4 mb-3">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="w-3 h-0.5 bg-[hsl(0,68%,33%)] inline-block" /> Model Latency
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="w-3 h-0.5 bg-[hsl(220,60%,50%)] inline-block" /> Total Latency
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={latencyData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 90%)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(220 14% 88%)" }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={false}
              unit="ms"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={modelKey} name="Model Latency" fill="#D71600" radius={[2, 2, 0, 0]} />
            <Bar dataKey={totalKey} name="Total Latency" fill="hsl(220, 60%, 50%)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Error Rate Trend */}
      <div className="bg-card border border-border rounded-sm p-5 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Error Rate Trend
          </h3>
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
              isAboveThreshold ? "status-critical" : "status-healthy"
            }`}
          >
            {isAboveThreshold ? "⚠ Above Threshold" : "Within Threshold"}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mb-3">
          Threshold: <span className="font-semibold">{ERROR_THRESHOLD}%</span>
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={errorRateData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 90%)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(220 14% 88%)" }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={false}
              unit="%"
              domain={[0, 6]}
            />
            <Tooltip content={<ErrorTooltip />} />
            <ReferenceLine
              y={ERROR_THRESHOLD}
              stroke="hsl(38, 90%, 44%)"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `${ERROR_THRESHOLD}% threshold`,
                position: "right",
                fontSize: 10,
                fill: "hsl(38, 90%, 44%)",
              }}
            />
            <Line
              type="monotone"
              dataKey="errorRate"
              name="Error Rate"
              stroke="#D71600"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#D71600" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

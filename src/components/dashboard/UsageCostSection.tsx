import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceDot,
} from "recharts";
import type { TimeSeriesPoint } from "@/data/mockData";


type TokenView = "input" | "output" | "total";

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-sm p-5 flex-1 min-w-0">
    {title && (
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </h3>
    )}
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
          {p.unit}
        </p>
      ))}
    </div>
  );
};

export default function UsageCostSection({ data, spikeLabel }: { data: TimeSeriesPoint[]; spikeLabel?: string }) {
  const [tokenView, setTokenView] = useState<TokenView>("total");

  const tokenKey =
    tokenView === "input" ? "inputTokens" : tokenView === "output" ? "outputTokens" : "totalTokens";
  const tokenLabel =
    tokenView === "input" ? "Input Tokens (M)" : tokenView === "output" ? "Output Tokens (M)" : "Total Tokens (M)";

  // Find spike point — highest cost point, labeled in the UI
  const spikePoint = spikeLabel
    ? data.find((d) => d.time === spikeLabel) ?? data.reduce((a, b) => (a.cost > b.cost ? a : b))
    : data.reduce((a, b) => (a.cost > b.cost ? a : b));

  return (
    <div className="flex gap-3 flex-col lg:flex-row">
      {/* Token Usage */}
      <SectionCard title="">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Token Usage Over Time
          </h3>
          <div className="flex gap-1">
            {(["input", "output", "total"] as TokenView[]).map((v) => (
              <button
                key={v}
                onClick={() => setTokenView(v)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-sm capitalize transition-colors ${
                  tokenView === v
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 90%)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(220 14% 88%)" }}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={false}
              unit="M"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={tokenKey}
              name={tokenLabel}
              stroke="#D71600"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#D71600" }}
              unit="M"
            />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Cost Over Time */}
      <SectionCard title="">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Cost Over Time
          </h3>
          <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[hsl(38,90%,94%)] text-[hsl(38,90%,30%)]">
            Spike Detected {spikePoint?.time}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: -4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 90%)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(220 14% 88%)" }}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="cost"
              name="Cost ($)"
              stroke="hsl(220, 60%, 50%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(220, 60%, 50%)" }}
            />
            {spikePoint && (
              <ReferenceDot
                x={spikePoint.time}
                y={spikePoint.cost}
                r={6}
                fill="hsl(38, 90%, 44%)"
                stroke="hsl(38, 90%, 30%)"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceDot,
  TooltipProps,
} from "recharts";
import { TOKENS_COST_DATA, TOKEN_TYPE, ALL_TOKEN_KEYS_WITH_LABEL, TimeSeriesPoint, TokenView } from "@/const/dashboard/usageCostConst";
import { fetchUsageCostData } from "@/api/apiService/dashboard/usageCostData";


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

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
          {p.unit}
        </p>
      ))}
    </div>
  );
};

export default function UsageCostSection() {
  const [tokenCostData, setTokenCostData] = useState<TimeSeriesPoint[]>(TOKENS_COST_DATA);
  const [tokenView, setTokenView] = useState<TokenView>();
  const [tokenKey, setTokenKey] = useState<string>();
  const [tokenLabel, setTokenLabel] = useState<string>();
  const [spikePoint, setSpikePoint] = useState<TimeSeriesPoint | undefined>(undefined);

  const findSpikePoint = (data: TimeSeriesPoint[]) => {
    const spike = data.reduce((a, b) => (a.cost > b.cost ? a : b));
    setSpikePoint(spike);
  }

  const handleTokenViewChange = (view: TokenView) => {
    setTokenView(view);
    const findKeyLabel = ALL_TOKEN_KEYS_WITH_LABEL.find((obj) => obj[view]);
    if (!findKeyLabel) {
      console.error("No matching key-label pair found for view:", view);
      return;
    }
    const key = findKeyLabel[view].key;
    setTokenKey(key);
    const label = findKeyLabel[view].label;
    setTokenLabel(label);
  }

  useEffect(() => {
    const fetchUsageCostDataAsync = async () => {
      const data = await fetchUsageCostData();
      setTokenCostData(data);
      findSpikePoint(data);
      handleTokenViewChange(TOKEN_TYPE[0]);
    }
    fetchUsageCostDataAsync().catch(console.error);
  }, [])
  return (
    <div className="flex gap-3 flex-col lg:flex-row">
      {/* Token Usage */}
      <SectionCard title="">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Token Usage Over Time
          </h3>
          <div className="flex gap-1">
            {TOKEN_TYPE.map((v) => (
              <button
                key={v}
                onClick={() => handleTokenViewChange(v)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-sm capitalize transition-colors ${tokenView === v
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
          <LineChart data={tokenCostData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
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
          <LineChart data={tokenCostData} margin={{ top: 4, right: 8, left: -4, bottom: 0 }}>
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

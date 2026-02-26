import { TrendingUp, TrendingDown } from "lucide-react";
import type { KPIs } from "@/data/mockData";

interface KPICardProps {
  title: string;
  value: string;
  trend: number;
  subtext: string;
  suffix?: string;
}

const KPICard = ({ title, value, trend, subtext }: KPICardProps) => {
  const isPositive = trend > 0;
  const isGood = (title === "Avg Latency" || title === "Error Rate") ? !isPositive : isPositive;

  return (
    <div className="bg-card border border-border rounded-sm px-5 py-4 flex-1 min-w-[160px]">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {title}
      </p>
      <div className="flex items-end gap-2 mb-1">
        <span className="metric-value text-2xl font-bold text-foreground leading-none">{value}</span>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold mb-0.5 ${
            isGood ? "text-status-healthy" : "text-status-critical"
          }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground leading-snug">{subtext}</p>
    </div>
  );
};

export default function KPIStrip({ kpis }: { kpis: KPIs }) {
  return (
    <div className="flex gap-3 flex-wrap">
      <KPICard
        title="Total Cost"
        value={`$${(kpis.totalCost / 1000).toFixed(1)}K`}
        trend={kpis.totalCostTrend}
        subtext="vs. previous period"
      />
      <KPICard
        title="Total Tokens"
        value={`${kpis.totalTokens}M`}
        trend={kpis.totalTokensTrend}
        subtext="input + output tokens"
      />
      <KPICard
        title="Avg Latency"
        value={`${kpis.avgLatency}ms`}
        trend={kpis.avgLatencyTrend}
        subtext="model + overhead"
      />
      <KPICard
        title="Error Rate"
        value={`${kpis.errorRate}%`}
        trend={kpis.errorRateTrend}
        subtext="across all runtimes"
      />
      <KPICard
        title="LLM Calls"
        value={`${(kpis.llmCalls / 1000000).toFixed(2)}M`}
        trend={kpis.llmCallsTrend}
        subtext="total inference requests"
      />
    </div>
  );
}

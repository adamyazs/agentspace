import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { KPIs } from "@/const/dashboard/execSummaryKPIConst";
import { fetchKPIData } from "@/api/apiService/dashboard/execSummaryKPIData";

const KPICard = ({ key, title, value, trendValue, subtext }: KPIs) => {
  const isPositive = trendValue > 0;
  const isGood = (key === "avgLatency" || key === "errorRate") ? !isPositive : isPositive;

  return (
    <div className="bg-card border border-border rounded-sm px-5 py-4 flex-1 min-w-[160px]">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {title}
      </p>
      <div className="flex items-end gap-2 mb-1">
        <span className="metric-value text-2xl font-bold text-foreground leading-none">{value}</span>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold mb-0.5 ${isGood ? "text-status-healthy" : "text-status-critical"
            }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trendValue)}%
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground leading-snug">{subtext}</p>
    </div>
  );
};

export default function KPIStrip() {
  const [kpiData, setKpiData] = useState<KPIs[]>([]);

  useEffect(() => {
    const fetchKPIDataAsync = async () => {
      const data = await fetchKPIData();
      setKpiData(data as KPIs[]);
    }
    fetchKPIDataAsync().catch(console.error);
  }, []);

  return (
    <>
      <div className="flex gap-3 flex-wrap">
        {kpiData.length > 0 && kpiData.map((kpi) => (
          <KPICard
            key={kpi.key}
            title={kpi.title}
            value={`${kpi.value.toString() || "N/A"}${kpi.suffix || ""}`}
            trendValue={kpi.trendValue}
            subtext={kpi.subtext}
          />
        ))}
      </div>
    </>
  );
}

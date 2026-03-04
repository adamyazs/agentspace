import { TrendingUp, TrendingDown } from "lucide-react";
import { KPIs } from "@/const/dashboard/execSummaryKPIConst";

export const KPICard = ({ key, title, value, trendValue, subtext }: KPIs) => {
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

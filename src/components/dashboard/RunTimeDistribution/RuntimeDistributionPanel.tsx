import { useEffect, useState } from "react";
import { RuntimeDistribution } from "@/const/dashboard/runTimeDistributionConst";
import { fetchRuntimeData } from "@/api/apiService/dashboard/runtimedata";

export default function RuntimeDistributionPanel() {
  const [runtimeData, setRuntimeData] = useState<RuntimeDistribution[]>([]);
  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    const fetchRuntimeDataAsync = async () => {
      const data = await fetchRuntimeData();
      setRuntimeData(data as RuntimeDistribution[]);
      setMaxCount(Math.max(...data.map((d) => d.count)));
    }
    fetchRuntimeDataAsync().catch(console.error);
  }, []);

  return (
    <div className="bg-card border border-border rounded-sm p-5">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">
        Runtime Distribution — Execution Volume
      </h3>
      <div className="flex flex-col gap-4">
        {runtimeData.map((item) => {
          const barWidth = (item.count / maxCount) * 100;
          const color = item.color || "hsl(220, 14%, 60%)";
          return (
            <div key={item.runtime}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{item.runtime}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {item.count.toLocaleString()} calls
                  </span>
                  <span
                    className="text-xs font-bold w-12 text-right metric-value"
                    style={{ color }}
                  >
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-700"
                  style={{ width: `${barWidth}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Donut-style legend summary */}
      <div className="mt-5 pt-4 border-t border-border flex gap-3 flex-wrap">
        {runtimeData.map((item) => {
          const color = item.color || "hsl(220, 14%, 60%)";
          return (
            <div key={item.runtime} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-[11px] text-muted-foreground">{item.runtime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

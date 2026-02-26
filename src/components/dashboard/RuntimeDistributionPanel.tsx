import type { RuntimeDistribution } from "@/data/mockData";

const RUNTIME_COLORS: Record<string, string> = {
  "Agent Engine": "#D71600",
  "GKE": "hsl(220, 60%, 50%)",
  "Cloud Run": "hsl(38, 90%, 44%)",
  "Gemini Enterprise": "hsl(142, 60%, 36%)",
  "Playground": "hsl(220, 14%, 60%)",
};

export default function RuntimeDistributionPanel({
  data,
}: {
  data: RuntimeDistribution[];
}) {
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="bg-card border border-border rounded-sm p-5">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">
        Runtime Distribution — Execution Volume
      </h3>
      <div className="flex flex-col gap-4">
        {data.map((item) => {
          const barWidth = (item.count / maxCount) * 100;
          const color = RUNTIME_COLORS[item.runtime] || "hsl(220, 14%, 60%)";
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
        {data.map((item) => {
          const color = RUNTIME_COLORS[item.runtime] || "hsl(220, 14%, 60%)";
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

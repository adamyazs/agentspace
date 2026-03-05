import { useEffect, useState } from "react";
import { KPICard } from "@/components/dashboard/execSummaryKPI/KPICard";
import { KPIs } from "@/const/dashboard/execSummaryKPIConst";
import { fetchKPIData } from "@/api/apiService/dashboard/execSummaryKPIData";


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
            key={kpi.keyItem}
            keyItem={kpi.keyItem}
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

import { useMemo } from "react";
import KPIStrip from "@/components/dashboard/KPIStrip";
import UsageCostSection from "@/components/dashboard/UsageCostSection";
import PerformanceSection from "@/components/dashboard/PerformanceSection";
import RuntimeDistributionPanel from "@/components/dashboard/RunTimeDistribution/RuntimeDistributionPanel";
import AgentTable from "@/components/dashboard/AgentInventory/AgentTable";
import type { Environment, ModelName, TimeRange, ActiveTab } from "@/const/navBar";
import { getDashboardData } from "@/const/observabilityConst";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {children}
        </span>
        <div className="flex-1 h-px bg-border" />
    </div>
);

export default function DashboardMain({
    environment,
    selectedModels,
    selectedRuntimes,
    timeRange,
}: {
    environment: Environment;
    selectedModels: ModelName[];
    selectedRuntimes: string[];
    timeRange: TimeRange;
}) {
    const data = useMemo(
        () => getDashboardData(environment, selectedModels, selectedRuntimes, timeRange),
        [environment, selectedModels, selectedRuntimes, timeRange]
    );
    return (
        <main className="px-6 py-6 max-w-screen-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-bold text-foreground tracking-tight">Platform Overview</h1>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                        Environment: <span className="font-semibold text-foreground">{environment}</span>
                        {" · "}Models: <span className="font-semibold text-foreground">{selectedModels.length === 0 ? "All" : selectedModels.length}</span>
                        {" · "}Time Range: <span className="font-semibold text-foreground">{timeRange}</span>
                        {" · "}
                        <span className="text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</span>
                    </p>
                </div>
            </div>
            <section>
                <SectionLabel>Executive Summary</SectionLabel>
                <KPIStrip kpis={data.kpis} />
            </section>
            <section>
                <SectionLabel>Usage &amp; Cost</SectionLabel>
                <UsageCostSection data={data.timeSeries} spikeLabel={data.spikeLabel} />
            </section>
            <section>
                <SectionLabel>Performance</SectionLabel>
                <PerformanceSection latencyData={data.latency} errorRateData={data.errorRate} />
            </section>
            <section>
                <SectionLabel>Runtime Distribution</SectionLabel>
                <RuntimeDistributionPanel />
            </section>
            <section>
                <SectionLabel>Agent Inventory</SectionLabel>
                <AgentTable />
            </section>
        </main>
    );
}
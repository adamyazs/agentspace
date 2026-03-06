import { useEffect, useMemo } from "react";
import KPIStrip from "@/components/dashboard/execSummaryKPI/KPIStrip";
import UsageCostSection from "@/components/dashboard/usageCost/UsageCostSection";
import PerformanceSection from "@/components/dashboard/performance/PerformanceSection";
import RuntimeDistributionPanel from "@/components/dashboard/runtimeDistribution/RuntimeDistributionPanel";
import AgentTable from "@/components/dashboard/agentInventory/AgentTable";
import { Environment } from "@/const/navBar";

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
    selectedAgents,
    selectedModels,
    timeRange,
    updatedTime,
}: {
    environment: Environment;
    selectedAgents: string[];
    selectedModels: string[];
    timeRange: string;
    updatedTime: Date;
}) {
    return (
        <main className="px-6 py-6 max-w-screen-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-bold text-foreground tracking-tight">Platform Overview</h1>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                        Environment: <span className="font-semibold text-foreground">{environment}</span>
                        {" · "}Agents: <span className="font-semibold text-foreground">{selectedAgents.length === 0 ? "All" : selectedAgents.length}</span>
                        {" · "}Models: <span className="font-semibold text-foreground">{selectedModels.length === 0 ? "All" : selectedModels.length}</span>
                        {" · "}Time Range: <span className="font-semibold text-foreground">{timeRange}</span>
                        {" · "}
                        <span className="text-muted-foreground">Last updated: {updatedTime.toLocaleTimeString()}</span>
                    </p>
                </div>
            </div>
            <section>
                <SectionLabel>Executive Summary</SectionLabel>
                <KPIStrip />
            </section>
            <section>
                <SectionLabel>Usage &amp; Cost</SectionLabel>
                <UsageCostSection />
            </section>
            <section>
                <SectionLabel>Performance</SectionLabel>
                <PerformanceSection />
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
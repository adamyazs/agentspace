import { useState, useMemo } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPIStrip from "@/components/dashboard/KPIStrip";
import UsageCostSection from "@/components/dashboard/UsageCostSection";
import PerformanceSection from "@/components/dashboard/PerformanceSection";
import RuntimeDistributionPanel from "@/components/dashboard/RuntimeDistributionPanel";
import AgentTable from "@/components/dashboard/AgentTable";
import DocumentationPage from "@/components/dashboard/DocumentationPage";
import ModelPricingConfig from "@/components/dashboard/ModelPricingConfig";
import { getDashboardData } from "@/data/mockData";
import type { Environment, ModelName, Runtime, TimeRange } from "@/data/mockData";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
    <div className="flex-1 h-px bg-border" />
  </div>
);

export default function Index() {
  const [environment, setEnvironment] = useState<Environment>("Prod");
  const [selectedModels, setSelectedModels] = useState<ModelName[]>([]);
  const [selectedRuntimes, setSelectedRuntimes] = useState<Runtime[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const [activeTab, setActiveTab] = useState<"dashboard" | "docs" | "pricing">("dashboard");

  const data = useMemo(
    () => getDashboardData(environment, selectedModels, selectedRuntimes, timeRange),
    [environment, selectedModels, selectedRuntimes, timeRange]
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        environment={environment}
        setEnvironment={setEnvironment}
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
        selectedRuntimes={selectedRuntimes}
        setSelectedRuntimes={setSelectedRuntimes}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "docs" ? (
        <DocumentationPage />
      ) : activeTab === "pricing" ? (
        <ModelPricingConfig />
      ) : (
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
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-status-healthy">
                <span className="w-1.5 h-1.5 rounded-full bg-status-healthy animate-pulse" />
                All systems operational
              </span>
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
            <RuntimeDistributionPanel data={data.runtimeDist} />
          </section>

          <section>
            <SectionLabel>Agent Inventory</SectionLabel>
            <AgentTable data={data.agents} />
          </section>
        </main>
      )}
    </div>
  );
}

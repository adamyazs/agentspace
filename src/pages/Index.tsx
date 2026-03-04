import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DashboardMain from "@/components/dashboard/DashBoardMain";
import NavBar from "@/components/dashboard/NavBar";
import DocumentationPage from "@/components/docs/DocumentationPage";
import ModelPricingConfig from "@/components/pricing/ModelPricingConfig";
import type { Environment, AgentName, ModelName, TimeRange, ActiveTab } from "@/const/navBar";

export default function Index() {
  const [environment, setEnvironment] = useState<Environment>("Prod");
  const [agentName, setAgentName] = useState<AgentName>("Gemini 2.0");
  const [selectedModels, setSelectedModels] = useState<ModelName[]>([]);
  const [selectedRuntimes, setSelectedRuntimes] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const location = useLocation();
  const navigate = useNavigate();
  // Map path to tab
  const pathToTab: Record<string, ActiveTab> = {
    "/": "dashboard",
    "/docs": "docs",
    "/model-pricing": "pricing",
  };
  const tabToPath: Record<ActiveTab, string> = {
    dashboard: "/",
    docs: "/docs",
    pricing: "/model-pricing",
  };
  const [activeTab, setActiveTab] = useState<ActiveTab>(pathToTab[location.pathname] || "dashboard");

  // Sync tab with route
  useEffect(() => {
    console.log("Location changed:", location.pathname,tabToPath[activeTab]);
    const tab = pathToTab[location.pathname] || "dashboard";
    setActiveTab(tab);
  }, [location.pathname]);
  // Sync route with tab
  useEffect(() => {
    console.log("Active tab:", activeTab, "Current path:", location.pathname);
    if (tabToPath[activeTab] !== location.pathname) {
      navigate(tabToPath[activeTab], { replace: true });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar
        environment={environment}
        setEnvironment={setEnvironment}
        agentName={agentName}
        setAgentName={setAgentName}
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
        selectedRuntimes={selectedRuntimes}
        setSelectedRuntimes={setSelectedRuntimes}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Routes>
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/model-pricing" element={<ModelPricingConfig />} />
        <Route path="/" element={<DashboardMain environment={environment} selectedModels={selectedModels} selectedRuntimes={selectedRuntimes} timeRange={timeRange} />} />
      </Routes>
    </div>
  );
}
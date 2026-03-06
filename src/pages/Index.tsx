import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { RoleProtectedRoute } from "@/auth/auth";
import DashboardMain from "@/components/dashboard/DashBoardMain";
import NavBar from "@/components/dashboard/NavBar";
import DocumentationPage from "@/components/docs/DocumentationPage";
import ModelPricingConfig from "@/components/pricing/ModelPricingConfig";
import type { Environment, AgentName, ModelName, TimeRange, ActiveTab } from "@/const/navBar";

export default function Index() {
  const [environment, setEnvironment] = useState<Environment>(import.meta.env.VITE_ENVIRONMENT as Environment || "QA");
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

  const tabToAccess: Record<ActiveTab, string[]> = {
    dashboard: ["super_user", "user"],
    docs: ["super_user", "user"],
    pricing: ["super_user"],
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>(pathToTab[location.pathname] || "dashboard");

  // Sync tab with route
  useEffect(() => {
    // console.log("Location changed:", location.pathname,tabToPath[activeTab]);
    const tab = pathToTab[location.pathname] || "dashboard";
    setActiveTab(tab);
  }, [location.pathname]);
  // Sync route with tab
  useEffect(() => {
    // console.log("Active tab:", activeTab, "Current path:", location.pathname);
    if (tabToPath[activeTab] !== location.pathname) {
      navigate(tabToPath[activeTab], { replace: true });
    }
  }, [activeTab]);

  useEffect(() => {
    // get LOVs for filters if needed, currently hardcoded in consts
  }, []);

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
        <Route path="/docs" element={
          <RoleProtectedRoute allowedRoles={tabToAccess["docs"]}>
            <DocumentationPage />
          </RoleProtectedRoute>
        } />
        <Route path="/model-pricing" element={
          <RoleProtectedRoute allowedRoles={tabToAccess["pricing"]}>
            <ModelPricingConfig />
          </RoleProtectedRoute>
        } />
        <Route path="/" element={
          <RoleProtectedRoute allowedRoles={tabToAccess["dashboard"]}>
            <DashboardMain environment={environment} selectedModels={selectedModels} selectedRuntimes={selectedRuntimes} timeRange={timeRange} />
          </RoleProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
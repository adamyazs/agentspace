import { useState, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { RoleProtectedRoute } from "@/auth/auth";
import DashboardMain from "@/components/dashboard/DashBoardMain";
import NavBar from "@/components/dashboard/NavBar";
import DocumentationPage from "@/components/docs/DocumentationPage";
import ModelPricingConfig from "@/components/pricing/ModelPricingConfig";
import { Environment, ActiveTab, pathToTab, tabToAccess, tabToPath } from "@/const/navBar";
import { fetchLOVsData } from "@/api/apiService/dashboard/getLOVsdata";

export default function Index() {
  const [agentsList, setAgentsList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [runtimeList, setRuntimeList] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<string[]>();

  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedRuntimes, setSelectedRuntimes] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>();

    const [updatedTime,setUpdatedTime] = useState<Date>(new Date());

  const location = useLocation();
  const navigate = useNavigate();

  const environment = useMemo(() => import.meta.env.VITE_ENVIRONMENT as Environment || "Dev", []);


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
    const fetchLOVsDataAsync = async () => {
      const data = await fetchLOVsData();
      setAgentsList(data.agentNames);
      setModelList(data.modelNames);
      setRuntimeList(data.runtimes);
      setTimeRange(data.timeRanges);

      setUpdatedTime(data.updatedTime);

      setSelectedAgents([data.agentNames[0]]);
      setSelectedModels([data.modelNames[0]]);
      setSelectedRuntimes([data.runtimes[0]]);
      setSelectedTimeRange(data.timeRanges[0]);
    }
    fetchLOVsDataAsync().catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar
        environment={environment}
        selectedAgents={selectedAgents}
        setSelectedAgents={setSelectedAgents}
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
        selectedRuntimes={selectedRuntimes}
        setSelectedRuntimes={setSelectedRuntimes}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        agentsList={agentsList}
        modelList={modelList}
        runtimeList={runtimeList}
        timeRange={timeRange}
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
            <DashboardMain environment={environment} selectedModels={selectedModels} selectedAgents={selectedAgents} timeRange={selectedTimeRange} updatedTime={updatedTime} />
          </RoleProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
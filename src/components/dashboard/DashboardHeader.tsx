import FeedbackPanel from "@/components/dashboard/FeedbackPanel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { SelectField, MultiSelectField } from "@/components/ui/SelectField";
import { AgentName, Environment, ModelName, Runtime, TimeRange, DashboardHeaderProps } from "@/const/navBar";
import { HEADER_NAV_BAR, USER, ALL_ENVIRONMENTS, ALL_AGENT_NAMES, ALL_MODEL_NAMES, ALL_RUNTIMES, ALL_TIME_RANGES, SUB_BAR_SIDE_HEADER } from "@/const/navBar";

export default function DashboardHeader({
  environment, setEnvironment,
  agentName, setAgentName,
  selectedModels, setSelectedModels,
  selectedRuntimes, setSelectedRuntimes,
  timeRange, setTimeRange,
  activeTab, setActiveTab,
}: DashboardHeaderProps) {

  const subBarItems = [
    { label: "ENV", value: environment },
    { label: "Agent", value: agentName },
    { label: "MODEL", value: selectedModels.length === 0 ? "All" : selectedModels.length <= 2 ? selectedModels.join(", ") : `${selectedModels.length} models` },
    { label: "PLATFORM", value: selectedRuntimes.length === 0 ? "All" : selectedRuntimes.join(", ") },
    { label: "RANGE", value: timeRange },
  ]

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "#D71600" }}>
      {/* Top row: brand + nav + filters */}
      <div className="px-6 py-3 flex items-center justify-between gap-4 flex-wrap border-b border-white/10">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="font-black text-sm tracking-tight" style={{ color: "#D71600" }}>AS</span>
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-tight leading-none">AgentSpace</div>
              <div className="text-white/60 text-[11px] font-medium leading-none mt-0.5">Enterprise AI Platform</div>
            </div>
          </div>

          <div className="w-px h-8 bg-white/20 mx-1" />

          <div className="flex justify-between">
            <nav className="flex gap-1">
              {HEADER_NAV_BAR.map(({ key, label, iconKey }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-sm transition-colors flex items-center gap-1.5 ${activeTab === key
                    ? "bg-white text-[#D71600]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <DynamicIcon iconName={iconKey} size={14} />
                  {label}
                </button>
              ))}
              <FeedbackPanel
                triggerClassName="px-3 py-1.5 text-sm font-semibold rounded-sm transition-colors text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-1.5"
              />
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={USER.avatarUrl} alt="User profile" />
            <AvatarFallback>{USER.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <span className="text-white font-medium text-sm">{USER.name}</span>
        </div>
      </div>

      <div>
        {/* Right: Filters (only shown on dashboard tab) */}
        {activeTab === "dashboard" && (
          <div className="px-6 pb-3 flex items-center gap-4 flex-wrap">
            <SelectField
              label="Environment"
              value={environment}
              options={ALL_ENVIRONMENTS}
              onChange={(v) => setEnvironment(v as Environment)}
            />
            <SelectField
              label="Agent Name"
              value={agentName}
              options={ALL_AGENT_NAMES}
              onChange={(v) => setAgentName(v as AgentName)}
            />
            <MultiSelectField
              label="Model Name"
              selected={selectedModels}
              options={ALL_MODEL_NAMES}
              onChange={(v) => setSelectedModels(v as ModelName[])}
              allLabel="All Models"
            />
            <MultiSelectField
              label="Platform"
              selected={selectedRuntimes}
              options={ALL_RUNTIMES}
              onChange={(v) => setSelectedRuntimes(v as Runtime[])}
              allLabel="All Platforms"
            />
            <SelectField
              label="Time Range"
              value={timeRange}
              options={ALL_TIME_RANGES}
              onChange={(v) => setTimeRange(v as TimeRange)}
            />
          </div>
        )}
      </div>

      {/* Sub-bar: active filter context */}
      {activeTab === "dashboard" && (
        <div className="px-6 py-1.5 flex items-center gap-3" style={{ backgroundColor: "#b81300" }}>
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Viewing:</span>
          {subBarItems.map(({ label, value }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="text-[10px] text-white/40 font-semibold">{label}</span>
              <span className="text-[11px] text-white font-bold">{value}</span>
              <span className="text-white/20 text-[10px]">·</span>
            </span>
          ))}
          <span className="ml-auto text-[10px] text-white/40">
            {SUB_BAR_SIDE_HEADER}
          </span>
        </div>
      )}
    </header>
  );
}

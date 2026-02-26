import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, MessageSquare, Activity, FileText, DollarSign } from "lucide-react";
import type { Environment, ModelName, Runtime, TimeRange } from "@/data/mockData";
import FeedbackPanel from "@/components/dashboard/FeedbackPanel";
import { ALL_MODEL_NAMES, ALL_RUNTIMES } from "@/data/mockData";

interface DashboardHeaderProps {
  environment: Environment;
  setEnvironment: (v: Environment) => void;
  selectedModels: ModelName[];
  setSelectedModels: (v: ModelName[]) => void;
  selectedRuntimes: Runtime[];
  setSelectedRuntimes: (v: Runtime[]) => void;
  timeRange: TimeRange;
  setTimeRange: (v: TimeRange) => void;
  activeTab: "dashboard" | "docs" | "pricing";
  setActiveTab: (v: "dashboard" | "docs" | "pricing") => void;
}

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
      {label}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/10 border border-white/20 text-white text-sm font-medium rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-white/60 cursor-pointer min-w-[130px] hover:bg-white/15 transition-colors"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#8a0e00] text-white">
          {o}
        </option>
      ))}
    </select>
  </div>
);

const MultiSelectField = ({
  label,
  selected,
  options,
  onChange,
  allLabel = "All",
}: {
  label: string;
  selected: string[];
  options: string[];
  onChange: (v: string[]) => void;
  allLabel?: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isAll = selected.length === 0;
  const displayText = isAll ? allLabel : selected.length <= 2 ? selected.join(", ") : `${selected.length} selected`;

  const toggle = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((s) => s !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className="flex flex-col gap-0.5 relative" ref={ref}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </span>
      <button
        onClick={() => setOpen(!open)}
        className="bg-white/10 border border-white/20 text-white text-sm font-medium rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-white/60 cursor-pointer min-w-[160px] hover:bg-white/15 transition-colors flex items-center justify-between gap-2"
      >
        <span className="truncate text-left">{displayText}</span>
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#8a0e00] border border-white/20 rounded-sm shadow-lg z-50 min-w-[200px] max-h-[280px] overflow-y-auto">
          {/* All option */}
          <button
            onClick={() => { onChange([]); setOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
              isAll ? "bg-white text-[#D71600]" : "text-white hover:bg-white/15"
            }`}
          >
            {allLabel}
          </button>
          <div className="h-px bg-white/20" />
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                selected.includes(opt) ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-sm border flex-shrink-0 flex items-center justify-center text-[10px] ${
                selected.includes(opt) ? "bg-white border-white text-[#D71600]" : "border-white/40"
              }`}>
                {selected.includes(opt) && "✓"}
              </span>
              {opt}
            </button>
          ))}
          {selected.length > 0 && (
            <>
              <div className="h-px bg-white/20" />
              <button
                onClick={() => { onChange([]); }}
                className="w-full text-left px-3 py-2 text-[11px] font-semibold text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <X size={11} /> Clear selection
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default function DashboardHeader({
  environment, setEnvironment,
  selectedModels, setSelectedModels,
  selectedRuntimes, setSelectedRuntimes,
  timeRange, setTimeRange,
  activeTab, setActiveTab,
}: DashboardHeaderProps) {
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

          {/* Nav tabs */}
          <nav className="flex gap-1">
          {([
              { key: "dashboard" as const, label: "Observability", icon: Activity },
              { key: "docs" as const, label: "Documentation", icon: FileText },
              { key: "pricing" as const, label: "Model Pricing", icon: DollarSign },
            ]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-sm transition-colors flex items-center gap-1.5 ${
                  activeTab === key
                    ? "bg-white text-[#D71600]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
            <FeedbackPanel
              triggerClassName="px-3 py-1.5 text-sm font-semibold rounded-sm transition-colors text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-1.5"
            />
          </nav>
        </div>

        {/* Right: Filters (only shown on dashboard tab) */}
        {activeTab === "dashboard" && (
          <div className="flex items-center gap-4 flex-wrap">
            <SelectField
              label="Environment"
              value={environment}
              options={["Dev", "QA", "Prod"]}
              onChange={(v) => setEnvironment(v as Environment)}
            />
            <MultiSelectField
              label="Model Name"
              selected={selectedModels}
              options={[...ALL_MODEL_NAMES]}
              onChange={(v) => setSelectedModels(v as ModelName[])}
              allLabel="All Models"
            />
            <MultiSelectField
              label="Platform"
              selected={selectedRuntimes}
              options={[...ALL_RUNTIMES]}
              onChange={(v) => setSelectedRuntimes(v as Runtime[])}
              allLabel="All Platforms"
            />
            <SelectField
              label="Time Range"
              value={timeRange}
              options={["1h", "24h", "1w", "1m", "Custom"]}
              onChange={(v) => setTimeRange(v as TimeRange)}
            />
          </div>
        )}
      </div>

      {/* Sub-bar: active filter context */}
      {activeTab === "dashboard" && (
        <div className="px-6 py-1.5 flex items-center gap-3" style={{ backgroundColor: "#b81300" }}>
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Viewing:</span>
          {[
            { label: "ENV", value: environment },
            { label: "MODEL", value: selectedModels.length === 0 ? "All" : selectedModels.length <= 2 ? selectedModels.join(", ") : `${selectedModels.length} models` },
            { label: "PLATFORM", value: selectedRuntimes.length === 0 ? "All" : selectedRuntimes.join(", ") },
            { label: "RANGE", value: timeRange },
          ].map(({ label, value }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="text-[10px] text-white/40 font-semibold">{label}</span>
              <span className="text-[11px] text-white font-bold">{value}</span>
              <span className="text-white/20 text-[10px]">·</span>
            </span>
          ))}
          <span className="ml-auto text-[10px] text-white/40">
            Agent Observability Dashboard — Phase 1
          </span>
        </div>
      )}
    </header>
  );
}

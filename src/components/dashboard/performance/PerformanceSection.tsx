import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ReferenceLine, TooltipProps
} from "recharts";
import { LatencyPoint, ErrorRatePoint, LATENCY_DATA, LATENCY_COLORS, ERROR_THRESHOLD, LATENCY_NAMES } from "@/const/dashboard/performanceConst";
import { fetchPerformanceData } from "@/api/apiService/dashboard/performanceData";

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}ms
        </p>
      ))}
    </div>
  );
};

const ErrorTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          Error Rate: {p.value}%
        </p>
      ))}
    </div>
  );
};

export default function PerformanceSection() {
  // latency states
  const [latencyData, setLatencyData] = useState<LatencyPoint[]>(); // api_latency_data
  const [filterLatency, setFilterLatency] = useState<string[]>([]); // extracted percentile keys for filter buttons
  const [selectedFilterLatency, setSelectedFilterLatency] = useState<string>(); // selected percentile for display
  const [keyTypes, setKeyTypes] = useState<string[]>([]); // latency type keys for dynamic bar generation
  const [latencyGraphData, setLatencyGraphData] = useState([]); // transformed data for graph based on selected percentile

  const [errorRateData, setErrorRateData] = useState<ErrorRatePoint[]>();
  const [isAboveThreshold, setIsAboveThreshold] = useState(false);

  const PercentileData = (data: LatencyPoint[]) => {
    const keys = new Set<string>();

    data.forEach(element => {
      Object.keys(element).forEach((key) => {
        if (key !== "label") {
          keys.add(key);
        }
      });
    });

    return Array.from(keys);
  }

  const extractMetricKeys = (data) => {
    const keys = new Set<string>();
    Object.keys(data).forEach((key) => {
      keys.add(key);
    });

    return Array.from(keys);
  }

  const flattenLatencyData = (data, percentile) => {
    return data.map(item => ({
      label: item.label,
      ...item[percentile]
    }));
  }

  const onSelectedFilterLatencyChange = (data: LatencyPoint[], latencyKey: string) => {
    setSelectedFilterLatency(latencyKey);
    const newData = flattenLatencyData(data, latencyKey);
    setLatencyGraphData(newData);
  }

  useEffect(() => {
    const fetchPerformanceDataAsync = async () => {
      const data = await fetchPerformanceData();

      // latency data
      setLatencyData(data.latencyData);
      const percentileData = PercentileData(data.latencyData);
      setFilterLatency(percentileData);
      onSelectedFilterLatencyChange(data.latencyData,percentileData[0]);

      const keyList = extractMetricKeys(data.latency_name);
      setKeyTypes(keyList);

      // error rate data
      setErrorRateData(data.errorRateData);
      const maxErrorRate = Math.max(...data.errorRateData.map((d) => d.errorRate));
      const isAboveThreshold = maxErrorRate > data.errorThreshold;
      setIsAboveThreshold(isAboveThreshold);
    }
    fetchPerformanceDataAsync().catch(console.error);
  }, []);

  return (
    <div className="flex gap-3 flex-col lg:flex-row">
      {/* Latency Breakdown */}
      <div className="bg-card border border-border rounded-sm p-5 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Latency Breakdown
          </h3>
          <div className="flex gap-1">
            {filterLatency.map((p, idx) => (
              <button
                key={p}
                onClick={() => onSelectedFilterLatencyChange(latencyData, p)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-sm uppercase transition-colors ${selectedFilterLatency === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-4 mb-3">
          {LATENCY_COLORS[selectedFilterLatency] && keyTypes.length > 0 &&
            keyTypes.map((key, idx) => (
              <span key={idx} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="w-3 h-0.5 inline-block"
                  style={{
                    backgroundColor: LATENCY_COLORS[selectedFilterLatency][`${key}_legends`]
                  }}
                /> {LATENCY_NAMES[key]}
              </span>
            ))}
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={latencyGraphData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 90%)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(220 14% 88%)" }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={false}
              unit="ms"
            />
            <Tooltip content={<CustomTooltip />} />
            {keyTypes.length > 0 &&
              keyTypes.map((key) => (
                <Bar key={key} dataKey={key} name={LATENCY_NAMES[key]} fill={LATENCY_COLORS[selectedFilterLatency][`${key}_chart`]} radius={[2, 2, 0, 0]} />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Error Rate Trend */}
      <div className="bg-card border border-border rounded-sm p-5 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Error Rate Trend
          </h3>
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${isAboveThreshold ? "status-critical" : "status-healthy"
              }`}
          >
            {isAboveThreshold ? "⚠ Above Threshold" : "Within Threshold"}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mb-3">
          Threshold: <span className="font-semibold">{ERROR_THRESHOLD}%</span>
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={errorRateData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 90%)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(220 14% 88%)" }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }}
              tickLine={false}
              axisLine={false}
              unit="%"
              domain={[0, 6]}
            />
            <Tooltip content={<ErrorTooltip />} />
            <ReferenceLine
              y={ERROR_THRESHOLD}
              stroke="hsl(38, 90%, 44%)"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `${ERROR_THRESHOLD}% threshold`,
                position: "right",
                fontSize: 10,
                fill: "hsl(38, 90%, 44%)",
              }}
            />
            <Line
              type="monotone"
              dataKey="errorRate"
              name="Error Rate"
              stroke="#D71600"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#D71600" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AgentRow } from "@/data/mockData";

const PAGE_SIZE = 6;

const StatusBadge = ({ status }: { status: AgentRow["status"] }) => {
  const cls =
    status === "Healthy"
      ? "status-healthy"
      : status === "Warning"
      ? "status-warning"
      : "status-critical";
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${cls}`}>
      {status}
    </span>
  );
};

const rowClass = (status: AgentRow["status"]) =>
  status === "Healthy"
    ? "row-healthy"
    : status === "Warning"
    ? "row-warning"
    : "row-critical";

export default function AgentTable({ data }: { data: AgentRow[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paged = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-card border border-border rounded-sm">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Agent Inventory
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {data.length} agents total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {[
                "Agent Name",
                "Environment",
                "Runtime",
                "Model Name",
                "Total Tokens",
                "Cost",
                "Avg Latency",
                "Error Rate",
                "Status",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-4 py-2.5"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-muted-foreground text-sm">
                  No agents match the selected filters.
                </td>
              </tr>
            ) : paged.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-border/60 hover:brightness-[0.97] cursor-pointer transition-colors ${rowClass(row.status)}`}
              >
                <td className="px-4 py-3 font-medium text-foreground font-mono text-xs">
                  {row.agentName}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.environment}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.runtime}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground">
                    {row.modelName}
                  </span>
                </td>
                <td className="px-4 py-3 metric-value text-foreground font-semibold">
                  {(row.totalTokens / 1_000_000).toFixed(1)}M
                </td>
                <td className="px-4 py-3 metric-value text-foreground font-semibold">
                  ${row.cost.toLocaleString()}
                </td>
                <td className="px-4 py-3 metric-value text-foreground">{row.avgLatency}ms</td>
                <td className="px-4 py-3 metric-value">
                  <span
                    className={
                      row.errorRate >= 3
                        ? "text-status-critical font-semibold"
                        : row.errorRate >= 1.5
                        ? "text-status-warning font-semibold"
                        : "text-status-healthy"
                    }
                  >
                    {row.errorRate}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 flex items-center justify-between border-t border-border">
        <span className="text-[11px] text-muted-foreground">
          Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, data.length)} of {data.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1 rounded-sm border border-border hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-7 h-7 text-xs font-semibold rounded-sm transition-colors ${
                page === i + 1
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-secondary"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1 rounded-sm border border-border hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

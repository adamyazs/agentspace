import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AgentRow, AgentStatus } from "@/data/mockData";
import { AGENT_ROW_DATA, AGENT_ROW_COLUMNS } from "@/const/agentInventoryDashboardConst";
import PopupModalProps from "./PopupModal";

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
  const totalPages = Math.ceil(AGENT_ROW_DATA.length / PAGE_SIZE);
  const paged = AGENT_ROW_DATA.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    console.log(paged, data)
  }, [paged, data]);

  return (
    <div className="bg-card border border-border rounded-sm">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Agent Inventory
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {AGENT_ROW_DATA.length} agents total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {AGENT_ROW_COLUMNS.map((col) => (
                <th
                  key={col.title}
                  className="text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-4 py-2.5"
                >{col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={AGENT_ROW_COLUMNS.length} className="px-4 py-10 text-center text-muted-foreground text-sm">
                  No agents match the selected filters.
                </td>
              </tr>
            ) : paged.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-border/60 hover:brightness-[0.97] cursor-pointer transition-colors ${rowClass(row.status)}`}
              >
                {AGENT_ROW_COLUMNS.map((col) => {
                  const value = row[col.key as keyof typeof row];
                  // Render based on typex
                  switch (col.type) {
                    case "number":
                      if (col.key === "totalTokens") {
                        return (
                          <td key={col.key} className="px-4 py-3 metric-value text-foreground font-semibold">{(Number(value) / 1_000_000).toFixed(1)}M</td>
                        );
                      }
                      if (col.key === "cost") {
                        return (
                          <td key={col.key} className="px-4 py-3 metric-value text-foreground font-semibold">${Number(value).toLocaleString()}</td>
                        );
                      }
                      if (col.key === "avgLatency") {
                        return (
                          <td key={col.key} className="px-4 py-3 metric-value text-foreground">{value}ms</td>
                        );
                      }
                      if (col.key === "errorRate") {
                        return (
                          <td key={col.key} className="px-4 py-3 metric-value">
                            <span
                              className={
                                Number(value) >= 3
                                  ? "text-status-critical font-semibold"
                                  : Number(value) >= 1.5
                                    ? "text-status-warning font-semibold"
                                    : "text-status-healthy"
                              }
                            >
                              {value}%
                            </span>
                          </td>
                        );
                      }
                      // Default for numbers
                      return (
                        <td key={col.key} className="px-4 py-3 metric-value text-foreground">{value}</td>
                      );
                    case "text":
                    default:
                      if (col.key === "agentName") {
                        return (
                          <td key={col.key} className="px-4 py-3 font-medium text-foreground font-mono text-xs">{value}</td>
                        );
                      }
                      if (col.key === "description") {
                        return (
                          <td key={col.key} className="flex px-4 py-3 text-muted-foreground">
                            <PopupModalProps title={col.title} value={value as string} />
                          </td>
                        );
                      }
                      if (col.key === "modelName") {
                        return (
                          <td key={col.key} className="px-4 py-3">
                            <span className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground">{value}</span>
                          </td>
                        );
                      }
                      if (col.key === "status") {
                        return (
                          <td key={col.key} className="px-4 py-3"><StatusBadge status={(value as AgentStatus)} /></td>
                        );
                      }
                      // Default for text
                      return (
                        <td key={col.key} className="px-4 py-3 text-muted-foreground">{value}</td>
                      );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 flex items-center justify-between border-t border-border">
        <span className="text-[11px] text-muted-foreground">
          Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, AGENT_ROW_DATA.length)} of {AGENT_ROW_DATA.length}
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
              className={`w-7 h-7 text-xs font-semibold rounded-sm transition-colors ${page === i + 1
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

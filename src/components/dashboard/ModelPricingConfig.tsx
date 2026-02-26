import { useState } from "react";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";

export interface ModelPricingRow {
  id: string;
  model: string;
  version: string;
  tier: string;
  inputCostPerToken: number;
  outputCostPerToken: number;
  effectiveDate: string;
}

const defaultPricing: ModelPricingRow[] = [
  { id: "1", model: "Gemini", version: "2.0", tier: "Pro", inputCostPerToken: 0.00001, outputCostPerToken: 0.00003, effectiveDate: "2026-01-15" },
  { id: "2", model: "Gemini", version: "2.0", tier: "Flash", inputCostPerToken: 0.000005, outputCostPerToken: 0.000015, effectiveDate: "2026-01-15" },
  { id: "3", model: "Gemini", version: "2.0", tier: "Lite", inputCostPerToken: 0.000002, outputCostPerToken: 0.000006, effectiveDate: "2026-01-15" },
  { id: "4", model: "Gemini", version: "2.5", tier: "Pro", inputCostPerToken: 0.000012, outputCostPerToken: 0.000035, effectiveDate: "2026-02-01" },
  { id: "5", model: "Gemini", version: "2.5", tier: "Flash", inputCostPerToken: 0.000006, outputCostPerToken: 0.000018, effectiveDate: "2026-02-01" },
  { id: "6", model: "Gemini", version: "2.5", tier: "Lite", inputCostPerToken: 0.0000025, outputCostPerToken: 0.000007, effectiveDate: "2026-02-01" },
  { id: "7", model: "Gemini", version: "3.1", tier: "Pro", inputCostPerToken: 0.000015, outputCostPerToken: 0.00004, effectiveDate: "2026-03-01" },
  { id: "8", model: "Gemini", version: "3.1", tier: "Flash", inputCostPerToken: 0.000007, outputCostPerToken: 0.00002, effectiveDate: "2026-03-01" },
];

export default function ModelPricingConfig() {
  const [rows, setRows] = useState<ModelPricingRow[]>(defaultPricing);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<ModelPricingRow | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newRow, setNewRow] = useState<Omit<ModelPricingRow, "id">>({
    model: "", version: "", tier: "Pro", inputCostPerToken: 0, outputCostPerToken: 0, effectiveDate: "",
  });

  const startEdit = (row: ModelPricingRow) => {
    setEditingId(row.id);
    setEditRow({ ...row });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRow(null);
  };

  const saveEdit = () => {
    if (!editRow) return;
    setRows((prev) => prev.map((r) => (r.id === editRow.id ? editRow : r)));
    cancelEdit();
  };

  const deleteRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const addRow = () => {
    if (!newRow.model || !newRow.version || !newRow.effectiveDate) return;
    setRows((prev) => [...prev, { ...newRow, id: crypto.randomUUID() }]);
    setNewRow({ model: "", version: "", tier: "Pro", inputCostPerToken: 0, outputCostPerToken: 0, effectiveDate: "" });
    setAddingNew(false);
  };

  const inputClass = "bg-background border border-input text-foreground text-xs font-mono px-2 py-1.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-ring w-full";

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Model Pricing Configuration</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage cost-per-token rates for each model, version, and tier. Changes apply to all dashboard cost calculations.
          </p>
        </div>
        <button
          onClick={() => setAddingNew(true)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus size={13} />
          Add Model
        </button>
      </div>

      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["Model", "Version", "Tier", "Input Cost / Token", "Output Cost / Token", "Effective Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isEditing = editingId === row.id;
                const r = isEditing && editRow ? editRow : row;
                return (
                  <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <input className={inputClass} value={r.model} onChange={(e) => setEditRow({ ...r, model: e.target.value })} />
                      ) : (
                        <span className="font-semibold text-foreground text-xs">{r.model}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <input className={inputClass} value={r.version} onChange={(e) => setEditRow({ ...r, version: e.target.value })} />
                      ) : (
                        <span className="font-mono text-xs text-foreground">{r.version}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <select className={inputClass} value={r.tier} onChange={(e) => setEditRow({ ...r, tier: e.target.value })}>
                          {["Pro", "Flash", "Lite"].map((t) => <option key={t}>{t}</option>)}
                        </select>
                      ) : (
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                          r.tier === "Pro" ? "bg-primary/10 text-primary" :
                          r.tier === "Flash" ? "bg-[hsl(38,90%,94%)] text-[hsl(38,90%,30%)]" :
                          "bg-muted text-muted-foreground"
                        }`}>{r.tier}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <input className={inputClass} type="number" step="0.0000001" value={r.inputCostPerToken}
                          onChange={(e) => setEditRow({ ...r, inputCostPerToken: parseFloat(e.target.value) || 0 })} />
                      ) : (
                        <span className="font-mono text-xs text-foreground">${r.inputCostPerToken.toFixed(7)}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <input className={inputClass} type="number" step="0.0000001" value={r.outputCostPerToken}
                          onChange={(e) => setEditRow({ ...r, outputCostPerToken: parseFloat(e.target.value) || 0 })} />
                      ) : (
                        <span className="font-mono text-xs text-foreground">${r.outputCostPerToken.toFixed(7)}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <input className={inputClass} type="date" value={r.effectiveDate}
                          onChange={(e) => setEditRow({ ...r, effectiveDate: e.target.value })} />
                      ) : (
                        <span className="text-xs text-muted-foreground">{r.effectiveDate}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <button onClick={saveEdit} className="p-1.5 rounded-sm hover:bg-[hsl(var(--status-healthy-bg))] text-[hsl(var(--status-healthy))] transition-colors">
                            <Check size={14} />
                          </button>
                          <button onClick={cancelEdit} className="p-1.5 rounded-sm hover:bg-[hsl(var(--status-critical-bg))] text-[hsl(var(--status-critical))] transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button onClick={() => startEdit(row)} className="p-1.5 rounded-sm hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                            <Pencil size={13} />
                          </button>
                          <button onClick={() => deleteRow(row.id)} className="p-1.5 rounded-sm hover:bg-[hsl(var(--status-critical-bg))] text-muted-foreground hover:text-[hsl(var(--status-critical))] transition-colors">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {/* Add new row */}
              {addingNew && (
                <tr className="border-b border-border bg-primary/5">
                  <td className="px-4 py-2.5"><input className={inputClass} placeholder="Model" value={newRow.model} onChange={(e) => setNewRow({ ...newRow, model: e.target.value })} /></td>
                  <td className="px-4 py-2.5"><input className={inputClass} placeholder="e.g. 3.1" value={newRow.version} onChange={(e) => setNewRow({ ...newRow, version: e.target.value })} /></td>
                  <td className="px-4 py-2.5">
                    <select className={inputClass} value={newRow.tier} onChange={(e) => setNewRow({ ...newRow, tier: e.target.value })}>
                      {["Pro", "Flash", "Lite"].map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-2.5"><input className={inputClass} type="number" step="0.0000001" placeholder="0.0000100" value={newRow.inputCostPerToken || ""} onChange={(e) => setNewRow({ ...newRow, inputCostPerToken: parseFloat(e.target.value) || 0 })} /></td>
                  <td className="px-4 py-2.5"><input className={inputClass} type="number" step="0.0000001" placeholder="0.0000300" value={newRow.outputCostPerToken || ""} onChange={(e) => setNewRow({ ...newRow, outputCostPerToken: parseFloat(e.target.value) || 0 })} /></td>
                  <td className="px-4 py-2.5"><input className={inputClass} type="date" value={newRow.effectiveDate} onChange={(e) => setNewRow({ ...newRow, effectiveDate: e.target.value })} /></td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <button onClick={addRow} className="p-1.5 rounded-sm hover:bg-[hsl(var(--status-healthy-bg))] text-[hsl(var(--status-healthy))] transition-colors"><Check size={14} /></button>
                      <button onClick={() => setAddingNew(false)} className="p-1.5 rounded-sm hover:bg-[hsl(var(--status-critical-bg))] text-[hsl(var(--status-critical))] transition-colors"><X size={14} /></button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground">
        Pricing rates align with GCP billing structures. Add new rows for upcoming model versions without code changes.
      </p>
    </div>
  );
}

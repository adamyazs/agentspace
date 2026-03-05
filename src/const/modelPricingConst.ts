export const DEFAULT_PRICING: ModelPricingRow[] = [
  { id: "1", model: "Gemini 2.0 Pro", inputCostPerToken: 0.00001, outputCostPerToken: 0.00003, effectiveDate: "2026-01-15" },
  { id: "2", model: "Gemini 2.0 Flash", inputCostPerToken: 0.000005, outputCostPerToken: 0.000015, effectiveDate: "2026-01-15" },
  { id: "3", model: "Gemini 2.0 Lite", inputCostPerToken: 0.000002, outputCostPerToken: 0.000006, effectiveDate: "2026-01-15" },
  { id: "4", model: "Gemini 2.5 Pro", inputCostPerToken: 0.000012, outputCostPerToken: 0.000035, effectiveDate: "2026-02-01" },
  { id: "5", model: "Gemini 2.5 Flash", inputCostPerToken: 0.000006, outputCostPerToken: 0.000018, effectiveDate: "2026-02-01" },
  { id: "6", model: "Gemini 2.5 Lite", inputCostPerToken: 0.0000025, outputCostPerToken: 0.000007, effectiveDate: "2026-02-01" },
  { id: "7", model: "Gemini 3.1 Pro", inputCostPerToken: 0.000015, outputCostPerToken: 0.00004, effectiveDate: "2026-03-01" },
  { id: "8", model: "Gemini 3.1 Flash", inputCostPerToken: 0.000007, outputCostPerToken: 0.00002, effectiveDate: "2026-03-01" },
];

export const tableHeaders: string[] = ["Model", "Input Cost/Token", "Output Cost/Token", "Effective Date"];
// export const tableHeaders: string[] = ["Model", "Version", "Tier", "Input Cost/Token", "Output Cost/Token", "Effective Date"];

export const tiers: string[] = ["Pro", "Flash", "Lite"];

export interface ModelPricingRow {
  id: string;
  model: string;
  inputCostPerToken: number;
  outputCostPerToken: number;
  effectiveDate: string;
}

import { AlertCircle } from "lucide-react";

export default function InstrumentationNotice() {
  const attributes = [
    { key: "gen_ai.model.name", desc: "Identifies the model used per span" },
    { key: "cloud.platform", desc: "Runtime environment classification" },
    { key: "gen_ai.usage.input_tokens", desc: "Token usage for input context" },
    { key: "gen_ai.usage.output_tokens", desc: "Token usage for generated content" },
    { key: "deployment.environment", desc: "Dev / QA / Prod environment tag" },
    { key: "agent.runtime", desc: "Deployment platform identifier" },
  ];

  return (
    <div className="bg-card border border-border rounded-sm p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="mt-0.5 w-7 h-7 flex items-center justify-center rounded-sm bg-primary/10 flex-shrink-0">
          <AlertCircle size={15} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-0.5">
            Instrumentation Requirement
          </h3>
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
            Operational Standard · Platform Compliance · Rev 1.4
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-3xl">
        All agents deployed to AgentSpace production environments must implement standardized{" "}
        <strong className="text-foreground">OpenTelemetry span attributes</strong> as defined in the
        AgentSpace Observability Specification. Non-compliant agents will be flagged during platform
        onboarding review.
      </p>

      <div className="border border-border rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/60 border-b border-border">
              <th className="text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-4 py-2.5">
                Span Attribute
              </th>
              <th className="text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-4 py-2.5">
                Description
              </th>
              <th className="text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-4 py-2.5">
                Required
              </th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr, i) => (
              <tr
                key={attr.key}
                className={`border-b border-border/60 ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}
              >
                <td className="px-4 py-2.5 font-mono text-xs text-primary font-semibold">
                  {attr.key}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs">{attr.desc}</td>
                <td className="px-4 py-2.5">
                  <span className="status-healthy text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                    Mandatory
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Reference:{" "}
        <span className="font-mono text-foreground">
          agentspace.internal/docs/otel-spec-v1.4
        </span>{" "}
        · Contact the Platform Engineering team for instrumentation support.
      </p>
    </div>
  );
}

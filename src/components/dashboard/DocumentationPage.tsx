import { Terminal, Activity, CheckCircle } from "lucide-react";

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-[hsl(220,20%,10%)] text-[hsl(0,0%,97%)] text-xs font-mono p-4 rounded-sm overflow-x-auto leading-relaxed">
    {children}
  </pre>
);

export default function DocumentationPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

      {/* Step 1: Copy the OTEL file */}
      <div className="bg-card border border-border rounded-sm">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(5,100%,42%)" }}>
          <Terminal size={14} className="text-primary" />
          <h2 className="font-bold text-foreground text-sm">Step 1 — Add the Telemetry File</h2>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Copy the <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded-sm text-foreground">agentspaceOTEL.py</code> file into your agent's project directory.
          </p>
          <CodeBlock>{`# Copy the telemetry helper into your agent folder
cp /path/to/agentspaceOTEL.py ./my_agent/agentspaceOTEL.py`}</CodeBlock>
        </div>
      </div>

      {/* Step 2: Import into Hello World agent */}
      <div className="bg-card border border-border rounded-sm">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(5,100%,42%)" }}>
          <Activity size={14} className="text-primary" />
          <h2 className="font-bold text-foreground text-sm">Step 2 — Import into Your Agent</h2>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Import <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded-sm text-foreground">agentspaceOTEL</code> as a library in your Hello World agent.
          </p>
          <CodeBlock>{`from agentspace import AgentClient, AgentConfig
import agentspaceOTEL  # enables telemetry automatically
import os

client = AgentClient(api_key=os.environ["AGENTSPACE_API_KEY"])

agent = client.deploy(AgentConfig(
    name="hello-world",
    model_tier="flash",
    system_prompt="You are a helpful assistant.",
))

print(f"Live at {agent.endpoint}")`}</CodeBlock>
        </div>
      </div>

      {/* Step 3: Verify */}
      <div className="bg-card border border-border rounded-sm">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(5,100%,42%)" }}>
          <CheckCircle size={14} className="text-primary" />
          <h2 className="font-bold text-foreground text-sm">Step 3 — Verify Telemetry</h2>
        </div>
        <div className="p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            After deploying your agent, verify that spans appear in the <span className="font-semibold text-foreground">Observability</span> tab within the next hour on the dashboard.
          </p>
        </div>
      </div>

    </div>
  );
}

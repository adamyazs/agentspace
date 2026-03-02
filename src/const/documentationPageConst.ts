export const documentationSections: DocumentationSectionRow[] = [
    { step: 1, title: "Add the Telemetry File", description: "Copy the agentspaceOTEL.py file into your agent's project directory.", code: `# Copy the telemetry helper into your agent folder\n cp /path/to/agentspaceOTEL.py ./my_agent/agentspaceOTEL.py`, icon: "Terminal" },
    {
        step: 2, title: "Import into Your Agent", description: "Import agentspaceOTEL as a library in your Hello World agent.", code: `from agentspace import AgentClient, AgentConfig
import agentspaceOTEL  # enables telemetry automatically
import os

client = AgentClient(api_key=os.environ["AGENTSPACE_API_KEY"])

agent = client.deploy(AgentConfig(
    name="hello-world",
    model_tier="flash",
    system_prompt="You are a helpful assistant.",
))

print(f"Live at {agent.endpoint}")` , icon: "Activity"
    },
    { step: 3, title: "Verify Telemetry", description: "After deploying your agent, verify that spans appear in the Observability tab within the next hour on the dashboard.", icon: "CheckCircle" }
];

export interface DocumentationSectionRow {
    step: number;
    title: string;
    description: string;
    code?: string;
    icon: string;
}
import * as Icons from "lucide-react";
import { DocumentationSectionRow } from "@/const/documentationPageConst";
import { useEffect, useState } from "react";
import { fetchDocumentationSections } from "@/api/apiService/documentationPage/documentationPage";

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-[hsl(220,20%,10%)] text-[hsl(0,0%,97%)] text-xs font-mono p-4 rounded-sm overflow-x-auto leading-relaxed">
    {children}
  </pre>
);

const CodeFileName = ({ children }: { children: string }) => (
  <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded-sm text-foreground">{children}</code>
);

const Icon = ({ iconName }: { iconName: string }) => {
  const LucideIcon = Icons?.[iconName];
  if (!LucideIcon) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return null;
  }
  return <LucideIcon size={14} className="text-primary" />;
}

export default function DocumentationPage() {
  const [documentationSections, setDocumentationSections] = useState<DocumentationSectionRow[]>([]);
  useEffect(() => {

    const fetchDocumentationSectionsData = async () => {
      const data = await fetchDocumentationSections();
      setDocumentationSections(data);
    }
    fetchDocumentationSectionsData().catch(console.error);
    console.log("Documentation page loaded");
  }, [documentationSections]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

      {documentationSections.map(({ step, title, description, code, icon }) => <>
        <div className="bg-card border border-border rounded-sm">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(5,100%,42%)" }}>
            <Icon iconName={icon} />
            <h2 className="font-bold text-foreground text-sm">Step {step} — {title}</h2>
          </div>
          <div className="p-5 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            {code && code.length > 0 && <CodeBlock>{code}</CodeBlock>}
          </div>
        </div>
      </>)}
    </div>
  );
}

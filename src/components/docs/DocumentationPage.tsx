import { useEffect, useState } from "react";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { fetchDocumentationSections } from "@/api/apiService/documentationPage/documentationPage";
import { DocumentationSectionRow } from "@/const/documentationPageConst";

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-[hsl(220,20%,10%)] text-[hsl(0,0%,97%)] text-xs font-mono p-4 rounded-sm overflow-x-auto leading-relaxed">
    {children}
  </pre>
);

const CodeFileName = ({ children }: { children: string }) => (
  <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded-sm text-foreground">{children}</code>
);


export default function DocumentationPage() {
  const [documentationSections, setDocumentationSections] = useState<DocumentationSectionRow[]>([]);
  useEffect(() => {

    const fetchDocumentationSectionsData = async () => {
      const data = await fetchDocumentationSections();
      setDocumentationSections(data);
    }
    fetchDocumentationSectionsData().catch(console.error);

  }, [documentationSections]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      {documentationSections.map(({ step, title, description, code, icon }) => <>
        <div className="bg-card border border-border rounded-sm" key={step}>
          <div className="px-5 py-3 border-b border-border flex items-center gap-2" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(5,100%,42%)" }}>
            <DynamicIcon iconName={icon} className="text-primary" />
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

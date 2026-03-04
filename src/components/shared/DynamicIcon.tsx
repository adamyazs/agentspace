import * as Icons from "lucide-react";

export const DynamicIcon = ({ iconName, size = 14, className = "" }: { iconName: string; size?: number; className?: string }) => {
  const LucideIcon = Icons?.[iconName];
  if (!LucideIcon) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return null;
  }
  return <LucideIcon size={size} className={className} />;
}

import * as Icon from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const DisplayField = ({ field, header }: { field: string, header: string }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
            {header}
        </span>
        <span className="bg-white/10 border border-white/20 text-white text-sm font-medium rounded-sm px-2.5 py-1.5 min-w-[130px]">
            {field}
        </span>
    </div>
);

export const DisabledSelectField = ({
    label,
    value,
    options,
}: {
    label: string;
    value: string;
    options: string[];
}) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
            {label}
        </span>
        <select
            value={value}
            disabled
            className="bg-white/10 border border-white/20 text-white text-sm font-medium rounded-sm px-2.5 py-1.5 focus:outline-none min-w-[130px] opacity-60 cursor-not-allowed"
        >
            {options.map((o) => (
                <option key={o} value={o} className="bg-[#8a0e00] text-white">
                    {o}
                </option>
            ))}
        </select>
    </div>
);

export const SelectField = ({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
            {label}
        </span>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white/10 border border-white/20 text-white text-sm font-medium rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-white/60 cursor-pointer min-w-[130px] hover:bg-white/15 transition-colors"
        >
            {options && options.map((o) => (
                <option key={o} value={o} className="bg-[#8a0e00] text-white">
                    {o}
                </option>
            ))}
        </select>
    </div>
);

export const MultiSelectField = ({
    label,
    selected,
    options,
    onChange,
    allLabel = "values",
}: {
    label: string;
    selected: string[];
    options: string[];
    onChange: (v: string[]) => void;
    allLabel?: string
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // By default, select all if selected is empty on mount
    useEffect(() => {
        if (selected.length === 0 && options.length > 0) {
            onChange([...options]);
        }
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const isAll = selected.length === options.length;
    const displayText = isAll ? `All ${allLabel} Selected` : selected.length <= 2 ? selected.join(", ") : `${selected.length} selected`;

    const toggle = (item: string) => {
        if (selected.includes(item)) {
            // Prevent deselecting the last option
            if (selected.length === 1) return;
            onChange(selected.filter((s) => s !== item));
        } else {
            onChange([...selected, item]);
        }
    };

    const handleSelectAll = () => {
        if (isAll) {
            // Instead of clearing all, keep the first option selected
            onChange([options[0]]);
        } else {
            onChange([...options]);
        }
        setOpen(false);
    };
    

    return (
        <div className="flex flex-col gap-0.5 relative" ref={ref}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                {label}
            </span>
            <button
                onClick={() => setOpen(!open)}
                className="bg-white/10 border border-white/20 text-white text-sm font-medium rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-white/60 cursor-pointer min-w-[160px] hover:bg-white/15 transition-colors flex items-center justify-between gap-2"
            >
                <span className="truncate text-left">{displayText}</span>
                <Icon.ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 bg-[#8a0e00] border border-white/20 rounded-sm shadow-lg z-50 min-w-[200px] max-h-[280px] overflow-y-auto">
                    {/* Select/Deselect All button */}
                    <button
                        onClick={handleSelectAll}
                        className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${isAll ? "bg-white text-[#D71600]" : "text-white hover:bg-white/15"}`}
                    >
                        {isAll ? `Deselect All ${allLabel}` : `Select All ${allLabel}`}
                    </button>
                    <div className="h-px bg-white/20" />
                    {options && options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => toggle(opt)}
                            className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${selected.includes(opt) ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
                                }`}
                        >
                            <span className={`w-3.5 h-3.5 rounded-sm border flex-shrink-0 flex items-center justify-center text-[10px] ${selected.includes(opt) ? "bg-white border-white text-[#D71600]" : "border-white/40"
                                }`}>
                                {selected.includes(opt) && "✓"}
                            </span>
                            {opt}
                        </button>
                    ))}
                    {selected.length > 0 && (
                        <>
                            <div className="h-px bg-white/20" />
                            <button
                                onClick={() => { onChange([]); }}
                                className="w-full text-left px-3 py-2 text-[11px] font-semibold text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                            >
                                <Icon.X size={11} /> Clear selection
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

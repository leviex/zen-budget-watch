import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from "recharts";
import { useObzData, formatCurrency } from "@/context/ObzDataContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  onNucleoClick?: (nucleo: string | null) => void;
  selectedNucleo?: string | null;
}

export default function NucleoChart({ onNucleoClick, selectedNucleo }: Props) {
  const { sistemas } = useObzData();
  const [viewMode, setViewMode] = useState<"divisao" | "nucleo">("divisao");
  const [divisaoFilter, setDivisaoFilter] = useState<string>("all");

  const divisoes = [...new Set(sistemas.map(s => s.divisao).filter(Boolean))].sort();

  const getData = () => {
    const map = new Map<string, number>();
    const filtered = divisaoFilter !== "all" && viewMode === "nucleo"
      ? sistemas.filter(s => s.divisao === divisaoFilter)
      : sistemas;

    filtered.forEach(s => {
      const key = viewMode === "divisao" ? (s.divisao || "Outros") : (s.nucleo || "Outros");
      map.set(key, (map.get(key) || 0) + s.valorAnual);
    });

    return Array.from(map.entries())
      .map(([name, valor]) => ({
        name,
        nameShort: name.length > 18 ? name.substring(0, 16) + "…" : name,
        valor,
      }))
      .sort((a, b) => b.valor - a.valor);
  };

  const data = getData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-card-hover">
        <p className="font-semibold text-card-foreground text-sm">{d.name}</p>
        <p className="text-xs text-muted-foreground">{formatCurrency(d.valor)}</p>
      </div>
    );
  };

  const handleBarClick = (d: any) => {
    if (viewMode === "nucleo") {
      onNucleoClick?.(d.name === selectedNucleo ? null : d.name);
    } else {
      // When clicking a divisão bar, switch to nucleo view filtered by that divisão
      setDivisaoFilter(d.name);
      setViewMode("nucleo");
    }
  };

  return (
    <div data-pdf-section data-pdf-page="1" className="bg-card rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-base font-semibold text-card-foreground">
          Custo por {viewMode === "divisao" ? "Divisão" : "Núcleo"}
        </h3>
        <div className="flex items-center gap-2">
          {viewMode === "nucleo" && (
            <Select value={divisaoFilter} onValueChange={setDivisaoFilter}>
              <SelectTrigger className="w-[160px] text-xs h-8">
                <SelectValue placeholder="Divisão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas divisões</SelectItem>
                {divisoes.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <Select value={viewMode} onValueChange={(v: "divisao" | "nucleo") => { setViewMode(v); if (v === "divisao") setDivisaoFilter("all"); }}>
            <SelectTrigger className="w-[130px] text-xs h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="divisao">Por Divisão</SelectItem>
              <SelectItem value="nucleo">Por Núcleo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={Math.max(320, data.length * 32)}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="nameShort" width={120} tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="valor"
            radius={[0, 4, 4, 0]}
            barSize={20}
            cursor="pointer"
            onClick={handleBarClick}
            label={{ position: "right", fontSize: 10, fill: "hsl(215 16% 47%)", formatter: (v: number) => formatCurrency(v) }}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={selectedNucleo === entry.name ? "hsl(200 70% 45%)" : "hsl(213 50% 28%)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {(selectedNucleo || (viewMode === "nucleo" && divisaoFilter !== "all")) && (
        <p className="text-xs text-muted-foreground mt-2">
          {divisaoFilter !== "all" && <span>Divisão: <span className="font-semibold text-primary">{divisaoFilter}</span></span>}
          {selectedNucleo && <span className="ml-2">Núcleo: <span className="font-semibold text-primary">{selectedNucleo}</span></span>}
          <button className="ml-2 underline text-primary" onClick={() => { onNucleoClick?.(null); setDivisaoFilter("all"); setViewMode("divisao"); }}>Limpar filtros</button>
        </p>
      )}
    </div>
  );
}

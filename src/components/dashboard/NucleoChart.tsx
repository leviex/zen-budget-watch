import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from "recharts";
import { useObzData, formatCurrency } from "@/context/ObzDataContext";

interface Props {
  onNucleoClick?: (nucleo: string | null) => void;
  selectedNucleo?: string | null;
}

export default function NucleoChart({ onNucleoClick, selectedNucleo }: Props) {
  const { getNucleoData } = useObzData();
  const data = getNucleoData().map(d => ({
    ...d,
    nucleoShort: d.nucleo.length > 15 ? d.nucleo.substring(0, 13) + "…" : d.nucleo,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-card-hover">
        <p className="font-semibold text-card-foreground text-sm">{d.nucleo}</p>
        <p className="text-xs text-muted-foreground">{formatCurrency(d.valor)}</p>
      </div>
    );
  };

  return (
    <div data-pdf-section data-pdf-page="1" className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">Custo por Núcleo</h3>
      <ResponsiveContainer width="100%" height={Math.max(320, data.length * 32)}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="nucleoShort" width={100} tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="valor"
            radius={[0, 4, 4, 0]}
            barSize={20}
            cursor="pointer"
            onClick={(d: any) => onNucleoClick?.(d.nucleo === selectedNucleo ? null : d.nucleo)}
            label={{ position: "right", fontSize: 10, fill: "hsl(215 16% 47%)", formatter: (v: number) => formatCurrency(v) }}
          >
            {data.map((entry) => (
              <Cell
                key={entry.nucleo}
                fill={selectedNucleo === entry.nucleo ? "hsl(200 70% 45%)" : "hsl(213 50% 28%)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {selectedNucleo && (
        <p className="text-xs text-muted-foreground mt-2">
          Filtro ativo: <span className="font-semibold text-primary">{selectedNucleo}</span>
          <button className="ml-2 underline text-primary" onClick={() => onNucleoClick?.(null)}>Limpar</button>
        </p>
      )}
    </div>
  );
}

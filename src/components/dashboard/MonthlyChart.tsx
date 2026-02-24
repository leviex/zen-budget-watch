import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { getMonthlyTotals, formatCurrency } from "@/data/obzData";

interface Props {
  mesFilter?: number | null;
  classificacaoFilter?: string | null;
}

export default function MonthlyChart({ mesFilter, classificacaoFilter }: Props) {
  let data = getMonthlyTotals();
  
  // Calculate cumulative execution %
  let cumulativePrevisto = 0;
  let cumulativeRealizado = 0;
  const chartData = data.map((d) => {
    cumulativePrevisto += d.previsto;
    cumulativeRealizado += d.realizado;
    const execAcum = cumulativePrevisto > 0 ? (cumulativeRealizado / cumulativePrevisto) * 100 : 0;
    return {
      ...d,
      execAcumulada: Math.round(execAcum * 10) / 10,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-card-hover">
        <p className="font-semibold text-card-foreground text-sm mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs" style={{ color: p.color }}>
            {p.name}: {p.name === "% Exec. Acum." ? `${p.value}%` : formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">Orçado vs Realizado — Mensal</h3>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 120]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="left" dataKey="previsto" name="Previsto" fill="hsl(213 40% 50%)" radius={[4, 4, 0, 0]} barSize={28} />
          <Bar yAxisId="left" dataKey="realizado" name="Realizado" fill="hsl(200 70% 55%)" radius={[4, 4, 0, 0]} barSize={28} />
          <Line yAxisId="right" type="monotone" dataKey="execAcumulada" name="% Exec. Acum." stroke="hsl(38 92% 50%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(38 92% 50%)" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

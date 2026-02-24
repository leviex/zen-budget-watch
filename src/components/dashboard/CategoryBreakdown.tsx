import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { classificacoes, formatCurrency, totalOrcado } from "@/data/obzData";

export default function CategoryBreakdown() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-card-hover">
        <p className="font-semibold text-card-foreground text-sm">{d.nome}</p>
        <p className="text-xs text-muted-foreground">{formatCurrency(d.valor)}</p>
        <p className="text-xs text-muted-foreground">{((d.valor / totalOrcado) * 100).toFixed(1)}% do total</p>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">Despesas por Classificação</h3>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={classificacoes}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
              dataKey="valor"
              nameKey="nome"
              strokeWidth={2}
              stroke="hsl(0 0% 100%)"
            >
              {classificacoes.map((entry, i) => (
                <Cell key={i} fill={entry.cor} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 w-full lg:w-auto min-w-[200px]">
          {classificacoes.map((c) => (
            <div key={c.nome} className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: c.cor }} />
              <span className="text-card-foreground flex-1">{c.nome}</span>
              <span className="text-muted-foreground font-mono">{((c.valor / totalOrcado) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

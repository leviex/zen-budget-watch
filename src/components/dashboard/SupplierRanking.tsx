import { getTopFornecedores, formatCurrency, totalOrcado } from "@/data/obzData";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export default function SupplierRanking() {
  const data = getTopFornecedores().map(f => ({
    ...f,
    fornecedorShort: f.fornecedor.length > 18 ? f.fornecedor.substring(0, 16) + "…" : f.fornecedor,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-card-hover">
        <p className="font-semibold text-card-foreground text-sm">{d.fornecedor}</p>
        <p className="text-xs text-muted-foreground">{formatCurrency(d.valor)}</p>
        <p className="text-xs text-muted-foreground">{((d.valor / totalOrcado) * 100).toFixed(1)}% do OBZ</p>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">Ranking de Fornecedores</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="fornecedorShort" width={120} tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="valor" fill="hsl(213 50% 28%)" radius={[0, 4, 4, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

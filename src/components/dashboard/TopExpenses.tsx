import { useObzData, formatCurrency } from "@/context/ObzDataContext";

interface Props {
  classificacaoFilter?: string | null;
}

export default function TopExpenses({ classificacaoFilter }: Props) {
  const { sistemas, totalOrcado } = useObzData();
  let filtered = [...sistemas].sort((a, b) => b.valorAnual - a.valorAnual);
  if (classificacaoFilter) {
    filtered = filtered.filter(s => s.classificacao === classificacaoFilter);
  }
  const top = filtered.slice(0, 10);
  const maxVal = top[0]?.valorAnual || 1;

  return (
    <div data-pdf-section data-pdf-page="2" className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">Top 10 — Maiores Gastos</h3>
      <div className="space-y-3">
        {top.map((s, i) => {
          const pct = (s.valorAnual / totalOrcado) * 100;
          return (
            <div key={s.nome} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-card-foreground font-medium truncate max-w-[60%]">
                  <span className="text-muted-foreground mr-1.5">{i + 1}.</span>{s.nome}
                </span>
                <span className="text-muted-foreground font-mono">{formatCurrency(s.valorAnual)}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{
                  width: `${(s.valorAnual / maxVal) * 100}%`,
                  backgroundColor: pct > 10 ? "hsl(0 72% 51%)" : pct > 5 ? "hsl(38 92% 50%)" : "hsl(213 40% 50%)",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useObzData, formatCurrency } from "@/context/ObzDataContext";

export default function SavingsOpportunities() {
  const { pontosMelhoria } = useObzData();
  const totalEconomia = pontosMelhoria.reduce((sum, o) => sum + (o.valor || 0), 0);

  return (
    <div data-pdf-section data-pdf-page="3" className="bg-card rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground">💡 Contratações com Possíveis Pontos de Economia</h3>
        <span className="text-xs font-mono font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded">
          Potencial: {formatCurrency(totalEconomia)}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Solução</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Valor Anual</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Sugestão de Economia</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Justificativa</th>
            </tr>
          </thead>
          <tbody>
            {pontosMelhoria.map((o) => (
              <tr key={o.solucao} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-2.5 px-2 font-medium text-card-foreground">{o.solucao}</td>
                <td className="py-2.5 px-2 text-right font-mono text-muted-foreground">{o.valor ? formatCurrency(o.valor) : "—"}</td>
                <td className="py-2.5 px-2 text-muted-foreground max-w-xs">{o.sugestao || "—"}</td>
                <td className="py-2.5 px-2 text-muted-foreground max-w-sm text-[11px] leading-relaxed">{o.justificativa || "—"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border">
              <td className="py-2.5 px-2 font-semibold text-card-foreground">Total</td>
              <td className="py-2.5 px-2 text-right font-mono font-semibold text-destructive">{formatCurrency(totalEconomia)}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

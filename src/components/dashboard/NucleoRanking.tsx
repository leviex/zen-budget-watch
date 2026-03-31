import { useObzData, formatCurrency, formatPercent } from "@/context/ObzDataContext";

export default function NucleoRanking() {
  const { getNucleoData, totalOrcado } = useObzData();
  const data = getNucleoData();
  const maxVal = data[0]?.valor || 1;

  return (
    <div data-pdf-section data-pdf-page="2" className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">Ranking por Núcleo</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Núcleo</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Valor Total</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">% do Total</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium w-[30%]">Proporção</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              const pct = totalOrcado > 0 ? (d.valor / totalOrcado) * 100 : 0;
              return (
                <tr key={d.nucleo} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-2 px-2 font-medium text-card-foreground">{d.nucleo}</td>
                  <td className="py-2 px-2 text-right font-mono text-card-foreground">{formatCurrency(d.valor)}</td>
                  <td className="py-2 px-2 text-right font-mono text-muted-foreground">{formatPercent(pct)}</td>
                  <td className="py-2 px-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(d.valor / maxVal) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

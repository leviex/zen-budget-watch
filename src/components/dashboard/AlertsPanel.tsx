import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { sistemas, formatCurrency, formatPercent, totalOrcado, getTotalRealizado } from "@/data/obzData";

export default function AlertsPanel() {
  // Find items where realizado > previsto by > 10% in any month
  const alerts: { nome: string; tipo: string; desvio: number; mes: string }[] = [];
  const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  
  sistemas.forEach(s => {
    s.mensal.forEach((m, i) => {
      if (m.previsto > 0 && m.realizado > 0) {
        const desvio = ((m.realizado - m.previsto) / m.previsto) * 100;
        if (desvio > 10) {
          alerts.push({ nome: s.nome, tipo: s.classificacao, desvio, mes: meses[i] });
        }
      }
    });
  });

  const realizado = getTotalRealizado();
  const execPercent = (realizado / totalOrcado) * 100;
  const metaProporcional = (2 / 12) * 100;

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">Alertas e Status</h3>
      <div className="space-y-3">
        {/* Execution status */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10">
          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-card-foreground">Execução dentro do esperado</p>
            <p className="text-xs text-muted-foreground">
              {formatPercent(execPercent)} executado vs {formatPercent(metaProporcional)} proporcional (2/12 meses)
            </p>
          </div>
        </div>

        {/* % TI sobre total */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10">
          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-card-foreground">TI sobre Total: 2,58%</p>
            <p className="text-xs text-muted-foreground">Dentro da faixa saudável (até 4%)</p>
          </div>
        </div>

        {/* Alerts for deviations > 10% */}
        {alerts.length > 0 ? alerts.map((a, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-card-foreground">{a.nome}</p>
              <p className="text-xs text-muted-foreground">
                Desvio de {formatPercent(a.desvio)} em {a.mes} — {a.tipo}
              </p>
            </div>
          </div>
        )) : (
          <div className="flex items-start gap-3 p-3 rounded-lg gradient-card-highlight">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-card-foreground">Sem desvios críticos (&gt;10%)</p>
              <p className="text-xs text-muted-foreground">Todos os centros de custo dentro da margem</p>
            </div>
          </div>
        )}

        {/* Maturity alert */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-card-foreground">Maturidade Financeira: 62,5 (Inicial)</p>
            <p className="text-xs text-muted-foreground">Falta: KPI mensal, comitê trimestral, segregação CAPEX/OPEX</p>
          </div>
        </div>
      </div>
    </div>
  );
}

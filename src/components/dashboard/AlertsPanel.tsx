import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { useObzData, formatCurrency, formatPercent, meses } from "@/context/ObzDataContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Sistema } from "@/data/obzData";

interface AlertItem {
  sistema: Sistema;
  tipo: "critico" | "atencao" | "ok";
  mes: string;
  mesIndex: number;
  desvioPercent: number;
  desvioValor: number;
  motivo: string;
}

function getAlerts(sistemas: Sistema[], currentMonth: number): AlertItem[] {
  const alerts: AlertItem[] = [];

  sistemas.forEach(s => {
    for (let i = 0; i <= Math.min(currentMonth, 11); i++) {
      const p = s.mensal[i].previsto;
      const r = s.mensal[i].realizado;

      if (p > 0 && r === 0 && i <= currentMonth) {
        alerts.push({
          sistema: s,
          tipo: "critico",
          mes: meses[i],
          mesIndex: i,
          desvioPercent: -100,
          desvioValor: -p,
          motivo: "Sem realizado em mês já encerrado",
        });
      } else if (p > 0 && r > 0) {
        const desvio = ((r - p) / p) * 100;
        if (Math.abs(desvio) > 30) {
          alerts.push({
            sistema: s,
            tipo: "critico",
            mes: meses[i],
            mesIndex: i,
            desvioPercent: desvio,
            desvioValor: r - p,
            motivo: `Variação de ${formatPercent(desvio)}`,
          });
        } else if (Math.abs(desvio) > 10) {
          alerts.push({
            sistema: s,
            tipo: "atencao",
            mes: meses[i],
            mesIndex: i,
            desvioPercent: desvio,
            desvioValor: r - p,
            motivo: `Variação de ${formatPercent(desvio)}`,
          });
        }
      }
    }
  });

  // Sort: critical first, then by abs deviation desc
  alerts.sort((a, b) => {
    if (a.tipo !== b.tipo) return a.tipo === "critico" ? -1 : 1;
    return Math.abs(b.desvioPercent) - Math.abs(a.desvioPercent);
  });

  return alerts;
}

function AlertDetailModal({ alert, open, onClose }: { alert: AlertItem | null; open: boolean; onClose: () => void }) {
  if (!alert) return null;
  const s = alert.sistema;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {alert.tipo === "critico" ? <XCircle className="h-5 w-5 text-danger" /> : <AlertTriangle className="h-5 w-5 text-warning" />}
            {s.nome}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-muted-foreground">Núcleo:</span> <span className="font-medium">{s.nucleo}</span></div>
            <div><span className="text-muted-foreground">Divisão:</span> <span className="font-medium">{s.divisao}</span></div>
            <div><span className="text-muted-foreground">Classificação:</span> <span className="font-medium">{s.classificacao}</span></div>
            <div><span className="text-muted-foreground">Fornecedor:</span> <span className="font-medium">{s.fornecedor}</span></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-muted-foreground">Mês</th>
                  <th className="text-right py-2 px-2 text-muted-foreground">Previsto</th>
                  <th className="text-right py-2 px-2 text-muted-foreground">Realizado</th>
                  <th className="text-right py-2 px-2 text-muted-foreground">Variação R$</th>
                  <th className="text-right py-2 px-2 text-muted-foreground">Variação %</th>
                </tr>
              </thead>
              <tbody>
                {meses.map((m, i) => {
                  const p = s.mensal[i].previsto;
                  const r = s.mensal[i].realizado;
                  const varR = r - p;
                  const varP = p > 0 ? ((r - p) / p) * 100 : 0;
                  const isAlert = Math.abs(varP) > 10 && p > 0 && r > 0;
                  const isCritical = Math.abs(varP) > 30 || (p > 0 && r === 0 && i <= 2);
                  return (
                    <tr key={m} className={`border-b border-border/50 ${isCritical ? "bg-danger/5" : isAlert ? "bg-warning/5" : ""}`}>
                      <td className="py-1.5 px-2 font-medium">{m}</td>
                      <td className="py-1.5 px-2 text-right font-mono">{p > 0 ? formatCurrency(p) : "—"}</td>
                      <td className="py-1.5 px-2 text-right font-mono">{r > 0 ? formatCurrency(r) : "—"}</td>
                      <td className={`py-1.5 px-2 text-right font-mono ${varR > 0 ? "text-danger" : varR < 0 ? "text-success" : ""}`}>
                        {p > 0 || r > 0 ? formatCurrency(varR) : "—"}
                      </td>
                      <td className={`py-1.5 px-2 text-right font-mono ${Math.abs(varP) > 30 ? "text-danger font-bold" : Math.abs(varP) > 10 ? "text-warning" : ""}`}>
                        {p > 0 ? formatPercent(varP) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="font-medium text-card-foreground mb-1">Classificação do Alerta</p>
              <p className="text-muted-foreground">
                {alert.tipo === "critico"
                  ? `🔴 CRÍTICO — ${alert.motivo} no mês de ${alert.mes}`
                  : `🟡 ATENÇÃO — ${alert.motivo} no mês de ${alert.mes}`}
              </p>
            </div>
            {s.sugestao && (
              <div className="p-3 rounded-lg bg-primary/5">
                <p className="font-medium text-card-foreground mb-1">Sugestão de Ação</p>
                <p className="text-muted-foreground">{s.sugestao}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AlertsPanel() {
  const { sistemas, totalOrcado, getTotalRealizado } = useObzData();
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  // Current month index (0-based, use Feb=1 as current for this exercise)
  const currentMonth = 2; // Up to March (show Jan, Feb, Mar data)
  const alerts = getAlerts(sistemas, currentMonth);
  const criticalCount = alerts.filter(a => a.tipo === "critico").length;
  const warningCount = alerts.filter(a => a.tipo === "atencao").length;

  const realizado = getTotalRealizado();
  const execPercent = (realizado / totalOrcado) * 100;

  return (
    <>
      <div data-pdf-section data-pdf-page="2" className="bg-card rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-card-foreground">Alertas e Status</h3>
          <div className="flex gap-2 text-xs">
            {criticalCount > 0 && (
              <span className="bg-danger/10 text-danger px-2 py-0.5 rounded font-medium">{criticalCount} crítico{criticalCount > 1 ? "s" : ""}</span>
            )}
            {warningCount > 0 && (
              <span className="bg-warning/10 text-warning px-2 py-0.5 rounded font-medium">{warningCount} atenção</span>
            )}
          </div>
        </div>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {/* Execution status */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10">
            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-card-foreground">Execução: {formatPercent(execPercent)}</p>
              <p className="text-xs text-muted-foreground">{formatCurrency(realizado)} de {formatCurrency(totalOrcado)}</p>
            </div>
          </div>

          {alerts.length === 0 && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10">
              <Info className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-card-foreground">Sem desvios significativos</p>
                <p className="text-xs text-muted-foreground">Todos os sistemas dentro da margem esperada</p>
              </div>
            </div>
          )}

          {alerts.slice(0, 15).map((a, i) => (
            <button
              key={`${a.sistema.nome}-${a.mes}-${i}`}
              onClick={() => setSelectedAlert(a)}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                a.tipo === "critico" ? "bg-danger/10 hover:bg-danger/15" : "bg-warning/10 hover:bg-warning/15"
              }`}
            >
              {a.tipo === "critico" ? (
                <XCircle className="h-4 w-4 text-danger mt-0.5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-xs font-medium text-card-foreground truncate">{a.sistema.nome}</p>
                <p className="text-xs text-muted-foreground">{a.motivo} — {a.mes} · {a.sistema.nucleo}</p>
              </div>
            </button>
          ))}

          {alerts.length > 15 && (
            <p className="text-xs text-muted-foreground text-center py-2">
              +{alerts.length - 15} alertas adicionais
            </p>
          )}
        </div>
      </div>

      <AlertDetailModal alert={selectedAlert} open={!!selectedAlert} onClose={() => setSelectedAlert(null)} />
    </>
  );
}

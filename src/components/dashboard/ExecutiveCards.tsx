import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, BarChart3 } from "lucide-react";
import { totalOrcado, getTotalRealizado, formatCurrency, formatPercent, getTotalPrevistoAteMes } from "@/data/obzData";

interface CardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  status?: "success" | "warning" | "danger" | "neutral";
}

function StatusCard({ title, value, subtitle, icon, status = "neutral" }: CardProps) {
  const statusClasses = {
    success: "border-l-4 border-l-success",
    warning: "border-l-4 border-l-warning",
    danger: "border-l-4 border-l-danger",
    neutral: "border-l-4 border-l-primary",
  };

  const iconBg = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    neutral: "bg-primary/10 text-primary",
  };

  return (
    <div className={`bg-card rounded-lg p-5 shadow-card hover:shadow-card-hover transition-shadow ${statusClasses[status]}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`rounded-lg p-2.5 ${iconBg[status]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function ExecutiveCards() {
  const realizado = getTotalRealizado();
  const execucao = (realizado / totalOrcado) * 100;
  const saldo = totalOrcado - realizado;
  const previstoAteAgora = getTotalPrevistoAteMes(1); // Jan + Feb
  const desvio = previstoAteAgora > 0 ? ((realizado - previstoAteAgora) / previstoAteAgora) * 100 : 0;
  
  // Forecast: based on 2 months realized, project for 12
  const forecast = (realizado / 2) * 12;
  const forecastDesvio = ((forecast - totalOrcado) / totalOrcado) * 100;

  const desvioStatus = Math.abs(desvio) <= 5 ? "success" : Math.abs(desvio) <= 10 ? "warning" : "danger";
  const forecastStatus = forecastDesvio <= 0 ? "success" : forecastDesvio <= 10 ? "warning" : "danger";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatusCard
        title="Orçado Anual"
        value={formatCurrency(totalOrcado)}
        subtitle="Exercício 2026"
        icon={<DollarSign className="h-5 w-5" />}
        status="neutral"
      />
      <StatusCard
        title="Realizado"
        value={formatCurrency(realizado)}
        subtitle="Jan–Fev 2026"
        icon={<BarChart3 className="h-5 w-5" />}
        status="success"
      />
      <StatusCard
        title="% Execução"
        value={formatPercent(execucao)}
        subtitle={`Meta proporcional: ${formatPercent((2/12)*100)}`}
        icon={<Target className="h-5 w-5" />}
        status={execucao > 20 ? "warning" : "success"}
      />
      <StatusCard
        title="Saldo Disponível"
        value={formatCurrency(saldo)}
        subtitle={`${formatPercent(100 - execucao)} restante`}
        icon={<TrendingUp className="h-5 w-5" />}
        status="success"
      />
      <StatusCard
        title="Desvio Acumulado"
        value={formatPercent(desvio)}
        subtitle={desvio > 0 ? "Acima do previsto" : "Abaixo do previsto"}
        icon={desvio > 5 ? <AlertTriangle className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
        status={desvioStatus}
      />
      <StatusCard
        title="Forecast Anual"
        value={formatCurrency(forecast)}
        subtitle={`Desvio: ${formatPercent(forecastDesvio)}`}
        icon={<TrendingUp className="h-5 w-5" />}
        status={forecastStatus}
      />
    </div>
  );
}

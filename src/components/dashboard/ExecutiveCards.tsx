import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, Layers } from "lucide-react";
import { useObzData, formatCurrency, formatPercent } from "@/context/ObzDataContext";

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
        <div className={`rounded-lg p-2.5 ${iconBg[status]}`}>{icon}</div>
      </div>
    </div>
  );
}

export default function ExecutiveCards() {
  const { sistemas, totalOrcado, getTotalRealizado } = useObzData();
  const realizado = getTotalRealizado();
  const execucao = totalOrcado > 0 ? (realizado / totalOrcado) * 100 : 0;
  const numSistemas = sistemas.filter(s => s.valorAnual > 0).length;

  return (
    <div data-pdf-section data-pdf-page="1" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard title="Orçado Anual" value={formatCurrency(totalOrcado)} subtitle="Exercício 2026" icon={<DollarSign className="h-5 w-5" />} status="neutral" />
      <StatusCard title="Realizado" value={formatCurrency(realizado)} subtitle="Jan–Mar 2026" icon={<BarChart3 className="h-5 w-5" />} status="success" />
      <StatusCard title="% Execução" value={formatPercent(execucao)} subtitle={`Meta proporcional: ${formatPercent((3/12)*100)}`} icon={<Target className="h-5 w-5" />} status={execucao > 30 ? "warning" : "success"} />
      <StatusCard title="Nº de Sistemas" value={String(numSistemas)} subtitle="Contratos ativos" icon={<Layers className="h-5 w-5" />} status="neutral" />
    </div>
  );
}

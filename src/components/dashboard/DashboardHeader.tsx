import { BarChart3 } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="gradient-header rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary-foreground/10 rounded-lg p-2.5">
          <BarChart3 className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
            Dashboard OBZ — Tecnologia da Informação
          </h1>
          <p className="text-sm text-primary-foreground/70">
            SENAC RN · Orçamento Base Zero 2026 · Diretoria Regional
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ExecutiveCards from "@/components/dashboard/ExecutiveCards";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import NucleoChart from "@/components/dashboard/NucleoChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import TopExpenses from "@/components/dashboard/TopExpenses";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import SavingsOpportunities from "@/components/dashboard/SavingsOpportunities";
import MatrizConsulta from "@/components/dashboard/MatrizConsulta";

const Index = () => {
  const [mesFilter, setMesFilter] = useState<number | null>(null);
  const [classificacaoFilter, setClassificacaoFilter] = useState<string | null>(null);
  const [nucleoFilter, setNucleoFilter] = useState<string | null>(null);

  return (
    <div id="dashboard-container" className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1440px] mx-auto">
        <DashboardHeader />

        {/* Filters */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <DashboardFilters
            mesFilter={mesFilter}
            setMesFilter={setMesFilter}
            classificacaoFilter={classificacaoFilter}
            setClassificacaoFilter={setClassificacaoFilter}
          />
          <p className="text-xs text-muted-foreground">
            Atualizado em: Março 2026
          </p>
        </div>

        {/* [1] Executive Cards */}
        <div className="mb-6">
          <ExecutiveCards />
        </div>

        {/* [2] Main Chart: Orçado vs Realizado */}
        <div className="mb-6">
          <MonthlyChart mesFilter={mesFilter} classificacaoFilter={classificacaoFilter} />
        </div>

        {/* [3] Custo por Divisão/Núcleo */}
        <div className="mb-6">
          <NucleoChart onNucleoClick={setNucleoFilter} selectedNucleo={nucleoFilter} />
        </div>

        {/* [4] Alertas e Status */}
        <div className="mb-6">
          <AlertsPanel />
        </div>

        {/* [5] Top 10 + Despesas por Classificação side by side */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopExpenses classificacaoFilter={classificacaoFilter} />
          <CategoryBreakdown />
        </div>

        {/* [6] Contratações com Possíveis Pontos de Economia */}
        <div className="mb-6">
          <SavingsOpportunities />
        </div>

        {/* [7] Matriz Consulta */}
        <div className="mb-6">
          <MatrizConsulta />
        </div>

        {/* Footer */}
        <div className="text-center py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            OBZ TI — SENAC RN · Exercício 2026 · Dashboard Gerencial
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

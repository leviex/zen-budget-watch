import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ExecutiveCards from "@/components/dashboard/ExecutiveCards";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import TopExpenses from "@/components/dashboard/TopExpenses";
import SupplierRanking from "@/components/dashboard/SupplierRanking";
import MaturityIndicator from "@/components/dashboard/MaturityIndicator";
import AlertsPanel from "@/components/dashboard/AlertsPanel";

const Index = () => {
  const [mesFilter, setMesFilter] = useState<number | null>(null);
  const [classificacaoFilter, setClassificacaoFilter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
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
            Atualizado em: Fevereiro 2026
          </p>
        </div>

        {/* Executive Cards */}
        <div className="mb-6">
          <ExecutiveCards />
        </div>

        {/* Main Chart */}
        <div className="mb-6">
          <MonthlyChart mesFilter={mesFilter} classificacaoFilter={classificacaoFilter} />
        </div>

        {/* Grid: Category + Top Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CategoryBreakdown />
          <TopExpenses classificacaoFilter={classificacaoFilter} />
        </div>

        {/* Grid: Suppliers + Maturity + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <SupplierRanking />
          <MaturityIndicator />
          <AlertsPanel />
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

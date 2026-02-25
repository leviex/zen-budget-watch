import React, { createContext, useContext, useState, useCallback } from "react";
import { Sistema, sistemas as defaultSistemas, classificacoes as defaultClassificacoes, totalOrcado as defaultTotalOrcado, totalDespesasOrg, percentualTI, colaboradores, custoColabAno, maturidadeIndex as defaultMaturidade, meses, getMonthlyTotals as calcMonthlyTotals, formatCurrency, formatPercent } from "@/data/obzData";

export interface ImportLog {
  data: string;
  arquivo: string;
  linhas: number;
  modo: "substituir" | "mesclar";
}

interface ObzDataState {
  sistemas: Sistema[];
  classificacoes: { nome: string; valor: number; cor: string }[];
  totalOrcado: number;
  totalDespesasOrg: number;
  percentualTI: number;
  colaboradores: number;
  custoColabAno: number;
  maturidadeIndex: number;
  importLogs: ImportLog[];
}

interface ObzDataContextType extends ObzDataState {
  setSistemas: (s: Sistema[]) => void;
  setClassificacoes: (c: { nome: string; valor: number; cor: string }[]) => void;
  setTotalOrcado: (v: number) => void;
  setMaturidadeIndex: (v: number) => void;
  addImportLog: (log: ImportLog) => void;
  getMonthlyTotals: () => { mes: string; previsto: number; realizado: number }[];
  getTotalRealizado: () => number;
  getTotalPrevistoAteMes: (mesIndex: number) => number;
  getTopFornecedores: () => { fornecedor: string; valor: number }[];
  resetToDefaults: () => void;
}

const ObzDataContext = createContext<ObzDataContextType | null>(null);

export function useObzData() {
  const ctx = useContext(ObzDataContext);
  if (!ctx) throw new Error("useObzData must be used within ObzDataProvider");
  return ctx;
}

const classColors: Record<string, string> = {
  "Sistemas Core": "#1a3a5c",
  "Infraestrutura": "#2d5f8a",
  "Ferramentas de Apoio": "#4a90c4",
  "Marketing Digital": "#6bb5e0",
  "Segurança": "#89d0f0",
  "Inovação e IA": "#f59e0b",
  "Engenharia": "#94a3b8",
};

export function ObzDataProvider({ children }: { children: React.ReactNode }) {
  const [sistemas, setSistemas] = useState<Sistema[]>(defaultSistemas);
  const [classificacoes, setClassificacoes] = useState(defaultClassificacoes);
  const [totalOrcado, setTotalOrcado] = useState(defaultTotalOrcado);
  const [maturidadeIndex, setMaturidadeIndex] = useState(defaultMaturidade);
  const [importLogs, setImportLogs] = useState<ImportLog[]>([]);

  const addImportLog = useCallback((log: ImportLog) => {
    setImportLogs(prev => [...prev, log]);
  }, []);

  const getMonthlyTotals = useCallback(() => {
    return meses.map((m, i) => {
      let previsto = 0;
      let realizado = 0;
      sistemas.forEach(s => {
        previsto += s.mensal[i].previsto;
        realizado += s.mensal[i].realizado;
      });
      return { mes: m, previsto, realizado };
    });
  }, [sistemas]);

  const getTotalRealizado = useCallback(() => {
    return sistemas.reduce((sum, s) => sum + s.mensal.reduce((ms, m) => ms + m.realizado, 0), 0);
  }, [sistemas]);

  const getTotalPrevistoAteMes = useCallback((mesIndex: number) => {
    return sistemas.reduce((sum, s) => {
      for (let i = 0; i <= mesIndex; i++) {
        sum += s.mensal[i].previsto;
      }
      return sum;
    }, 0);
  }, [sistemas]);

  const getTopFornecedores = useCallback(() => {
    const map = new Map<string, number>();
    sistemas.forEach(s => {
      map.set(s.fornecedor, (map.get(s.fornecedor) || 0) + s.valorAnual);
    });
    return Array.from(map.entries())
      .map(([fornecedor, valor]) => ({ fornecedor, valor }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 10);
  }, [sistemas]);

  const resetToDefaults = useCallback(() => {
    setSistemas(defaultSistemas);
    setClassificacoes(defaultClassificacoes);
    setTotalOrcado(defaultTotalOrcado);
    setMaturidadeIndex(defaultMaturidade);
  }, []);

  return (
    <ObzDataContext.Provider value={{
      sistemas, setSistemas,
      classificacoes, setClassificacoes,
      totalOrcado, setTotalOrcado,
      totalDespesasOrg, percentualTI, colaboradores, custoColabAno,
      maturidadeIndex, setMaturidadeIndex,
      importLogs, addImportLog,
      getMonthlyTotals, getTotalRealizado, getTotalPrevistoAteMes, getTopFornecedores,
      resetToDefaults,
    }}>
      {children}
    </ObzDataContext.Provider>
  );
}

export { classColors, meses, formatCurrency, formatPercent };

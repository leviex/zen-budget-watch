import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Sistema, PontoMelhoria, defaultPontosMelhoria, sistemas as defaultSistemas, classificacoes as defaultClassificacoes, totalOrcado as defaultTotalOrcado, totalDespesasOrg, percentualTI, colaboradores, custoColabAno, meses, formatCurrency, formatPercent } from "@/data/obzData";

export interface ImportLog {
  data: string;
  arquivo: string;
  linhas: number;
  modo: "substituir" | "mesclar";
}

const STORAGE_KEY = "obz_dashboard_data";

interface StoredData {
  sistemas: Sistema[];
  classificacoes: { nome: string; valor: number; cor: string }[];
  totalOrcado: number;
  pontosMelhoria: PontoMelhoria[];
  importLogs: ImportLog[];
}

function loadFromStorage(): StoredData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(data: StoredData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

interface ObzDataState {
  sistemas: Sistema[];
  classificacoes: { nome: string; valor: number; cor: string }[];
  totalOrcado: number;
  totalDespesasOrg: number;
  percentualTI: number;
  colaboradores: number;
  custoColabAno: number;
  pontosMelhoria: PontoMelhoria[];
  importLogs: ImportLog[];
}

interface ObzDataContextType extends ObzDataState {
  setSistemas: (s: Sistema[]) => void;
  setClassificacoes: (c: { nome: string; valor: number; cor: string }[]) => void;
  setTotalOrcado: (v: number) => void;
  setPontosMelhoria: (p: PontoMelhoria[]) => void;
  addImportLog: (log: ImportLog) => void;
  getMonthlyTotals: () => { mes: string; previsto: number; realizado: number }[];
  getTotalRealizado: () => number;
  getTotalPrevistoAteMes: (mesIndex: number) => number;
  getTopFornecedores: () => { fornecedor: string; valor: number }[];
  getNucleoData: () => { nucleo: string; valor: number }[];
  resetToDefaults: () => void;
}

const ObzDataContext = createContext<ObzDataContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
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
  const stored = loadFromStorage();
  
  const [sistemas, setSistemasState] = useState<Sistema[]>(stored?.sistemas || defaultSistemas);
  const [classificacoes, setClassificacoesState] = useState(stored?.classificacoes || defaultClassificacoes);
  const [totalOrcado, setTotalOrcadoState] = useState(stored?.totalOrcado || defaultTotalOrcado);
  const [pontosMelhoria, setPontosMelhoriaState] = useState<PontoMelhoria[]>(stored?.pontosMelhoria || defaultPontosMelhoria);
  const [importLogs, setImportLogs] = useState<ImportLog[]>(stored?.importLogs || []);

  // Persist to localStorage whenever data changes
  useEffect(() => {
    saveToStorage({ sistemas, classificacoes, totalOrcado, pontosMelhoria, importLogs });
  }, [sistemas, classificacoes, totalOrcado, pontosMelhoria, importLogs]);

  const setSistemas = useCallback((s: Sistema[]) => setSistemasState(s), []);
  const setClassificacoes = useCallback((c: { nome: string; valor: number; cor: string }[]) => setClassificacoesState(c), []);
  const setTotalOrcado = useCallback((v: number) => setTotalOrcadoState(v), []);
  const setPontosMelhoria = useCallback((p: PontoMelhoria[]) => setPontosMelhoriaState(p), []);

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

  const getNucleoData = useCallback(() => {
    const map = new Map<string, number>();
    sistemas.forEach(s => {
      const nucleo = s.nucleo || "Outros";
      map.set(nucleo, (map.get(nucleo) || 0) + s.valorAnual);
    });
    return Array.from(map.entries())
      .map(([nucleo, valor]) => ({ nucleo, valor }))
      .sort((a, b) => b.valor - a.valor);
  }, [sistemas]);

  const resetToDefaults = useCallback(() => {
    setSistemasState(defaultSistemas);
    setClassificacoesState(defaultClassificacoes);
    setTotalOrcadoState(defaultTotalOrcado);
    setPontosMelhoriaState(defaultPontosMelhoria);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <ObzDataContext.Provider value={{
      sistemas, setSistemas,
      classificacoes, setClassificacoes,
      totalOrcado, setTotalOrcado,
      totalDespesasOrg, percentualTI, colaboradores, custoColabAno,
      pontosMelhoria, setPontosMelhoria,
      importLogs, addImportLog,
      getMonthlyTotals, getTotalRealizado, getTotalPrevistoAteMes, getTopFornecedores,
      getNucleoData,
      resetToDefaults,
    }}>
      {children}
    </ObzDataContext.Provider>
  );
}

export { classColors, meses, formatCurrency, formatPercent };

import * as XLSX from "xlsx";
import type { Sistema } from "@/data/obzData";

const REQUIRED_SHEETS = [
  "Painel Executivo",
  "Classificação Estratégica",
  "Matriz OBZ",
  "Ranking de Fornecedores",
  "IMOTi - Calculo",
];

const MESES_COLS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export interface ValidationError {
  sheet: string;
  message: string;
}

export interface ImportResult {
  valid: boolean;
  errors: ValidationError[];
  sistemas?: Sistema[];
  totalOrcado?: number;
  maturidadeIndex?: number;
  classificacoes?: { nome: string; valor: number; cor: string }[];
  rowCount?: number;
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

function findCol(headers: string[], target: string): number {
  return headers.findIndex(h => h && h.toString().trim().toLowerCase().includes(target.toLowerCase()));
}

export function validateAndParseExcel(buffer: ArrayBuffer): ImportResult {
  const errors: ValidationError[] = [];
  
  let wb: XLSX.WorkBook;
  try {
    wb = XLSX.read(buffer, { type: "array" });
  } catch {
    return { valid: false, errors: [{ sheet: "Arquivo", message: "Não foi possível ler o arquivo Excel." }] };
  }

  // Check required sheets
  for (const name of REQUIRED_SHEETS) {
    if (!wb.SheetNames.find(s => s.trim() === name)) {
      errors.push({ sheet: name, message: `Aba "${name}" não encontrada.` });
    }
  }
  if (errors.length > 0) return { valid: false, errors };

  // Validate Painel Executivo
  const painelSheet = wb.Sheets["Painel Executivo"];
  const painelData = XLSX.utils.sheet_to_json<Record<string, any>>(painelSheet, { defval: "" });
  if (painelData.length > 0) {
    const headers = Object.keys(painelData[0]);
    if (findCol(headers, "INDICADOR") === -1) errors.push({ sheet: "Painel Executivo", message: 'Coluna "INDICADOR" não encontrada.' });
    if (findCol(headers, "VALOR") === -1) errors.push({ sheet: "Painel Executivo", message: 'Coluna "VALOR" não encontrada.' });
  } else {
    errors.push({ sheet: "Painel Executivo", message: "Aba vazia." });
  }

  // Validate Classificação Estratégica
  const classSheet = wb.Sheets["Classificação Estratégica"];
  const classData = XLSX.utils.sheet_to_json<Record<string, any>>(classSheet, { defval: "" });
  if (classData.length > 0) {
    const headers = Object.keys(classData[0]);
    if (findCol(headers, "Classificacao") === -1 && findCol(headers, "Classificação") === -1) 
      errors.push({ sheet: "Classificação Estratégica", message: 'Coluna "Classificacao" não encontrada.' });
    if (findCol(headers, "Valor Anual") === -1) 
      errors.push({ sheet: "Classificação Estratégica", message: 'Coluna "Valor Anual" não encontrada.' });
  }

  // Validate Matriz OBZ
  const matrizSheet = wb.Sheets["Matriz OBZ"];
  const matrizData = XLSX.utils.sheet_to_json<Record<string, any>>(matrizSheet, { defval: "" });
  if (matrizData.length > 0) {
    const headers = Object.keys(matrizData[0]);
    const requiredCols = ["Sistema", "Valor Anual", "Classificacao", "Criticidade", "Fornecedor", "Contrato"];
    for (const col of requiredCols) {
      const altCol = col === "Classificacao" ? "Classificação" : col;
      if (findCol(headers, col) === -1 && findCol(headers, altCol) === -1) {
        errors.push({ sheet: "Matriz OBZ", message: `Coluna "${col}" não encontrada.` });
      }
    }
  } else {
    errors.push({ sheet: "Matriz OBZ", message: "Aba vazia." });
  }

  // Validate Ranking de Fornecedores
  const rankSheet = wb.Sheets["Ranking de Fornecedores"];
  const rankData = XLSX.utils.sheet_to_json<Record<string, any>>(rankSheet, { defval: "" });
  if (rankData.length > 0) {
    const headers = Object.keys(rankData[0]);
    if (findCol(headers, "FORNECEDOR") === -1) errors.push({ sheet: "Ranking de Fornecedores", message: 'Coluna "FORNECEDOR" não encontrada.' });
    if (findCol(headers, "VALOR TOTAL ANUAL") === -1 && findCol(headers, "VALOR") === -1) 
      errors.push({ sheet: "Ranking de Fornecedores", message: 'Coluna "VALOR TOTAL ANUAL" não encontrada.' });
  }

  // Validate IMOTi
  const imotiSheet = wb.Sheets["IMOTi - Calculo"];
  const imotiData = XLSX.utils.sheet_to_json<Record<string, any>>(imotiSheet, { defval: "" });
  if (imotiData.length === 0) {
    errors.push({ sheet: "IMOTi - Calculo", message: "Aba vazia." });
  }

  if (errors.length > 0) return { valid: false, errors };

  // Parse data
  try {
    const sistemas = parseMatrizOBZ(matrizData);
    const totalOrcado = sistemas.reduce((s, si) => s + si.valorAnual, 0);
    const maturidadeIndex = parseIMOTi(imotiData);
    const classificacoes = parseClassificacoes(classData);

    return {
      valid: true,
      errors: [],
      sistemas,
      totalOrcado,
      maturidadeIndex,
      classificacoes,
      rowCount: sistemas.length,
    };
  } catch (e: any) {
    return { valid: false, errors: [{ sheet: "Matriz OBZ", message: `Erro ao processar dados: ${e.message}` }] };
  }
}

function parseMatrizOBZ(data: Record<string, any>[]): Sistema[] {
  const headers = Object.keys(data[0] || {});
  
  return data.map(row => {
    const getVal = (key: string): any => {
      const k = headers.find(h => h.toLowerCase().includes(key.toLowerCase()));
      return k ? row[k] : "";
    };

    const mensal: { previsto: number; realizado: number }[] = [];
    
    for (const mes of MESES_COLS) {
      // Try to find Previsto/Realizado columns for this month
      const previstoKey = headers.find(h => {
        const hl = h.toLowerCase();
        return (hl.includes(mes.toLowerCase()) && hl.includes("prev")) || 
               hl === `${mes.toLowerCase()}_previsto` ||
               hl === `previsto_${mes.toLowerCase()}`;
      });
      const realizadoKey = headers.find(h => {
        const hl = h.toLowerCase();
        return (hl.includes(mes.toLowerCase()) && hl.includes("real")) ||
               hl === `${mes.toLowerCase()}_realizado` ||
               hl === `realizado_${mes.toLowerCase()}`;
      });
      
      mensal.push({
        previsto: previstoKey ? (Number(row[previstoKey]) || 0) : 0,
        realizado: realizadoKey ? (Number(row[realizadoKey]) || 0) : 0,
      });
    }

    return {
      nome: String(getVal("Sistema") || ""),
      valorAnual: Number(getVal("Valor Anual")) || 0,
      classificacao: String(getVal("Classifica") || ""),
      criticidade: Number(getVal("Criticidade")) || 2,
      fornecedor: String(getVal("Fornecedor") || ""),
      contrato: String(getVal("Contrato") || ""),
      sugestao: String(getVal("Substituição") || getVal("Otimização") || getVal("Sugestão") || ""),
      mensal,
    };
  }).filter(s => s.nome.trim() !== "");
}

function parseClassificacoes(data: Record<string, any>[]): { nome: string; valor: number; cor: string }[] {
  const headers = Object.keys(data[0] || {});
  return data.map(row => {
    const classKey = headers.find(h => h.toLowerCase().includes("classifica")) || "";
    const valorKey = headers.find(h => h.toLowerCase().includes("valor")) || "";
    const nome = String(row[classKey] || "");
    return {
      nome,
      valor: Number(row[valorKey]) || 0,
      cor: classColors[nome] || "#94a3b8",
    };
  }).filter(c => c.nome.trim() !== "");
}

function parseIMOTi(data: Record<string, any>[]): number {
  // Try to find computed IMOTi value
  for (const row of data) {
    for (const val of Object.values(row)) {
      if (typeof val === "string" && val.toLowerCase().includes("imoti")) {
        // Look for numeric value in same row
        for (const v of Object.values(row)) {
          const n = Number(v);
          if (!isNaN(n) && n > 0 && n <= 100) return n;
        }
      }
    }
  }
  // Fallback: try to compute from weighted values
  let totalWeighted = 0;
  let totalWeight = 0;
  for (const row of data) {
    const vals = Object.values(row).map(v => Number(v)).filter(v => !isNaN(v) && v > 0);
    if (vals.length >= 2) {
      // Assume last is weight or score
      totalWeighted += vals[0];
      totalWeight++;
    }
  }
  return totalWeight > 0 ? Math.round((totalWeighted / totalWeight) * 10) / 10 : 62.5;
}

export function mergeSistemas(existing: Sistema[], incoming: Sistema[]): Sistema[] {
  const map = new Map<string, Sistema>();
  existing.forEach(s => map.set(s.nome, s));
  incoming.forEach(s => {
    if (map.has(s.nome)) {
      // Update existing
      map.set(s.nome, s);
    } else {
      map.set(s.nome, s);
    }
  });
  return Array.from(map.values());
}

export function generateTemplateXlsx(): ArrayBuffer {
  const wb = XLSX.utils.book_new();

  // Painel Executivo
  const painelData = [
    { INDICADOR: "Total Orçado Anual", VALOR: 0 },
    { INDICADOR: "Total Realizado", VALOR: 0 },
    { INDICADOR: "% Execução", VALOR: 0 },
    { INDICADOR: "Saldo Disponível", VALOR: 0 },
    { INDICADOR: "Desvio Acumulado (%)", VALOR: 0 },
    { INDICADOR: "Forecast Anual", VALOR: 0 },
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(painelData), "Painel Executivo");

  // Classificação Estratégica
  const classData = [
    { Classificacao: "Sistemas Core", "Valor Anual": 0 },
    { Classificacao: "Infraestrutura", "Valor Anual": 0 },
    { Classificacao: "Ferramentas de Apoio", "Valor Anual": 0 },
    { Classificacao: "Marketing Digital", "Valor Anual": 0 },
    { Classificacao: "Segurança", "Valor Anual": 0 },
    { Classificacao: "Inovação e IA", "Valor Anual": 0 },
    { Classificacao: "Engenharia", "Valor Anual": 0 },
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(classData), "Classificação Estratégica");

  // Matriz OBZ
  const matrizHeaders: Record<string, any> = {
    Sistema: "Exemplo Sistema",
    "Valor Anual": 0,
    Classificacao: "Infraestrutura",
    Criticidade: 1,
    Fornecedor: "Fornecedor Exemplo",
    Contrato: "CONTRATO Nº XXX/2026",
    "Sugestão de Substituição / Otimização": "",
    "Renegociado em 12m?": "Não",
  };
  for (const mes of MESES_COLS) {
    matrizHeaders[`${mes}_Previsto`] = 0;
    matrizHeaders[`${mes}_Realizado`] = 0;
  }
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([matrizHeaders]), "Matriz OBZ");

  // Ranking de Fornecedores
  const rankData = [{ FORNECEDOR: "Fornecedor Exemplo", "VALOR TOTAL ANUAL": 0 }];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rankData), "Ranking de Fornecedores");

  // IMOTi - Calculo
  const imotiData = [
    { Dimensão: "Planejamento Orçamentário", Peso: 0.25, Nota: 0 },
    { Dimensão: "Controle e Monitoramento", Peso: 0.30, Nota: 0 },
    { Dimensão: "Governança e Compliance", Peso: 0.20, Nota: 0 },
    { Dimensão: "Eficiência Operacional", Peso: 0.25, Nota: 0 },
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(imotiData), "IMOTi - Calculo");

  return XLSX.write(wb, { type: "array", bookType: "xlsx" });
}

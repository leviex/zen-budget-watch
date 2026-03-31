import * as XLSX from "xlsx";
import type { Sistema, PontoMelhoria } from "@/data/obzData";

const REQUIRED_SHEETS = [
  "Painel Executivo",
  "Classificação Estratégica",
  "Matriz OBZ",
  "Ranking de Fornecedores",
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
  classificacoes?: { nome: string; valor: number; cor: string }[];
  pontosMelhoria?: PontoMelhoria[];
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
    const requiredCols = ["Sistema", "Valor Anual", "Classificacao", "Criticidade", "Fornecedor"];
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

  if (errors.length > 0) return { valid: false, errors };

  try {
    const sistemas = parseMatrizOBZ(matrizData);
    const totalOrcado = sistemas.reduce((s, si) => s + si.valorAnual, 0);
    const classificacoes = parseClassificacoes(classData);

    let pontosMelhoria: PontoMelhoria[] | undefined;
    const pontosSheet = wb.Sheets["Pontos de Melhoria"];
    if (pontosSheet) {
      const pontosData = XLSX.utils.sheet_to_json<Record<string, any>>(pontosSheet, { defval: "" });
      pontosMelhoria = parsePontosMelhoria(pontosData);
    }

    return {
      valid: true,
      errors: [],
      sistemas,
      totalOrcado,
      classificacoes,
      pontosMelhoria,
      rowCount: sistemas.length,
    };
  } catch (e: any) {
    return { valid: false, errors: [{ sheet: "Matriz OBZ", message: `Erro ao processar dados: ${e.message}` }] };
  }
}

function parseCurrency(val: any): number {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const s = String(val).replace(/[R$\s.]/g, "").replace(",", ".");
  return Number(s) || 0;
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
      const previstoKey = headers.find(h => {
        const hl = h.toLowerCase();
        return (hl.includes(mes.toLowerCase()) && hl.includes("prev")) || 
               hl === `${mes.toLowerCase()}_previsto`;
      });
      const realizadoKey = headers.find(h => {
        const hl = h.toLowerCase();
        return (hl.includes(mes.toLowerCase()) && hl.includes("real")) ||
               hl === `${mes.toLowerCase()}_realizado`;
      });
      
      mensal.push({
        previsto: previstoKey ? parseCurrency(row[previstoKey]) : 0,
        realizado: realizadoKey ? parseCurrency(row[realizadoKey]) : 0,
      });
    }

    return {
      nome: String(getVal("Sistema") || ""),
      divisao: String(getVal("DIVISÃO") || getVal("Divisao") || getVal("DIVISAO") || ""),
      nucleo: String(getVal("NÚCLEO") || getVal("Nucleo") || getVal("NUCLEO") || ""),
      justificativaSetores: String(getVal("Justificativa") || ""),
      valorAnual: parseCurrency(getVal("Valor Anual")),
      classificacao: String(getVal("Classifica") || ""),
      criticidade: Number(getVal("Criticidade")) || 2,
      fornecedor: String(getVal("Fornecedor") || ""),
      contrato: String(getVal("Contrato") || ""),
      sugestao: String(getVal("Substituição") || getVal("Otimização") || getVal("Sugestão") || ""),
      renegociado: String(getVal("Renegociado") || ""),
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
      valor: parseCurrency(row[valorKey]),
      cor: classColors[nome] || "#94a3b8",
    };
  }).filter(c => c.nome.trim() !== "");
}

function parsePontosMelhoria(data: Record<string, any>[]): PontoMelhoria[] {
  if (!data.length) return [];
  const headers = Object.keys(data[0]);
  return data
    .map(row => {
      const solucaoKey = headers.find(h => h.toLowerCase().includes("solu")) || headers[0];
      const valorKey = headers.find(h => h.toLowerCase() === "valor" || h.toLowerCase().includes("valor")) || headers[1];
      const sugestaoKey = headers.find(h => h.toLowerCase().includes("sugest")) || headers[2];
      const justKey = headers[3] || "";
      const solucao = String(row[solucaoKey] || "").trim();
      const rawVal = row[valorKey];
      const valor = rawVal ? (parseCurrency(rawVal) || null) : null;
      const sugestao = String(row[sugestaoKey] || "").trim();
      const justificativa = justKey ? String(row[justKey] || "").trim() : "";
      return { solucao, valor, sugestao, justificativa };
    })
    .filter(p => p.solucao !== "" && !p.solucao.toLowerCase().includes("total"));
}

export function mergeSistemas(existing: Sistema[], incoming: Sistema[]): Sistema[] {
  const map = new Map<string, Sistema>();
  existing.forEach(s => map.set(s.nome, s));
  incoming.forEach(s => map.set(s.nome, s));
  return Array.from(map.values());
}

export function generateTemplateXlsx(): ArrayBuffer {
  const wb = XLSX.utils.book_new();

  const painelData = [
    { INDICADOR: "Total Orçado Anual", VALOR: 0 },
    { INDICADOR: "Total Realizado", VALOR: 0 },
    { INDICADOR: "% Execução", VALOR: 0 },
    { INDICADOR: "Nº de Sistemas", VALOR: 0 },
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(painelData), "Painel Executivo");

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

  const matrizHeaders: Record<string, any> = {
    Sistema: "Exemplo Sistema",
    "DIVISÃO": "DTI",
    "NÚCLEO": "NTD",
    "Justificativa Setores": "Descrição da justificativa",
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

  const rankData = [{ FORNECEDOR: "Fornecedor Exemplo", "VALOR TOTAL ANUAL": 0 }];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rankData), "Ranking de Fornecedores");

  const pontosData = [
    { "Solução": "Exemplo Sistema", "Valor": 0, "Sugestão": "Descrição da economia", "Justificativa": "Detalhes e contexto" },
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(pontosData), "Pontos de Melhoria");

  return XLSX.write(wb, { type: "array", bookType: "xlsx" });
}

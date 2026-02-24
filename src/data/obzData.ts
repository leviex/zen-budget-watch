export interface Sistema {
  nome: string;
  valorAnual: number;
  classificacao: string;
  criticidade: number;
  fornecedor: string;
  contrato: string;
  sugestao: string;
  mensal: { previsto: number; realizado: number }[];
}

export const sistemas: Sistema[] = [
  { nome: "DN SP Microsoft", valorAnual: 657410.86, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "SENAC SP / MICROSOFT", contrato: "Pagamento por AL", sugestao: "Revisar licenças E3/E5", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:657410.86,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "SoftExpert BPMS", valorAnual: 462890.00, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "SOFTEXPERT", contrato: "REPASSE ao DN", sugestao: "Avaliar uso real", mensal: Array.from({length:12}, () => ({previsto:38574.17,realizado:0}))},
  { nome: "ERP - MXM", valorAnual: 232048.68, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "MXM", contrato: "REPASSE ao DN", sugestao: "Consolidação com TOTVS", mensal: Array.from({length:12}, () => ({previsto:19337.39,realizado:0}))},
  { nome: "Módulo TOTVS FEEDZ", valorAnual: 153678.81, classificacao: "Ferramentas de Apoio", criticidade: 3, fornecedor: "TOTVs", contrato: "CONTRATO Nº 123/2023", sugestao: "Substituição por Sólides", mensal: Array.from({length:12}, () => ({previsto:12806.57,realizado:0}))},
  { nome: "Evolux Call Center", valorAnual: 140419.07, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "Evolux", contrato: "CONTRATO Nº 189/2022", sugestao: "Avaliar CRM omnichannel", mensal: Array.from({length:12}, () => ({previsto:11701.59,realizado:0}))},
  { nome: "RD Station 200k leads", valorAnual: 116869.56, classificacao: "Marketing Digital", criticidade: 2, fornecedor: "TOTVs", contrato: "CONTRATO Nº 70/2024", sugestao: "Reduzir pacote de leads", mensal: Array.from({length:12}, () => ({previsto:9739.13,realizado:0}))},
  { nome: "Geofusion", valorAnual: 110003.64, classificacao: "Marketing Digital", criticidade: 2, fornecedor: "Geofusion", contrato: "CONTRATO Nº129/2025", sugestao: "Substituir por Power BI", mensal: Array.from({length:12}, () => ({previsto:9166.97,realizado:0}))},
  { nome: "TATODESK", valorAnual: 89704.11, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "CONSENSO SOLUÇÕES EM TI LTDA", contrato: "CONTRATO Nº 78/2022", sugestao: "Avaliar Zendesk/Freshdesk", mensal: Array.from({length:12}, () => ({previsto:7475.34,realizado:0}))},
  { nome: "Consultoria ERP TOTVS", valorAnual: 88789.92, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "STRATEGI", contrato: "CONTRATO Nº106/2022", sugestao: "Internalizar conhecimento", mensal: Array.from({length:12}, () => ({previsto:7399.16,realizado:0}))},
  { nome: "Minha Biblioteca", valorAnual: 86160.00, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "MINHA BIBLIOTECA LTDA", contrato: "CONTRATO Nº 052/2024", sugestao: "Licenças sob demanda", mensal: Array.from({length:12}, () => ({previsto:7180.00,realizado:0}))},
  { nome: "PROXPER TV HBR", valorAnual: 76176.00, classificacao: "Sistemas Core", criticidade: 2, fornecedor: "EVOLUTIX", contrato: "CONTRATO Nº 80/2025", sugestao: "Curadoria interna", mensal: Array.from({length:12}, () => ({previsto:6348.00,realizado:0}))},
  { nome: "RD CRM PRO 65 licenças", valorAnual: 67906.92, classificacao: "Marketing Digital", criticidade: 2, fornecedor: "TOTVs", contrato: "CONTRATO Nº 079/2023", sugestao: "Rever número de usuários", mensal: Array.from({length:12}, () => ({previsto:5658.91,realizado:0}))},
  { nome: "Rede Giga Natal", valorAnual: 70560.00, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "UFRN", contrato: "CONTRATO Nº 85/2024", sugestao: "Renegociar contrato", mensal: Array.from({length:12}, () => ({previsto:5880.00,realizado:0}))},
  { nome: "LOCATECH Impressoras", valorAnual: 70281.36, classificacao: "Infraestrutura", criticidade: 2, fornecedor: "LOCATECH", contrato: "CONTRATO Nº 003/2025", sugestao: "Redução de impressão", mensal: Array.from({length:12}, () => ({previsto:5856.78,realizado:0}))},
  { nome: "FLUIG", valorAnual: 64344.00, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "TOTVs", contrato: "CONTRATO Nº 042/2023", sugestao: "Substituir BPMS", mensal: Array.from({length:12}, () => ({previsto:5362.00,realizado:0}))},
  { nome: "TrendMicro", valorAnual: 55022.37, classificacao: "Segurança", criticidade: 1, fornecedor: "STORAGE ONE - SENAC SP", contrato: "Repasse SENAC SP", sugestao: "Consolidação com Defender", mensal: [
    {previsto:0,realizado:0},{previsto:55022.37,realizado:55022.37},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "DB3 CEPS 2", valorAnual: 53538.60, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ALOHA INTERNET", contrato: "", sugestao: "Avaliar redundância", mensal: Array.from({length:12}, () => ({previsto:4461.55,realizado:0}))},
  { nome: "ORÇAFACIO", valorAnual: 52752.00, classificacao: "Ferramentas de Apoio", criticidade: 3, fornecedor: "ORÇAFACIO", contrato: "PC 26130", sugestao: "Candidato a cancelamento", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:52752.00,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "ALARES Hotel", valorAnual: 46692.00, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ALARES", contrato: "", sugestao: "Revisar contrato", mensal: Array.from({length:12}, () => ({previsto:3891.00,realizado:0}))},
  { nome: "ZOOX", valorAnual: 45389.04, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ZOOX", contrato: "CONTRATO Nº 30/2021", sugestao: "Avaliar redundância de links", mensal: Array.from({length:12}, () => ({previsto:3782.42,realizado:0}))},
  { nome: "RM VITAE/CHRONUS/PORTAL", valorAnual: 44586.24, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "TOTVs", contrato: "CONTRATO Nº 031/2024", sugestao: "Consolidação de módulos", mensal: Array.from({length:12}, () => ({previsto:3715.52,realizado:0}))},
  { nome: "Adobe CC 24 licenças", valorAnual: 43236.00, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "MAPDATA", contrato: "CONTRATO Nº 205/2025", sugestao: "Licenças flutuantes", mensal: [
    {previsto:0,realizado:0},{previsto:43236.00,realizado:43236.00},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "VIVO", valorAnual: 42213.24, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "VIVO", contrato: "", sugestao: "Consolidar telecom", mensal: Array.from({length:12}, () => ({previsto:3517.77,realizado:0}))},
  { nome: "DB3 CEPS 1", valorAnual: 40800.00, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ALOHA INTERNET", contrato: "", sugestao: "Avaliar redundância", mensal: Array.from({length:12}, () => ({previsto:3400.00,realizado:0}))},
  { nome: "Totvs Hotelaria", valorAnual: 34525.44, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "TOTVs", contrato: "CONTRATO Nº 125/2023", sugestao: "Consolidação ERP central", mensal: Array.from({length:12}, () => ({previsto:2877.12,realizado:0}))},
  { nome: "BUZZMONITOR", valorAnual: 32762.52, classificacao: "Marketing Digital", criticidade: 2, fornecedor: "BUZZMONITOR", contrato: "VIA AGÊNCIA", sugestao: "Ferramenta mais simples", mensal: Array.from({length:12}, () => ({previsto:2730.21,realizado:0}))},
  { nome: "EMBRATEL VIP Especial", valorAnual: 27427.80, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "EMBRATEL/CLARO", contrato: "", sugestao: "Consolidar Embratel", mensal: Array.from({length:12}, () => ({previsto:2285.65,realizado:0}))},
  { nome: "Microsoft Copilot", valorAnual: 24518.50, classificacao: "Inovação e IA", criticidade: 2, fornecedor: "BRASOFT", contrato: "CONTRATO Nº 36/2024", sugestao: "Ampliar uso", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:24518.50,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "Biblioteca Digital", valorAnual: 22985.95, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "Biblioteca Digital", contrato: "CONTRATO Nº089/2024", sugestao: "Plano sob demanda", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:22985.95,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "Software Ativos HBR", valorAnual: 22848.80, classificacao: "Sistemas Core", criticidade: 2, fornecedor: "SENAI", contrato: "CONTRATO Nº 124/2023", sugestao: "Integração com ERP", mensal: Array.from({length:12}, () => ({previsto:1904.07,realizado:0}))},
  { nome: "AUTOCAD 10", valorAnual: 22300.00, classificacao: "Engenharia", criticidade: 2, fornecedor: "Autodesk", contrato: "CONTRATO Nº24/2022", sugestao: "Licenças compartilhadas", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:22300.00,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "ALARES Casa Comercio", valorAnual: 21540.00, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ALARES", contrato: "", sugestao: "Consolidar Alares", mensal: Array.from({length:12}, () => ({previsto:1795.00,realizado:0}))},
  { nome: "Adobe CC 8 licenças", valorAnual: 16685.92, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "Adobe", contrato: "", sugestao: "Unificar pacote Adobe", mensal: [
    {previsto:0,realizado:0},{previsto:16685.92,realizado:16685.92},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "ENSCAPE", valorAnual: 14847.36, classificacao: "Engenharia", criticidade: 2, fornecedor: "ENSCAPE", contrato: "PC 23897", sugestao: "Avaliar com Sketchup", mensal: [
    {previsto:14847.36,realizado:14847.36},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "EMBRATEL Business Link", valorAnual: 9203.52, classificacao: "Infraestrutura", criticidade: 3, fornecedor: "EMBRATEL/CLARO", contrato: "", sugestao: "Consolidar telecom", mensal: Array.from({length:12}, () => ({previsto:766.96,realizado:0}))},
  { nome: "TOTVS Eletrônica Pack", valorAnual: 7880.52, classificacao: "Sistemas Core", criticidade: 2, fornecedor: "TOTVs", contrato: "Totvs Store", sugestao: "Absorção pelo ERP", mensal: Array.from({length:12}, () => ({previsto:656.71,realizado:0}))},
  { nome: "SKETCHUP", valorAnual: 6933.00, classificacao: "Engenharia", criticidade: 2, fornecedor: "SKETCHUP", contrato: "PC 23102", sugestao: "Versão educacional", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:6933.00,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "GIS IMAGENS", valorAnual: 6930.00, classificacao: "Marketing Digital", criticidade: 3, fornecedor: "Getty Images", contrato: "CONTRATO Nº094/2024", sugestao: "Banco alternativo", mensal: [
    {previsto:0,realizado:0},{previsto:6930.00,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "Api Totvs Hotelaria", valorAnual: 4800.00, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "TOTVs", contrato: "CONTRATO Nº 125/2023", sugestao: "Manter se integração crítica", mensal: Array.from({length:12}, () => ({previsto:400.00,realizado:0}))},
  { nome: "HeyGen", valorAnual: 3681.60, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "HeyGen", contrato: "CARTÃO CORPORATIVO", sugestao: "Avaliar utilização", mensal: Array.from({length:12}, () => ({previsto:306.80,realizado:0}))},
  { nome: "ALARES Centro", valorAnual: 3030.72, classificacao: "Infraestrutura", criticidade: 2, fornecedor: "ALARES", contrato: "", sugestao: "Consolidar telecom", mensal: Array.from({length:12}, () => ({previsto:252.56,realizado:0}))},
  { nome: "StreamYard", valorAnual: 2807.40, classificacao: "Marketing Digital", criticidade: 3, fornecedor: "StreamYard", contrato: "CARTÃO CORPORATIVO", sugestao: "Plano gratuito", mensal: Array.from({length:12}, () => ({previsto:233.95,realizado:0}))},
  { nome: "MOZAIK", valorAnual: 2539.22, classificacao: "Engenharia", criticidade: 2, fornecedor: "MOZAIK", contrato: "PC 24583", sugestao: "Avaliar real uso", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:2539.22,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "Bit.ly", valorAnual: 2184.00, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "Bit.ly", contrato: "CARTÃO CORPORATIVO", sugestao: "Versão gratuita", mensal: Array.from({length:12}, () => ({previsto:182.00,realizado:0}))},
  { nome: "ChatGPT Plus 1", valorAnual: 1248.00, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "ChatGPT Plus 1", contrato: "CARTÃO CORPORATIVO", sugestao: "Centralizar licenças", mensal: Array.from({length:12}, () => ({previsto:104.00,realizado:0}))},
  { nome: "ChatGPT Plus 2", valorAnual: 1248.00, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "ChatGPT Plus 2", contrato: "CARTÃO CORPORATIVO", sugestao: "Consolidar com Copilot", mensal: Array.from({length:12}, () => ({previsto:104.00,realizado:0}))},
  { nome: "Google AI Pro", valorAnual: 1163.88, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "Google AI Pro", contrato: "Desconhecido", sugestao: "Evitar duplicidade IA", mensal: Array.from({length:12}, () => ({previsto:96.99,realizado:0}))},
  { nome: "ALARES Carreta", valorAnual: 970.68, classificacao: "Infraestrutura", criticidade: 2, fornecedor: "ALARES", contrato: "", sugestao: "Consolidar contratos", mensal: Array.from({length:12}, () => ({previsto:80.89,realizado:0}))},
  { nome: "Padlet", valorAnual: 538.80, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "Padlet", contrato: "CARTÃO CORPORATIVO", sugestao: "Candidato a cancelamento", mensal: Array.from({length:12}, () => ({previsto:44.90,realizado:0}))},
  { nome: "KURIER Jurídico", valorAnual: 420.68, classificacao: "Ferramentas de Apoio", criticidade: 3, fornecedor: "KURIER", contrato: "PC 25287", sugestao: "Avaliar necessidade", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:420.68,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "EMBRATEL VIPLINE", valorAnual: 240.24, classificacao: "Infraestrutura", criticidade: 2, fornecedor: "EMBRATEL/CLARO", contrato: "", sugestao: "Consolidar telecom", mensal: Array.from({length:12}, () => ({previsto:20.02,realizado:0}))},
];

// Set realized values for Jan and Feb based on spreadsheet
// January realized = previsto for most items
sistemas.forEach(s => {
  if (s.mensal[0].previsto > 0 && s.nome !== "DN SP Microsoft") {
    s.mensal[0].realizado = s.mensal[0].previsto;
  }
});
// Special cases January
const locatech = sistemas.find(s => s.nome === "LOCATECH Impressoras")!;
locatech.mensal[0].realizado = locatech.mensal[0].previsto;
// February special realized values
const locatechFeb = sistemas.find(s => s.nome === "LOCATECH Impressoras")!;
locatechFeb.mensal[1].realizado = 24985.92;
const vivoFeb = sistemas.find(s => s.nome === "VIVO")!;
vivoFeb.mensal[1].realizado = 3498.40;
const embVip = sistemas.find(s => s.nome === "EMBRATEL VIP Especial")!;
embVip.mensal[1].realizado = 2815.23;
const embVipline = sistemas.find(s => s.nome === "EMBRATEL VIPLINE")!;
embVipline.mensal[1].realizado = 50.22;
const zooxFeb = sistemas.find(s => s.nome === "ZOOX")!;
zooxFeb.mensal[1].realizado = 3782.42;
const alaresCC = sistemas.find(s => s.nome === "ALARES Casa Comercio")!;
alaresCC.mensal[1].realizado = 1795.00;
const erpMxm = sistemas.find(s => s.nome === "ERP - MXM")!;
erpMxm.mensal[0].realizado = 19337.39;
const softAtivos = sistemas.find(s => s.nome === "Software Ativos HBR")!;
softAtivos.mensal[1].realizado = 1904.07;

export const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

export const classificacoes = [
  { nome: "Sistemas Core", valor: 1090518.75, cor: "#1a3a5c" },
  { nome: "Infraestrutura", valor: 1089298.06, cor: "#2d5f8a" },
  { nome: "Ferramentas de Apoio", valor: 554413.39, cor: "#4a90c4" },
  { nome: "Marketing Digital", valor: 337280.04, cor: "#6bb5e0" },
  { nome: "Segurança", valor: 55022.37, cor: "#89d0f0" },
  { nome: "Inovação e IA", valor: 34582.78, cor: "#f59e0b" },
  { nome: "Engenharia", valor: 46619.58, cor: "#94a3b8" },
];

export const totalOrcado = 3207734.97;
export const totalDespesasOrg = 124431332.00;
export const percentualTI = 2.58;
export const colaboradores = 746;
export const custoColabAno = 4299.91;
export const maturidadeIndex = 62.5;

export function getMonthlyTotals() {
  return meses.map((_, i) => {
    let previsto = 0;
    let realizado = 0;
    sistemas.forEach(s => {
      previsto += s.mensal[i].previsto;
      realizado += s.mensal[i].realizado;
    });
    return { mes: meses[i], previsto, realizado };
  });
}

export function getTotalRealizado() {
  return sistemas.reduce((sum, s) => sum + s.mensal.reduce((ms, m) => ms + m.realizado, 0), 0);
}

export function getTotalPrevistoAteMes(mesIndex: number) {
  return sistemas.reduce((sum, s) => {
    for (let i = 0; i <= mesIndex; i++) {
      sum += s.mensal[i].previsto;
    }
    return sum;
  }, 0);
}

export function getTopFornecedores() {
  const map = new Map<string, number>();
  sistemas.forEach(s => {
    map.set(s.fornecedor, (map.get(s.fornecedor) || 0) + s.valorAnual);
  });
  return Array.from(map.entries())
    .map(([fornecedor, valor]) => ({ fornecedor, valor }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 10);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

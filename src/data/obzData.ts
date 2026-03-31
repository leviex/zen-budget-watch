export interface Sistema {
  nome: string;
  divisao: string;
  nucleo: string;
  justificativaSetores: string;
  valorAnual: number;
  classificacao: string;
  criticidade: number;
  fornecedor: string;
  contrato: string;
  sugestao: string;
  renegociado: string;
  mensal: { previsto: number; realizado: number }[];
}

export interface PontoMelhoria {
  solucao: string;
  valor: number | null;
  sugestao: string;
  justificativa: string;
}

export const defaultPontosMelhoria: PontoMelhoria[] = [
  { solucao: "ChatGPT Plus (2x)", valor: 2496, sugestao: "Contratar pacote com HUB de IA's", justificativa: "Objetivo: apoio em criação de fórmulas, medidas DAX, projetos. Uso rotineiro e diário. Áreas: NGE e Senac." },
  { solucao: "HeyGen", valor: 3681, sugestao: "Contratar pacote com HUB de IA's", justificativa: "App de IA para geração de vídeos com persona Sofia. Uso sob demanda. Áreas: NQI / Senac Labs." },
  { solucao: "Google AI Pro", valor: 1163, sugestao: "Contratar pacote com HUB de IA's", justificativa: "Foco no NotebookLM: cruzamento de informações entre relatórios, planilhas e documentos de diretrizes." },
  { solucao: "Bit.ly", valor: 2184, sugestao: "Pode usar versão gratuita ou alternativa", justificativa: "Encurtador de URL e gerador de QRCode. Uso sob demanda. Pagamento será pausado 06/02/2025." },
  { solucao: "Cachola", valor: null, sugestao: "Sistema de Biblioteca: Verificar duplicidade", justificativa: "Plataforma de distribuição de recursos digitais do DN. Custos custeados 100% pelo DN até agosto de 2026." },
  { solucao: "Minha Biblioteca", valor: 86160, sugestao: "Sistema de Biblioteca: Verificar duplicidade / Avaliar uso por curso", justificativa: "Acervo Digital para faculdade. Sem alunos cadastrados no momento. Não deve ser renovado ao vencer." },
  { solucao: "Biblioteca Digital", valor: 22985, sugestao: "Sistema de Biblioteca: Verificar duplicidade", justificativa: "Acervo digital muito acessado por todos os alunos do SENAC/RN. Uso rotineiro." },
  { solucao: "FLUIG", valor: 64224, sugestao: "Valor a ser pago até Maio/2026 (R$26.810) - Migrar processos para o SoftExpert", justificativa: "Migrar processos para o SoftExpert antes da renovação do contrato." },
  { solucao: "ORÇAFASCIO", valor: 52752, sugestao: "Avaliar substituição por Contractor Foreman ou Jobber", justificativa: "Avaliar substituição por soluções equivalentes de orçamento e gestão de obras com custo menor." },
  { solucao: "Tatodesk", valor: 89704, sugestao: "Substituir por solução GENESYS, integrada com IA", justificativa: "Centralização do atendimento multiatendente. Parcialmente atende: não integrado ao CRM." },
  { solucao: "Evolux Call Center", valor: 140419.07, sugestao: "Substituir por solução GENESYS, integrada com IA", justificativa: "Centralização do canal voz, gravação de chamados. Alto custo mensal. Não integrado ao CRM." },
  { solucao: "Módulo TOTVS FEEDZ", valor: 153678.81, sugestao: "Microsoft Forms + Power Automate, SharePoint para PDI, Teams, BI", justificativa: "Automação de processos de Gestão de Pessoas. Atende necessidades atuais mas há alternativas Microsoft." },
];

export const sistemas: Sistema[] = [
  { nome: "DR SP Microsoft", divisao: "DTI", nucleo: "NTD", justificativaSetores: "Serviços e licenças Microsoft para a unidade SP, de nível operacional rotineiro.", valorAnual: 657410.86, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "SENAC SP / MICROSOFT", contrato: "Pagamento por AL", sugestao: "Revisar licenças E3/E5", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:19642,realizado:0},{previsto:0,realizado:0},{previsto:25188,realizado:0},{previsto:0,realizado:0},{previsto:657410.86,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "SoftExpert BPMS", divisao: "DPG", nucleo: "NEG", justificativaSetores: "Gestão e automação de processos de negócio.", valorAnual: 462890.00, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "SOFTEXPERT", contrato: "REPASSE ao DN", sugestao: "Avaliar uso real", renegociado: "", mensal: [
    {previsto:38574.17,realizado:0},{previsto:38574.17,realizado:12320},{previsto:38574.17,realizado:28950},{previsto:38574.17,realizado:0},{previsto:38574.17,realizado:0},{previsto:38574.17,realizado:0},{previsto:38574.17,realizado:0},{previsto:38574.17,realizado:0},{previsto:38574.17,realizado:0},{previsto:38574.17,realizado:0},{previsto:38574.17,realizado:0},{previsto:38574.17,realizado:0}
  ]},
  { nome: "ERP - MXM", divisao: "DAF", nucleo: "NAF/NFO/NAQ", justificativaSetores: "Sistema de gestão empresarial focado em controladoria.", valorAnual: 232048.68, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "MXM", contrato: "REPASSE ao DN", sugestao: "Consolidação com TOTVS", renegociado: "", mensal: [
    {previsto:19337.39,realizado:19337.39},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0},{previsto:19337.39,realizado:0}
  ]},
  { nome: "Módulo TOTVS FEEDZ", divisao: "DGP", nucleo: "NGP", justificativaSetores: "Plataforma de gestão de desempenho e engajamento.", valorAnual: 153461.52, classificacao: "Ferramentas de Apoio", criticidade: 3, fornecedor: "TOTVs", contrato: "CONTRATO Nº 123/2023", sugestao: "Substituição por Sólides, Gupy ou simplificação interna", renegociado: "", mensal: [
    {previsto:12788.46,realizado:12788.46},{previsto:12788.46,realizado:12788.46},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0},{previsto:12788.46,realizado:0}
  ]},
  { nome: "Evolux Call Center", divisao: "DMV", nucleo: "NCA", justificativaSetores: "Gestão de telefonia IP e call center.", valorAnual: 140419.07, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "Evolux", contrato: "CONTRATO Nº 189/2022", sugestao: "Avaliar CRM omnichannel", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:11701.59,realizado:0}))},
  { nome: "RD Station 200k leads", divisao: "DMV", nucleo: "NCM", justificativaSetores: "Automação de marketing para gestão de base de contatos.", valorAnual: 116869.56, classificacao: "Marketing Digital", criticidade: 2, fornecedor: "TOTVs", contrato: "CONTRATO Nº 70/2024", sugestao: "Reduzir pacote de leads", renegociado: "", mensal: [
    {previsto:9739.13,realizado:9739.13},{previsto:9739.13,realizado:9739.13},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0},{previsto:9739.13,realizado:0}
  ]},
  { nome: "Geofusion", divisao: "DGP", nucleo: "NIP", justificativaSetores: "Software de inteligência geográfica.", valorAnual: 110003.64, classificacao: "Marketing Digital", criticidade: 2, fornecedor: "Geofusion", contrato: "CONTRATO Nº129/2025", sugestao: "Substituir por Power BI", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:9166.97,realizado:0}))},
  { nome: "TATODESK", divisao: "DMV", nucleo: "NCA", justificativaSetores: "Sistema omnichannel de atendimento e helpdesk.", valorAnual: 89704.11, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "CONSENSO SOLUÇÕES EM TI LTDA", contrato: "CONTRATO Nº 78/2022", sugestao: "Avaliar Zendesk, Freshdesk ou módulo interno CRM", renegociado: "", mensal: [
    {previsto:7475.34,realizado:7475.34},{previsto:7475.34,realizado:7475.35},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0},{previsto:7475.34,realizado:0}
  ]},
  { nome: "Consultoria ERP TOTVS", divisao: "DTI", nucleo: "NTD", justificativaSetores: "Suporte especializado tático para ERP.", valorAnual: 7399.16, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "STRATEGI", contrato: "CONTRATO Nº106/2022", sugestao: "Reduzir horas; internalizar conhecimento", renegociado: "", mensal: [
    {previsto:7399.16,realizado:7399.16},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "Minha Biblioteca", divisao: "DEP", nucleo: "NRP", justificativaSetores: "Acervo digital de livros técnicos e acadêmicos.", valorAnual: 86160.00, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "MINHA BIBLIOTECA LTDA", contrato: "CONTRATO Nº 052/2024", sugestao: "Licenças sob demanda ou convênio educacional", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:7180.00,realizado:0}))},
  { nome: "PROXPER TV HBR", divisao: "HBR", nucleo: "HBR", justificativaSetores: "Sistema de TV corporativa.", valorAnual: 76176.00, classificacao: "Sistemas Core", criticidade: 2, fornecedor: "EVOLUTIX", contrato: "CONTRATO Nº 80/2025", sugestao: "Curadoria interna", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:6348.00,realizado:0}))},
  { nome: "RD CRM PRO 65 licenças", divisao: "DMV", nucleo: "NCA", justificativaSetores: "Gestão de vendas e relacionamento com o cliente.", valorAnual: 67906.92, classificacao: "Marketing Digital", criticidade: 2, fornecedor: "TOTVs", contrato: "CONTRATO Nº 079/2023", sugestao: "Rever número de usuários", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:5658.91,realizado:0}))},
  { nome: "Rede Giga Natal", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Infraestrutura de conexão de alta velocidade.", valorAnual: 70560.00, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "UFRN", contrato: "CONTRATO Nº 85/2024", sugestao: "Renegociar contrato", renegociado: "", mensal: [
    {previsto:5880,realizado:5880},{previsto:5880,realizado:5880},{previsto:5880,realizado:5880},{previsto:5880,realizado:0},{previsto:5880,realizado:0},{previsto:5880,realizado:0},{previsto:5880,realizado:0},{previsto:5880,realizado:0},{previsto:5880,realizado:0},{previsto:5880,realizado:0},{previsto:5880,realizado:0},{previsto:5880,realizado:0}
  ]},
  { nome: "LOCATECH Impressoras", divisao: "DTI", nucleo: "NTD", justificativaSetores: "Serviço de outsourcing de impressão.", valorAnual: 70281.36, classificacao: "Infraestrutura", criticidade: 2, fornecedor: "LOCATECH", contrato: "CONTRATO Nº 003/2025", sugestao: "Redução de impressão", renegociado: "", mensal: [
    {previsto:5856.78,realizado:5856.78},{previsto:5856.78,realizado:24985.92},{previsto:5856.78,realizado:13494.54},{previsto:5856.78,realizado:0},{previsto:5856.78,realizado:0},{previsto:5856.78,realizado:0},{previsto:5856.78,realizado:0},{previsto:5856.78,realizado:0},{previsto:5856.78,realizado:0},{previsto:5856.78,realizado:0},{previsto:5856.78,realizado:0},{previsto:5856.78,realizado:0}
  ]},
  { nome: "FLUIG", divisao: "DPG", nucleo: "NEG", justificativaSetores: "Plataforma de colaboração TOTVS.", valorAnual: 64344.00, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "TOTVs", contrato: "CONTRATO Nº 042/2023", sugestao: "Ampliar uso para substituir BPMS", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:5362.00,realizado:0}))},
  { nome: "TrendMicro", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Solução de segurança cibernética.", valorAnual: 55022.37, classificacao: "Segurança", criticidade: 1, fornecedor: "STORAGE ONE - SENAC SP", contrato: "Repasse SENAC SP", sugestao: "Consolidação com Defender", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:55022.37,realizado:55022.37},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "DB3 CEPS 2", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Serviço de infraestrutura de rede e link de dados.", valorAnual: 53538.60, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ALOHA INTERNET", contrato: "", sugestao: "Avaliar redundância", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:4461.55,realizado:0}))},
  { nome: "ORÇAFACIO", divisao: "DAF", nucleo: "NOB", justificativaSetores: "Sistema de orçamentação de obras em nuvem.", valorAnual: 4396.00, classificacao: "Ferramentas de Apoio", criticidade: 3, fornecedor: "ORÇAFACIO", contrato: "PC 26130", sugestao: "Candidato a cancelamento", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:4396,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "ALARES Hotel", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Provedor de link dedicado de internet.", valorAnual: 46692.00, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ALARES", contrato: "", sugestao: "Revisar contrato", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:3891.00,realizado:0}))},
  { nome: "ZOOX", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Plataforma de gestão de Wi-Fi e Hotspot.", valorAnual: 45389.04, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ZOOX", contrato: "CONTRATO Nº 30/2021", sugestao: "Avaliar redundância de links", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:3782.42,realizado:0}))},
  { nome: "RM VITAE/CHRONUS/PORTAL", divisao: "DAF", nucleo: "NAD", justificativaSetores: "Módulos de gestão de pessoas do TOTVS.", valorAnual: 44586.24, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "TOTVs", contrato: "CONTRATO Nº 031/2024", sugestao: "Consolidação de módulos", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:3715.52,realizado:0}))},
  { nome: "Adobe CC 24 licenças", divisao: "DMV", nucleo: "NCM", justificativaSetores: "Pacote completo de ferramentas criativas.", valorAnual: 43236.00, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "MAPDATA", contrato: "CONTRATO Nº 205/2025", sugestao: "Licenças flutuantes", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:43236,realizado:43236},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "VIVO", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Serviços de telecomunicações corporativos.", valorAnual: 42213.24, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "VIVO", contrato: "CONTRATO Nº 24/2021", sugestao: "Consolidar telecom", renegociado: "", mensal: [
    {previsto:3517.77,realizado:3517.77},{previsto:3517.77,realizado:3498.40},{previsto:3517.77,realizado:3498.40},{previsto:3517.77,realizado:0},{previsto:3517.77,realizado:0},{previsto:3517.77,realizado:0},{previsto:3517.77,realizado:0},{previsto:3517.77,realizado:0},{previsto:3517.77,realizado:0},{previsto:3517.77,realizado:0},{previsto:3517.77,realizado:0},{previsto:3517.77,realizado:0}
  ]},
  { nome: "DB3 CEPS 1", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Circuito de comunicação e integração de rede.", valorAnual: 40800.00, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ALOHA INTERNET", contrato: "", sugestao: "Avaliar redundância", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:3400.00,realizado:0}))},
  { nome: "Totvs Hotelaria", divisao: "HBR", nucleo: "HBR", justificativaSetores: "Gestão operacional hoteleira.", valorAnual: 34525.44, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "TOTVs", contrato: "CONTRATO Nº 125/2023", sugestao: "Consolidação ERP central", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:2877.12,realizado:0}))},
  { nome: "BUZZMONITOR", divisao: "DMV", nucleo: "NCM", justificativaSetores: "Plataforma de monitoramento de redes sociais.", valorAnual: 32762.52, classificacao: "Marketing Digital", criticidade: 2, fornecedor: "BUZZMONITOR", contrato: "VIA AGÊNCIA", sugestao: "Ferramenta mais simples", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:2730.21,realizado:0}))},
  { nome: "Microsoft Copilot", divisao: "DTI", nucleo: "NTD", justificativaSetores: "Assistente de IA Generativa.", valorAnual: 29817.12, classificacao: "Inovação e IA", criticidade: 2, fornecedor: "BRASOFT", contrato: "CONTRATO Nº 36/2024", sugestao: "Ampliar uso", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:29817.12,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "EMBRATEL VIP Especial", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Link de internet de alta performance.", valorAnual: 27427.80, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "EMBRATEL/CLARO", contrato: "CONTRATO Nº 007/2025", sugestao: "Consolidar Embratel", renegociado: "", mensal: [
    {previsto:2285.65,realizado:2285.65},{previsto:2285.65,realizado:2815.23},{previsto:2285.65,realizado:2491.23},{previsto:2285.65,realizado:0},{previsto:2285.65,realizado:0},{previsto:2285.65,realizado:0},{previsto:2285.65,realizado:0},{previsto:2285.65,realizado:0},{previsto:2285.65,realizado:0},{previsto:2285.65,realizado:0},{previsto:2285.65,realizado:0},{previsto:2285.65,realizado:0}
  ]},
  { nome: "Biblioteca Digital", divisao: "DEP", nucleo: "NRP", justificativaSetores: "Plataforma de consulta técnica e bibliográfica.", valorAnual: 22985.95, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "Biblioteca Digital", contrato: "CONTRATO Nº089/2024", sugestao: "Plano sob demanda", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:22985.95,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "Software Ativos HBR", divisao: "HBR", nucleo: "HBR", justificativaSetores: "Software de gestão patrimonial.", valorAnual: 22848.80, classificacao: "Sistemas Core", criticidade: 2, fornecedor: "SENAI", contrato: "CONTRATO Nº 124/2023", sugestao: "Integração com ERP", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:1904.07,realizado:0}))},
  { nome: "AUTOCAD 10", divisao: "DAF", nucleo: "NOB", justificativaSetores: "Software de desenho técnico e projetos de engenharia.", valorAnual: 22300.00, classificacao: "Engenharia", criticidade: 2, fornecedor: "Autodesk", contrato: "CONTRATO Nº24/2022", sugestao: "Licenças compartilhadas", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:22300,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "ALARES Casa Comercio", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Provedor de conectividade.", valorAnual: 21540.00, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "ALARES", contrato: "", sugestao: "Consolidar Alares", renegociado: "", mensal: [
    {previsto:1795,realizado:1795},{previsto:1795,realizado:1795},{previsto:1795,realizado:1795},{previsto:1795,realizado:0},{previsto:1795,realizado:0},{previsto:1795,realizado:0},{previsto:1795,realizado:0},{previsto:1795,realizado:0},{previsto:1795,realizado:0},{previsto:1795,realizado:0},{previsto:1795,realizado:0},{previsto:1795,realizado:0}
  ]},
  { nome: "Adobe CC 8 licenças", divisao: "DEP", nucleo: "NQI", justificativaSetores: "Licenciamento complementar de ferramentas Adobe.", valorAnual: 16685.92, classificacao: "Ferramentas de Apoio", criticidade: 2, fornecedor: "Adobe", contrato: "CONTRATO Nº 205/2025", sugestao: "Unificar pacote Adobe", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:16685.92,realizado:16685.92},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "ENSCAPE", divisao: "DAF", nucleo: "NOB", justificativaSetores: "Recurso de renderização e visualização em tempo real.", valorAnual: 14847.36, classificacao: "Engenharia", criticidade: 2, fornecedor: "ENSCAPE", contrato: "PC 23897", sugestao: "Avaliar com Sketchup", renegociado: "", mensal: [
    {previsto:14847.36,realizado:14847.36},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "EMBRATEL TEL FIXO MOSSORÓ", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Serviço de comunicação de voz e dados.", valorAnual: 14616.84, classificacao: "Infraestrutura", criticidade: 1, fornecedor: "EMBRATEL/CLARO", contrato: "CONTRATO Nº 007/2025", sugestao: "Consolidar telecom", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:1218.07,realizado:0}))},
  { nome: "EMBRATEL Business Link", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Circuito de internet dedicado.", valorAnual: 9203.52, classificacao: "Infraestrutura", criticidade: 3, fornecedor: "EMBRATEL/CLARO", contrato: "CONTRATO Nº 007/2025", sugestao: "Consolidar telecom", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:766.96,realizado:0}))},
  { nome: "TOTVS Eletrônica Pack", divisao: "DTI", nucleo: "NTD", justificativaSetores: "Módulo eletrônico do ERP.", valorAnual: 7880.52, classificacao: "Sistemas Core", criticidade: 2, fornecedor: "TOTVs", contrato: "Totvs Store", sugestao: "Absorção pelo ERP", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:656.71,realizado:0}))},
  { nome: "SKETCHUP", divisao: "DAF", nucleo: "NOB", justificativaSetores: "Ferramenta de modelagem tridimensional.", valorAnual: 6933.00, classificacao: "Engenharia", criticidade: 2, fornecedor: "SKETCHUP", contrato: "PC 23102", sugestao: "Versão educacional", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:6933,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "GIS IMAGENS", divisao: "DMV", nucleo: "DMV", justificativaSetores: "Aquisição de dados georreferenciados.", valorAnual: 6930.00, classificacao: "Marketing Digital", criticidade: 3, fornecedor: "Getty Images", contrato: "CONTRATO Nº094/2024", sugestao: "Banco alternativo", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:6930,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "Api Totvs Hotelaria", divisao: "HBR", nucleo: "HBR", justificativaSetores: "Integração API hotelaria.", valorAnual: 4800.00, classificacao: "Sistemas Core", criticidade: 1, fornecedor: "TOTVs", contrato: "CONTRATO Nº 125/2023", sugestao: "Manter se integração crítica", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:400.00,realizado:0}))},
  { nome: "HeyGen", divisao: "DEP", nucleo: "NQI", justificativaSetores: "Plataforma de IA para geração de vídeos.", valorAnual: 3681.60, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "HeyGen", contrato: "CARTÃO CORPORATIVO", sugestao: "Avaliar utilização", renegociado: "", mensal: [
    {previsto:306.80,realizado:306.80},{previsto:306.80,realizado:306.00},{previsto:306.80,realizado:306.00},{previsto:306.80,realizado:0},{previsto:306.80,realizado:0},{previsto:306.80,realizado:0},{previsto:306.80,realizado:0},{previsto:306.80,realizado:0},{previsto:306.80,realizado:0},{previsto:306.80,realizado:0},{previsto:306.80,realizado:0},{previsto:306.80,realizado:0}
  ]},
  { nome: "ALARES Centro", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Serviço de link de dados e internet.", valorAnual: 3030.72, classificacao: "Infraestrutura", criticidade: 2, fornecedor: "ALARES", contrato: "", sugestao: "Consolidar telecom", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:252.56,realizado:0}))},
  { nome: "StreamYard", divisao: "DEP", nucleo: "NQI", justificativaSetores: "Estúdio de transmissão online.", valorAnual: 2807.40, classificacao: "Marketing Digital", criticidade: 3, fornecedor: "StreamYard", contrato: "CARTÃO CORPORATIVO", sugestao: "Plano gratuito", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:233.95,realizado:0}))},
  { nome: "MOZAIK", divisao: "DEP", nucleo: "NQI", justificativaSetores: "Solução de realidade aumentada.", valorAnual: 2539.22, classificacao: "Engenharia", criticidade: 2, fornecedor: "MOZAIK", contrato: "PC 24583", sugestao: "Avaliar real uso", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:2539.22,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "Bit.ly", divisao: "DEP", nucleo: "NQI", justificativaSetores: "Ferramenta de gestão de links e rastreamento.", valorAnual: 2184.00, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "Bit.ly", contrato: "CARTÃO CORPORATIVO", sugestao: "Versão gratuita", renegociado: "", mensal: [
    {previsto:182,realizado:182},{previsto:182,realizado:182},{previsto:182,realizado:182},{previsto:182,realizado:0},{previsto:182,realizado:0},{previsto:182,realizado:0},{previsto:182,realizado:0},{previsto:182,realizado:0},{previsto:182,realizado:0},{previsto:182,realizado:0},{previsto:182,realizado:0},{previsto:182,realizado:0}
  ]},
  { nome: "ChatGPT Plus 1", divisao: "DEP", nucleo: "NQI", justificativaSetores: "Assinatura de modelo de IA avançado.", valorAnual: 1248.00, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "ChatGPT Plus 1", contrato: "CARTÃO CORPORATIVO", sugestao: "Centralizar licenças", renegociado: "", mensal: [
    {previsto:104,realizado:104},{previsto:104,realizado:104},{previsto:104,realizado:104},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0}
  ]},
  { nome: "ChatGPT Plus 2", divisao: "DEP", nucleo: "NGE", justificativaSetores: "Licença adicional de IA.", valorAnual: 1248.00, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "ChatGPT Plus 2", contrato: "CARTÃO CORPORATIVO", sugestao: "Consolidar com Copilot", renegociado: "", mensal: [
    {previsto:104,realizado:104},{previsto:104,realizado:104},{previsto:104,realizado:104},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0},{previsto:104,realizado:0}
  ]},
  { nome: "Google AI Pro", divisao: "DEP", nucleo: "NGE", justificativaSetores: "Acesso ao Gemini Enterprise.", valorAnual: 1163.88, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "Google AI Pro", contrato: "Desconhecido", sugestao: "Evitar duplicidade IA", renegociado: "", mensal: [
    {previsto:96.99,realizado:96.99},{previsto:96.99,realizado:96.99},{previsto:96.99,realizado:96.99},{previsto:96.99,realizado:0},{previsto:96.99,realizado:0},{previsto:96.99,realizado:0},{previsto:96.99,realizado:0},{previsto:96.99,realizado:0},{previsto:96.99,realizado:0},{previsto:96.99,realizado:0},{previsto:96.99,realizado:0},{previsto:96.99,realizado:0}
  ]},
  { nome: "ALARES Carreta", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Solução de conectividade para Unidade Móvel.", valorAnual: 970.68, classificacao: "Infraestrutura", criticidade: 2, fornecedor: "ALARES", contrato: "", sugestao: "Consolidar contratos", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:80.89,realizado:0}))},
  { nome: "Padlet", divisao: "DEP", nucleo: "NCE", justificativaSetores: "Mural digital colaborativo.", valorAnual: 538.80, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "Padlet", contrato: "CARTÃO CORPORATIVO", sugestao: "Candidato a cancelamento", renegociado: "", mensal: [
    {previsto:44.90,realizado:44.90},{previsto:44.90,realizado:44.90},{previsto:44.90,realizado:44.90},{previsto:44.90,realizado:0},{previsto:44.90,realizado:0},{previsto:44.90,realizado:0},{previsto:44.90,realizado:0},{previsto:44.90,realizado:0},{previsto:44.90,realizado:0},{previsto:44.90,realizado:0},{previsto:44.90,realizado:0},{previsto:44.90,realizado:0}
  ]},
  { nome: "KURIER Jurídico", divisao: "DJA", nucleo: "NJU", justificativaSetores: "Automação e inteligência para gestão jurídica.", valorAnual: 420.68, classificacao: "Ferramentas de Apoio", criticidade: 3, fornecedor: "KURIER", contrato: "PC 25287", sugestao: "Avaliar necessidade", renegociado: "", mensal: [
    {previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0},{previsto:420.68,realizado:0},{previsto:0,realizado:0},{previsto:0,realizado:0}
  ]},
  { nome: "EMBRATEL VIPLINE", divisao: "DTI", nucleo: "NIO", justificativaSetores: "Serviço de comunicação de voz e dados.", valorAnual: 240.24, classificacao: "Infraestrutura", criticidade: 2, fornecedor: "EMBRATEL/CLARO", contrato: "CONTRATO Nº 007/2025", sugestao: "Consolidar telecom", renegociado: "", mensal: [
    {previsto:20.02,realizado:20.02},{previsto:20.02,realizado:50.22},{previsto:20.02,realizado:34.36},{previsto:20.02,realizado:0},{previsto:20.02,realizado:0},{previsto:20.02,realizado:0},{previsto:20.02,realizado:0},{previsto:20.02,realizado:0},{previsto:20.02,realizado:0},{previsto:20.02,realizado:0},{previsto:20.02,realizado:0},{previsto:20.02,realizado:0}
  ]},
  { nome: "Cachola", divisao: "DEP", nucleo: "NQI", justificativaSetores: "Solução de gamificação corporativa.", valorAnual: 0, classificacao: "Inovação e IA", criticidade: 3, fornecedor: "Cachola", contrato: "DN EXP", sugestao: "Avaliar pertinência", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:0,realizado:0}))},
  { nome: "AUTOCAD 22", divisao: "DAF", nucleo: "NOB", justificativaSetores: "Atualização tecnológica do software de CAD.", valorAnual: 0, classificacao: "Engenharia", criticidade: 2, fornecedor: "Autodesk", contrato: "LICITAÇÃO", sugestao: "Validar necessidade futura", renegociado: "", mensal: Array.from({length:12}, () => ({previsto:0,realizado:0}))},
];

// Set Jan realized for items with previsto
sistemas.forEach(s => {
  if (s.mensal[0].previsto > 0 && s.mensal[0].realizado === 0) {
    // Only auto-set for items that the spreadsheet shows realized = previsto
  }
});

// Evolux Jan/Feb realized
const evolux = sistemas.find(s => s.nome === "Evolux Call Center");
if (evolux) {
  evolux.mensal[0].realizado = 11701.59;
  evolux.mensal[1].realizado = 11701.59;
}
// Geofusion Jan/Feb
const geo = sistemas.find(s => s.nome === "Geofusion");
if (geo) {
  geo.mensal[0].realizado = 9166.97;
  geo.mensal[1].realizado = 9166.97;
}
// Minha Biblioteca Jan/Feb
const mb = sistemas.find(s => s.nome === "Minha Biblioteca");
if (mb) {
  mb.mensal[0].realizado = 7180;
  mb.mensal[1].realizado = 7180;
}
// RD CRM Jan/Feb
const rdcrm = sistemas.find(s => s.nome === "RD CRM PRO 65 licenças");
if (rdcrm) {
  rdcrm.mensal[0].realizado = 5658.91;
  rdcrm.mensal[1].realizado = 5658.91;
}
// Rede Giga Jan/Feb already set
// FLUIG Jan/Feb
const fluig = sistemas.find(s => s.nome === "FLUIG");
if (fluig) {
  fluig.mensal[0].realizado = 5362;
  fluig.mensal[1].realizado = 5362;
}
// DB3 CEPS 2 Jan/Feb
const db3_2 = sistemas.find(s => s.nome === "DB3 CEPS 2");
if (db3_2) {
  db3_2.mensal[0].realizado = 4461.55;
  db3_2.mensal[1].realizado = 4461.55;
}
// ALARES Hotel
const alaresH = sistemas.find(s => s.nome === "ALARES Hotel");
if (alaresH) {
  alaresH.mensal[0].realizado = 3891;
  alaresH.mensal[1].realizado = 3891;
}
// ZOOX
const zoox = sistemas.find(s => s.nome === "ZOOX");
if (zoox) {
  zoox.mensal[0].realizado = 3782.42;
  zoox.mensal[1].realizado = 3782.42;
}
// RM VITAE
const rm = sistemas.find(s => s.nome === "RM VITAE/CHRONUS/PORTAL");
if (rm) {
  rm.mensal[0].realizado = 3715.52;
  rm.mensal[1].realizado = 3715.52;
}
// DB3 CEPS 1
const db3_1 = sistemas.find(s => s.nome === "DB3 CEPS 1");
if (db3_1) {
  db3_1.mensal[0].realizado = 3400;
  db3_1.mensal[1].realizado = 3400;
}
// Totvs Hotelaria
const th = sistemas.find(s => s.nome === "Totvs Hotelaria");
if (th) {
  th.mensal[0].realizado = 2877.12;
  th.mensal[1].realizado = 2877.12;
}
// BUZZMONITOR
const buzz = sistemas.find(s => s.nome === "BUZZMONITOR");
if (buzz) {
  buzz.mensal[0].realizado = 2730.21;
  buzz.mensal[1].realizado = 2730.21;
}
// EMBRATEL TEL FIXO
const embTel = sistemas.find(s => s.nome === "EMBRATEL TEL FIXO MOSSORÓ");
if (embTel) {
  embTel.mensal[0].realizado = 1218.07;
  embTel.mensal[1].realizado = 1218.07;
}
// Software Ativos
const sa = sistemas.find(s => s.nome === "Software Ativos HBR");
if (sa) {
  sa.mensal[0].realizado = 1904.07;
  sa.mensal[1].realizado = 1904.07;
}
// TOTVS Eletrônica
const te = sistemas.find(s => s.nome === "TOTVS Eletrônica Pack");
if (te) {
  te.mensal[0].realizado = 656.71;
  te.mensal[1].realizado = 656.71;
}
// Api Totvs Hotelaria
const apiTh = sistemas.find(s => s.nome === "Api Totvs Hotelaria");
if (apiTh) {
  apiTh.mensal[0].realizado = 400;
  apiTh.mensal[1].realizado = 400;
}
// ALARES Carreta
const ac = sistemas.find(s => s.nome === "ALARES Carreta");
if (ac) {
  ac.mensal[0].realizado = 80.89;
  ac.mensal[1].realizado = 80.89;
}
// ALARES Centro
const aCentro = sistemas.find(s => s.nome === "ALARES Centro");
if (aCentro) {
  aCentro.mensal[0].realizado = 252.56;
  aCentro.mensal[1].realizado = 252.56;
}
// EMBRATEL Business Link - no realized
// PROXPER TV HBR
const prox = sistemas.find(s => s.nome === "PROXPER TV HBR");
if (prox) {
  prox.mensal[0].realizado = 6348;
  prox.mensal[1].realizado = 6348;
}
// StreamYard
const sy = sistemas.find(s => s.nome === "StreamYard");
if (sy) {
  sy.mensal[0].realizado = 233.95;
  sy.mensal[1].realizado = 233.95;
}

export const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

export const classificacoes = [
  { nome: "Sistemas Core", valor: 0, cor: "#1a3a5c" },
  { nome: "Infraestrutura", valor: 0, cor: "#2d5f8a" },
  { nome: "Ferramentas de Apoio", valor: 0, cor: "#4a90c4" },
  { nome: "Marketing Digital", valor: 0, cor: "#6bb5e0" },
  { nome: "Segurança", valor: 0, cor: "#89d0f0" },
  { nome: "Inovação e IA", valor: 0, cor: "#f59e0b" },
  { nome: "Engenharia", valor: 0, cor: "#94a3b8" },
];

// Compute classification values from systems
const classMap = new Map<string, number>();
sistemas.forEach(s => {
  classMap.set(s.classificacao, (classMap.get(s.classificacao) || 0) + s.valorAnual);
});
classificacoes.forEach(c => {
  c.valor = classMap.get(c.nome) || 0;
});

export const totalOrcado = sistemas.reduce((s, si) => s + si.valorAnual, 0);
export const totalDespesasOrg = 124431332.00;
export const percentualTI = 2.58;
export const colaboradores = 746;
export const custoColabAno = 4299.91;

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

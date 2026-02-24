import { formatCurrency } from "@/data/obzData";

interface Opportunity {
  solucao: string;
  valor: number | null;
  sugestao: string;
}

const opportunities: Opportunity[] = [
  { solucao: "ChatGPT Plus (2x)", valor: 2496, sugestao: "Contratar pacote com HUB de IA's" },
  { solucao: "HeyGen", valor: 3681, sugestao: "Contratar pacote com HUB de IA's" },
  { solucao: "Google AI Pro", valor: 1163, sugestao: "" },
  { solucao: "Bit.ly", valor: 2184, sugestao: "Pode usar versão gratuita ou alternativa" },
  { solucao: "Cachola", valor: null, sugestao: "Sistema de Biblioteca: Verificar duplicidade" },
  { solucao: "Minha Biblioteca", valor: 86160, sugestao: "Sistema de Biblioteca: Verificar duplicidade / Avaliar uso por curso" },
  { solucao: "Biblioteca Digital", valor: 22985, sugestao: "Sistema de Biblioteca: Verificar duplicidade" },
  { solucao: "FLUIG", valor: 64224, sugestao: "Valor a ser pago até Maio/2026 - Migrar processos para o SoftExpert antes da renovação do CT" },
  { solucao: "Tatodesk", valor: 89704, sugestao: "Substituir por solução GENESYS, integrada com IA, no aguardo de proposta." },
  { solucao: "Evolux Call Center", valor: 140419.07, sugestao: "Substituir por solução GENESYS, integrada com IA, no aguardo de proposta." },
  { solucao: "Módulo TOTVS FEEDZ", valor: 153678.81, sugestao: "O módulo não gera captação de alunos; Reduz custos operacionais de forma mensurável. Alternativas: Microsoft Forms + Power Automate, SharePoint para PDI, Teams para comunicação interna, BI para acompanhamento." },
];

const totalEconomia = opportunities.reduce((sum, o) => sum + (o.valor || 0), 0);

export default function SavingsOpportunities() {
  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground">
          💡 Contratações com Possíveis Pontos de Economia
        </h3>
        <span className="text-xs font-mono font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded">
          Potencial: {formatCurrency(totalEconomia)}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Solução</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Valor Anual</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Sugestão de Economia</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((o) => (
              <tr key={o.solucao} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-2.5 px-2 font-medium text-card-foreground">{o.solucao}</td>
                <td className="py-2.5 px-2 text-right font-mono text-muted-foreground">
                  {o.valor ? formatCurrency(o.valor) : "—"}
                </td>
                <td className="py-2.5 px-2 text-muted-foreground max-w-xs">{o.sugestao || "—"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border">
              <td className="py-2.5 px-2 font-semibold text-card-foreground">Total</td>
              <td className="py-2.5 px-2 text-right font-mono font-semibold text-destructive">
                {formatCurrency(totalEconomia)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

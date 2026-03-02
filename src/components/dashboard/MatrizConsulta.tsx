import { useState, useMemo } from "react";
import { useObzData, formatCurrency, meses } from "@/context/ObzDataContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

export default function MatrizConsulta() {
  const { sistemas, classificacoes } = useObzData();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortField, setSortField] = useState<"nome" | "valorAnual">("valorAnual");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let result = [...sistemas];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.nome.toLowerCase().includes(q) ||
        s.fornecedor.toLowerCase().includes(q) ||
        s.classificacao.toLowerCase().includes(q)
      );
    }
    if (classFilter !== "all") {
      result = result.filter(s => s.classificacao === classFilter);
    }
    result.sort((a, b) => {
      const va = sortField === "nome" ? a.nome.localeCompare(b.nome) : a.valorAnual - b.valorAnual;
      return sortDir === "desc" ? -va : va;
    });
    return result;
  }, [sistemas, search, classFilter, sortField, sortDir]);

  const toggleSort = (field: "nome" | "valorAnual") => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const SortIcon = ({ field }: { field: "nome" | "valorAnual" }) => {
    if (sortField !== field) return null;
    return sortDir === "desc" ? <ChevronDown className="inline w-3 h-3" /> : <ChevronUp className="inline w-3 h-3" />;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">📋 Matriz OBZ — Consulta Detalhada</h3>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar sistema, fornecedor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-[200px] h-9 text-sm">
            <SelectValue placeholder="Classificação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas classificações</SelectItem>
            {classificacoes.map(c => (
              <SelectItem key={c.nome} value={c.nome}>{c.nome}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground self-center">{filtered.length} sistema(s)</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-2 px-2 text-muted-foreground font-medium cursor-pointer select-none" onClick={() => toggleSort("nome")}>
                Sistema <SortIcon field="nome" />
              </th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Classificação</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Fornecedor</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium cursor-pointer select-none" onClick={() => toggleSort("valorAnual")}>
                Valor Anual <SortIcon field="valorAnual" />
              </th>
              <th className="text-center py-2 px-2 text-muted-foreground font-medium">Crit.</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Sugestão</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const totalRealizado = s.mensal.reduce((sum, m) => sum + m.realizado, 0);
              const totalPrevisto = s.mensal.reduce((sum, m) => sum + m.previsto, 0);
              const desvio = totalPrevisto > 0 ? ((totalRealizado - totalPrevisto) / totalPrevisto) * 100 : 0;
              const expanded = expandedRow === s.nome;

              return (
                <>
                  <tr
                    key={s.nome}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedRow(expanded ? null : s.nome)}
                  >
                    <td className="py-2.5 px-2 font-medium text-card-foreground">
                      <span className="mr-1">{expanded ? "▼" : "▶"}</span>
                      {s.nome}
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">{s.classificacao}</span>
                    </td>
                    <td className="py-2.5 px-2 text-muted-foreground">{s.fornecedor}</td>
                    <td className="py-2.5 px-2 text-right font-mono">{formatCurrency(s.valorAnual)}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`inline-block w-5 h-5 rounded-full text-[10px] font-bold leading-5 text-center ${
                        s.criticidade === 1 ? "bg-destructive/20 text-destructive" :
                        s.criticidade === 2 ? "bg-yellow-500/20 text-yellow-700" :
                        "bg-muted text-muted-foreground"
                      }`}>{s.criticidade}</span>
                    </td>
                    <td className="py-2.5 px-2 text-muted-foreground max-w-[200px] truncate">{s.sugestao || "—"}</td>
                  </tr>
                  {expanded && (
                    <tr key={`${s.nome}-detail`} className="bg-muted/20">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                          <div><span className="text-muted-foreground">Contrato:</span> <span className="font-medium">{s.contrato || "—"}</span></div>
                          <div><span className="text-muted-foreground">Desvio:</span> <span className={`font-mono font-medium ${Math.abs(desvio) > 10 ? "text-destructive" : desvio > 5 ? "text-yellow-600" : "text-emerald-600"}`}>{desvio.toFixed(1)}%</span></div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px]">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="py-1 px-1.5 text-muted-foreground font-medium"></th>
                                {meses.map(m => <th key={m} className="py-1 px-1.5 text-center text-muted-foreground font-medium">{m}</th>)}
                                <th className="py-1 px-1.5 text-right text-muted-foreground font-medium">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-1 px-1.5 font-medium text-muted-foreground">Previsto</td>
                                {s.mensal.map((m, i) => <td key={i} className="py-1 px-1.5 text-center font-mono">{m.previsto > 0 ? formatCurrency(m.previsto) : "—"}</td>)}
                                <td className="py-1 px-1.5 text-right font-mono font-medium">{formatCurrency(totalPrevisto)}</td>
                              </tr>
                              <tr>
                                <td className="py-1 px-1.5 font-medium text-muted-foreground">Realizado</td>
                                {s.mensal.map((m, i) => <td key={i} className="py-1 px-1.5 text-center font-mono">{m.realizado > 0 ? formatCurrency(m.realizado) : "—"}</td>)}
                                <td className="py-1 px-1.5 text-right font-mono font-medium">{formatCurrency(totalRealizado)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

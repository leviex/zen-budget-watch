import React, { useState, useMemo } from "react";
import { useObzData, formatCurrency, meses } from "@/context/ObzDataContext";
import { Search, ChevronDown, ChevronUp, ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortKey = "nome" | "nucleo" | "divisao" | "valorAnual" | "classificacao" | "fornecedor";
type SortDir = "asc" | "desc";

export default function MatrizConsulta() {
  const { sistemas } = useObzData();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [nucleoFilter, setNucleoFilter] = useState<string>("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("valorAnual");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const nucleos = [...new Set(sistemas.map(s => s.nucleo).filter(Boolean))].sort();
  const classes = [...new Set(sistemas.map(s => s.classificacao).filter(Boolean))].sort();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="inline h-3 w-3 ml-1 opacity-40" />;
    return sortDir === "desc"
      ? <ArrowDown className="inline h-3 w-3 ml-1 text-primary" />
      : <ArrowUp className="inline h-3 w-3 ml-1 text-primary" />;
  };

  const filtered = useMemo(() => {
    let result = sistemas.filter(s => {
      if (search && !s.nome.toLowerCase().includes(search.toLowerCase()) && !s.fornecedor.toLowerCase().includes(search.toLowerCase())) return false;
      if (classFilter !== "all" && s.classificacao !== classFilter) return false;
      if (nucleoFilter !== "all" && s.nucleo !== nucleoFilter) return false;
      return true;
    });

    result.sort((a, b) => {
      let aVal: any, bVal: any;
      if (sortKey === "valorAnual") {
        aVal = a.valorAnual; bVal = b.valorAnual;
      } else {
        aVal = (a[sortKey] || "").toLowerCase();
        bVal = (b[sortKey] || "").toLowerCase();
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [sistemas, search, classFilter, nucleoFilter, sortKey, sortDir]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-4">📋 Matriz OBZ — Consulta Detalhada</h3>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar sistema ou fornecedor..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 text-sm" />
        </div>
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-[180px] text-sm"><SelectValue placeholder="Classificação" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas classificações</SelectItem>
            {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={nucleoFilter} onValueChange={setNucleoFilter}>
          <SelectTrigger className="w-[140px] text-sm"><SelectValue placeholder="Núcleo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos núcleos</SelectItem>
            {nucleos.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-muted-foreground font-medium w-6"></th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium cursor-pointer select-none hover:text-foreground" onClick={() => handleSort("nome")}>
                Sistema <SortIcon col="nome" />
              </th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium cursor-pointer select-none hover:text-foreground" onClick={() => handleSort("nucleo")}>
                Núcleo <SortIcon col="nucleo" />
              </th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium cursor-pointer select-none hover:text-foreground" onClick={() => handleSort("divisao")}>
                Divisão <SortIcon col="divisao" />
              </th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium cursor-pointer select-none hover:text-foreground" onClick={() => handleSort("valorAnual")}>
                Valor Anual <SortIcon col="valorAnual" />
              </th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium cursor-pointer select-none hover:text-foreground" onClick={() => handleSort("classificacao")}>
                Classificação <SortIcon col="classificacao" />
              </th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium cursor-pointer select-none hover:text-foreground" onClick={() => handleSort("fornecedor")}>
                Fornecedor <SortIcon col="fornecedor" />
              </th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Sugestão</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const isExpanded = expandedRow === s.nome;
              return (
                <React.Fragment key={s.nome}>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setExpandedRow(isExpanded ? null : s.nome)}>
                    <td className="py-2 px-2">{isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}</td>
                    <td className="py-2 px-2 font-medium text-card-foreground">{s.nome}</td>
                    <td className="py-2 px-2 text-muted-foreground">{s.nucleo}</td>
                    <td className="py-2 px-2 text-muted-foreground">{s.divisao}</td>
                    <td className="py-2 px-2 text-right font-mono">{formatCurrency(s.valorAnual)}</td>
                    <td className="py-2 px-2 text-muted-foreground">{s.classificacao}</td>
                    <td className="py-2 px-2 text-muted-foreground">{s.fornecedor}</td>
                    <td className="py-2 px-2 text-muted-foreground max-w-[200px] truncate">{s.sugestao}</td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={8} className="p-0">
                        <div className="bg-muted/30 p-3 mx-2 mb-2 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-2">
                            <span className="font-medium">Contrato:</span> {s.contrato || "—"} | <span className="font-medium ml-2">Criticidade:</span> {s.criticidade} | <span className="font-medium ml-2">Renegociado:</span> {s.renegociado || "—"}
                          </p>
                          <table className="w-full text-[11px]">
                            <thead>
                              <tr className="border-b border-border/50">
                                <th className="text-left py-1 px-1 text-muted-foreground">Mês</th>
                                {meses.map(m => <th key={m} className="text-right py-1 px-1 text-muted-foreground">{m}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-1 px-1 font-medium">Previsto</td>
                                {s.mensal.map((m, i) => (<td key={i} className="py-1 px-1 text-right font-mono">{m.previsto > 0 ? formatCurrency(m.previsto) : "—"}</td>))}
                              </tr>
                              <tr>
                                <td className="py-1 px-1 font-medium">Realizado</td>
                                {s.mensal.map((m, i) => (<td key={i} className="py-1 px-1 text-right font-mono">{m.realizado > 0 ? formatCurrency(m.realizado) : "—"}</td>))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-2">{filtered.length} de {sistemas.length} sistemas</p>
      </div>
    </div>
  );
}

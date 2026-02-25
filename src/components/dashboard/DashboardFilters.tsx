import { useObzData, formatCurrency, meses } from "@/context/ObzDataContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  mesFilter: number | null;
  setMesFilter: (v: number | null) => void;
  classificacaoFilter: string | null;
  setClassificacaoFilter: (v: string | null) => void;
}

export default function DashboardFilters({ mesFilter, setMesFilter, classificacaoFilter, setClassificacaoFilter }: Props) {
  const { classificacoes } = useObzData();

  return (
    <div className="flex flex-wrap gap-3">
      <Select value={mesFilter !== null ? String(mesFilter) : "all"} onValueChange={(v) => setMesFilter(v === "all" ? null : Number(v))}>
        <SelectTrigger className="w-[140px] bg-card text-sm">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os meses</SelectItem>
          {meses.map((m, i) => (<SelectItem key={i} value={String(i)}>{m}</SelectItem>))}
        </SelectContent>
      </Select>

      <Select value={classificacaoFilter || "all"} onValueChange={(v) => setClassificacaoFilter(v === "all" ? null : v)}>
        <SelectTrigger className="w-[180px] bg-card text-sm">
          <SelectValue placeholder="Classificação" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas classificações</SelectItem>
          {classificacoes.map((c) => (<SelectItem key={c.nome} value={c.nome}>{c.nome}</SelectItem>))}
        </SelectContent>
      </Select>
    </div>
  );
}

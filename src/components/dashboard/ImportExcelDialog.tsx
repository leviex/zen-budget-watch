import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Upload, Download, CheckCircle } from "lucide-react";
import { validateAndParseExcel, mergeSistemas, generateTemplateXlsx, type ImportResult } from "@/lib/excelImport";
import { useObzData, formatCurrency } from "@/context/ObzDataContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ImportExcelDialog({ open, onOpenChange }: Props) {
  const { sistemas, totalOrcado, setSistemas, setClassificacoes, setTotalOrcado, setMaturidadeIndex, addImportLog } = useObzData();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [mode, setMode] = useState<"substituir" | "mesclar">("substituir");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast({ title: "Arquivo muito grande", description: "O limite é 20 MB.", variant: "destructive" });
      return;
    }

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      toast({ title: "Formato inválido", description: "Aceite apenas arquivos .xlsx", variant: "destructive" });
      return;
    }

    setLoading(true);
    setFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const res = validateAndParseExcel(buffer);
      setResult(res);
    } catch {
      setResult({ valid: false, errors: [{ sheet: "Arquivo", message: "Erro ao processar arquivo." }] });
    }
    setLoading(false);
  };

  const handleImport = () => {
    if (!result?.valid || !result.sistemas) return;

    const finalSistemas = mode === "mesclar" 
      ? mergeSistemas(sistemas, result.sistemas) 
      : result.sistemas;

    setSistemas(finalSistemas);
    if (result.classificacoes) setClassificacoes(result.classificacoes);
    setTotalOrcado(result.totalOrcado || finalSistemas.reduce((s, si) => s + si.valorAnual, 0));
    if (result.maturidadeIndex) setMaturidadeIndex(result.maturidadeIndex);

    addImportLog({
      data: new Date().toISOString(),
      arquivo: fileName,
      linhas: result.rowCount || 0,
      modo: mode,
    });

    toast({ title: "Importação concluída", description: "Dashboard atualizado com os novos dados." });
    setResult(null);
    onOpenChange(false);
  };

  const handleDownloadTemplate = () => {
    const buffer = generateTemplateXlsx();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "OBZ_TI_Modelo.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const variation = result?.valid && result.totalOrcado
    ? ((result.totalOrcado - totalOrcado) / totalOrcado * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importar Excel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFile}
          />

          {!result && (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={loading}>
                {loading ? "Processando..." : "Selecionar arquivo .xlsx"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Máximo: 20 MB</p>
            </div>
          )}

          {result && !result.valid && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold text-sm">Modelo inválido</span>
              </div>
              <div className="bg-destructive/5 rounded-lg p-3 space-y-1">
                {result.errors.map((e, i) => (
                  <p key={i} className="text-xs text-card-foreground">
                    <span className="font-medium">{e.sheet}:</span> {e.message}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                  <Download className="h-4 w-4 mr-1" /> Baixar modelo (.xlsx)
                </Button>
                <Button variant="outline" size="sm" onClick={() => { setResult(null); fileRef.current?.click(); }}>
                  Tentar outro arquivo
                </Button>
              </div>
            </div>
          )}

          {result?.valid && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold text-sm">Arquivo válido — {result.rowCount} sistemas</span>
              </div>

              {/* Preview */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total TI (novo):</span>
                  <span className="font-mono font-medium">{formatCurrency(result.totalOrcado || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Variação vs base atual:</span>
                  <span className={`font-mono font-medium ${variation > 0 ? 'text-danger' : 'text-success'}`}>
                    {variation > 0 ? '+' : ''}{variation.toFixed(1)}%
                  </span>
                </div>
                {result.maturidadeIndex && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IMOTi:</span>
                    <span className="font-mono font-medium">{result.maturidadeIndex}</span>
                  </div>
                )}
              </div>

              {/* Mode selection */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-card-foreground">Modo de atualização:</p>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === "substituir"}
                    onChange={() => setMode("substituir")}
                    className="accent-primary"
                  />
                  Substituir base (padrão)
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === "mesclar"}
                    onChange={() => setMode("mesclar")}
                    className="accent-primary"
                  />
                  Mesclar (append por chave: Sistema)
                </label>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => { setResult(null); onOpenChange(false); }}>
            Cancelar
          </Button>
          {result?.valid && (
            <Button onClick={handleImport}>
              Importar e Atualizar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

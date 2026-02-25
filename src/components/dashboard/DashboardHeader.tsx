import { useState } from "react";
import { BarChart3, Upload, FileDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTemplateXlsx } from "@/lib/excelImport";
import { exportDashboardToPDF } from "@/lib/pdfExport";
import ImportExcelDialog from "./ImportExcelDialog";
import { useToast } from "@/hooks/use-toast";

export default function DashboardHeader() {
  const [importOpen, setImportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const filename = await exportDashboardToPDF();
      toast({ title: "PDF exportado", description: `Arquivo: ${filename}` });
    } catch (e: any) {
      toast({ title: "Erro ao exportar", description: e.message, variant: "destructive" });
    }
    setExporting(false);
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

  return (
    <>
      <div className="gradient-header rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/10 rounded-lg p-2.5">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
                Dashboard OBZ — Tecnologia da Informação
              </h1>
              <p className="text-sm text-primary-foreground/70">
                SENAC RN · Orçamento Base Zero 2026 · Diretoria Regional
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setImportOpen(true)}
              className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
            >
              <Upload className="h-4 w-4 mr-1" /> Importar Excel
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportPDF}
              disabled={exporting}
              className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
            >
              <FileDown className="h-4 w-4 mr-1" /> {exporting ? "Gerando..." : "Exportar PDF"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDownloadTemplate}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Download className="h-4 w-4 mr-1" /> Modelo
            </Button>
          </div>
        </div>
      </div>
      <ImportExcelDialog open={importOpen} onOpenChange={setImportOpen} />
    </>
  );
}

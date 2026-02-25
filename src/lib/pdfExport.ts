import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportDashboardToPDF(): Promise<string> {
  const dashboard = document.getElementById("dashboard-container");
  if (!dashboard) throw new Error("Dashboard container not found");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const margin = 8;
  const contentWidth = pageWidth - margin * 2;
  const headerHeight = 14;
  const footerHeight = 10;
  const usableHeight = pageHeight - margin - headerHeight - footerHeight;

  // Get all sections
  const sections = dashboard.querySelectorAll<HTMLElement>("[data-pdf-section]");
  const sectionGroups: HTMLElement[][] = [[], [], []];

  sections.forEach((el) => {
    const page = parseInt(el.getAttribute("data-pdf-page") || "1", 10);
    if (page >= 1 && page <= 3) {
      sectionGroups[page - 1].push(el);
    }
  });

  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  for (let pageIdx = 0; pageIdx < sectionGroups.length; pageIdx++) {
    if (pageIdx > 0) pdf.addPage();

    // Header
    pdf.setFillColor(26, 58, 92); // primary dark
    pdf.rect(0, 0, pageWidth, headerHeight + margin, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("OBZ de TI — SENAC RN", margin, margin + 6);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Exercício 2026 · Gerado em ${dateStr}`, margin, margin + 11);
    pdf.text(`Página ${pageIdx + 1} de 3`, pageWidth - margin - 25, margin + 6);

    // Render sections
    let yOffset = headerHeight + margin + 2;

    for (const section of sectionGroups[pageIdx]) {
      try {
        const canvas = await html2canvas(section, {
          scale: 2,
          backgroundColor: "#ffffff",
          logging: false,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height / canvas.width) * imgWidth;
        const finalHeight = Math.min(imgHeight, usableHeight - (yOffset - headerHeight - margin));

        pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, finalHeight);
        yOffset += finalHeight + 3;
      } catch (e) {
        console.warn("Failed to render section:", e);
      }
    }

    // Footer
    const footerY = pageHeight - footerHeight;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, footerY, pageWidth - margin, footerY);
    pdf.setTextColor(120, 120, 120);
    pdf.setFontSize(6);
    pdf.text("Semáforo: 🟢 Desvio ≤5%  🟡 Desvio 5–10%  🔴 Desvio >10%", margin, footerY + 4);
    pdf.text(`Dashboard OBZ TI · ${window.location.href}`, pageWidth - margin - 60, footerY + 4);
  }

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const filename = `OBZ_TI_SENAC_RN_${now.getFullYear()}-${month}_v1.pdf`;
  pdf.save(filename);
  return filename;
}

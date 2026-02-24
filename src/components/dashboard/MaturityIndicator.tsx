import { maturidadeIndex } from "@/data/obzData";

export default function MaturityIndicator() {
  const levels = [
    { label: "Baixa", range: "0–49", color: "bg-danger" },
    { label: "Inicial", range: "50–69", color: "bg-warning" },
    { label: "Gerenciada", range: "70–84", color: "bg-primary" },
    { label: "Alta / Estratégica", range: "85–100", color: "bg-success" },
  ];

  const currentLevel = maturidadeIndex < 50 ? 0 : maturidadeIndex < 70 ? 1 : maturidadeIndex < 85 ? 2 : 3;

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-base font-semibold text-card-foreground mb-2">Índice de Maturidade Financeira TI</h3>
      <p className="text-xs text-muted-foreground mb-4">IMOTI = (40×0,25)+(90×0,30)+(85×0,20)+(44×0,25)</p>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="hsl(210 15% 93%)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={maturidadeIndex < 50 ? "hsl(0 72% 51%)" : maturidadeIndex < 70 ? "hsl(38 92% 50%)" : maturidadeIndex < 85 ? "hsl(213 60% 18%)" : "hsl(152 60% 40%)"}
              strokeWidth="3"
              strokeDasharray={`${maturidadeIndex}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-card-foreground">{maturidadeIndex}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          {levels.map((l, i) => (
            <div key={l.label} className={`flex items-center gap-2 text-xs ${i === currentLevel ? "font-bold" : ""}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
              <span className="text-card-foreground">{l.label}</span>
              <span className="text-muted-foreground">({l.range})</span>
              {i === currentLevel && <span className="text-xs text-warning">← Atual</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Dumbbell, Pencil, Activity, Shield, Salad, Timer } from "lucide-react";
import { defaults } from "../store/planDefaults";
import { KEYS } from "../store/planKeys";
import type { Equip } from "../store/planTypes";
import { usePersistedState } from "../hooks/usePersistedState";
import { Section } from "../components/Section";
import { EditableList } from "../components/EditableList";
import { Toolbar } from "../components/Toolbar";

export default function Planner(){
  const [open, setOpen] = usePersistedState<string|null>(KEYS.uiOpen, "personalizar");
  const [goal, setGoal]   = usePersistedState(KEYS.goal, defaults.goal);
  const [xp, setXp]       = usePersistedState(KEYS.xp, defaults.xp);
  const [focus, setFocus] = usePersistedState(KEYS.focus, defaults.focus);
  const [equip, setEquip] = usePersistedState<Equip>(KEYS.equip, defaults.equip);
  const [upper1, setUpper1] = usePersistedState(KEYS.upper1, defaults.upper1);
  const [lower1, setLower1] = usePersistedState(KEYS.lower1, defaults.lower1);
  const [upper2, setUpper2] = usePersistedState(KEYS.upper2, defaults.upper2);
  const [lower2, setLower2] = usePersistedState(KEYS.lower2, defaults.lower2);

  const exportJSON = () => {
    const data = { goal, xp, focus, equip, upper1, lower1, upper2, lower2 };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "rutina-ulul-core.json"; a.click(); URL.revokeObjectURL(url);
  };
  const importJSON = async (file: File) => {
    try {
      const obj = JSON.parse(await file.text());
      if (obj.goal) setGoal(obj.goal);
      if (obj.xp) setXp(obj.xp);
      if (Array.isArray(obj.focus)) setFocus(obj.focus);
      if (obj.equip) setEquip(obj.equip);
      if (Array.isArray(obj.upper1)) setUpper1(obj.upper1);
      if (Array.isArray(obj.lower1)) setLower1(obj.lower1);
      if (Array.isArray(obj.upper2)) setUpper2(obj.upper2);
      if (Array.isArray(obj.lower2)) setLower2(obj.lower2);
    } catch { alert("Archivo inválido"); }
  };
  const resetPlan = () => {
    if (!confirm("¿Restaurar rutina a valores por defecto?")) return;
    setGoal(defaults.goal); setXp(defaults.xp); setFocus(defaults.focus);
    setEquip(defaults.equip); setUpper1(defaults.upper1); setLower1(defaults.lower1);
    setUpper2(defaults.upper2); setLower2(defaults.lower2);
  };

  const Chip = ({ onClick, active, children }: any) => (
    <button onClick={onClick} className={`px-3 py-1 rounded-full border text-sm ${active ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-transparent"}`}>{children}</button>
  );

  const SuggestedIsolates = () => {
    const opts: Record<string, string[]> = {
      brazos: ["Curl barra","Curl alterno","Curl en polea","Tríceps soga","Tríceps overhead"],
      hombros: ["Elevaciones laterales","Face pull","Rear delt fly"],
      espalda: ["Pullover polea","Remo mancuerna"],
      gluteos: ["Hip thrust","Abducción en polea/banda"],
    };
    const flat = focus.flatMap((k) => opts[k] || []);
    const byEquip = flat.filter((x) => {
      if (x.includes("polea") && !equip.polea) return false;
      if (x.includes("banda") && !equip.bandas) return false;
      return true;
    });
    return (
      <div className="flex flex-wrap gap-2">
        {byEquip.map((x)=>(<span key={x} className="px-2 py-1 rounded-full border text-xs border-zinc-300 dark:border-zinc-600">{x}</span>))}
        {byEquip.length===0 && <span className="text-sm opacity-70">Seleccioná equipo / focos para ver sugerencias.</span>}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-50 p-6">
      <div className="max-w-5xl mx-auto grid gap-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Rutina Upper/Lower (ULUL) + Core sin crunches</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Cambios <b>persistentes</b> en este dispositivo. Exportá/Importá para backup.</p>
          </div>
          <Dumbbell className="w-8 h-8" />
        </header>

        <Toolbar onExport={exportJSON} onImport={importJSON} onReset={resetPlan} />

        <Section id="personalizar" title="Personalizar objetivo, experiencia y equipo" icon={Pencil} open={open} setOpen={setOpen}>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <label className="text-sm opacity-70">Objetivo</label>
              <div className="flex gap-2 flex-wrap">
                {(["masa","fuerza","definicion"] as const).map((g)=>(<Chip key={g} active={goal===g} onClick={()=>setGoal(g)}>{g}</Chip>))}
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm opacity-70">Experiencia</label>
              <div className="flex gap-2 flex-wrap">
                {(["novato","intermedio","avanzado"] as const).map((g)=>(<Chip key={g} active={xp===g} onClick={()=>setXp(g)}>{g}</Chip>))}
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm opacity-70">Foco estético / débil</label>
              <div className="flex gap-2 flex-wrap">
                {(["brazos","hombros","espalda","gluteos"] as const).map((k)=>(
                  <Chip key={k} active={focus.includes(k)} onClick={()=> setFocus((f)=> f.includes(k) ? f.filter((x)=>x!==k) : [...f,k])}>{k}</Chip>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-2 mt-4">
            {([
              ["barra","Barra/Multipower"],
              ["mancuernas","Mancuernas"],
              ["polea","Polea/Cables"],
              ["bandas","Bandas elásticas"],
              ["ruedaAb","Rueda abdominal"],
            ] as [keyof Equip, string][]).map(([k,lbl])=>(
              <label key={k} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={equip[k]} onChange={(e)=> setEquip({ ...equip, [k]: (e.target as HTMLInputElement).checked })} />
                {lbl}
              </label>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-sm mb-2 opacity-70">Sugerencias de aislados según foco y equipo:</p>
            <SuggestedIsolates />
          </div>
        </Section>

        <Section id="ulul" title="Plan semanal ULUL (editable)" icon={Activity} open={open} setOpen={setOpen}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Upper 1 (empuje) – 60–75 min</h3>
              <EditableList list={upper1} setList={setUpper1} />
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Lower 1 – 60–75 min</h3>
              <EditableList list={lower1} setList={setLower1} />
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Upper 2 (tirón) – 60–75 min</h3>
              <EditableList list={upper2} setList={setUpper2} />
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Lower 2 – 60–75 min</h3>
              <EditableList list={lower2} setList={setLower2} />
            </div>
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-3">
            <p><b>Progresión:</b> al llegar al tope del rango, subí +2–2,5 kg la próxima sesión (o +1 rep). Semana de descarga cada 6–8 semanas si estás muy cargado.</p>
          </div>
        </Section>

        <Section id="core" title="Core A/B/C (sin crunches)" icon={Shield} open={open} setOpen={setOpen}>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Core A – Anti-extensión + Anti-rotación</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Dead bug 3×8–10/lado (pausa 2 s)</li>
                <li>Pallof press 3×10–12/lado (2–3 s en extensión)</li>
              </ul>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Core B – Carries + Lateral</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Suitcase carry 3×20–40 m/lado</li>
                <li>Plancha lateral 3×20–40 s/lado</li>
              </ul>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Core C – Rueda/Rotación</h3>
              <ul className="list-disc ml-5 space-y-1 text sm">
                <li>Rueda ab 3×6–10 (o Body saw)</li>
                <li>Landmine rotations 3×8–12/lado</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="protein" title="Proteína & timing (práctico)" icon={Salad} open={open} setOpen={setOpen}>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Objetivo diario</h3>
              <p>1,6–2,2 g/kg de peso corporal. 3–5 tomas de 25–35 g. La proteína en polvo solo te ayuda a llegar al total.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Timing sugerido</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>20–40 g dentro de las 2 h post-entreno.</li>
                <li>Creatina 3–5 g/día, cuando sea.</li>
                <li>Pre-entreno: 30–60 g de carbo 1–2 h antes.</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="extra" title="Condición opcional & hábitos" icon={Timer} open={open} setOpen={setOpen}>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Condición</h3>
              <p>1–2 sesiones/semana: 10–15 min intervals o 20–30 min Z2. 8–15k pasos/día.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold mb-2">Sueño & recuperación</h3>
              <p>7–9 h de sueño. Hidratación + sodio adecuado. Semana de descarga cada 6–8 si te sentís saturado.</p>
            </div>
          </div>
        </Section>

        <footer className="text-xs text-zinc-500 text-center pt-2">Hecho para vos • Cambios persistentes (localStorage). Exportá/Importá para backup o migración.</footer>
      </div>
    </div>
  );
}

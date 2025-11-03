import type { Plan, Item } from "./planTypes";
const uid = () => Math.random().toString(36).slice(2, 9);
const makeList = (arr: string[]): Item[] => arr.map((t) => ({ id: uid(), text: t }));
export const defaults: Plan = {
  goal: "masa",
  xp: "intermedio",
  focus: ["hombros","brazos"],
  equip: { barra: true, mancuernas: true, polea: true, bandas: false, ruedaAb: false },
  upper1: makeList([
    "Banca 5×5 (2–3′ desc)",
    "Remo con barra 4×6–8",
    "Press militar 3×8–10",
    "Jalón al pecho 3×8–10",
    "Aislados: laterales 3×12, tríceps soga 3×10–12, curl barra 2×12",
    "Core A – 8–12 min",
  ]),
  lower1: makeList([
    "Sentadilla 5×5",
    "Peso muerto rumano 4×6–8",
    "Prensa 3×10–12",
    "Gemelos 4×10–15",
    "Core B – 8–12 min",
  ]),
  upper2: makeList([
    "Banca inclinada 4×6–8",
    "Dominadas 4×6–10",
    "Press mancuernas 3×8–10",
    "Remo en polea 3×8–10",
    "Aislados: face pull 3×12–15, curl polea 3×10–12, tríceps overhead 2×12",
    "Core C – 8–12 min",
  ]),
  lower2: makeList([
    "Sentadilla frontal 4×6–8",
    "Peso muerto 3×3–5",
    "Zancadas 3×10–12/ pierna",
    "Gemelos 4×10–15",
    "Core B o movilidad – 8–12 min",
  ]),
};

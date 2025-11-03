export type Equip = { barra: boolean; mancuernas: boolean; polea: boolean; bandas: boolean; ruedaAb: boolean; };
export type Item = { id: string; text: string };
export type Plan = {
  goal: "masa" | "fuerza" | "definicion";
  xp: "novato" | "intermedio" | "avanzado";
  focus: Array<"brazos"|"hombros"|"espalda"|"gluteos">;
  equip: Equip;
  upper1: Item[]; lower1: Item[]; upper2: Item[]; lower2: Item[];
};

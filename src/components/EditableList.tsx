import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Item } from "../store/planTypes";
export function EditableList({ list, setList }:{ list: Item[]; setList: (next: Item[])=>void; }){
  const add = ()=> setList([...list, { id: Math.random().toString(36).slice(2,9), text: "Nuevo ejercicio x series x reps" }]);
  const del = (id:string)=> setList(list.filter((i)=> i.id!==id));
  const edit = (id:string, text:string)=> setList(list.map((i)=> i.id===id? { ...i, text } : i));
  return (
    <div className="grid gap-2">
      {list.map((it)=>(
        <div key={it.id} className="flex items-center gap-2">
          <Pencil className="w-4 h-4 opacity-60"/>          <input value={it.text} onChange={(e)=>edit(it.id, e.target.value)} className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-md px-3 py-2 border border-zinc-200 dark:border-zinc-700"/>
          <button onClick={()=>del(it.id)} className="p-2 rounded-md border border-zinc-200 dark:border-zinc-700"><Trash2 className="w-4 h-4"/></button>
        </div>
      ))}
      <button onClick={add} className="mt-1 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-zinc-300 dark:border-zinc-700"><Plus className="w-4 h-4"/>Agregar ejercicio</button>
    </div>
  );
}

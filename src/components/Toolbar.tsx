import { Save, Upload, RotateCcw } from "lucide-react";
import { useRef } from "react";
export function Toolbar({ onExport, onImport, onReset }:{ onExport: ()=>void; onImport: (file: File)=>void; onReset: ()=>void; }){
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={onExport} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700"><Save className="w-4 h-4"/>Exportar rutina</button>
      <button onClick={()=>fileRef.current?.click()} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700"><Upload className="w-4 h-4"/>Importar rutina</button>
      <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e)=> e.target.files && onImport(e.target.files[0])} />
      <button onClick={onReset} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700"><RotateCcw className="w-4 h-4"/>Restablecer</button>
    </div>
  );
}

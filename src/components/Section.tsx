import { ChevronRight, ChevronDown } from "lucide-react";
export function Section({ id, title, icon: Icon, open, setOpen, children }:{
  id: string; title: string; icon: any; open: string | null; setOpen: (id: string | null)=>void; children: React.ReactNode;
}){
  const expanded = open === id;
  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow p-5 border border-zinc-200 dark:border-zinc-800">
      <button onClick={()=>setOpen(expanded? null : id)} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3"><Icon className="w-6 h-6"/><h2 className="text-xl font-semibold">{title}</h2></div>
        {expanded ? <ChevronDown className="w-5 h-5"/> : <ChevronRight className="w-5 h-5"/>}
      </button>
      <div className={`transition-all overflow-hidden ${expanded ? "mt-4" : "max-h-0"}`}>{expanded && children}</div>
    </div>
  );
}

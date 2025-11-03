import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
export function useCapacitorState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { (async () => {
    try { const { value } = await Preferences.get({ key }); setState(value ? (JSON.parse(value) as T) : initial); }
    finally { setLoaded(true); }
  })(); }, [key]);
  useEffect(() => { if (!loaded) return; Preferences.set({ key, value: JSON.stringify(state) }).catch(()=>{}); }, [key, state, loaded]);
  return [state, setState, loaded] as const;
}

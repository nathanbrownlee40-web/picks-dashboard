import { useEffect, useState } from "react";

const STORAGE_KEY = "picks-tracker";

export default function useTracker() {
  const [tracker, setTracker] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
  }, [tracker]);

  const addPick = (pick) => {
    setTracker((prev) => {
      if (prev.find(p => p.id === pick.id)) return prev;
      return [...prev, pick];
    });
  };

  const removePick = (id) => {
    setTracker((prev) => prev.filter(p => p.id !== id));
  };

  const clearTracker = () => setTracker([]);

  return {
    tracker,
    addPick,
    removePick,
    clearTracker,
  };
}


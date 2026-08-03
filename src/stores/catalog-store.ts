import { create } from "zustand";

import type { ToolCategory } from "@/types/tool";

type CatalogState = {
  query: string;
  category: ToolCategory | "all";
  setQuery: (query: string) => void;
  setCategory: (category: ToolCategory | "all") => void;
  resetFilters: () => void;
};

export const useCatalogStore = create<CatalogState>((set) => ({
  query: "",
  category: "all",
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
  resetFilters: () => set({ query: "", category: "all" }),
}));

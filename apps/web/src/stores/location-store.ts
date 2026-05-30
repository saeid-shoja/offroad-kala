'use client';

import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

const STORAGE_KEY = 'offroad-selected-cities';

/** Supports legacy plain string[] localStorage shape */
const locationStorage: StateStorage = {
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as
        | {
            state?: { selectedCities?: string[] };
          }
        | string[];
      if (!Array.isArray(parsed) && parsed.state) return raw;
      if (Array.isArray(parsed)) {
        return JSON.stringify({
          state: { selectedCities: parsed.filter((c) => typeof c === 'string') },
          version: 0,
        });
      }
    } catch {
      /* ignore */
    }
    return raw;
  },
  setItem: (name, value) => localStorage.setItem(name, value),
  removeItem: (name) => localStorage.removeItem(name),
};

type LocationState = {
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  toggleCity: (city: string) => void;
  clearCities: () => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      selectedCities: [],

      setSelectedCities: (cities) => set({ selectedCities: [...new Set(cities)] }),

      toggleCity: (city) => {
        const { selectedCities } = get();
        set({
          selectedCities: selectedCities.includes(city)
            ? selectedCities.filter((c) => c !== city)
            : [...selectedCities, city],
        });
      },

      clearCities: () => set({ selectedCities: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => locationStorage),
      partialize: (state) => ({ selectedCities: state.selectedCities }),
    },
  ),
);

/** Convenience hook with derived hasFilter */
export function useLocationFilter() {
  const selectedCities = useLocationStore((s) => s.selectedCities);
  const setSelectedCities = useLocationStore((s) => s.setSelectedCities);
  const toggleCity = useLocationStore((s) => s.toggleCity);
  const clearCities = useLocationStore((s) => s.clearCities);

  return {
    selectedCities,
    setSelectedCities,
    toggleCity,
    clearCities,
    hasFilter: selectedCities.length > 0,
  };
}

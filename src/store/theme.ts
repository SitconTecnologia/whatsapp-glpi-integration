import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeColor = 'blue' | 'purple' | 'green' | 'orange';

interface ThemeState {
  isDark: boolean;
  primaryColor: ThemeColor;
  toggleTheme: () => void;
  setPrimaryColor: (color: ThemeColor) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      primaryColor: 'blue',
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setPrimaryColor: (color) => set({ primaryColor: color }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
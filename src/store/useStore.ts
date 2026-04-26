import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedJurisdiction: string;
  setSelectedJurisdiction: (j: string) => void;
  flowProgress: Record<string, Record<string, boolean>>; // flowId -> stepId -> boolean
  toggleChecklistItem: (flowId: string, itemId: string) => void;
  resetFlowProgress: (flowId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedJurisdiction: 'all',
      setSelectedJurisdiction: (j) => set({ selectedJurisdiction: j }),
      flowProgress: {},
      toggleChecklistItem: (flowId, itemId) => 
        set((state) => {
          const flow = state.flowProgress[flowId] || {};
          return {
            flowProgress: {
              ...state.flowProgress,
              [flowId]: {
                ...flow,
                [itemId]: !flow[itemId]
              }
            }
          };
        }),
      resetFlowProgress: (flowId) =>
        set((state) => {
          const newProgress = { ...state.flowProgress };
          delete newProgress[flowId];
          return { flowProgress: newProgress };
        })
    }),
    {
      name: 'civic-guide-store',
    }
  )
);

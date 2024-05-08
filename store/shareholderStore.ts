import { create } from "zustand";

import { Shareholder } from "../schema/shareholders";

export type ActionResponse = {
  data?: any;
  error?: any;
  alert?: { message: string; variant: any };
};
export interface ShareholderStore {
  isLoading: boolean;
  actions: {
    fetchShareholder: (userId: number) => Promise<ActionResponse>;
    createShareholder: (user: Shareholder) => Promise<ActionResponse>;
    updateShareholder: (user: Shareholder) => Promise<ActionResponse>;
    deleteShareholder: (user: Shareholder) => Promise<ActionResponse>;
  };
}

const buildError = async (response: Response) => ({ ...(await response.json()), status: response.status });

const useShareholderStore = create<ShareholderStore>((set, get) => ({
  isLoading: false,
  actions: {
    fetchShareholder: async (id: number) => {
      set({ isLoading: true });
      const response = await fetch(`/api/shareholders/${id}`, { method: "GET" });
      if (response.ok) {
        const shareholder = await response.json();
        set({ isLoading: false });
        return { data: shareholder };
      } else {
        set({ isLoading: false });
        return { error: await buildError(response) };
      }
    },
    createShareholder: async (shareholder: Shareholder) => {
      set({ isLoading: true });
      const response = await fetch(`/api/shareholders`, {
        method: "POST",
        body: JSON.stringify(shareholder),
      });
      if (response.ok) {
        const shareholder = await response.json();
        set({ isLoading: false });
        return {
          data: shareholder,
          alert: { message: `User ${shareholder.name} successfully created`, variant: "success" },
        };
      } else {
        set({ isLoading: false });
        return { error: await buildError(response) };
      }
    },
    updateShareholder: async (user: Shareholder) => {
      set({ isLoading: true });
      const response = await fetch(`/api/shareholders/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
      });
      if (response.ok) {
        set({ isLoading: false });
        return { alert: { message: `User ${user.name} successfully updated`, variant: "success" } };
      } else {
        set({ isLoading: false });
        return { error: await buildError(response) };
      }
    },
    deleteShareholder: async (user: Shareholder) => {
      set({ isLoading: true });
      const response = await fetch(`/api/shareholders/${user.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        set({ isLoading: false });
        return { alert: { message: `User ${user.name} successfully deleted`, variant: "success" } };
      } else {
        set({ isLoading: false });
        return { error: await buildError(response) };
      }
    },
  },
}));

export default useShareholderStore;

export const useActions = () => useShareholderStore((state) => state.actions);

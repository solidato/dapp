import { create } from "zustand";

interface BlockchainTransaction {
  isLoading: boolean;
  isAwaitingConfirmation: boolean;
  reset: () => void;
  set: (isLoading: boolean, isAwaitingConfirmation: boolean) => void;
}

const useBlockchainTransactionStore = create<BlockchainTransaction>((set) => ({
  isLoading: false,
  isAwaitingConfirmation: false,
  reset: () => set({ isLoading: false, isAwaitingConfirmation: false }),
  set: (isLoading, isAwaitingConfirmation) => set({ isLoading, isAwaitingConfirmation }),
}));

export default useBlockchainTransactionStore;

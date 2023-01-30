import { create } from "zustand";

interface LoginModal {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  handleOpenLoginModalFromLink: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

const useLoginModalStore = create<LoginModal>((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  handleOpenLoginModalFromLink: (evt) => {
    evt.preventDefault();
    set({ isLoginModalOpen: true });
  },
}));

export default useLoginModalStore;

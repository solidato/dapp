import { create } from "zustand";

interface LoginModal {
  isLoginModalOpen: boolean;
  isReadyToSign: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  setIsReadyToSign: (isReadyToSign: boolean) => void;
  handleOpenLoginModalFromLink: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

const useLoginModalStore = create<LoginModal>((set) => ({
  isLoginModalOpen: false,
  isReadyToSign: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  setIsReadyToSign: (isReadyToSign: boolean) => set({ isReadyToSign }),
  handleOpenLoginModalFromLink: (evt) => {
    evt.preventDefault();
    set({ isLoginModalOpen: true });
  },
}));

export default useLoginModalStore;

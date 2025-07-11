import { create } from "zustand";

type OnConfirmHandler = (
  props: Omit<ConfirmStoreState, "isOpen" | "resolver"> & {
    onConfirm?: () => Promise<unknown> | unknown;
    onCancel?: () => Promise<unknown> | unknown;
  }
) => Promise<unknown>;

interface ConfirmStoreState {
  isOpen: boolean;
  title: string;
  description: string;
  resolver: (isConfirm: boolean) => void;
}

interface ConfirmStoreAction {
  requestConfirm: OnConfirmHandler;
}

const defaultConfirmState: ConfirmStoreState = {
  isOpen: false,
  title: "",
  description: "",
  resolver: () => {},
};

const useConfirmStore = create<ConfirmStoreState & ConfirmStoreAction>((set) => ({
  ...defaultConfirmState,
  requestConfirm: async ({ onCancel, onConfirm, ...props }) => {
    set({ isOpen: true, ...props });
    const isConfirm = await new Promise<boolean>((resolve) => {
      set({ resolver: resolve });
    });
    set({ isOpen: false });

    const handler = isConfirm ? onConfirm : onCancel;
    return handler?.();
  },
}));

export const useConfirm = () => {
  const { isOpen, requestConfirm } = useConfirmStore();
  return { isOpen, requestConfirm };
};

export const useConfirmProvider = () => {
  return useConfirmStore();
};

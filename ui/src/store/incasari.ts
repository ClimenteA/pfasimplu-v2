import { create } from "zustand";

export interface IFisier {
  id?: number;
  url_fisier?: string;
}

interface IStoreFileUpload {
  data: IFisier;
  fileDropped: boolean;
  setFileWasDropped: () => void;
  resetFileDropped: () => void;
  setData: (responseData: IFisier) => void;
  resetData: () => void;
}

export const useStoreFileUpload = create<IStoreFileUpload>((set) => ({
  data: {},
  fileDropped: false,  
  setFileWasDropped: () => {
    set({ fileDropped: true });
  },
  resetFileDropped: () => {
    set({ fileDropped: false });
  },
  setData: (responseData) => {
    set({ data: responseData });
  },
  resetData: () => {
    set({ data: {} });
  },
}));

import { create } from "zustand";

interface IIncasare {
  id?: number
  serie?: string
  numar?: string
  suma_incasata?: number
  nume_fisier?: string
  adaugat_la?: string
  url_fisier?: string
}

interface IStoreFileUpload {
  data: IIncasare
  fileDropped: boolean
  setFileWasDropped: () => void
  resetFileDropped: () => void
  setData: (responseData: IIncasare) => void
  resetData: () => void
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


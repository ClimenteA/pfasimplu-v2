import { create } from "zustand";


export interface IIncasare {
  id?: number
  serie_factura?: string
  numar_factura?: number
  suma_incasata?: number
  tip_tranzactie?: string
  sursa_venit?: string
  nume_fisier?: string
  data_incasare?: string
  data_emitere_factura?: string
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


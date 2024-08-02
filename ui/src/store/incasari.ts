import { create } from "zustand";

export interface IFisier {
  id?: number;
  nume_fisier?: string;
  url_fisier?: string;
}

export interface IIncasare extends IFisier {
  sursa_venit?: string;
  suma_incasata?: number;
  moneda?: string;
  adaugat_la?: string;
  tip_tranzactie?: string;
  data_incasare?: string;
}

interface IStoreFileUpload {
  data: IIncasare;
  urlFisierIncarcat?: string;
  setUrlFisierIncarcat: (url: string) => void;
  resetUrlFisierIncarcat: () => void;
  fileDropped: boolean;
  setFileWasDropped: () => void;
  resetFileDropped: () => void;
  setData: (responseData: IFisier) => void;
  resetData: () => void;
}

export const useStoreFileUpload = create<IStoreFileUpload>((set) => ({
  data: {},
  urlFisierIncarcat: undefined,
  fileDropped: false,
  setUrlFisierIncarcat: (url: string) => {
    set({ urlFisierIncarcat: url });
  },
  resetUrlFisierIncarcat: () => {
    set({ urlFisierIncarcat: undefined });
  },
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

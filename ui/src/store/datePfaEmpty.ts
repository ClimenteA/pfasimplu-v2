import { create } from "zustand";

interface IStoreDatePFA {
  datePFA: boolean;
  noDatePFA: () => void;
  hasDatePFA: () => void;
}

export const useStoreDatePFA = create<IStoreDatePFA>((set) => ({
  datePFA: false,
  noDatePFA: () => {
    console.log("noDatePFA called!");
    set({ datePFA: false });
  },
  hasDatePFA: () => {
    console.log("hasDatePFA called!");
    set({ datePFA: true });
  },
}));

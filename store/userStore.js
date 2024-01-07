import { create } from "zustand";

export const getName = create((set) => ({
  name: "",
  setName: (data) => set(() => ({ name: data })),
}));

import { create } from "zustand";

interface token {
  userToken: string;
  companyToken: string;
  setUserToken: (state: string) => void;
  setCompanyToken: (state: string) => void;
}

export const useTokenStorage = create<token>((set) => ({
  userToken: "",
  companyToken: "",
  setUserToken: (accessToken: string) => set({ userToken: accessToken }),
  setCompanyToken: (accessToken: string) => set({ companyToken: accessToken }),
}));

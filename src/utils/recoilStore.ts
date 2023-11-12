import { atom } from "recoil";

export const aSummary = atom({
  key: "summary",
  default: { isOn: true, text: "" },
});

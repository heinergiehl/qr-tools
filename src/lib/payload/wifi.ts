import { escapeWifiValue } from "./escape";

export type WifiPayloadInput = {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
};

export const buildWifiPayload = ({ ssid, password, encryption, hidden }: WifiPayloadInput) => {
  const escapedSsid = escapeWifiValue(ssid.trim());
  const escapedPassword = escapeWifiValue(password);
  const hiddenValue = hidden ? "true" : "false";
  const passwordField = encryption === "nopass" ? "" : escapedPassword;
  return `WIFI:T:${encryption};S:${escapedSsid};P:${passwordField};H:${hiddenValue};;`;
};

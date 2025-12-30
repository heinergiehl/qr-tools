export const escapeWifiValue = (value: string) => value.replace(/([\\;,:])/g, "\\$1");

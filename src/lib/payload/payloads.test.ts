import { describe, expect, it } from "vitest";

import {
  buildEmailPayload,
  buildPhonePayload,
  buildSmsPayload,
  buildTextPayload,
  buildUrlPayload,
  buildVCardPayload,
  buildWhatsAppPayload,
  buildWifiPayload,
} from "@/lib/payload";

import { escapeWifiValue } from "@/lib/payload/escape";

describe("payload builders", () => {
  it("builds URL payloads with trimmed input", () => {
    expect(buildUrlPayload({ url: " https://example.com " })).toBe("https://example.com");
  });

  it("keeps text payloads as-is", () => {
    expect(buildTextPayload({ text: "Hello world" })).toBe("Hello world");
  });

  it("escapes WiFi values", () => {
    expect(escapeWifiValue("Cafe;Net"))
      .toBe("Cafe\\;Net");
  });

  it("builds WiFi payloads", () => {
    const payload = buildWifiPayload({
      ssid: "Cafe",
      password: "secret",
      encryption: "WPA",
      hidden: false,
    });
    expect(payload).toBe("WIFI:T:WPA;S:Cafe;P:secret;H:false;;");
  });

  it("builds vCard payloads", () => {
    const payload = buildVCardPayload({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });
    expect(payload).toContain("BEGIN:VCARD");
    expect(payload).toContain("FN:Ada Lovelace");
    expect(payload).toContain("EMAIL:ada@example.com");
  });

  it("builds WhatsApp payloads", () => {
    const payload = buildWhatsAppPayload({ phone: "+49 170 1234567", message: "Hello" });
    expect(payload).toBe("https://wa.me/491701234567?text=Hello");
  });

  it("builds email payloads", () => {
    const payload = buildEmailPayload({ email: "hi@example.com", subject: "Hi", body: "Hello" });
    expect(payload).toBe("mailto:hi@example.com?subject=Hi&body=Hello");
  });

  it("builds phone payloads", () => {
    const payload = buildPhonePayload({ phone: "+49 170 1234567" });
    expect(payload).toBe("tel:+491701234567");
  });

  it("builds SMS payloads", () => {
    const payload = buildSmsPayload({ phone: "+49 170 1234567", message: "Hi" });
    expect(payload).toBe("smsto:+491701234567:Hi");
  });
});

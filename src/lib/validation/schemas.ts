import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const isValidPhone = (value: string) => {
  const phone = parsePhoneNumberFromString(value);
  return Boolean(phone && phone.isValid());
};

export const urlSchema = z.object({
  url: z
    .string()
    .trim()
    .url({ message: "Enter a valid URL." })
    .refine(
      (value) => value.startsWith("http://") || value.startsWith("https://"),
      "URL must start with http:// or https://."
    ),
});

export const textSchema = z.object({
  text: z.string().min(1, "Enter some text."),
});

export const wifiSchema = z
  .object({
    ssid: z.string().min(1, "SSID is required."),
    password: z.string().optional(),
    encryption: z.enum(["WPA", "WEP", "nopass"]),
    hidden: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (value.encryption !== "nopass" && !value.password?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password is required for secured networks.",
      });
    }
  });

export const vcardSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Enter a valid email.").optional().or(z.literal("")),
    company: z.string().optional(),
    title: z.string().optional(),
    website: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
    address: z.string().optional(),
    notes: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.firstName?.trim() && !value.lastName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["firstName"],
        message: "Add a first or last name.",
      });
    }
    if (value.phone?.trim() && !isValidPhone(value.phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Enter a valid phone number.",
      });
    }
  });

export const whatsappSchema = z.object({
  phone: z.string().min(5, "Enter a phone number.").refine(isValidPhone, "Enter a valid phone number."),
  message: z.string().optional(),
});

export const emailSchema = z.object({
  email: z.string().email("Enter a valid email."),
  subject: z.string().optional(),
  body: z.string().optional(),
});

export const phoneSchema = z.object({
  phone: z.string().min(5, "Enter a phone number.").refine(isValidPhone, "Enter a valid phone number."),
});

export const smsSchema = z.object({
  phone: z.string().min(5, "Enter a phone number.").refine(isValidPhone, "Enter a valid phone number."),
  message: z.string().optional(),
});

export type UrlSchema = z.infer<typeof urlSchema>;
export type TextSchema = z.infer<typeof textSchema>;
export type WifiSchema = z.infer<typeof wifiSchema>;
export type VCardSchema = z.infer<typeof vcardSchema>;
export type WhatsAppSchema = z.infer<typeof whatsappSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;
export type PhoneSchema = z.infer<typeof phoneSchema>;
export type SmsSchema = z.infer<typeof smsSchema>;

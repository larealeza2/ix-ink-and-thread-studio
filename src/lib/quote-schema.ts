import { z } from "zod";
export const quoteSchema = z.object({
 name: z.string().trim().min(2, "Please enter your full name").max(100),
 phone: z.string().trim().max(20).refine((v) => !v || /^\+?[\d\s()-]{7,20}$/.test(v), "Please enter a valid phone number"),
 product: z.string().trim().min(1, "Please choose a product or service").max(120),
 quantity: z.string().trim().max(40),
 items: z.string().trim().max(3000).optional(),
 colours: z.string().trim().max(200).optional(), design: z.string().trim().max(600).optional(),
 date: z.string().trim().max(40).optional(), notes: z.string().trim().max(1000).optional(),
});

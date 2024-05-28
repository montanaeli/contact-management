import { z } from "zod";

export const create = z.object({
  name: z.string().min(2).max(20),
  title: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string().array(),
});

export const update = z.object({
  name: z.string().min(2).max(20),
  title: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

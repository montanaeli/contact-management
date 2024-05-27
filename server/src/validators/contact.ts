import { z } from "zod";

export const create = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string().array(),
});

export const update = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

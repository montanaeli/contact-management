import { z } from "zod";

export const create = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  email: z.string().email(),
  addressList: z.string(),
});

export const update = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

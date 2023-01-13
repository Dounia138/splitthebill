import { z } from "zod"

export const User = z.object({
  id: z.number(),
  name: z.string(),
  isAdmin: z.boolean(),
  paidAmount: z.number(),
  owesAmount: z.number(),
})

export type User = z.infer<typeof User>

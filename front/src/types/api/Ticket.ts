import { z } from "zod"
import { OwesPayment } from "./OwesPayment"

export const Ticket = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.number(),
  expirationDate: z.coerce.date().nullable(),
  creatorId: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Ticket = z.infer<typeof Ticket>

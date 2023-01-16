import { z } from "zod"

export const OwesPayment = z.object({
  id: z.number(),
  requestedAmount: z.number(),
  forTicketId: z.number(),
  payerId: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type OwesPayment = z.infer<typeof OwesPayment>

import { z } from "zod"

export const Payment = z.object({
  id: z.number(),
  amount: z.number(),
  payerId: z.number(),
  forOwesPaymentId: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Payment = z.infer<typeof Payment>

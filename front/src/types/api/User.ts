import { z } from "zod"
import { Appartment } from "./Appartment"
import { OwesPayment } from "./OwesPayment"
import { Payment } from "./Payment"
import { Ticket } from "./Ticket"

export const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  tickets: z.array(z.lazy(() => Ticket)),
  payments: z.array(z.lazy(() => Payment)),
  owesPayments: z.array(z.lazy(() => OwesPayment)),
  appartmentId: z.number(),
  phoneNumber: z.string(),
  isAdmin: z.boolean(),
  avatarUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof User>

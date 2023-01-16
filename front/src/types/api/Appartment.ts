import { z } from "zod"
import { User } from "./User"

export const Appartment = z.object({
  id: z.number(),
  uuid: z.string(),
  residents: z.array(z.lazy(() => User)),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Appartment = z.infer<typeof Appartment>

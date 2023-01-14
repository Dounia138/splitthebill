import { Payment } from "../types/api/Payment"
import { api } from "../utils/api"
import { z } from "zod"

export class PaymentsRepo {
  static async create(): Promise<{ payment: Payment }> {
    return await api('/users/me/appartment/payments', z.object({ payment: Payment }), { method: 'POST' })
  }
}

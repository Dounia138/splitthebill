import { Ticket } from "../types/api/Ticket"
import { api } from "../utils/api"
import { z } from "zod"

export class TicketsRepo {
  static async create(): Promise<{ ticket: Ticket }> {
    return await api('/users/me/appartment/tickets', z.object({ ticket: Ticket }), { method: 'POST' })
  }

  static async delete(id: number): Promise<void> {
    return await api(`/users/me/appartment/tickets/${id}`, z.void(), { method: 'DELETE' })
  }
}

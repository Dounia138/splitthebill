import { Ticket } from '../types/api/Ticket'
import { api } from '../utils/api'
import { z } from 'zod'

export class TicketsRepo {
  static async create({
    name,
    amount,
    expirationDate,
  }: {
    name: string
    amount: number
    expirationDate?: Date
  }): Promise<{ ticket: Ticket }> {
    return await api(
      '/users/me/appartment/tickets',
      z.object({ ticket: Ticket }),
      {
        method: 'POST',
        body: { name, amount, expiration_date: expirationDate },
      },
    )
  }

  static async delete(id: number): Promise<void> {
    return await api(`/users/me/appartment/tickets/${id}`, z.any(), {
      method: 'DELETE',
    })
  }
}

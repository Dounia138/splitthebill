import { z } from "zod"

import { api } from "../utils/api"
import { User } from "../types/api/User"

export class UsersRepo {
  static async create({ name, email, phoneNumber, password }: { name: string, email: string, phoneNumber: string, password: string }): Promise<{ user: User }> {
    return await api(
      '/users/register',
      z.object({ user: User }),
      {
        method: 'POST',
        body: { name, email, phone_number: phoneNumber, password },
      },
    )
  }

  static async login(email: string, password: string): Promise<{ token: string }> {
    return await api(
      '/users/login',
      z.object({ token: z.string() }),
      {
        method: 'POST',
        body: { email, password },
      },
    )
  }

  static async get(id?: number): Promise<{ user: User }> {
    return await api(`/users/${id ?? 'me'}`, z.object({ user: User }))
  }

  static async delete(id: number): Promise<void> {
    // return await api(`/users/${id}`, z.void(), { method: 'DELETE' })
    throw new Error('Not implemented')
  }
}

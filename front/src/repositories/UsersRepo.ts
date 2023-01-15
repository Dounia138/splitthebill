import { z } from 'zod'

import { api } from '../utils/api'
import { User } from '../types/api/User'

export class UsersRepo {
  static async create({
    name,
    email,
    phoneNumber,
    password,
  }: {
    name: string
    email: string
    phoneNumber: string
    password: string
  }): Promise<{ token: string }> {
    return await api('/users/register', z.object({ token: z.string() }), {
      method: 'POST',
      body: { name, email, phone_number: phoneNumber, password },
    })
  }

  static async login(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    return await api('/users/login', z.object({ token: z.string() }), {
      method: 'POST',
      body: { email, password },
    })
  }

  static async get(id?: number): Promise<{ user: User }> {
    return await api(`/users/${id ?? 'me'}`, z.object({ user: User }))
  }

  static async deleteMe(): Promise<void> {
    // return await api(`/users/me`, z.any(), { method: 'DELETE' })
    throw new Error('Not implemented')
  }

  static async update({
    userId,
    name,
    email,
    phoneNumber,
    isAdmin,
  }: {
    userId: number
    name?: string
    email?: string
    phoneNumber?: string
    isAdmin?: boolean
  }): Promise<{ user: User }> {
    return await api(`/users/${userId}`, z.object({ user: User }), {
      method: 'PATCH',
      body: { name, email, phone_number: phoneNumber, is_admin: isAdmin },
    })
  }
}

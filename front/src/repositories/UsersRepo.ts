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

  static async get(id?: number): Promise<{ user: User & { avatar: string } }> {
    const { user } = await api(`/users/${id ?? 'me'}`, z.object({ user: User }))
    return {
      user: {
        ...user,
        avatar: `https://source.boringavatars.com/marble/120/${user.id}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
      },
    }
  }

  static async deleteMe(): Promise<void> {
    // return await api(`/users/me`, z.void(), { method: 'DELETE' })
    throw new Error('Not implemented')
  }
}

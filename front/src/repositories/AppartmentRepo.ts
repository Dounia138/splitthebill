import { Appartment } from "../types/api/Appartment"
import { api } from "../utils/api"
import { z } from "zod"

export class AppartmentRepo {
  static async findMine(): Promise<{ appartment: Appartment }> {
    return await api('/users/me/appartment', z.object({ appartment: Appartment }))
  }

  static async create(): Promise<{ appartment: Appartment }> {
    return await api('/appartments', z.object({ appartment: Appartment }), { method: 'POST' })
  }

  static async join(appartmentId: string): Promise<void> {
    return await api(`/users/me/appartment?appartment_id=${appartmentId}`, z.any(), { method: 'PUT' })
  }

  static async deleteMine(): Promise<void> {
    return await api(`/users/me/appartment`, z.any(), { method: 'DELETE' })
  }
}

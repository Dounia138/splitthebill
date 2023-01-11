import { create } from 'zustand'
import { UsersRepo } from '../repositories/UsersRepo'

export const useUserStore = create<(User & { token: string }) | undefined>((set) => ({
    id: 0,
    name: '',
    isAdmin: false,
    paidAmount: 0,
    owesAmount: 0,
    token: '',
    addUser: (user: User) => set(state => user),
    resetUser: () => set(() => undefined),
    fetchUser: async () => {
        const { user } = await UsersRepo.get()
        set(() => user)
    },
    login: async (email: string, password: string) => {
        const { token } = await UsersRepo.login(email, password)
        set((state) => ({ ...state, token }))
    },
    logout: async (id: number) => {
        await UsersRepo.delete(id)
        set(() => undefined)
    }
}))

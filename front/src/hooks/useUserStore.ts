import { UsersRepo } from '$repositories/UsersRepo'
import { User } from '$types/api/User'
import { create } from 'zustand'

interface UserStore {
  user?: User & { avatar: string }
  fetch: () => Promise<void>
}

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  fetch: () => UsersRepo.get().then(({ user }) => set({ user })),
}))

export default useUserStore

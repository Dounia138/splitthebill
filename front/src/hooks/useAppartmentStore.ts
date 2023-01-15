import { AppartmentRepo } from '$repositories/AppartmentRepo'
import { UsersRepo } from '$repositories/UsersRepo'
import { Appartment } from '$types/api/Appartment'
import { OwesPayment } from '$types/api/OwesPayment'
import { Payment } from '$types/api/Payment'
import { Ticket } from '$types/api/Ticket'
import { User } from '$types/api/User'
import { create } from 'zustand'

interface AppartmentStore {
  appartment?: Appartment
  fetch: () => Promise<void>
  mates: () => User[]
  tickets: () => Ticket[]
  payments: () => Payment[]
  owesPayments: () => OwesPayment[]
}

const useAppartmentStore = create<AppartmentStore>((set, get) => ({
  appartment: undefined,
  fetch: () =>
    AppartmentRepo.findMine().then(({ appartment }) => set({ appartment })),
  mates: () => get().appartment?.residents ?? [],
  tickets: () =>
    get().appartment?.residents.flatMap((mate) => mate.tickets) ?? [],
  payments: () =>
    get().appartment?.residents.flatMap((mate) => mate.payments) ?? [],
  owesPayments: () =>
    get().appartment?.residents.flatMap((mate) => mate.owesPayments) ?? [],
}))

export default useAppartmentStore

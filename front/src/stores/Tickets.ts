import { create } from 'zustand'
import { TicketsRepo } from '../repositories'

export const useTicketStore = create<{ tickets: Ticket[] } | undefined>((set) => ({
    tickets: [] as Ticket[],
    addTicket: (ticket: Ticket) => set((state) => {
        return { tickets: [...(state?.tickets ?? []), ticket] }
    }),
    resetTickets: () => set(() => undefined),
    fetchTickets: async () => {
        const { tickets } = await TicketsRepo.findAppartmentTickets()
        set(() => {
            return { tickets }
        })
    }
}))

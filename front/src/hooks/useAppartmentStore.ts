import { AppartmentRepo } from '@/repositories/AppartmentRepo'
import { UsersRepo } from '@/repositories/UsersRepo'
import { Appartment } from '@/types/api/Appartment'
import { OwesPayment } from '@/types/api/OwesPayment'
import { Payment } from '@/types/api/Payment'
import { Ticket } from '@/types/api/Ticket'
import { User } from '@/types/api/User'
import { create } from 'zustand'

interface AppartmentStore {
  appartment?: Appartment
  fetch: () => Promise<void>
  mates: () => User[]
  tickets: () => Ticket[]
  payments: () => Payment[]
  owesPayments: () => OwesPayment[]

  ticketsWithRelation: () => TicketsWithRelation
  uncompletedTickets: () => TicketsWithRelation
  getUserTickets: (userId: number) => TicketsWithRelation
  getUserRemainingTickets: (userId: number) => TicketsWithRelation
  getUserPaidAmount: (userId: number) => number
  getUserRemainingAmount: (userId: number) => number
}

export const useAppartmentStore = create<AppartmentStore>((set, get) => ({
  appartment: undefined,
  fetch: () =>
    AppartmentRepo.findMine().then(({ appartment }) => set({ appartment })),
  mates: () => get().appartment?.residents ?? [],
  tickets: () =>
    get()
      .mates()
      .flatMap((mate) => mate.tickets) ?? [],
  payments: () =>
    get()
      .mates()
      .flatMap((mate) => mate.payments) ?? [],
  owesPayments: () =>
    get()
      .mates()
      .flatMap((mate) => mate.owesPayments) ?? [],

  ticketsWithRelation: () =>
    relateTickets(get().tickets(), get().payments(), get().owesPayments()),
  uncompletedTickets: () => getUncompletedTickets(get().ticketsWithRelation()),
  getUserTickets: (userId) =>
    get()
      .ticketsWithRelation()
      .filter((ticket) => ticket.creatorId === userId),
  getUserRemainingTickets: (userId) =>
    getUserUncompletedTickets(get().ticketsWithRelation(), userId),
  getUserPaidAmount: (userId) =>
    sumPayments(
      get()
        .ticketsWithRelation()
        .filter((ticket) => ticket.creatorId === userId)
        .flatMap((ticket) => getTicketPayments(ticket)),
    ),
  getUserRemainingAmount: (userId) =>
    get()
      .getUserRemainingTickets(userId)
      .reduce(
        (acc, cur) =>
          acc +
          (cur.owesPayments.find((owes) => owes.payerId === userId)
            ?.requestedAmount ?? 0) -
          sumPayments(getTicketPayments(cur)),
        0,
      ),
}))

type TicketsWithRelation = ReturnType<typeof relateTickets>
function relateTickets(
  tickets: Ticket[],
  payments: Payment[],
  owesPayments: OwesPayment[],
) {
  return tickets.map((ticket) => {
    return {
      ...ticket,
      owesPayments: owesPayments
        .filter((owesPayment) => owesPayment.forTicketId === ticket.id)
        .map((owesPayment) => {
          return {
            ...owesPayment,
            payments: payments.filter(
              (payment) => payment.forOwesPaymentId === owesPayment.id,
            ),
          }
        }),
    }
  })
}

function getTicketPayments(ticket: TicketsWithRelation[0]) {
  return ticket.owesPayments.flatMap((owes) => owes.payments)
}

function sumPayments(payments: Payment[]) {
  return payments.reduce((acc, cur) => acc + cur.amount, 0)
}

function getUncompletedTickets(tickets: TicketsWithRelation) {
  return tickets.filter(
    (ticket) => ticket.amount > sumPayments(getTicketPayments(ticket)),
  )
}

function getUserUncompletedTickets(
  tickets: TicketsWithRelation,
  userId: number,
) {
  return tickets.filter((ticket) => {
    const owesPayment = ticket.owesPayments.find(
      (owes) => owes.payerId === userId,
    )
    const sum = sumPayments(owesPayment?.payments ?? [])
    return sum < (owesPayment?.requestedAmount ?? 0)
  })
}

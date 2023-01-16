import { useAppartmentStore, useUserStore } from '$hooks/index'
import { CalendarIcon } from '@heroicons/react/20/solid'
import { CurrencyEuroIcon } from '@heroicons/react/24/outline'
import { UsersRepo } from '$repositories/UsersRepo'
import { useState, useEffect } from 'react'
import { User } from '$types/api/User'

function SendReminderForm({
  userId,
  handleClose,
}: {
  userId: number
  handleClose: () => void
}) {
  const tickets = useAppartmentStore((state) => state.tickets())
  const payments = useAppartmentStore((state) => state.payments())
  const owesPayments = useAppartmentStore((state) => state.owesPayments())
  const residents = useAppartmentStore((state) => state.mates())

  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    UsersRepo.get(userId).then(({ user }) => setUser(user))
  }, [userId])

  const me = useUserStore((state) => state.user)
  const filteredTickets = tickets.reduce((acc, ticket) => {
    const foundOwesPayment = owesPayments.filter(
      (owesPayment) =>
        owesPayment.forTicketId === ticket.id && owesPayment.payerId === userId,
    )
    const foundPayments = payments.filter((payment) =>
      foundOwesPayment.some(
        (owesPayment) => owesPayment.id === payment.forOwesPaymentId,
      ),
    )
    const paymentsSum = foundPayments.reduce(
      (acc, payment) => acc + payment.amount,
      0,
    )

    if (ticket.id in acc) {
      acc[ticket.id].remainingAmount -= paymentsSum
      if (acc[ticket.id].remainingAmount <= 0) {
        delete acc[ticket.id]
      }
    }

    return acc
  }, Object.fromEntries(tickets.map((ticket) => [ticket.id, { ticket, remainingAmount: ticket.amount }])))

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-x-1/3 inset-y-1/4 h-96 max-h-full my-8 z-10 overflow-y-auto bg-white rounded-md ">
        <div className="space-y-8 divide-y divide-gray-200 m-10">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Création du Rappel
                </h3>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <ul role="list" className="divide-y divide-gray-200">
                  {Object.entries(filteredTickets).map(
                    ([ticketId, { ticket, remainingAmount }]) => (
                      <li key={ticketId}>
                        <a
                          href={`mailto:${user?.email}?subject=Rappel de paiement pour ${ticket.name}&body=Bonjour ${user?.name},%0D%0A%0D%0AJe te rappelle que tu dois encore payer ${remainingAmount}€ pour ${ticket.name}.%0D%0A%0D%0ACordialement,%0D%0A%0D%0A${me?.name}`}
                          className="block hover:bg-gray-50"
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <p className="truncate text-sm font-medium text-indigo-600">
                                {ticket.name}
                              </p>
                              <div className="ml-2 flex flex-shrink-0">
                                <p className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                  {ticket.amount}€
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  par{' '}
                                  {
                                    residents.find(
                                      (resident) =>
                                        resident.id === ticket.creatorId,
                                    )?.name
                                  }
                                </p>
                              </div>
                              <div className="flex gap-4">
                                {ticket.expirationDate && (
                                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <CalendarIcon
                                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <p>
                                      A régler avant le{' '}
                                      {/* TODO: format date */}
                                      <time
                                        dateTime={ticket.expirationDate.toDateString()}
                                      >
                                        {ticket.expirationDate.toLocaleDateString(
                                          'fr',
                                        )}
                                      </time>
                                    </p>
                                  </div>
                                )}
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <CurrencyEuroIcon
                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <p>
                                    Reste{' '}
                                    {owesPayments.reduce(
                                      (acc, owesPayment) =>
                                        acc +
                                        (owesPayment.forTicketId === ticket.id
                                          ? owesPayment.requestedAmount
                                          : 0),
                                      0,
                                    ) -
                                      payments.reduce(
                                        (acc, payment) =>
                                          acc +
                                          (owesPayments.find(
                                            (owesPayment) =>
                                              owesPayment.id ===
                                              payment.forOwesPaymentId,
                                          )?.forTicketId === ticket.id
                                            ? payment.amount
                                            : 0),
                                        0,
                                      )}
                                    €{' '}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    ),
                  )}
                </ul>

                <div className="sm:border-t sm:border-gray-200 sm:pt-5 flex justify-end">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleClose}
                  >
                    Quitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SendReminderForm

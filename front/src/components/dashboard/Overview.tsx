import { CalendarIcon } from '@heroicons/react/20/solid'
import { CurrencyEuroIcon } from '@heroicons/react/24/outline'
import Chart from './Chart'
import { useEffect, useState, FormEvent } from 'react'

import { PaymentsRepo, TicketsRepo } from '$repositories/index'
import { Ticket, Payment, OwesPayment } from '$types/api'
import { useAppartmentStore, useUserStore } from '$hooks/index'

import TicketForm from './TicketForm'

const Overview = () => {
  const [openTicketForm, setOpenTicketForm] = useState(false)

  const me = useUserStore((state) => state.user)

  const ticketsWithRelation = useAppartmentStore((state) =>
    state.ticketsWithRelation(),
  )
  const payments = useAppartmentStore((state) => state.payments())
  const owesPayments = useAppartmentStore((state) => state.owesPayments())
  const residents = useAppartmentStore((state) => state.mates())
  const userRemainingTickets = useAppartmentStore((state) =>
    me?.id ? state.getUserRemainingTickets(me.id) : [],
  )
  console.log(userRemainingTickets)
  const userPaidAmount = useAppartmentStore((state) =>
    me?.id ? state.getUserPaidAmount(me.id) : 0,
  )
  const userRemainingAmount = useAppartmentStore((state) =>
    me?.id ? state.getUserRemainingAmount(me.id) : 0,
  )
  const fetchAppartment = useAppartmentStore((state) => state.fetch)

  //const [isError, setIsError] = useState(false)
  const toggleTicketForm = () => {
    setOpenTicketForm(!openTicketForm)
  }

  const priceBoxes = [
    {
      label: "Total de la colloc'",
      price: ticketsWithRelation.reduce(
        (acc, ticket) => acc + ticket.amount,
        0,
      ),
    },
    {
      label: 'Ce que tu dois encore payer',
      price: userRemainingAmount,
    },
    {
      label: 'Ce que tu as déjà payé',
      price: userPaidAmount,
    },
  ]

  const payTicket = (
    ticket: typeof ticketsWithRelation[number],
    amount?: number,
  ) => {
    const owesPayment = ticket.owesPayments.find(
      (owesPayment) => owesPayment.payerId === me?.id,
    )

    if (owesPayment) {
      if (amount === undefined) {
        amount = owesPayment.requestedAmount
      }

      PaymentsRepo.create({
        amount,
        owesPaymentId: owesPayment.id,
      }).then(() => {
        fetchAppartment()
      })
    }
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="col-span-2">
        <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
          {priceBoxes.map((priceBox, i) => (
            <div key={priceBox.label} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">
                {priceBox.label}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {priceBox.price.toFixed(2).toString().replace('.', ',')}€
                  <span className="ml-2 text-sm font-medium text-gray-500"></span>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <Chart />
      <div className="flex flex-col gap-8">
        <div className="overflow-hidden bg-white shadow sm:rounded-md h-max">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap h-10 items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Les tickets de la colloc'
                </h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={toggleTicketForm}
                >
                  Créer un nouveau ticket
                </button>
              </div>
            </div>
          </div>
          <ul
            role="list"
            className="divide-y divide-gray-200 max-h-80 overflow-auto"
          >
            {!ticketsWithRelation.length ? (
              <div className="p-6 text-sm text-gray-500">
                Pas de ticket à l'horizon...
              </div>
            ) : (
              ticketsWithRelation.map((ticket) => (
                <li key={ticket.id}>
                  <div className="flex items-center relative cursor-pointer">
                    {userRemainingTickets
                      .map((ticket) => ticket.id)
                      .includes(ticket.id) && (
                      <div className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer duration-300 absolute w-full h-full flex justify-center items-center backdrop-blur-sm bg-white/50">
                        <button
                          type="button"
                          className="relative inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => payTicket(ticket)}
                        >
                          Payer{' '}
                          {ticket.owesPayments
                            .find((owesPayment) => owesPayment.payerId === me?.id)
                            ?.requestedAmount.toFixed(2)}
                          €
                        </button>
                      </div>
                    )}
                    <div className="px-4 py-4 sm:px-6 flex-auto">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {ticket.name}
                          {!userRemainingTickets
                            .map((ticket) => ticket.id)
                            .includes(ticket.id) && (
                            <span className="ml-2 inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                              Tu as déjà payé ta part
                            </span>
                          )}
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
                                (resident) => resident.id === ticket.creatorId,
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
                                A régler avant le {/* TODO: format date */}
                                <time
                                  dateTime={ticket.expirationDate.toDateString()}
                                >
                                  {ticket.expirationDate.toLocaleDateString('fr')}
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
                              {(
                                ticket.amount -
                                ticket.owesPayments.reduce(
                                  (acc, owesPayment) =>
                                    acc +
                                    owesPayment.payments.reduce(
                                      (acc, payment) => acc + payment.amount,
                                      0,
                                    ),
                                  0,
                                )
                              ).toFixed(2)}
                              €{' '}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md col-start-2 h-max">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap h-10 items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Les règlements de tes collocs'
                </h3>
              </div>
            </div>
          </div>
          <ul
            role="list"
            className="divide-y divide-gray-200 max-h-80 overflow-auto"
          >
            {!payments.length ? (
              <div className="p-6 text-sm text-gray-500">
                Pas encore de règlement...
              </div>
            ) : (
              payments.map((payment) => (
                <li key={payment.id}>
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-indigo-600">
                          Paiement de{' '}
                          {
                            residents.find(
                              (resident) => resident.id === payment.payerId,
                            )?.name
                          }
                        </p>
                        <div className="ml-2 flex flex-shrink-0">
                          <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {payment.amount}€
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            pour{' '}
                            {
                              ticketsWithRelation.find(
                                (ticket) =>
                                  ticket.id ===
                                  owesPayments.find(
                                    (owesPayment) =>
                                      owesPayment.id === payment.forOwesPaymentId,
                                  )?.forTicketId,
                              )?.name
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      {openTicketForm && <TicketForm handleClose={toggleTicketForm} />}
    </div>
  )
}

export default Overview

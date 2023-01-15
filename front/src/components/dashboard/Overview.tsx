import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import classnames from 'classnames'

import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { TicketsRepo } from '$repositories/TicketsRepo'
import { PaymentsRepo } from '$repositories/PaymentsRepo'
import { CurrencyEuroIcon } from '@heroicons/react/24/outline'
import Chart from './Chart'

const priceBoxes = [
  {
    label: "Total de la colloc'",
    price: 1083.87,
  },
  {
    label: 'Ce que tu dois encore payer',
    price: 160.43,
  },
  {
    label: 'Ce que tu as déjà payé',
    price: 110.56,
  },
]

const Overview = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    TicketsRepo.findAppartmentTickets().then((data) => {
      setTickets(data.tickets)
    })
    PaymentsRepo.findAppartmentPayments().then((data) => {
      setPayments(data.payments)
    })
  }, [])

  const createNewTicket = () => {
    alert('create a new ticket')
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
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
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
                  onClick={createNewTicket}
                >
                  Créer un nouveau ticket
                </button>
              </div>
            </div>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <a href="#" className="block hover:bg-gray-50">
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
                          par {ticket.creator.name}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CalendarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          A régler avant le{' '}
                          <time dateTime={ticket.dueDate}>
                            {ticket.dueDate}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md col-start-2">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap h-10 items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Les règlements de tes collocs'
                </h3>
              </div>
            </div>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <li key={payment.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-indigo-600">
                        Paiement de {payment.payer.name}
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
                          pour {payment.owesPayment.forTicket.name}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CurrencyEuroIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          Reste{' '}
                          {payment.owesPayment.forTicket.amount -
                            payment.amount}
                          €
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Overview

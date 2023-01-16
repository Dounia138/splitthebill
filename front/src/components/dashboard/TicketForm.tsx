import { useAppartmentStore } from '@/hooks/index'
import { TicketsRepo } from '@/repositories/TicketsRepo'
import { useState, FormEvent } from 'react'

const getMaxDay = (month: number, year: number) => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31
    case 4:
    case 6:
    case 9:
    case 11:
      return 30
    case 2:
      return year % 4 === 0 ? 29 : 28
    default:
      return 0
  }
}

function TicketForm({ handleClose }: { handleClose: () => void }) {
  const fetchAppartment = useAppartmentStore((state) => state.fetch)

  const [day, setDay] = useState<number | null>(null)
  const [month, setMonth] = useState<number | null>(null)
  const [year, setYear] = useState<number | null>(null)

  const dayFilled = day !== null
  const monthFilled = month !== null
  const yearFilled = year !== null

  const datePartiallyFilled = dayFilled || monthFilled || yearFilled

  const maxDay = month !== null && year !== null ? getMaxDay(month, year) : 31

  const createNewTicket = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    if (
      data.get('ticketName') === null ||
      data.get('ticketName')!.length === 0 ||
      data.get('amount') === null ||
      data.get('amount')!.length === 0
    ) {
      return
    }

    const expirationDateMonth = data.get('expirationDateMonth')
    const expirationDateDay = data.get('expirationDateDay')
    const expirationDateYear = data.get('expirationDateYear')
    let expirationDate = undefined

    if (
      expirationDateMonth !== null &&
      expirationDateDay !== null &&
      expirationDateYear !== null
    ) {
      expirationDate = new Date(
        `${expirationDateMonth}/${expirationDateDay}/${expirationDateYear}`,
      )
    }

    TicketsRepo.create({
      name: data.get('ticketName') as string,
      amount: parseFloat(data.get('amount') as string),
      expirationDate,
    }).then(() => {
      fetchAppartment()
    })
    handleClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed z-10 overflow-y-auto bg-white rounded-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <form
          className="space-y-8 divide-y divide-gray-200 m-10"
          method="POST"
          onSubmit={createNewTicket}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Création du ticket
                </h3>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Nom du ticket
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg rounded-md shadow-sm">
                      <input
                        type="text"
                        name="ticketName"
                        id="ticketName"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Montant
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg rounded-md shadow-sm">
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        step="0.01"
                        min="0.01"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Date d'expiration
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg rounded-md shadow-sm items-center gap-1">
                      <input
                        type="number"
                        name="expirationDateDay"
                        onChange={(e) => {
                          setDay(
                            e.target.value !== ''
                              ? parseInt(e.target.value)
                              : null,
                          )
                        }}
                        id="day"
                        min="1"
                        max={maxDay}
                        required={datePartiallyFilled}
                        placeholder="Jour"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <span className="text-gray-500">/</span>
                      <input
                        type="number"
                        name="expirationDateMonth"
                        onChange={(e) => {
                          setMonth(
                            e.target.value !== ''
                              ? parseInt(e.target.value)
                              : null,
                          )
                        }}
                        id="month"
                        min="1"
                        max="12"
                        required={datePartiallyFilled}
                        placeholder="Mois"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <span className="text-gray-500">/</span>
                      <input
                        type="number"
                        name="expirationDateYear"
                        onChange={(e) => {
                          setYear(
                            e.target.value !== ''
                              ? parseInt(e.target.value)
                              : null,
                          )
                        }}
                        id="year"
                        placeholder="Année"
                        min={new Date().getFullYear()}
                        max={new Date().getFullYear() + 100}
                        required={datePartiallyFilled}
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:border-t sm:border-gray-200 sm:pt-5 flex justify-end">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleClose}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Créer le ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default TicketForm

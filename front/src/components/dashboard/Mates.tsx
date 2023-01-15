import useAppartmentStore from '$hooks/useAppartmentStore'
import { AppartmentRepo } from '$repositories/AppartmentRepo'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UsersRepo } from '$repositories/UsersRepo'
import { User } from '$types/api/User'

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

type ThreeDotsMenuProps = {
  mate: User
}

const ThreeDotsMenu = ({ mate }: ThreeDotsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAdmin = () => {
    setIsOpen(false)

    UsersRepo.update({
      userId: mate.id,
      isAdmin: !mate.isAdmin,
    }).then(() => {
      useAppartmentStore.getState().fetch()
    })
  }

  return (
    <div className="h-6 w-6 absolute right-3 top-3 cursor-pointer">
      <EllipsisVerticalIcon onClick={() => setIsOpen((isOpen) => !isOpen)} />
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{
              opacity: 0,
              y: -10,
              x: '-100%',
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: '-100%',
            }}
            exit={{
              opacity: 0,
              y: -10,
              x: '-100%',
            }}
            className="mt-2 ml-6 w-max bg-white py-2 px-4 shadow rounded-md absolute hover:bg-gray-50"
          >
            <li className="text-red-500 text-sm" onClick={toggleAdmin}>
              {mate.isAdmin ? 'Retirer' : 'Donner'} les droits d'admin
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

const Mates = () => {
  const appartment = useAppartmentStore((state) => state.appartment)
  const mates = useAppartmentStore((state) => state.mates())
  const fetchAppartment = useAppartmentStore((state) => state.fetch)

  useEffect(() => {
    fetchAppartment()
  }, [])

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {mates.map((mate) => (
        <li
          key={mate.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8 relative">
            <ThreeDotsMenu mate={mate} />
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              src={mate.avatarUrl}
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {mate.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{mate.email}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span
                  className={`${
                    mate.isAdmin
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-indigo-100 text-indigo-800'
                  } rounded-full px-2 py-1 text-xs font-medium`}
                >
                  {mate.isAdmin ? 'Admin' : 'Membre'}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${mate.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Rappeler un ticket
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${mate.phoneNumber}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Virer de la colloc'
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Mates

import { useAppartmentStore, useUserStore } from '@/hooks/index'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UsersRepo } from '@/repositories/UsersRepo'
import { User } from '@/types/api/User'
import { UserPlusIcon } from '@heroicons/react/20/solid'
import SendReminderForm from '@/components/dashboard/SendReminderForm'
import { Appartment } from '@/types/api/Appartment'
import { AppartmentRepo } from '@/repositories/AppartmentRepo'

type ThreeDotsMenuProps = {
  mate: User
}

const ThreeDotsMenu = ({ mate }: ThreeDotsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dotsRef = useRef<HTMLDivElement>(null)

  const toggleAdmin = () => {
    setIsOpen(false)

    UsersRepo.update({
      userId: mate.id,
      isAdmin: !mate.isAdmin,
    }).then(() => {
      useAppartmentStore.getState().fetch()
    })
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dotsRef.current &&
      !dotsRef.current.contains(event.target as HTMLElement)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={dotsRef}
      className="h-6 w-6 absolute right-3 top-3 cursor-pointer"
    >
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
  const inviteLink = `${location.origin}/inscription/?inviteCode=${appartment?.uuid}`
  const me = useUserStore((state) => state.user)
  const [copyButtonText, setCopyButtonText] = useState('Copier le lien')
  const [userId, setUserId] = useState<number | null>(null)

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopyButtonText('Lien copié !')
    setTimeout(() => {
      setCopyButtonText('Copier le lien')
    }, 2000)
  }

  const closeSendReminderForm = () => {
    setUserId(null)
  }

  useEffect(() => {
    fetchAppartment()
  }, [])

  const fireMate = (mateId: number) => {
    AppartmentRepo.leave(mateId).then((data) => {
      console.log(data)
    })
  }

  return (
    <>
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
                {mate.id !== me?.id && (
                  <div className="flex w-0 flex-1">
                    <a
                      onClick={() => setUserId(mate.id)}
                      className="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Rappeler un ticket
                    </a>
                  </div>
                )}
                {mate.id !== me?.id && (
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      // href={`tel:${mate.phoneNumber}`}
                      onClick={() => fireMate(mate.id)}
                      className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Virer de la colloc'
                    </a>
                  </div>
                )}
                {mate.id === me?.id && (
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      // href={`tel:${mate.phoneNumber}`}
                      className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Quitter la colloc'
                    </a>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
        <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
          <div className="flex justify-center items-center flex-1 flex-col p-8 relative">
            <UserPlusIcon
              className="h-24 w-24 text-indigo-600"
              aria-hidden="true"
            />
            <div className="mt-6 mb-3">
              <p className="text-sm text-gray-500">
                Invitez votre nouveau colloc en lui envoyant ce lien !
              </p>
            </div>
            <input
              id="invitation"
              name="invitation"
              type="text"
              autoComplete="invitation"
              readOnly
              value={inviteLink}
              onClick={(e) => {
                copyInviteLink()
                e.currentTarget.select()
              }}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="-ml-px flex w-0 flex-1">
                <p
                  className="relative cursor-pointer inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  onClick={copyInviteLink}
                >
                  {copyButtonText}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      {userId && (
        <SendReminderForm handleClose={closeSendReminderForm} userId={userId} />
      )}
    </>
  )
}

export default Mates

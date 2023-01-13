import { useEffect, useState } from 'react'
import { UsersRepo } from '$repositories/UsersRepo'

const PasswordSettings = () => {
  const [me, setMe] = useState<User>()

  useEffect(() => {
    UsersRepo.get().then((data) => {
      setMe(data.user)
    })
  }, [])

  return (
    <>
      <div className="space-y-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Mot de passe
        </h3>
      </div>
      <div className="mt-6">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Mot de passe</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">**********</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Modifier
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}

export default PasswordSettings

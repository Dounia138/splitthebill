import { AppartmentRepo } from '@/repositories/AppartmentRepo'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UsersRepo } from '../repositories/UsersRepo'

const Signup = () => {
  const [isErrored, setIsErrored] = useState(false)
  const navigate = useNavigate()

  const inviteCode = new URLSearchParams(window.location.search).get(
    'inviteCode',
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    console.log(data.get('password'), data.get('confirmPassword'))
    if (data.get('password') !== data.get('confirmPassword')) {
      setIsErrored(true)
    } else {
      UsersRepo.create({
        name: data.get('name') as string,
        email: data.get('email') as string,
        phoneNumber: data.get('phoneNumber') as string,
        password: data.get('password') as string,
      })
        .then(() => {
          if (inviteCode) {
            return AppartmentRepo.join(inviteCode)
          } else {
            return AppartmentRepo.create().then(() => {})
          }
        })
        .then(() => {
          const queryParams = new URLSearchParams(window.location.search)
          const redirectUrl = queryParams.get('redirectUrl') || '/'
          navigate(redirectUrl)
        })
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Créer un compte
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Numéro de téléphone
                </label>
                <div className="mt-1">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="+33612345678"
                    minLength={12}
                    maxLength={12}
                    autoComplete="text"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmer le mot de passe
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {inviteCode && (
                <div>
                  <label
                    htmlFor="appartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code d'invitation
                  </label>
                  <div className="mt-1">
                    <input
                      id="appartment"
                      name="appartment"
                      type="text"
                      value={inviteCode}
                      disabled
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Créer un compte
                </button>
                {isErrored && (
                  <p className="text-sm font-light text-red-500 dark:text-red-400 mt-4">
                    Passwords do not match
                  </p>
                )}
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
                Vous avez déjà un compte ?{' '}
                <a
                  href="/connexion"
                  className="font-medium ml-1 text-indigo-600 hover:underline dark:text-primary-500"
                >
                  Se connecter
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup

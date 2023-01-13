import classNames from 'classnames'
import { Link, Outlet, useLocation } from 'react-router-dom'

const tabs = [
  { name: 'General', href: '/parametres' },
  { name: 'Mot de passe', href: '/parametres/mot-de-passe' },
  { name: 'Notifications', href: '/parametres/notifications' },
]

const SettingsLayout = () => {
  const location = useLocation()

  return (
    <>
      <div>
        <div>
          <div className="mx-auto flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative mx-auto md:px-8 xl:px-0">
                <div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      Paramètres
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          defaultValue={
                            tabs.find((tab) => tab.href === location.pathname)
                              ?.name
                          }
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                  tab.href === location.pathname
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                                )}
                              >
                                {tab.name}
                              </Link>
                            ))}
                          </nav>
                        </div>
                      </div>
                      <div className="mt-10 divide-y divide-gray-200">
                        <Outlet />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsLayout

import { useState } from 'react'
import { Switch } from '@headlessui/react'
import classnames from 'classnames'

const NotificationsSettings = () => {
  const [reminders, setReminders] = useState(false)

  return (
    <>
      <div className="space-y-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Notifications
        </h3>
      </div>
      <div className="mt-6">
        <dl className="divide-y divide-gray-200">
          <Switch.Group
            as="div"
            className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
          >
            <Switch.Label
              as="dt"
              className="text-sm font-medium text-gray-500"
              passive
            >
              Activer les notifications de rappel
            </Switch.Label>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <Switch
                checked={reminders}
                onChange={setReminders}
                className={classnames(
                  reminders ? 'bg-purple-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto',
                )}
              >
                <span
                  aria-hidden="true"
                  className={classnames(
                    reminders ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  )}
                />
              </Switch>
            </dd>
          </Switch.Group>
        </dl>
      </div>
    </>
  )
}

export default NotificationsSettings

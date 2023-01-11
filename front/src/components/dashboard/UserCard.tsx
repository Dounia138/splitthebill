import Tooltip from '$components/shared/Tooltip'
import { Button, Card } from 'flowbite-react'

type UserCardProps = {
  user?: User
}

const UserCard = ({ user }: UserCardProps) => {
  const remindTicket = () => {
    alert('remind ticket')
  }

  const moveOut = () => {
    alert('move out')
  }

  if (!user) return null

  return (
    <div className="absolute -translate-x-full left-0 w-max -mt-10">
      <Card className="shadow-none">
        <div className="flex flex-col items-center">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.isAdmin ? 'Admin' : 'Mate'}
          </span>
          <ul className="flex flex-col gap-2 mt-4">
            <li className="flex items-center gap-4">
              <p>
                A payé <span className="font-bold">321,43€</span>
              </p>
              <Tooltip content="Content" />
            </li>
            <li className="flex items-center gap-4">
              <p>
                Reste <span className="font-bold">10,76€</span> à payer
              </p>
              <Tooltip content="Content" />
            </li>
          </ul>
          <div className="mt-4 flex flex-col gap-2 lg:mt-6 w-full">
            <Button onClick={remindTicket}>Rappeler un ticket</Button>
            <Button onClick={moveOut} color="gray">
              Virer de la coloc
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
export default UserCard

import { Sidebar } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import UserCard from './UserCard'

type SidebarMateProps = {
  resident: User
  appartment: Appartment
}

const SidebarMate = ({ resident, appartment }: SidebarMateProps) => {
  const [isUserCardShow, setIsUserCardShow] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (event: any) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsUserCardShow(false)
    }
  }

  return (
    <Sidebar.Item
      ref={cardRef}
      tabIndex={0}
      label={resident.isAdmin ? 'Admin' : ''}
      className="cursor-pointer"
      onFocus={() => setIsUserCardShow(true)}
      onBlur={() => setIsUserCardShow(false)}
    >
      <div>
        <div className="flex items-center gap-4 ">
          <img
            className="h-8 w-8 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Photo de profil"
          />
          {resident.name}
        </div>
        {isUserCardShow && <UserCard user={resident} />}
      </div>
    </Sidebar.Item>
  )
}

export default SidebarMate

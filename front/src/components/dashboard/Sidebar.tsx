import { Card, Dropdown, Sidebar as S } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { AppartmentRepo } from '$repositories/AppartmentRepo'
import UserCard from './UserCard'
import { Plus } from 'iconoir-react'
import SidebarMate from './SidebarMate'

const Sidebar = () => {
  const [appartment, setAppartment] = useState<Appartment>()

  useEffect(() => {
    AppartmentRepo.findMine().then((data) => setAppartment(data.appartment))
  }, [])

  const addColoc = () => {
    alert('add coloc')
  }

  if (!appartment) return null

  return (
    <div className="w-fit relative">
      <S>
        <S.Items>
          <S.ItemGroup>
            {appartment.residents.map((resident) => (
              <SidebarMate resident={resident} appartment={appartment} />
            ))}
          </S.ItemGroup>
          <S.ItemGroup>
            <S.Item className="cursor-pointer" onClick={addColoc}>
              <div className="flex items-center gap-4">
                <Plus height={32} width={32} /> Ajouter un coloc'
              </div>
            </S.Item>
          </S.ItemGroup>
        </S.Items>
      </S>
    </div>
  )
}

export default Sidebar

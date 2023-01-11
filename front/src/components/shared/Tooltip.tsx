import { Tooltip as T } from 'flowbite-react'
import { InfoEmpty } from 'iconoir-react'

type TooltipProps = {
  content: string
}

const Tooltip = ({ content }: TooltipProps) => {
  return (
    <T content={content}>
      <InfoEmpty height={20} width={20} className="cursor-pointer" />
    </T>
  )
}

export default Tooltip

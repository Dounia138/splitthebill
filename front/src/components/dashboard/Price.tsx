import AnimatedPrice from '$components/shared/AnimatedPrice'
import Tooltip from '$components/shared/Tooltip'
import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

type PriceProps = {
  price: number
  label: string
  tooltip?: string
}

const Price = ({ price, label, tooltip }: PriceProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-normal tracking-tight text-gray-700 dark:text-white">
        {label}
      </h3>
      <div className="flex items-center gap-4">
        <AnimatedPrice price={price} />
        {tooltip && <Tooltip content="À payer avant le 15/12/2023" />}
      </div>
    </div>
  )
}

export default Price

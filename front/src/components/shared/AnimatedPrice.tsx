import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

type AnimatedPriceProps = {
  price: number
}

const AnimatedPrice = ({ price }: AnimatedPriceProps) => {
  const priceRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const controls = animate(0, price, {
      ease: 'easeOut',
      duration: 1,
      onUpdate(value) {
        if (priceRef.current) {
          priceRef.current.innerText =
            value.toFixed(2).toString().replace('.', ',') + '€'
        }
      },
    })

    return () => controls.stop()
  }, [])

  return (
    <span
      ref={priceRef}
      className="font-medium text-4xl text-gray-900 dark:text-gray"
    ></span>
  )
}

export default AnimatedPrice

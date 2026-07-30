import { useEffect, useRef, useState } from 'react'

/**
 * Animates from 0 to `target` over `duration` ms once `start` becomes true.
 * Used to animate the stat numbers (50+, 30+, 5+, 100%) when they scroll
 * into view.
 */
export function useCountUp(target, { duration = 1400, start = false } = {}) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start) return undefined

    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
      setValue(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [start, target, duration])

  return value
}

export default useCountUp

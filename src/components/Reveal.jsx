import { useReveal } from '../hooks/useReveal.js'

/**
 * Wrap any block of content to have it fade + slide in the first time it
 * scrolls into view. Pass `delay` (ms) to stagger a group of children.
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

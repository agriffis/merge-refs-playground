import {useCallback, useEffect, useLayoutEffect, useRef} from 'react'

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

const UNSET = {} // unique object

export default function useReflector(refs) {
  const value = useRef(UNSET)
  const captured = useRef(refs)
  const assigned = useRef(new WeakMap())

  // This effect runs on every commit, to capture refs that were passed during
  // render. This effect also emulates the behavior of React of nulling/setting
  // refs when they are added or removed. This is necessary because the callback
  // returned by useReflector is stable, so it will not get called when the
  // refs passed into the hook change.
  useIsomorphicLayoutEffect(() => {
    // Starve (set to null) any refs that have fallen out.
    starve(refs, captured, assigned)

    // Capture passed refs, so we can feed them.
    captured.current = refs

    // Feed (set to current value) any new refs that have been added, unless the
    // callback has not yet been called.
    if (value.current !== UNSET) {
      feed(value, captured, assigned)
    }
  })

  // Return a stable ref callback that will feed the captured refs.
  return useCallback(v => {
    value.current = v
    feed(value, captured, assigned)
  }, [])
}

/**
 * Feed the value to each of the captured refs, if it was not previously
 * assigned to the same value.
 */
function feed(value, captured, assigned) {
  const v = value.current
  const a = assigned.current
  captured.current.forEach(ref => {
    if (v === undefined ? !a.has(ref) : a.get(ref) !== v) {
      assign(ref, v)
      a.set(ref, v)
    }
  })
}

/**
 * Assign null to each of the captured refs which is no longer in the set.
 */
function starve(refs, captured, assigned) {
  const a = assigned.current
  captured.current.forEach(ref => {
    if (a.has(ref) && !refs.includes(ref)) {
      assign(ref, null)
      a.delete(ref)
    }
  })
}

/**
 * Assign to a ref, which might be a useRef or a callback ref.
 */
function assign(ref, value) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref && !Object.isFrozen(ref)) {
    ref.current = value
  }
}

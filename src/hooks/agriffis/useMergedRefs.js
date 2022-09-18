import {useCallback} from 'react'

export const useMergedRefs = refs =>
  useCallback(
    current => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(current)
        } else if (ref && !Object.isFrozen(ref)) {
          ref.current = current
        }
      })
    },
    // stupid trick to avoid strict error from React
    [refs.length, ...refs, ...new Array(10 - refs.length).fill()],
  )

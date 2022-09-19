import {useCallback} from 'react'

export const useMergedRefs = (refs, {maxBeforeStrictError = 10} = {}) =>
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
    Array(maxBeforeStrictError + 1).splice(0, refs.length, [
      refs.length, // because React only compares to the shorter length
      ...refs,
    ]),
  )

import {useMemo, useRef} from 'react'
import {useDynamicDeps} from './useDynamicDeps'

const applyValue = value => ref => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref && !Object.isFrozen(ref)) {
    ref.current = value
  }
}

export const useMergedRefs2 = (refs, initialValue) => {
  const valueRef = useRef(initialValue)
  return useMemo(
    () => ({
      get current() {
        return valueRef.current
      },
      set current(value) {
        valueRef.current = value
        refs.forEach(applyValue(value))
      },
    }),
    useDynamicDeps(refs),
  )
}

import {useCallback} from 'react'
import {useDynamicDeps} from './useDynamicDeps'

const applyValue = current => ref => {
  if (typeof ref === 'function') {
    ref(current)
  } else if (ref && !Object.isFrozen(ref)) {
    ref.current = current
  }
}

export const useMergedRefs = refs =>
  useCallback(
    current => refs.forEach(applyValue(current)),
    useDynamicDeps(refs),
  )

import type * as React from 'react'
import {useRef, useState} from 'react'

const refsSymbol = Symbol('refs')
type AcceptedRef<T> = React.MutableRefObject<T> | React.LegacyRef<T>

/**
 * `useRefs` returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
 * The returned object will persist for the full lifetime of the component.
 *
 * This is generally equivalent to `useRef` with the added benefit to keep other refs in sync with this one
 *
 * Note that `useRefs()` is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 * @param initialValue The initial value for the ref. If it's `null` or `undefined`, the initially provided refs won't be updated with it
 * @param refs Optional refs array to keep updated with this ref
 * @returns Mutable Ref object to allow both reading and manipulating the ref from this hook.
 */
export function useRefs<T>(
  initialValue: T,
  refs?: Array<AcceptedRef<T>>,
): React.MutableRefObject<T>
/**
 * `useRefs` returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
 * The returned object will persist for the full lifetime of the component.
 *
 * This is generally equivalent to `useRef` with the added benefit to keep other refs in sync with this one
 *
 * Note that `useRefs()` is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 * @param initialValue The initial value for the ref. If it's `null` or `undefined`, the initially provided refs won't be updated with it
 * @param refs Optional refs array to keep updated with this ref
 * @returns Mutable Ref object to allow both reading and manipulating the ref from this hook.
 */
export function useRefs<T>(
  initialValue: T | null,
  refs?: Array<AcceptedRef<T | null>>,
): React.RefObject<T>
/**
 * `useRefs` returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
 * The returned object will persist for the full lifetime of the component.
 *
 * This is generally equivalent to `useRef` with the added benefit to keep other refs in sync with this one
 *
 * Note that `useRefs()` is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 * @param initialValue The initial value for the ref. If it's `null` or `undefined`, the initially provided refs won't be updated with it
 * @param refs Optional refs array to keep updated with this ref
 * @returns Mutable Ref object to allow both reading and manipulating the ref from this hook.
 */
export function useRefs<T = undefined>(
  initialValue?: undefined,
  refs?: Array<AcceptedRef<T | undefined>>,
): React.RefObject<T | undefined>
/**
 * `useRefs` returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
 * The returned object will persist for the full lifetime of the component.
 *
 * This is generally equivalent to `useRef` with the added benefit to keep other refs in sync with this one
 *
 * Note that `useRefs()` is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 * @param initialValue The initial value for the ref. If it's `null` or `undefined`, the initially provided refs won't be updated with it
 * @param refs Optional refs array to keep updated with this ref
 * @returns Mutable Ref object to allow both reading and manipulating the ref from this hook.
 */
export function useRefs<T>(
  initialValue: T,
  refs?: Array<AcceptedRef<T>>,
): React.MutableRefObject<T> {
  const refToProxy = useRef<T>(
    initialValue as any,
  ) as React.MutableRefObject<T> & {
    [refsSymbol]: Array<AcceptedRef<T>>
  }
  // Create the proxy inside useState to ensure it's only ever created once
  const [proxiedRef] = useState(() => {
    function applyRefValue(ref: AcceptedRef<T>, value: T | null) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref && !Object.isFrozen(ref)) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    }
    const proxy = new Proxy(refToProxy, {
      set(target, p, value, receiver) {
        if (p === 'current') {
          target[refsSymbol].forEach(ref => {
            applyRefValue(ref, value)
          })
        } else if (p === refsSymbol && Array.isArray(value)) {
          const {current} = target
          if (current != null) {
            // Check which refs have changed.
            // There will still be some duplication if the refs passed in change
            // *and* the ref value changes in the same render
            const prevSet = new Set(target[refsSymbol])
            const newSet = new Set(value as AcceptedRef<T>[])
            prevSet.forEach(ref => {
              // Clear the value from removed refs
              if (!newSet.has(ref)) {
                applyRefValue(ref, null)
              }
            })
            newSet.forEach(ref => {
              // Add the value to new refs
              if (!prevSet.has(ref)) {
                applyRefValue(ref, current)
              }
            })
          }
        }
        return Reflect.set(target, p, value, receiver)
      },
    })
    return proxy
  })
  // ensure the refs is always an array
  // Update the current refs on each render
  // Refs are mutable and thus a bit
  proxiedRef[refsSymbol] = refs || []
  return proxiedRef
}

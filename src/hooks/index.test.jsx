import '@testing-library/jest-dom'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {useMergedRefs} from './agriffis/useMergedRefs'
import {useMergedRefs2} from './agriffis/useMergedRefs2'
import useReflector from './agriffis/useReflector'
import {useMergeRefs} from './use-callback-ref'
import {useRefs} from './ZachHaber/useRefs'

describe.each([
  ['agriffis/useMergedRefs', useMergedRefs],
  ['agriffis/useMergedRefs2', useMergedRefs2],
  ['agriffis/useReflector', useReflector],
  ['use-callback-ref', useMergeRefs],
  ['ZachHaber/useRefs', refs => useRefs(undefined, refs)],
])('%s', (_, useX) => {
  test('works with zero refs', async () => {
    const TestMe = () => {
      const mergedRef = useX([])
      return <div ref={mergedRef} data-testid="foo" />
    }
    render(<TestMe />)
    await screen.findByTestId('foo')
    // If we made it this far, we're good.
  })

  test('works with one ref', async () => {
    let current
    const TestMe = () => {
      const oneRef = useRef()
      const mergedRef = useX([oneRef])
      useLayoutEffect(() => {
        current = oneRef.current
      })
      return <div ref={mergedRef} data-testid="foo" />
    }
    render(<TestMe />)
    const div = await screen.findByTestId('foo')
    expect(current).toBe(div)
  })

  test('works with two refs', async () => {
    let currents
    const TestMe = () => {
      const oneRef = useRef()
      const twoRef = useRef()
      const mergedRef = useX([oneRef, twoRef])
      useLayoutEffect(() => {
        currents = [oneRef.current, twoRef.current]
      })
      return <div ref={mergedRef} data-testid="foo" />
    }
    render(<TestMe />)
    const div = await screen.findByTestId('foo')
    expect(currents).toEqual([div, div])
  })

  test('updates when ref moves to another element', async () => {
    let current
    const TestMe = () => {
      const [n, setN] = useState(1)
      const oneRef = useRef()
      const mergedRef = useX([oneRef])
      useLayoutEffect(() => {
        current = oneRef.current
      })
      return (
        <div data-testid="wrapper" onClick={() => setN(n => n + 1)}>
          <div ref={n === 1 ? mergedRef : undefined} data-testid="1" />
          <div ref={n === 2 ? mergedRef : undefined} data-testid="2" />
        </div>
      )
    }
    render(<TestMe />)
    const wrapper = await screen.findByTestId('wrapper')
    const div1 = await screen.findByTestId('1')
    const div2 = await screen.findByTestId('2')
    expect(current).toBe(div1)
    expect(current).not.toBe(div2)
    fireEvent.click(wrapper)
    await waitFor(() => expect(current).toBe(div2))
    expect(current).not.toBe(div1)
  })

  test('updates when element appears', async () => {
    let current
    const TestMe = () => {
      const [appeared, setAppeared] = useState(false)
      const oneRef = useRef()
      const mergedRef = useX([oneRef])
      useLayoutEffect(() => {
        current = oneRef.current
      })
      return (
        <div onClick={() => setAppeared(true)} data-testid="wrapper">
          {!appeared ? null : <div ref={mergedRef} data-testid="foo" />}
        </div>
      )
    }
    render(<TestMe />)
    const wrapper = await screen.findByTestId('wrapper')
    expect(screen.queryByTestId('foo')).toBeNull()
    fireEvent.click(wrapper)
    const tada = await screen.findByTestId('foo')
    expect(current).toBe(tada)
  })

  test('updates when element disappears', async () => {
    let current
    const TestMe = () => {
      const [disappeared, setDisappeared] = useState(false)
      const oneRef = useRef()
      const mergedRef = useX([oneRef])
      useLayoutEffect(() => {
        current = oneRef.current
      })
      return disappeared ? null : (
        <div
          ref={mergedRef}
          data-testid="foo"
          onClick={() => setDisappeared(true)}
        />
      )
    }
    render(<TestMe />)
    const tada = await screen.findByTestId('foo')
    expect(current).toBe(tada)
    fireEvent.click(tada)
    await waitFor(() => expect(screen.queryByTestId('foo')).toBeNull())
    expect(current).toBeNull()
  })

  test('handles adding new refs to the set', async () => {
    let currents
    const TestMe = () => {
      const [clicked, setClicked] = useState(false)
      const oneRef = useRef()
      const twoRef = useRef()
      const mergedRef = useX(!clicked ? [oneRef] : [oneRef, twoRef])
      useLayoutEffect(() => {
        currents = [oneRef.current, twoRef.current]
      })
      return (
        <div
          ref={mergedRef}
          data-testid="foo"
          onClick={() => setClicked(true)}
        />
      )
    }
    render(<TestMe />)
    const div = await screen.findByTestId('foo')
    expect(currents).toEqual([div, undefined])
    fireEvent.click(div)
    await waitFor(() => expect(currents).toEqual([div, div]))
  })

  test('handles nulling refs removed from the set', async () => {
    let currents
    const TestMe = () => {
      const [clicked, setClicked] = useState(false)
      const oneRef = useRef()
      const twoRef = useRef()
      const mergedRef = useX(clicked ? [oneRef] : [oneRef, twoRef])
      useLayoutEffect(() => {
        currents = [oneRef.current, twoRef.current]
      })
      return (
        <div
          ref={mergedRef}
          data-testid="foo"
          onClick={() => setClicked(true)}
        />
      )
    }
    render(<TestMe />)
    const div = await screen.findByTestId('foo')
    expect(currents).toEqual([div, div])
    fireEvent.click(div)
    await waitFor(() => expect(currents).toEqual([div, null]))
  })

  // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736587365
  test('protects sub-refs from null-then-value flip-flop', async () => {
    const mockCallbackRef = jest.fn()
    const TestMe = () => {
      const [clicked, setClicked] = useState(false)
      const extraRef = useRef()
      const mergedRef = useX(
        !clicked ? [mockCallbackRef] : [mockCallbackRef, extraRef],
      )
      return (
        <div
          ref={mergedRef}
          data-testid="foo"
          onClick={() => setClicked(true)}
        />
      )
    }
    render(<TestMe />)
    const div = await screen.findByTestId('foo')
    expect(mockCallbackRef.mock.calls).toEqual([[div]])
    fireEvent.click(div)
    // If hook doesn't protect, this will be [[div], [null], [div]]
    expect(mockCallbackRef.mock.calls).toEqual([[div]])
  })

  // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736587365
  test('returns a stable ref over sub-ref updates', async () => {
    const seen = new Set()
    const TestMe = () => {
      const [rerender, setRerender] = useState(false)
      const oneRef = useRef()
      const twoRef = useRef()
      const mergedRef = useX(!rerender ? [oneRef] : [oneRef, twoRef])
      seen.add(mergedRef)
      useEffect(() => setRerender(true), [])
      return <div>{rerender && <div ref={mergedRef} data-testid="foo" />}</div>
    }
    render(<TestMe />)
    await screen.findByTestId('foo')
    expect(seen.size).toEqual(1)
  })

  // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736417057
  test('updates before layout effects', async () => {
    let seen = []
    const TestMe = () => {
      const [rerender, setRerender] = useState(false)
      const oneRef = useRef()
      useLayoutEffect(() => {
        seen.push(oneRef.current)
        setRerender(true)
      })
      const mergedRef = useX(rerender ? [oneRef] : [])
      return <div ref={mergedRef} data-testid="foo" />
    }
    render(<TestMe />)
    const div = await screen.findByTestId('foo')
    await waitFor(() => expect(seen).toContain(div))
    // Failure here is [undefined, undefined]
    expect(seen).toEqual([undefined, div])
  })

  test('returns a gettable ref', async () => {
    let oneRef, mergedRef
    const TestMe = () => {
      oneRef = useRef()
      mergedRef = useX([oneRef])
      return <div ref={mergedRef} />
    }
    render(<TestMe />)
    expect(mergedRef.current).toBe(oneRef.current)
  })

  test('returns a settable ref', async () => {
    let oneRef, mergedRef
    const TestMe = () => {
      oneRef = useRef()
      mergedRef = useX([oneRef])
      useLayoutEffect(() => {
        mergedRef.current = 42
      }, [])
      return <div />
    }
    render(<TestMe />)
    expect(oneRef.current).toBe(42)
  })
})

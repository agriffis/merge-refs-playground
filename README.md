# merge-refs-playground

Contenders and tests for https://github.com/gregberge/react-merge-refs/issues/5

```
$ CI=true pnpm test >> README.md 2>&1

> merge-refs-playground@0.1.0 test /home/aron/src/merge-refs-playground
> react-scripts test

FAIL src/hooks/index.test.jsx
  agriffis/useMergedRefs
    ✓ works with zero refs (27 ms)
    ✓ works with one ref (4 ms)
    ✓ works with two refs (3 ms)
    ✓ updates when ref moves to another element (12 ms)
    ✓ updates when element appears (5 ms)
    ✓ updates when element disappears (5 ms)
    ✓ handles adding new refs to the set (4 ms)
    ✓ handles nulling refs removed from the set (3 ms)
    ✕ protects sub-refs from null-then-value flip-flop (10 ms)
    ✕ returns a stable ref over sub-ref updates (3 ms)
    ✓ updates before layout effects (5 ms)
    ✕ returns a gettable ref (3 ms)
    ✕ returns a settable ref (2 ms)
  agriffis/useMergedRefs2
    ✓ works with zero refs (1 ms)
    ✓ works with one ref (2 ms)
    ✓ works with two refs (1 ms)
    ✓ updates when ref moves to another element (4 ms)
    ✓ updates when element appears (3 ms)
    ✓ updates when element disappears (2 ms)
    ✓ handles adding new refs to the set (3 ms)
    ✓ handles nulling refs removed from the set (3 ms)
    ✕ protects sub-refs from null-then-value flip-flop (4 ms)
    ✕ returns a stable ref over sub-ref updates (2 ms)
    ✓ updates before layout effects (2 ms)
    ✓ returns a gettable ref (2 ms)
    ✓ returns a settable ref (2 ms)
  agriffis/useReflector
    ✓ works with zero refs (2 ms)
    ✓ works with one ref (1 ms)
    ✓ works with two refs (1 ms)
    ✓ updates when ref moves to another element (3 ms)
    ✓ updates when element appears (2 ms)
    ✓ updates when element disappears (2 ms)
    ✓ handles adding new refs to the set (2 ms)
    ✓ handles nulling refs removed from the set (2 ms)
    ✓ protects sub-refs from null-then-value flip-flop (2 ms)
    ✓ returns a stable ref over sub-ref updates (1 ms)
    ✕ updates before layout effects (1006 ms)
    ✕ returns a gettable ref (1 ms)
    ✕ returns a settable ref (1 ms)
  use-callback-ref
    ✓ works with zero refs (1 ms)
    ✓ works with one ref (2 ms)
    ✓ works with two refs (1 ms)
    ✓ updates when ref moves to another element (3 ms)
    ✓ updates when element appears (2 ms)
    ✓ updates when element disappears (2 ms)
    ✕ handles adding new refs to the set (1004 ms)
    ✕ handles nulling refs removed from the set (1003 ms)
    ✓ protects sub-refs from null-then-value flip-flop (1 ms)
    ✓ returns a stable ref over sub-ref updates (1 ms)
    ✕ updates before layout effects (1002 ms)
    ✓ returns a gettable ref (2 ms)
    ✓ returns a settable ref
  ZachHaber/useRefs
    ✓ works with zero refs (1 ms)
    ✓ works with one ref (2 ms)
    ✓ works with two refs (1 ms)
    ✓ updates when ref moves to another element (2 ms)
    ✓ updates when element appears (4 ms)
    ✓ updates when element disappears (2 ms)
    ✓ handles adding new refs to the set (2 ms)
    ✓ handles nulling refs removed from the set (3 ms)
    ✓ protects sub-refs from null-then-value flip-flop (3 ms)
    ✓ returns a stable ref over sub-ref updates (2 ms)
    ✓ updates before layout effects (2 ms)
    ✓ returns a gettable ref (1 ms)
    ✓ returns a settable ref (2 ms)

  ● agriffis/useMergedRefs › protects sub-refs from null-then-value flip-flop

    expect(received).toEqual(expected) // deep equality

    - Expected  - 0
    + Received  + 8

    @@ -2,6 +2,14 @@
        Array [
          <div
            data-testid="foo"
          />,
        ],
    +   Array [
    +     null,
    +   ],
    +   Array [
    +     <div
    +       data-testid="foo"
    +     />,
    +   ],
      ]

      203 |     fireEvent.click(div)
      204 |     // If hook doesn't protect, this will be [[div], [null], [div]]
    > 205 |     expect(mockCallbackRef.mock.calls).toEqual([[div]])
          |                                        ^
      206 |   })
      207 |
      208 |   // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736587365

      at Object.<anonymous> (src/hooks/index.test.jsx:205:40)

  ● agriffis/useMergedRefs › returns a stable ref over sub-ref updates

    expect(received).toEqual(expected) // deep equality

    Expected: 1
    Received: 2

      220 |     render(<TestMe />)
      221 |     await screen.findByTestId('foo')
    > 222 |     expect(seen.size).toEqual(1)
          |                       ^
      223 |   })
      224 |
      225 |   // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736417057

      at Object.<anonymous> (src/hooks/index.test.jsx:222:23)

  ● agriffis/useMergedRefs › returns a gettable ref

    expect(received).toBe(expected) // Object.is equality

    Expected: <div />
    Received: undefined

      251 |     }
      252 |     render(<TestMe />)
    > 253 |     expect(mergedRef.current).toBe(oneRef.current)
          |                               ^
      254 |   })
      255 |
      256 |   test('returns a settable ref', async () => {

      at Object.<anonymous> (src/hooks/index.test.jsx:253:31)
      at TestScheduler.scheduleTests (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/runJest.js:404:19)
      at _run10000 (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/cli/index.js:320:7)
      at runCLI (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/cli/index.js:173:3)

  ● agriffis/useMergedRefs › returns a settable ref

    expect(received).toBe(expected) // Object.is equality

    Expected: 42
    Received: undefined

      265 |     }
      266 |     render(<TestMe />)
    > 267 |     expect(oneRef.current).toBe(42)
          |                            ^
      268 |   })
      269 | })
      270 |

      at Object.<anonymous> (src/hooks/index.test.jsx:267:28)
      at TestScheduler.scheduleTests (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/runJest.js:404:19)
      at _run10000 (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/cli/index.js:320:7)
      at runCLI (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/cli/index.js:173:3)

  ● agriffis/useMergedRefs2 › protects sub-refs from null-then-value flip-flop

    expect(received).toEqual(expected) // deep equality

    - Expected  - 0
    + Received  + 8

    @@ -2,6 +2,14 @@
        Array [
          <div
            data-testid="foo"
          />,
        ],
    +   Array [
    +     null,
    +   ],
    +   Array [
    +     <div
    +       data-testid="foo"
    +     />,
    +   ],
      ]

      203 |     fireEvent.click(div)
      204 |     // If hook doesn't protect, this will be [[div], [null], [div]]
    > 205 |     expect(mockCallbackRef.mock.calls).toEqual([[div]])
          |                                        ^
      206 |   })
      207 |
      208 |   // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736587365

      at Object.<anonymous> (src/hooks/index.test.jsx:205:40)

  ● agriffis/useMergedRefs2 › returns a stable ref over sub-ref updates

    expect(received).toEqual(expected) // deep equality

    Expected: 1
    Received: 2

      220 |     render(<TestMe />)
      221 |     await screen.findByTestId('foo')
    > 222 |     expect(seen.size).toEqual(1)
          |                       ^
      223 |   })
      224 |
      225 |   // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736417057

      at Object.<anonymous> (src/hooks/index.test.jsx:222:23)

  ● agriffis/useReflector › updates before layout effects

    expect(received).toContain(expected) // indexOf

    Expected value: <div data-testid="foo" />
    Received array: [undefined, undefined]

    Ignored nodes: comments, script, style
    [36m<html>[39m
      [36m<head />[39m
      [36m<body>[39m
        [36m<div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"foo"[39m
          [36m/>[39m
        [36m</div>[39m
      [36m</body>[39m
    [36m</html>[39m

      238 |     render(<TestMe />)
      239 |     const div = await screen.findByTestId('foo')
    > 240 |     await waitFor(() => expect(seen).toContain(div))
          |                                      ^
      241 |     // Failure here is [undefined, undefined]
      242 |     expect(seen).toEqual([undefined, div])
      243 |   })

      at src/hooks/index.test.jsx:240:38
      at runWithExpensiveErrorDiagnosticsDisabled (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/config.js:52:12)
      at checkCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:141:77)
      at checkRealTimersCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:133:16)
      at Timeout.task [as _onTimeout] (node_modules/.pnpm/jsdom@16.7.0/node_modules/jsdom/lib/jsdom/browser/Window.js:516:19)

  ● agriffis/useReflector › returns a gettable ref

    expect(received).toBe(expected) // Object.is equality

    Expected: <div />
    Received: undefined

      251 |     }
      252 |     render(<TestMe />)
    > 253 |     expect(mergedRef.current).toBe(oneRef.current)
          |                               ^
      254 |   })
      255 |
      256 |   test('returns a settable ref', async () => {

      at Object.<anonymous> (src/hooks/index.test.jsx:253:31)
      at TestScheduler.scheduleTests (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/runJest.js:404:19)
      at _run10000 (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/cli/index.js:320:7)
      at runCLI (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/cli/index.js:173:3)

  ● agriffis/useReflector › returns a settable ref

    expect(received).toBe(expected) // Object.is equality

    Expected: 42
    Received: undefined

      265 |     }
      266 |     render(<TestMe />)
    > 267 |     expect(oneRef.current).toBe(42)
          |                            ^
      268 |   })
      269 | })
      270 |

      at Object.<anonymous> (src/hooks/index.test.jsx:267:28)
      at TestScheduler.scheduleTests (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/runJest.js:404:19)
      at _run10000 (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/cli/index.js:320:7)
      at runCLI (node_modules/.pnpm/@jest+core@27.5.1/node_modules/@jest/core/build/cli/index.js:173:3)

  ● use-callback-ref › handles adding new refs to the set

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 1

      Array [
        <div
          data-testid="foo"
        />,
    -   <div
    -     data-testid="foo"
    -   />,
    +   undefined,
      ]

    Ignored nodes: comments, script, style
    [36m<html>[39m
      [36m<head />[39m
      [36m<body>[39m
        [36m<div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"foo"[39m
          [36m/>[39m
        [36m</div>[39m
      [36m</body>[39m
    [36m</html>[39m

      153 |     expect(currents).toEqual([div, undefined])
      154 |     fireEvent.click(div)
    > 155 |     await waitFor(() => expect(currents).toEqual([div, div]))
          |                                          ^
      156 |   })
      157 |
      158 |   test('handles nulling refs removed from the set', async () => {

      at src/hooks/index.test.jsx:155:42
      at runWithExpensiveErrorDiagnosticsDisabled (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/config.js:52:12)
      at checkCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:141:77)
      at checkRealTimersCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:133:16)
      at Timeout.task [as _onTimeout] (node_modules/.pnpm/jsdom@16.7.0/node_modules/jsdom/lib/jsdom/browser/Window.js:516:19)

  ● use-callback-ref › handles nulling refs removed from the set

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 3

      Array [
        <div
          data-testid="foo"
        />,
    -   null,
    +   <div
    +     data-testid="foo"
    +   />,
      ]

    Ignored nodes: comments, script, style
    [36m<html>[39m
      [36m<head />[39m
      [36m<body>[39m
        [36m<div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"foo"[39m
          [36m/>[39m
        [36m</div>[39m
      [36m</body>[39m
    [36m</html>[39m

      178 |     expect(currents).toEqual([div, div])
      179 |     fireEvent.click(div)
    > 180 |     await waitFor(() => expect(currents).toEqual([div, null]))
          |                                          ^
      181 |   })
      182 |
      183 |   // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736587365

      at src/hooks/index.test.jsx:180:42
      at runWithExpensiveErrorDiagnosticsDisabled (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/config.js:52:12)
      at checkCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:141:77)
      at checkRealTimersCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:133:16)
      at Timeout.task [as _onTimeout] (node_modules/.pnpm/jsdom@16.7.0/node_modules/jsdom/lib/jsdom/browser/Window.js:516:19)

  ● use-callback-ref › updates before layout effects

    expect(received).toContain(expected) // indexOf

    Expected value: <div data-testid="foo" />
    Received array: [undefined, undefined]

    Ignored nodes: comments, script, style
    [36m<html>[39m
      [36m<head />[39m
      [36m<body>[39m
        [36m<div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"foo"[39m
          [36m/>[39m
        [36m</div>[39m
      [36m</body>[39m
    [36m</html>[39m

      238 |     render(<TestMe />)
      239 |     const div = await screen.findByTestId('foo')
    > 240 |     await waitFor(() => expect(seen).toContain(div))
          |                                      ^
      241 |     // Failure here is [undefined, undefined]
      242 |     expect(seen).toEqual([undefined, div])
      243 |   })

      at src/hooks/index.test.jsx:240:38
      at runWithExpensiveErrorDiagnosticsDisabled (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/config.js:52:12)
      at checkCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:141:77)
      at checkRealTimersCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:133:16)
      at Timeout.task [as _onTimeout] (node_modules/.pnpm/jsdom@16.7.0/node_modules/jsdom/lib/jsdom/browser/Window.js:516:19)

Test Suites: 1 failed, 1 total
Tests:       12 failed, 53 passed, 65 total
Snapshots:   0 total
Time:        5.085 s, estimated 6 s
Ran all test suites.
 ELIFECYCLE  Test failed. See above for more details.
```

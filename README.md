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
    ✓ works with two refs (5 ms)
    ✓ updates when ref moves to another element (12 ms)
    ✓ updates when element appears (5 ms)
    ✓ updates when element disappears (5 ms)
    ✓ handles adding new refs to the set (3 ms)
    ✓ handles nulling refs removed from the set (4 ms)
    ✕ protects sub-refs from null-then-value flip-flop (10 ms)
    ✓ updates before layout effects (3 ms)
  agriffis/useReflector
    ✓ works with zero refs (2 ms)
    ✓ works with one ref (2 ms)
    ✓ works with two refs (2 ms)
    ✓ updates when ref moves to another element (4 ms)
    ✓ updates when element appears (2 ms)
    ✓ updates when element disappears (3 ms)
    ✓ handles adding new refs to the set (3 ms)
    ✓ handles nulling refs removed from the set (3 ms)
    ✓ protects sub-refs from null-then-value flip-flop (2 ms)
    ✕ updates before layout effects (2 ms)
  use-callback-ref
    ✓ works with zero refs (1 ms)
    ✓ works with one ref (2 ms)
    ✓ works with two refs (1 ms)
    ✓ updates when ref moves to another element (3 ms)
    ✓ updates when element appears (6 ms)
    ✓ updates when element disappears (2 ms)
    ✕ handles adding new refs to the set (1007 ms)
    ✕ handles nulling refs removed from the set (1004 ms)
    ✓ protects sub-refs from null-then-value flip-flop (2 ms)
    ✕ updates before layout effects (2 ms)
  ZachHaber/useRefs
    ✓ works with zero refs (1 ms)
    ✓ works with one ref (1 ms)
    ✓ works with two refs (2 ms)
    ✓ updates when ref moves to another element (2 ms)
    ✓ updates when element appears (2 ms)
    ✓ updates when element disappears (2 ms)
    ✓ handles adding new refs to the set (2 ms)
    ✓ handles nulling refs removed from the set (3 ms)
    ✓ protects sub-refs from null-then-value flip-flop (2 ms)
    ✓ updates before layout effects (2 ms)

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

      201 |     fireEvent.click(div)
      202 |     // If hook doesn't protect, this will be [[div], [null], [div]]
    > 203 |     expect(mockCallbackRef.mock.calls).toEqual([[div]])
          |                                        ^
      204 |   })
      205 |
      206 |   // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736417057

      at Object.<anonymous> (src/hooks/index.test.jsx:203:40)

  ● agriffis/useReflector › updates before layout effects

    expect(received).toBe(expected) // Object.is equality

    Expected: <div data-testid="foo" />
    Received: undefined

      219 |     render(<TestMe />)
      220 |     const div = await screen.findByTestId('foo')
    > 221 |     expect(current).toBe(div)
          |                     ^
      222 |   })
      223 | })
      224 |

      at Object.<anonymous> (src/hooks/index.test.jsx:221:21)

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

      151 |     expect(currents).toEqual([div, undefined])
      152 |     fireEvent.click(div)
    > 153 |     await waitFor(() => expect(currents).toEqual([div, div]))
          |                                          ^
      154 |   })
      155 |
      156 |   test('handles nulling refs removed from the set', async () => {

      at src/hooks/index.test.jsx:153:42
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

      176 |     expect(currents).toEqual([div, div])
      177 |     fireEvent.click(div)
    > 178 |     await waitFor(() => expect(currents).toEqual([div, null]))
          |                                          ^
      179 |   })
      180 |
      181 |   // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736587365

      at src/hooks/index.test.jsx:178:42
      at runWithExpensiveErrorDiagnosticsDisabled (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/config.js:52:12)
      at checkCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:141:77)
      at checkRealTimersCallback (node_modules/.pnpm/@testing-library+dom@8.18.0/node_modules/@testing-library/dom/dist/wait-for.js:133:16)
      at Timeout.task [as _onTimeout] (node_modules/.pnpm/jsdom@16.7.0/node_modules/jsdom/lib/jsdom/browser/Window.js:516:19)

  ● use-callback-ref › updates before layout effects

    expect(received).toBe(expected) // Object.is equality

    Expected: <div data-testid="foo" />
    Received: undefined

      219 |     render(<TestMe />)
      220 |     const div = await screen.findByTestId('foo')
    > 221 |     expect(current).toBe(div)
          |                     ^
      222 |   })
      223 | })
      224 |

      at Object.<anonymous> (src/hooks/index.test.jsx:221:21)

Test Suites: 1 failed, 1 total
Tests:       5 failed, 35 passed, 40 total
Snapshots:   0 total
Time:        4.331 s
Ran all test suites.
 ELIFECYCLE  Test failed. See above for more details.
```

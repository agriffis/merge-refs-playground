# merge-refs-playground

Contenders and tests for https://github.com/gregberge/react-merge-refs/issues/5

```
$ CI=true pnpm test >> README.md 2>&1

> merge-refs-playground@0.1.0 test /home/aron/src/merge-refs-playground
> react-scripts test

FAIL src/hooks/index.test.jsx
  agriffis/useMergedRefs
    ✓ works with zero refs (28 ms)
    ✓ works with one ref (5 ms)
    ✓ works with two refs (3 ms)
    ✓ updates when ref moves to another element (12 ms)
    ✓ updates when element appears (6 ms)
    ✓ updates when element disappears (5 ms)
    ✓ handles adding new refs to the set (4 ms)
    ✓ handles nulling refs removed from the set (4 ms)
    ✕ protects sub-refs from null-then-value flip-flop (11 ms)
    ✓ updates before layout effects (3 ms)
  agriffis/useReflector
    ✓ works with zero refs (5 ms)
    ✓ works with one ref (3 ms)
    ✓ works with two refs (2 ms)
    ✓ updates when ref moves to another element (3 ms)
    ✓ updates when element appears (2 ms)
    ✓ updates when element disappears (3 ms)
    ✓ handles adding new refs to the set (3 ms)
    ✓ handles nulling refs removed from the set (3 ms)
    ✓ protects sub-refs from null-then-value flip-flop (2 ms)
    ✕ updates before layout effects (2 ms)
  ZachHaber/useRefs
    ✓ works with zero refs (1 ms)
    ✓ works with one ref (2 ms)
    ✓ works with two refs (1 ms)
    ✓ updates when ref moves to another element (3 ms)
    ✓ updates when element appears (3 ms)
    ✓ updates when element disappears (2 ms)
    ✓ handles adding new refs to the set (2 ms)
    ✓ handles nulling refs removed from the set (3 ms)
    ✓ protects sub-refs from null-then-value flip-flop (1 ms)
    ✓ updates before layout effects (1 ms)

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

      199 |     fireEvent.click(div)
      200 |     // If hook doesn't protect, this will be [[div], [null], [div]]
    > 201 |     expect(mockCallbackRef.mock.calls).toEqual([[div]])
          |                                        ^
      202 |   })
      203 |
      204 |   // https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-736417057

      at Object.<anonymous> (src/hooks/index.test.jsx:201:40)

  ● agriffis/useReflector › updates before layout effects

    expect(received).toBe(expected) // Object.is equality

    Expected: <div data-testid="foo" />
    Received: undefined

      217 |     render(<TestMe />)
      218 |     const div = await screen.findByTestId('foo')
    > 219 |     expect(current).toBe(div)
          |                     ^
      220 |   })
      221 | })
      222 |

      at Object.<anonymous> (src/hooks/index.test.jsx:219:21)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 28 passed, 30 total
Snapshots:   0 total
Time:        0.981 s, estimated 1 s
Ran all test suites.
 ELIFECYCLE  Test failed. See above for more details.
```

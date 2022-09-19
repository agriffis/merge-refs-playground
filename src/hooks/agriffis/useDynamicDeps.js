/**
 * Avoid useless StrictMode error in development if the deps array length
 * changes. There's really no good reason for this error--the code could have
 * been written to accommodate a changing array length easily. In development,
 * work around the error by ensuring a consistent length. In production,
 * prefixing the length is sufficient to ensure that a change will trigger a new
 * callback.
 */
export const useDynamicDeps = (deps, max = 99) => {
  deps = [deps.length, ...deps]
  if (process.env.NODE_ENV === 'production') {
    return deps
  }
  const staticDeps = new Array(max)
  staticDeps.splice(0, deps.length, ...deps)
  return staticDeps
}

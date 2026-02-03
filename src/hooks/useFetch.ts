import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type AsyncFn<T> = (signal: AbortSignal) => Promise<T>

type UseFetchState<T> = {
  data: T | null
  error: Error | null
  isLoading: boolean
}

export function useFetch<T>(fn: AsyncFn<T>, deps: readonly unknown[] = []) {
  const abortRef = useRef<AbortController | null>(null)

  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  })

  const run = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const data = await fn(controller.signal)
      if (!controller.signal.aborted) setState({ data, error: null, isLoading: false })
    } catch (err) {
      if (controller.signal.aborted) return
      const error = err instanceof Error ? err : new Error('Unknown error')
      setState({ data: null, error, isLoading: false })
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    void run()
    return () => abortRef.current?.abort()
  }, [run])

  return useMemo(
    () => ({
      ...state,
      refetch: run,
    }),
    [state, run],
  )
}


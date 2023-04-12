export const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  const response = await fetch(...args)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data as T
}
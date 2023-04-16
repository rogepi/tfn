import useSWR from 'swr'

export const useFav = (address: string) => {
  const { data, mutate } = useSWR<{ data: string[] }>(address ? `/api/fav?userId=${address}` : null,)

  const fav = (nftId: string) => {
    if (data) {
      const updateFn = async (nftId: string) => {
        const res = await fetch(`/api/fav?userId=${address}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: address, nftId }),
        })
        const data = await res.json() as string[]
        return { data }
      }

      mutate(updateFn(nftId), {
        optimisticData: (data) => {
          if (data) {
            return { data: [...data.data, nftId] }
          } else {
            return { data: [] }
          }
        },
        rollbackOnError: true
      })
    }
  }

  const cancel = (nftId: string) => {
    if (data) {
      const updateFn = async (nftId: string) => {
        const res = await fetch(`/api/fav?userId=${address}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: address, nftId }),
        })
        const data = await res.json() as string[]
        return { data }
      }
      mutate(updateFn(nftId), {
        optimisticData: (data) => {
          if (data) {
            return { data: data.data.filter((id: string) => id !== nftId) }
          } else {
            return { data: [] }
          }
        },
        rollbackOnError: true
      })
    }
  }

  return { data, fav, cancel }
}
import useSWR from 'swr'

export const useCart = (id: string) => {

  const { data: cart, mutate } = useSWR(`/api/cart?id=${id}`)
  const update = async (cart: string[]) => {
    const updateFn = async (cart: string[]) => await fetch(`/api/cart?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })

    mutate(updateFn(cart), {
      optimisticData: cart,
      rollbackOnError: true
    })
  }

  return { cart, update }
}
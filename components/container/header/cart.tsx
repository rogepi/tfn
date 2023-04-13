import { Fragment, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import { useAddress } from "@thirdweb-dev/react"
import useSWR from "swr"
import { fetcher } from "~/helper/utils/fetcher"

const Cart = ({ id }: { id: string }) => {
  const address = useAddress()
  const { data: cart, mutate } = useSWR(`/api/cart?id=${id}`, fetcher)
  const [nftId, setNftId] = useState('')
  const addToCart = async () => {
    if (nftId) {
      await fetch(`/api/cart?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nftId }),
      })
      setNftId('')
      mutate()
    }
  }

  const removeFromCart = async (nftId: string) => {
    await fetch(`/api/cart?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nftId }),
    })
    mutate()
  }

  return (
    <div className=" relative w-full max-w-sm px-4">
      <Popover>
        {
          ({ open }) => (
            <>
              <Popover.Button className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">

                <ShoppingBagIcon className="h-6 w-6 " />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-10 mt-2 w-60 rounded-md border p-3 font-semibold shadow dark:divide-gray-500 dark:border-gray-500 dark:shadow-gray-800">
                  <header>My Cart</header>
                  <div>

                  </div>
                  <div>
                    <button>Settlement</button>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )
        }
      </Popover >
    </div >
  )
}

export default Cart
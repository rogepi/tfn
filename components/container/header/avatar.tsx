import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDisconnect } from '@thirdweb-dev/react'
import { Jazzicon } from '@ukstv/jazzicon-react'
import Link from 'next/link'

const AvatarImage = ({ address }: { address: string }) => {
  return (
    <div
      className="h-9 w-9  rounded-full
    border-gray-400 hover:border-2 dark:border-white"
    >
      <Jazzicon address={address} />
    </div>
  )
}

const AvatarPopoverItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700">
      {children}
    </div>
  )
}

const Avatar = ({ address }: { address: string }) => {
  const disconnect = useDisconnect()
  return (
    <div >
      <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button className="flex">
            <AvatarImage address={address} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute -right-8 mt-2 w-28 origin-top-right divide-y overflow-hidden rounded-md border text-center
        font-semibold shadow dark:divide-gray-500 dark:border-gray-500 dark:shadow-gray-800">
            <Menu.Item>
              <AvatarPopoverItem>
                <Link href="/profile">Profile</Link>
              </AvatarPopoverItem>
            </Menu.Item>
            <Menu.Item>
              <AvatarPopoverItem>
                <button onClick={disconnect}>Log out</button>
              </AvatarPopoverItem>
            </Menu.Item>
          </Menu.Items >
        </Transition>
      </Menu >
    </div>

  )
}

export default Avatar

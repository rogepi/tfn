import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

export interface INFTDropDownMenuItem {
  label: string | JSX.Element
  onClick: () => void
}

export interface INFTDropDownMenu {
  children: React.ReactNode
  menu: INFTDropDownMenuItem[]
}

const NFTDropDownMenu = ({ children, menu }: INFTDropDownMenu) => {
  return (
    <div>
      <Menu as="div" className="relative text-left">
        <Menu.Button >
          {children}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className='absolute right-0 top-9 z-50 inline-block
         w-32 divide-y overflow-hidden rounded-md border bg-white font-semibold shadow dark:bg-gray-900'>
            {
              menu.map((item, index) => (
                <Menu.Item key={index}>
                  <button onClick={item.onClick} className="w-full bg-white p-1 outline-none hover:bg-blue-500 hover:text-white">
                    {item.label}
                  </button>
                </Menu.Item>
              ))
            }
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default NFTDropDownMenu
import { Menu, Transition } from '@headlessui/react'

import React from 'react'


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
      </Menu>
    </div>
  )
}

export default NFTDropDownMenu
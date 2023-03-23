import * as RadixDropDownMenu from '@radix-ui/react-dropdown-menu'
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

    <RadixDropDownMenu.Root>
      <RadixDropDownMenu.Trigger asChild>
        {children}
      </RadixDropDownMenu.Trigger>

      <RadixDropDownMenu.Portal >
        <RadixDropDownMenu.Content className='absolute -right-3 top-1 w-32 divide-y overflow-hidden
         rounded-md border bg-white  font-semibold shadow dark:bg-gray-900'>
          {
            menu.map((item, index) => (
              <RadixDropDownMenu.Item onClick={item.onClick} key={index}>
                <button className="w-full p-1 outline-none hover:bg-blue-500 hover:text-white">
                  {item.label}
                </button>
              </RadixDropDownMenu.Item>
            ))
          }
        </RadixDropDownMenu.Content>
      </RadixDropDownMenu.Portal>
    </RadixDropDownMenu.Root>
  )
}

export default NFTDropDownMenu
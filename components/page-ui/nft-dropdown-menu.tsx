import * as RadixDropDownMenu from '@radix-ui/react-dropdown-menu'
import React from 'react'


export interface INFTDropDownMenuItem {
  label: string
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

      <RadixDropDownMenu.Portal>
        <RadixDropDownMenu.Content>
          {
            menu.map((item, index) => (
              <RadixDropDownMenu.Item onClick={item.onClick} key={index}>
                {item.label}
              </RadixDropDownMenu.Item>
            ))
          }
        </RadixDropDownMenu.Content>
      </RadixDropDownMenu.Portal>
    </RadixDropDownMenu.Root>
  )
}

export default NFTDropDownMenu
import Image from 'next/image'
import Nav from './nav'
import ThemeSwitch from './theme-switch'
import Wallet from './wallet'
import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import Logo from '~/public/emoji.svg'
import Link from 'next/link'
import { NAVCONFIG } from '~/config/nav'

const _Header = () => {
  return (
    <header className="sticky top-0 p-1 dark:bg-slate-800 md:px-16 ">
      <Navbar>
        <Navbar.Brand>
          <Link href="/" className="mr-3 flex">
            <Image className="mr-3" src={Logo} alt="Logo" width={40} />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              TFN
            </span>
          </Link>
          <Navbar.Toggle />
        </Navbar.Brand>
        <div className="flex items-center gap-3 md:order-2">
          <ThemeSwitch />
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar size="sm" alt="User settings" rounded={true} />}
          >
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Lay out</Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Collapse>
          {NAVCONFIG.map((item, index) => {
            return (
              <Navbar.Link href={item.href} key={index}>
                {item.title}
              </Navbar.Link>
            )
          })}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

const Header = () => {
  return (
    <header className="flex justify-between p-10">
      <Link href="/" className="flex items-center justify-center gap-1">
        <Image src={Logo} alt="Logo" width={40} />
        <span className="text-3xl font-black">TFN</span>
      </Link>
      <div className="flex items-center justify-center space-x-14">
        <Nav />
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <Link href="/upload">
            <button className="rounded-full bg-blue-500 p-2 px-3 text-sm font-semibold text-white hover:bg-blue-400">
              Upload
            </button>
          </Link>
          <Wallet />
        </div>
      </div>
    </header>
  )
}

export default Header

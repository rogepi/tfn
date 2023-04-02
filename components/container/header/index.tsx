import Image from 'next/image'
import Nav from './nav'
import ThemeSwitch from './theme-switch'
import Wallet from './wallet'
import Logo from '~/public/emoji.svg'
import Link from 'next/link'

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

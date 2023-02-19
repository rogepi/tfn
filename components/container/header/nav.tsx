import Link from 'next/link'
import { NAVCONFIG } from '~/config/nav'

const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-10 font-semibold">
        {NAVCONFIG.map((item) => {
          return (
            <li key={item.href}>
              <Link href={item.href}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav

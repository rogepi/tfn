import { useTheme } from 'next-themes'
import useMounted from '~/hooks/use-mounted'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const ThemeSwitch = () => {
  const mounted = useMounted()
  const { theme, setTheme } = useTheme()

  function toggle() {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  if (!mounted) return null
  return (
    <button
      onClick={() => toggle()}
      className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100
      focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6" />
      ) : (
        <SunIcon className="h-6" />
      )}
    </button>
  )
}

export default ThemeSwitch

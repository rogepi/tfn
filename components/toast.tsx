import { useTheme } from "next-themes"
import { EXPORT_DETAIL } from "next/dist/shared/lib/constants"
import { Toaster } from "react-hot-toast"

const MyToaster = () => {
  const { theme, setTheme } = useTheme()


  return (
    <Toaster toastOptions={{ style: theme === 'light' ? {} : { background: '#333', color: '#fff' } }} />
  )
}

export default MyToaster
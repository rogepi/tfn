import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t py-5 px-10 text-center text-sm text-gray-500 dark:border-slate-700 dark:bg-slate-900">
      TFN, A NFT Marketplace power by{' '}
      <Link
        className="text-violet-500 hover:text-violet-700"
        href="https://thirdweb.com/"
        target="_black"
      >
        thirdweb
      </Link>
    </footer>
  )
}

export default Footer

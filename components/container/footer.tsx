import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="my-5 border-t p-5 text-center text-sm text-gray-500">
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

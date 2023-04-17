import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const QA = () => {

  const copywriting = [
    { q: 'What is an NFT trading platform?', a: 'An NFT trading platform is an online marketplace that allows users to buy, sell, or trade non-fungible tokens (NFTs). These NFTs represent the unique ownership or rights to digital assets such as digital art, virtual land, game items, and more.' },
    {
      q: 'How do I buy an NFT on an NFT trading platform?', a: 'First, you need to register an account. Then, you can browse the market of NFTs on the platform and choose the one you want to buy. Once you find an NFT you like, you can click the "buy" button and pay the corresponding currency or cryptocurrency. Once the transaction is completed, you own the NFT.'
    },
    {
      q: 'How do I sell an NFT on an NFT trading platform?',
      a: 'First, you need to register an account. Then, you can create a listing for your NFT and set a price on the platform. Once someone buys your NFT, you will receive the corresponding currency or cryptocurrency and transfer ownership to the buyer.'
    },
    {
      q: 'How can I ensure the safety of my NFT transactions?',
      a: `NFT trading platforms typically use some security measures to protect user transactions, such as multisignature, smart contracts, identity verification, and more. In addition, you should also be aware of scams and fraudulent behavior, such as not trusting unverified transactions or sharing your private wallet information. If you encounter any problems, you can contact the platform's customer support team.`
    },
    {
      q: 'What fees do I need to pay to use an NFT trading platform?',
      a: 'The supported cryptocurrencies may vary by different NFT trading platforms, but generally include Bitcoin, Ethereum, and other major cryptocurrencies. After registering on the platform, you can view the list of supported cryptocurrencies.'
    },

  ]
  return (
    <>
      <section className="mt-10 mb-5 space-y-5">
        <h1 className="text-5xl">Q&A</h1>
        <div className="text-xl text-gray-600">
          Question and Answer
        </div>
      </section>
      <section>
        <div className="w-full">
          <div className="w-full rounded-2xl bg-white p-2">
            {
              copywriting.map((item, index) => {
                return (
                  <Disclosure as="div" key={index} className="mt-2" defaultOpen={index === 0}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                          <span className='text-lg'>{item.q}</span>
                          <ChevronUpIcon
                            className={`${open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-blue-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <span className='text-lg'>{item.a}</span>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              })
            }

          </div>
        </div>
      </section>
    </>
  )
}

export default QA
import { CurrencyDollarIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/solid'
import { useContract, useNetwork, useNetworkMismatch, useNFT } from '@thirdweb-dev/react'
import { NFT } from '@thirdweb-dev/sdk'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ADDRESS } from '~/config/address'
import { getListing, getListings, sdk, getNFTs, getNFT } from '~/helper/sdk'

export const getStaticPaths: GetStaticPaths = async () => {
  const list = await getNFTs()
  const paths = list.map(item => ({ params: { id: item.metadata.id } }))
  return {
    paths, fallback: false
  }
}

interface INFTwithPrice {
  nft: NFT
  price?: string
}

export const getStaticProps: GetStaticProps<{ nftWithPrice: INFTwithPrice }> = async (context) => {
  const id = context.params?.id
  const nft = await getNFT(id as string)
  const listings = await getListings({})
  const isSales = listings.find(item => item.tokenId === nft.metadata.id)
  let _nft: INFTwithPrice = {} as INFTwithPrice
  if (isSales) {
    _nft.price = isSales.buyoutCurrencyValuePerToken.displayValue
  }
  _nft.nft = nft
  return {
    props: {
      // listing
      nftWithPrice: _nft
    }
  }
}

const NFTDetail = ({ nftWithPrice }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isLoading, setIsLoading] = useState(false)
  const { contract } = useContract(ADDRESS.MARKETPLACE, 'marketplace')

  const networkMismatch = useNetworkMismatch()
  const [, switchNetwork] = useNetwork()
  const buy = async (id: string) => {
    if (networkMismatch) {
      switchNetwork && switchNetwork(5)
      return
    }
    setIsLoading(true)
    await contract?.buyoutListing(id, 1)
    // console.log(result?.receipt.status)
    setIsLoading(false)
  }

  return (
    <div className='flex gap-16'>
      <div className='h-[30vw] w-[30vw] border p-3'>
        <div className="relative block h-full w-full">
          <Image src={nftWithPrice.nft.metadata.image as string} alt={nftWithPrice.nft.metadata.name as string} fill sizes="100" />
        </div>
      </div>
      <div>
        <div className='text-4xl font-bold'>
          {nftWithPrice.nft.metadata.name} #{nftWithPrice.nft.metadata.id}
        </div>
        <div className='my-3 text-xs'>Owned by
          <Link className='ml-1 text-blue-600' href={''}>
            {nftWithPrice.nft.owner}
          </Link>
        </div>
        <div className='flex gap-3'>
          <div className='my-3 flex gap-1 text-sm text-gray-600'>
            <EyeIcon className='w-4' />
            <span>100</span>
            <span>views</span>
          </div>
          <div className='my-3 flex gap-1 text-sm text-gray-600'>
            <HeartIcon className='w-4' />
            <span>100</span>
            <span>favorite</span>
          </div>
        </div>

        <div className='mt-6'>
          <div className='flex text-gray-600'>
            <CurrencyDollarIcon className='w-5' />
            Current price
          </div>
          <div className=' text-5xl font-bold'>
            {nftWithPrice.price}ETH
          </div>
        </div>

        <div className='mt-10 flex gap-10'>
          <button onClick={() => buy(nftWithPrice.nft.metadata.id)} disabled={isLoading} className='flex h-16 w-40 items-center
           justify-center rounded-md bg-blue-500 text-xl font-semibold text-white hover:bg-blue-400'>
            {isLoading ? 'Processing...' : 'Buy'}</button>
          <button className='flex h-16 w-32 items-center justify-center
            rounded-md bg-rose-500 text-xl font-semibold text-white hover:bg-rose-400'>
            <HeartIcon className='w-8' /></button>
        </div>
      </div>
    </div>
  )
}

export default NFTDetail
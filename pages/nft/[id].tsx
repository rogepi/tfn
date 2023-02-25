import { CurrencyDollarIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/solid'
import { useContract, useNetwork, useNetworkMismatch } from '@thirdweb-dev/react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ADDRESS } from '~/config/address'
import { INFTDetail, getListing, getListings, sdk } from '~/helper/sdk'

export const getStaticPaths: GetStaticPaths = async () => {
  const listings = await getListings({})
  const paths = listings.map(item => ({ params: { id: item.id } }))
  return {
    paths, fallback: false
  }
}

export const getStaticProps: GetStaticProps<{ listing: INFTDetail }> = async (context) => {
  const id = context.params?.id
  const listing = await getListing(id as string)
  return {
    props: {
      listing
    }
  }
}

const NFTDetail = ({ listing }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          <Image src={listing.image as string} alt={listing.name as string} fill sizes="100" />
        </div>
      </div>
      <div>
        <div className='text-4xl font-bold'>
          {listing.name} #{listing.tokenId}
        </div>
        <div className='my-3 text-xs'>Owned by
          <Link className='ml-1 text-blue-600' href={''}>
            {listing.author}
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
            {listing.price}ETH
          </div>
        </div>

        <div className='mt-10 flex gap-10'>
          <button onClick={() => buy(listing.id)} disabled={isLoading} className='flex h-16 w-40 items-center
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
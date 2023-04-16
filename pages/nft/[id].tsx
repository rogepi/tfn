import useSWR from 'swr'
import { CurrencyDollarIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/solid'
import { useAddress, useContract, useNetwork, useNetworkMismatch, useNFT } from '@thirdweb-dev/react'
import { NFT } from '@thirdweb-dev/sdk'
import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ADDRESS } from '~/config/address'
import { getListingsByRedis, getNFTsByRedis } from '~/helper/redis'
import { useFav } from '~/hooks/use-fav'

export const getStaticPaths: GetStaticPaths = async () => {
  const list = await getNFTsByRedis()
  const paths = list.map(item => ({ params: { id: item.metadata.id } }))
  return {
    paths, fallback: false
  }
}

interface INFTwithPrice {
  nft: NFT
  price?: string
  listingId?: string
}

export const getStaticProps: GetStaticProps<{ nftWithPrice: INFTwithPrice }> = async (context) => {
  const id = context.params?.id
  const nfts = await getNFTsByRedis()
  const listings = await getListingsByRedis()
  const nft = nfts.find(item => item.metadata.id === id) as NFT
  const isSales = listings.find(item => item.asset.id === nft.metadata.id)
  let _nft: INFTwithPrice = {} as INFTwithPrice
  if (isSales) {
    _nft.price = isSales.buyoutCurrencyValuePerToken.displayValue
    _nft.listingId = isSales.id
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
  const { data: countData, mutate
  } = useSWR<{ nftId: string, count: number }>(`/api/fav/count?nftId=${nftWithPrice.nft.metadata.id}`)

  const count = countData?.count || 0

  const address = useAddress()
  const isMe = useMemo(() => address === nftWithPrice.nft.owner, [address, nftWithPrice.nft.owner])

  const { data: favs, fav, cancel } = useFav(address as string)
  const isFav = (favs?.data?.find) && (favs.data)?.find(item => item == nftWithPrice.nft.metadata.id)
  const handleFav = () => {
    if (isFav) {
      cancel(nftWithPrice.nft.metadata.id)
    } else {
      fav(nftWithPrice.nft.metadata.id)
    }
    mutate({ nftId: nftWithPrice.nft.metadata.id, count: isFav ? count - 1 : count + 1 }, false)
  }

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
    fetch('/api/nft/update')
    fetch('/api/listing/update')
  }

  return (
    <div className='flex gap-16'>
      <div className='h-[30vw] w-[30vw] border p-3'>
        <div className="relative block h-full w-full">
          <Image src={nftWithPrice.nft.metadata.image as string} alt={nftWithPrice.nft.metadata.name as string} fill sizes="100" />
        </div>
      </div>
      <div>
        <div className='flex text-6xl font-bold'>
          {nftWithPrice.nft.metadata.name}
          <div className='mt-1 text-sm text-gray-600'>
            #{nftWithPrice.nft.metadata.id}
          </div>
        </div>

        <div className='my-3 text-xs'>Owned by
          <Link className='ml-1 text-blue-600' href={''}>
            {isMe ? 'me' : nftWithPrice.nft.owner}
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
          {
            !isMe && nftWithPrice.price &&
            <button onClick={() => buy(nftWithPrice.listingId as string)} disabled={isLoading} className='flex h-16 w-40 items-center
            justify-center rounded-md bg-blue-500 text-xl font-semibold text-white hover:bg-blue-400'>
              {isLoading ? 'Processing...' : 'Buy'}</button>
          }
          <button onClick={handleFav} className={clsx('flex h-16 w-32 items-center justify-center gap-1 rounded-md  text-xl font-semibold text-white hover:bg-rose-400',
            isFav ? 'bg-rose-500' : 'border border-gray-300 bg-gray-300')
          }>
            <HeartIcon className='w-8' />{count}</button>
        </div>
      </div>
    </div >
  )
}

export default NFTDetail
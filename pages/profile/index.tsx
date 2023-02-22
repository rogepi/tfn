import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
import { NFT, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { NextPage } from 'next'
import Link from 'next/link'
import NFTList from '~/components/nft-list'
import { ADDRESS } from '~/config/address'
import useSWR from 'swr'

const Address = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, isLoading, error } = useSWR(`/api/nft/${useAddress()}`, fetcher)
  console.log(data)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // 渲染数据
  return <div>hello {data}!</div>
}

const Profile: NextPage = () => {
  const { contract } = useContract(ADDRESS.NFT_COLLECTION, 'nft-collection')
  const { data } = useOwnedNFTs(contract, useAddress())
  console.log(data)

  return (
    <>
      <section className="mt-10 mb-5 space-y-5">
        <h1 className="text-5xl">Profile</h1>
        <div className="text-xl text-gray-600">
          Manage your NFTs
        </div>
      </section>
      <div>
        <div className="mb-3 flex items-center gap-3 font-bold">
          <Link className="rounded p-1 px-2 text-xl text-black hover:bg-gray-100" href="/profile">All</Link>
          <Link className="rounded p-1 px-2 text-lg text-gray-400 hover:bg-gray-100" href="/profile/sales">In Sales</Link>
          <Link className="rounded p-1 px-2 text-lg text-gray-400 hover:bg-gray-100" href="/profile/unsold">Unsold</Link>
        </div>
        <NFTList nftList={data as NFT[]} />
        <Address />

      </div>
    </>
  )
}

export default Profile

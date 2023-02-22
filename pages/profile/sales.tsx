import { useActiveListings, useAddress, useContract } from '@thirdweb-dev/react'
import { AuctionListing, DirectListing, NFT } from '@thirdweb-dev/sdk'
import { NextPage } from 'next'
import Link from 'next/link'
import NFTList from '~/components/nft-list'
import NFTListInSales from '~/components/nft-list/sales'
import { ADDRESS } from '~/config/address'

const Profile: NextPage = () => {
  const { contract } = useContract(ADDRESS.MARKETPLACE, 'marketplace')
  const { data } = useActiveListings(contract, { seller: useAddress() })
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
          <Link className="rounded p-1 px-2 text-lg text-gray-400 hover:bg-gray-100" href="/profile">All</Link>
          <Link className="rounded p-1 px-2 text-xl text-black hover:bg-gray-100" href="/profile/sales">In Sales</Link>
          <Link className="rounded p-1 px-2 text-lg text-gray-400 hover:bg-gray-100" href="/profile/unsold">Unsold</Link>
        </div>

        <NFTListInSales nftList={data as (AuctionListing | DirectListing)[]} />
      </div>
    </>
  )
}

export default Profile

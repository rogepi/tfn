import { NextPage } from 'next'
import NFTList from '~/components/nft-list'

const ProfileSeles: NextPage = () => {

  return (
    <>
      <section className="mt-10 mb-5 space-y-5">
        <h1 className="text-5xl">Profile</h1>
        <div className="text-xl text-gray-600">
          Manage your NFTs
        </div>
      </section>
      <div>
        <NFTList />
      </div>
    </>
  )
}

export default ProfileSeles

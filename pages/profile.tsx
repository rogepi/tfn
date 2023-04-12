import { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import NFTList from '~/components/page-ui/nft-list'
import { useNFTs } from '~/hooks/use-nfts'
import { useAddress, useLogin, useUser } from '@thirdweb-dev/react'
import ConnectButton from '~/components/button/connect'

const Profile: NextPage = () => {
  const [active, setActive] = useState('all')
  const address = useAddress()
  const { nft_list, isLoading } = useNFTs()

  const showList = useMemo(() => {
    if (active === 'all')
      return nft_list
    else if (active === 'in Sales') {
      return nft_list?.filter(item => item.isSales)
    } else {
      return nft_list?.filter(item => !item.isSales)
    }
  }
    , [active, nft_list])

  const activeToggle = (item: string) => {
    setActive(item)
  }

  const { user, isLoggedIn, } = useUser()
  const [secret, setSecret] = useState()
  const getSecret = async () => {
    const res = await fetch("/api/secret")
    const data = await res.json()
    setSecret(data.message)
  }

  console.log('user', user)

  return (
    <>
      <section className="mt-10 mb-5 space-y-5">
        <h1 className="text-5xl">Profile</h1>
        <div className="text-xl text-gray-600">
          Manage your NFTs
        </div>
      </section>
      {
        isLoggedIn &&
        <div>
          <div className="mb-3 flex items-center gap-3 font-bold">
            {
              ['all', 'in Sales', 'unsold'].map(item =>
                <li key={item} className={clsx(
                  'cursor-pointer list-none rounded p-1 px-2 capitalize hover:bg-gray-100  dark:hover:bg-slate-700',
                  item === active ? 'text-xl text-black dark:text-white' : 'text-lg text-gray-400 '
                )} onClick={() => activeToggle(item)}
                >{item}</li>
              )
            }
          </div>

          {
            address ?
              (
                (isLoading || showList === undefined) ?
                  <div className='min-h-[300px] pt-[10vh] text-center'>
                    loading...</div>
                  :
                  <NFTList nftList={showList} />)
              :
              <div className='h-80 pt-20 text-center text-xl'>

                <ConnectButton />
              </div>
          }
        </div>
      }
    </>
  )
}

export default Profile

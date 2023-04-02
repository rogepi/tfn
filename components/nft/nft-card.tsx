import Link from "next/link"
import Image from "next/image"
import { ProfileNFT } from "~/hooks/use-nfts"
import NFTDropDownMenu, { INFTDropDownMenuItem } from "../page-ui/nft-dropdown-menu"
import { useRef, useState } from "react"
import { useBurnNFT, useContract, useListing } from "@thirdweb-dev/react"
import { ADDRESS } from "~/config/address"

import { FireIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"
import Dialog from "../dialog"
import SellDialog from "../dialog/sell"

const NFTCard = ({ nft }: { nft: ProfileNFT }) => {
  const [tokenId, setTokenId] = useState<string>()
  const router = useRouter()
  const item = nft


  // burn
  const [isBurnOpen, setIsBurnOpen] = useState(false)
  const { contract } = useContract(ADDRESS.NFT_COLLECTION)
  const { mutateAsync } = useBurnNFT(contract)
  const burnNFT = async (id: string) => {
    toast.promise(mutateAsync({ tokenId: id }), {
      loading: 'Burning...',
      success: 'Burn succeesfull',
      error: 'Burn error'
    })
  }


  // cancel
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const { contract: market_contract } = useContract(ADDRESS.MARKETPLACE, "marketplace")
  const cancelListing = async (id: string) => {
    toast.promise(market_contract?.direct.cancelListing(id) ?? new Promise(() => null),
      {
        loading: 'Cancel...',
        success: 'Cancel succeesfull',
        error: 'Cancel error'
      })

  }

  // sell
  const [isSellOpen, setIsSellOpen] = useState(false)


  const menu: INFTDropDownMenuItem[] = [
    {
      label:
        <Link className="flex items-center gap-2 pl-2" href={`/nft/${item.id}`}>
          <InformationCircleIcon className="w-5" />Detail
        </Link>
      ,
      onClick: () => { router.push(`/nft/${item.id}`) }
    },
    {
      label: <span className="flex items-center gap-2 pl-2"><FireIcon className="w-5" />Burn</span>,
      onClick: () => { setIsBurnOpen(true) }
    },
  ]
  const menuInSales: INFTDropDownMenuItem[] = [
    {
      label: <span className="flex items-center gap-2 pl-2"><InformationCircleIcon className="w-5" />Detail</span>,
      onClick: () => { router.push(`/nft/${item.id}`) }
    },
    {
      label: <span className="flex items-center gap-2 pl-2 "><XMarkIcon className="w-5" />Cancel</span>, onClick: () => {
        setIsCancelOpen(true)
      }
    },
  ]



  return (
    <div
      className="flex h-60 w-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-md
 shadow-md  dark:border dark:border-gray-600" key={item.id}>
      <Link href={`/nft/${item.id}`}>
        <div className="relative block h-40 w-44 overflow-hidden transition ease-in-out hover:scale-110">
          <Image src={item.image} alt={item.name} fill sizes="100" />
        </div>
        <h2 className="mt-3 text-center">
          {item.name}
        </h2>
      </Link>
      <div className="flex w-full">
        {
          item.isSales ?
            <>
              <button disabled
                className="flex-1 rounded-bl-md border-r-2 border-slate-200 bg-blue-500 p-1 px-2 text-white
                 hover:bg-blue-400 dark:border-slate-500">
                {item.price + ' ETH'}</button>
              <NFTDropDownMenu menu={menuInSales}>
                <button className="rounded-br-md bg-blue-500 p-1 px-2 text-white hover:bg-blue-400">:</button>
              </NFTDropDownMenu>

            </> :
            <>

              <button
                onClick={() => setIsSellOpen(true)}
                className="flex-1 rounded-bl-md border-r-2 border-slate-200 bg-blue-500 p-1 px-2 text-white
                   hover:bg-blue-400 dark:border-slate-500">
                Sell</button>

              <NFTDropDownMenu menu={menu}>
                <button className="rounded-br-md bg-blue-500 p-1 px-2 text-white hover:bg-blue-400">:</button>
              </NFTDropDownMenu>
            </>
        }
      </div>
      <Dialog isOpen={isBurnOpen} closeModal={() => setIsBurnOpen(false)}
        title="Are you sure you want to burn this NFT?" desc="This action cannot be undone"
        confirm={() => burnNFT(item.id)} confirmText="Confirm" />
      <Dialog isOpen={isCancelOpen} closeModal={() => setIsCancelOpen(false)}
        title="Are you sure you want to Cancel this Listing?" desc="This action cannot be undone"
        confirm={() => cancelListing(item.listingId as string)} confirmText="Confirm" />
      <SellDialog tokenId={item.id} isOpen={isSellOpen} closeModal={() => setIsSellOpen(false)} />
    </div>
  )
}


export default NFTCard
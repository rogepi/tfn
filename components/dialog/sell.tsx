import { useContract, useCreateDirectListing } from "@thirdweb-dev/react"
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk"
import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { ADDRESS } from "~/config/address"
import BaseDialog, { IBaseDialogProps } from "./base"

export interface ISellDialogProps extends IBaseDialogProps {
  tokenId: string
}

const SellDialog = ({ isOpen, closeModal, tokenId }: ISellDialogProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const { contract } = useContract(ADDRESS.MARKETPLACE, 'marketplace')
  const { mutateAsync } = useCreateDirectListing(contract)
  const [isLoading, setIsLoading] = useState(false)
  const sell = async () => {
    if (ref.current?.value) {
      const listing = {
        assetContractAddress: ADDRESS.NFT_COLLECTION,
        tokenId,
        startTimestamp: new Date(),
        listingDurationInSeconds: 86400,
        quantity: 1,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        buyoutPricePerToken: ref.current?.value
      }
      setIsLoading(true)
      toast.promise(
        mutateAsync(listing),
        {
          loading: 'processing...',
          success: "Sell successfull",
          error: 'Sell error'
        }
      ).then(() => {
        fetch('/api/listing/update')
      })
      setIsLoading(false)
      closeModal()
    } else {
      toast('Price is null')
    }
  }
  return (
    <BaseDialog isOpen={isOpen} closeModal={closeModal} title="Would you wang to sell it" desc="Please input the price">
      <form className="mt-4 flex flex-col">
        <label className="flex items-center overflow-hidden rounded-xl bg-gray-200 shadow-sm">
          <input ref={ref} type="number" className="flex-1 rounded-l-xl border-gray-300 shadow-sm
                    focus:border-l-blue-500 focus:ring focus:ring-blue-200/50" placeholder="0.01 - 99999" />
          <span className="pl-4 pr-8">
            ETH
          </span>
        </label>
        <div className="mt-6 space-x-5">
          <button
            type="button"
            onClick={sell}
            disabled={isLoading}
            className="inline-flex w-56 justify-center rounded-md border border-transparent
                     bg-blue-500 px-4 py-2 text-sm font-semibold text-white
                      hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Sell
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border
                     px-4 py-2 text-sm  font-semibold hover:bg-gray-200 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </BaseDialog>
  )
}

export default SellDialog
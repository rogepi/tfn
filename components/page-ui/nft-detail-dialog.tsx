import * as RadixDialog from '@radix-ui/react-dialog'
import { useContract, useNFT } from '@thirdweb-dev/react'
import { ADDRESS } from '~/config/address'
import { IconClose } from '../icons/close'


const NFTDetailDialog = ({ children, tokenId, open }: { children?: React.ReactNode, tokenId: string, open: boolean }) => {
  const { contract } = useContract(ADDRESS.NFT_COLLECTION)
  const { data } = useNFT(contract, tokenId)
  console.log(data)
  return (
    <RadixDialog.Root open={open}>
      {
        data &&
        <RadixDialog.Portal>
          <div className="fixed inset-0 z-50 mt-[20vh] flex justify-center">
            <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity " />
            <RadixDialog.Content className="fixed z-50 grid w-full max-w-sm scale-100 gap-4 rounded-md bg-white p-6 opacity-100 dark:bg-gray-800">
              <RadixDialog.Title className="text-center text-lg font-bold">
                Would you want to sell it
              </RadixDialog.Title>
              <RadixDialog.Description className="text-sm text-gray-500">
                Please input the price
              </RadixDialog.Description>
              <RadixDialog.Close className="absolute top-4 right-4 transition-opacity hover:opacity-100">
                <IconClose />
              </RadixDialog.Close>

              <div className="space-y-3">

              </div>

            </RadixDialog.Content>
          </div>
        </RadixDialog.Portal>
      }

    </RadixDialog.Root>
  )
}

export default NFTDetailDialog
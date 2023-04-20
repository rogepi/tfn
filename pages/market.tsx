import { NFT } from "@thirdweb-dev/sdk"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import NFTList from "~/components/nft/nft-list"
import SaleList from "~/components/nft/sale-list"
import NewNFTs from "~/components/page-ui/new-nfts"
import { getListingsByRedis, getNFTsByRedis } from "~/helper/redis"
import { INFT } from "~/helper/types"

export const getServerSideProps: GetServerSideProps<{ listing: INFT[] }> = async (context) => {
  const listings = await getListingsByRedis()

  const _listing: INFT[] = listings.map(item => {
    return {
      id: item.id,
      tokenId: item.asset.id,
      image: item.asset.image,
      name: item.asset.name,
      price: item.buyoutCurrencyValuePerToken.displayValue
    }
  })
  return {
    props: {
      listing: _listing,

    }
  }
}

const Discover = ({ listing }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <section className="mt-10 mb-5 space-y-5">
        <h1 className="text-5xl">Market Place</h1>
        <div className="text-xl text-gray-600">
          Choose the artwork of your choice
        </div>
      </section>
      <section>
        <SaleList list={listing} title="New On Sale" />
      </section>

    </>
  )
}

export default Discover
import { NFT } from "@thirdweb-dev/sdk"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import NFTList from "~/components/nft/nft-list"
import { getNFTsByRedis } from "~/helper/redis"

export const getServerSideProps: GetServerSideProps<{ nfts: NFT[] }> = async (context) => {
  const nfts = await getNFTsByRedis()

  return {
    props: {
      nfts: nfts.reverse()
    }
  }
}

const Category = ({ nfts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <section className="mt-10 mb-5 space-y-5">
        <h1 className="text-5xl">Creation</h1>
        <div className="text-xl text-gray-600">
          Browse the wonderful creations of our artists
        </div>
      </section>

      <section>
        <NFTList list={nfts} title="All NFT" />
      </section>
    </>
  )
}

export default Category
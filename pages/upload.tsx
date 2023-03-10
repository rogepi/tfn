import { NextPage } from 'next'
import UploadForm from '~/components/page-ui/upload-form'


const Upload: NextPage = () => {
  return (
    <>
      <section className="my-10 space-y-5">
        <h1 className="text-5xl">Upload NFT</h1>
        <div className="text-xl text-gray-600">
          Share your awasome digital artwork
        </div>
      </section>
      <section className="rounded-md bg-gray-100 p-5 text-xl">
        <UploadForm />
      </section>
    </>
  )
}

export default Upload

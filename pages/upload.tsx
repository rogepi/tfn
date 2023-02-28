import { NextPage } from 'next'
import { DocumentArrowUpIcon, PlusIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { useAddress, useContract, useMintNFT, useStorage } from '@thirdweb-dev/react'
import { useRef, useState } from 'react'
import useFile from '~/hooks/use-file'
import { ADDRESS } from '~/config/address'
import UploadForm from '~/components/page-ui/upload-form'

type Metadata = {
  name: string
  description: string
  image: File
  properties: { name: string, value: string }[]
}



const Upload: NextPage = () => {
  const { register, handleSubmit, watch, reset } = useForm<Metadata>()
  const ref = useRef<HTMLInputElement>(null)

  const { contract } = useContract(ADDRESS.NFT_COLLECTION, "nft-collection")
  const { mutateAsync: mintNFT, isLoading, error } = useMintNFT(contract)

  const address = useAddress() as string
  const onSubmit = async (data: Metadata) => {
    if (ref.current?.files)
      data.image = ref.current.files[0]
    mintNFT({ metadata: data, to: address })
  }

  const { file, setFile, fileInputRef, handleChooseFile, handleChange } =
    useFile()

  const [properties, setProperties] = useState([{ id: 1, name: '', value: '' }])
  const handleChangePropName = (e: React.ChangeEvent<HTMLInputElement>, inputId: number) => {
    const temp = properties.map(item => {
      if (item.id === inputId) {
        return {
          ...item,
          name: e.target?.value
        }
      }
      return item
    })
    setProperties(temp)
  }
  const handleChangePropValue = (e: React.ChangeEvent<HTMLInputElement>, inputId: number) => {
    const temp = properties.map(item => {
      if (item.id === inputId) {
        return {
          ...item,
          value: e.target?.value
        }
      }
      return item
    })
    setProperties(temp)
  }
  const handleAddProp = () => {
    const tmp = { id: ++properties.length, name: '', value: '' }
    setProperties([...properties, tmp])
  }

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
      <section className="rounded-md bg-gray-100 p-5 text-xl">
        <h3>Metadata</h3>
        <hr className="my-2" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-sm">
            Name <br />
            <input
              {...register('name')}
              className="rounded bg-gray-50 p-2 py-1 outline outline-0 focus:outline-1 focus:outline-blue-500"
            />
          </label>
          <br />

          <label className="text-sm">
            Media
            <br />
            <div className="flex items-center gap-3">
              <div
                className="flex h-52 w-52 cursor-pointer flex-col items-center justify-center
                          rounded border bg-gray-50 text-xs text-gray-400 hover:border-blue-500"
              >
                {file ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="p-1" src={file} alt="upload-file" />
                ) : (
                  <div id="file" className="flex flex-col items-center">
                    <DocumentArrowUpIcon className="w-6" />
                    Upload file
                  </div>
                )}
              </div>

              {file ? (
                <button
                  onClick={() => setFile('')}
                  type="button"
                  className="h-8 rounded border-2 border-red-500 p-1 px-2 text-red-500 hover:bg-red-50"
                >
                  Cancel
                </button>
              ) : (
                <button
                  // onClick={() => handleChooseFile()}
                  onClick={() => { ref.current?.click() }}
                  type="button"
                  className="h-8 rounded border-2 border-green-500 p-1 px-2 text-green-500 hover:bg-green-50"
                >
                  Select File
                </button>
              )}
            </div>
            <span className="text-xs text-gray-500">
              You can upload image, audio, video, html, text, pdf, and 3d model
              files here.
            </span>
          </label>
          <br />
          <label className="text-sm">
            Description
            <br />
            <textarea
              {...register('description')}
              className="w-full max-w-lg rounded border-none bg-gray-50 "
            />
          </label>
          <br />
          <label className="text-sm">
            Properties
            <br />
            {/* {
              properties.map(item =>
                <div key={item.id} className="flex items-center gap-3">
                  <input
                    value={item.name}
                    onChange={(e) => handleChangePropName(e, item.id)}
                    className=" w-1/2 max-w-[10rem] rounded bg-gray-50
                     p-1 outline outline-0 focus:outline-1 focus:outline-blue-500"
                  />
                  <input value={item.value}
                    onChange={(e) => handleChangePropValue(e, item.id)}
                    className="w-1/2 max-w-[10rem] rounded bg-gray-50
                  p-1 outline outline-0 focus:outline-1 focus:outline-blue-500" />
                  <button className="rounded hover:bg-red-200">
                    <XMarkIcon className="w-5 text-red-500 " />
                  </button>
                </div>
              )
            } */}

            <button onClick={handleAddProp} className="mt-3 flex items-center rounded bg-green-400 p-1 px-2 text-white hover:bg-green-500">
              <PlusIcon className="w-4" />
              Add Row
            </button>
          </label>

          <div className="mt-6 space-x-5">
            <button
              disabled={isLoading}
              type="submit"
              className="rounded bg-blue-500 p-2 px-4 text-white hover:bg-blue-400"
            >
              Submit{isLoading ? "..." : ''}
            </button>
            <button
              onClick={() => reset()}
              className="rounded bg-gray-200 p-2 px-4 hover:bg-gray-300"
            >
              reset
            </button>
          </div>
        </form>
      </section>

      <input
        type="file"
        // ref={fileInputRef}
        ref={ref}
        onChange={handleChange}
        // {...register('media')}
        hidden
        aria-hidden
      />
    </>
  )
}

export default Upload

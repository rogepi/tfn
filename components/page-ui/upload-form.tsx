import { useRef, useState } from "react"
import Image from "next/image"
import { useAddress, useContract, useMintNFT, useStorageUpload } from "@thirdweb-dev/react"
import { useForm } from "react-hook-form"
import { DocumentArrowUpIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { IMetadata } from "~/helper/types"
import { ADDRESS } from "~/config/address"
import { toast } from "react-hot-toast"


const UploadForm = () => {
  const { register, handleSubmit, watch, setValue, reset, formState: { errors }, } = useForm<IMetadata>({
    defaultValues: {
      name: '',
      description: '',
      properties: [{ name: '', value: '' }]
    }
  })

  // file
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]))
      setValue('image', event.target.files)
    }
  }
  const handleCancelClick = () => {
    setSelectedFile(null)
    setValue('image', {} as FileList)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  // file upload
  // const { mutateAsync: upload } = useStorageUpload()
  // const uploadToIpfs = async (file: File) => {
  //   const uploadUrl = await upload({
  //     data: [file],
  //     options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
  //   })
  // }


  // form & mint
  const { contract } = useContract(ADDRESS.NFT_COLLECTION)
  const address = useAddress()
  const { mutateAsync: mintNFT, isLoading } = useMintNFT(contract)
  const onReset = () => {
    reset()
    handleCancelClick()
  }
  const onSubmit = handleSubmit(async (data) => {
    // setFormState('check')
    console.log(data)
    if (!(data.description && data.image && data.name)) {
      toast.error('Please enter complete')
    } else {
      if (!address) {
        toast.error('No wallet connection')
      } else {
        toast.promise(
          mintNFT({
            metadata: { ...data, image: data.image[0] },
            to: address
          }),
          {
            loading: 'Uploading...',
            success: 'Upload successfull!',
            error: 'Somthing Error'
          }
        ).then(() => {
          onReset()
          fetch('/api/nft/update').then(res => res.json()).then(data => console.log(data))
        })
      }
    }
  })


  // dynamic input
  const properties = watch('properties')
  const addInput = () => {
    setValue('properties', [...properties, { name: '', value: '' }])
  }
  const delInput = (index: number) => {
    console.log(index)
    console.log(properties)
    setValue('properties', properties.filter(item => item !== properties[index]))
  }

  return (
    <div>
      <h1>Metadata</h1>
      <hr className="my-5" />
      <form className="space-y-5" onSubmit={onSubmit}>

        <div>
          <h2>Name</h2>
          <input {...register('name')} type="text" className="w-[525px] rounded-md border-gray-300 shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200/50" />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>
        <div>
          <h2>Media</h2>
          <div className="flex items-center gap-5">
            <label htmlFor="file-input" className="flex h-52 w-52 cursor-pointer flex-col items-center justify-center
                          rounded-md border border-gray-300 bg-white text-xs text-gray-400 shadow-sm
                           ">
              {selectedFile ? (
                <>
                  <Image src={selectedFile} alt="Selected file" className="h-full w-full object-cover" width={100} height={100} />

                </>
              ) : (
                <>
                  <DocumentArrowUpIcon className="w-6" />
                  Upload file
                </>
              )}
            </label>
            {selectedFile && (
              <button onClick={handleCancelClick}
                className="h-8 rounded border-2 border-red-500 p-1 px-2 text-sm text-red-500 shadow-sm hover:bg-red-50">Cancel</button>
            )}
            <input id="file-input" ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileInputChange} />
          </div>
          <div className="text-xs text-gray-500">You can upload image, audio, video, html, text, pdf, and 3d model files here.</div>
        </div>
        <div>
          <h2>Description</h2>
          <textarea {...register('description')} className="w-[525px] rounded-md border-gray-300 shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200/50" />
        </div>
        <div>
          <h2>Properties</h2>
          <div className="space-y-1">
            {
              properties?.map((item, index) =>
                <div key={index} className="flex items-center space-x-3">
                  <input {...register(`properties.${index}.name`)} type="text" className="w-40 rounded-md border-gray-300 shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
                    placeholder="key" />
                  <input {...register(`properties.${index}.value`)} type="text" className="rounded-md border-gray-300 shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
                    placeholder="value" />
                  <button type="button" onClick={() => delInput(index)} className="rounded-md bg-red-500 text-white shadow-sm hover:bg-red-600"><XMarkIcon className="w-6" /></button>
                </div>
              )
            }
          </div>
          <button type="button" onClick={addInput} className="mt-3 flex items-center rounded bg-green-500 p-1 text-sm text-white shadow-sm hover:bg-green-400">Add row</button>
        </div>
        <div className="space-x-5">
          <button disabled={isLoading} type="submit" className="rounded bg-blue-500 p-2 px-6 text-white shadow-sm hover:bg-blue-400">Submit</button>
          <button type="reset" onClick={onReset} className="rounded bg-gray-200 p-2 px-4 shadow-sm hover:bg-gray-300">reset</button>
        </div>
      </form>
    </div>
  )
}

export default UploadForm
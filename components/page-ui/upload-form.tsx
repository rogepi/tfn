import { DocumentArrowUpIcon } from "@heroicons/react/24/solid"

const UploadForm = () => {
  return (
    <div>
      <h1>Metadata</h1>
      <hr />
      <div>
        <h2>Name</h2>
        <input />
      </div>
      <div>
        <h2>Media</h2>
        <div className="flex items-center gap-5">
          <div className="flex h-52 w-52 cursor-pointer flex-col items-center justify-center
                          rounded border bg-gray-50 text-xs text-gray-400 hover:border-blue-500">
            <div id="file" className="flex flex-col items-center">
              <DocumentArrowUpIcon className="w-6" />
              Upload file
            </div>
          </div>
          <button onClick={() => { console.log(1) }} className="h-12 rounded border-2 border-green-500 p-1 px-2 text-green-500 hover:bg-green-50">Select File</button>
        </div>
        <div className="text-xs text-gray-500">You can upload image, audio, video, html, text, pdf, and 3d model files here.</div>
      </div>
      <div>
        <h2>Description</h2>
        <textarea />
      </div>
      <div>
        <h2>Properties</h2>
        <div className="space-x-3"><input /><input /></div>
        <button className="mt-3 flex items-center rounded bg-green-400 p-1 px-2 text-white hover:bg-green-500">Add row</button>
      </div>
      <div>
        <button>Submit</button>
        <button>reset</button>
      </div>
    </div>
  )
}

export default UploadForm
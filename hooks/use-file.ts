import * as React from 'react'

const useFile = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<string>()
  const handleChooseFile = () => {
    if (!fileInputRef.current) return

    fileInputRef.current.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    readFile(file)
  }

  const readFile = (file: any) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onprogress = async (e) => {
      // The real one is very fast, we need to simulate it
      // if (e.lengthComputable) {
      //   const percentLoaded = Math.round((e.loaded / e.total) * 100);
      //   setLoading(percentLoaded);
      // }

      // Simulate the loading
      let percentLoaded = 0

      const interval = setInterval(() => {
        if (percentLoaded === 100) {
          clearInterval(interval)
        }
      }, 5)
    }

    reader.onload = (e: any) => {
      setFile(e.target.result)
    }
  }

  return {
    fileInputRef,
    handleChooseFile,
    handleChange,
    readFile,
    file,
    setFile,
  }
}

export default useFile

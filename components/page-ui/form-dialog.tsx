import * as RadixDialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { IconClose } from '../icons/close'

export type DialogState = "null" | "success" | "error" | "confirm" | "check"

const FormDialog = ({ children, state }: { children: React.ReactNode, state: DialogState }) => {
  const [open, setOpen] = useState(false)
  const content = {
    title: <div />,
    desc: <div />,
    content: <div />
  }
  switch (state) {
    case 'check': {
      content.title = <div>Tip</div>
      content.content =
        <div className='flex flex-col items-center justify-center'>
          <div>
            You don&rsquo;t seem to have filled it out completely
          </div>
          <button onClick={() => setOpen(false)} className='w-20 rounded bg-blue-500 p-2 text-white shadow-sm hover:bg-blue-400'>OK OK</button>
        </div>
    }
  }
  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <div className="fixed inset-0 z-50 mt-[30vh] flex justify-center">
          <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity " />
          <RadixDialog.Content className="fixed z-50 grid w-full max-w-sm scale-100 gap-4 rounded-md bg-white p-6 opacity-100 dark:bg-gray-800">
            <RadixDialog.Title className="text-center text-lg font-bold">
              {content.title}
            </RadixDialog.Title>
            <RadixDialog.Description className="text-sm text-gray-500">
              {content.desc}
            </RadixDialog.Description>
            <RadixDialog.Close className="absolute top-4 right-4 transition-opacity hover:opacity-100">
              <IconClose />
            </RadixDialog.Close>
            {content.content}
          </RadixDialog.Content>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export default FormDialog

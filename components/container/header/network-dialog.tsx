import * as RadixDialog from '@radix-ui/react-dialog'

const NetworkDialog = ({
  children,
  open,
}: {
  children: React.ReactNode
  open: boolean
}) => {
  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Trigger>{children}</RadixDialog.Trigger>
      <RadixDialog.Portal className="fixed inset-0 z-50 mt-[20vh] flex justify-center">
        <RadixDialog.Content className="fixed z-50 grid w-full max-w-sm scale-100 gap-4 rounded-md bg-white p-6 opacity-100 dark:bg-gray-800">
          <RadixDialog.Title>Your Network is not Goerli</RadixDialog.Title>
          <RadixDialog.Description>
            We currently only support the Goerli network
          </RadixDialog.Description>
          <div>
            <button>Switch to Goerli</button>
            <button>Cancel</button>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export default NetworkDialog

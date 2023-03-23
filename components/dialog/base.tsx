import { Fragment } from "react"
import { Transition, Dialog as HLDialog } from "@headlessui/react"

export interface IBaseDialogProps {
  isOpen: boolean
  closeModal: () => void
  title?: string
  desc?: string
  children?: JSX.Element
}

const BaseDialog = ({ isOpen, closeModal, title, desc, children }: IBaseDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HLDialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HLDialog.Panel className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <HLDialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </HLDialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {desc}
                  </p>
                </div>

                {children}
              </HLDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HLDialog>
    </Transition>
  )
}

export default BaseDialog
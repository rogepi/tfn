import { Fragment } from "react"
import { Transition, Dialog as HLDialog } from "@headlessui/react"

export interface IDialogProps {
  isOpen: boolean
  closeModal: () => void
  title: string
  desc: string
  confirm: () => void
  confirmText: string
}

const Dialog = ({ isOpen, closeModal, title, desc, confirm, confirmText }: IDialogProps) => {
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

                <div className="mt-6 space-x-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent
                     bg-blue-500 px-4 py-2 text-sm font-semibold text-white
                      hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={confirm}
                  >
                    {confirmText}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border
                     px-4 py-2 text-sm  font-semibold hover:bg-gray-200 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </HLDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HLDialog>
    </Transition>
  )
}

export default Dialog
import * as RadixAvatar from '@radix-ui/react-avatar'
import * as RadixPopover from '@radix-ui/react-popover'
import { useDisconnect } from '@thirdweb-dev/react'
import { Jazzicon } from '@ukstv/jazzicon-react'

const AvatarImage = ({ address }: { address: string }) => {
  return (
    <RadixAvatar.Root
      className="h-9 w-9  rounded-full
    border-gray-400 hover:border-2 dark:border-white"
    >
      <RadixAvatar.Image></RadixAvatar.Image>
      <RadixAvatar.Fallback>
        <Jazzicon address={address} />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

const AvatarPopoverItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700">
      {children}
    </div>
  )
}

const Avatar = ({ address }: { address: string }) => {
  const disconnect = useDisconnect()
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button className="flex">
          <AvatarImage address={address} />
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className="mt-2 w-28 divide-y overflow-hidden rounded-md border text-center
        font-semibold shadow dark:divide-gray-500 dark:border-gray-500 dark:shadow-gray-800"
        >
          <AvatarPopoverItem>
            <p className="truncate">Profile</p>
          </AvatarPopoverItem>
          <AvatarPopoverItem>
            <button onClick={disconnect}>Log out</button>
          </AvatarPopoverItem>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}

export default Avatar

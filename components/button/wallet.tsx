import Image, { StaticImageData } from "next/image"

const WalletButton = ({
  name,
  icon,
  connect,
}: {
  name: string
  icon: StaticImageData
  connect: () => void
}) => {
  return (
    <button
      onClick={() => connect()}
      className="flex w-full items-center gap-2 rounded-full border p-2 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      <Image src={icon} alt={name} width={24} height={24} />
      <span className="text-sm font-semibold">{name}</span>
    </button>
  )
}

export default WalletButton
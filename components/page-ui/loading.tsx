import clsx from 'clsx'
import Image from 'next/image'
import LoadingIcon from '~/public/images/loading.svg'

const Loading = ({ className }: { className?: string }) => {
  return (
    <Image src={LoadingIcon} alt="loading..." className={clsx('mx-auto animate-spin', className)}  />
  )

}

export default Loading
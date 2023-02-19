import NextHead from 'next/head'
import { StaticImageData } from 'next/image'

export interface MetaProps {
  description?: string
  image?: string | StaticImageData
  title: string
  type?: string
}

const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const meta: MetaProps = {
    title: 'TFN | A NFT Marketplace',
    description: 'TFN - A NFT Marketplace',
    type: 'website',
    ...customMeta,
  }

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      {/* <meta property="og:image" content={meta.image} /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={meta.title} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {/* <meta name="twitter:image" content={meta.image} /> */}
    </NextHead>
  )
}

export default Head

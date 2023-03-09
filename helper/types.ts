export interface INFT {
  id: string;
  tokenId: string;
  image: string | null | undefined;
  name: string | number | undefined;
  price: string;
}

export interface IMetadata {
  name: string
  description: string
  image: FileList
  properties: { name: string, value: string }[]
}
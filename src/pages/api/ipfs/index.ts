import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { create } from 'ipfs-http-client'
import { Wiki } from '@/types'

const pinToPinata = async (wiki: Wiki): Promise<string> => {
  const body = {
    pinataMetadata: {
      name: wiki.content.title,
    },
    pinataContent: {
      ...wiki,
    },
  }
  const resp = await axios.post(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    body,
    {
      headers: {
        pinata_api_key: process.env.PINATA_KEY || '',
        pinata_secret_api_key: process.env.PINATA_SECRET || '',
      },
    },
  )

  const data = resp.data as {
    IpfsHash: string
    PinSize: number
    Timestamp: string
  }
  return data.IpfsHash
}

const pinToIPFS = async (wiki: Wiki): Promise<string> => {
  const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' })
  const { cid } = await ipfs.add(JSON.stringify(wiki))
  return cid.toString()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const wiki = req.body as Wiki
  const IpfsHash = process.env.PROD
    ? await pinToPinata(wiki)
    : await pinToIPFS(wiki)
  res.status(200).json({ IpfsHash })
}

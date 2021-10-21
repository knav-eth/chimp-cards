export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
export const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_PROJECT_ID

export const SERVER_URL = (process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL ?? "").includes("localhost") ?
  `http://${process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL}/` :
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL}/`

export const TWITTER_HANDLE = "CHIMPeth"

export const CHIMP_CONTRACT_ADDRESS = "0x63a2E70b9208e8285C9A95F322243186cd77087B"
export const CARDS_CONTRACT_ADDRESS = "0x329fd5e0d9aad262b13ca07c87d001bec716ed39"

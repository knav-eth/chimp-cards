import type { NextApiRequest, NextApiResponse } from "next"
import { getCHIMPCardById } from "../../../shared/clients/chimp-cards-subgraph"
import { getTokenImageURL } from "../../../shared/utils/urls"
import { getTokenId } from "../../_lib/params"
import { getScreenshot } from "../../_lib/screenshot"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const tokenId = getTokenId(req)
  if (tokenId === undefined) {
    res.end(JSON.stringify({ error: "Invalid tokenId" }))
    return
  }

  const token = await getCHIMPCardById(tokenId)
  if (!token) {
    res.status(404).end(JSON.stringify({ error: "Token not found" }))
    return
  }

  const tokenImageURL = getTokenImageURL(token.id)
  console.log(`Fetching image at URL: ${tokenImageURL}`)
  const imageBuffer = await getScreenshot(tokenImageURL)

  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
  res.setHeader("Content-Type", "image/png")
  res.end(imageBuffer)
}

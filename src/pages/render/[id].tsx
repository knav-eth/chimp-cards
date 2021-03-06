/* eslint-disable @next/next/no-img-element */
import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import { getCHIMPCardById } from "../../../shared/clients/chimp-cards-subgraph"
import { base64EncodeImageContent } from "../../../shared/utils/metadata"

export default function RenderToken() {
  const router = useRouter()
  const [svgContent, setSvgContent] = useState<string | null>(null)

  const { id } = router.query

  const retrieveTokenAsset = useCallback(
    async (tokenId: number) => {
      const token = await getCHIMPCardById(tokenId)
      if (!token) return

      const base64EncodedImage = base64EncodeImageContent(token.image)
      setSvgContent(base64EncodedImage)
    },
    [],
  )

  useEffect(() => {
    const numericId = typeof id === "string" ? parseInt(id) : undefined
    if (numericId !== undefined && Number.isInteger(numericId)) {
      retrieveTokenAsset(numericId)
    }
  }, [id, retrieveTokenAsset])

  return (
    <Box width="75vh">
      <img
        className={svgContent !== null ? "loaded-token" : ""}
        src={svgContent ?? undefined}
      />
    </Box>
  )
}

/* eslint-disable @next/next/no-img-element */
import { AspectRatio, Flex } from "@chakra-ui/react"
import React, { useMemo } from "react"
import { base64EncodeImageContent } from "../../../shared/utils/metadata"
import { TokenCardProps } from "./props"

const TokenCard: React.FC<TokenCardProps> = ({ token, containerProps }) => {
  const svgData: string = useMemo(() => {
    return base64EncodeImageContent(token.metadata.image)
  }, [token])

  return (
    <AspectRatio ratio={1}>
      <Flex justifyContent="center" alignItems="center" {...containerProps}>
        <img src={svgData} alt={token.metadata.name} />
      </Flex>
    </AspectRatio>
  )
}

export default TokenCard

/* eslint-disable @next/next/no-img-element */
import { AspectRatio, Flex } from "@chakra-ui/react"
import React, { useMemo } from "react"
import { base64EncodeImageContent } from "../../../shared/utils/metadata"
import { CHIMPCardProps } from "./props"

const CHIMPCard: React.FC<CHIMPCardProps> = ({ chimp, containerProps }) => {
  const svgContent = useMemo(() => {
    return base64EncodeImageContent(chimp.image)
  }, [chimp])

  return (
    <AspectRatio ratio={1}>
      <Flex justifyContent="center" alignItems="center" {...containerProps}>
        <img src={svgContent} alt={`CHIMP #${chimp.id}`} />
      </Flex>
    </AspectRatio>
  )
}

export default CHIMPCard

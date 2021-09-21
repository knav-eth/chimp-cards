/* eslint-disable @next/next/no-img-element */
import { AspectRatio, Flex } from "@chakra-ui/react"
import React, { useMemo } from "react"
import { parseAndExtractImageFromURI } from "../../utils/metadata"
import { PackCardProps } from "./props"

const PackCard: React.FC<PackCardProps> = ({ pack, containerProps }) => {
  const svgData: string = useMemo(() => {
    return parseAndExtractImageFromURI(pack.metadata)
  }, [pack])

  return (
    <AspectRatio ratio={1}>
      <Flex justifyContent="center" alignItems="center" {...containerProps}>
        <img src={svgData} alt={`Pack #${n.id}`} />
      </Flex>
    </AspectRatio>
  )
}

export default PackCard

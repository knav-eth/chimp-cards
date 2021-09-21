import { Box, Tooltip } from "@chakra-ui/react"
import React from "react"
import { SubgraphAdventureCardPack } from "../../shared/clients/adventure-cards-subgraph"
import { GRID_ANIMATION_VARIANTS, MotionGrid, MotionGridItem } from "../utils/animation"
import LazyPackCard from "./PackCard"

export type PackGridProps = {
  packs: Array<SubgraphAdventureCardPack>
  onClick?: (pack: SubgraphAdventureCardPack) => void
}

const PackGrid: React.FC<PackGridProps> = ({ packs, onClick }) => {
  return (
    <MotionGrid
      flex={1}
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gap={4}
      maxW="930px"
      marginX="auto"
      marginY="52px"
      variants={GRID_ANIMATION_VARIANTS}
      initial={"hidden"}
      animate={"show"}
    >
      {packs.map((pack) => {
        return (
          <MotionGridItem
            key={pack.numericId}
            display="flex"
            cursor="pointer"
            variants={GRID_ANIMATION_VARIANTS}
            whileHover={{ scale: 1.05 }}
            onTap={() => {
              onClick?.(pack)
            }}
          >
            <Tooltip label={"This N has already been used"}>
              <Box
                backgroundColor="gray.800"
                borderWidth="4px"
                borderColor="transparent"
                borderStyle="solid"
                width="full"
              >
                <LazyPackCard pack={pack} />
              </Box>
            </Tooltip>
          </MotionGridItem>
        )
      })}
    </MotionGrid>
  )
}

export default PackGrid

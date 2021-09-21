import { Box, Tooltip } from "@chakra-ui/react"
import React from "react"
import { SubgraphCHIMP } from "../../shared/clients/chimp-subgraph"
import { GRID_ANIMATION_VARIANTS, MotionGrid, MotionGridItem } from "../utils/animation"
import { CHIMPWithAvailability } from "../utils/chimp"
import LazyCHIMPCard from "./CHIMPCard"

export type CHIMPGridProps = {
  chimps: Array<CHIMPWithAvailability>
  onClick?: (chimp: SubgraphCHIMP) => void
}

const CHIMPGrid: React.FC<CHIMPGridProps> = ({ chimps, onClick }) => {
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
      {chimps.map(({ chimp, isAvailable }) => {
        return (
          <MotionGridItem
            key={chimp.numericId}
            display="flex"
            cursor={isAvailable ? "pointer" : "not-allowed"}
            variants={GRID_ANIMATION_VARIANTS}
            whileHover={isAvailable ? { scale: 1.05 } : undefined}
            onTap={() => {
              onClick?.(chimp)
            }}
          >
            <Tooltip label={"This CHIMP has already been used"} isDisabled={isAvailable}>
              <Box
                opacity={isAvailable ? undefined : 0.5}
                backgroundColor="gray.800"
                borderWidth="4px"
                borderColor="transparent"
                borderStyle="solid"
                width="full"
              >
                <LazyCHIMPCard chimp={chimp} />
              </Box>
            </Tooltip>
          </MotionGridItem>
        )
      })}
    </MotionGrid>
  )
}

export default CHIMPGrid

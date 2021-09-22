import { Box, Tooltip } from "@chakra-ui/react"
import React from "react"
import { GRID_ANIMATION_VARIANTS, MotionGrid, MotionGridItem } from "../utils/animation"
import { TokenWithMetadata } from "../utils/types"
import LazyTokenCard from "./PackCard"

export type TokenGridProps = {
  tokens: Array<TokenWithMetadata>
  onClick?: (token: TokenWithMetadata) => void
}

const TokenGrid: React.FC<TokenGridProps> = ({ tokens, onClick }) => {
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
      {tokens.map((token) => {
        return (
          <MotionGridItem
            key={token.id}
            display="flex"
            cursor="pointer"
            variants={GRID_ANIMATION_VARIANTS}
            whileHover={{ scale: 1.05 }}
            onTap={() => {
              onClick?.(token)
            }}
          >
            <Tooltip label="This has already been redeemed." isDisabled={!token.isUsed}>
              <Box
                backgroundColor="gray.800"
                borderWidth="4px"
                borderColor="transparent"
                borderStyle="solid"
                width="full"
              >
                <LazyTokenCard token={token} />
              </Box>
            </Tooltip>
          </MotionGridItem>
        )
      })}
    </MotionGrid>
  )
}

export default TokenGrid

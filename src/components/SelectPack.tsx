import { Box, Button, Heading, Link, Spinner, Text } from "@chakra-ui/react"
import { range } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { parseMetadata } from "../../shared/utils/metadata"
import { useCardsContract } from "../hooks/useCardsContract"
import { useWallet } from "../hooks/useWallet"
import { TokenWithMetadata } from "../utils/types"
import TokenGrid from "./TokenGrid"

export type SelectPackStepProps = {
  onSelect: (packId: number) => void
}


export const SelectPackStep: React.FC<SelectPackStepProps> = ({ onSelect }) => {
  const { wallet } = useWallet()
  const { cardsContract } = useCardsContract()

  const [userPacks, setUserPacks] = useState<Array<TokenWithMetadata> | null>(null)

  const fetchUserPacks = useCallback(async (walletAddress: string) => {
    try {
      const walletCount = await cardsContract.balanceOf(walletAddress)
      const userPacks = await Promise.all(range(walletCount.toNumber()).map(async (walletIndex): Promise<TokenWithMetadata> => {
        const token = await cardsContract.tokenOfOwnerByIndex(walletAddress, walletIndex)
        const asset = await cardsContract.tokenURI(token)
        const parsedMetadata = parseMetadata(asset)
        return {
          id: token.toNumber(),
          metadata: parsedMetadata,
        }
      }))

      console.log(userPacks)
      setUserPacks(userPacks)
    } catch (e) {
      console.error(`Error fetching user packs: ${e}`)
    }
  }, [cardsContract])

  const walletAddress = wallet?.address
  useEffect(() => {
    if (walletAddress) {
      fetchUserPacks(walletAddress)
    }
  }, [fetchUserPacks, walletAddress])

  const handleSelect = useCallback((token: TokenWithMetadata) => {
    onSelect(token.id)
  }, [onSelect])

  return (
    <Box textAlign="center" width="full">
      <Heading as="h1" size="4xl" fontSize={["2xl", "3xl", "4xl"]} mb={4}>
        Select an Adventure Card Pack
      </Heading>
      <Text>
        Enter the ID of an Adventure Card Pack you own:
      </Text>
      <Box paddingX={2} justifyContent="center" textAlign="center">
        {!userPacks ? (
          <Box marginTop={24}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <Box paddingX={[null, null, "3rem"]}>
            {!userPacks.length && (
              <Box>
                <Text marginTop={16} marginBottom={8} color="whiteAlpha.700">
                  You do not own any Adventure Cards. You can buy one here.
                </Text>
                <Link href="https://opensea.io/collection/adventure-cards" target="_blank" rel="noreferrer noopener">
                  <Button>Buy one now</Button>
                </Link>
              </Box>
            )}
            <TokenGrid tokens={userPacks} onClick={handleSelect} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

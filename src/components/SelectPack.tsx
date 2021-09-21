import {
  Box,
  Button,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react"
import React, { useCallback, useEffect, useState } from "react"
import { useCardsContract } from "../hooks/useCardsContract"
import { useWallet } from "../hooks/useWallet"

export type SelectPackStepProps = {
  onSelect: (packId: number) => void
}


export const SelectPackStep: React.FC<SelectPackStepProps> = ({ onSelect }) => {
  const { wallet } = useWallet()
  const { cardsContract } = useCardsContract()
  const [tokenId, setTokenId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEligible, setIsEligible] = useState(false)
  const address = wallet?.address

  const handleNext = useCallback(() => {
    if (!isEligible || tokenId === null) {
      return
    }
    onSelect(tokenId)
  }, [isEligible, tokenId])

  const checkIsEligible = useCallback(async (address: string, tokenId: number) => {
    try {
      setIsLoading(true)
      const packOwner = await cardsContract.ownerOf(tokenId)
      setIsEligible(packOwner === address)
    } catch (e) {
      setIsEligible(false)
      console.error(`Error checking eligibility: ${e}`)
    } finally {
      setIsLoading(false)
    }
  }, [cardsContract])

  useEffect(() => {
    if (tokenId === null || !address) return
    checkIsEligible(address, tokenId)
  }, [address, tokenId, checkIsEligible])

  return (
    <Box textAlign="center" width="full">
      <Heading as="h1" size="4xl" fontSize={["2xl", "3xl", "4xl"]} mb={4}>
        Select an Adventure Card Pack
      </Heading>
      <Text>
        Enter the ID of an Adventure Card Pack you own:
      </Text>
      <Box paddingX={2} justifyContent="center" textAlign="center">
        <Flex
          marginX="auto"
          marginTop={4}
          justifyContent="center"
        >
          <NumberInput onChange={(idStr, idNum) => {
            setTokenId(idNum)
          }}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Box marginX="auto" marginTop={4}>
          {tokenId !== null && isLoading === false && isEligible === false && (
            <Box color="red.300">
              You do not own this pack
            </Box>
          )}
        </Box>
        <Button
          marginTop={4}
          isLoading={isLoading}
          isDisabled={!isEligible}
          onClick={handleNext}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}

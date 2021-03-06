import { Alert, AlertIcon, Box, Button, Heading, Link, Text } from "@chakra-ui/react"
import { BigNumber } from "ethers"
import React, { useCallback, useMemo, useState } from "react"
import { SubgraphCHIMP } from "../../shared/clients/chimp-subgraph"
import { useMainContract } from "../hooks/useMainContract"
import { useWallet } from "../hooks/useWallet"
import { AdventureCard } from "../utils/card"
import { parseWalletError } from "../utils/error"
import { getBlockExplorerUrl } from "../utils/network"
import LazyCHIMPCard from "./CHIMPCard"

export type MintStepProps = {
  packId: number
  card: AdventureCard
  chimp: SubgraphCHIMP
  onCancel: () => void
  onSuccess: (tokenId: number) => void
}

export const MintStep: React.FC<MintStepProps> = ({ packId, card, chimp, onCancel, onSuccess }) => {
  const { wallet } = useWallet()
  const provider = wallet?.web3Provider
  const { mainContract } = useMainContract()
  const [isMinting, setIsMinting] = useState(false)
  const [mintingTxn, setMintingTxn] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleMint = useCallback(async () => {
    if (!provider) return
    try {
      setIsMinting(true)
      setErrorMessage(null)
      const signer = provider.getSigner()
      const contractWithSigner = mainContract.connect(signer)

      const result = await contractWithSigner.mint(chimp.numericId, packId, card.offset)

      setMintingTxn(result.hash)
      const receipt = await result.wait()
      const mintedBigNo: BigNumber = receipt.events?.[0]?.args?.[2]
      const mintedId = parseInt(mintedBigNo._hex, 16)
      onSuccess(mintedId)
    } catch (e) {
      // @ts-ignore
      window.MM_ERR = e
      console.error(`Error while minting: ${e.message}`)
      setMintingTxn(null)
      setErrorMessage(parseWalletError(e) ?? "Unexpected Error")
    } finally {
      setIsMinting(false)
    }
  }, [provider, mainContract, onSuccess])

  const transactionUrl: string | undefined = useMemo(() => {
    if (!mintingTxn || !isMinting) {
      return
    }
    const blockExplorerUrl = getBlockExplorerUrl()
    if (!blockExplorerUrl) {
      return
    }
    return `${blockExplorerUrl}/tx/${mintingTxn}`
  }, [isMinting, mintingTxn])

  return (
    <Box textAlign="center" width="full">
      <Heading as="h1" size="4xl" fontSize={["2xl", "3xl", "4xl"]} mb={4}>
        Mint Chimp Card
      </Heading>
      <Box
        maxWidth="400px"
        width="90%"
        marginX="auto"
        marginY={3}
        borderWidth="4px"
        borderColor="transparent"
        borderStyle="solid"
      >
        {errorMessage && (
          <Alert status="error" mb={3}>
            <AlertIcon />
            <Text fontWeight="semibold" marginRight={1}>
              Error:
            </Text>
            {errorMessage}
          </Alert>
        )}
        {transactionUrl && (
          <Link href={transactionUrl} target="_blank" rel="noopener noreferrer">
            <Alert status="info" flexDirection={["column", "row"]} mb={3}>
              <AlertIcon />
              <Text fontWeight="semibold" marginRight={2}>
                Minting in progress
              </Text>
              <Text>Click to view transaction</Text>
            </Alert>
          </Link>
        )}

        <Box maxWidth="299px" marginX="auto">
          <Text my={4} fontWeight="semibold">
            Selected Chimp
          </Text>
          <Box
            backgroundColor="gray.800"
            borderWidth="4px"
            borderColor="transparent"
            borderStyle="solid"
            width="full"
            position="relative"
          >
            <LazyCHIMPCard chimp={chimp} />
          </Box>
        </Box>
        <Box maxWidth="299px" marginX="auto">
          <Text my={4} fontWeight="semibold">
            Selected Card
          </Text>
          <Box
            backgroundColor="gray.800"
            borderWidth="4px"
            borderColor="transparent"
            borderStyle="solid"
            width="full"
            position="relative"
          >
            {card.title}
          </Box>
        </Box>
      </Box>
      <Box>
        <Button
          onClick={onCancel}
          display="inline-block"
          mr={2}
          isDisabled={isMinting}
        >
          Cancel
        </Button>
        <Button
          display="inline-block"
          ml={2}
          isLoading={isMinting}
          onClick={handleMint}
        >
          Mint
        </Button>
      </Box>
    </Box>
  )
}

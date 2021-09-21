import "@fontsource/source-serif-pro/400.css"
import { range } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { getAllCHIMPsByOwner, SubgraphCHIMP } from "../../shared/clients/chimp-subgraph"
import Layout from "../components/Layout"
import { MintStep } from "../components/MintStep"
import { SelectCardStep } from "../components/SelectCard"
import { SelectChimpStep } from "../components/SelectChimp"
import { SelectPackStep } from "../components/SelectPack"
import { SuccessDisplay } from "../components/SuccessDisplay"
import { useCardsContract } from "../hooks/useCardsContract"
import { useMainContract } from "../hooks/useMainContract"
import { useWallet } from "../hooks/useWallet"
import { AdventureCard } from "../utils/card"
import { CHIMPWithAvailability } from "../utils/chimp"

export default function Home() {
  const [selectedChimp, setSelectedChimp] = useState<SubgraphCHIMP | null>(null)
  const [selectedCard, setSelectedCard] = useState<AdventureCard | null>(null)
  const [selectedPack, setSelectedPack] = useState<number | null>(null)

  const [mintedId, setMintedId] = useState<number | null>(null)

  const { wallet } = useWallet()
  const { cardsContract } = useCardsContract()
  const { mainContract } = useMainContract()
  const walletAddress = wallet?.address
  const [chimps, setChimps] = useState<Array<CHIMPWithAvailability> | null>(null)
  const [packCards, setPackCards] = useState<Array<AdventureCard> | null>(null)

  const fetchChimps = useCallback(async (walletAddress: string) => {
    try {
      const chimps = await getAllCHIMPsByOwner(walletAddress)
      const chimpsWithAvailability = await Promise.all(chimps.map(async (chimp: SubgraphCHIMP): Promise<CHIMPWithAvailability> => {
        const isAvailable = await mainContract.chimpAvailable(chimp.id)
        return {
          chimp,
          isAvailable,
        }
      }))
      setChimps(chimpsWithAvailability)
    } catch (e) {
      console.error(`Error fetching packs: ${e}`)
    }
  }, [])

  const fetchAdventureCardsByPack = useCallback(async (walletAddress: string, packId: number) => {
    try {
      const packCards = await Promise.all(range(45).map(async (offset): Promise<AdventureCard> => {
        const cardText = await cardsContract.getCardTitle(packId, offset)
        const cardIsAvailable = await mainContract.cardAvailable(packId, offset)
        return {
          title: cardText,
          isAvailable: cardIsAvailable,
          offset,
        }
      }))
      setPackCards(packCards)
    } catch (e) {
      console.error(`Error fetching packs: ${e}`)
    }
  }, [cardsContract, mainContract])

  useEffect(() => {
    if (!walletAddress) return

    fetchChimps(walletAddress)
  }, [walletAddress, fetchChimps])

  useEffect(() => {
    setPackCards(null)
    if (!walletAddress || selectedPack === null) return
    fetchAdventureCardsByPack(walletAddress, selectedPack)
  }, [walletAddress, selectedPack, fetchAdventureCardsByPack])


  return (
    <Layout requireWallet>
      {selectedPack === null ? (
        <SelectPackStep onSelect={setSelectedPack} />
      ) : selectedCard === null ? (
        <SelectCardStep
          adventureCards={packCards}
          onSelect={setSelectedCard}
          onCancel={() => {
            setSelectedPack(null)
          }}
        />
      ) : selectedChimp === null ? (
        <SelectChimpStep
          chimps={chimps}
          onSelect={setSelectedChimp}
          onCancel={() => {
            setSelectedCard(null)
          }}
        />
      ) : mintedId === null ? (
        <MintStep
          chimp={selectedChimp}
          card={selectedCard}
          packId={selectedPack}
          onSuccess={setMintedId}
          onCancel={() => {
            setSelectedChimp(null)
          }}
        />
      ) : (
        <SuccessDisplay tokenId={mintedId} />
      )}

    </Layout>
  )
}

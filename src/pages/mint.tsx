import "@fontsource/source-serif-pro/400.css"
import React, { useCallback, useEffect, useState } from "react"
import { getAllPacksByOwner, SubgraphAdventureCardPack } from "../../shared/clients/adventure-cards-subgraph"
import Layout from "../components/Layout"
import { SelectPackStep } from "../components/SelectPack"
import { useWallet } from "../hooks/useWallet"

export default function Home() {
  const [selectedPack, setSelectedPack] = useState<SubgraphAdventureCardPack | null>(null)

  const { wallet } = useWallet()
  const walletAddress = wallet?.address
  const [adventurePacks, setAdventurePacks] = useState<Array<SubgraphAdventureCardPack> | null>(null)

  const fetchAdventurePacks = useCallback(async (walletAddress: string) => {
    try {
      setAdventurePacks(await getAllPacksByOwner(walletAddress))
    } catch (e) {
      console.error(`Error fetching packs: ${e}`)
    }
  }, [])

  useEffect(() => {
    if (!walletAddress) return

    fetchAdventurePacks(walletAddress)
  }, [walletAddress, fetchAdventurePacks])


  return (
    <Layout requireWallet>
      <SelectPackStep adventurePacks={adventurePacks} onSelect={setSelectedPack} />
    </Layout>
  )
}

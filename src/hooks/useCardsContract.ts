import { useMemo } from "react"
import { AdventureCardsContract, AdventureCardsContract__factory } from "../../shared/contract_types"
import { getNetworkConfig } from "../utils/network"
import { useBackupProvider } from "./useBackupProvider"
import { useWallet } from "./useWallet"

export enum ContractConnectionType {
  Injected = 0,
  Fallback = 1,
}

export type UseCardsContractValue = {
  cardsContract: AdventureCardsContract
  connectionType: ContractConnectionType
}

export function useCardsContract(): UseCardsContractValue {
  const { provider } = useBackupProvider()
  const { wallet } = useWallet()
  const injectedProvider = wallet?.web3Provider
  const mainContract = useMemo(
    () =>
      process.browser
        ? AdventureCardsContract__factory.connect(getNetworkConfig().contractConfig.cardsContractAddress, injectedProvider ?? provider)
        : null,
    [provider, injectedProvider],
  )

  return {
    cardsContract: mainContract!,
    connectionType: injectedProvider
      ? ContractConnectionType.Injected
      : ContractConnectionType.Fallback,
  }
}

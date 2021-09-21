import { useMemo } from "react"
import { CARDS_CONTRACT_ADDRESS } from "../../shared/config/base"
import { AdventureCardsContract, AdventureCardsContract__factory } from "../../shared/contract_types"
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
        ? AdventureCardsContract__factory.connect(CARDS_CONTRACT_ADDRESS, injectedProvider ?? provider)
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

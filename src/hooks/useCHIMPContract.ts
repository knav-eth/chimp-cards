import { useMemo } from "react"
import { CHIMP_CONTRACT_ADDRESS } from "../../shared/config/base"
import { CHIMP, CHIMP__factory } from "../../shared/contract_types"
import { useBackupProvider } from "./useBackupProvider"
import { useWallet } from "./useWallet"

export enum ContractConnectionType {
  Injected = 0,
  Fallback = 1,
}

export type UseCHIMPContractValue = {
  chimpContract: CHIMP
  connectionType: ContractConnectionType
}

export function useCHIMPContract(): UseCHIMPContractValue {
  const { provider } = useBackupProvider()
  const { wallet } = useWallet()
  const injectedProvider = wallet?.web3Provider
  const mainContract = useMemo(
    () =>
      process.browser
        ? CHIMP__factory.connect(CHIMP_CONTRACT_ADDRESS, injectedProvider ?? provider)
        : null,
    [provider, injectedProvider],
  )

  return {
    chimpContract: mainContract!,
    connectionType: injectedProvider
      ? ContractConnectionType.Injected
      : ContractConnectionType.Fallback,
  }
}

import { useMemo } from "react"
import { CHIMP, CHIMP__factory } from "../../shared/contract_types"
import { getNetworkConfig } from "../utils/network"
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
        ? CHIMP__factory.connect(getNetworkConfig().contractConfig.chimpContractAddress, injectedProvider ?? provider)
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

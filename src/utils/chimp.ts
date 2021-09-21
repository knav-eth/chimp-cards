import { SubgraphCHIMP } from "../../shared/clients/chimp-subgraph"

export type CHIMPWithAvailability = {
  chimp: SubgraphCHIMP
  isAvailable: boolean
}

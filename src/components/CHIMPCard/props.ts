import { FlexProps } from "@chakra-ui/react"
import { SubgraphCHIMP } from "../../../shared/clients/chimp-subgraph"

export type CHIMPCardProps = {
  chimp: SubgraphCHIMP
  containerProps?: Partial<FlexProps>
}

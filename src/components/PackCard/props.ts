import { FlexProps } from "@chakra-ui/react"
import { SubgraphAdventureCardPack } from "../../../shared/clients/adventure-cards-subgraph"

export type PackCardProps = {
  pack: SubgraphAdventureCardPack
  containerProps?: Partial<FlexProps>
}

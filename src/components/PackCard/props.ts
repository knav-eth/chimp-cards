import { FlexProps } from "@chakra-ui/react"
import { TokenWithMetadata } from "../../utils/types"

export type TokenCardProps = {
  token: TokenWithMetadata
  containerProps?: Partial<FlexProps>
}

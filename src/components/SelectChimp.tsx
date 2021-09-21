import { Box, Button, Heading, Link, Spinner, Text } from "@chakra-ui/react"
import React from "react"
import { SubgraphCHIMP } from "../../shared/clients/chimp-subgraph"
import { CHIMPWithAvailability } from "../utils/chimp"
import CHIMPGrid from "./CHIMPGrid"

export type SelectChimpStepProps = {
  chimps: Array<CHIMPWithAvailability> | null
  onSelect: (chimp: SubgraphCHIMP) => void
}


export const SelectChimpStep: React.FC<SelectChimpStepProps> = ({ chimps, onSelect }) => {
  return (
    <Box textAlign="center" width="full">
      <Heading as="h1" size="4xl" fontSize={["2xl", "3xl", "4xl"]} mb={4}>
        Select a CHIMP
      </Heading>
      {!chimps ? (
        <Box marginTop={24}>
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box paddingX={[null, null, "3rem"]}>
          {!chimps.length && (
            <Box>
              <Text marginTop={16} marginBottom={8} color="whiteAlpha.700">
                You do not own any Ns. You can mint one here.
              </Text>
              <Link href="https://chimp.lol">
                <Button>Mint one now</Button>
              </Link>
            </Box>
          )}
          <CHIMPGrid chimps={chimps} onClick={onSelect} />
        </Box>
      )}
    </Box>
  )
}

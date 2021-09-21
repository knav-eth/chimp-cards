import { Box, Button, Heading, Spinner, Stack, StackItem } from "@chakra-ui/react"
import React from "react"
import { AdventureCard } from "../utils/card"

export type SelectCardStepProps = {
  adventureCards: Array<AdventureCard> | null
  onSelect: (card: AdventureCard) => void
  onCancel: () => void
}


export const SelectCardStep: React.FC<SelectCardStepProps> = ({ adventureCards, onSelect, onCancel }) => {
  return (
    <Box textAlign="center" width="full">
      <Heading as="h1" size="4xl" fontSize={["2xl", "3xl", "4xl"]} mb={4}>
        Select an Adventure Card to Mint
      </Heading>
      <Box paddingX={2} justifyContent="center" textAlign="center">
        {!adventureCards ? (
          <Box marginTop={24}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <Box paddingX={[null, null, "3rem"]}>
            <Stack width="95%" maxWidth="600px" marginX="auto">
              {adventureCards.map((card) => (
                <StackItem key={card.offset}>
                  <Button
                    isDisabled={!card.isAvailable}
                    isFullWidth
                    onClick={() => {
                      onSelect(card)
                    }}
                  >
                    {card.title}
                  </Button>
                </StackItem>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
      <Box mt={6}>
        <Button
          onClick={onCancel}
          display="inline-block"
          mr={2}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

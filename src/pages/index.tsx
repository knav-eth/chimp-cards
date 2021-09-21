import { Box, Text } from "@chakra-ui/react"
import "@fontsource/source-serif-pro/400.css"
import React from "react"
import { ExternalLogos } from "../components/ExternalLogos"
import Layout from "../components/Layout"
import { useWallet } from "../hooks/useWallet"

export default function Home() {
  const { wallet, isConnected } = useWallet()

  return (
    <Layout>
      <Box flex={1} width="full" maxWidth="700px" marginX="auto" textAlign="center">
        <Text>Chimp Cards</Text>

      </Box>
      <Box marginTop={3}>
        <ExternalLogos />
      </Box>
    </Layout>
  )
}

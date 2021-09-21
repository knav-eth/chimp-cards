import { Box, Button, Text } from "@chakra-ui/react"
import "@fontsource/source-serif-pro/400.css"
import { useRouter } from "next/router"
import React, { useCallback } from "react"
import { ExternalLogos } from "../components/ExternalLogos"
import Layout from "../components/Layout"
import { useWallet } from "../hooks/useWallet"

export default function Home() {
  const { isConnected, connect } = useWallet()
  const router = useRouter()

  const handleGetStarted = useCallback(() => {
    router.push("/mint")
  }, [router])

  return (
    <Layout>
      <Box flex={1} width="full" maxWidth="700px" marginX="auto" textAlign="center">
        <Text>Chimp Cards</Text>
        {isConnected ? (
          <Button size="lg" onClick={handleGetStarted}>
            Get Started
          </Button>
        ) : (
          <Button onClick={connect} size="lg">
            Connect
          </Button>
        )}
      </Box>
      <Box marginTop={3}>
        <ExternalLogos />
      </Box>
    </Layout>
  )
}

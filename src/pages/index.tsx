import { Flex, Box, Button, Text, Heading, Image, SimpleGrid } from "@chakra-ui/react"
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
      <Box flex={1} width="full" maxWidth="1200px" marginX="auto">

<Heading textAlign="center" mb={8} size="xl">Chimp + Adventure Card =  ✨Chimp🐵Card✨</Heading>

<Flex flexDir="column" justifyContent="center" mb={16} textAlign="center">
{isConnected ? (
          <Button size="lg" onClick={handleGetStarted} background="#F6C104" color="black" alignSelf="center">
            Get Started
          </Button>
        ) : (
          <Button onClick={connect} size="lg" alignSelf="center">
            Connect
          </Button>
        )}
        <Flex justifyContent="center" mt={6}><Text mr={2}>Don&apos;t have a chimp?</Text> <a href="http://www.chimp.lol" style={{ color: "#F6C104", textDecoration: "underline" }}>Make one here!</a></Flex>
        </Flex>

<Flex justifyContent="space-between" flexDir={["column", "column", "column", "row"]}>
        <Box mb={8} px={4}>
        <Heading size="md" mb={8}>1. Select a CHIMP</Heading>
        <SimpleGrid columns={3} spacing={4} width={400}>
          <Image alt="chimp" src="/chimp1.svg" />
          <Box p={1} border={"2px solid #F6C104"}>
          <Image alt="chimp" src="/chimp2.svg" />
          </Box>
          <Image alt="chimp" src="/chimp3.svg" />
          <Image alt="chimp" src="/chimp4.svg" />
          <Image alt="chimp" src="/chimp5.svg" />
          <Image alt="chimp" src="/chimp6.svg" />
        </SimpleGrid>
        </Box>
<Box px={4}>
<Heading size="md" mb={8}>2. Select an Adventure Card</Heading>
        <ol style={{ fontSize: 18, lineHeight: 1.75 }}>
          <li>Ardent Nimble Haste</li>
          <li>Spider</li>
          <li>Heal</li>
          <li>Frozen Monk Ogre of the Border</li>
          <li style={{ color: "#F6C104"}}>Divine Robe</li>
          <li>Death Thief Hydra</li>
          <li>Aura Undead Kraken</li>
          <li>Earth Queen Hydra</li>
        </ol>
        </Box>
        
<Box px={4}>
<Heading size="md" mb={8}>3. Create a CHIMP Card!</Heading>
        <Image alt="chimp" src="/divine-robe-chimp.svg" />
        </Box>
        </Flex>

        
        
      </Box>
      <Box marginTop={3}>
        <ExternalLogos />
      </Box>
    </Layout>
  )
}

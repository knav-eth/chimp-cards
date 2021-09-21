import { gql, GraphQLClient } from "graphql-request"
import { getNetworkConfig } from "../../src/utils/network"

const client = new GraphQLClient(getNetworkConfig().adventureCardsGraphUrl)

export type SubgraphAdventureCardPack = {
  id: string
  numericId: number
  owner: string
  name: string
  metadata: string
  cards: Array<string>
}

type GetOneResponse = {
  adventureCardPack: SubgraphAdventureCardPack
}

const TOKEN_FRAGMENT = `
  id
  numericId
  owner
  name
  metadata
  cards
`

export async function getTokenById(tokenId: number): Promise<SubgraphAdventureCardPack | undefined> {
  const query = gql`
      query getTokenById($tokenId: Int!) {
          adventureCardPack(id: $tokenId) {
              ${TOKEN_FRAGMENT}
          }
      }
  `
  const variables = {
    tokenId,
  }

  const data = await client.request<GetOneResponse>(query, variables)
  return data?.adventureCardPack
}

type ListTokensResponse = {
  adventureCardPacks: Array<SubgraphAdventureCardPack>
}

export async function getTokensAfterId(mostRecentTokenId: number): Promise<Array<SubgraphAdventureCardPack>> {
  const query = gql`
      query getTokensAfterId($mostRecentTokenId: Int!) {
          adventureCardPacks(
              where:{ numericId_gt: $mostRecentTokenId }
              orderBy: id
              orderDirection: asc
          ) {
              ${TOKEN_FRAGMENT}
          }
      }
  `
  const variables = {
    mostRecentTokenId,
  }
  const data = await client.request<ListTokensResponse>(query, variables)
  return data?.adventureCardPacks
}

export async function getAllTokens(): Promise<Array<SubgraphAdventureCardPack>> {
  const query = gql`
      query getAllTokens {
          adventureCardPacks(
              orderBy: id
              orderDirection: asc
          ) {
              ${TOKEN_FRAGMENT}
          }
      }
  `
  const data = await client.request<ListTokensResponse>(query)
  return data?.adventureCardPacks
}

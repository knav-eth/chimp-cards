import { gql, GraphQLClient } from "graphql-request"
import { getNetworkConfig } from "../../src/utils/network"

const client = new GraphQLClient(getNetworkConfig().chimpCardsGraphUrl)

export type SubgraphCHIMPCard = {
  id: string
  numericId: number
  owner: string
  name: string
  image: string
  chimpId: number
  adventureCardId: number
  adventureCardOffset: number
  edition: number
}

type GetOneResponse = {
  chimpCard: SubgraphCHIMPCard
}

const TOKEN_FRAGMENT = `
  id
  numericId
  owner
  name
  chimpId
  adventureCardId
  adventureCardOffset
  image
  edition
`

export async function getCHIMPCardById(tokenId: number): Promise<SubgraphCHIMPCard | undefined> {
  const query = gql`
      query getTokenById($tokenId: Int!) {
          chimpCard(id: $tokenId) {
              ${TOKEN_FRAGMENT}
          }
      }
  `
  const variables = {
    tokenId,
  }

  const data = await client.request<GetOneResponse>(query, variables)
  return data?.chimpCard
}

type ListTokensResponse = {
  chimpCards: Array<SubgraphCHIMPCard>
}

export async function getCHIMPCardsAfterId(mostRecentTokenId: number): Promise<Array<SubgraphCHIMPCard>> {
  const query = gql`
      query getCHIMPCardsAfterId($mostRecentTokenId: Int!) {
          chimpCards(
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
  return data?.chimpCards
}

export async function getAllCHIMPCards(): Promise<Array<SubgraphCHIMPCard>> {
  const query = gql`
      query getAllCHIMPCards {
          chimpCards(
              orderBy: id
              orderDirection: asc
          ) {
              ${TOKEN_FRAGMENT}
          }
      }
  `
  const data = await client.request<ListTokensResponse>(query)
  return data?.chimpCards
}

export async function getAllCHIMPCardsByOwner(address: string): Promise<Array<SubgraphCHIMPCard>> {
  const query = gql`
      query getAllCHIMPCardsByOwner($owner: String!) {
          chimpCards(where: { owner: $owner }) {
              ${TOKEN_FRAGMENT}
          }
      }
  `
  const data = await client.request<ListTokensResponse>(query, { owner: address })
  return data?.chimpCards
}

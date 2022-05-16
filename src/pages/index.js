import {
  Heading,
  Box,
  SimpleGrid,
  Text,
  VStack,
  Avatar,
  HStack,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useHomeQuery } from "../services/api";
import millify from "millify";
import { useRouter } from "next/router";

export default function Home() {
  const { data, isLoading, isSuccess, error } = useHomeQuery();
  const router = useRouter();
  const StatData = data;
  console.log(StatData);
  return (
    <Flex p={4} justify="center" align="center">
      {isLoading && <Heading>Loading</Heading>}
      {error && <Heading>Error</Heading>}
      {isSuccess && (
        <Box>
          <VStack spacing={"40px"}>
            <Heading>Welcome To Crypto-Info</Heading>
            <Heading>Bitcoin Dominance {StatData.data.btcDominance}</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              <Box>
                <Text>Total Cryptocurrencies</Text>
                <Text>
                  {millify(StatData.data.totalCoins, { precision: 3 })}
                </Text>
              </Box>
              <Box>
                <Text>Total Exchanges</Text>
                <Text>
                  {millify(StatData.data.totalExchanges, { precision: 3 })}
                </Text>
              </Box>
              <Box>
                <Text>Total Markets</Text>
                <Text>
                  {millify(StatData.data.totalMarkets, { precision: 3 })}
                </Text>
              </Box>
            </SimpleGrid>
            <Heading> Trending Coins</Heading>
            <Stack spacing="50px" direction={{ base: "column", md: "row" }}>
              {StatData.data.bestCoins.map((coin, id) => (
                <Box
                  as="a"
                  border={"1px solid"}
                  key={id}
                  height="150px"
                  width="150px"
                  p={4}
                  borderRadius={"lg"}
                  onClick={() => {
                    router.push(`coins/${coin.uuid}`);
                  }}
                >
                  <HStack>
                    <Text>
                      {id + 1}. {coin.symbol}
                    </Text>
                    <Avatar size="sm" name={coin.name} src={coin.iconUrl} />
                  </HStack>
                  <Text>{coin.name}</Text>
                </Box>
              ))}
            </Stack>
            <Heading>Newest Coins</Heading>
            <Stack spacing="50px" direction={{ base: "column", md: "row" }}>
              {StatData.data.newestCoins.map((coin, id) => (
                <Box
                  as="a"
                  border={"1px solid"}
                  key={id}
                  height="150px"
                  width="150px"
                  p={4}
                  borderRadius={"lg"}
                  onClick={() => {
                    router.push(`coins/${coin.uuid}`);
                  }}
                >
                  <HStack>
                    <Text>
                      {id + 1}. {coin.symbol}
                    </Text>
                    <Avatar size="sm" name={coin.name} src={coin.iconUrl} />
                  </HStack>
                  <Text>{coin.name}</Text>
                </Box>
              ))}
            </Stack>
          </VStack>
        </Box>
      )}
    </Flex>
  );
}

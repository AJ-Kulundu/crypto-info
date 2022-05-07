import {
  Heading,
  Box,
  SimpleGrid,
  Text,
  VStack,
  Avatar,
  HStack,
  Stack,
  Flex
} from "@chakra-ui/react";
import { useHomeQuery } from "../services/api";

export default function Home() {
  const { data, isLoading, isSuccess, error } = useHomeQuery();
  const StatData = data;
  console.log(StatData);
  return (
    <Flex p={4} justify="flex-start" align="center" >
      {isLoading && <Heading>Loading</Heading>}
      {error && <Heading>Error</Heading>}
      {isSuccess && (
        <Box>
          <VStack spacing={"40px"}>
            <Heading>Welcome To Crypto-Info</Heading>
            <Heading>Bicoin Dominance {StatData.data.btcDominance}</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              <Box>
                <Text>Total Cryptocurrencies</Text>
                <Text>{StatData.data.totalCoins}</Text>
              </Box>
              <Box>
                <Text>Total Exchanges</Text>
                <Text>{StatData.data.totalExchanges}</Text>
              </Box>
              <Box>
                <Text>Total Markets</Text>
                <Text>{StatData.data.totalMarkets}</Text>
              </Box>
            </SimpleGrid>
            <Heading> Trending Coins</Heading>
            <Stack spacing="50px"  direction={{base:"column",md:"row"}}>
              {StatData.data.bestCoins.map((coin, id) => (
                <Box border={"1px solid"} key={id} height="150px" width="150px" p={4} borderRadius={"lg"}>
                  <HStack>
                    <Avatar size="sm" name={coin.name} src={coin.iconUrl} />
                    <Text>{coin.symbol}</Text>
                  </HStack>
                  <Text>{coin.name}</Text>
                </Box>
              ))}
            </Stack>
            <Heading>Newest Coins</Heading>
            <Stack spacing="50px"  direction={{base:"column",md:"row"}}>
              {StatData.data.newestCoins.map((coin, id) => (
                <Box border={"1px solid"} key={id} height="150px" width="150px" p={4} borderRadius={"lg"}>
                  <HStack>
                  <Avatar size="sm" name={coin.name} src={coin.iconUrl} />
                    <Text>{coin.symbol}</Text>
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

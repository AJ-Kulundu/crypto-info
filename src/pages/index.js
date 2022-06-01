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
import Loading from "../Components/Loading";

export default function Home({ host, apiKey }) {
  const headers = {
    "X-RapidAPI-Host": host,
    "X-RapidAPI-Key": apiKey,
  };
  const {
    data: StatData,
    isLoading,
    isSuccess,
    error,
  } = useHomeQuery({ headers });
  const router = useRouter();
  return (
    <Flex p={4} justify="flex-start" align="center">
      {isLoading && <Loading />}
      {error && <Heading>Error</Heading>}
      {isSuccess && (
        <Box width="100%">
          <VStack spacing={"40px"}>
            <Heading>Welcome To Crypto-Info</Heading>
            <Box width="100%" p={4} justifyContent="space-between">
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
            </Box>
            <Heading> Trending Coins</Heading>
            <Flex
              spacing="10"
              direction={{ base: "column", md: "row" }}
              width="100%"
              justify="space-between"
              p={4}
            >
              {StatData.data.bestCoins.map((coin, id) => (
                <Box
                  as="a"
                  border={"1px solid"}
                  key={id}
                  height="150px"
                  width="250px"
                  p={4}
                  borderRadius={"lg"}
                  onClick={() => {
                    router.push(`coins/${coin.uuid}`);
                  }}
                >
                  <Flex
                    direction={"row"}
                    justify="space-between"
                    align="center"
                  >
                    <Text>
                      {id + 1}. {coin.symbol}
                    </Text>
                    <Avatar size="sm" name={coin.name} src={coin.iconUrl} />
                  </Flex>
                  <Text>{coin.name}</Text>
                </Box>
              ))}
            </Flex>
            <Heading>Newest Coins</Heading>
            <Flex
              spacing="10"
              direction={{ base: "column", md: "row" }}
              width="100%"
              justify="space-between"
              p={4}
            >
              {StatData.data.newestCoins.map((coin, id) => (
                <Box
                  as="a"
                  border={"1px solid"}
                  key={id}
                  height="150px"
                  width="250px"
                  p={4}
                  borderRadius={"lg"}
                  onClick={() => {
                    router.push(`coins/${coin.uuid}`);
                  }}
                >
                  <Flex
                    direction={"row"}
                    justify="space-between"
                    align="center"
                  >
                    <Text>
                      {id + 1}. {coin.symbol}
                    </Text>
                    <Avatar size="sm" name={coin.name} src={coin.iconUrl} />
                  </Flex>
                  <Text>{coin.name}</Text>
                </Box>
              ))}
            </Flex>
          </VStack>
        </Box>
      )}
    </Flex>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      host: process.env.RAPIDAPI_HOST,
      apiKey: process.env.RAPIDAPI_KEY,
    },
  };
};

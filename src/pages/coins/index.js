import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  HStack,
  Avatar,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useCoinsQuery } from "../../services/api";
import moment from "moment";
const Coins = () => {
  const { data, isLoading, error, isSuccess } = useCoinsQuery();
  const CoinData = data;
  console.log(CoinData);

  return (
    <Flex justify={"center"} mb={4} p={4}>
      {isLoading && <Heading>Loading</Heading>}
      {error && <Heading>Error</Heading>}
      {isSuccess && (
        <Box>
          <Box p={4}>
            <Heading>Cryptocurrencies</Heading>
          </Box>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={4}
            spacingY={10}
          >
            {CoinData.data.coins.map((coin, id) => (
              <Box
                border={"1px solid"}
                key={id}
                p={5}
                borderRadius={"lg"}
                boxShadow={"md"}
              >
                <HStack>
                  <Avatar size="sm" name={coin.name} src={coin.iconUrl} />
                  <Text>{coin.symbol}</Text>
                </HStack>
                <Text>{coin.name}</Text>

                <Text> Price: {Math.round(coin.price * 100) / 100} USD</Text>
                <Text>Market Cap: {coin.marketCap} USD</Text>
                <Text>
                  Listed on:{" "}
                  {moment(coin.listedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Flex>
  );
};

export default Coins;

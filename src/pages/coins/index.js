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
import { motion } from "framer-motion";
import millify from "millify";
import { useRouter } from "next/router";

const MBox = motion(Box);

const Coins = () => {
  const { data, isLoading, error, isSuccess } = useCoinsQuery();
  const router = useRouter();
  const CoinData = data;

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
            spacingX={10}
            spacingY={10}
          >
            {CoinData?.data?.coins.map((coin, id) => (
              <MBox
                as="a"
                border={"1px solid"}
                key={id}
                p={5}
                borderRadius={"lg"}
                boxShadow={"md"}
                onClick={() => router.push(`coins/${coin.uuid}`)}
                whileHover={{ scale: 1.2, transition: 0.2 }}
                whileTap={{ scale: 0.8, transition: 0.2 }}
              >
                <HStack justify={"space-between"}>
                  <Text>
                    {id + 1}. {coin.symbol}
                  </Text>
                  <Avatar size="sm" name={coin.name} src={coin.iconUrl} />
                </HStack>
                <Text>{coin.name}</Text>
                <Text>
                  {" "}
                  Price:{" "}
                  {millify(Math.round(coin.price * 100) / 100, {
                    precision: 2,
                  })}{" "}
                  USD
                </Text>
                <Text>
                  Market Cap: {millify(coin.marketCap, { precision: 2 })} USD
                </Text>
                <HStack>
                  <Text>Daily Change: {coin.change}% </Text>
                </HStack>
              </MBox>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Flex>
  );
};

export default Coins;

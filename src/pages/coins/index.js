import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  HStack,
  Avatar,
  Text,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { useCoinsQuery } from "../../services/api";
import { motion } from "framer-motion";
import millify from "millify";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import Loading from "../../Components/Loading";

const MBox = motion(Box);

const Coins = () => {
  const Value = useColorModeValue("gray.800", "white");
  const { data: CoinData, isLoading, error, isSuccess } = useCoinsQuery();
  const router = useRouter();
  const [cryptos, setCryptos] = useState(CoinData?.data?.coins);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filteredData = CoinData?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setCryptos(filteredData);
  }, [CoinData, search]);

  return (
    <Flex width="100%" direction="column" mb={4} p={4}>
      <Center>
        <Flex p={4} width="50%" justify={"center"} mb={{ base: 2, md: 4 }}>
          <InputGroup>
            <Input
              placeholder="Search Crypto-currencies"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <FaSearch />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Center>
      {isLoading && <Loading />}
      {error && <Heading>Error</Heading>}
      {isSuccess && (
        <Box minHeight="65vh" width="100%">
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacingX={10}
            spacingY={10}
          >
            {cryptos && cryptos.length === 0 ? (
              <Center>
                <Heading>Crypto Currency not Found</Heading>
              </Center>
            ) : (
              cryptos &&
              cryptos.map((coin, id) => (
                <MBox
                  as="a"
                  border={"1px solid"}
                  key={id}
                  p={5}
                  borderRadius={"lg"}
                  boxShadow={"md"}
                  onClick={() => router.push(`coins/${coin.uuid}`)}
                  whileHover={{ scale: 1.1, transition: 0.2 }}
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
              ))
            )}
          </SimpleGrid>
        </Box>
      )}
    </Flex>
  );
};

export default Coins;

import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Avatar,
  SimpleGrid,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useCoinQuery, useHistoryQuery } from "../../../services/api";
import HTMLReactParser from "html-react-parser";
import { motion } from "framer-motion";
import millify from "millify";
import {
  FaDollarSign,
  FaTrophy,
  FaFunnelDollar,
  FaHashtag,
  FaMoneyBillWave,
  FaExclamation,
  FaAngleDown,
} from "react-icons/fa";
import LineChart from "../../../Components/LineChart";

const MLink = motion(Link);

const Coin = () => {
  const router = useRouter();
  const { id } = router.query;
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data: CoinData, isLoading, error, isSuccess } = useCoinQuery(id);
  const { data: HistoryData } = useHistoryQuery(id, timePeriod);

  console.log(timePeriod);
  const Time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  const Stats = [
    {
      title: "Ranking",
      value: CoinData?.data?.coin?.rank,
      icon: <FaHashtag />,
    },
    {
      title: "Price",
      value: `$ ${
        CoinData?.data?.coin?.price && millify(CoinData?.data?.coin?.price)
      } `,
      icon: <FaDollarSign />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        CoinData?.data?.coin?.marketCap &&
        millify(CoinData?.data?.coin?.marketCap)
      }`,
      icon: <FaDollarSign />,
    },

    {
      title: "All Time High",
      value: `$ ${
        CoinData?.data?.coin?.allTimeHigh?.price &&
        millify(CoinData?.data?.coin?.allTimeHigh?.price)
      }`,
      icon: <FaTrophy />,
    },
    {
      title: "Total Supply",
      value: `${
        CoinData?.data?.coin?.supply?.total
          ? millify(CoinData?.data?.coin?.supply?.total)
          : "N/A"
      }`,
      icon: <FaExclamation />,
    },
    {
      title: "Circulating Supply",
      value: `${
        CoinData?.data?.coin?.supply?.circulating &&
        millify(CoinData?.data?.coin?.supply?.circulating)
      }`,
      icon: <FaExclamation />,
    },
    {
      title: "Exchanges",
      value: `${
        CoinData?.data?.coin?.numberOfExchanges &&
        millify(CoinData?.data?.coin?.numberOfExchanges)
      }`,
      icon: <FaFunnelDollar />,
    },
    {
      title: "Markets",
      value: `${
        CoinData?.data?.coin?.numberOfMarkets &&
        millify(CoinData?.data?.coin?.numberOfMarkets)
      }`,
      icon: <FaMoneyBillWave />,
    },
  ];
  return (
    <Flex justify={"flex-start"} p={4}>
      {isLoading && <Heading>Loading</Heading>}
      {error && <Heading>Error</Heading>}
      {isSuccess && (
        <VStack>
          <Flex p={6} justify={"space-between"} align="center" width="100%">
            <Heading>{CoinData?.data?.coin?.name}</Heading>
            <Avatar
              size="lg"
              name={CoinData?.data?.coin?.name}
              src={CoinData?.data?.coin?.iconUrl}
            />
          </Flex>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaAngleDown />}>
              {timePeriod}
            </MenuButton>
            <MenuList>
              {Time.map((time, id) => (
                <MenuItem key={id} onClick={() => setTimePeriod(time)}>
                  {time}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Flex p={6} width="100%" justify={"flex-start"} direction="column">
            <LineChart
              coinHistory={HistoryData}
              currentPrice={millify(CoinData?.data?.coin?.price)}
              coinName={CoinData?.data?.coin?.name}
            />
          </Flex>
          <Flex width={"100%"} justify={"flex-start"} p={6}>
            <VStack justify={"flex-start"}>
              <Heading>{CoinData?.data?.coin?.name} Statistics</Heading>
              <SimpleGrid
                columns={{ base: 1, md: 3, lg: 4 }}
                spacingX={{ base: 5, md: 10 }}
                spacingY={{ base: 5, md: 10 }}
                justify={"space-between"}
              >
                {Stats.map((stat, id) => (
                  <Flex
                    key={id}
                    p={6}
                    direction="row"
                    justify={"space-between"}
                    width="full"
                    boxShadow={"md"}
                    mx={2}
                    borderRadius={"lg"}
                  >
                    <Flex direction="row" align="center">
                      {stat.icon}
                      <Text>{stat.title}</Text>
                    </Flex>
                    <Text>{stat.value}</Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </VStack>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2 }} width="full">
            <Flex direction="column" p={6} justify={"flex-start"}>
              <Heading>What is {CoinData?.data?.coin?.name}?</Heading>
              <VStack spacingY={5}>
                <Text>
                  {HTMLReactParser(CoinData?.data?.coin?.description)}
                </Text>
              </VStack>
            </Flex>
            <Flex p={4} direction="column" align={"center"}>
              <Heading>{CoinData?.data?.coin?.name} Links</Heading>
              {CoinData?.data?.coin?.links.map((link, id) => (
                <Flex
                  key={id}
                  p={6}
                  direction="row"
                  justify={"space-between"}
                  width="full"
                  boxShadow={"md"}
                  mb={2}
                  borderRadius={"lg"}
                >
                  <Text>{link.type}</Text>
                  <MLink
                    href={link.url}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    isExternal
                  >
                    {link.name}
                  </MLink>
                </Flex>
              ))}
            </Flex>
          </SimpleGrid>
        </VStack>
      )}
    </Flex>
  );
};

export default Coin;

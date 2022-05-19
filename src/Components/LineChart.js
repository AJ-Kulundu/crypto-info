import React from "react";
import { HStack, Box, Text } from "@chakra-ui/react";

function LineChart({ coinHistory, currentPrice, coinName }) {
  return (
    <HStack justify={"space-between"}>
      <Text>{coinName}</Text>
      <Text>{currentPrice}</Text>
    </HStack>
  );
}

export default LineChart;

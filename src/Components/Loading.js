import React from "react";
import Loader from "react-loaders";
import { Flex } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex height={"75vh"}>
      <Loader type={"line-scale-pulse-out-rapid"} />
    </Flex>
  );
};

export default Loading;

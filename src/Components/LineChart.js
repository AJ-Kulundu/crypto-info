import React from "react";
import { HStack, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ coinHistory, currentPrice, coinName }) {
  const value = useColorModeValue("#1A202C", "#F7FAFC");
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinTimestamp.push(
      moment.unix(coinHistory?.data?.history[i].timestamp).format("L")
      //new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <Box>
      <HStack justify={"space-between"}>
        <Text>{coinName}</Text>
        <Text>Current Price: {currentPrice}</Text>
      </HStack>
      <Line data={data} options={options} />
    </Box>
  );
}

export default LineChart;

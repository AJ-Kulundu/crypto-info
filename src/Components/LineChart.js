import React from "react";
import { HStack, Box, Text } from "@chakra-ui/react";
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

function LineChart({ coinHistory, currentPrice, coinName, color }) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinTimestamp.push(
      moment
        .unix(coinHistory?.data?.history[i].timestamp)
        .format(`DD-MM-YY, HH:mm`)
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: color,
        borderColor: color,
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
        <Text>Current Price: {currentPrice} USD</Text>
      </HStack>
      <Line data={data} options={options} />
    </Box>
  );
}

export default LineChart;

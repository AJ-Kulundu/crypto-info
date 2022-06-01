import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coinRankApi = createApi({
  reducerPath: "coinRankApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://coinranking1.p.rapidapi.com" }),
  endpoints: (builder) => ({
    home: builder.query({
      query: ({ headers }) => ({
        url: `/stats`,
        method: "GET",
        headers: headers,
      }),
    }),
    coins: builder.query({
      query: ({ headers }) => ({
        url: `/coins`,
        method: "GET",
        headers: headers,
        params: { limit: 100 },
      }),
    }),
    coin: builder.query({
      query: ({ uuid, headers }) => ({
        url: `/coin/${uuid}`,
        method: "GET",
        headers: headers,
      }),
    }),
    history: builder.query({
      query: ({ id, timePeriod, headers }) => ({
        url: `/coin/${id}/history`,
        method: "GET",
        headers: headers,
        params: { timePeriod: timePeriod },
      }),
    }),
  }),
});

export const { useHomeQuery, useCoinsQuery, useCoinQuery, useHistoryQuery } =
  coinRankApi;

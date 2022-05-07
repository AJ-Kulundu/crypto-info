import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinRankApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': API_KEY
}

export const coinRankApi = createApi({
    reducerPath: 'coinRankApi',
    baseQuery: fetchBaseQuery({baseUrl:"https://coinranking1.p.rapidapi.com"}),
    endpoints: (builder) => ({
        home: builder.query({
            query: () => ({
                url:`/stats`,
                method:'GET',
                headers: coinRankApiHeaders
            })
        }),
        coins: builder.query({
            query: () => ({
                url:`/coins`,
                method:'GET',
                headers: coinRankApiHeaders
            })
        }),
        coin: builder.query({
            query: (id) => ({
                url:`/coin/${id}`,
                method:'GET',
                headers:coinRankApiHeaders
            })
        }),
        history: builder.query({
            query: (id) => ({
                url:`/coin/${id}/history`,
                method:'GET',
                headers:coinRankApiHeaders
            })
        }),
    })
})


export const {useHomeQuery, useCoinsQuery, useCoinQuery,useHistoryQuery} = coinRankApi;
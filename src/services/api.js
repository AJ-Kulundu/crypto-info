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
                method:"GET",
                headers: coinRankApiHeaders
            })
        })
    })
})


export const {useHomeQuery} = coinRankApi;
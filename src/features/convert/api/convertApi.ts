import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Inputs } from "@/features/convert/ui"

const headers = {
  "X-RapidAPI-Key": "d057ba7c66msh85f5e128d38ccb5p1fd206jsnfd5f03361448",
  "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
}

export const convertApi = createApi({
  reducerPath: "convertApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://currency-conversion-and-exchange-rates.p.rapidapi.com", headers }),
  endpoints: (builder) => ({
    convert: builder.query<ConvertResponse, ConvertArg>({
      query: ({ from, to, amount }) => `/convert?from=${from}&to=${to}&amount=${amount}`,
    }),
  }),
})

export const { useLazyConvertQuery, useConvertQuery } = convertApi

type ConvertArg = Omit<Inputs, "amount"> & { amount: string }

export type ConvertResponse = {
  date: string
  info: {
    rate: number
    timestamp: number
  }
  query: {
    amount: number
    from: string
    to: string
  }
  result: number
  success: boolean
}

import { useSearchParams } from "react-router-dom"
import { CurrencyCodes } from "@/common/constants"

export const useConvertQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const fromParam = searchParams.get("from")
  const queryFrom = fromParam !== null && fromParam in CurrencyCodes ? fromParam : "USD"

  const toParam = searchParams.get("to")
  const queryTo = toParam !== null && toParam in CurrencyCodes ? toParam : "EUR"

  const queryAmount = Number(searchParams.get("amount")) || 1

  const setParams = (from: string, to: string, amount: string) => {
    searchParams.set("from", from)
    searchParams.set("to", to)
    searchParams.set("amount", amount)
    setSearchParams(searchParams)
  }

  return {
    queryFrom,
    queryTo,
    queryAmount,
    setParams,
  }
}

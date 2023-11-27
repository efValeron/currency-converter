import { SubmitHandler, useForm } from "react-hook-form"
import S from "./ConvertForm.module.scss"
import { CurrencyCodes } from "@/common/constants"
import { useLazyConvertQuery } from "@/features/convert/api"
import { useEffect } from "react"
import { useConvertQueryParams } from "@/features/convert/lib"

export type Inputs = {
  from: string
  to: string
  amount: number
}

export const ConvertForm = () => {
  const [trigger, result] = useLazyConvertQuery()
  const { queryTo, queryFrom, queryAmount, setParams } = useConvertQueryParams()

  useEffect(() => {
    trigger({ from: queryFrom, to: queryTo, amount: queryAmount.toString() })
  }, [queryAmount, queryFrom, queryTo, trigger])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Inputs>({ defaultValues: { from: queryFrom, to: queryTo, amount: queryAmount } })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("sending")

    const payload = {
      from: data.from,
      to: data.to,
      amount: data.amount.toString(),
    }

    setParams(data.from, data.to, data.amount.toString())
    trigger(payload)
  }

  const swapCurrencies = () => {
    const [from, to] = [getValues("from"), getValues("to")]
    console.log(`Swapping: from ${to}, to ${from}`)
    setValue("from", to)
    setValue("to", from)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={S.form}>
        <div className={S.formColumn}>
          <div className={S.formItem}>
            <select {...register("from", { required: true })}>
              {Object.keys(CurrencyCodes).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode} {CurrencyCodes[currencyCode]}
                </option>
              ))}
            </select>
            {errors.from?.type === "required" && <span>This field is required</span>}
          </div>

          <div className={S.formItem}>
            <input type="number" step="0.01" {...register("amount", { required: true, min: 0.01 })} />
            {errors.amount?.type === "required" && <span>This field is required</span>}
            {errors.amount?.type === "min" && <span>Minimum amount is 0.01</span>}
          </div>
        </div>

        <div className={S.formItem}>
          <button type="button" onClick={swapCurrencies}>
            swap
          </button>
        </div>

        <div className={S.formColumn}>
          <div className={S.formItem}>
            <select {...register("to", { required: true })}>
              {Object.keys(CurrencyCodes).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode} {CurrencyCodes[currencyCode]}
                </option>
              ))}
            </select>
            {errors.to?.type === "required" && <span>This field is required</span>}
          </div>

          <div className={S.formItem}>
            <input type="number" readOnly value={result.isSuccess ? result.data.result : ""} />
          </div>
        </div>

        <div className={S.formItem}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

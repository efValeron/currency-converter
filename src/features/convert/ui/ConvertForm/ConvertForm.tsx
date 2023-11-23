import { SubmitHandler, useForm } from "react-hook-form"
import S from "./ConvertForm.module.scss"
import { CURRENCY_CODES } from "@/common/constants"
import { useLazyConvertQuery } from "@/features/convert/api"

export type Inputs = {
  from: string
  to: string
  amount: number
}

export const ConvertForm = () => {
  const currencies = CURRENCY_CODES
  const [trigger, result] = useLazyConvertQuery()
  const [defaultFrom, defaultTo] = ["USD", "BYN"]
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Inputs>({ defaultValues: { from: defaultFrom, to: defaultTo, amount: 1 } })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("sending")
    if (data.from === data.to) {
      setError("to", { type: "same", message: "Can't convert to the same currency" })
      return
    }
    const payload = {
      from: data.from,
      to: data.to,
      amount: data.amount.toString(),
    }
    trigger(payload)
  }

  const swapCurrencies = () => {
    const [from, to] = [getValues("from"), getValues("to")]
    console.log(`Swapping: from - ${to}, to - ${from}`)
    setValue("from", to)
    setValue("to", from)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={S.form}>
        <div className={S.formColumn}>
          <div className={S.formItem}>
            {/*<label>From</label>*/}
            <select {...register("from", { required: true })}>
              {Object.keys(currencies).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode} - {currencies[currencyCode]}
                </option>
              ))}
            </select>
            {errors.from?.type === "required" && <span>This field is required</span>}
          </div>

          <div className={S.formItem}>
            {/*<label>Amount</label>*/}
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
            {/*<label>To</label>*/}
            <select {...register("to", { required: true })}>
              {Object.keys(currencies).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode} - {currencies[currencyCode]}
                </option>
              ))}
            </select>
            {errors.to?.type === "required" && <span>This field is required</span>}
            {errors.to?.type === "same" && <span>{errors.to.message}</span>}
          </div>

          <div className={S.formItem}>
            {/*<label>Amount</label>*/}
            <input type="number" readOnly value={result.isSuccess ? result.data.result : ""} />
          </div>
        </div>

        <div className={S.formItem}>
          <button type="submit">Send</button>
        </div>
      </form>
      {/*<h3>{result.isSuccess && result.data.result.toFixed(2)}</h3>*/}
    </div>
  )
}

import { Controller, useForm } from "react-hook-form"
import S from "./ConvertForm.module.scss"
import { CurrencyCodes } from "@/common/constants"
import { useLazyConvertQuery } from "@/features/convert/api"
import { useCallback, useEffect } from "react"
import { useConvertQueryParams } from "@/features/convert/lib"
import { Button, Input, Select } from "antd"
import { LoadingOutlined, SwapOutlined } from "@ant-design/icons"
import { debounce } from "lodash"

export type Inputs = {
  from: string
  to: string
  amount: number
}

export const ConvertForm = () => {
  const [trigger, result] = useLazyConvertQuery()
  const { queryTo, queryFrom, queryAmount, setParams } = useConvertQueryParams()

  const {
    watch,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<Inputs>({ defaultValues: { from: queryFrom, to: queryTo, amount: queryAmount } })

  const debouncedHandleSubmit = useCallback(
    debounce((formData: Inputs) => {
      setParams(formData.from, formData.to, formData.amount.toString())
    }, 500), // <== TIMEOUT IS HERE
    [],
  )

  const handleSubmit = useCallback(
    (formData: Inputs) => {
      setParams(formData.from, formData.to, formData.amount.toString())
    },
    [setParams],
  )

  const swapCurrencies = () => {
    const [from, to] = [getValues("from"), getValues("to")]
    setValue("from", to)
    setValue("to", from)
  }

  useEffect(() => {
    trigger({ from: queryFrom, to: queryTo, amount: queryAmount.toString() })
  }, [queryAmount, queryFrom, queryTo, trigger])

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "amount") {
        debouncedHandleSubmit(value as Inputs)
      } else {
        handleSubmit(value as Inputs)
      }
    })
    return () => {
      debouncedHandleSubmit.cancel()
    }
  }, [debouncedHandleSubmit, handleSubmit, watch])

  const swapButtonDisabled = result.isFetching || result.isLoading || watch("from") === watch("to")

  return (
    <form className={S.form}>
      <div className={S.formColumn}>
        <div className={S.formItem}>
          <Controller
            name="from"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Select {...field} showSearch size="large">
                  {Object.keys(CurrencyCodes).map((currencyCode) => (
                    <Select.Option key={currencyCode} value={currencyCode}>
                      {currencyCode} {CurrencyCodes[currencyCode]}
                    </Select.Option>
                  ))}
                </Select>
                {errors.from?.type === "required" && <span>This field is required</span>}
              </>
            )}
          />
        </div>

        <div className={S.formItem}>
          <Controller
            name="amount"
            control={control}
            rules={{ required: true, min: 0.01 }}
            render={({ field }) => (
              <>
                <Input type="number" step="0.01" {...field} size="large" />
                {errors.amount?.type === "required" && <span>This field is required</span>}
                {errors.amount?.type === "min" && <span>Minimum amount is 0.01</span>}
              </>
            )}
          />
        </div>
      </div>

      <div className={S.formItem}>
        <Button
          shape="circle"
          onClick={swapCurrencies}
          icon={!swapButtonDisabled ? <SwapOutlined /> : <LoadingOutlined spin />}
          disabled={swapButtonDisabled}
        />
      </div>

      <div className={S.formColumn}>
        <div className={S.formItem}>
          <Controller
            name="to"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Select {...field} showSearch size="large">
                  {Object.keys(CurrencyCodes).map((currencyCode) => (
                    <Select.Option key={currencyCode} value={currencyCode}>
                      {currencyCode} {CurrencyCodes[currencyCode]}
                    </Select.Option>
                  ))}
                </Select>
                {errors.to?.type === "required" && <span>This field is required</span>}
              </>
            )}
          />
        </div>

        <div className={S.formItem}>
          <Input size="large" type="number" readOnly value={result.isSuccess ? result.data.result : ""} />
        </div>
      </div>
    </form>
  )
}

import { useConvertQueryParams } from "@/features/convert/lib"
import { convertRatesOptions, CurrencyCodes } from "@/common/constants"
import { useConvertQuery } from "@/features/convert/api"
import { Fragment } from "react"
import S from "./currencyRatesSection.module.scss"

// export const CurrencyRatesSection = () => {
//   const { queryFrom, queryTo } = useConvertQueryParams()
//   const { data, isSuccess } = useConvertQuery({ from: queryFrom, to: queryTo, amount: (1).toString() })
//
//   return (
//     <section className={S.mainSection}>
//       {isSuccess && (
//         <Fragment key="fragment">
//           <section>
//             <h3>
//               Convert {CurrencyCodes[queryFrom]} to {CurrencyCodes[queryTo]}
//             </h3>
//             <ul>
//               <li>
//                 <p>{queryFrom}</p>
//                 <p>{queryTo}</p>
//               </li>
//               {convertRatesOptions.map((option) => (
//                 <li key={option}>
//                   <p>{option}</p>
//                   <p>{(data.result * option).toFixed(4)}</p>
//                 </li>
//               ))}
//             </ul>
//           </section>
//           <section>
//             <h3>
//               Convert {CurrencyCodes[queryTo]} to {CurrencyCodes[queryFrom]}
//             </h3>
//             <ul>
//               <li>
//                 <p>{queryTo}</p>
//                 <p>{queryFrom}</p>
//               </li>
//               {convertRatesOptions.map((option) => (
//                 <li key={option}>
//                   <p>{option}</p>
//                   <p>{(option / data.result).toFixed(4)}</p>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         </Fragment>
//       )}
//     </section>
//   )
// }

export const CurrencyRatesSection = () => {
  const { queryFrom, queryTo } = useConvertQueryParams()
  const { data, isSuccess } = useConvertQuery({ from: queryFrom, to: queryTo, amount: (1).toString() })

  return (
    <div className={S.mainSection}>
      {isSuccess && (
        <Fragment key="fragment">
          <div>
            <h3>
              Convert {CurrencyCodes[queryFrom]} to {CurrencyCodes[queryTo]}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>{queryFrom}</th>
                  <th>{queryTo}</th>
                </tr>
              </thead>
              <tbody>
                {convertRatesOptions.map((option) => (
                  <tr key={option}>
                    <td>
                      {option} {queryFrom}
                    </td>
                    <td>
                      {(data.result * option).toFixed(4)} {queryTo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>
              Convert {CurrencyCodes[queryTo]} to {CurrencyCodes[queryFrom]}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>{queryTo}</th>
                  <th>{queryFrom}</th>
                </tr>
              </thead>
              <tbody>
                {convertRatesOptions.map((option) => (
                  <tr key={option}>
                    <td>
                      {option} {queryTo}
                    </td>
                    <td>
                      {(option / data.result).toFixed(4)} {queryFrom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  )
}

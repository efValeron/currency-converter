import { ConvertForm } from "@/features/convert/ui"
import S from "./app.module.scss"

export const App = () => {
  return (
    <main className={S.app}>
      <ConvertForm />
      {/*<CurrencyRatesSection />*/}
    </main>
  )
}

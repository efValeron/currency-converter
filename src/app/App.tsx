import { ConvertForm } from "@/features/convert/ui"
import S from "./app.module.scss"
import { CurrencyRatesSection } from "@/features/convert/ui/CurrencyRatesSection/CurrencyRatesSection.tsx"

export const App = () => {
  return (
    <main className={S.app}>
      <ConvertForm />
      <CurrencyRatesSection />
    </main>
  )
}

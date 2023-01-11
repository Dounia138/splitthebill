import Price from '$components/dashboard/Price'
import Sidebar from '$components/dashboard/Sidebar'
import { Card } from 'flowbite-react'

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-10">
        <Card className="shadow-none">
          <div className="grid grid-cols-3 max-w-3xl gap-4">
            <Price label="Total de la coloc'" price={1053.87} />
            <Price
              label="Ce que tu dois encore payer"
              price={160.43}
              tooltip="A payer avant le 15/12/2022"
            />
            <Price label="Ce que tu as déjà payé" price={110.56} />
          </div>
        </Card>
      </main>
      <Sidebar />
    </div>
  )
}

export default Dashboard

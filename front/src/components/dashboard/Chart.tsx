import { useAppartmentStore } from '$hooks/useAppartmentStore'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const options = {
  elements: {
    line: {
      tension: 0.3,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

const Chart = () => {
  const tickets = useAppartmentStore((state) => state.tickets())

  const MONTH_TO_MILLISECONDS = 1000 * 60 * 60 * 24 * 30

  const lastSixMonths = new Array(6)
    .fill(null)
    .map((_, i) => new Date(Date.now() - MONTH_TO_MILLISECONDS * i))
    .reverse()

  const data = {
    labels: lastSixMonths.map((date) => date.toLocaleString('fr-FR', { month: 'long' }).split(', ')[0]),
    datasets: [
      {
        label: "Dépenses de la colloc'",
        data: lastSixMonths.map((date) =>
          tickets.filter((ticket) => {
            const ticketDate = new Date(ticket.createdAt)
            return ticketDate.getMonth() === date.getMonth() && ticketDate.getFullYear() === date.getFullYear()
          }).reduce((acc, ticket) => acc + ticket.amount, 0),
        ),
        borderColor: 'rgb(88 80 236)',
      },
    ],
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md h-max">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap h-10 items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Évolution des dépenses de la colloc'
            </h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default Chart

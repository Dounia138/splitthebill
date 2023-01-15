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

const data = {
  labels: new Array(6)
    .fill(null)
    .map(
      (_, i) =>
        new Date(new Date().setMonth(new Date().getMonth() + 7 + i))
          .toLocaleString('fr-FR', { month: 'long' })
          .split(', ')[0],
    ), // get the last 6 months
  datasets: [
    {
      label: "Dépenses de la colloc'",
      data: [1000, 1100, 1050, 1030, 1020, 1010],
      borderColor: 'rgb(88 80 236)',
    },
  ],
}

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
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
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

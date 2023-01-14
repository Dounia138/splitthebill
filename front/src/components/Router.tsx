import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './dashboard/Overview'
import Mates from './dashboard/Mates'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="/collocs" element={<Mates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router

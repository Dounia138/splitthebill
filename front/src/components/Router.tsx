import Login from '$pages/Login'
import Signup from '$pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './dashboard/Overview'
import Mates from './dashboard/Mates'
import GeneralSettings from './settings/GeneralSettings'
import SettingsLayout from './layouts/SettingsLayout'
import PasswordSettings from './settings/PasswordSettings'
import NotificationsSettings from './settings/NotificationsSettings'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="connexion" element={<Login />} />
        <Route path="inscription" element={<Signup />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="collocs" element={<Mates />} />
          <Route path="parametres" element={<SettingsLayout />}>
            <Route index element={<GeneralSettings />} />
            <Route path="mot-de-passe" element={<PasswordSettings />} />
            <Route path="notifications" element={<NotificationsSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router

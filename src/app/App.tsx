import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import { Contact, Home, Placeholder, Portfolio, Stack, Trajectory } from '@/pages'
import { modules } from '@/config/modules'

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Navigate to="/" replace />} />
        <Route path="stack" element={modules.stack.enabled ? <Stack /> : <Navigate to="/" replace />} />
        <Route path="trajectory" element={modules.trajectory.enabled ? <Trajectory /> : <Navigate to="/" replace />} />
        <Route path="portfolio" element={modules.portfolio.enabled ? <Portfolio /> : <Navigate to="/" replace />} />
        <Route path="contact" element={modules.contact.enabled ? <Contact /> : <Navigate to="/" replace />} />
        <Route path="tech" element={<Placeholder title="COMING_SOON" />} />
        <Route path="network" element={<Placeholder title="COMING_SOON" />} />
        <Route path="comms" element={<Placeholder title="COMING_SOON" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}


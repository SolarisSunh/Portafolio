import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { StoreLayout } from '@/components/store/StoreLayout'
import { CompanyPage } from '@/pages/CompanyPage'
import { HomePage } from '@/pages/HomePage'
import { LabPage } from '@/pages/LabPage'
import { QuotePage } from '@/pages/QuotePage'
import { StorePage } from '@/pages/StorePage'
import { SystemsPage } from '@/pages/SystemsPage'

/** Redirect that preserves the query string (e.g. /contact?topic=... → /quote?topic=...). */
function RedirectTo({ to }: { to: string }) {
  const { search } = useLocation()
  return <Navigate to={`${to}${search}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="store" element={<StorePage />} />
        <Route path="systems" element={<SystemsPage />} />
        <Route path="lab" element={<LabPage />} />
        <Route path="company" element={<CompanyPage />} />
        <Route path="quote" element={<QuotePage />} />

        {/* Legacy routes → closest replacement (bookmarks/internal links stay valid) */}
        <Route path="products" element={<RedirectTo to="/store" />} />
        <Route path="prebuilt" element={<RedirectTo to="/systems" />} />
        <Route path="repair" element={<RedirectTo to="/lab" />} />
        <Route path="about" element={<RedirectTo to="/company" />} />
        <Route path="contact" element={<RedirectTo to="/quote" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

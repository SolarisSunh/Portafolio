import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ProjectPreview } from './routes/ProjectPreview'
import { NotFound } from './routes/NotFound'

const router = createBrowserRouter(
  [
    { path: '/', element: <App />, errorElement: <NotFound /> },
    { path: '/project/:slug', element: <ProjectPreview /> },
    { path: '*', element: <NotFound /> },
  ],
  { basename: (import.meta as any).env?.BASE_URL || '/' }
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

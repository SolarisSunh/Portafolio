import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ajusta la base automáticamente si se despliega en GitHub Pages.
// Si el repositorio es user/repo, Pages sirve en https://user.github.io/repo/
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : ''

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? `/${repo}/` : '/',
  plugins: [react()],
})

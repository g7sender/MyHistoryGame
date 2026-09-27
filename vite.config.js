import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages משרת את הפרויקט תחת https://<user>.github.io/MyHistoryGame/ - כתובת
  // ה-assets בבנייה חייבת להיות יחסית לתת-הנתיב הזה, לא לשורש הדומיין.
  base: '/MyHistoryGame/',
})

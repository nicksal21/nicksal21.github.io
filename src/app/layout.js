import './globals.css'

export const metadata = {
  title: 'Nicholas Salazar — AI Engineering & Data Analysis',
  description: 'Portfolio showcasing AI engineering, data analysis, and visualization projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
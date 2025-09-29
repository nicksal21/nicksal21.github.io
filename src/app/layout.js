import './globals.css'

export const metadata = {
  title: 'Nicholas Salazar - Data Science Portfolio',
  description: 'Data Science and Visualization Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
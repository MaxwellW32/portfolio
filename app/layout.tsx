import './globals.css'
import Navbar from './NavBar'

export const metadata = {
  title: 'Portfolio',
  description: 'Generated by yours truly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}

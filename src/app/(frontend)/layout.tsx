import React from 'react'
import './styles.css'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'

export const metadata = {
  description: 'Welcome to Restroland Where Food Meets Desires.',
  title: 'Restro Land Restaurant',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>
          <MantineProvider>{children}</MantineProvider>
        </main>
      </body>
    </html>
  )
}

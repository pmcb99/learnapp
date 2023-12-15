import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ToasterProvider } from '@/components/toaster-provider'
import { ModalProvider } from '@/components/modal-provider'
import { CrispProvider } from '@/components/crisp-provider'
import { ThemeProvider } from '@/components/theme-provider'
import Provider from "@/app/_trpc/Provider";
import { usePlausible  }  from 'next-plausible'
import PlausibleProvider from 'next-plausible'

import './globals.css'
import { checkWhatPlanUserIsOn } from '@/lib/subscription'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rewise',
  description: 'Leaving Cert AI Assistant',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userPlan = await checkWhatPlanUserIsOn();

  return (
    <ClerkProvider>
      <head>
        <PlausibleProvider domain="example.com" />
      </head>
      <html lang="en" suppressHydrationWarning>
        <CrispProvider />
        <body className={font.className}>
          <ToasterProvider />
          <ModalProvider userPlan={userPlan}/>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Provider>{children}</Provider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

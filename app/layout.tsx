import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat, Nunito, Poppins } from "next/font/google"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ServiceWorkerRegistration } from "@/components/service-worker-registration"
import { OfflineIndicator } from "@/components/offline-indicator"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
})

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nunito",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Skulwise - Built for African Students. Powered by AI.",
  description:
    "Transform your notes into audiobooks, get AI-powered study plans, and compete with students across Africa.",
  manifest: "/manifest.json",
  themeColor: "#0059C2",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${nunito.variable} ${poppins.variable}`}>
      <body className="font-inter">
        <AuthProvider>
          <ServiceWorkerRegistration />
          <OfflineIndicator />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

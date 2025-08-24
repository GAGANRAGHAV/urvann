import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  // weight: "400"
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata = {
  title: "Urvann Plant Store",
  description: "Your one-stop destination for beautiful plants",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-[#072524] text-[#fcfaf5] font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  )
}

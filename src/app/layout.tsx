import type { Metadata } from "next"
import { Providers } from "@/server/rpc/client.provider"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "igris",
  description: "Download video like nothing...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

import "./globals.css"

export const metadata = {
  title: "FounderMatch - ML Algorithm for Optimal Mentor-Founder Matching",
  description: "AI-powered platform that matches startup founders with mentors using machine learning algorithms",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

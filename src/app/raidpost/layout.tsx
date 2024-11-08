import HeaderField from '@/components/header/headerField'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <HeaderField />
      {children}
    </div>
  )
}

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center px-5 py-10 sm:px-12 md:px-16 lg:px-28 xl:px-36 2xl:px-44'>
      {children}
    </div>
  )
}

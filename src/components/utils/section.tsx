export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full w-full items-center justify-center px-5 py-2 sm:px-12 sm:py-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44'>
      {children}
    </div>
  )
}

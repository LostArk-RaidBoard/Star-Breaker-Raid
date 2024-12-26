import LogField from '@/components/header/HeadlogField'
import Logo from '@/components/header/Logo'
import MHeaderField from '@/components/header/mHeaderField'
import NaviBar from '@/components/header/NaviBar'

export default function HeaderField() {
  return (
    <div className='sticky top-0 z-50 flex h-12 w-full items-center border-b border-gray-300 bg-white shadow-xl sm:h-16 sm:px-12 md:px-16 lg:px-28 xl:px-36 2xl:px-44'>
      <nav className='flex hidden h-12 w-full items-center justify-between sm:flex'>
        <div className='flex items-center gap-8'>
          <Logo />
          <NaviBar />
        </div>

        <LogField />
      </nav>
      <MHeaderField />
    </div>
  )
}

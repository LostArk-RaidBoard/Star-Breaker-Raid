import LogField from '@/components/header/HeadlogField'
import Logo from '@/components/header/Logo'
import MHeaderField from '@/components/header/mHeaderField'
import NaviBar from '@/components/header/NaviBar'

export default function HeaderField() {
  return (
    <div className='h-24 w-full border-b-2 border-gray-900 sm:h-16'>
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

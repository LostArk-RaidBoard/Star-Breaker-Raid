import LogField from '@/components/header/HeadlogField'
import Logo from '@/components/header/Logo'
import MHeaderField from '@/components/header/mHeaderField'
import NaviBar from '@/components/header/NaviBar'

export default function HeaderField() {
  return (
    <div className='w-full'>
      <nav className='flex hidden h-12 w-full items-center justify-between sm:flex'>
        <NaviBar />
        <div className='flex gap-4'>
          <LogField />
          <Logo />
        </div>
      </nav>
      <MHeaderField />
    </div>
  )
}

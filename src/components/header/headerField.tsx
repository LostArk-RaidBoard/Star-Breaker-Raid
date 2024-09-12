import LogField from '@/components/header/logField'
import Logo from '@/components/header/Logo'
import MHeaderField from '@/components/header/mHeaderField'
import NaviBar from '@/components/header/NaviBar'

export default function HeaderField() {
  return (
    <div className='w-full'>
      <nav className='flex hidden h-12 w-full items-center justify-between sm:flex'>
        <Logo />
        <NaviBar />
        <LogField />
      </nav>
      <MHeaderField />
    </div>
  )
}

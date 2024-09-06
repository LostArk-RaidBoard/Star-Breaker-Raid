import LogField from '@/components/header/logField'
import Logo from '@/components/header/Logo'
import NaviBar from '@/components/header/NaviBar'

export default function HeaderField() {
  return (
    <nav className='flex h-12 w-full items-center justify-between'>
      <Logo />
      <NaviBar />
      <LogField />
    </nav>
  )
}

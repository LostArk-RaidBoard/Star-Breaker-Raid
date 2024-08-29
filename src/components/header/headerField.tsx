import NaviBar from '@/components/header/NaviBar'

export default function HeaderField() {
  return (
    <nav className='flex h-12 w-full items-center justify-between'>
      <div className='h-12 w-24 bg-gray-400 text-white'>LOGO</div>
      <NaviBar />
      <div className='h-12 w-24 bg-gray-400 text-white'>login 관련</div>
    </nav>
  )
}

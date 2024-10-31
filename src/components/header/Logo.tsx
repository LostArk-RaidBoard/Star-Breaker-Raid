import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <div className='flex items-center text-white'>
      <Link href='/' className='relative h-[35px] w-[35px]'>
        <Image
          src={'/logo/favicon.png'}
          alt='Logo 이미지'
          fill
          sizes='(max-width: 640px) 30px, (max-width: 768px) 35px, 50px'
          className='object-contain' // 비율 유지
        ></Image>
      </Link>
    </div>
  )
}

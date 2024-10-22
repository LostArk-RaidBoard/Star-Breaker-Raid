import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <div className='flex items-center text-white'>
      <Link href='/'>
        <Image
          src={'/logo/favicon.png'}
          alt='Logo 이미지'
          width={35}
          height={35}
          style={{ width: 'auto', height: 'auto' }}
        ></Image>
      </Link>
    </div>
  )
}

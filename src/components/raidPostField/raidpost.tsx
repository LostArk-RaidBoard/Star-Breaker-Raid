import Image from 'next/image'
import Megaphone from '@image/icon/megaphone.svg'

interface Post {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  fixed: boolean
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  character_image: string
}

interface RaidPostProps {
  postData: Post
}

export default async function RaidPost({ postData }: RaidPostProps) {
  return (
    <div className='flex h-full w-full flex-col justify-center'>
      <div className='flex flex-col sm:flex-row'>
        <div className='flex basis-1/2 flex-col gap-4 p-4'>
          <span className='flex justify-center rounded-md border border-gray-500 p-2 text-xl'>
            💥 &nbsp; <span className='font-bold'>{postData.raid_name}</span> &nbsp; 💥
          </span>
          <span className='text-lg'>
            • 레이드 타입 : <span className='font-bold'>{postData.raid_type}</span>
          </span>
          <span className='text-lg'>
            • 레이드 최대 시간 : <span className='font-bold'>{postData.raid_maxtime}</span>
          </span>
          <span className='text-lg'>
            • 최소 레벨 : <span className='font-bold'>{postData.limit_level}</span>
          </span>
          <span className='text-lg'>
            • 파티 최대 정원 : <span className='font-bold'>{postData.raid_limitperson}</span>
          </span>
        </div>
        <div className='flex h-full basis-1/2 flex-col gap-4 p-4'>
          <span className='flex items-center gap-4 text-lg'>
            <Megaphone className='h-8 w-8' />
            <span className='font-bold'>{postData.character_name}</span>
          </span>
          <div className='flex h-16 items-center gap-4 overflow-hidden whitespace-nowrap rounded-md bg-gray-900 px-4 text-lg text-white'>
            <Image src={postData.character_image} alt='공대장' width={40} height={40} />
            <Image
              src={postData.character_classicon}
              alt='공대장'
              width={35}
              height={35}
              className='hidden sm:block'
            />
            <span className='overflow-hidden whitespace-nowrap'>{postData.character_name}</span>
            <span className='hidden sm:block'>{postData.character_level}</span>
          </div>
          <span className='text-lg'>
            • 공식 선생님 여부 :{' '}
            <span className='font-bold'>{postData.post_position === 'teacher' ? 'YES' : 'NO'}</span>
          </span>
          <div className='flex flex-col gap-2 text-lg'>
            • 레이드 공지
            <textarea
              rows={4}
              className='resize-none border p-1'
              disabled
              defaultValue={postData.noti}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

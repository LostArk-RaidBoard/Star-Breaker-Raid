export default function MainPost() {
  return (
    <div className='flex h-full w-full flex-row-reverse flex-col gap-4 md:flex-row'>
      <div className='h-44 w-full rounded-md bg-gray-400 shadow-lg md:h-full md:w-[19%]'>
        내 정보
      </div>
      <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[49%]'>선생님 </div>
      <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[49%]'>우리 </div>
    </div>
  )
}

export default function MainTeacherPosts() {
  return (
    <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[45%]'>
      <div className='grid grid-cols-8 rounded-t-md bg-gray-200'>
        <div className='col-span-2 flex items-center justify-center'>레이드</div>
        <div className='col-span-2 flex items-center justify-center'>선생님 캐릭터</div>
        <div className='col-span-2 flex items-center justify-center'>시간</div>
        <div className='flex items-center justify-center'>인원</div>
        <div className='flex items-center justify-center'>신청 버튼</div>
      </div>
      <div className='mt-2 flex w-full flex-col gap-3 p-1'>
        <div className='grid h-9 grid-cols-8 rounded-md border border-gray-900 bg-gray-100 p-1'>
          <div className='col-span-2 flex items-center justify-center border-r border-gray-500'>
            애키르 하드
          </div>
          <div className='col-span-2 flex items-center justify-center gap-1 border-r border-gray-500'>
            <img
              src='/classIcon/브레이커.svg'
              alt='아이콘'
              width={100}
              height={100}
              className='h-6 w-6 fill-yellow-600'
            />
            별부수기
          </div>
          <div className='col-span-2 flex items-center justify-center border-r border-gray-500'>
            금, 21:00
          </div>
          <div className='flex items-center justify-center border-r border-gray-500'>8/8</div>
          <div className='flex items-center justify-center'>
            <button className='rounded-md bg-gray-900 px-2 text-white'>신청</button>
          </div>
        </div>
      </div>
    </div>
  )
}

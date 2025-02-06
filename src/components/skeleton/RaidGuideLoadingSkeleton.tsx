export default function RaidGuideLoadingSkeleton() {
  return (
    <div className='flex animate-pulse flex-col items-center overflow-hidden rounded-xl bg-gray-400 shadow-lg'>
      {/* 이미지 영역 */}
      <div className='h-60 w-full rounded-t-xl bg-gray-400'></div>

      {/* 텍스트 영역 */}
      <div className='w-full bg-gray-500 p-3'>
        <span className='block h-5 w-3/4 rounded bg-gray-300'></span>
      </div>
    </div>
  )
}

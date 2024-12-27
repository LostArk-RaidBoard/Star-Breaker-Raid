interface Props {
  myInfoData: MyinfoFetch
}

interface MyinfoFetch {
  user_id: string
  user_name: string
  birthday: number
  nickname: string
  role: string
  applicants_count: number
  applicants_approval: number
  raid_posts_count: number
  character_count: number
}

export default async function MyInfoComponent({ myInfoData }: Props) {
  return (
    <div className='flex w-full flex-col rounded-md border border-gray-400 p-4 shadow-lg'>
      <h1 className='text-lg'>• 내 정보</h1>

      <div className='flex flex-col sm:flex-row'>
        <div className='flex flex-col text-base sm:basis-1/2'>
          <span className='mt-2'>아이디 : {myInfoData.user_id}</span>
          <span>등급 : {myInfoData.role}</span>
          <span>등록된 캐릭터 수 : {myInfoData.character_count}</span>
          <span>닉네임 : {myInfoData.nickname}</span>
        </div>
        <div className='flex flex-col text-base sm:basis-1/2'>
          <span>개설 현황 : {myInfoData.raid_posts_count}</span>
          <span>신청 현황 : {myInfoData.applicants_count}</span>
          <span>승인 수 : {myInfoData.applicants_approval}</span>
        </div>
      </div>
    </div>
  )
}

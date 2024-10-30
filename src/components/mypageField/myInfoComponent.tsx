interface Props {
  userId: string
}

interface MyinfoFetch {
  user_id: string
  user_name: string
  birthday: number
  role: string
  applicants_count: number
  applicants_approval: number
  raid_posts_count: number
  character_count: number
}

const myInfoFetch = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/mypageMyInfoGet?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (response.ok) {
      return data.postRows[0]
    } else {
      return []
    }
  } catch (error) {
    console.error('myInfoFetch 에러')
  }
  return []
}

export default async function MyInfoComponent({ userId }: Props) {
  const dataRow: MyinfoFetch = await myInfoFetch(userId)

  return (
    <div className='flex w-full flex-col rounded-md border p-4 shadow-lg'>
      <h1 className='text-lg'>• 내 정보</h1>

      <div className='flex flex-col sm:flex-row'>
        <div className='flex flex-col text-base sm:basis-1/2'>
          <span className='mt-2'>아이디 : {dataRow.user_id}</span>
          <span>등급 : {dataRow.role}</span>
          <span>등록된 캐릭터 수 : {dataRow.character_count}</span>
        </div>
        <div className='flex flex-col text-base sm:basis-1/2'>
          <span>개설 현황 : {dataRow.raid_posts_count}</span>
          <span>신청 현황 : {dataRow.applicants_count}</span>
          <span>승인 수 : {dataRow.applicants_approval}</span>
        </div>
      </div>
    </div>
  )
}

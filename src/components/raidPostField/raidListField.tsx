import RaidApplication from '@/components/raidPostField/raidApplication'
import RaidApplicationList from '@/components/raidPostField/raidApplicationList'
import RaidPost from '@/components/raidPostField/raidpost'
interface Props {
  postId: number
}

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

interface ApplicationList {
  applicants_id: number
  user_id: string
  character_name: string
  hope: string
  post_id: number
  character_image: string
  character_icon: string
  character_elixir: number
  character_transcendence: number
  character_check: boolean
  character_level: string
}

const fetchPostData = async (postId: number) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/postPagePostGet?postId=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (response.ok && response.status === 200) {
      return data.postRows[0]
    }
  } catch (error) {
    console.error('postPagePostGet: ' + error)
    return null
  }
}

const applicationGet = async (postId: number) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/applicationGet?postId=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['applicationList'] },
    })

    const data = await res.json()
    if (res.ok && res.status === 201) {
      return data.result || [] // 데이터가 없을 경우 빈 배열 반환
    } else {
      return []
    }
  } catch (error) {
    console.error('application get Error: ' + error)
  }
  return []
}

export default async function RaidListField({ postId }: Props) {
  const postData: Post = await fetchPostData(postId)
  const applicationList: ApplicationList[] = await applicationGet(postId)
  let raidLimitLevel = 0
  let post_user = ''
  if (postData) {
    raidLimitLevel = postData.limit_level
    post_user = postData.user_id
  }

  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='w-full rounded-md border shadow-lg'>
        <RaidPost postData={postData} />
      </div>
      <label className='mt-4 flex w-full justify-start'>* 지원 신청 작성</label>
      <div className='w-full'>
        <RaidApplication raidLimitLevel={raidLimitLevel} postId={postId} post_user={post_user} />
      </div>
      <label className='mt-4 flex w-full justify-start'>* 신청자</label>
      <div className='h-auto w-full'>
        <RaidApplicationList
          postId={postId}
          applicationList={applicationList}
          post_user={post_user}
        />
      </div>
    </div>
  )
}

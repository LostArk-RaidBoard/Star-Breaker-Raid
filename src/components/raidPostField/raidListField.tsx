import RaidApplication from '@/components/raidPostField/raidApplication'
import RaidApplicationList from '@/components/raidPostField/raidApplicationList'
import RaidPost from '@/components/raidPostField/raidpost'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Link from 'next/link'
import RaidPostDeleteButton from '@/components/button/raidPostDeleteButton'
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
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  character_image: string
  nickname: string
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
    if (res.ok && res.status === 200) {
      return data.result || [] // 데이터가 없을 경우 빈 배열 반환
    } else {
      console.error(res.status + data.message)
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
  const session = await getServerSession(authOptions)
  let userId = ''
  if (session && session.user.id) {
    userId = session.user.id
  }
  let raidLimitLevel = 0
  let post_user = ''
  if (postData) {
    raidLimitLevel = postData.limit_level
    post_user = postData.user_id
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      {postData ? (
        <>
          {session && session.user.id ? (
            <div className='mb-2 flex w-full items-center justify-end gap-4'>
              <RaidPostDeleteButton postId={postId} />
              <Link
                href={`/raidpost/update/${postId}`}
                className={`${(session.user.id = postData.user_id ? '' : 'hidden')} rounded-md bg-gray-900 px-3 py-1 text-white`}
              >
                수정하기
              </Link>
            </div>
          ) : (
            <></>
          )}

          <div className='w-full rounded-md border shadow-lg'>
            <RaidPost postData={postData} />
          </div>
          <label className='mt-4 flex w-full justify-start'>* 지원 신청 작성</label>
          <div className='w-full'>
            <RaidApplication
              userId={userId}
              raidLimitLevel={raidLimitLevel}
              postId={postId}
              post_user={post_user}
            />
          </div>
          <label className='mt-4 flex w-full justify-start'>* 신청자</label>
          <div className='h-auto w-full'>
            <RaidApplicationList
              postId={postId}
              applicationList={applicationList}
              post_user={post_user}
            />
          </div>
        </>
      ) : (
        <div>포스트를 찾을 수 없습니다.</div>
      )}
    </div>
  )
}

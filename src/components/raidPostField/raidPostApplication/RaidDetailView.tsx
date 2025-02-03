import RaidApplicationForm from '@/components/raidPostField/raidPostApplication/RaidApplicationForm'
import RaidApplicationPanel from '@/components/raidPostField/raidPostApplication/RaidApplicationPanel'
import PostDetails from '@/components/raidPostField/raidPostApplication/PostDetails'
import { auth } from '@/auth'
import Link from 'next/link'
import RaidPostDeleteButton from '@/components/button/raidPostDeleteButton'
import React from 'react'

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
  raid_level: string
  raid_gateway: string
}

interface ApplicationList {
  applicants_id: number
  user_id: string
  character_name: string
  hope: string
  post_id: number
  character_image: string
  character_icon: string
  elixir: number
  transcendence: number
  approval: boolean
  character_level: string
}

const fetchPostData = async (postId: number) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/raidPostAPI/postPagePostGet?postId=${postId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['wePost'] },
      },
    )
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
    const res = await fetch(
      `${process.env.API_URL}/api/applicationAPI/applicationGet?postId=${postId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['applicationList'] },
      },
    )

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

export default async function RaidDetailView({ postId }: Props) {
  const postData: Post = await fetchPostData(postId)
  const applicationList: ApplicationList[] = await applicationGet(postId)
  const session = await auth()
  let userId = ''
  if (session && session.user.id) {
    userId = session.user.id
  }
  let raidLimitLevel = 0
  let post_user = ''
  let raid_name = ''
  let raid_level = ''
  let raid_gateway = ''
  let character_name = ''
  let schedule = new Date()

  if (postData) {
    raidLimitLevel = postData.limit_level
    post_user = postData.user_id
    raid_name = postData.raid_name
    raid_level = postData.raid_level
    raid_gateway = postData.raid_gateway
    character_name = postData.character_name
    schedule = new Date(postData.raid_time)
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center sm:px-16'>
      {postData ? (
        <>
          {/* 수정 버튼 섹션 */}
          {session && session.user.id === postData.user_id && (
            <div className='mb-4 flex w-full items-center justify-end gap-4'>
              <RaidPostDeleteButton
                postId={postId}
                userId={userId}
                raidName={raid_name}
                characterName={character_name}
              />
              <Link
                href={`/raidpost/update/${postId}`}
                className='rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-600'
              >
                수정하기
              </Link>
            </div>
          )}

          {/* 포스트 상세 정보 */}

          <PostDetails postData={postData} />

          {/* 지원 신청 작성 */}
          <div className='mt-6 w-full'>
            <label className='mb-2 block text-lg font-semibold text-gray-600'>* 지원 신청</label>

            <RaidApplicationForm
              userId={userId}
              raidLimitLevel={raidLimitLevel}
              postId={postId}
              post_user={post_user}
              raid_name={raid_name}
              raid_level={raid_level}
              raid_gateway={raid_gateway}
              schedule={schedule}
            />
          </div>

          {/* 신청자 목록 */}
          <div className='mt-6 w-full'>
            <label className='mb-2 block text-lg font-semibold text-gray-600'>* 신청자</label>

            <RaidApplicationPanel
              postId={postId}
              applicationList={applicationList}
              post_user={post_user}
              raid_name={raid_name}
            />
          </div>
        </>
      ) : (
        <div className='flex min-h-screen flex-col items-center justify-center gap-6 text-center'>
          <span className='text-lg font-semibold text-gray-400'>포스트를 찾을 수 없습니다.</span>
          <Link
            href={'/raidpost'}
            className='rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-500'
          >
            모집글로 돌아가기
          </Link>
        </div>
      )}
    </div>
  )
}

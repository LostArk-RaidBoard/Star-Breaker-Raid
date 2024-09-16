import MainCharacter from '@/components/MainField/MainCharacter'
import MainTeacherPosts from '@/components/MainField/MainTeacherPost'
import MainWePosts from '@/components/MainField/MainWePosts'

export default function MainPost() {
  return (
    <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
      <MainCharacter />
      <MainTeacherPosts />
      <MainWePosts />
    </div>
  )
}

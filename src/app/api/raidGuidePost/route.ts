'use sever'
import { sql } from '@vercel/postgres'

type YoutubeUrl = {
  youtebeURL: string
}

type ImageUrl = {
  imageURL: string
}

interface Guide {
  guide_name: string
  youtube_url: YoutubeUrl[]
  image_url: ImageUrl[]
}

export async function POST(req: Request) {
  const raidGuide: Guide = await req.json()

  try {
    const response =
      await sql`INSERT INTO raid_guide (guide_name, youtube_url, image_url, role_id) VALUES (${raidGuide.guide_name}, ${JSON.stringify(raidGuide.youtube_url)}, ${JSON.stringify(raidGuide.image_url)}, 1)`
    return new Response(JSON.stringify({ message: '지원 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}

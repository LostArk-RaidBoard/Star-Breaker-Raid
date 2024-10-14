'use sever'
import { sql } from '@vercel/postgres'

interface Guide {
  guide_name: string
  youtube_url: string
  image_url: string
  raid_main_image: string
}

export async function POST(req: Request) {
  const raidGuide: Guide = await req.json()

  try {
    const response =
      await sql`INSERT INTO raid_guide (guide_name, youtube_url, image_url, role_id, raid_main_image) VALUES (${raidGuide.guide_name}, ${JSON.stringify(raidGuide.youtube_url)}, ${JSON.stringify(raidGuide.image_url)}, 1, ${raidGuide.raid_main_image})`
    return new Response(JSON.stringify({ message: '지원 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}

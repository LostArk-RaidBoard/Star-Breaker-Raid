import { sql } from '@vercel/postgres'

interface SaveCharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  class_icon_url: string
  transcendence: number
  elixir: number
  leap: number
  enlightenment: number
  evolution: number
}
export async function POST(req: Request) {
  const saveCharacterInfo: SaveCharacterInfo = await req.json()
  const {
    character_name,
    user_id,
    character_level,
    character_class,
    server_name,
    class_image,
    class_icon_url,
    transcendence,
    elixir,
    leap,
    enlightenment,
    evolution,
  } = saveCharacterInfo

  console.log(saveCharacterInfo)
  try {
    const res = await sql`SELECT * FROM characters WHERE character_name=${character_name}`

    if (res.rowCount !== 0) {
      const response =
        await sql`UPDATE characters SET character_level=${character_level}, transcendence=${transcendence}, leap=${leap}, evolution=${evolution}, enlightenment=${enlightenment}, elixir=${elixir} WHERE character_name=${character_name}`

      return new Response(JSON.stringify({ message: '업데이트가 성공했습니다.' }), { status: 201 })
    } else {
      const insertRes =
        await sql`INSERT INTO characters (character_name, user_id, character_level, character_class, server_name, class_image, class_icon_url, transcendence, elixir, leap, enlightenment, evolution) VALUES (${character_name}, ${user_id}, ${character_level}, ${character_class}, ${server_name}, ${class_image}, ${class_icon_url}, ${transcendence}, ${elixir}, ${leap}, ${enlightenment}, ${evolution})`
      return new Response(JSON.stringify({ message: '저장을 성공했습니다.' }), { status: 202 })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'DB 연결에 실패했습니다ㅏ.' }), { status: 500 })
  }
}

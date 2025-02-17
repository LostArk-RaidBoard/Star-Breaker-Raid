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

  if (!saveCharacterInfo) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }
  try {
    // DB에 캐릭터가 존재하는지 SELECT
    const res = await sql`SELECT * FROM characters WHERE character_name=${character_name}`

    // DB에 캐릭터가 존재하면 UPDATE
    if (res.rowCount !== 0) {
      await sql`UPDATE characters SET character_level=${character_level}, transcendence=${transcendence}, leap=${leap}, evolution=${evolution}, enlightenment=${enlightenment}, elixir=${elixir} WHERE character_name=${character_name}`

      return new Response(JSON.stringify({ message: '업데이트가 성공했습니다.' }), {
        status: 201,
        headers: {
          'Cache-Control': 'no-cache, must-revalidate',
        },
      })
    } else {
      // DB에 캐릭터가 없다면 INSERT
      await sql`INSERT INTO characters (character_name, user_id, character_level, character_class, server_name, class_image, class_icon_url, transcendence, elixir, leap, enlightenment, evolution) VALUES (${character_name}, ${user_id}, ${character_level}, ${character_class}, ${server_name}, ${class_image}, ${class_icon_url}, ${transcendence}, ${elixir}, ${leap}, ${enlightenment}, ${evolution})`
      await sql`INSERT INTO homework (character_name, user_id) VALUES (${character_name}, ${user_id})`
      return new Response(JSON.stringify({ message: '저장을 성공했습니다.' }), {
        status: 202,
        headers: {
          'Cache-Control': 'no-cache, must-revalidate',
        },
      })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'DB 연결에 실패했습니다ㅏ.' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }
}

import { sql } from '@vercel/postgres'

interface HomeworkData {
  user_id: string
  character_name: string
  character_level: string
  chaso_dungeon: boolean[]
  epona: boolean[]
  guardian: boolean[]
  guild: boolean[]
}
export async function PUT(req: Request) {
  const homeworkData: HomeworkData[] = await req.json()

  try {
    for (const list of homeworkData) {
      const guildArray = list.guild.map((v) => (v ? 'true' : 'false')).join(', ')
      const chasoArray = list.chaso_dungeon.map((v) => (v ? 'true' : 'false')).join(', ')
      const guardianArray = list.guardian.map((v) => (v ? 'true' : 'false')).join(', ')
      const eponaArray = list.epona.map((v) => (v ? 'true' : 'false')).join(', ')

      const query = `
        UPDATE homework
        SET 
          guild = ARRAY[${guildArray}]::BOOLEAN[], 
          chaso_dungeon = ARRAY[${chasoArray}]::BOOLEAN[], 
          guardian = ARRAY[${guardianArray}]::BOOLEAN[], 
          epona = ARRAY[${eponaArray}]::BOOLEAN[]
        WHERE 
          character_name = $1 AND 
          user_id = $2
      `

      await sql.query(query, [list.character_name, list.user_id])
    }

    return new Response(JSON.stringify({}), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}

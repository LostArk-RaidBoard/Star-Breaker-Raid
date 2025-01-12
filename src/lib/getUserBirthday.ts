export default async function getUserBirthday(accessToken: string) {
  const response = await fetch(
    `https://people.googleapis.com/v1/people/me?personFields=birthdays`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  const data = await response.json()

  // 생일 데이터를 변환하는 로직
  if (data.birthdays && data.birthdays.length > 0) {
    const birthday = data.birthdays[0].date
    const year = birthday.year.toString().padStart(4, '0')
    const month = birthday.month.toString().padStart(2, '0')
    const day = birthday.day.toString().padStart(2, '0')

    // yyyyMMdd 형식으로 변환
    const formattedBirthday = `${year}${month}${day}`

    return formattedBirthday
  }

  return null
}

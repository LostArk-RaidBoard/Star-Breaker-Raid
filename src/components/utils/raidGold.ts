export default function RaidGold(raidName: string) {
  if (raidName === '2막 아브렐슈드 하드') {
    return 30500
  }

  if (raidName === '2막 아브렐슈드 노말') {
    return 25000
  }

  if (raidName === '1막 에기르 하드') {
    return 27500
  }

  if (raidName === '1막 에기르 노말') {
    return 23000
  }

  if (raidName === '베히모스 노말') {
    return 18500
  }

  if (raidName === '서막 에키드나 하드') {
    return 18500
  }

  if (raidName === '서막 에키드나 노말') {
    return 14500
  }

  if (raidName === '카멘 하드 1~4관') {
    return 23000
  }

  if (raidName === '카멘 하드 4관') {
    return 8000
  }

  if (raidName === '카멘 하드 1~3관') {
    return 15000
  }

  if (raidName === '카멘 노말') {
    return 10000
  }

  if (raidName === '상아탑 하드') {
    return 10500
  }

  if (raidName === '상아탑 노말') {
    return 6500
  }

  if (raidName === '일리아칸 하드') {
    return 7500
  }

  if (raidName === '일리아칸 노말') {
    return 5400
  }
  if (raidName === '카양겔 하드') {
    return 4800
  }

  if (raidName === '카양겔 노말') {
    return 3600
  }

  if (raidName === '아브렐슈드 하드') {
    return 5600
  }

  if (raidName === '아브렐슈드 노말') {
    return 4600
  }

  if (raidName === '쿠크세이튼 노말') {
    return 3000
  }

  if (raidName === '비아키스 하드') {
    return 2400
  }

  if (raidName === '비아키스 노말') {
    return 1600
  }

  if (raidName === '발탄 하드') {
    return 1800
  }
  if (raidName === '발탄 노말') {
    return 1200
  }
  return 0
}

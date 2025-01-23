export default function RaidLevel(raidName: string) {
  if (raidName === '3막 모르둠') {
    return { 노말: 1680, 하드: 1700 }
  }

  if (raidName === '2막 아브렐슈드') {
    return { 노말: 1670, 하드: 1690 }
  }

  if (raidName === '1막 에기르') {
    return { 노말: 1660, 하드: 1680 }
  }

  if (raidName === '베히모스') {
    return { 노말: 1640, 하드: 1000000 }
  }

  if (raidName === '서막 에키드나') {
    return { 노말: 1620, 하드: 1640 }
  }

  if (raidName === '카멘') {
    return { 노말: 1610, 하드: 1630 }
  }

  if (raidName === '상아탑') {
    return { 노말: 1600, 하드: 1620 }
  }

  if (raidName === '일리아칸') {
    return { 노말: 1580, 하드: 1600 }
  }

  if (raidName === '카양겔') {
    return { 노말: 1540, 하드: 1580 }
  }

  if (raidName === '아브렐슈드') {
    return { 노말: 1490, 하드: 1540 }
  }

  if (raidName === '쿠크세이튼') {
    return { 노말: 1475, 하드: 1000000 }
  }

  if (raidName === '비아키스') {
    return { 노말: 1430, 하드: 1460 }
  }

  if (raidName === '발탄') {
    return { 노말: 1415, 하드: 1445 }
  }

  return { 노말: 1000000, 하드: 1000000 }
}

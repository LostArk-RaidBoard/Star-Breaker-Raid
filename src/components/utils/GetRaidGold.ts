export default function GetRaidGold(raidName: string) {
  const raidGoldMap: { [key: string]: number } = {
    // 강습
    '강습 타르칼 하드 1관문': 18000,
    '강습 타르칼 하드 1관문 더보기': -6000,

    '강습 타르칼 노말 1관문': 10000,
    '강습 타르칼 노말 1관문 더보기': -4000,

    // 3막 모르둠
    '3막 모르둠 하드 1~3관문': 38000,
    '3막 모르둠 하드 1~2관문': 18000,
    '3막 모르둠 하드 1관문': 7000,
    '3막 모르둠 하드 2관문': 11000,
    '3막 모르둠 하드 3관문': 20000,
    '3막 모르둠 하드 1관문 더보기': -2700,
    '3막 모르둠 하드 2관문 더보기': -4100,
    '3막 모르둠 하드 3관문 더보기': -5800,

    '3막 모르둠 노말 1~3관문': 28000,
    '3막 모르둠 노말 1~2관문': 15500,
    '3막 모르둠 노말 1관문': 6000,
    '3막 모르둠 노말 2관문': 9500,
    '3막 모르둠 노말 3관문': 12500,
    '3막 모르둠 노말 1관문 더보기': -2400,
    '3막 모르둠 노말 2관문 더보기': -3200,
    '3막 모르둠 노말 3관문 더보기': -4200,

    //2막 아브렐슈드
    '2막 아브렐슈드 하드 1~2관문': 30500,
    '2막 아브렐슈드 하드 1관문': 10000,
    '2막 아브렐슈드 하드 2관문': 20500,
    '2막 아브렐슈드 하드 1관문 더보기': -4500,
    '2막 아브렐슈드 하드 2관문 더보기': -7200,

    '2막 아브렐슈드 노말 1~2관문': 25000,
    '2막 아브렐슈드 노말 1관문': 8500,
    '2막 아브렐슈드 노말 2관문': 16500,
    '2막 아브렐슈드 노말 1관문 더보기': -3800,
    '2막 아브렐슈드 노말 2관문 더보기': -5600,

    // 1막 에기르
    '1막 에기르 하드 1~2관문': 27500,
    '1막 에기르 하드 1관문': 9000,
    '1막 에기르 하드 2관문': 18500,
    '1막 에기르 하드 1관문 더보기': -4100,
    '1막 에기르 하드 2관문 더보기': -6600,

    '1막 에기르 노말 1~2관문': 18000,
    '1막 에기르 노말 1관문': 5500,
    '1막 에기르 노말 2관문': 12500,
    '1막 에기르 노말 1관문 더보기': -1800,
    '1막 에기르 노말 2관문 더보기': -4200,

    // 베히모스
    '베히모스 노말 1~2관문': 11000,
    '베히모스 노말 1관문': 3500,
    '베히모스 노말 2관문': 7500,
    '베히모스 노말 1관문 더보기': -1150,
    '베히모스 노말 2관문 더보기': -2460,

    // 에키드나
    '서막 에키드나 하드 1~2관문': 11000,
    '서막 에키드나 하드 1관문': 3500,
    '서막 에키드나 하드 2관문': 7500,
    '서막 에키드나 하드 1관문 더보기': -1150,
    '서막 에키드나 하드 2관문 더보기': -2460,

    '서막 에키드나 노말 1~2관문': 9500,
    '서막 에키드나 노말 1관문': 3000,
    '서막 에키드나 노말 2관문': 6500,
    '서막 에키드나 노말 1관문 더보기': -1000,
    '서막 에키드나 노말 2관문 더보기': -2200,

    '서막 에키드나 싱글 1~2관문': 7600,
    '서막 에키드나 싱글 1관문': 2400,
    '서막 에키드나 싱글 2관문': 5200,
    '서막 에키드나 싱글 1관문 더보기': -500,
    '서막 에키드나 싱글 2관문 더보기': -1100,

    // 카멘
    '카멘 하드 1~4관문': 15500,
    '카멘 하드 1~3관문': 10000,
    '카멘 하드 1~2관문': 5500,
    '카멘 하드 1관문': 2500,
    '카멘 하드 2관문': 3000,
    '카멘 하드 3관문': 4500,
    '카멘 하드 4관문': 5500,
    '카멘 하드 1관문 더보기': -780,
    '카멘 하드 2관문 더보기': -1000,
    '카멘 하드 3관문 더보기': -1440,
    '카멘 하드 4관문 더보기': -1650,

    '카멘 노말 1~3관문': 8000,
    '카멘 노말 1~2관문': 4500,
    '카멘 노말 1관문': 2000,
    '카멘 노말 2관문': 2500,
    '카멘 노말 3관문': 3500,
    '카멘 노말 1관문 더보기': -640,
    '카멘 노말 2관문 더보기': -830,
    '카멘 노말 3관문 더보기': -1160,

    '카멘 싱글 1~3관문': 6400,
    '카멘 싱글 1~2관문': 3600,
    '카멘 싱글 1관문': 1600,
    '카멘 싱글 2관문': 2000,
    '카멘 싱글 3관문': 2800,
    '카멘 싱글 1관문 더보기': -450,
    '카멘 싱글 2관문 더보기': -550,
    '카멘 싱글 3관문 더보기': -800,

    // 상아탑
    '상아탑 하드 1~3관문': 9000,
    '상아탑 하드 1~2관문': 4250,
    '상아탑 하드 1관문': 1750,
    '상아탑 하드 2관문': 2500,
    '상아탑 하드 3관문': 4750,
    '상아탑 하드 1관문 더보기': -620,
    '상아탑 하드 2관문 더보기': -830,
    '상아탑 하드 3관문 더보기': -1550,

    '상아탑 노말 1~3관문': 6500,
    '상아탑 노말 1~2관문': 3500,
    '상아탑 노말 1관문': 1500,
    '상아탑 노말 2관문': 2000,
    '상아탑 노말 3관문': 3000,
    '상아탑 노말 1관문 더보기': -600,
    '상아탑 노말 2관문 더보기': -650,
    '상아탑 노말 3관문 더보기': -1000,

    '상아탑 싱글 1~3관문': 5200,
    '상아탑 싱글 1~2관문': 2800,
    '상아탑 싱글 1관문': 1200,
    '상아탑 싱글 2관문': 1600,
    '상아탑 싱글 3관문': 2400,
    '상아탑 싱글 1관문 더보기': -250,
    '상아탑 싱글 2관문 더보기': -350,
    '상아탑 싱글 3관문 더보기': -550,

    // 일리아칸
    '일리아칸 하드 1~3관문': 7500,
    '일리아칸 하드 1~2관문': 4000,
    '일리아칸 하드 1관문': 1500,
    '일리아칸 하드 2관문': 2500,
    '일리아칸 하드 3관문': 3500,
    '일리아칸 하드 1관문 더보기': -600,
    '일리아칸 하드 2관문 더보기': -700,
    '일리아칸 하드 3관문 더보기': -950,

    '일리아칸 노말 1~3관문': 5400,
    '일리아칸 노말 1~2관문': 2800,
    '일리아칸 노말 1관문': 1000,
    '일리아칸 노말 2관문': 1800,
    '일리아칸 노말 3관문': 2600,
    '일리아칸 노말 1관문 더보기': -450,
    '일리아칸 노말 2관문 더보기': -550,
    '일리아칸 노말 3관문 더보기': -750,

    '일리아칸 싱글 1~3관문': 4320,
    '일리아칸 싱글 1~2관문': 2240,
    '일리아칸 싱글 1관문': 800,
    '일리아칸 싱글 2관문': 1440,
    '일리아칸 싱글 3관문': 2080,
    '일리아칸 싱글 1관문 더보기': -225,
    '일리아칸 싱글 2관문 더보기': -275,
    '일리아칸 싱글 3관문 더보기': -375,

    // 카양겔
    '카양겔 하드 1~3관문': 4800,
    '카양겔 하드 1~2관문': 2600,
    '카양겔 하드 1관문': 1000,
    '카양겔 하드 2관문': 1600,
    '카양겔 하드 3관문': 2200,
    '카양겔 하드 1관문 더보기': -350,
    '카양겔 하드 2관문 더보기': -500,
    '카양겔 하드 3관문 더보기': -700,

    '카양겔 노말 1~3관문': 3600,
    '카양겔 노말 1~2관문': 2000,
    '카양겔 노말 1관문': 800,
    '카양겔 노말 2관문': 1200,
    '카양겔 노말 3관문': 1600,
    '카양겔 노말 1관문 더보기': -300,
    '카양겔 노말 2관문 더보기': -400,
    '카양겔 노말 3관문 더보기': -500,

    '카양겔 싱글 1~3관문': 2880,
    '카양겔 싱글 1~2관문': 1600,
    '카양겔 싱글 1관문': 640,
    '카양겔 싱글 2관문': 960,
    '카양겔 싱글 3관문': 1280,
    '카양겔 싱글 1관문 더보기': -200,
    '카양겔 싱글 2관문 더보기': -225,
    '카양겔 싱글 3관문 더보기': -300,

    // 아브렐슈드
    '아브렐슈드 하드 1~4관문': 5600,
    '아브렐슈드 하드 1~3관문': 3600,
    '아브렐슈드 하드 1~2관문': 2400,
    '아브렐슈드 하드 1관문': 1200,
    '아브렐슈드 하드 2관문': 1200,
    '아브렐슈드 하드 3관문': 1200,
    '아브렐슈드 하드 4관문': 2000,
    '아브렐슈드 하드 1관문 더보기': -400,
    '아브렐슈드 하드 2관문 더보기': -400,
    '아브렐슈드 하드 3관문 더보기': -500,
    '아브렐슈드 하드 4관문 더보기': -800,

    '아브렐슈드 노말 1~4관문': 4600,
    '아브렐슈드 노말 1~3관문': 3000,
    '아브렐슈드 노말 1~2관문': 2000,
    '아브렐슈드 노말 1관문': 1000,
    '아브렐슈드 노말 2관문': 1000,
    '아브렐슈드 노말 3관문': 1000,
    '아브렐슈드 노말 4관문': 1600,
    '아브렐슈드 노말 1관문 더보기': -250,
    '아브렐슈드 노말 2관문 더보기': -300,
    '아브렐슈드 노말 3관문 더보기': -400,
    '아브렐슈드 노말 4관문 더보기': -600,

    '아브렐슈드 싱글 1~4관문': 3680,
    '아브렐슈드 싱글 1~3관문': 2400,
    '아브렐슈드 싱글 1~2관문': 1600,
    '아브렐슈드 싱글 1관문': 800,
    '아브렐슈드 싱글 2관문': 800,
    '아브렐슈드 싱글 3관문': 800,
    '아브렐슈드 싱글 4관문': 1280,
    '아브렐슈드 싱글 1관문 더보기': -100,
    '아브렐슈드 싱글 2관문 더보기': -150,
    '아브렐슈드 싱글 3관문 더보기': -200,
    '아브렐슈드 싱글 4관문 더보기': -375,

    // 쿠크세이튼
    '쿠크세이튼 노말 1~3관문': 3000,
    '쿠크세이튼 노말 1~2관문': 1500,
    '쿠크세이튼 노말 1관문': 600,
    '쿠크세이튼 노말 2관문': 900,
    '쿠크세이튼 노말 3관문': 1500,
    '쿠크세이튼 노말 1관문 더보기': -300,
    '쿠크세이튼 노말 2관문 더보기': -500,
    '쿠크세이튼 노말 3관문 더보기': -700,

    '쿠크세이튼 싱글 1~3관문': 2400,
    '쿠크세이튼 싱글 1~2관문': 1200,
    '쿠크세이튼 싱글 1관문': 480,
    '쿠크세이튼 싱글 2관문': 720,
    '쿠크세이튼 싱글 3관문': 1200,
    '쿠크세이튼 싱글 1관문 더보기': -100,
    '쿠크세이튼 싱글 2관문 더보기': -150,
    '쿠크세이튼 싱글 3관문 더보기': -200,

    // 비아키스
    '비아키스 하드 1~2관문': 2400,
    '비아키스 하드 1관문': 900,
    '비아키스 하드 2관문': 1500,
    '비아키스 하드 1관문 더보기': -500,
    '비아키스 하드 2관문 더보기': -650,

    '비아키스 노말 1~2관문': 1600,
    '비아키스 노말 1관문': 600,
    '비아키스 노말 2관문': 1000,
    '비아키스 노말 1관문 더보기': -300,
    '비아키스 노말 2관문 더보기': -450,

    '비아키스 싱글 1~2관문': 1280,
    '비아키스 싱글 1관문': 480,
    '비아키스 싱글 2관문': 800,
    '비아키스 싱글 1관문 더보기': -100,
    '비아키스 싱글 2관문 더보기': -150,

    // 발탄
    '발탄 하드 1~2관문': 1800,
    '발탄 하드 1관문': 700,
    '발탄 하드 2관문': 1100,
    '발탄 하드 1관문 더보기': -450,
    '발탄 하드 2관문 더보기': -600,

    '발탄 노말 1~2관문': 1200,
    '발탄 노말 1관문': 500,
    '발탄 노말 2관문': 700,
    '발탄 노말 1관문 더보기': -300,
    '발탄 노말 2관문 더보기': -400,

    '발탄 싱글 1~2관문': 960,
    '발탄 싱글 1관문': 400,
    '발탄 싱글 2관문': 560,
    '발탄 싱글 1관문 더보기': -75,
    '발탄 싱글 2관문 더보기': -100,
  }

  return raidGoldMap[raidName] ?? 0
}

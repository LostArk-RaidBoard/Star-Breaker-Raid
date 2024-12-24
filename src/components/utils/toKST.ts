export default function toKST(date: Date) {
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000) // UTC에서 9시간을 더해 KST로 변환
  return kstDate
}

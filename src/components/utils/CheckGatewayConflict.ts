export default function CheckGatewayConflict(existingGateway: string, newGateway: string): boolean {
  const gatewayHierarchy: Record<string, number[]> = {
    '1관문': [1],
    '2관문': [2],
    '3관문': [3],
    '4관문': [4],
    '1~2관문': [1, 2],
    '1~3관문': [1, 2, 3],
    '1~4관문': [1, 2, 3, 4],
  }

  const existingNumbers = gatewayHierarchy[existingGateway] || []
  const newNumbers = gatewayHierarchy[newGateway] || []

  // 두 관문 리스트가 겹치는지 확인
  return existingNumbers.some((num) => newNumbers.includes(num))
}

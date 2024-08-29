interface IdParams {
  params: { id: string }
}

export default function Raidguide({ params: { id } }: IdParams) {
  console.log(id)
  return <div>Radigudie {id} 상세보기</div>
}

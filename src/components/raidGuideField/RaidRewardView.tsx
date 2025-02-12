import GetRaidGold from '@/components/utils/GetRaidGold'
import Image from 'next/image'
import GoldImage from '@image/asset/골드.png'
import formatNumber from '@/components/utils/FormatNumber'

type raidRewardItem = {
  reward_id: number
  guide_id: number
  gate: number
  difficulty: string
  item_name: string
  quantity: string
  image_url: string
  is_extra_reward: boolean
}

interface Props {
  raideReward: raidRewardItem[]
  raidName: string
}

export default function RaidRewardView({ raideReward, raidName }: Props) {
  const sigleReward = raideReward
    .filter((item) => item.difficulty === '싱글')
    .sort((a, b) => a.item_name.localeCompare(b.item_name))
  const normalReward = raideReward
    .filter((item) => item.difficulty === '노말')
    .sort((a, b) => a.item_name.localeCompare(b.item_name))
  const hardReward = raideReward
    .filter((item) => item.difficulty === '하드')
    .sort((a, b) => a.item_name.localeCompare(b.item_name))

  const normalGateList = Array.from(new Set(normalReward.map((item) => item.gate))).sort(
    (a, b) => a - b,
  )
  const hardGateList = Array.from(new Set(hardReward.map((item) => item.gate))).sort(
    (a, b) => a - b,
  )

  return (
    <div className='mt-4 flex flex-col'>
      {sigleReward.length > 0 && (
        <>
          <h3 className='text-lg font-bold'>싱글 레이드 보상</h3>
          <RewardTable
            raidName={raidName + ' 싱글'}
            gateList={normalGateList}
            rewards={sigleReward}
          />
        </>
      )}

      {normalReward.length > 0 && (
        <>
          <h3 className='text-lg font-bold'>노말 레이드 보상</h3>
          <RewardTable
            raidName={raidName + ' 노말'}
            gateList={normalGateList}
            rewards={normalReward}
          />
        </>
      )}

      {hardReward.length > 0 && (
        <>
          <h3 className='text-lg font-bold'>하드 레이드 보상</h3>
          <RewardTable raidName={raidName + ' 하드'} gateList={hardGateList} rewards={hardReward} />
        </>
      )}
    </div>
  )
}

function RewardTable({
  raidName,
  gateList,
  rewards,
}: {
  raidName: string
  gateList: number[]
  rewards: raidRewardItem[]
}) {
  const totalClearGold = gateList.reduce(
    (sum, gate) => sum + GetRaidGold(`${raidName} ${gate}관문`),
    0,
  )
  const totalExtraGold = gateList.reduce(
    (sum, gate) => sum + GetRaidGold(`${raidName} ${gate}관문 더보기`),
    0,
  )

  const clearRewardSummary = calculateRewardSummary(rewards.filter((item) => !item.is_extra_reward))
  const extraRewardSummary = calculateRewardSummary(rewards.filter((item) => item.is_extra_reward))

  return (
    <div className='mb-4 overflow-x-auto rounded-lg'>
      <table className='h-full w-full min-w-[1200px] table-auto border-collapse'>
        <thead>
          <tr className='bg-gray-900 text-gray-100'>
            <th className='px-2 py-2'>관문</th>
            <th className='px-2 py-2'>클리어 골드</th>
            <th className='px-2 py-2'>더보기 골드</th>
            <th className='px-2 py-2'>클리어 보상</th>
            <th className='px-2 py-2'>더보기 보상</th>
          </tr>
        </thead>
        <tbody>
          {gateList.map((gate) => {
            const clearRewards = rewards.filter(
              (item) => item.gate === gate && !item.is_extra_reward,
            )
            const extraRewards = rewards.filter(
              (item) => item.gate === gate && item.is_extra_reward,
            )

            const clearraidGold = GetRaidGold(`${raidName} ${gate}관문`)
            const extraRaidGold = GetRaidGold(`${raidName} ${gate}관문 더보기`)

            return (
              <tr key={gate} className='text-center'>
                <td className='border border-gray-300 px-2 py-2'>{gate}관문</td>
                <td className='border border-gray-300 px-2 py-2 text-center text-yellow-700'>
                  <div className='flex items-center justify-center gap-1'>
                    <Image
                      src={GoldImage}
                      alt='골드 이미지'
                      width={25}
                      height={25}
                      className='p-1'
                    />
                    {formatNumber(clearraidGold)}
                  </div>
                </td>
                <td className='border border-gray-300 px-2 py-2 text-yellow-700'>
                  <div className='flex items-center justify-center gap-1'>
                    <Image
                      src={GoldImage}
                      alt='골드 이미지'
                      width={25}
                      height={25}
                      className='p-1'
                    />
                    <span>{formatNumber(extraRaidGold)}</span>
                  </div>
                </td>
                <td className='border border-gray-300 px-2 py-2 align-top'>
                  <RewardList rewards={clearRewards} />
                </td>
                <td className='border border-gray-300 px-2 py-2 align-top'>
                  <RewardList rewards={extraRewards} />
                </td>
              </tr>
            )
          })}

          {/* 합계 행 */}
          <tr className='text-center font-bold'>
            <td className='border border-gray-300 px-2 py-2'>합계</td>
            <td className='border border-gray-300 px-2 py-2 text-yellow-700'>
              <div className='flex items-center justify-center gap-1'>
                <Image src={GoldImage} alt='골드 이미지' width={25} height={25} className='p-1' />
                {formatNumber(totalClearGold)}
              </div>
            </td>
            <td className='border border-gray-300 px-2 py-2 text-yellow-700'>
              <div className='flex items-center justify-center gap-1'>
                <Image src={GoldImage} alt='골드 이미지' width={25} height={25} className='p-1' />
                {formatNumber(totalExtraGold)}
              </div>
            </td>
            <td className='border border-gray-300 px-2 py-2'>
              <div className='grid grid-cols-3 gap-2'>
                {clearRewardSummary.map((item) => (
                  <div key={item.item_name} className='flex items-center gap-2'>
                    <Image src={item.image_url} alt={item.item_name} width={30} height={30} />
                    <div className='flex flex-col items-start'>
                      <span className='text-xs text-gray-600'>{item.item_name}</span>
                      <span className='text-xs text-gray-600'>x {item.totalQuantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className='border border-gray-300 px-2 py-2'>
              <div className='grid grid-cols-3 gap-2'>
                {extraRewardSummary.map((item) => (
                  <div key={item.item_name} className='flex items-center gap-2'>
                    <Image src={item.image_url} alt={item.item_name} width={30} height={30} />
                    <div className='flex flex-col items-start'>
                      <span className='text-xs text-gray-600'>{item.item_name}</span>
                      <span className='text-xs text-gray-600'>x {item.totalQuantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function calculateRewardSummary(rewards: raidRewardItem[]) {
  const summary = rewards.reduce(
    (acc, item) => {
      if (!acc[item.item_name]) {
        acc[item.item_name] = { totalQuantity: 0, image_url: item.image_url }
      }
      acc[item.item_name].totalQuantity += parseInt(item.quantity, 10)
      return acc
    },
    {} as Record<string, { totalQuantity: number; image_url: string }>,
  )

  return Object.entries(summary).map(([item_name, { totalQuantity, image_url }]) => ({
    item_name,
    totalQuantity,
    image_url,
  }))
}

function RewardList({ rewards }: { rewards: raidRewardItem[] }) {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {rewards.map((item) => (
        <RewardCard key={item.reward_id} item={item} />
      ))}
    </div>
  )
}

function RewardCard({ item }: { item: raidRewardItem }) {
  return (
    <div className='flex items-center gap-2'>
      <Image src={item.image_url} alt={item.item_name} width={30} height={30} className='rounded' />
      <div className='flex flex-col items-start'>
        <span className='text-xs text-gray-600'>{item.item_name}</span>
        <span className='text-xs text-gray-600'>x {item.quantity}</span>
      </div>
    </div>
  )
}

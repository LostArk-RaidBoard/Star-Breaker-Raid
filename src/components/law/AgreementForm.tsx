'use client'
import Check from '@image/icon/circlecheck.svg'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function AgreementForm() {
  const [allCheck, setAllCheck] = useState(false)
  const [privayCheck, setPrivayCheck] = useState(false)
  const [policyCheck, setPolicyCheck] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const AllCheckHandler = () => {
    if (!allCheck) {
      setAllCheck(true)
      setPrivayCheck(true)
      setPolicyCheck(true)
    }
    setAllCheck(!allCheck)
  }

  const CheckLayHandler = () => {
    if (allCheck) {
      router.push('/login/signup')
    } else {
      setMessage('이용약관, 개인정보수집 동의를 해주세요')
    }
  }

  useEffect(() => {
    if (privayCheck && policyCheck && !allCheck) {
      setAllCheck(true)
      return
    }

    if (!privayCheck || !policyCheck) {
      setAllCheck(false)
      return
    }

    if (allCheck && !privayCheck && !policyCheck) {
      setPrivayCheck(true)
      setPolicyCheck(true)
      setAllCheck(true)
      return
    }
  }, [allCheck, privayCheck, policyCheck])
  return (
    <div className='relative flex w-full flex-col items-center justify-center sm:mt-[20vh]'>
      <div className='flex w-full flex-col sm:w-[60%]'>
        <span className='flex gap-2'>
          <Check
            className={`h-8 w-8 ${allCheck ? 'text-gray-900' : 'text-gray-400'}`}
            onClick={AllCheckHandler}
          />

          <h1 className='text-lg'>전체 동의하기</h1>
        </span>
        <p className='ml-10'> 실명 인증된 아이디로 가입, 이용약관 동의를 포함합니다.</p>

        <span className='mt-4 flex flex-col gap-2 sm:flex-row'>
          <div className='flex'>
            <Check
              className={`h-8 w-8 ${policyCheck ? 'text-gray-900' : 'text-gray-400'}`}
              onClick={() => {
                setPolicyCheck(!policyCheck)
              }}
            />

            <h1 className='text-lg'>
              <span className='text-blue-500'>[필수] </span>이용약관
            </h1>
          </div>
          <Link href={'/policy'} className='ml-4 text-base text-gray-400'>
            전체 보기
          </Link>
        </span>
        <div className='ml-10 h-24 w-full overflow-scroll rounded-md border text-sm'>
          <h1 className='mb-6 text-base font-bold'>
            서비스 이용약관 (로스트아크 레이드 스케줄링 및 관리 서비스)
          </h1>

          <div className='space-y-6 text-gray-700'>
            <div>
              <h2 className='mb-2 text-base font-semibold'>제1조(목적)</h2>
              <p>
                1. 본 약관은 star-breaker-raid가 운영하는 로스트아크 관련 웹사이트
                &apos;https://star-breaker-raid.vercel.app/&apos;에서 제공하는 서비스(이하
                &apos;서비스&apos;라 합니다)를 이용함에 있어 당사자의 권리 의무 및 책임사항을
                규정하는 것을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제2조(정의)</h2>
              <p>
                1. &apos;회사&apos;라 함은, &apos;star-breaker-raid&apos;가 로스트아크 게임의 레이드
                스케줄링, 캐릭터 관리, 레이 공략 서비스를 이용자에게 제공하기 위해 운영하는 사업자를
                말합니다.
              </p>
              <p>
                2. &apos;이용자&apos;라 함은, &apos;사이트&apos;에 접속하여 본 약관에 따라
                &apos;회사&apos;가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
              </p>
              <p>
                3. &apos;회원&apos;이라 함은 &apos;회사&apos;에 개인정보를 제공하고 회원으로 등록한
                자로서, &apos;회사&apos;의 서비스를 계속하여 이용할 수 있는 자를 말합니다.
              </p>
              <p>
                4. &apos;비회원&apos;이라 함은, 회원으로 등록하지 않고, &apos;회사&apos;가 제공하는
                서비스를 이용하는 자를 말합니다.
              </p>
              <p>
                5. &apos;서비스&apos;라 함은 로스트아크 관련 레이드 스케줄링, 캐릭터 관리, 레이 공략
                등의 정보를 제공하는 것을 포함합니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제3조(약관 외 준칙)</h2>
              <p>
                본 약관에서 정하지 아니한 사항은 법령 또는 회사가 정한 서비스의 개별 약관, 운영정책
                및 규칙(이하 &apos;세부지침&apos;이라 합니다)의 규정에 따릅니다. 또한 본 약관과
                세부지침이 충돌할 경우에는 세부지침이 우선합니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제4조(약관의 명시 및 개정)</h2>
              <p>
                1. &apos;회사&apos;는 이 약관의 내용과 상호 및 대표자 성명, 전자우편 주소 등을
                이용자가 쉽게 알 수 있도록 &apos;회사&apos; 홈페이지의 초기 서비스화면에 게시합니다.
                다만 본 약관의 내용은 이용자가 연결화면을 통하여 확인할 수 있도록 할 수 있습니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제5조(제공하는 서비스)</h2>
              <p>&apos;회사&apos;는 다음의 서비스를 제공합니다:</p>
              <ul className='list-inside list-disc'>
                <li>로스트아크 레이드 스케줄링 서비스</li>
                <li>캐릭터 관리 및 정보 제공</li>
                <li>레이 공략 및 관련 정보 제공</li>
                <li>기타 &apos;회사&apos;가 정하는 서비스</li>
              </ul>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제6조(서비스의 중단 등)</h2>
              <p>
                1. &apos;회사&apos;가 제공하는 서비스는 연중무휴, 1일 24시간 제공을 원칙으로 합니다.
                다만 시스템의 유지 · 보수를 위한 점검, 통신장비의 교체 등 특별한 사유가 있는 경우
                서비스의 전부 또는 일부에 대하여 일시적인 제공 중단이 발생할 수 있습니다.
              </p>
              <p>
                2. &apos;회사&apos;는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가
                발생하거나 발생할 우려가 있는 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수
                있습니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제7조(회원가입)</h2>
              <p>
                1. &apos;회사&apos;가 정한 양식에 따라 &apos;이용자&apos;가 회원정보를 기입한 후 본
                약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
              </p>
              <p>
                2. &apos;회사&apos;는 신청한 &apos;이용자&apos; 중 다음 각호의 사유가 없는 한
                &apos;회원&apos;으로 등록합니다:
              </p>
              <ul className='list-inside list-disc'>
                <li>가입신청자가 본 약관에 따라 회원자격을 상실한 적이 있는 경우</li>
                <li>회원정보에 허위, 기재누락, 오기 등 불완전한 부분이 있는 경우</li>
                <li>
                  기타 회원으로 등록하는 것이 &apos;회사&apos;의 운영에 현저한 지장을 초래하는
                  것으로 인정되는 경우
                </li>
              </ul>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제8조(회원탈퇴 및 자격상실 등)</h2>
              <p>
                1. &apos;회원&apos;은 &apos;회사&apos;에 언제든지 탈퇴를 요청할 수 있으며,
                &apos;회사&apos;는 지체없이 회원탈퇴 요청을 처리합니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>부칙</h2>
              <p>본 약관은 2024.09.30.부터 적용합니다.</p>
            </div>
          </div>
        </div>
        <span className='mt-4 flex flex-col gap-2 sm:flex-row'>
          <div className='flex'>
            <Check
              className={`h-8 w-8 ${privayCheck ? 'text-gray-900' : 'text-gray-400'}`}
              onClick={() => {
                setPrivayCheck(!privayCheck)
              }}
            />

            <h1 className='text-lg'>
              <span className='text-blue-500'>[필수]</span> 개인정보 수집 및 이용
            </h1>
          </div>
          <Link href={'/privacy'} className='ml-4 text-base text-gray-400'>
            전체 보기
          </Link>
        </span>
        <div className='ml-10 h-24 w-full overflow-scroll rounded-md border text-sm'>
          <h1 className='mb-6 text-base font-bold'>개인정보 처리방침</h1>

          <div className='space-y-6 text-gray-700'>
            <div>
              <h2 className='mb-2 text-base font-semibold'>제1조(목적)</h2>
              <p>
                본 개인정보 처리방침은 star-breaker-raid(이하 &apos;회사&apos;)가 운영하는
                로스트아크 관련 웹사이트 &apos;https://star-breaker-raid.vercel.app/&apos;에서
                이용자의 개인정보를 보호하고, 수집된 개인정보의 이용 목적 및 관리 방침을 규정하는
                것을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제2조(수집하는 개인정보)</h2>
              <p>회사는 회원가입 시 다음과 같은 개인정보를 수집합니다:</p>
              <ul className='list-inside list-disc'>
                <li>이메일</li>
                <li>이름</li>
                <li>생년월일</li>
                <li>비밀번호</li>
              </ul>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제3조(개인정보의 이용 목적)</h2>
              <p>회사는 수집한 개인정보를 다음의 목적으로 이용합니다:</p>
              <ul className='list-inside list-disc'>
                <li>회원가입 및 관리: 사용자가 자신의 회원정보를 찾거나 수정할 때 사용합니다.</li>
                <li>
                  통계 분석: 서비스 개선 및 이용자 맞춤형 서비스 제공을 위한 통계 분석에 사용합니다.
                </li>
              </ul>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제4조(개인정보의 보유 및 이용 기간)</h2>
              <p>
                회사는 이용자의 개인정보를 수집 및 이용 목적이 달성된 후에는 즉시 파기합니다. 회원이
                탈퇴하는 경우, 모든 개인정보는 즉시 삭제됩니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제5조(개인정보의 안전성 확보 조치)</h2>
              <p>회사는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취합니다:</p>
              <ul className='list-inside list-disc'>
                <li>
                  개인정보의 암호화: 비밀번호는 암호화하여 저장하며, 이를 안전하게 관리합니다.
                </li>
                <li>
                  접근 통제: 개인정보에 대한 접근을 제한하여 권한이 없는 자의 접근을 차단합니다.
                </li>
              </ul>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제6조(이용자의 권리)</h2>
              <p>
                이용자는 언제든지 자신의 개인정보에 대한 열람, 수정, 삭제를 요구할 수 있습니다. 이를
                위해 회사에 요청하면, 즉시 처리하겠습니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제7조(개인정보 처리방침의 변경)</h2>
              <p>
                본 개인정보 처리방침은 법령이나 회사의 정책에 따라 변경될 수 있으며, 변경된 사항은
                웹사이트에 공지합니다.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-base font-semibold'>제8조(문의처)</h2>
              <p>개인정보와 관련한 문의사항은 아래의 연락처로 문의하시기 바랍니다:</p>
              <ul className='list-inside list-disc'>
                <li>이메일: [wjd15sheep@gmail.com]</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <span className='mt-4 text-red-500'>{message}</span>
      <div className='flex items-center justify-center gap-4'>
        <Link
          href={'/login'}
          className='mt-4 flex h-12 w-24 items-center justify-center rounded-md bg-gray-900 text-white'
        >
          뒤로가기
        </Link>
        <button
          className='mt-4 flex h-12 w-24 items-center justify-center rounded-md bg-gray-900 text-white'
          onClick={CheckLayHandler}
        >
          다음
        </button>
      </div>
    </div>
  )
}

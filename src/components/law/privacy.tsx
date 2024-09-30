'use client'
import React from 'react'

export default function Privacy() {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mx-auto max-w-4xl rounded-md bg-white p-8 shadow-md'>
        <h1 className='mb-6 text-3xl font-bold'>개인정보 처리방침</h1>

        <div className='space-y-6 text-gray-700'>
          <div>
            <h2 className='mb-2 text-lg font-semibold'>제1조(목적)</h2>
            <p>
              본 개인정보 처리방침은 star-breaker-raid(이하 &apos;회사&apos;)가 운영하는 로스트아크
              관련 웹사이트 &apos;https://star-breaker-raid.vercel.app/&apos;에서 이용자의
              개인정보를 보호하고, 수집된 개인정보의 이용 목적 및 관리 방침을 규정하는 것을 목적으로
              합니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제2조(수집하는 개인정보)</h2>
            <p>회사는 회원가입 시 다음과 같은 개인정보를 수집합니다:</p>
            <ul className='list-inside list-disc'>
              <li>이메일</li>
              <li>이름</li>
              <li>생년월일</li>
              <li>비밀번호</li>
            </ul>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제3조(개인정보의 이용 목적)</h2>
            <p>회사는 수집한 개인정보를 다음의 목적으로 이용합니다:</p>
            <ul className='list-inside list-disc'>
              <li>회원가입 및 관리: 사용자가 자신의 회원정보를 찾거나 수정할 때 사용합니다.</li>
              <li>
                통계 분석: 서비스 개선 및 이용자 맞춤형 서비스 제공을 위한 통계 분석에 사용합니다.
              </li>
            </ul>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제4조(개인정보의 보유 및 이용 기간)</h2>
            <p>
              회사는 이용자의 개인정보를 수집 및 이용 목적이 달성된 후에는 즉시 파기합니다. 회원이
              탈퇴하는 경우, 모든 개인정보는 즉시 삭제됩니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제5조(개인정보의 안전성 확보 조치)</h2>
            <p>회사는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취합니다:</p>
            <ul className='list-inside list-disc'>
              <li>개인정보의 암호화: 비밀번호는 암호화하여 저장하며, 이를 안전하게 관리합니다.</li>
              <li>
                접근 통제: 개인정보에 대한 접근을 제한하여 권한이 없는 자의 접근을 차단합니다.
              </li>
            </ul>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제6조(이용자의 권리)</h2>
            <p>
              이용자는 언제든지 자신의 개인정보에 대한 열람, 수정, 삭제를 요구할 수 있습니다. 이를
              위해 회사에 요청하면, 즉시 처리하겠습니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제7조(개인정보 처리방침의 변경)</h2>
            <p>
              본 개인정보 처리방침은 법령이나 회사의 정책에 따라 변경될 수 있으며, 변경된 사항은
              웹사이트에 공지합니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제8조(문의처)</h2>
            <p>개인정보와 관련한 문의사항은 아래의 연락처로 문의하시기 바랍니다:</p>
            <ul className='list-inside list-disc'>
              <li>이메일: [wjd15sheep@gmail.com]</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <button
          onClick={handleBack}
          className='w-[100px] rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-600'
        >
          뒤로가기
        </button>
      </div>
    </div>
  )
}

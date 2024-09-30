'use client'
import React from 'react'

export default function Policy() {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mx-auto max-w-4xl rounded-md bg-white p-8 shadow-md'>
        <h1 className='mb-6 text-3xl font-bold'>
          서비스 이용약관 (로스트아크 레이드 스케줄링 및 관리 서비스)
        </h1>

        <div className='space-y-6 text-gray-700'>
          <div>
            <h2 className='mb-2 text-lg font-semibold'>제1조(목적)</h2>
            <p>
              1. 본 약관은 star-breaker-raid가 운영하는 로스트아크 관련 웹사이트
              &apos;https://star-breaker-raid.vercel.app/&apos;에서 제공하는 서비스(이하
              &apos;서비스&apos;라 합니다)를 이용함에 있어 당사자의 권리 의무 및 책임사항을 규정하는
              것을 목적으로 합니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제2조(정의)</h2>
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
            <h2 className='mb-2 text-lg font-semibold'>제3조(약관 외 준칙)</h2>
            <p>
              본 약관에서 정하지 아니한 사항은 법령 또는 회사가 정한 서비스의 개별 약관, 운영정책 및
              규칙(이하 &apos;세부지침&apos;이라 합니다)의 규정에 따릅니다. 또한 본 약관과
              세부지침이 충돌할 경우에는 세부지침이 우선합니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제4조(약관의 명시 및 개정)</h2>
            <p>
              1. &apos;회사&apos;는 이 약관의 내용과 상호 및 대표자 성명, 전자우편 주소 등을
              이용자가 쉽게 알 수 있도록 &apos;회사&apos; 홈페이지의 초기 서비스화면에 게시합니다.
              다만 본 약관의 내용은 이용자가 연결화면을 통하여 확인할 수 있도록 할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제5조(제공하는 서비스)</h2>
            <p>&apos;회사&apos;는 다음의 서비스를 제공합니다:</p>
            <ul className='list-inside list-disc'>
              <li>로스트아크 레이드 스케줄링 서비스</li>
              <li>캐릭터 관리 및 정보 제공</li>
              <li>레이 공략 및 관련 정보 제공</li>
              <li>기타 &apos;회사&apos;가 정하는 서비스</li>
            </ul>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제6조(서비스의 중단 등)</h2>
            <p>
              1. &apos;회사&apos;가 제공하는 서비스는 연중무휴, 1일 24시간 제공을 원칙으로 합니다.
              다만 시스템의 유지 · 보수를 위한 점검, 통신장비의 교체 등 특별한 사유가 있는 경우
              서비스의 전부 또는 일부에 대하여 일시적인 제공 중단이 발생할 수 있습니다.
            </p>
            <p>
              2. &apos;회사&apos;는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나
              발생할 우려가 있는 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제7조(회원가입)</h2>
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
                기타 회원으로 등록하는 것이 &apos;회사&apos;의 운영에 현저한 지장을 초래하는 것으로
                인정되는 경우
              </li>
            </ul>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>제8조(회원탈퇴 및 자격상실 등)</h2>
            <p>
              1. &apos;회원&apos;은 &apos;회사&apos;에 언제든지 탈퇴를 요청할 수 있으며,
              &apos;회사&apos;는 지체없이 회원탈퇴 요청을 처리합니다.
            </p>
          </div>

          <div>
            <h2 className='mb-2 text-lg font-semibold'>부칙</h2>
            <p>본 약관은 2024.09.30.부터 적용합니다.</p>
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

'use client'

import { ko } from 'date-fns/locale/ko'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './calendar.module.css'
import React from 'react'
import { setHours, setMinutes, nextDay, addWeeks } from 'date-fns'

interface Props {
  updateTime: Date
  setUpdateTime: (time: Date) => void
}

export default function RaidUpdateCalendarPick({ updateTime, setUpdateTime }: Props) {
  const today = new Date()

  // 4주 후 수요일 오전 5시로 maxTime 설정
  const fourWeeksLaterWednesday = nextDay(addWeeks(today, 4), 3) // 4주 후 수요일
  const maxTime = setHours(setMinutes(fourWeeksLaterWednesday, 0), 6) // 6시 0분으로 설정

  // 현재 시간을 기준으로 minTime 설정
  const minTimeToday = setHours(setMinutes(new Date(), 0), today.getHours()) // 현재 시간의 0분
  const minDefaultTime = setHours(setMinutes(new Date(), 0), 0) // 자정

  return (
    <div className='p-4'>
      <h2 className='mb-2 text-lg font-semibold text-gray-900'>날짜 및 시간 선택</h2>
      <div className='flex w-full flex-col'>
        {/* 레이블 추가 */}
        <div className='mt-1 h-full w-full'>
          {/* 날짜 선택기의 최대 너비 설정 */}
          <DatePicker
            id='raidDate' // label과 연결하기 위한 id 추가
            selected={updateTime}
            onChange={(date) => {
              if (date) {
                setUpdateTime(date)
              }
            }}
            locale={ko}
            minDate={today}
            maxDate={fourWeeksLaterWednesday}
            minTime={
              updateTime && updateTime.toDateString() === today.toDateString()
                ? minTimeToday // 오늘이라면 현재 시간 이후로 선택
                : minDefaultTime // 다른 날이라면 자정부터 선택 가능
            }
            maxTime={
              updateTime && updateTime.toDateString() === fourWeeksLaterWednesday.toDateString()
                ? maxTime // 다음주 수요일이면 오전 5시까지
                : setHours(setMinutes(new Date(), 59), 23) // 다른 날은 자정까지
            }
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat='EEEE, HH시 mm분 yyyy. MM.dd'
            className={styles.datePicker} // CSS 모듈 클래스 적용
            wrapperClassName={styles.datePickerWrapper} // wrapper 클래스 추가
          />
        </div>
      </div>
    </div>
  )
}

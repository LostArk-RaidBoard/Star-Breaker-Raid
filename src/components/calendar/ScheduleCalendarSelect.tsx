import { ko } from 'date-fns/locale/ko'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './calendar.module.css'
import { useRaidSelect } from '@/store/raidSelectStore'
import { setHours, setMinutes, subDays, addDays } from 'date-fns'
import React from 'react'

export default function ScheduleCalendarSelect() {
  const { raidDate, setRaidDate } = useRaidSelect()
  const today = new Date()
  const todayDay = today.getDay() // 오늘의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

  // 기준이 되는 수요일 계산
  const baseWednesday =
    todayDay >= 3
      ? subDays(today, todayDay - 3) // 이번 주 수요일
      : subDays(today, todayDay + 4) // 지난 주 수요일

  const nextTuesday = addDays(baseWednesday, 6) // 다음 주 화요일

  // 선택 가능한 날짜 범위 설정
  const minDate = baseWednesday
  const maxDate = nextTuesday

  const minTime = setHours(setMinutes(baseWednesday, 0), 0) // 기본 minTime
  const maxTime = setHours(setMinutes(nextTuesday, 59), 23) // 기본 maxTime

  return (
    <div className='flex w-full flex-col p-4'>
      <h2 className='mb-1 text-base font-semibold text-gray-900'>날짜 선정</h2>
      <div className='h-full w-full'>
        <DatePicker
          id='raidDate'
          selected={raidDate}
          onChange={(date) => {
            if (date) {
              setRaidDate(date)
            }
          }}
          locale={ko}
          minDate={minDate}
          maxDate={maxDate}
          minTime={minTime}
          maxTime={maxTime}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          timeCaption='time'
          dateFormat='yyyy. MM.dd EEEE HH시 mm분'
          className={styles.datePicker}
          wrapperClassName={styles.datePickerWrapper}
        />
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { ko } from 'date-fns/locale/ko'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './calendar.module.css'

export default function CalendarPick() {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <div className='flex w-full flex-col'>
      <label className='text-lg'>날짜 선정</label>
      <div className='mt-1 h-full w-full'>
        {/* 날짜 선택기의 최대 너비 설정 */}
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          locale={ko}
          minDate={new Date()}
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
  )
}

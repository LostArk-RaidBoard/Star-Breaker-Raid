'use client'
import RightArrow from '@image/icon/right.svg'
import LeftArrow from '@image/icon/left.svg'
import React from 'react'
import { usePageinationSub } from '@/store/pageinationSubStore'

export default function PaginationSub() {
  const { dataLength, itemsPerPage, currentPage, setCurrentPage } = usePageinationSub()
  const totalPages = Math.ceil(dataLength / itemsPerPage)
  const startPage = Math.max(currentPage - 2, 1)
  const endPage = Math.min(startPage + 4, totalPages)

  const paginate = (pageNumber: number) => {
    if (pageNumber > totalPages) {
      setCurrentPage(totalPages)
    } else if (pageNumber < 1) {
      setCurrentPage(1)
    } else {
      setCurrentPage(pageNumber)
    }
  }
  return (
    <>
      {dataLength > itemsPerPage && (
        <div className='z-0 flex justify-center'>
          <ul className='pagination flex items-center'>
            {currentPage > 1 && (
              <>
                <li
                  className='cursor-pointer items-center px-1'
                  onClick={() => paginate(currentPage - 1)}
                >
                  <LeftArrow />
                </li>
              </>
            )}
            {Array(endPage - startPage + 1)
              .fill(0)
              .map((_, i) => (
                <li
                  key={i}
                  className={`mx-1 cursor-pointer px-1 ${
                    currentPage === startPage + i ? 'rounded-full' : ''
                  }`}
                  onClick={() => paginate(startPage + i)}
                >
                  {startPage + i}
                </li>
              ))}
            {currentPage < totalPages && (
              <>
                <li
                  className='cursor-pointer items-center px-1'
                  onClick={() => paginate(currentPage + 1)}
                >
                  <RightArrow />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  )
}

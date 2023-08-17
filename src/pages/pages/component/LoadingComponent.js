import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'

const LoadingComponent = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!show) {
    return null
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed', // ติดตรงกลางหน้าจอ
        background: 'rgba(0, 0, 0, 0.5)', // สีพื้นหลังทึบ
        top: 0,
        left: 0,
        zIndex: 9999 // ให้แสดงหน้าทับทุกอย่าง
      }}
    >
      <img
        height='150'
        src='https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif'
        alt='Loading...'
      />
    </Box>
  )
}

export default LoadingComponent

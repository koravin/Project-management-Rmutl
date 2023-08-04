import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTransition, animated } from 'react-spring'

export default function BeatCabill() {
  const [showSubContent, setShowSubContent] = useState(false)

  const handleMainContentButtonClick = () => {
    setShowSubContent(!showSubContent)
  }

  const transitions = useTransition(showSubContent, {
    from: { opacity: 0, height: 0, marginTop: 0 },
    enter: { opacity: 1, height: 'auto', marginTop: 10 },
    leave: { opacity: 0, height: 0, marginTop: 0 }
  })

  return (
    <Box sx={{ display: 'flex' }}>
      {' '}
      {/* เพิ่ม margin ที่นี่ */}
      {/* Main Content */}
      <Card
        sx={{
          border: 0,
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
          color: 'common.white',
          backgroundColor: '#ff7961',
          borderRadius: 3,
          width: '30%',
          mr: 3
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
            <img
              src='https://takaneko.fans/wp-content/uploads/2023/05/momona.1012-Cl_S8m1pImk-1.webp'
              alt='BeatCabill'
              style={{ width: '80%', height: 'auto', borderRadius: '5px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' color='primary' onClick={handleMainContentButtonClick}>
              คนน่ารัก
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* Sub Content */}
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                ...styles,
                position: 'relative',
                overflow: 'hidden',
                width: '30%'
              }}
            >
              <Card
                sx={{
                  border: 0,
                  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
                  color: 'common.white',
                  backgroundColor: '#ff7961',
                  borderRadius: 3,
                  width: '100%'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                    <video controls style={{ width: '80%', borderRadius: '5px' }}>
                      <source src='https://twitter.com/i/status/1683072910846758913' type='video' />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' color='primary'>
                      คนน่ารัก
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </animated.div>
          )
      )}
    </Box>
  )
}

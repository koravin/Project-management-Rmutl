import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTransition, animated } from 'react-spring'

export default function BeatCabill() {
  const [showSubContent, setShowSubContent] = useState(false)
  const [showSubContent02, setShowSubContent02] = useState(false)

  const handleMainContentButtonClick = () => {
    setShowSubContent(!showSubContent)
    setShowSubContent02(false)
  }

  const handleSubContentButtonClick = () => {
    setShowSubContent(false)
    setShowSubContent02(!showSubContent02)
  }

  const transitions = useTransition(showSubContent || showSubContent02, {
    from: { opacity: 0, height: 0, marginTop: 0 },
    enter: { opacity: 1, height: 'auto', marginTop: 10 },
    leave: { opacity: 0, height: 0, marginTop: 0 }
  })

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Main Content */}
      <Card
        sx={{
          border: 0,
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
          color: 'common.white',
          backgroundColor: 'white',
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
      {showSubContent && (
        <animated.div
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '30%',
            opacity: showSubContent ? 1 : 0,
            height: showSubContent ? 'auto' : 0,
            marginTop: showSubContent ? 10 : 0
          }}
        >
          <Card
            sx={{
              border: 0,
              color: 'common.white',
              backgroundColor: 'white',
              borderRadius: 3,
              width: '100%'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                <img
                  src='https://media.tenor.com/UEEu1xu58HgAAAAC/matsumoto-momona-takane-no-nadeshiko.gif'
                  alt='BeatCabill'
                  style={{ width: '80%', height: 'auto', borderRadius: '5px' }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' color='primary' onClick={handleSubContentButtonClick}>
                  เอาจัยไปเรย
                </Button>
              </Box>
            </CardContent>
          </Card>
        </animated.div>
      )}

      {/* Sub Conten02 */}
      {showSubContent02 && (
        <animated.div
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '30%',
            opacity: showSubContent02 ? 1 : 0,
            height: showSubContent02 ? 'auto' : 0,
            marginTop: showSubContent02 ? 10 : 0
          }}
        >
          <Card
            sx={{
              border: 0,
              color: 'common.white',
              backgroundColor: 'white',
              borderRadius: 3,
              width: '100%'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                <img
                  src='https://media.tenor.com/AFNwQm7a0igAAAAC/matsumoto-momona-takane-no-nadeshiko.gif'
                  alt='BeatCabill'
                  style={{ width: '80%', height: 'auto', borderRadius: '5px' }}
                />
              </Box>
            </CardContent>
          </Card>
        </animated.div>
      )}
    </Box>
  )
}

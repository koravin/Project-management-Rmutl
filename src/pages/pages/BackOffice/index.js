import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const MainMenu = () => {
  const router = useRouter() // router สร้าง path
  const [hoveredCard, setHoveredCard] = useState(null)

  const handleCardHover = index => {
    setHoveredCard(index)
  }

  const handleCardLeave = () => {
    setHoveredCard(null)
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent='center'
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '10px',
        marginTop: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
      }}
    >
      <Grid item xs={12} sx={{ paddingBottom: 4, m: 5 }}>
        <Typography variant='h5'>กรุณาเลือกระบบ</Typography>
      </Grid>
      {/*-------------------------------------Contain 01----------------------------------*/}
      <Grid item xs={12} sm={6} md={4} style={{ marginLeft: '1.5rem', marginRight: '1.5rem', marginBottom: '10vh' }}>
        <Card
          sx={{
            position: 'relative',
            ...(hoveredCard === 0 && { boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)' })
          }}
          onMouseEnter={() => handleCardHover(0)}
          onMouseLeave={handleCardLeave}
        >
          <CardMedia
            component='img'
            sx={{ height: '16rem' }}
            image='https://sm.pcmag.com/pcmag_au/guide/t/the-best-p/the-best-project-management-software-for-2023_16v6.jpg'
            alt='glass-house'
          />
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              ระบบจัดการและบริหารวิชาโปรเจค
            </Typography>
            <Typography variant='body2'>
              <Button
                variant='contained'
                onClick={function () {
                  router.push(`/pages/BackOffice/ProjectMenu/`)
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/*-------------------------------------Contain 02----------------------------------*/}
      <Grid item xs={12} sm={6} md={4} style={{ marginLeft: '1.5rem', marginRight: '1.5rem', marginBottom: '10vh' }}>
        <Card
          sx={{
            position: 'relative',
            ...(hoveredCard === 1 && { boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)' })
          }}
          onMouseEnter={() => handleCardHover(1)}
          onMouseLeave={handleCardLeave}
        >
          <CardMedia
            component='img'
            sx={{ height: '16rem' }}
            image='https://www.elegantthemes.com/blog/wp-content/uploads/2020/06/best-project-management-platforms-featured-image-scaled.jpg'
            alt='glass-house'
          />
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              ระบบติดตามการดำเนินงาน
            </Typography>
            <Typography variant='body2'>
              <Button
                variant='contained'
                onClick={function () {
                  router.push(`/pages/BackOffice/ProjectMenu/`)
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MainMenu

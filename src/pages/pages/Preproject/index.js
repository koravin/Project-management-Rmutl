import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const MainMenu = () => {
  const router = useRouter() // router สร้าง path

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Character Select</Typography>
      </Grid>

      {/* contain 01 */}
      <Grid item xs={12} sm={6} md={2.5}>
        <Card sx={{ maxWidth: 200 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='150'
              image='https://24.media.tumblr.com/05049ac35f88fa4844273f300c3c9b9a/tumblr_n1a2euWyTF1sfso7wo1_400.gif'
              alt='Instructor'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                อาจารย์ผู้สอน
              </Typography>
              <Button
                variant='contained'
                onClick={function () {
                  router.push(`http://localhost:3000/pages/Preproject/InstructorMenu/`)
                }}
              >
                เลือกตัวละคร
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      {/* contain 02 */}
      <Grid item xs={12} sm={6} md={2.5}>
        <Card sx={{ maxWidth: 200 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='150'
              image='https://custom-doodle.com/wp-content/uploads/doodle/swole-doge-hits-the-ground-meme/swole-doge-hits-the-ground-meme-doodle.gif'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                อาจารย์ทั่วไป
              </Typography>
              <Button
                variant='contained'
                onClick={function () {
                  router.push(`#`)
                }}
              >
                เลือกตัวละคร
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      {/* contain 03 */}
      <Grid item xs={12} sm={6} md={2.5}>
        <Card sx={{ maxWidth: 200 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='150'
              image='https://media.tenor.com/8Ly-VdB52IoAAAAd/shiba-sad.gif'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                นักศึกษา
              </Typography>
              <Button
                variant='contained'
                onClick={function () {
                  router.push(`#`)
                }}
              >
                เลือกตัวละคร
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MainMenu

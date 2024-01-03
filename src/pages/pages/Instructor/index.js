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
        <Typography variant='h5'>Instructor Menu</Typography>
      </Grid>

      {/* contain 01 */}
      <Grid item xs={12} sm={6} md={2.5}>
        <Card sx={{ maxWidth: 200 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='150'
              image='https://t4.ftcdn.net/jpg/02/39/06/85/360_F_239068579_8FQK3K7Bs9235z7pP96nZCkkOR5nB5g9.jpg'
              alt='Instructor'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Section
              </Typography>
              <Button
                variant='contained'
                onClick={function () {
                  router.push(`${process.env.NEXT_PUBLIC_Router}pages/Instructor/Section_Mg/`)
                }}
              >
                open
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
              image='https://cdn5.vectorstock.com/i/1000x1000/67/34/teacher-icon-vector-23946734.jpg'
              alt='Teacher'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Form Upload
              </Typography>
              <Button
                variant='contained'
                onClick={function () {
                  router.push(`${process.env.NEXT_PUBLIC_Router}pages/Instructor/Templat_Upload/`)
                }}
              >
                open
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
              image='https://logowik.com/content/uploads/images/810_student.jpg'
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

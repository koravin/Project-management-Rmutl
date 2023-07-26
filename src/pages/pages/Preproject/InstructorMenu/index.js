import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const TeacherMenu = () => {
  const router = useRouter() // router สร้าง path

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Menu Select</Typography>
      </Grid>

      {/* contain 01 */}
      <Grid item xs={12} sm={6} md={2.5}>
        <Card sx={{ maxWidth: 350, maxHeight: 220 }}>
          <CardActionArea
            onClick={() =>
              router.push(`http://localhost:3000/pages/Preproject/InstructorMenu/PreprojectInstructorManage/`)
            }
          >
            <CardMedia
              component='img'
              style={{ padding: '25px', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              image='https://cdn-icons-png.flaticon.com/512/4946/4946348.png'
              alt='InstructorMenu'
            />
          </CardActionArea>
        </Card>
        <Typography variant='body2' sx={{ mt: 2, fontSize: 16, fontWeight: 'bold' }} align='center'>
          Display All Project
        </Typography>
      </Grid>

      {/* contain 02 */}
      <Grid item xs={12} sm={6} md={2.5}>
        <Card sx={{ maxWidth: 350, maxHeight: 220 }}>
          <CardActionArea onClick={() => router.push(`#1`)}>
            <CardMedia
              component='img'
              style={{ padding: '25px', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              image='https://icons.veryicon.com/png/o/miscellaneous/basic-icon-1/unknown-18.png'
              alt='InstructorMenu'
            />
          </CardActionArea>
        </Card>
        <Typography variant='body2' sx={{ mt: 2, fontSize: 16, fontWeight: 'bold' }} align='center'>
          Unknow Function
        </Typography>
      </Grid>

      {/* contain 03 */}
      <Grid item xs={12} sm={6} md={2.5}>
        <Card sx={{ maxWidth: 350, maxHeight: 220 }}>
          <CardActionArea onClick={() => router.push(`#1`)}>
            <CardMedia
              component='img'
              style={{ padding: '25px', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              image='https://icons.veryicon.com/png/o/miscellaneous/basic-icon-1/unknown-18.png'
              alt='InstructorMenu'
            />
          </CardActionArea>
        </Card>
        <Typography variant='body2' sx={{ mt: 2, fontSize: 16, fontWeight: 'bold' }} align='center'>
          Unknow Function
        </Typography>
      </Grid>
    </Grid>
  )
}

export default TeacherMenu

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'

const BackOffice = () => {
  const router = useRouter() // router สร้าง path
  // ** State
  const [value, setValue] = useState('1')
  const [value2, setValue2] = useState('3')

  const handleChange1 = (event, newValue) => {
    setValue(newValue)
  }

  const handleChange2 = (event, newValue) => {
    setValue2(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mt: 5 }}>
        <Typography variant='h5'>เลือกตาราง</Typography>
      </Grid>
      {/* การ์ด 1 */}
      <Grid item xs={12} md={6}>
        <Card>
          <TabContext value={value}>
            <TabList centered onChange={handleChange1} aria-label='card navigation example'>
              <Tab value='1' label='Pre Project' />
              <Tab value='2' label='Project' />
            </TabList>
            <CardContent sx={{ textAlign: 'center' }}>
              <TabPanel value='1' sx={{ p: 0 }}>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                  Pre-project Table
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
                  <CardMedia
                    component='img'
                    sx={{ height: '10rem', width: '10rem' }}
                    image='https://cdn-icons-png.flaticon.com/512/1087/1087815.png'
                    alt='glass-house'
                  />
                </Typography>
                <Button
                  variant='contained'
                  onClick={function () {
                    router.push(`/pages/BackOffice/DisplayPreProject/`)
                  }}
                >
                  Select
                </Button>
              </TabPanel>
              <TabPanel value='2' sx={{ p: 0 }}>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                  Project Table
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
                  <CardMedia
                    component='img'
                    sx={{ height: '10rem', width: '10rem' }}
                    image='https://cdn-icons-png.flaticon.com/512/2683/2683272.png'
                    alt='glass-house'
                  />
                </Typography>
                <Button
                  variant='contained'
                  onClick={function () {
                    router.push(`/pages/BackOffice/DisplayProject/`)
                  }}
                >
                  Select
                </Button>
              </TabPanel>
            </CardContent>
          </TabContext>
        </Card>
      </Grid>
      {/* จบ การ์ด 1 */}

      {/* การ์ด 2 */}
      <Grid item xs={12} md={6}>
        <Card>
          <TabContext value={value2}>
            <TabList centered onChange={handleChange2} aria-label='card navigation example'>
              <Tab value='3' label='Contain 01' />
              <Tab value='4' label='Contain 02' />
            </TabList>
            <CardContent sx={{ textAlign: 'center' }}>
              <TabPanel value='3' sx={{ p: 0 }}>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                  Contain 01
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
                  <CardMedia
                    component='img'
                    sx={{ height: '10rem', width: '10rem' }}
                    image='https://cdn-icons-png.flaticon.com/512/1048/1048950.png'
                    alt='glass-house'
                  />
                </Typography>
                <Button variant='contained'>Button One</Button>
              </TabPanel>
              <TabPanel value='4' sx={{ p: 0 }}>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                  Contain 02
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
                  <CardMedia
                    component='img'
                    sx={{ height: '10rem', width: '10rem' }}
                    image='https://cdn-icons-png.flaticon.com/512/354/354637.png'
                    alt='glass-house'
                  />
                </Typography>
                <Button variant='contained'>Button Two</Button>
              </TabPanel>
            </CardContent>
          </TabContext>
        </Card>
      </Grid>
      {/* จบ การ์ด 2 */}
    </Grid>
  )
}

export default BackOffice

// ** React Imports
import * as React from 'react'
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
import { AddCircle, Edit, Delete, Visibility, Settings } from '@mui/icons-material'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'

// Component Import
import DisplayPreProject from './DisplayPreProject'
import DisplayProject from './DisplayProject'

const BackOffice = () => {
  const router = useRouter() // router สร้าง path
  // ** Tab Control
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>ระบบหลังบ้าน</Typography>
      </Grid>

      {/* Header card */}
      <Grid style={{ width: '100%', marginBottom: '25px' }}>
        <Card
          style={{
            borderRadius: '20px',
            margin: 0,
            padding: 0,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #00BFFF 80%, #1E90FF 100%)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '10px',
              borderRadius: '20px',
              margin: 0,
              padding: 0
            }}
          >
            <Settings
              style={{
                fontSize: '2.5rem',
                marginTop: '21px',
                marginLeft: '20px',
                backgroundColor: '#28c7fc',
                borderRadius: '10px',
                padding: '5px',
                color: 'white'
              }}
            />
            <CardHeader
              title={<span style={{ color: 'white' }}>CE-Reform</span>}
              subheader={
                <Typography variant='body2'>
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary', color: 'white' }}>
                    Project-MGT
                  </Box>
                  <br />
                  <Box component='span' sx={{ fontWeight: 600, color: 'white' }}>
                    Rmutl
                  </Box>
                </Typography>
              }
            />
          </div>

          <CardHeader
            title={<span style={{ color: 'white' }}>ตารางจัดการวิชาเตรียมโครงการ และ โครงการ</span>}
            subheader={
              <Typography variant='body2'>
                <Box component='span' sx={{ fontWeight: 600, color: 'white' }}>
                  2 ตารางในระบบ
                </Box>
              </Typography>
            }
          />
        </Card>
      </Grid>
      {/* Header card */}

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='วิชาเตรียมโครงการ' value='1' />
              <Tab label='วิชาโครงการ' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <DisplayPreProject />
          </TabPanel>
          <TabPanel value='2'>
            <DisplayProject />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  )
}

export default BackOffice

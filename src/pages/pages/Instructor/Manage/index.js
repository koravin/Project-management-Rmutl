import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// mui import
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { AddCircle, Edit, Delete, Visibility, Settings } from '@mui/icons-material'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import Active_Section from './Active_Section'
import Unactive_Section from './Unactive_Section'

const Manage = () => {
  const router = useRouter() // router สร้าง path

  // รับค่าข้อมูล Api
  // const [sectionData, setSectionData] = useState([])

  // Tab panel control
  const [value, setValue] = React.useState('1')

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>จัดการโครงงานในเช็คชัน</Typography>
      </Grid>

      {/* Header card */}
      <Grid style={{ width: '100%' }}>
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
            <Visibility
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
                  <Box component='span' sx={{ fontWeight: 600, color: 'white' }}>
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
            title={<span style={{ color: 'white' }}>เช็คชันทั้งหมด</span>}
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

      <Box sx={{ width: '100%', typography: 'body1', mt: 10 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
              <Tab label='เช็คชันที่เปิด' value='1' />
              <Tab label='เช็คชันที่ปิด' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            {/*  content 01 */}
            <Active_Section />
          </TabPanel>
          <TabPanel value='2'>
            {/*  content 02 */}
            <Unactive_Section />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  )
}

export default Manage

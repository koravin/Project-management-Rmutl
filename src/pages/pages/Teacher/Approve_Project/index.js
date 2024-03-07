import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// mui import
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// component import
import Approve_Table from './Approve_Table'

const Approve_Project = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>กรรมการ</Typography>
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
            <PeopleAltIcon
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
            title={<span style={{ color: 'white' }}>ยืนยันการเป็นที่ปรึกษา</span>}
            subheader={
              <Typography variant='body2'>
                <Box component='span' sx={{ fontWeight: 600, color: 'white' }}>
                  เลือกหัวข้อโครงงานที่จะเป็นที่ปรึกษา
                </Box>
              </Typography>
            }
          />
        </Card>
      </Grid>
      {/* Header card */}
      <Box sx={{ width: '100%', typography: 'body1', mt: 10 }}>
        <Approve_Table />
      </Box>
    </Grid>
  )
}

export default Approve_Project

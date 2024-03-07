import React, { useState, useEffect } from 'react'
import axios from 'axios'

// mui import
import Slide from '@mui/material/Slide'
import { Card, CardContent, DialogContent, DialogTitle, DialogActions, Box, Grid } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import PostAddIcon from '@mui/icons-material/PostAdd'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { DataGrid } from '@mui/x-data-grid'
import { Margin } from '@mui/icons-material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// Component Import
import CERec from './CERec'
import CHRec from './CHRec'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function Reccomment_document_detail({ project_id }) {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() // router สร้าง path

  // tabpanel control
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Box display='flex' flexDirection='column' justifyContent='center' height='auto' marginTop='5vh' margin='2vh'>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='เอกสาร CE' value='1' />
                <Tab label='เอกสาร CH' value='2' />
              </TabList>
            </div>
          </Box>
          <TabPanel value='1'>
            <Box width='100%'>
              <CERec project_id={project_id} />
            </Box>
          </TabPanel>
          <TabPanel value='2'>
            <CHRec project_id={project_id} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}

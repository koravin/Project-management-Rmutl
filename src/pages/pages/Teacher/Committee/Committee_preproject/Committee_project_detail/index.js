import React, { useState, useEffect } from 'react'
import axios from 'axios'

// mui import
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
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
import Test_preproject_detail from './Test_preproject_detail'
import Test_preproject_document from './Test_preproject_document'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function Committee_project_detail({ open, handleClose, rowData }) {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() // router สร้าง path
  const project_id = rowData // id ของโปรเจคที่สั่งเปิด Modal

  // รับค่า id Teacher จาก local storage
  const [user_id, setUser_Id] = useState([])

  useEffect(() => {
    // Check for CSR
    if (typeof window !== 'undefined') {
      const userID = localStorage.getItem('jwtUser_id')
      setUser_Id(userID)
    }
  }, [])

  // tabpanel control
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleRegisterCommittee = e => {
    e.preventDefault()

    // ตรวจสอบค่าว่างใน TextField
    if (!project_id || !user_id) {
      Swal.fire({
        icon: 'error',
        title: 'การทำงานผิดพลาด...',
        text: 'กรุณาลองใหม่!'
      })
      handleClose()

      return
    }

    const data = {
      preproject_id: project_id,
      instructor_id: user_id
    }

    console.log('data', data)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/register_committee`, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'you are committee this project'
    })
    handleClose()
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{ margin: '5vh', borderRadius: '10px' }}
        PaperProps={{
          style: {
            borderRadius: '10px'
          }
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
              Project Detail
            </Typography>
          </Toolbar>
        </AppBar>

        <Box display='flex' flexDirection='column' justifyContent='center' height='auto' marginTop='5vh'>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='Project Detail' value='1' />
                <Tab label='Document Detail' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Box width='100%'>
                <Test_preproject_detail project_id={project_id} />
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              <Test_preproject_document project_id={project_id} />
            </TabPanel>
          </TabContext>
          <DialogActions>
            <Button onClick={handleRegisterCommittee}>Register</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
